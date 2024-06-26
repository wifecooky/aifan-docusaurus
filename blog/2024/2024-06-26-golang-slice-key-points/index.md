---
slug: golang-slice-common-mistakes-and-pitfalls
title: "Golang中的 Slice 常见错误和陷阱解析"
description: "探索在使用 Golang 编程语言中的 slice 时常见的错误和陷阱，深入解析这些问题的根源并提供有效的解决方案与实践建议，帮助开发者避免常见陷阱，提高代码质量和效率。"
authors: [wifecooky]
tags: [Golang, Slice]
keywords: [Golang, Slice, 常见错误]
image: golang-slice.webp
---

## 1. Slice 是什么？

Slice 是 Go 语言中的一种类似数组的数据结构，是对数组的一个封装。

和数组相比，slice 的长度是可以动态变化的，可以通过内置函数 `append` 来动态增加切片的长度。

![img](golang-slice.webp)

## 2. Slice 的注意事项和常见错误以及陷阱

### 2.1. 未初始化的切片

未初始化的切片是 nil，对其进行操作会导致运行时错误。

```go
package main

import "fmt"

func main() {
    var fruits []string
    // fruits[0] = "🍎" // 这会导致运行时错误：panic: runtime error: index out of range [0] with length 0

    // 正确做法1：初始化切片
    fruits := make([]string, 1)
    fruits[0] = "🍎"

    // 正确做法2：使用字面量初始化切片
    fruits := []string{"🍎"}

    // 正确做法3：使用 append 函数初始化切片。（如果不是特别注重性能，这种方式是最简单的。）
    fruits = append(fruits, "🍎")
}
```

### 2.2. 使用 `append` 函数时，注意重新赋值

`append` 函数会在容量不足时重新分配一个更大的底层数组，并将原来的数据复制到新的数组中，然后返回一个新的切片，

所以注意在使用 `append` 函数时，如果需要使用原来的切片变量，就需要重新赋值。

```go
    fruits := []string{"🍎"}
    fruits = append(fruits, "🍌")
```

### 2.3. 切片作为函数参数时的引用问题

切片是引用类型，所以在函数参数中传递切片时，实际上是传递了切片的引用。

```go
func modifyFruits(fruits []string) {
    fruits[0] = "🍌"
}

func main() {
    fruits := []string{"🍎", "🍌"}
    fmt.Println("Before modification:", fruits) // 输出: Before modification: [🍎 🍌]

    modifyFruits(fruits)
    fmt.Println("After modification:", fruits) // 输出: After modification: [🍌 🍌]
}
```

### 2.4. 切片的截取

切片的截取操作是左闭右开的，即 `a[1:3]` 表示从下标 1 开始到下标 3 结束，但不包括下标 3。

```go
    fruits := []string{"🍎", "🍌", "🍇", "🍉"}
    fmt.Println(fruits[1:3]) // 输出: [🍌 🍇]
```

### 2.5. 切片的长度和容量混淆

切片的长度是指切片中元素的个数，容量是指切片底层数组的长度。

```go
    fruits := make([]string, 2, 5)
    fmt.Println("Length:", len(fruits), "Capacity:", cap(fruits)) // 输出: Length: 2 Capacity: 5

    // fruits[3] = "🍇" // 这会导致运行时错误：panic: runtime error: index out of range [3] with length 2

    // 正确做法：使用 append 来添加元素
    fruits = append(fruits, "🍇")
```

### 2.6. 切片的复制

切片的复制是浅拷贝，即复制的是切片的引用，而不是切片的底层数组。

这个和函数参数传递的引用是类似的。

```go
    fruits := []string{"🍎", "🍌"}
    fruitsCopy := fruits
    fruitsCopy[0] = "🍌"
    fmt.Println("Original slice:", fruits) // 输出: Original slice: [🍌 🍌]
```
