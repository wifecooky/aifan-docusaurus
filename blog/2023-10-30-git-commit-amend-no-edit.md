---
slug: how-to-amend-commit-without-changing-commit-message
title: git commit --amend --no-edit
description: when you want to amend a commit without changing the commit message
authors: [wifecooky]
tags: [git, commit]
keywords: [git, commit, change commit, change commit message without changing commit message]
images: [img/social-card.png]
---

## `git commit --amend --no-edit`

当你觉得你已经把某个 issue 修改好了，可实际上你没能一次性修改好；

OR

当你确实已经把某个 issue 修改好了，可你忘记了 add 一些文件时，

你可以这么做：

```bash
git add .
git commit --amend --no-edit # --no-edit 选项表示不修改 commit message。
git push -f # 如果你已经 push 过了，需要添加 -f  来强制 push。
```
