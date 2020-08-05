# 第十七周总结

组件是拥有以下属性的一种特殊对象，通常用来描述一个UI的元素，是当前最适用于UI的抽象概念，实现方案的承载多种多样，如 React 用 hook

* Properties
* Methods
* Inherit
* Attribute
* Config & State
* Event
* LifeCycle
* Children



自己完成一个组件系统，理解一个组件系统





### 工具

* Jenkins
* Git
* webpack
* Travis
* babel
* eslint
* gulp
* create-react-app
* umi
* gitlab
* vscode
* mocha
* htto-server
* rollup
* vue-cli
* grunt
* mock
* husky
* prettier
* axios
* yeoman
* postman
* dva
* lerna
* jest
* maven
* easymock
* swagger
* wireshark
* charles





工具链的简单分类：

1. 初始化：yeoman、create-react-app、vue-cli
2. 开发/调试：dev-tool/chrome、webpack-dev-server、mock、wireshark、charles
3. 测试：mocha、jest
4. 发布：lint、jenkins

初始化工具是最核心的，它决定了后续流程工具是什么、怎么用 





> 闭包可代替递归

未命名函数实现递归：

```javascript
(g => 
	(f => f(f))(
  	self =>
  		g( (...args) => self(self).apply(this, args)	)
	))(
  	self => {
      return n => n > 0 ? self(n - 1) + n : 0
    })(100)
```





yeoman 三大核心能力

1. 从用户处收集信息 https://yeoman.io/authoring/user-interactions.html
2. npm操作能力 https://yeoman.io/authoring/dependencies.html
3. 文件模板操作能力 https://yeoman.io/authoring/file-system.html （状态机）





组件体系、组件化方案



命令行操作：

https://stackoverflow.com/questions/10585683/how-do-you-edit-existing-text-and-move-the-cursor-around-in-the-terminal/10830168





readline:  https://nodejs.org/dist/latest-v14.x/docs/api/readline.html

https://stackoverflow.com/questions/5006821/nodejs-how-to-read-keystrokes-from-stdin