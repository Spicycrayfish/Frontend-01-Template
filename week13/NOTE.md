# 第13周总结

[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 主要用于库和框架



参见 [vue reactivity](https://github.com/vuejs/vue-next/tree/master/packages/reactivity) 的 [effect](https://github.com/vuejs/vue-next/blob/master/packages/reactivity/__tests__/effect.spec.ts)，相当于 observe

收集事件：在 `get` 中收集对象及属性，依据对象和属性收集相关依赖





## 组件化基础

前端架构主体： 

1. 80%组件问题 
2. 其他就是架构模式：UI架构模式+零零碎碎的基础库



对象：

* Properties
* Methods
* Inherit



组件：

* Properties
* Methods
* Inherit
* Attribute
* Config & State
* Event
* Lifecycle
* Children



> Attribute / Property / state /config 的区别



Attribute 强调描述性； 

```
<my-component attribute="value" />
myComponent.getAttribute('a');
myComponent.setAttribute('a', 'value');
```



Property 强调从属关系；

```
myComponent.a = 'value';
```



| ---         | ---     | 如何设计组件状态 | ---             | ---       |
| ----------- | ------- | ---------------- | --------------- | --------- |
| Markup 设置 | JS 设置 | JS 改变          | User Input 改变 | ---       |
| NO          | YES     | YES              | ?               | property  |
| YES         | YES     | YES              | ?               | attribute |
| NO          | NO      | NO               | YES             | state     |
| NO          | YES     | NO               | NO              | config    |

property、attribute、state、config 使用示例：

```javascript
class MyComponent() {
  constructor(config) {
    this.state = {
      v: 1
    }
  }
  
  get prop1() {
  }
  set prop1() {
  }
  
  setAttribute(attr) {
    
  }
  getAttribute(attr, value) {
    
  }
}


<MyComponent attr1="val" />
```







LifeCycle：

> 组件的生命周期

> 组件的 Children: 分为 Content 型 Children 和 Template 型 Children

> 组件的 event

> 组件的 methods