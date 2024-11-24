---
slug: clone-a-specific-folder-from-a-git-repository
title: How to Clone a Specific Folder from a Git Repository
description: "Learn how to efficiently clone a specific folder from a Git repository without downloading the entire project. This guide covers essential commands and techniques using Git's sparse checkout feature, allowing you to work only with the files you need. Perfect for saving time and bandwidth when dealing with large repositories."
authors: [wifecooky]
tags: [git]
keywords:
  [
    clone specific folder git repository,
    git clone specific folder,
    cloning folder from git repo,
    git repository folder clone,
    clone folder from github,
    how to clone folder git,
    git partial clone,
    clone folder git command,
    git sparse checkout,
  ]
---

### 从 Git 仓库中克隆特定文件夹

你可以使用 Git 的 **稀疏检出（sparse checkout）** 功能，只下载仓库中的特定文件夹。以下是具体步骤：

### 步骤

1. **创建文件夹并进入：**

```bash
mkdir <文件夹名称>
cd <文件夹名称>
```

2. **初始化 Git：**

```bash
git init
```

3. **添加仓库 URL：**

```bash
git remote add origin <仓库地址>
```

4. **启用稀疏检出：**

```bash
git sparse-checkout init
```

5. **选择要克隆的文件夹：**

```bash
git sparse-checkout set <文件夹路径>
```

将 `<文件夹路径>` 替换为你需要的文件夹（例如 `docs`）。

6. **拉取文件夹内容：**

```bash
git pull origin <分支名称>
```

将 `<分支名称>` 替换为对应的分支名（例如 `main`）。

### 示例

如果你只想克隆仓库中的 `docs` 文件夹：

```bash
mkdir my-repo
cd my-repo
git init
git remote add origin https://github.com/example/repo.git
git sparse-checkout init
git sparse-checkout set docs
git pull origin main
```

### 关键点

- **Git 版本要求：** 稀疏检出功能需要 Git 2.25 或更高版本。
- **克隆多个文件夹：** 如果需要克隆多个文件夹，可以用空格分隔：

  ```bash
  git sparse-checkout set 文件夹1 文件夹2
  ```

- **禁用稀疏检出：** 如果想恢复克隆整个仓库的功能：

  ```bash
  git sparse-checkout disable
  ```

通过这种方式，你可以只下载需要的文件，节省时间和空间！
