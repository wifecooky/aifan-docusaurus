---
slug: golang-intersection-of-two-slice
title: "如何在Go语言中获取切片(Slice)之间的公共元素(交集) | Golang"
description: 如何在Go语言中有效地获取两个或多个切片之间的公共元素。
authors: [wifecooky]
tags: [Golang, intersection]
keywords: [Golang, 获取切片公共元素, 交集]
---

## 背景

![img](intersection.svg)

- 获取两个切片之间的公共元素还是一个比较常见的需求，但是在 Code Review 的过程中，我发现还是会有一些人会用双重循环来实现。（这样的时间复杂度是 `O(n^2)`，效率比较低）
- 最近 Golang 用的多，顺便分享一下 Golang 中如何获取两个切片之间的公共元素的方法。

❌ 用双重循环实现的代码例子：

```go
func intersection(nums1 []int, nums2 []int) []int {
    var result []int

    // 双重循环 O(n^2)
    for _, v1 := range nums1 { // O(n)  外循环
        for _, v2 := range nums2 { // O(n) 内循环
            if v1 == v2 {
                result = append(result, v1)
            }
        }
    }
    return result
}
```

## 改善方案

把上面例子中的内循环中的元素查找改成用 `set`\* 来实现，这样内循环部分的时间复杂度就可以降低到 `O(1)`，整体的时间复杂度就可以降低到 `O(n)`。

:::tip Javascript 中的 set 解释
Set 对象是值的合集（collection）。集合（`set`）中的元素只会出现一次，即集合中的元素是唯一的。

规范要求集合的实现是"对合集中的元素的平均访问时间与集合中元素的数量呈次线性关系"。

因此，它可以在内部表示为[哈希表](https://en.wikipedia.org/wiki/Hash_table)（查找的时间复杂度为 `O(1)`）、搜索树（查找的时间复杂度为 `O(log(N))`）或任何其他的时间复杂度低于 `O(N)` 的数据结构。

[参考链接](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Set)
:::

### 用 `set` 来实现的例子

```go {12} showLineNumbers
func intersection(nums1 []int, nums2 []int) []int {
    var result []int

    // 把 nums2 转换成 set，这样在 nums2 中查找元素的时间复杂度就变成了 O(1)。
    //   考虑性能优化的话，可以把 nums1 和 nums2 中的元素数量进行比较，把数量多的那个切片转换成 set。
    set := make(map[int]struct{}) // golang 中的 没有 set，用 map 来实现。struct{} 是一个空结构体，用来节省内存。
    for _, v := range nums2 {
        set[v] = struct{}{}
    }

    // 遍历 nums1，如果 nums1 中的元素在 nums2 中存在，就把它加入到 result 中
    for _, v := range nums1 {
        if _, ok := set[v]; ok {
            result = append(result, v)
        }
    }
}
```

## 使用第三方库实现

考虑性能优化以及各种类型的切片，我们可以使用下面的第三方库来实现。

- [deckarep/golang-set](https://github.com/deckarep/golang-set)
- [samber/lo](https://github.com/samber/lo)

### `deckarep/golang-set`

如其名，Golang 的 set 实现。

```go
import (
  "fmt"
  mapset "github.com/deckarep/golang-set/v2"
)

func main() {
    set1 := mapset.NewSet[string]()
    set1.Add("a")
    set1.Add("b")
    set1.Add("c")

    set2 := mapset.NewSet[string]()
    set2.Add("c")
    set2.Add("d")
    set2.Add("e")

    // 交集
    intersectionSet := set1.Intersect(set2)
    fmt.Println(intersectionSet) // Set{c}

    // 除了交集，还支持并集、差集、对称差集等操作
    // 并集
    unionSet := set1.Union(set2)
    fmt.Println(unionSet) // Set{a, b, c, d, e}

    // 差集
    diffSet := set1.Difference(set2)
    fmt.Println(diffSet) // Set{a, b}

    // 对称差集
    symDiffSet := set1.SymmetricDifference(set2)
    fmt.Println(symDiffSet) // Set{a, b, d, e}
    }
```

### `samber/lo`

如果你除了要对切片进行交集操作，还需要对切片等进行排序、分组等操作，那么可以考虑使用 `samber/lo` 这个库。

你可以把它理解成 `lodash` 的 Golang 版本。

```go
import (
    "github.com/samber/lo"
)

func main() {
    // 交集
    lo.Intersection([]int{1, 2, 3}, []int{2, 3, 4}) // return []int{2, 3}

    // 并集
    lo.Union([]int{1, 2, 3}, []int{2, 3, 4}) //return []int{1, 2, 3, 4}

    // 差集
    lo.Difference([]int{1, 2, 3}, []int{2, 3, 4}) // return []int{1}, []int{4}
}
```
