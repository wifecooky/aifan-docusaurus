---
slug: how-to-parse-json-data-without-using-structs-in-golang
title: "Golang：如何在不使用构造体的情况下解析JSON数据"
description: 如何在Golang中无需构造体即可解析JSON数据的方法，附具体代码实现。
authors: [wifecooky]
tags: [Golang, json]
keywords: [Golang, JSON数据解析, 无构造体解析, Go语言技巧, 数据处理]
image: "how-to-parse-json-data-without-using-structs-in-golang.jpeg"
---

## 背景&需求

在 Golang 中，我们经常会遇到需要解析 JSON 数据的场景，比如从 HTTP 请求中获取 JSON 数据，或者从文件中读取 JSON 数据。

通常我们会提前定义好对应的结构体，然后才能将 JSON 数据解析到结构体中。

比如：

```go {7-9} showLineNumbers
type User struct {
    Name string `json:"name"`
    Age int `json:"age"`
}

func main() {
    jsonStr := `{"name": "wen", "age": 18}`
    var user User
    json.Unmarshal([]byte(jsonStr), &user)
    fmt.Println(user)
}
```

但是有时候我们并不知道 JSON 数据的结构，或者 JSON 数据的结构会经常变化，这时候我们就无法提前定义好对应的结构体。

## 解决方案

可以使用 `map[string]interface{}` 来解析 JSON 数据，这样就不需要提前定义结构体了。

```go {3-4} showLineNumbers
func main() {
    jsonStr := `{"name": "wen", "age": 18}`
    var user map[string]interface{}
    json.Unmarshal([]byte(jsonStr), &user)
    fmt.Println(user)

    // 获取具体的值
    fmt.Println(user["name"])
    fmt.Println(user["age"])
}
```
