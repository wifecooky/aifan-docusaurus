---
slug: docusaurus-change-docs-url-path
title: 如何更改 Docusaurus 的文档（Docs）的 URL路径名 - Docusaurus
description: 怎样自定义和更改Docusaurus的文档（Docs）的URL路径名
authors: [wifecooky]
tags: [Docusaurus]
keywords: [Docusaurus, Change the URL path of docs]
---

## 问题

Docuaurus 的文档（`Docs`）默认的 URL 路径名是 `/docs`，如：`https://thewang.net/docs` 。

如果你想把它改成 `/api`，如：`https://thewang.net/api` ，该怎么做呢？

## 解决方法

在 `docusaurus.config.js` 中，

- 找到 `docs` 的配置项，添加 `routeBasePath` 属性，值为你想要的 URL 路径名，如：`api`。
- 找到 `navbar` 的配置项，

```js {7} title="docusaurus.config.js" showLineNumbers
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
       ({
         docs: {
+          routeBasePath: 'api',
           sidebarPath: require.resolve('./sidebars.js'),
           ...
```

```js {7} title="docusaurus.config.js" showLineNumbers
     navbar: {
        ...
        items: [
          { to: '/blog', label: 'Blog', position: 'left' },
          // API docs
          {
            to: '/api',
            type: 'docSidebar',
            label: 'API',
            ...
          },
```

## 补充

那那些已经公开的文档（`Docs`）的 URL 路径不能访问了該怎么办呢？

可以安装 `docusaurus/plugin-client-redirects` 插件，来实现重定向解决。

```bash
  npm install @docusaurus/plugin-client-redirects@3.0.0 // 注意和你的 docusaurus 版本对应
```

```js {2-17} title="docusaurus.config.js" showLineNumbers
...
+  plugins: [
+    [
+      '@docusaurus/plugin-client-redirects',
+      {
+        createRedirects(existingPath) {
+          if (existingPath.includes('/api')) {
+            // Redirect from /docs to /weekly
+            return [
+              existingPath.replace('/api', '/docs'),
+            ];
+          }
+          return undefined; // Return a falsy value: no redirect created
+        },
+      },
+    ]
+  ],

   presets: [
...
```

:::warning PRODUCTION ONLY
This plugin is always inactive in development and **only active in production** because it works on the build output.

[`@docusaurus/plugin-client-redirects`](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects) 只在生产环境下生效。
:::
