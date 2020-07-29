# 第15周总结

###Vue 风格的 SFC (Single File Components)

* vue 风格的 SFC 与 React 的 JSX 都可以通过 webpack 的 loader 转译成 JS 代码，甚至可以转成同样的代码
* 怎么写 webpack 的loader  https://webpack.js.org/contribute/writing-a-loader/



HTML解析要注意script标签需要特殊处理：

https://html.spec.whatwg.org/multipage/parsing.html#tokenization



关于 SFC 的处理：

1. 在 webpack 中加入 loader 配置，下面示例中我们将所有 .view 文件放到 myloader.js 文件中进行处理：

   ```javascript
   {
       test: /\.view/,
           use:{
               loader: require.resolve("./myloader.js")
           }
   }
   ```

   

2. loader 会将传入的 source 作处理，source 即是 .view 文件中的具体内容，处理过程即是编译过程，将 SFC 代码编辑为 js 代码，取出其中的 template、script、style 代码，生成组件类代码；

3. 在主体项目中调用到 .view 文件，就会通过loader将 .view 文件转换为 js 文件；







###动画

####参考链接：

- 代码截图链接：[ https://pan.baidu.com/s/1UOPTL-wYTWCAudYkvg2tGg](https://pan.baidu.com/s/1UOPTL-wYTWCAudYkvg2tGg)
  提取码：p6zx
- https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
- [http://en.wikipedia.org/wiki/Newton’s_method](http://en.wikipedia.org/wiki/Newton's_method)
- https://cubic-bezier.com/#.25,.1,.25,1





####如何关闭CSS动画

css 动画无法方便的暂停，将 transition 置为"none"时，不会停止动画，而是直接跳到动画的最后一帧。 



如何使其停在当前位置？（获取元素当前位置，设置 transition 为 none 的同时设置其 transform，让元素停留在当前位置）

* getComputedStyle（该方案已不可行）经过 computed 的 transform 值会变为 matrix transform，要从 matrix 中反解出 translate 是非常难的操作；

由于无法便利关闭的问题，CSS 动画始终不是特别好的解决方案，所以使用 JavaScript 做动画效果。





####JS 动画

思考：用户会如何使用一个动画类库？

```javascript
// 属性动画，将一个对象的某个属性在一定时间内从初始值变为目标值
let animation = new Animation(object, property, start, end, duration, delay, timingFunction);

let animation2 = new Animation(object2, property, start, end, duration, delay, timingFunction);			

// animation.start()
// animation.stop()
// animation.pause()
// animation.resume()

// 当有多个animation时，每个animation都可能有开始、暂停、结束操作，性能消耗较大，所以我们需要用到时间线来管理多个动画，同一个时间线里的动画可以一起开始、暂停、结束等，每一帧只调用一个函数
let timeline = new Timeline;

timeline.add(animation);
timeline.add(animation2);

timeline.start();
timeline.stop();
timeline.pause();
timeline.resume();
```



> 动画中用js每帧改变css属性对性能的影响在于，改的这个属性会否触发重排



- Timeline（时间线）
  - constructor
    - this.animations = []; // 存放加进来的动画
    - this.requestId = null; // requestAnimationFrame 产生的 id
    - this.state = "inited"; // timeline 的状态，包括"inited", "playing", "paused"
  - tick()
    - timeline 的每一帧里执行的操作，重复调用即可形成动画
  - start()
    - timeline 开始执行
  - restart()
    - 重置 timeline 的状态和动画的状态，重新开始 timeline
  - pause()
    - timeline 暂停执行
  - resume()
    - time 继续执行
  - add(animation, startTime)
    - 在 timeline 中加入动画
    - animation：Animation 类的实例
    - startTime：动画加入的时间
- Animation
  - constructor(object, property, start, end, duration, delay, timingFunction, template)
    - timingFunction: 跟随时间变化的函数，返回 0-1 之间的一个数
    - template: 根据 value 计算的模板函数，最终值赋值给 object[property]
  - valueFromProgression(progression)
    - progression: timingFunction 的返回值



