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
    "easy-new-file.openPanel",
    async () => {
      const panel = vscode.window.createWebviewPanel(
        "newFilePanel",
        "Create New File",
        vscode.ViewColumn.One,
        { enableScripts: true },
      );

      const options = [
        "React Component",
        "Typescript Class",
        "Typescript File",
      ];

      panel.webview.html = getWebViewContent(options);

	  const selection = await vscode.window.showQuickPick(options, {
        placeHolder: "Select a file type to create",
      });

      switch (selection) {
        case "React Component":
          vscode.window.showInformationMessage("Creating React Component");
          break;
        case "Typescript Class":
          vscode.window.showInformationMessage("Creating Typescript Class");
          break;
        case "Typescript File":
          vscode.window.showInformationMessage("Creating Typescript File");
          break;

        default:
          break;
      }
    },
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(menu);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function getWebViewContent(options: string[]): string {
  return `
	 <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                display: flex;
                margin: 0;
                height: 100vh;
                font-family: sans-serif;
            }

            .left {
                width: 30%;
                background: #1e1e1e;
                color: white;
                padding: 10px;
                box-sizing: border-box;
                border-right: 1px solid #333;
            }

            .right {
                width: 70%;
                padding: 20px;
                box-sizing: border-box;
            }

            .option {
                padding: 8px;
                cursor: pointer;
                border-radius: 4px;
            }

            .option:hover {
                background: #333;
            }

            input {
                width: 100%;
                padding: 8px;
                font-size: 16px;
            }
        </style>
    </head>
    <body>
        <div class="left">
            <h3>Options</h3>
			${options
        .map(
          (option) =>
            `<div class="${option}" onclick="selectOption('${option}')">${option}</div>`,
        )
        .join("")}
        </div>

        <div class="right">
            <h2 id="title">File name</h2>
            <input type="text" placeholder="Enter new file name" />
        </div>

        <script>
            function selectOption(option) {
                document.getElementById('title').innerText = option;
            }
        </script>
    </body>
    </html>
	`;
}
