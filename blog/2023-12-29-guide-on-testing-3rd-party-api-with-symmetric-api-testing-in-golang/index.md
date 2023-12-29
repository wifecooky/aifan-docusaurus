---
slug: guide-on-testing-3rd-party-api-with-symmetric-api-testing-in-golang
title: "[Golang] 如何使用 Symmetric API testing 方法测试 3rd-party API"
description: How to perform symmetric API testing on third-party APIs in Golang
authors: [wifecooky]
tags: [Golang, Testing]
keywords: [Golang, Symmetric API testing, third-party API testing, API testing]
---

## Symmetric API testing 是啥？

这个概念应该是源自于 [Gopher Academy Blog](https://blog.gopheracademy.com/advent-2015/symmetric-api-testing-in-go/)。

作者在维护一个 Golang 的 Twitter API 客户端，为了对 Twitter 的 API 进行测试，所以作者提出了 Symmetric API testing 的概念。

简单地说就是**保存 API 的返回结果**，然后在测试的时候，用保存的结果来进行测试。

这样就不用编写 mock 和 测试用例了。

至于名字为什么叫 `Symmetric`, 是相对于传统的需要编写 mock 和 测试用例的方式 `Asymmetric` 而言的。

其实个人觉得把它叫做 SnapShot Testing 更为合适。

## 怎么实现？

除了手动保存 API 的返回结果，还可以使用 [go-vcr](https://github.com/dnaeon/go-vcr) 这个库来实现。

大概的代码如下：

```go {1,6} showLineNumbers=true
r, err := recorder.New("<filename>")
if err != nil {
    return err
}
defer r.Stop()
client.Transport = r
res, err := client.Get("http://api.twitter.com/...")
if err != nil {
    return err
}
```

这里提供了完整的 [示例代码](https://gist.github.com/podhmo/d15f7e47ae830a0352159159d7864a02)。

## Reference

[Symmetric API Testing](https://scrapbox.io/shimizukawa/Symmetric_API_Testing)

[Symmetric API Testing という、手間なく堅牢に外部 API Client をテストする手法](https://chanyou.hatenablog.jp/entry/symmetric-api-testing)

[go-vcr を使った Symmetric API Testing のメモ](https://pod.hatenablog.com/entry/2020/08/15/011525)
