---
slug: docusaurus-update-to-v3
title: Update Docusaurus to v3
description: Update Docusaurus to v3
authors: [wifecooky]
tags: [docusaurus]
keywords: [docusaurus]
image: "https://docusaurus.io/img/docusaurus_keytar.svg"
---

## Update Docusaurus to v3

[Docuaurus v3](https://docusaurus.io/blog/releases/3.0) 已经发布了，
官方提供了[升级指南](https://docusaurus.io/docs/migration/v3)，
这里还是记录一下升级过程吧。😄

### 升级依赖

- docusaurus.config.js

```js title="docusaurus.config.js"

-const lightCodeTheme = require('prism-react-renderer/themes/github');
-const darkCodeTheme = require('prism-react-renderer/themes/dracula');
+const { themes } = require('prism-react-renderer');
+const lightTheme = themes.github;
+const darkTheme = themes.dracula;

       prism: {
-        theme: lightCodeTheme,
-        darkTheme: darkCodeTheme,
+        theme: lightTheme,
+        darkTheme: darkTheme,
       },

```

- package.json

```json title="package.json"
   "dependencies": {
-    "@docusaurus/core": "2.4.3",
-    "@docusaurus/preset-classic": "2.4.3",
-    "@docusaurus/theme-mermaid": "^2.4.3",
-    "@mdx-js/react": "^1.6.22",
+    "@docusaurus/core": "3.0.0",
+    "@docusaurus/preset-classic": "3.0.0",
+    "@docusaurus/theme-mermaid": "^3.0.0",
+    "@mdx-js/react": "^3.0.0",
     "clsx": "^1.2.1",
-    "prism-react-renderer": "^1.3.5",
-    "react": "^17.0.2",
-    "react-dom": "^17.0.2"
+    "prism-react-renderer": "^2.1.0",
+    "react": "^18.2.0",
+    "react-dom": "^18.2.0"
   },
   "devDependencies": {
-    "@docusaurus/module-type-aliases": "2.4.3"
+    "@docusaurus/module-type-aliases": "3.0.0",
+    "@docusaurus/types": "3.0.0"
   },


   "engines": {
-    "node": ">=16.14"
+    "node": ">=18.0"
   }

```

### 重新安装依赖

删除 `node_modules` 目录和 `package-lock.json` 文件，然后重新安装依赖。

```bash
npm install
```

### 检查 md/mdx 文件

- 官方提供了工具来检查 `md/mdx` 文件中的 `frontmatter` 是否符合 MDX v3。

```bash
npx docusaurus-mdx-checker
```

你可能需要修改一些文件，比如我升级到 v3 后，就遇到了一个格式问题：

- 修改前

```md
<details><summary>xxx</summary>
...
</details>
```

- 修改后

```md
<details>
<summary>xxx</summary>
...
</details>
```
