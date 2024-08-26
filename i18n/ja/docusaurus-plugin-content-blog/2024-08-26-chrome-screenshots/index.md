---
slug: chrome-screenshots
title: "Chromeでウェブページのスクリーンショットを撮るなら、Chromeだけで十分"
description: "Chromeブラウザには強力なスクリーンショット機能が組み込まれており、外部ツールやプラグインなしでさまざまなタイプのスクリーンショットを取得できます。本記事では、MacおよびWindowsユーザー向けの操作方法を紹介します。"
authors: [wifecooky]
tags: [chrome, devtools]
keywords: [chrome, devtools, screenshot, スクリーンショット]
image: cover.png
---

## はじめに

- Chrome ブラウザには強力なスクリーンショット機能が内蔵されています
- 外部ツールやプラグインを使わずに、様々なタイプのスクリーンショットが撮れます
- この記事では、Mac と Windows の両方のユーザーに対応した操作方法を説明します

## 概要

以下のフローチャートは、Chrome DevTools を使用してスクリーンショットを撮影する基本的な手順を示しています：

```mermaid
graph TD
    A[開始] --> B{DevToolsを開く}
    B -->|Mac| C1[Command + Option + I]
    B -->|Windows| C2[F12 または Ctrl + Shift + I]
    C1 --> D[コマンドメニューを開く]
    C2 --> D
    D -->|Mac| E1[Command + Shift + P]
    D -->|Windows| E2[Ctrl + Shift + P]
    E1 --> F{スクリーンショットの種類を選択}
    E2 --> F
    F -->|全画面| G1[Capture full size screenshot]
    F -->|表示領域| G2[Capture screenshot]
    F -->|特定の要素| H[要素を選択]
    H --> I[右クリック > Node screenshot]
    G1 --> J[スクリーンショットを保存]
    G2 --> J
    I --> J
    J --> K[終了]
```

## DevTools を開く方法

以下のいずれかの方法で Chrome DevTools を開くことができます。

1. Mac: Command + Option + I
   Windows: F12 または Ctrl + Shift + I
2. ブラウザウィンドウ内で右クリックして「検証」を選択
3. Chrome メニュー > その他のツール > デベロッパーツール

## スクリーンショットの種類と撮影方法

### 1. 全画面スクリーンショット

- Mac: Command + Shift + P
  Windows: Ctrl + Shift + P
- "Capture full size screenshot" と入力し、Enter

### 2. 表示領域のスクリーンショット

- 同上のコマンドを開き、"Capture screenshot" を選択

### 3. 特定の要素のスクリーンショット

- DevTools の左上にある要素選択ツール（カーソルアイコン）をクリック
- ページ上で目的の要素をクリック
- 要素を右クリックして「Node screenshot」を選択

### 4. レスポンシブデザインのテスト

- DevTools 上部のデバイスツールバーアイコンをクリック（または Mac: Command + Shift + M / Windows: Ctrl + Shift + M）
- デバイスの種類や画面サイズを選択
- 上記の方法でスクリーンショットを撮影

## キーボードショートカット（Mac / Windows）

- DevTools を開く: Command + Option + I / F12 または Ctrl + Shift + I
- コマンドメニューを開く: Command + Shift + P / Ctrl + Shift + P
- デバイスモードの切り替え: Command + Shift + M / Ctrl + Shift + M

## まとめ

- Chrome DevTools はスクリーンショット撮影に十分な機能を持つ
- Mac と Windows の両方のユーザーが簡単に利用可能
- ウェブ開発者だけでなく、一般ユーザーにも有用なツール
