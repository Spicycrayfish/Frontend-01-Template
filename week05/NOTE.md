# 结构化程序设计



###Realm

一套完整的 JS 内置对象。

在 JS 中，函数表达式和对象直接量均会创建对象，使用 . 做隐式转换也会创建对象，这些对象也是有原型的，如果没有 Realm，就不知道他们的原型是什么。



global 中的所有对象：

```javascript
var objects = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect
];
```



获取所有(?) realm 对象

```javascript
let globalProperties = [
    'eval',
    'isFinite',
    'isNaN',
    'parseFloat',
    'parseInt',
    'decodeURI',
    'decodeURIComponent',
    'encodeURI',
    'encodeURIComponent',
    'Array',
    'Date',
    'RegExp',
    'Promise',
    'Proxy',
    'Map',
    'WeakMap',
    'Set',
    'WeakSet',
    'Function',
    'Boolean',
    'String',
    'Number',
    'Symbol',
    'Object',
    'Error',
    'EvalError',
    'RangeError',
    'ReferenceError',
    'SyntaxError',
    'TypeError',
    'URIError',
    'ArrayBuffer',
    'SharedArrayBuffer',
    'DataView',
    'Float32Array',
    'Float64Array',
    'Int8Array',
    'Int16Array',
    'Int32Array',
    'Uint8Array',
    'Uint16Array',
    'Uint32Array',
    'Uint8ClampedArray',
    'Atomics',
    'JSON',
    'Math',
    'Reflect'
];

let queue = [];

for (let p of globalProperties) {
    queue.push({
        path: [p],
        object: this[p]
    });
}

let set = new set();
let current;

while (queue.length) {
    current = queue.shift();
    if (set.has(current.object)) {
        continue;
    }

    set.add(current.object);
  
    let proto = Object.getPrototypeOf(current.object);
    if (proto) {
        queue.push({
            path: current.path.concat(['__proto__']),
            object: proto
        });
    }
    
    for (let p of Object.getOwnPropertyNames(current.object)) {
        let prop = Object.getOwnPropertyDescriptor(current.object, p);

        if (prop.hasOwnProperty('value') && 
            ((prop.value != null) && (typeof prop.value === 'object') || (typeof prop.value === 'object')) 
            && prop.value instanceof Object) {
            queue.push({
                path: current.path.concat([p]),
                object: prop.value
            });
        }

        if (prop.hasOwnProperty('get') && (typeof prop.get === 'function')) {
            queue.push({
                path: current.path.concat([p]),
                object: prop.get
            });
        }

        if (prop.hasOwnProperty('set') && (typeof prop.set === 'function')) {
            queue.push({
                path: current.path.concat([p]),
                object: prop.set
            });
        }

    }
}
```





### 函数调用

执行上下文栈  Execution Context Stack，栈顶元素为 Running Execution Context



Execution Context

* code evaluation state
* Function
* Script or Module
* Generator（在 Generator Execution Contexts 中才有）



* Realm
* LexicalEnvironment
* VariableEnvironment





#### LexicalEnvironment

* this
* new.target
* super
* 变量 





#### VariableEnvironment

是个历史遗留的包袱，只用于处理 var 声明，一般的场景有：

```javascript
{
    let y = 2;
    eval('var x = 1;');
}

with({a: 1}) {
    eval('var x;');
}
```





# 浏览器

###浏览器工作原理

URL    == http =>    HTML    == parse =>    DOM    == css computing =>    DOM with CSS    == layout =>    DOM with position    == render =>    bitmap





###ISO-OSI 七层网络模型

应用

表示

会话					HTTP						require('http')

***

传输					TCP							require('net')

网络					Internet

数据链路			4G/5G/WIFI

物理层





### TCP 与 IP 的一些基础知识

TCP

* 流：可靠流
* 端口：分配包给对应端口
* require('net');



IP

* 包：也会受到很多没用到的包，会转发出去
* IP地址
* libnet / libpcap





### HTTP

一问一答，先问后答

* Request
* Response





https://tools.ietf.org/html/rfc2616

**Request** 由三部分组成：

* Request line

  ```
  POST  /  HTTP/1.1
  ```

  * method（OPTIONS / GET / HEAD / POST / PUT / DELETE / TRACE / CONNECT）第9章
  * path（/ 后面到第一个 ? 之间的内容就是路径 path）
  *  HTTP/1.1（协议）

* headers（HTTP头）

  ```
  HOST: 127.0.0.1
  Content-type: application/x-www-form-urlencoded
  ```

* body

  ```
  field1=aaa&code=x%3D1
  ```

  

  

### Response

```
HTTP/1.1 200 OK														status line
Content-Type: text/html										headers
Date: Mon, 23 Dec 2020 04:00:00 GMT
Connection: keep-alive
Transfer-Encoding: chunked

26																				body
<html><body> Hello world</body></html>


0
```






