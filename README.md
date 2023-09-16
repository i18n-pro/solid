<div align="center">
  <p style="font-size: 18px;">Lightweight, simple, flexible, automatic translation internationalization tool for Solid</p>

English | [简体中文](https://github.com/i18n-pro/solid/blob/v1.0.0/README_zh-CN.md)



[![npm-version](https://img.shields.io/npm/v/@i18n-pro/solid.svg?style=flat-square "npm-version")](https://www.npmjs.com/package/@i18n-pro/solid "npm")
[![npm-download](https://img.shields.io/npm/dm/@i18n-pro/solid "npm-download")](https://www.npmjs.com/package/@i18n-pro/solid "npm")

[![github-stars](https://img.shields.io/github/stars/i18n-pro/solid?style=social "github-stars")](https://github.com/i18n-pro/solid/stargazers "github-stars")
[![last-commit](https://img.shields.io/github/last-commit/i18n-pro/solid/main "last-commit")](https://github.com/i18n-pro/solid/commits/main "last-commit")
[![github-issues](https://img.shields.io/github/issues-raw/i18n-pro/solid "github-issues")](https://github.com/i18n-pro/solid/issues "github-issues")
[![codecov](https://codecov.io/gh/i18n-pro/solid/branch/main/graph/badge.svg?token=RMHGQUBVY6 "codecov")](https://codecov.io/gh/i18n-pro/solid "codecov")

![demo](https://s3.bmp.ovh/imgs/2023/09/15/c8957fd4abda1dfe.gif)

</div>
<details >
  <summary>Table of Contents</summary>

  [Vision](#vision)<br/>
  [Requirement](#requirement)<br/>
  [Features](#features)<br/>
  [Live Demo](#live-demo)<br/>
  [Principle](#principle)<br/>
  [License](#license)<br/>

</details>


# Vision
To make internationalization easy and enjoyable 😄💪🏻
# Requirement

* solid-js >= **1.0.0**
* i18n-pro >= **2.0.0**


# Features

* **lightweight**：[![bundlesize](https://img.shields.io/bundlephobia/minzip/i18n-pro?color=brightgreen&style=plastic "i18n-pro-bundlesize")](https://bundlephobia.com/package/i18n-pro "i18n-pro-bundlesize") + [![bundlesize](https://img.shields.io/bundlephobia/minzip/@i18n-pro/solid?color=brightgreen&style=plastic "bundlesize")](https://bundlephobia.com/package/@i18n-pro/solid "bundlesize")
* The following features are inherited from  [i18n-pro](https://github.com/i18n-pro/core "i18n-pro") 
   * **simple**
   * **flexible**
   * **automatic-translation**
   * **keyless**


# Live Demo

* [Open in CodeSandbox](https://codesandbox.io/p/github/i18n-pro/solid-demo/main?file=README.md)
* [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg "Open in StackBlitz")](https://stackblitz.com/github/i18n-pro/solid-demo?file=README.md)


# Principle
This library is implemented based on  [i18n-pro](https://github.com/i18n-pro/core "i18n-pro")  combined with  `Solid` 's  `context`  feature

Mainly composed of  `2`  parts
* I18nProvider
* useI18n



**I18nProvider**：Configure container components for internationalization initialization properties<br />**useI18n**：Hook method for obtaining internationalization API and state



A simple example is as follows
```typescript
import { render } from 'solid-js/web'
import { I18nProvider, useI18n } from '@i18n-pro/solid'

function App() {
  const { t } = useI18n()

  return <>{t('hello world')}</>
}

render(
  () => (
    <I18nProvider
      namespace="i18n-example"
      locale="en"
      langs={{
        zh: {
          'hello world': '你好世界',
        },
        ja:{
          "hello world": "こんにちは世界",
        },
      }}
    >
      <App />
    </I18nProvider>
  ),
  document.getElementById('root'),
)
```

# Help Document

>To avoid unnecessary duplicate document content, some of the documents in this library are linked to the content in  `i18n-pro` <br />The  `i18n-pro`  related link in the current document is based on the  `2.0.0`  version. If you are using a different version, you need to check the document corresponding to the version you are using to avoid inconsistent usage
* Current Library
   * [Quick Start](https://github.com/i18n-pro/solid/blob/v1.0.0/docs/dist/USAGE.md)
   * [API](https://github.com/i18n-pro/solid/blob/v1.0.0/docs/dist/API.md)
   * [Changelog](https://github.com/i18n-pro/solid/blob/v1.0.0/docs/dist/CHANGELOG.md)
* i18n-pro
   * [Command Line](https://github.com/i18n-pro/core/blob/v2.0.0/docs/dist/COMMAND_LINE.md)
   * [Matching Rules](https://github.com/i18n-pro/core/blob/v2.0.0/docs/dist/MATCH_RULE.md)
   * [Q&A](https://github.com/i18n-pro/core/blob/v2.0.0/docs/dist/Q&A.md)
   * [Translation Log](https://github.com/i18n-pro/core/blob/v2.0.0/docs/dist/OUTPUT_LOG.md)


# License
[MIT](./LICENSE)

Copyright (c) 2023-present Eyelly Wu