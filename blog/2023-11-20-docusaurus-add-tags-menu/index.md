---
slug: how-to-add-tags-menu-for-docusaurus-blog
title: 如何为 Docusaurus 博客添加 tags 菜单 | Docusaurus Guide
description: 如何为 Docusaurus 博客添加 tags 菜单，以增强博客功能并提高用户体验。
authors: [wifecooky]
tags: [docusaurus]
keywords: [Docusaurus blog, Docusaurus tags, Docusaurus 博客, Docusaurus 标签]
images: [https://docusaurus.io/img/docusaurus_keytar.svg]
---

## 背景

当你的博客文章越来越多时，你可能会发现你的博客需要一个 tags 菜单，以便用户可以快速找到他们感兴趣的文章。

本文将介绍如何为 Docusaurus 博客添加 tags 菜单。

![img](docusaurus-add-tags-menu.png)

## 添加 tags 菜单

只需要在 `docusaurus.config.js` 配置文件中，添加如下配置即可：

```js {16-20} title="docusaurus.config.js" showLineNumbers
      navbar: {
        title: 'thewang',
        logo: {
          alt: 'thewang logo',
          src: 'img/logo.png',
        },
        items: [
          { to: '/blog', label: 'Blog', position: 'left' },
          // language dropdown menu
          {
            type: 'localeDropdown',
            position: 'right',
          },
...
          // tags menu
          {
            to: '/blog/tags',
            label: 'Tags',
            position: 'left',
          },
```
