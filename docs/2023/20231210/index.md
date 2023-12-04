# 2023-12-10

## 封面图 :  ![img](cover.jpg)

我一直以为这种花是绣球花的一种，但是好像叫做[马缨丹](https://zh.wikipedia.org/zh-cn/馬纓丹), 别名也称为**五色梅、五彩花**。

花落之后会结绿色的果实，成熟后的果实呈黑紫色，**果实与茎叶都含有毒性**。

由于极其粗生，无论雨水充足，抑或干旱地区，都见其影踪，甚至赶绝原生草木，被列为**世界百大外来入侵种**。

## 本周新闻

## 一些有趣的工具

### 1. [Excalidraw](https://excalidraw.com/)

Excalidraw 把他们的文本到图表的功能[开源](https://github.com/excalidraw/excalidraw)了。

举个例子，输入下面的文本，就可以生成下面的图表(付带 Mermaid的code)。

```text
how git work in sequence diagram
```

![img](Excalidraw-git-work.png)

## 一些有趣的文章

### 1. [わかりやすい説明のための 10 の鉄則（中文：简单易懂的表达的 10 条原则）](https://speakerdeck.com/e869120/wakariyasuisetsumei-10-tessoku)

最近 X 上很火的东京大学在读学生写的关于简单易懂的表达的 10 条原则，并出版了书籍。

在大学有效地学习的同时，把自己的心得写成文章和书籍，顺便还能赚钱，真是太棒了。😄

### 2. git支持提交空 commit

原来git 支持提交空 commit，可以用来触发 CI/CD 的工作流。

```bash
git commit --allow-empty -m "Empty commit to trigger workflow"
```

当然还是建议用 gh cli 在本地来触发 CI/CD 的工作流。

```bash
gh workflow run <workflow-name> --ref <branch-name>
```

> Reference: [How to Push an Empty Commit in Git?](https://www.scaler.com/topics/git/git-empty-commit/)

### 3. docker-compose.yml 中重复利用变量

如果你的 docker-compose.yml (>= `v3.4`) 中有很多地方需要用到同一个变量，可以利用 YAML 的 `anchor` 和 `alias` 来实现。

如下面的例子，`MYSQL_DATABASE` 变量在 `db` 和 `backend` 两个服务中都用到了,

我们可以把 `MYSQL_DATABASE` 变量定义在 `x-mysql_database` 中，然后在 `db` 和 `backend` 中用 `*MYSQL_DATABASE` 来引用。

`x-mysql_database` 中的 `&MYSQL_DATABASE` 是 `anchor`，`db` 和 `backend` 中的 `*MYSQL_DATABASE` 是 `alias`。

docker-compose.yml 中以 `-x` 开头的变量，docker 不会去解析其结构，所以即使结构不完整也不会有警告。

```yaml {3-7,13,18} showLineNumbers
version: '3.9'

x-mysql_root_password: &MYSQL_ROOT_PASSWORD "sample"
x-mysql_database: &MYSQL_DATABASE "sample"
x-mysql_user: &MYSQL_USER "sample"
x-mysql_password: &MYSQL_PASSWORD "sample"
x-mysql_host_name: &MYSQL_HOST_NAME "db"

services:
  db:
    image: mysql:8
    environment:
      MYSQL_DATABASE: *MYSQL_DATABASE
    ...
  backend:
    ...
    environment:
      MYSQL_DATABASE: *MYSQL_DATABASE
    ...
```

### 4. Golang 中的 处理钱的库

我们知道在 Golang 中，`float64` 是不适合用来处理钱的，因为 `float64` 会有精度问题。

所以在 Golang 中，如果我们有高精度要求，可以用类似 [shopspring/decimal](https://github.com/shopspring/decimal) 这样的库来处理。

但是，这个库会把数据保存成 `string`，这样在做计算的时候，就需要先把 `string` 转成 `decimal`，然后再做计算。

mercari 为了解决这个问题，开发了 [mercari/go-bps](https://github.com/mercari/go-bps) 这个库, 有需求的朋友可以看看。

> Reference: [料率計算における小数点数の扱いについて](https://engineering.mercari.com/blog/entry/20201203-basis-point/)

### 5. 用 ChatGPT 学习英语

<blockquote class="twitter-tweet"><p lang="zh" dir="ltr">AI英语老师 <a href="https://t.co/l71SvqaCum">pic.twitter.com/l71SvqaCum</a></p>&mdash; 瞎玩菌 (@Blind___Gamer) <a href="https://twitter.com/Blind___Gamer/status/1731307112922566863?ref_src=twsrc%5Etfw">December 3, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 一些有趣的句子

## 一些有趣的图片

## 日本生活

### 1. 日本的[故乡纳税](https://ja.wikipedia.org/wiki/ふるさと納税)

喜欢户外产品的朋友，可以看看 [新潟県 三条市](https://item.rakuten.co.jp/f152048-sanjo/) 的产品。

![img](https://image.rakuten.co.jp/f152048-sanjo/cabinet/sanjof/10000_2/imgrc0099211089.jpg)