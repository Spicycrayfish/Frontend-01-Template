# 第十四周总结

熟悉 [JSX](https://facebook.github.io/jsx/)

- 安装 webpack：[ https://webpack.js.org/concepts/](https://webpack.js.org/concepts/)
- https://babeljs.io/docs/en/babel-plugin-transform-react-jsx/
- https://github.com/babel/babel-loader
- https://facebook.github.io/jsx/



主要掌握下面 `Text（文本节点）`、`Wrapper（HTML原生节点）`、`MyComponent（自定义组件）` 这三个封装

```javascript
class Text {
    constructor(text){
        this.children = [];
        this.root = document.createTextNode(text);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}

class Wrapper{
    constructor(type){
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name, value) { //attribute
        this.root.setAttribute(name, value);
    }

    appendChild(child){
        this.children.push(child);

    }

    mountTo(parent){
        parent.appendChild(this.root);

        for(let child of this.children){
            child.mountTo(this.root);
        }
    }

}

class MyComponent {
    constructor(config){
        this.children = [];
    }

    setAttribute(name, value) { //attribute
        this.root.setAttribute(name, value);
    }

    appendChild(child){
        this.children.push(child);
    }

    render(){
        
        return <article>
            <header>I'm a header</header>
            {this.slot}
            <footer>I'm a footer</footer>
        </article>
    }

    mountTo(parent){
        this.slot = <div></div>
        for(let child of this.children){
            debugger;
            this.slot.appendChild(child)
        }
        this.render().mountTo(parent)

    }
}
```





轮播图思考：

所有图片整体移动，还是只移动显示的两张；

整数循环可利用取余运算，若要避免产生负数，可多加一个总长度数：

```javascript
let nextPosition = (position + 1) % this.data.length;

let nextPosition = (position - 1 + this.data.length) % this.data.length;
```



拖拽时拖拽元素的位置移动操作，建议使用 `transform`，它不会涉及 `layout`，性能消耗相对较少，



setTimeout 16毫秒 与 requestAnimationFrame 有时候是不一样的，requestAnimationFrame 需要套两层，

requestAnimationFrame 即是找到浏览器下一帧

有两个动画时，用 setTimeout 16毫秒 将两个动画隔开，这是比较安全和推荐的处理方式



> 为什么是16ms？16ms正好是一帧的时间，一般这也是浏览器的刷新帧率，用0ms有可能会出问题




