---
slug: how-to-amend-commit-without-changing-commit-message
title: git commit --amend --no-edit
description: when you want to amend a commit without changing the commit message
authors: [wifecooky]
tags: [git, commit, mermaidjs]
keywords: [git, commit, change commit, change commit message without changing commit message]
images: [img/social-card.png]
---

## `git commit --amend --no-edit`

When you think you have fixed an issue, but you were not able to fix it completely in one go (perhaps there were just some typos);

```mermaid
gitGraph
    commit id: "init"
    branch feature
    commit id: "fixed issue#1(but didn't)"
```

**OR**

When you really have fixed an issue, but you forgot to add some files,

```mermaid
gitGraph
    commit id: "init"
    branch feature
    commit id: "fixed issue#1 (but forgot to add some files)"
```

You can use this:

```bash
git add .
git commit --amend --no-edit # --no-edit 选项表示不修改 commit message。
git push -f # 如果你已经 push 过了，需要添加 -f  来强制 push。
```

:::note

Maybe I just wrote this article to experience the gitGraph feature of mermaidjs 😄.

And BTW the commit message of gitGraph is rotated by default.

If you want to change it to horizontal, you need to add the following configuration in docusaurus.config.js:

```js
+      mermaid: {
+        options: {
+          gitGraph: { rotateCommitLabel: false },
+        },
+      },
:::
