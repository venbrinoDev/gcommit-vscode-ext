# 🚀 gcommit for VS Code

Generate AI-powered, conventional Git commit messages right from VS Code — powered by OpenAI.

[![VS Code](https://img.shields.io/visual-studio-marketplace/v/your-publisher.gcommit)](https://marketplace.visualstudio.com/items?itemName=your-publisher.gcommit)
[![npm](https://img.shields.io/npm/v/gcommit-ai)](https://www.npmjs.com/package/gcommit-ai)
[![License](https://img.shields.io/github/license/venbrinoDev/gcommit-cli)](LICENSE)

---

## ✨ Features

- Detects unstaged Git changes in your workspace
- Lets you select which files to stage
- Generates commit messages using OpenAI based on your git diff
- Conforms to [Conventional Commits](https://www.conventionalcommits.org/)
- Lets you review or edit the message before committing
- One-click commit from within VS Code

---

## 📸 Preview

Coming soon – GIF showing usage flow.

---

## 🔧 Usage

1. Open a folder that is a Git repository
2. Open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
3. Run `GCommit: Generate Commit Message`
4. Select files to include in the commit
5. View or edit the AI-generated message
6. Click ✅ Commit!

---

## 🧠 First Time Setup

The first time you run the extension, it will ask for your **OpenAI API Key**.

To update it later, use:


You can also configure:
- `GCOMMIT_MODEL` – default: `gpt-4o-mini`
- `GCOMMIT_AUTO_COMMIT` – default: `false`

---

## ⚙️ Requirements

- A Git-enabled VS Code workspace
- An OpenAI API key

---

## 📁 Extension Commands

| Command | Description |
|--------|-------------|
| `GCommit: Generate Commit Message` | Analyze changes and generate a commit message |
| `GCommit: Set OpenAI API Key`      | Configure your OpenAI key for generation |

---

## 🐛 Known Issues

- Doesn't support multi-root workspaces yet
- No offline mode — requires internet access to OpenAI

---

## 📝 Release Notes

### 0.1.0

- Initial release
- Supports commit generation, API key saving, and one-click commits

---

## 🙏 Credits

Built on [`gcommit-ai`](https://www.npmjs.com/package/gcommit-ai) by [venbrinoDev](https://github.com/venbrinoDev). Uses `simple-git`, `OpenAI`, and `VS Code API`.

---

## 📄 License

MIT © 2025 [venbrinoDev](https://github.com/venbrinoDev)
