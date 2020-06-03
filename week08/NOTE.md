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



