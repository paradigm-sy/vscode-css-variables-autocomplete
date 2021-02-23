# vscode-css-variables-autocomplete README

Simple extension for enabling autocompletion for css-variables from selected files. You can trigger it by typing `--`.


## Extension Configuration
Create or modify file `.vscode/settings.json`. Folder `.vscode` should be in your workspace root directory.

Minimal configuration file:
```
{
  "cssVarriablesAutocomplete": {
    "files": [ "variables.css" ],
  }
}
```

Full configuration file:
```
{
  "cssVarriablesAutocomplete": {
    "files": [ "variables.css" ],
    "languageModes": [ "css", "postcss" ],
    "propertyPrefixes": {
      "font-size": "fs",
      "line-height": "lh",
      "box-shadow": "shadow",
    }
  }
}
```

This extension contributes the following configuration parameters:

* `files`: array of paths to files with css variables
* `languageModes`: specify custom language modes if deefault 'css' not suits you.
* `propertyPrefixes`: allows you to suggest only variables with some prefix in name for specified properties. For example with `"font-size": "fs"` extension will only suggest you variables `--fs-big`, `--fs-small`, but not `--small`.
