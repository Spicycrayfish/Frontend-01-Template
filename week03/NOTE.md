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



> MDN上关于运算符优先级的 [汇总](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)



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

  * DebuggerStatement：一个 debugger，运行时角度不产生作用，仅用于调试

    ​	debugger;

  * ThrowStatement

    ​	throw a;

  * ContinueStatement

    ​	continue label1;

  * BreakStatement

    ​	break label2;

  * ReturnStatement

    ​	return 1 + 2;

* 组合语句

  * BlockStatement
  * IfStatement
  * SwitchStatement
  * IterationStatement
  * WithStatement
  * LabelledStatement
  * TryStatement

* 声明





### Runtime

* Completion Record
* Lexical Enviorment





#### Completion Record

* [[type]]: normal,  break,  continue,  return,  throw
* [[value]]: Types
* [[target]]: label：主要是循环用










####block

* BlockStatement

  {

  ​		...

  ​		...

  }

  
  
  * [[type]]: normal
  * [[value]]: --
  * [[target]]: --

顺序执行语句，若返回非 normal 则会中断，不再执行





### Iteration

* while(...) ...						子语句中若有 continue 和 break，则会被消费掉
* do ... whike(...);				
* for (*** ; ... ; ...) ...			
* for (*** in ...) ...
* for (*** of ...) ...				for  of  =>  Iterator  =>  Generator / Array

***：表示可以放声明



需要区分 带in 和 不带in 的表达式：Page 716，ConditionalExpression







###标签、循环、break、continue

* LabelledStatement
* IterationStatement
* ContinueStatement
* BreakStatement
* SwitchStatement



[[type]]: break  continue

[[value]]:  --

[[target]]: label

只有 **循环语句** 和 **switch语句**（即 IterationStatement、SwitchStatement）可以消费带 `label` 的 `continue` 和 `break`





####try

```javascript
try {
		...
    // throw
} catch ( *** /* 产生作用域，与后面大括号中的作用域一样 */ ) {
		...
} finally {
		...
}
```

* [[type]]: return
* [[value]]: --
* [[target]]: label







### 声明

* FunctionDeclaration

  `function foo() {}`

  注意函数声明与函数表达式的区别（类似的还有类声明）

* GeneratorDeclaration：generator 可以理解为特殊的 function，里面可以用 yield，可产生多个值

  ```javascript
  function* foo() {
      yield 1;
      yield 2;
    
      let i = 3;
      while (true) {
          yield i++;
      }
  }
  
  let gen = foo();
  gen.next();			// 1
  gen.next();			// 2
  gen.next();			// 3
  gen.next();			// 4
  gen.next();			// 5
  ```

  

* AsyncFunctionDeclaration

  ```javascript
  function sleep(d) {
      return new Promise(resolve => setTimeout(resolve, d));
  }
  
  void async function() {
      var i = 0;
      while (true) {
          console.log(i++);
          await sleep(1000);
      }
  }();
  ```

  

* AsyncGeneratorDeclaration

  ````javascript
  function sleep(d) {
      return new Promise(resolve => setTimeout(resolve, d));
  }
  async function* foo() {
      let i = 0;
      while(true) {
          yield i++;
          await sleep(1000);
      }
  }
  void async function() {
      let g = foo();
      for await(let e of g) {
          console.log(e);
      }
  }();
  
  // 1
  // 2
  // 3
  // 4
  // 5
  // 6
  // ...
  ````

  

* VariableStatement

  ```javascript
  var x = 0;
  function foo() {
      var o = {x: 1};
      x = 2;
      with(o) {
          x = 3;
      }
      console.log(x);
  }
  console.log(x)
  
  // 2
  // 2
  
  
  // var不管放在哪个变量前，针对的都是整个function，下面with中的var声明的就是foo函数中的x
  var x = 0;
  function foo() {
      var o = {x: 1};
      x = 2;
      with(o) {
          var x = 3;
      }
      console.log(x);
  }
  console.log(x)
  
  // 2
  // 0
  ```

  

* ClassDeclaration

* LexicalDeclaration

Page 242，13.1.4 Static Semantics: DeclarationPart

Page 252，13.3.2.1 Static Semantics: BoundNames





### Object

任何一个对象都是唯一的，这与它本身状态无关，即使两个状态完全一样的对象也并不相等。我们用状态描述对象，状态的改变即是行为。

对象：

* state
* behavior
* identifier



#### Object-Class

类是一种常见的描述对象方式，“归类”和“分类”是两个主要的流派，对于“归类”而言，多继承是非常自然的东西如C++；“分类”则是单继承结构，并且会有一个基类Object。



#### Object-Prototype

原型是一种更接近人类原始认知的描述对象的方法，不试图做严谨的分类，而是采用“相似”这样的方式去描述对象，任何对象仅需要描述它自己与原型的区别即可。



####对象设计的原则

在设计对象的状态和行为时，我们总是遵循“行为改变状态”的原则。

狗咬人：

描述这一行为时，不能设计为以下这种形式，因为狗的状态没改变：

```javascript
class Dog() {
    bite(human) {
        // ...
    }
}
```

人的状态改变了，所以应该设计为下面这样：

```javascript
class Human {
    hurt(damage) {
        // ...
    }
}
```

《面向对象分析与设计》





#### Object in JavaScript

在 JavaScript 运行时，原生对象的描述方式非常简单，我们只需关心原型和属性两个部分。属性就是 k-v对

JavaScript用属性来统一抽象对象的行为和状态，一般来说，数据属性用于描述状态，访问器属性用于描述行为；数据属性中如果存储函数，也可用于描述行为。



#### Object API / Grammar

* {}  .  []  Object.defineProperty
* Object.create / Object.setPrototypeOf / Object.getPrototypeOf
* new / class / extends
* new / function / prototype





#### Function Object

函数对象除了一般对象的属性和原型，还有一个行为 [[call]]。我们用 function 关键字、箭头运算符 或者Function构造器创建的对象，会有 [[call]] 这个行为。

我们用类似 f() 这样的语法把对象当函数调用时，会访问到 [[call]] 这个行为；若对应的对象没有 [[call]] 行为，则会报错。



特殊对象：

Page 127：9.4 Built-in Exotic Object Internal Methods and Slots