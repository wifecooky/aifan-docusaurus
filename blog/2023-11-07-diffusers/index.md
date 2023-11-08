---
slug: huggingface-diffusers-app
title: 玩玩 huggingface 的 Diffusers
description: 玩玩 huggingface 的 Diffusers App
authors: [wifecooky]
tags: [AI, huggingface, diffusers]
keywords: [huggingface, diffusers]
images: [https://is1-ssl.mzstatic.com/image/thumb/PurpleSource126/v4/34/d3/37/34d33772-e20f-04e7-6ff3-6a51079e59a7/e9f8fa18-85b8-4e48-a11a-4e2cf2157062_Screenshot_1.png/626x0w.webp]
---

## 背景

[Diffuses App](https://apps.apple.com/us/app/diffusers/id1666309574) 是 [huggingface](https://huggingface.co/) 推出的一个 App。

## 结论

> 以下基于 Version 1.1 (20230222.140932) 进行介绍.

先说结论，让它画猫画狗可能还行，画人就惨不忍睹了。😄

而且除了默认提供的 5 个模型（选择后会自动下载），不能加载其他模型。

## 一些生成结果

### 画狗

* Prompt: Labrador in the style of Vermeer
* Model: `stabilityai/stable-diffusion-2-base`

![img](Labrador_in_the_style_of_Vermeer.png)

### 画人

:::danger

下面的图片有点恐怖哦。。。 😨
而且我都是我重复多次，选相对好的结果。

:::

* Prompt: Japanese beauty
* Model: `stabilityai/stable-diffusion-2-base`

![img](japanese_beauty.png)

* Prompt: Chinese beauty
* Model: `stabilityai/stable-diffusion-2-base`

![img](chinese_beauty.png)

* Prompt: Korean beauty
* Model: `stabilityai/stable-diffusion-2-base`

![img](korean_beauty.png)

* Prompt: American beauty
* Model: `stabilityai/stable-diffusion-2-base`

![img](american_beauty.png)