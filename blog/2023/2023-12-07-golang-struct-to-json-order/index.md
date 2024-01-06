---
slug: golang-structure-to-json-with-specified-order
title: Converting Structure to JSON with Specified Order | Golang
description: Converting Structure to JSON with Specified Order | Golang
authors: [wifecooky]
tags: [Golang, json]
keywords: [Golang, Structure to JSON]
---

## 背景

在使用 Golang 的时候，经常会遇到需要将结构体转换为 JSON 的情况，

但是在转换的时候，JSON 的字段顺序并不是我们想要的，这时候就需要我们自己来指定 JSON 的字段顺序。

## 解决方案

一个比较简单的方案是利用结构体的 tag 来指定 JSON 的字段顺序，

然后在转换的时候，将结构体的字段按照 tag 中的顺序进行排序。

```go
type User struct {
    Name  string `json:"name,order:2"`
    Age   int    `json:"age,order:1"`
}
```

## 代码实现

```go
package main

import (
    "encoding/json"
    "fmt"
    "reflect"
    "sort"
    "strconv"
    "strings"

    //orderedmap "github.com/wk8/go-ordered-map/v2"
    "github.com/iancoleman/orderedmap"
)

type User struct {
    Name  string `json:"name,order:3"`
    Age   int    `json:"age,order:2"`
    Score int    `json:"score,order:1"`
}

type Address struct {
    City    string `json:"city,order:10"`
    Street  string `json:"street,order:9"`
    ZipCode string `json:"zip_code,order:8"`
}

func main() {
    user := User{
        Name:  "Wen",
        Age:   30,
        Score: 100,
    }
    address := Address{
        City:    "Hangzhou",
        Street:  "XiHuDaDao",
        ZipCode: "10001",
    }

    // User構造体を指定した順序でJSONに変換
    userJSON, err := MarshalJSONWithOrder(user)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("User JSON:", string(userJSON))

    // Address構造体を指定した順序でJSONに変換
    addressJSON, err := MarshalJSONWithOrder(address)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }

    fmt.Println("Address JSON:", string(addressJSON))
}

// MarshalJSONWithOrder は構造体を指定した順序でJSONに変換する
// 構造体での指定方法： `json:"{struct field name},order:{integer}"`
// 指定例： `json:"name,order:10"`
func MarshalJSONWithOrder(obj interface{}) ([]byte, error) {
    val := reflect.ValueOf(obj)
    typ := reflect.TypeOf(obj)

    // ソート用のスライス
    var fields []fieldWithOrder

    // フィールドの数だけループ
    for i := 0; i < val.NumField(); i++ {
        fieldName := typ.Field(i).Name

        order := getTagValue(typ.Field(i), "json", "order")
        fields = append(fields, fieldWithOrder{
            Name:  fieldName,
            Order: order,
        })
    }

    // フィールドのソート
    sort.Slice(fields, func(i, j int) bool {
        return fields[i].Order < fields[j].Order
    })

    // ソート後の順序に従ってJSONを生成
    //result := orderedmap.New[string, any]()
    result := orderedmap.New()
    for _, f := range fields {
        //result[f.Name] = val.FieldByName(f.Name).Interface()
        result.Set(f.Name, val.FieldByName(f.Name).Interface())
    }

    // マーシャリング
    return json.Marshal(result)
}

// getTagValue は指定されたフィールドの指定されたタグの値を取得する
func getTagValue(field reflect.StructField, tag string, tagField string) int {
    tagValue, _ := field.Tag.Lookup(tag)

    // Split the tag string by ","
    tagParts := strings.Split(tagValue, ",")

    // Iterate through the tag parts to find the "order" value
    res := -1
    for _, part := range tagParts {
        // Check if the part starts with "order:"
        prefix := fmt.Sprintf("%s:", tagField)
        if strings.HasPrefix(part, prefix) {
            // Extract the numeric value after "order:"
            orderStr := strings.TrimPrefix(part, prefix)
            order, err := strconv.Atoi(orderStr)
            if err == nil {
                res = order
            }
        }
    }

    return res
}

// fieldWithOrder はソート用の構造体
type fieldWithOrder struct {
    Name  string
    Order int
}

```

## NOTE

- **Ordered Map 的使用**

  Golang 中的 map 是无序的，如果需要有序的 map，
  可以使用 [wk8/go-ordered-map](https://github.com/wk8/go-ordered-map) 或者 [iancoleman/orderedmap](https://github.com/iancoleman/orderedmap)。
  由于后者的性能似乎比较好，代码中采用的是后者。

- **ChatGPT 的使用**

  代码大部分是用 [ChatGPT](https://chat.openai.com/) 生成的，但是生成的代码中有几个问题，例如上面的 Ordered Map，我尝试让 ChatGPT 修改了几次，都没有成功。
  最后还是自己手动修改了代码。

  感觉 ChatGPT 对于代码的细节部分的理解还有待改善，而且有时候还胡说八道（现阶段生成式 AI 的通病）。
