---
slug: golang-merge-slices-unique-with-specified-key
title: "Golang 中指定 key 合并数组并去重"
description: "如何在 Golang 中使用指定 key 合并数组并去重。"
authors: [wifecooky]
tags: [Golang, Union]
keywords: [Golang, 合并数组, 去重, 编程技巧]
image: "cover.jpeg"
---

## 问题

有 2 个数组，互相可能有重复的元素，如何合并这两个数组并去重？

比如有两个数组：

```go
type User struct {
    ID   int // ID 作为唯一标识 (ID相同则认为是同一个元素)
    Name string
}

old := []User{
    {ID: 1, Name: "a"}, // only in old
    {ID: 2, Name: "b"}, // 重复
}

new := []User{
    {ID: 2, Name: "c"}, // 重复
    {ID: 3, Name: "d"}, // only in new
}
```

合并后的结果应该是：

```go
c := []User{
    {ID: 1, Name: "a"}, // only in old
    {ID: 2, Name: "c"}, // 重复 (保留 new 中的)
    {ID: 3, Name: "d"}, // only in new
}
```

## 解决方案（一般化）

```go
package main

import "fmt"

type User struct {
    ID   int
    Name string
}

// contains Check if an element exists in a slice.
//  keyFunc is used to uniquely identify the elements.
func contains(slice []any, item any, keyFunc func(any) any) bool {
    for _, element := range slice {
        if keyFunc(element) == keyFunc(item) {
            return true
        }
    }
    return false
}

// mergeSlices Merges two slices and removes duplicates.
//
//  keyFunc  is used to uniquely identify the elements.
//  if an element exists in both old and new, the element in new takes precedence.
//  old and new are assumed to have no duplicate elements.
// The order is not guaranteed.
func MergeSlices(old, new []any, keyFunc func(any) any) []any {
    var merged []any

    // copy new to merged
    merged = append(merged, new...)

    for _, item := range old {
        if !contains(merged, item, keyFunc) {
            merged = append(merged, item)
        }
    }

    return merged
}

func main() {
    old := []any{
        User{ID: 1, Name: "a"},
        User{ID: 2, Name: "b"}, // 重複
    }
    new := []any{
        User{ID: 2, Name: "c"}, // 重複
        User{ID: 3, Name: "d"},
    }

    mergedUsers := MergeSlices(old, new, func(item any) any {
        return item.(User).ID
    })
    fmt.Printf("Merged Users:%+v", mergedUsers) // Merged Users:[ {ID:1 Name:a} {ID:2 Name:c} {ID:3 Name:d}]
}
```
