import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as css from 'css';
import { CompletionItem, CompletionList } from 'vscode';

import type { Rule, Declaration } from 'css';

export function activate(context: vscode.ExtensionContext) {
	const items: vscode.CompletionItem[] = [];
	const bareItems: vscode.CompletionItem[] = [];
	const workspaceFolder = vscode.workspace.workspaceFolders || [];
	const folderPath = workspaceFolder[0]?.uri.fsPath;

	// workspace not selected
	if (!vscode.workspace.workspaceFolders) {
		return;
	}
	
	const config = vscode.workspace.getConfiguration('cssVarriablesAutocomplete');
	const hasFilesInConfig = config && config.has('files');

	// no config or specified files
	if (!config || !hasFilesInConfig) {
		return;
	}

	const configFiles = (config.get('files') || []) as string[];
	const configLanguageMods = (config.get('languageModes') || []) as string[];
	const configPrefixes = (config.get('propertyPrefixes') || {}) as Record<string, string>;
	
	configFiles.forEach((filePath) => {
		const file = fs.readFileSync(path.join(folderPath, filePath), { encoding: 'utf8' });
		const cssParsed = css.parse(file);
		const rootRule: Rule | undefined = cssParsed.stylesheet?.rules.find((rule: Rule) => {
			const isRuleType = rule.type = 'rule';
			const hasRootSelector = rule?.selectors?.includes(':root');

			return Boolean(isRuleType && hasRootSelector);
		});

		const declarations = rootRule?.declarations;
		const variables = declarations?.filter((declaration: Declaration) => {	
			return Boolean(
				declaration.type === 'declaration' &&
				declaration?.property?.startsWith('--')
			);
		});

		variables?.forEach((variable: Declaration) => {
			// For use when the user has already typed `var(`
			const completionItemBare = new CompletionItem(variable.property!, vscode.CompletionItemKind.Variable);
			completionItemBare.detail = variable.value;
			completionItemBare.insertText = variable.property;
			bareItems.push(completionItemBare);

			const completionItem = new CompletionItem(variable.property!, vscode.CompletionItemKind.Variable);

			completionItem.detail = variable.value;
			completionItem.insertText = `var(${variable.property})`;

			items.push(completionItem);
		});

	});

	let completionProvider = vscode.languages.registerCompletionItemProvider(
		configLanguageMods.length ? configLanguageMods : [ 'css', 'postcss' ],
		{
			async provideCompletionItems(document, position) {
				const firstCharOfLinePosition = new vscode.Position(position.line, 0);
				const beforeCursorText = document.getText(new vscode.Range(firstCharOfLinePosition, position))?.trim() || '';

				if (!beforeCursorText.match(/--([\w-]*)/)) {
					return null;
				}

				let completionItems: vscode.CompletionItem[] = beforeCursorText.match(/var\(--([\w-]*)/) ? bareItems : items;

				const propertyMatch = beforeCursorText.match(/([\w-]*):/);
				const property = propertyMatch ? propertyMatch[1] : null;
				const propertyPrefix = property && configPrefixes[property];
				
				if (propertyPrefix) {
					completionItems = completionItems.filter(item => item.label.startsWith(`--${propertyPrefix}`));
				}

				return new CompletionList(completionItems);
			},
		},
		'-', '-'
	);

	context.subscriptions.push(completionProvider);
}
