# Changelog

All notable changes to the **gcommit** VS Code extension will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- Initial implementation of `gcommit` extension
- AI-powered commit message generation using OpenAI API
- Support for staging selected files within VS Code
- Input box to edit commit messages before committing
- Basic config handling for OpenAI API key
- Error handling for non-git folders

---

## [0.1.0] – 2025-07-13

### Added
- First  release 🎉
- VS Code command to trigger AI commit generation
- Interactive UI flow: select files → generate → edit → commit
- CLI fallback integration via `gcommit-ai`
- Git workspace validation and `.git` folder checks
