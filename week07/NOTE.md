# 排版

主轴（Main Axis）和交叉轴（Cross Axis）

flex-direction: row

* Main: wdith  x  left  right
* Cross: height  y  top  bottom



flex-direction: column

* Main: height  y  top  bottom
* Main: wdith  x  left  right





收集元素入行

根据主轴尺寸，把元素分到行中；若设置了 no-wrap，则强行分配进第一行





计算主轴：

找出所有 flex 元素

把主轴方向的剩余尺寸按比例分配给这些元素

若剩余空间为负数，所有flex元素为 0，等比例压缩剩余元素





计算交叉轴：

根据每一行中最大元素尺寸计算行高，根据行高 flex-align 和 item-align，确定元素具体位置





# 绘制







参考链接：

- https://www.runoob.com/w3cnote/flex-grammar.html
- https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
- https://www.npmjs.com/package/images





# 重学CSS



##CSS语法的研究

CSS总体结构

* @charset
* @import
* rules
  * @media
  * @page
  * rule





CSS @规则的研究





CSS规则的结构

* Selector（一般选择看 3）

  https://www.w3.org/TR/selectors-3/

  https://www.w3.org/TR/selectors-4/

* Declaration（键值对构成）

  * Key
    * Properties
    * Variables
  * Value





> 关于兼容性问题：http://www.html-js.com/article/2402





打开 https://www.w3.org/TR/?tag=css 网站，用下面代码收集所有CSS标准

```javascript
var lis = document.getElementById("container").children


var result = [];


for(let li of lis) {
    if(li.getAttribute('data-tag').match(/css/))
        result.push({
            name:li.children[1].innerText,
            url:li.children[1].children[0].href
        })
}
console.log(result)
```



通过上面各标准链接，可收集 CSS 属性相关标准：

```javascript
let iframe = document.createElement("iframe");
document.body.innerHTML = "";
document.body.appendChild(iframe);



function happen(element, event){
    return new Promise(function(resolve){
        let handler = () => {
            resolve();
            element.removeEventListener(event, handler);
        }
        element.addEventListener(event, handler);
    })
}



void async function(){
    for(let standard of standards) {
        iframe.src = standard.url;
        console.log(standard.name);
        await happen(iframe, "load");
    }
}();

```

