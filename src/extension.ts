// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "easy-new-file" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "easy-new-file.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from Easy-New-File!");
    },
  );

  const menu = vscode.commands.registerCommand(
    "easy-new-file.openMenu",
    async () => {
      const items: vscode.QuickPickItem[] = [
        // Group 1
        { label: "File type", kind: vscode.QuickPickItemKind.Separator },
        { label: "React Component" },
        { label: "TypeScript Class" },
        { label: "TypeScript Interface" },
        { label: "TypeScript File" },
        { label: "Scratch File" },

        // Group 2
        { label: "File Location", kind: vscode.QuickPickItemKind.Separator },
        { label: "/" },
      ];

      const selected = await vscode.window.showQuickPick(items, {
        placeHolder: "Select an action",
      });

      if (!selected) return;

      vscode.window.showInformationMessage(`You chose: ${selected.label}`);
    },
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(menu);
}

// This method is called when your extension is deactivated
export function deactivate() {}
