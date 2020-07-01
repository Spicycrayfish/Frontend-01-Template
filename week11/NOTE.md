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

















































## Promise编程：

- 

## 算法训练：

- 寻路算法：
- 步骤：

1. 画一个一万（100*100）的大盘
2. 鼠标左键画点、右键清空
3. 数据可以保存
4. 寻路的一些算法：

> 广度搜索
> 深度搜索 （用stack来存储数据）
> A* 搜索 （使用Sorted class，计算最近的点）

1. 用堆来存储数据

## 正则：

- 正则特性：

> 捕获 ()
> 不捕获 (?:)

- string.match
- string.replace (注意$的问题)
- string.exec
- 例题：使用string.exec做语法高亮