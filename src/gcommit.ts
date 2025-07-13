import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import {
    getGitDiff,
    listUnstagedFiles,
    stageFiles,
    commitWithMessage
} from 'gcommit-ai/src/gitUtils';

import {
    loadConfig,
    saveConfig
} from 'gcommit-ai/src/config';

import { generateCommitMessage } from 'gcommit-ai/src/openAiService';

/**
 * Saves the OpenAI API key to the gcommit config.
 */
export async function saveKey(key: string) {
    process.env.OPENAI_API_KEY = key;
    await saveConfig({
        openai_api_key: key,
        model: process.env.GCOMMIT_MODEL || "gpt-4o-mini",
        language: process.env.GCOMMIT_LANG || "en",
        auto_commit: process.env.GCOMMIT_AUTO_COMMIT === "true",
    });
}

/**
 * Main command handler for running gcommit inside VS Code.
 */
export async function runGCommit() {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) {
        vscode.window.showErrorMessage("Open a folder first.");
        return;
    }

    const cwd = workspace.uri.fsPath;

    // ✅ Ensure the folder is a Git repository
    const isGitRepo = fs.existsSync(path.join(cwd, '.git'));
    if (!isGitRepo) {
        vscode.window.showErrorMessage("This folder is not a Git repository.");
        return;
    }

    let cfg = await loadConfig();

    // 🔐 Ask for OpenAI API key if missing
    if (!cfg.openai_api_key) {
        const key = await vscode.window.showInputBox({
            prompt: "Enter your OpenAI API Key",
            password: true
        });

        if (!key) {
            vscode.window.showWarningMessage("No API key provided.");
            return;
        }

        await saveKey(key);
        cfg = await loadConfig(); // reload config after saving
    }

    // 📝 Get unstaged files (✅ with cwd)
    const unstaged = await listUnstagedFiles(cwd);
    if (!unstaged.length) {
        vscode.window.showInformationMessage("No unstaged files.");
        return;
    }

    const selected = await vscode.window.showQuickPick(unstaged, {
        canPickMany: true,
        placeHolder: "Select files to stage"
    });

    if (!selected || selected.length === 0) {
        vscode.window.showWarningMessage("No files selected.");
        return;
    }

    // ✅ Stage selected files (with cwd)
    await stageFiles(selected, cwd);

    // 🔍 Generate git diff (✅ with cwd)
    const diff = await getGitDiff(cwd);
    if (!diff) {
        vscode.window.showInformationMessage("No changes detected.");
        return;
    }

    // 🤖 Generate commit message
    const message = await vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Generating commit message...",
        cancellable: false
    }, () => generateCommitMessage(diff, cfg));

    const userInput = await vscode.window.showInputBox({
        prompt: "Edit your AI-generated commit message",
        value: message
    });

    if (!userInput) {
        vscode.window.showWarningMessage("Commit cancelled.");
        return;
    }

    // ✅ Confirm and commit (✅ with cwd)
    const shouldCommit = await vscode.window.showQuickPick(
        ["Commit", "Cancel"],
        { placeHolder: "Commit with this message?" }
    );

    if (shouldCommit === "Commit") {
        await commitWithMessage(userInput, cwd);
        vscode.window.showInformationMessage("✅ Commit successful!");
    }
}
