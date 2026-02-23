// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path from "path";
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
      const workspaceFolders = vscode.workspace.workspaceFolders;

      if (!workspaceFolders) {
        vscode.window.showErrorMessage(
          "No workspace folder found. Please open a folder first.",
        );
        return;
      }

      const fileTypes = [
        "React Component",
        "TypeScript Class",
        "TypeScript Interface",
        "TypeScript File",
        "Scratch File",
      ];

      const fileType = await vscode.window.showQuickPick(fileTypes, {
        placeHolder: "Select a file type",
      });

      if (!fileType) return;

      const selectedFolder = await vscode.window.showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false,
        openLabel: "Select target folder",
        defaultUri: vscode.workspace.workspaceFolders?.[0].uri,
      });

      if (!selectedFolder) return;

      const folderuri = selectedFolder[0];

      const fileName = await vscode.window.showInputBox({
        prompt: "Insert name",
      });

      if (!fileName) return;

      const capitalizedFileName =
        fileName.charAt(0).toUpperCase() + fileName.slice(1);

      let extension = "";
      let content = "";

      switch (fileType) {
        case "React Component":
          extension = ".tsx";
          content = `export default function \${1:${capitalizedFileName}}() {
	return <div>\${2}</div>;
}`;
          break;
        case "TypeScript Class":
          extension = ".ts";
          content = `class \${1:${capitalizedFileName}} {
	constructor(\${2}) {}
}`;
          break;
        case "TypeScript Interface":
          extension = ".ts";
          content = `export default interface \${1:${capitalizedFileName}}{
	\${2}
}`;
          break;
        case "TypeScript File":
          extension = ".ts";
          content = `export function \${1:${capitalizedFileName}}(){
	console.log(\${1:${fileName}})
}`;
          break;
        default:
          extension = "";
          content = "";
          break;
      }
      console.debug(
        `File name: ${fileName} & extension:${extension} & type:${fileType}`,
      );

      const filePath = path.join(folderuri.fsPath, fileName + extension);
      console.debug("File Path", filePath);

      const fileUri = vscode.Uri.file(filePath);
      console.debug("File URI", fileUri);

      try {
        await vscode.workspace.fs.writeFile(fileUri, Buffer.from("", "utf-8"));
        const document = await vscode.workspace.openTextDocument(fileUri);
        const editor = await vscode.window.showTextDocument(document);

        const snippet = new vscode.SnippetString(content);
        await editor.insertSnippet(snippet);
      } catch (error) {
        vscode.window.showErrorMessage(
          `Failed to create file: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    },
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(menu);
}

// This method is called when your extension is deactivated
export function deactivate() {}
