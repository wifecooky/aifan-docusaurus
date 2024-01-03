---
slug: golang-intersection-of-two-slice
title: "How to get the intersection of two slices in Go"
description: How to get the intersection of two slices in Go. Also, how to use third-party libraries to implement it.
authors: [wifecooky]
tags: [Golang, intersection]
keywords: [Golang, intersection of two slices, intersection]
---

## Background

![img](intersection.svg)

- It is a common requirement to get the common elements between two slices, but I found that some people still use double loops to implement it during Code Review. (The time complexity is `O(n^2)`, and the efficiency is relatively low)
- I have been using Golang recently, so I will share how to get the common elements between two slices in Golang.

❌ Code example implemented with double loops:

```go
func intersection(nums1 []int, nums2 []int) []int {
    var result []int

    // Double loop O(n^2)
    for _, v1 := range nums1 { // O(n)  outer loop
        for _, v2 := range nums2 { // O(n) inner loop
            if v1 == v2 {
                result = append(result, v1)
            }
        }
    }
    return result
}
```

## Improvement

Change the element lookup in the inner loop in the above example to be implemented using `set`\*,

so that the time complexity of the inner loop part can be reduced to `O(1)`, and the overall time complexity can be reduced to `O(n)`.

:::tip Set in Javascript
Set objects are collections of values. A value in the set may only occur once; it is unique in the set's collection.

It could be represented internally as a [hash table](https://en.wikipedia.org/wiki/Hash_table) (with `O(1)` lookup),

a search tree (with `O(log(N)`) lookup), or any other data structure, as long as the complexity is better than `O(N)`.

[Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
:::

### Implementation example using `set`

```go {12} showLineNumbers
func intersection(nums1 []int, nums2 []int) []int {
    var result []int

    // Convert nums2 to set, so that the time complexity of looking up elements in nums2 becomes O(1).
    //  Consider performance optimization, you can compare the number of elements in nums1 and nums2, and convert the slice with more elements into set.
    set := make(map[int]struct{}) // There is no set in Golang, use map to implement. struct{} is an empty structure to save memory.
    for _, v := range nums2 {
        set[v] = struct{}{}
    }

    // Traverse nums1, if the element in nums1 exists in nums2, add it to result
    for _, v := range nums1 {
        if _, ok := set[v]; ok {
            result = append(result, v)
        }
    }
}
```

## Implementation using third-party libraries

If you consider performance optimization and various types of slices, we can use the following third-party libraries to implement.

- [deckarep/golang-set](https://github.com/deckarep/golang-set)
- [samber/lo](https://github.com/samber/lo)

### `deckarep/golang-set`

As the name suggests, it is a set implementation in Golang.

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

    // 交集 intersection
    intersectionSet := set1.Intersect(set2)
    fmt.Println(intersectionSet) // Set{c}

    // Besides intersection, it also supports union, difference, symmetric difference, etc.
    // 并集 union
    unionSet := set1.Union(set2)
    fmt.Println(unionSet) // Set{a, b, c, d, e}

    // 差集 difference
    diffSet := set1.Difference(set2)
    fmt.Println(diffSet) // Set{a, b}

    // 对称差集 symmetric difference
    symDiffSet := set1.SymmetricDifference(set2)
    fmt.Println(symDiffSet) // Set{a, b, d, e}
    }
```

### `samber/lo`

If you need to sort, group, etc. in addition to intersecting slices, you can consider using the `samber/lo` library.

It is similar to `lodash` in Javascript.

```go
import (
    "github.com/samber/lo"
)

func main() {
    // 交集 intersection
    lo.Intersection([]int{1, 2, 3}, []int{2, 3, 4}) // return []int{2, 3}

    // 并集 union
    lo.Union([]int{1, 2, 3}, []int{2, 3, 4}) //return []int{1, 2, 3, 4}

    // 差集 difference
    lo.Difference([]int{1, 2, 3}, []int{2, 3, 4}) // return []int{1}, []int{4}
}
```
