---
slug: clone-a-specific-folder-from-a-git-repository
title: "从 Git 仓库中克隆特定文件夹"
description: "Learn how to efficiently clone a specific folder from a Git repository without downloading the entire project. This guide covers essential commands and techniques using Git's sparse checkout feature, allowing you to work only with the files you need. Perfect for saving time and bandwidth when dealing with large repositories."
authors: [wifecooky]
tags: [git]
keywords:
  [
    Git 仓库,
    克隆,
    特定文件夹,
    Git 克隆特定文件夹,
    Git 命令,
    Git 使用教程,
    Git 操作,
    Git 技巧,
    从 Git 仓库提取文件夹,
  ]
---

### Clone a Specific Folder from a Git Repository

You can use **sparse checkout** in Git to download only a specific folder from a repository. Here's how:

### Steps

1. **Create a Folder and Navigate to It:**

   ```bash
   mkdir <folder-name>
   cd <folder-name>
   ```

2. **Initialize Git:**

   ```bash
   git init
   ```

3. **Add the Repository URL:**

   ```bash
   git remote add origin <repo-url>
   ```

4. **Enable Sparse Checkout:**

   ```bash
   git sparse-checkout init
   ```

5. **Select the Folder to Clone:**

   ```bash
   git sparse-checkout set <folder-path>
   ```

   Replace `<folder-path>` with the folder you want (e.g., `docs`).

6. **Download the Folder:**

   ```bash
   git pull origin <branch>
   ```

   Replace `<branch>` with the branch name (e.g., `main`).

### Example

To download only the `docs` folder:

```bash
mkdir my-repo
cd my-repo
git init
git remote add origin https://github.com/example/repo.git
git sparse-checkout init
git sparse-checkout set docs
git pull origin main
```

### Key Points

- **Git Version:** Sparse checkout requires Git 2.25 or later.
- **Multiple Folders:** Add multiple folders by separating them with spaces:

```bash
git sparse-checkout set folder1 folder2
```

- **Disable Sparse Checkout:** If you want to clone the whole repo later:

```bash
git sparse-checkout disable
```

This method saves time and space by downloading only the files you need!
