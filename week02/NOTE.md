# 第二周总结

第二周主要学习内容是 **编程语言通识** 和 **JavaScript的词法、类型**



### 编程语言通识

学习目的： **编程语言通识** 主要是为了让大家能读懂文档，了解专业技术名词和公式，方便技术交流。

语言按语法分为两种：

* 非形式语言
  * 中文
  * 英文
* 形式语言
  * 0型: 无限制文法，?::=? 
  * 1型: 上下文相关文法，?<A>?::=?<B>?
  * 2型: 上下文无关文法，<A>::=?
  * 3型: 正则文法，<A>::=<A>?



可编辑的语言是具有 [图灵完备性](https://zh.wikipedia.org/wiki/圖靈完備性) 的语，图灵完备性分为：

1. 命令式 - 图灵机：goto 或 if while
2. 声明式 - lambda：用递归实现



类型系统：

* 按动静划分
  * 动态类型系统
  * 静态类型系统
* 按是否隐式转换划分
  * 强类型
  * 弱类型
* 按复合类型划分
  * 结构体
  * 函数签名
* 加入继承后
  * 逆变
  * 协变





### JavaScript 的词法、类型

关于 [Unicode官网](https://home.unicode.org/) 及 [相关资料](https://www.fileformat.info/info/unicode/)

对 **Literals** 的理解分类：

* whiteSpace 空格
* LineTerminator 换行符
* Comment 注释
* Token 一切有效的东西



##### WhiteSpace：

TAB：制表符

VT：纵向制表符

FF：FormFeed

SP：空格键

NBSP：NO-BREAK SPACE（和 SP 的区别在于不会断开、不会合并）

ZWNBSP

USP：[Unicode](https://www.fileformat.info/info/unicode/category/Zs/list.htm) 上规定的空格



##### LineTerminator

(换行与回车)

LF

CR

LS

PS



##### Comment

单行注释：// ...

多行注释：/* ... */



##### Token

  - Punctuator: 符号

    ```
    { ( ) [ ] . ... ; , < > <= >= == != === !== + - * % ** ++ -- << >> >>> & | ^ ! ~ && || ? : = += -= *= %= **= <<= >>= >>>= &= |= ^= =>
    ```

    

  - Keywords：比如 `await`、`break`... 不能用作变量名，但像 getter 里的 `get`就是个例外

    ```
    await break case catch class const continue debugger default delete do
    else export extends finally for function if import in instanceof new return super switch this throw try typeof var void while with yield
    ```

    

  - IdentifierName：标识符，可以以字母、_ 或者 $ 开头，代码中用来标识**[变量](https://developer.mozilla.org/en-US/docs/Glossary/variable)、[函数](https://developer.mozilla.org/en-US/docs/Glossary/function)、或[属性](https://developer.mozilla.org/en-US/docs/Glossary/property)**的字符序列
    - 变量名：不能用 Keywords
    - 属性：可以用 Keywords
    
    
    
  - Literal: 直接量
    - Number
    - String
    - Boolean
    - Null
    - Undefind