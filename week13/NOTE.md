# 第13周总结

Proxy 主要用于库和框架

收集对象的事件：在 `get` 中收集对象及属性





## 组件基础

前端架构主体： 1.80%组件问题 2.其他就是架构模式：UI架构模式+零零碎碎的基础库

> Attribute / Property / state /config 的区别

- Attribute 强调描述性； Property 强调从属关系

| ---        | ---    | 如何设计组件状态 | ---               | ---       |
| ---------- | ------ | ---------------- | ----------------- | --------- |
| Markup set | JS set | JS Change        | User Input Change | ---       |
| NO         | YES    | YES              | ?                 | property  |
| YES        | YES    | YES              | ?                 | attribute |
| NO         | NO     | NO               | YES               | state     |
| NO         | YES    | NO               | NO                | config    |

> 组件的生命周期

> 组件的 Children: 分为 Content 型 Children 和 Template 型 Children

> 组件的 event

> 组件的 methods