# 第13周总结

[Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 主要用于库和框架



参见 [vue reactivity](https://github.com/vuejs/vue-next/tree/master/packages/reactivity) 的 [effect](https://github.com/vuejs/vue-next/blob/master/packages/reactivity/__tests__/effect.spec.ts)，相当于 observe

收集事件：在 `get` 中收集对象及属性，依据对象和属性收集相关依赖





## range实现拖拽

监听 `document` 的移动事件，并及时移除监听事件

建议取拖拽事件的 `clientX` 和 `clientY` 这两个值



`top`、`left` 会涉及 `layout`，性能消耗更高，所以可以使用 transform 的 translate 来移动目标





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



####Attribute / Property / state /config 的区别

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
  
  get children() {}
  set children() {}
}


<MyComponent attr1="val" />
```







####LifeCycle：

* created

* mount   unmount

* JS change/set    user input
* render / update

* destroyed





#### Children

分为两种： 

* Content 型 Children 

```html
<my-button><img src="{{icon}}" />{{title}}</my-button>
```

* Template 型 Children

```html
<my-list>
  <li><img src="{{icon}}" />{{title}}</li>
</my-list>
```





示例：轮播组件的设计

``` 
Carousel

	state
		activeIndex
	
	property
		loop  time  imglist  autoplay  color
	
	attribute
		startIndex  loop  time  imglist  autoplay  color
	
	children
		CarouselView
		
	event
		change  click  hover  swipe
	
	method
		next()  prev()  goto()  
		play()  stop()
		
	config
		setInterval()
		setTimeout()
		requestAnimationFrame()
		mode: 'useRAF', "useTimeout"
```

组件化的本质即是将上述内容设计清楚，组件化方案即是用代码承载上述内容