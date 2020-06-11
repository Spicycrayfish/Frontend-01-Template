# 重学CSS

### 选择器语法

* 简单选择器
  * *
  * div svg|a   (namespace，默认的命名空间是html 可以省略不写)
  * .class
  * id
  * [attr=value]  （~=   |=）
  * :hover
  * ::before

* 复合选择器

  * <简单选择器><简单选择器><简单选择器>
  * *或者div必须写在最前面

* 复杂选择器

  * <复合选择器><sp><复合选择器>    （<sp>为空格）

  * <复合选择器>">"<复合选择器>

  * <复合选择器>"~"<复合选择器>

  * <复合选择器>"+"<复合选择器>

  * <复合选择器>"||"<复合选择器>      （较少使用）

    



简单选择器优先级计数：

`#id div.a#id`  :  [0, 2, 1, 1]

inline-style、id、class、tag

练习：

`div#a.b.c[id=x]` : [0, 1, 3, 1]   属性选择器相当于类选择器

`#a:not(#b)` : [0, 2, 0, 0]

`*.a`	: [0, 0, 1, 0]

`div.a`	: [0, 0, 1, 1]





### 伪类

链接/行为

* :any-link  (所有链接)
* :link (未访问过的超链接)  :visited (访问过的超链接)
* :hover
* :active
* :focus
* :target  (为当前锚点目标链接时选中)



树结构

* :empty
* :nth-child()
* :nth-last-child()
* :first-child  :last-child  :only-child

需要回溯的选择器：:nth-last-child()、 :last-child、:only-child  不推荐使用，部分浏览器未实现，实现的也有较大消耗



逻辑型

* :not 伪类
* :where  :has





###伪元素

* ::before
* ::after
* ::firstLine
* ::firstletter



可用属性：

first-line：

```
font系列  color系列  background系列  word-spacing  letter-spacing  text-decoration
text-transform  line-height
```



first-letter：

```
font系列  color系列  background系列  word-spacing  letter-spacing  text-decoration
text-transform  line-height  float  vertical-align  盒模型系列：margin padding border
```







### 排版

#### 盒（Box）

Tag	Element	Box

排版和渲染的基本单位是**盒**



盒模型：box-sizing

* content-box
* border-box





#### 正常流

正常流排版：

* 收集盒进入行里面
* 计算盒在行中的排布
* 计算行的排布



行内从左到右：（inline-formating-context）ifc

Text  inline-box  inline-box



行与行从上到下：（block-formating-context）bfc

line-box

block-box

block-box



####正常流的行模型

文字混排关系：文字本身占据空间、文字对齐关系、行内盒与文字的对齐关系、行高；

基线：文字按照基线对齐（相当于英文书写本 从上往下数的第三根横线）；

文字上缘、文字下缘，根据行高又有行内的边距留白 即文字上缘和下缘到上边与下边的距离；用 `vertical-align` 可以设置这几个值；



一个 *line-box* 如果里面没有任何文字，那么它的基线在底部 即盒子的下边



建议 `vertical-align` 只用 *top*  *bottom*  *middle* 三个值；



```html
<div style="font-size:50px;line-height:100px;background-color:pink;">
    <div style="vertical-align:text-bottom;overflow:visible;display:inline-block;width:1px;height:1px;">
        <div style="width:1000px;;height:1px;background:red;"></div>
    </div>
    <div style="vertical-align:text-top;overflow:visible;display:inline-block;width:1px;height:1px;">
        <div style="width:1000px;;height:1px;background:red;"></div>
    </div>
    <span>Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello </span>
    <div style="vertical-align:text-bottom;line-height:70px;width:100px;height:150px;background-color:aqua;display:inline-block">1</div>
    <div style="vertical-align:top;line-height:70px;width:100px;height:50px;background-color:aqua;display:inline-block">1</div>
    <div style="vertical-align:base-line;line-height:70px;width:100px;height:550px;background-color:plum;display:inline-block">1</div>


</div>

```









### margin折叠

margin折叠只会发生在 **BFC** 里，



overflow: visible  与  BFC



float 和 clear





关于flex：

https://www.w3.org/TR/2018/CR-css-flexbox-1-20181119/#flex-items







总结：

- 大家请记住下面这个表现原则：如果一个元素具有 BFC，内部子元素再怎么翻江倒海、翻云覆雨，都不会影响外部的元素。所以，BFC 元素是不可能发生 margin 重叠的，因为 margin 重叠是会影响外部的元素的；BFC 元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会影响外部元素的设定。
- block-level 表示可以被放入 bfc
- block-container 表示可以容纳 bfc
- block-box = block-level + block-container
- block-box 如果 overflow 是 visible， 那么就跟父 bfc 合并