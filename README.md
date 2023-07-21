# openapi-editor-fx README

**openapi-editor-fx** is a set of helper utilities to help manually edit OpenAPI spec. Common usecase is for drafting out a spec by hand.

## Features

### OpenAPI FX: Copy selected component and references as JSON 
Command that helps copying complex component models that have a lot of references. 

To use this command, you need to select the component ID with or without the component path `(#/components/schemas/TestRequest)`, bring up command search **CTRL+P** and execute command `OpenAPI FX: Copy selected component and references as JSON`

This will copy the targeted component and all its child **'$ref'** including nested refs in those children to your clipboard as JSON object

### 1.0.0

Initial release of OpenAPI FX: Copy selected component and references as JSON 
---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
