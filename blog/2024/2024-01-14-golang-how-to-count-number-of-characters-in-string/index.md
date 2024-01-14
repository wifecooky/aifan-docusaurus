---
slug: golang-how-to-count-number-of-characters-in-string-with-emoji
title: 在 Golang 中计算包含emoji等特殊字符的字符串中的字符数 | Go语言
description: 在Golang中计算包含特殊字符（比如 emoji，阿拉伯字符）字符串中的字符数的方法
authors: [wifecooky]
tags: [Golang, String, emoji]
keywords: [Golang, 字符串长度, 字符计数, emoji, 特殊字符]
---

## 问题

如何计算字符串中的（所见）字符数是一个常见的问题。

在 Golang 中，我们可以使用[`utf8.RuneCountInString()`函数](https://golang.org/pkg/unicode/utf8/#RuneCountInString)来计算字符串中的字符数。

中文这样的多字节字符也可以正确计算。

### 示例

```go
package main

import (
    "fmt"
    "unicode/utf8"
)

func main() {
    str := "abc世界"
    fmt.Println(utf8.RuneCountInString(str)) // 5
}
```

但是如果字符串中包含 👉🏻 这样的 emoji 字符，那么有些情况下这个函数就无法正确计算了。

```go
package main

import (
    "fmt"
    "unicode/utf8"
)

func main() {
    emojiWorld := "🌍"
    fmt.Println(utf8.RuneCountInString(emojiWorld)) // 1  ✅ 没有问题

    emojiHand := "👉"
    fmt.Println(utf8.RuneCountInString(emojiHand)) // 1  ✅ 没有问题

    emojiHandBlack := "👉🏿"
    fmt.Println(utf8.RuneCountInString(emojiHandBlack)) // 2 ❌ 有问题 期望是 1。 同一种 emoji，但是不同的皮肤颜色的字符数不一样

    emojiOne := "1️⃣"
    fmt.Println(utf8.RuneCountInString(emojiOne)) // 3 ❌ 有问题 期望是 1。
}
```

emoji 可以从这里[emojipedia](https://emojipedia.org/backhand-index-pointing-right)复制。

## 原因

这是因为有些 emoji 是多个 unicode 字符 (Code Points) 组合而成的，而 `utf8.RuneCountInString()` 函数只会计算 unicode 字符的数量。

| Term              | Description                                                                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bytes             | The smallest unit used to measure data storage, typically 8 bits in binary.                                                                                                                 |
| Code Units        | Fixed-size units used in encoding schemes to represent a character. In UTF-8, a Code Unit is 8 bits, and in UTF-16, it's 16 bits.                                                           |
| Code Points       | In the Unicode standard, each character is assigned a unique code point, which is a numerical identifier for the character. For example, the code point for the Latin letter "A" is U+0041. |
| Grapheme Clusters | Represent the smallest units perceivable in a language, typically a sequence of one or more Code Points. For instance, a letter with an accent mark might be a Grapheme Cluster.            |

比如 1️⃣ 这个 emoji，它是由 3 个 Code Points 组成的，分别是：

![img](./keycap-digit-one-code-points.png)

> Rendered by [Markdown Table](https://marketplace.visualstudio.com/items?itemName=TakumiI.markdowntable)

:::tip
Emoji 的 Code Points 可以在这里[emojipedia](https://emojipedia.org/keycap-digit-one#technical) 查看。
:::

## 解决方案

所以我们需要计算的是 Grapheme Clusters（字符簇）的数量，而不是 Code Points 的数量。

### 使用第三方库 [rivo/uniseg](https://github.com/rivo/uniseg)

```go
package main

import (
    "fmt"

    "github.com/rivo/uniseg"
)

func main() {
    emojiWorld := "🌍"
    fmt.Println(uniseg.GraphemeClusterCount(emojiWorld)) // 1  ✅ 没有问题

    emojiHand := "👉"
    fmt.Println(uniseg.GraphemeClusterCount(emojiHand)) // 1  ✅ 没有问题

    emojiHandBlack := "👉🏿"
    fmt.Println(uniseg.GraphemeClusterCount(emojiHandBlack)) // 1  ✅ 没有问题

    emojiOne := "1️⃣"
    fmt.Println(uniseg.GraphemeClusterCount(emojiOne)) // 1  ✅ 没有问题
}
```

## 补充

其实不只是 emoji，还有一些泰语，阿拉伯语的字符也是由多个 unicode 字符组成的。

## Reference

[Go で文字数をカウントする 在 Go 中计算字符数](https://ema-hiro.hatenablog.com/entry/2021/01/19/141854)

[文字数をカウントする 7 つの方法](https://engineering.linecorp.com/ja/blog/the-7-ways-of-counting-characters)

[Go: Unicode と rune 型](https://zenn.dev/masaruxstudy/articles/52632501e4ca41)
