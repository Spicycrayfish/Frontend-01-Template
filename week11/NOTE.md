# 第11周总结

## 异步编程

示例：红绿灯问题：

一个路口的红绿灯，会按照绿灯亮10秒、黄灯亮2秒、红灯亮5秒的顺序无限循环，请编写 JS 代码来控制这个红绿灯。

- 红绿灯问题的4种解法：

1. 使用setTimeout()

> 多层callback嵌套，callback hell。

2. 使用promise.then()

> 链式写法

3. 使用async await：

> 最好的写法

4. 使用generator

- 精髓在于sleep() 函数







##编程训练

寻路问题：将复杂任务拆解，一步步完成

1. 画出地图，可点击绘制障碍：
   1. 地图 (100x100) 可用一维数组表示，坐标点 (x, y) 通过计算得出数组下标；
   2. 为 `document` 全局添加 `mousedown` 和 `mouseup` 监听事件，再以全局变量 `mouse` 记录鼠标按下状态为 `true` 还是 `false`；
   3. 为地图上的单元格添加 `mousemove` 监听事件，根据全局变量 `mouse` 确定是否绘制地图障碍；
   4. 为鼠标右键添加清除障碍的方法，与上述步骤类似。
2. 编写寻路方法：
   1. 广度优先搜索 (BFS)，从起点开始向四周扩散，直到搜索到终点；
   2. 将 BFS 优化为 A* 搜索，用数组存储路径点，每次从数组中取离终点最近的点，从起点开始，向离终点更近的方向搜索，直到搜索到终点；
   3. A* 搜索，将数组优化为二叉堆，取堆顶元素为当前最优点，向离终点更近的方向搜索；



在搜索过程中，动态渲染搜索过程，可利用前面讲的异步编程，在绘制新的路径点时加上延迟，即可看到搜索路径动态渲染过程。







## 正则表达式

字符串的 [match](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match) 方法，返回数据非常复杂，一次可匹配出来多个结构

字符串的 [replace](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) 方法，可接收函数作为参数，函数返回值即为 replace 的结果，使用时应注意符号 $ 的转义



捕获 ()
不捕获 (?:)



巨型文本的分析用 exec

```javascript
let lastIndex = 0;
let token;

do {
  token = inputElement.exec(source);
  console.log(token);
} while (inputElement.lastIndex - lastIndex == token.length)
```



















