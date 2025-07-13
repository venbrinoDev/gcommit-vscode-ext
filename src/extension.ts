import * as vscode from 'vscode';
import { runGCommit, saveKey } from './gcommit';

export function activate(context: vscode.ExtensionContext) {
  // Main gcommit command
  context.subscriptions.push(
    vscode.commands.registerCommand('gcommit.run', runGCommit)
  );

  // Separate config command
  context.subscriptions.push(
    vscode.commands.registerCommand('gcommit.config', async () => {
      const apiKey = await vscode.window.showInputBox({
        prompt: 'Enter your OpenAI API Key',
        password: true,
        ignoreFocusOut: true
      });

      if (!apiKey) {
        vscode.window.showWarningMessage("No API key provided.");
        return;
      }

      await saveKey(apiKey);

      vscode.window.showInformationMessage("✅ OpenAI API key saved.");
    })
  );
}

export function deactivate() { }
