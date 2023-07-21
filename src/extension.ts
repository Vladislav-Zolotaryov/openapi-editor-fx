import * as vscode from 'vscode';
import { findAllOpenApiRelatedComponents } from './open-api-refs';

export function activate(context: vscode.ExtensionContext) {
	console.log('"openapi-editor-fx" is activated');

	let disposable = vscode.commands.registerCommand('openapi-editor-fx.copy-component-and-references', () => {
		const editor = vscode.window.activeTextEditor;
		const selection = editor?.selection;
		if (selection && !selection.isEmpty) {
			const selectedText = editor.document.getText(selection);

			if (vscode.window.activeTextEditor) {
				const result = findAllOpenApiRelatedComponents(vscode.window.activeTextEditor?.document.getText(), selectedText);
				vscode.env.clipboard.writeText(result);
				vscode.window.showInformationMessage(`Copied ${selectedText} and all related components to clipboard`);
			}
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	console.log('"openapi-editor-fx" is deactivated!');
}
