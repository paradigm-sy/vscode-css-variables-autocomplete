[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/paradigm-sy.vscode-css-variables-autocomplete.svg)](https://marketplace.visualstudio.com/items?itemName=paradigm-sy.vscode-css-variables-autocomplete)
[![Version](https://vsmarketplacebadge.apphb.com/version/paradigm-sy.vscode-css-variables-autocomplete.svg)](https://marketplace.visualstudio.com/items?itemName=paradigm-sy.vscode-css-variables-autocomplete)
[![Rating](https://vsmarketplacebadge.apphb.com/rating-star/paradigm-sy.vscode-css-variables-autocomplete.svg)](https://marketplace.visualstudio.com/items?itemName=paradigm-sy.vscode-css-variables-autocomplete)

# vscode-css-variables-autocomplete

Simple extension for enabling autocompletion for css-variables from selected files. You can trigger it by typing `--`.

![Demo](https://github.com/paradigm-sy/vscode-css-variables-autocomplete/blob/master/img/demo.gif)

Be sure that you have one of supported language modes selected in right bottom of your vscode window:
* css
* postcss
* scss
* less

![languageModes](https://github.com/paradigm-sy/vscode-css-variables-autocomplete/blob/master/img/language-mode.png)

## Extension Configuration
Create or modify file `.vscode/settings.json`. Folder `.vscode` should be in your workspace root directory.

Minimal configuration file:
```
{
  "cssVarriablesAutocomplete.files": [ "variables.css" ],
}
```

Full configuration file:
```
{
  "cssVarriablesAutocomplete.files": [ "variables.css" ],
  "cssVarriablesAutocomplete.languageModes": [ "css", "postcss" ],
  "cssVarriablesAutocomplete.propertyPrefixes": {
    "font-size": "fs",
    "line-height": "lh",
    "box-shadow": "shadow",
  }
}
```

This extension contributes the following configuration parameters:

* `files`: array of paths to files with css variables
* `languageModes`: specify custom language modes if default 'css' not suits you.
* `propertyPrefixes`: allows you to suggest only variables with some prefix in name for specified properties. For example with `"font-size": "fs"` extension will only suggest you variables `--fs-big`, `--fs-small`, but not `--small`.
