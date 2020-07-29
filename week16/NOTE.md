# 第十六周总结

##组件化|手势

* 点击跳转问题（左右滑动轮播图事件与点击轮播图跳转事件的冲突 mouseon mousemove）
* 拖拽行为的研究（纵向拖拽与横向拖拽的冲突）
* 移动兼容问题

关于手势的事件 [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) 

> touch 可以多指操作

关于手势操作与鼠标操作的区别，我们需要做一层统一的抽象，以便统一处理

https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events



### 手势介绍

* Tap（手指点击）
* Pan（拖拽）
* Flick（与 Pan 类似，但速度更快，手指会迅速离开屏幕，有的库也称 swipe）
* Press（长按事件）

> 系统手势可关闭，且上面事件只涉及单指手势，系统多占用多指手势



####事件抽象：

监听鼠标事件：mouseon mousemove mousedown  里面监听 mousemove



touch 事件监听到的是 TouchEvent，其中最重要的是 changedTouches，包含一系列的 touch，有天然的目标锁定能力



> [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) 中就不需要区分 mouseevent 和 touchevent





关于手势事件的相互关系：

start  ── (end) ──  tap

 └── (移动10px) ── pan start ── (move) ── pan move ── (end) ── pan end

​                                             ↑ (移动10px)                             └── (end 且速度 > ?) ── flick

 └── (0.5s) ──  press start  ── (end) ──  press end





自定义派发事件

https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events









组件化跟业务强相关，vue 和 react 代表组件化的两大方向