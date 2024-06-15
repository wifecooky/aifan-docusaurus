---
slug: golang-when-to-use-pointer-types-in-struct-fields
title: "golang-结构体中的字段什么时候应该用指针类型"
description: "在 Go 语言中，结构体是值类型。 当我们在结构体中使用字段时，我们可以使用值类型或指针类型。 但是，我们应该在什么时候使用指针类型？"
authors: [wifecooky]
tags: [golang, 结构体, 指针类型]
keywords: [golang, 结构体, 字段, 指针类型]
draft: true
---

## 问题： 结构体中的字段什么时候应该使用指针类型

在 Go 语言中，结构体是值类型。 当我们在结构体中使用字段时，我们可以使用值类型或指针类型。 但是，我们应该在什么时候使用指针类型？

```go
type Person struct {
    Name string
    Age  int
}
```

❓OR

```go
type Person struct {
    Name *string
    Age  *int
}
```

## 结论

- 当您处理大型结构时，以避免类型有助于高效的内存管理并减少开销。

  大部分的时候（几百字节左右）的结构体，使用值类型更好。

  因为指针类型的字段需要在堆上分配内存，而值类型的字段是在栈上分配内存。 栈上的内存分配和释放比堆上的内存分配和释放更快。

- 当类型为零的值需要与 nil 值区分开时。

  例如，如果您想要区分一个字段是未设置的还是设置为零值的，那么使用指针类型是有意义的。

？？？ TODO
