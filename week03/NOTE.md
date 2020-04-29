# 第三周总结

浮点数要自己设置一个可以接受的精度损失，浮点数要减少算数计算

1.1 + 1.3 - 2.4  三次转换两次运算，共五次精度损失



## 表达式

从语法和运行时两个部分来讲

###Gramar

* Grammar Tree  vs  Priority
* Left hand side &  Right hand side



###Runtime

* Type Convertion
* Reference





优先级是由表达式生成树实现的

Tree  vs  Priority





###Expression

page 201: **12.3 Left-Hand-Side Expressions**

#####Member

* a.b
* a[b]
* foo \`string\` ：string template，
* super.b：父类调用
* super['b']
* new.target：判断函数是不是被 new 调用的，js库作者希望掌握库如何被使用，避免用户以他们不希望的方式调用库
* new Foo()



> Member Expression 返回的是一个 Reference 类型

##### Reference

* Object

* Key

赋值特性：

* delete
* assign





##### New

* new Foo

  Example:  new a()()   	new new a()



##### Call

* foo()
* super()
* foo()['b']
* foo().b
* foo() \`abc\`

Example:  new a()['b']



Member、New、Call 这三种又被叫做 **Left Handside Expression**





##### Left Handside  &  Right Handside

即等号左边和等号右边，等号左边必须要是一个 Reference

Exp:

`a.b = c;`

`a + b = c;`





下面是 **Right Handside Expression**

page178，11.9.1 **Rules of Automatic Semicolon Insertion**

##### Update

* a++
* a--
* --a
* ++a





#####Unary  单目运算符

* delete a.b
* void foo()
* typeof a
* +a
* -a
* ~a
* !a
* await a

**IIFE** 立即执行函数表达式，最佳实践是用 `void` 加上函数声明产生作用域，用括号会可能会与前文关联，引发未知错误。





#####Exponenttal

* **

唯一右结合的表达式：

`3 ** 2 ** 3` => `3 ** (2 ** 3)`





##### Multiplicative

*/ %

#####Addtive

+-

##### Shift

<< >> >>>

##### Relationship

<  >  <=  >=  instanceof  in





#####Equality

* ==

* !=

* ===

* !==

#####Bitwise

* & ^ |





##### Logical

* &&
* ||

逻辑运算有短路逻辑

##### Conditional

* ? :

JS中的三目运算符也是短路逻辑，不一定会把两边都计算出来；

三目运算符可连用：

`i > 0 ? i > 11 ? 'function' : 'exponent' : 'sign'`





JS中有两种加法（从运行时角度），一种是 Number 类型的加法，一种是 String 类型的加法；JS中只有一种乘法，即 Number 的乘法。





### Boxing  &  Unboxing  装箱和拆箱

* toPremitive
* toString  vs  valueOf



Number  String  Symbol  Boolean，这四种类型可装箱。（bigInt？）

Number、String、Boolean 不作为 new 调用时，返回的就是普通类型，而不是对象；如果用 new 调用则会返回对象。Symbol 不能 new，其他跟对象一样。



优先使用 valueOf，然后使用 toString，但 toPremitive 是最优先的：

```javascript
1 + {valueOf(){ return 2 }}				// 3
1 + {toString(){ return 2 }}			// 3

1 + {toString(){ return '4' }}		// '14'

1 + {valueOf(){ return 2 }, toString(){ return '4' }}				// 3
'1' + {valueOf(){ return 2 }, toString(){ return '4' }}			// '12'
```

page 54，7.1.1 **toPrimitive**











## Statement

### Grammar

* 简单语句

  * ExpressionStatement

    ​	a = 1 + 2;

  * EmptyStatement：一个分号 

    ​	;

  * DebuggerStatement：一个 debugger，运行时角度不产生作用，用于调试

    ​	debugger

  * ThrowStatement

    ​	throw a

  * ContinueStatement

    ​	continue label1

  * BreakStatement

    ​	break label2

  * ReturnStatement

    ​	return 1 + 2;

* 组合语句

* 声明







### Runtime



### Completion Record

* [[type]]: normal,  break,  continue,  return,  throw
* [[value]]: Types
* [[target]]: label：主要是循环用



* Lexical Ecviorment





### block

* BlockStatement

  {

  ​		...

  ​		...

  }

  * [[type]]: normal
  * [[value]]: --
  * [[target]]: --

返回非 normal 则会中断，不再执行





### Iteration

* while(...) ...
* do ... whike(...);
* for (*** ; ... ; ...) ...
* for (*** in ...) ...
* for (*** of ...) ...

***：表示可以放声明



###标签、循环、break、continue

* LabelledStatement
* IterationStatement
* ContinueStatement
* BreakStatement
* SwitchStatement



* [[type]]: break  continue
* [[value]]:  --
* [[target]]: label



### try

try {

​		...

} catch( ... ) {

​		...

} finally {

​		...

}



* [[type]]: return
* [[value]]: --
* [[target]]: label



### 声明

* FunctionDeclaration
* GeneratorDeclaration：generator 可以理解为特殊的 function，里面可以用 yield，可产生多个值
* AsyncFunctionDeclaration
* AsyncFeneratorDeclaration
* VariableStatement
* ClassDeclaration
* LexicalDeclaration