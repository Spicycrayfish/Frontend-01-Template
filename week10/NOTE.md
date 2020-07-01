###Range Api

* `var range = new Range()`
* `range.setStart(element, 9)`
* `range.setEnd(element, 4)`
* `var range = document.getSelection().getRangeAt(0)`



* `range.setStartBefore`
* `range.setEndBefore`
* `range.setStartAfter`
* `range.setEndAfter`
* `range.selectNode`
* `range.selectNodeContents`



* `var fragment = range.extractContents()`
* `range.insertNode(document.createTextNode('aaa'))`



把一个元素的子元素逆序

```javascript
let element = document.getElementById('a');

function reverseChildren1(ele) {
  let l = ele.childNodes.length;
  while(l-- > 0) {
    ele.appendChild(ele.childNodes[l])
  }
}

function reverseChildren2(ele) {
  let range = new Range();
  range.selectNodeContents(element);
  
  // 该方法整体对DOM树的操作只有两次，细节操作都是在fragment中做的，因此适用于海量DOM操作的性能优化
  let fragment = range.extractContents();
  let l = ele.childNodes.length;
  while(l-- > 0) {
    fragment.appendChild(fragment.childNodes[l])
  }
  ele.appendChild(fragment);
}
```





### CSSOM

document.styleSheets



CSSStyleSheet  =>  StyleSheet  

HTMLElement  => Element



Rules：

* `document.styleSheets[0].cssRules`
  * cssText
  * selectorText

* `document.styleSheets[0].insertRule("p { color:pink; }", 0)`

* `document.styleSheets[0].removeRule(0)`





####getComputedStyle

window.getComputedStyle(elt, pseudoElt);

	* elt   想要获取的元素
	* pseudoElt   可选，伪元素



> 关于位置 要记住的API：
>
> getClientRects
>
> getBoundingClientRects













### TicTacToe



> 性能好坏是测出来的，首先考虑性能是否重要，其次考虑性能是好是坏；绑定多个事件不会影响性能，触发多个事件才会影响性能。





















