---
slug: write-change-resilient-code-with-domain
title: "使用领域对象编写具有容错能力的代码"
description: "在这篇文章中，我们将讨论如何使用领域对象来编写具有容错能力的代码。"
authors: [wifecooky]
tags: [Domain, DDD, Google]
keywords:
  [
    领域对象,
    容错能力,
    编写代码,
    软件开发,
    代码质量,
    错误处理,
    设计模式,
    领域驱动设计,
    程序健壮性,
    代码可维护性,
  ]
image: DDD.webp
---

## What

本文是对谷歌[Write Change-Resilient Code with Domain Objects](https://testing.googleblog.com/2024/09/write-change-resilient-code-with-domain.html)的翻译。

原作者: Amy Fu

## 译文

尽管产品的需求经常变化，但其基本理念通常变化缓慢。由此得出一个有趣的结论：如果我们编写的代码符合产品的基本理念，那么它在未来产品变更中存活的可能性就会更高。

领域对象是我们代码中的基本构建块（如类和接口），它们与产品的基本概念相匹配。我们不是编写代码来匹配产品需求的期望行为（“将文本设置为白色”），而是匹配其底层概念（“文本颜色设置”）。

例如，假设你是披萨团队的一员，该团队向饥饿的谷歌员工出售美味新鲜的披萨。由于需求量大，你们团队决定增加送货服务。

如果没有域对象，最快的送比萨途径就是直接创建一个 deliverPizza 方法：

```java
公共类 DeliveryService

公开的 void 方法 deliverPizza(List pizzas)：...},

}
```

虽然这种做法在初期效果不错，但如果 gPizza 将其产品线扩展到其他食品上会怎样呢？
你可以添加一个新的方法：

```java
公开的 void 方法 deliverWithDrinks(List pizzas, List drinks) ...},
```

但是随着你需要的功能越来越多（比如零食、甜食等），你将不得不不断添加更多的方法。你该如何修改初始实现以避免这种持续的维护负担呢？

你可以添加一个表示产品理念的领域对象，而不是其需求：

- 用例是指帮助产品满足其业务需求的特定行为。

- 一个域对象代表了由多个相似用例共享的通用概念。

为了确定合适的领域对象，请问自己：

- 1.该产品支持哪些相关的使用场景，我们未来计划支持哪些方面？

A：gPizza 打算开始送披萨，将来还会送饮料和零食等其他产品。

- 2. 这些用例有哪些共同点？

A：gPizza 想要把顾客订购的食物送达。

- 3. 我们可以用什么域对象来表示这个通用概念呢？

A：这个领域对象是食品订单。我们可以将用例封装到一个 FoodOrder 类中。

领域对象是一种有用的抽象，但要避免选择过于通用的对象，因为在提高可维护性和更复杂、更模糊的代码之间存在权衡。通常，目标是仅支持计划中的用例，而不是所有可能的用例（参见 YAGNI 原则）。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="good" label="👍" default>

```java
// GOOD: It's clear what we're delivering.
public void deliver(FoodOrder order) {}
```

  </TabItem>
  <TabItem value="bad" label="👎">
```java
// BAD: Don't support furniture delivery.
public void deliver(DeliveryList items) {}
```
  </TabItem>
</Tabs>
