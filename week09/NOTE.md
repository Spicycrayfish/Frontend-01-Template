## CSS 动画

#### Animation

* @keyframes 定义
* animation 使用

```css
@keyframes mykf
{
  from {background: red;}
  to {background: yellow;}
}

div {
  animation: mykf 5s infinite;
}
```



* animation-name  时间曲线
* animation-duration  动画的时长
* animation-timing-function  动画的时间曲线
* animation-delay  动画开始前的延迟
* animation-iteration-count  动画的播放次数
* animation-direction  动画的分向



```css
@keyframes mykf {
  0% {top: 0; transition: top ease;}
  50% {top: 30px; transition: top ease-in;}
  75% {top: 10px; transition: top ease-out;}
  100% {top: 0; transition: top linear;}
}
```





#### Transition

* transition-property  要变换的属性
* transition-duration  变换的时长
* transition-timing-function  时间曲线
* transition-delay  延迟



> - https://cubic-bezier.com/#.17,.67,.83,.67
> - [https://zh.wikipedia.org/wiki/ 貝茲曲線](https://zh.wikipedia.org/wiki/貝茲曲線)







###渲染与颜色





###形状

data uri + svg





`getComputedStyle(document.body)`



```
0: "animation-delay"
1: "animation-direction"
2: "animation-duration"
3: "animation-fill-mode"
4: "animation-iteration-count"
5: "animation-name"
6: "animation-play-state"
7: "animation-timing-function"
8: "background-attachment"
9: "background-blend-mode"
10: "background-clip"
11: "background-color"
12: "background-image"
13: "background-origin"
14: "background-position"
15: "background-repeat"
16: "background-size"
17: "border-bottom-color"
18: "border-bottom-left-radius"
19: "border-bottom-right-radius"
20: "border-bottom-style"
21: "border-bottom-width"
22: "border-collapse"
23: "border-image-outset"
24: "border-image-repeat"
25: "border-image-slice"
26: "border-image-source"
27: "border-image-width"
28: "border-left-color"
29: "border-left-style"
30: "border-left-width"
31: "border-right-color"
32: "border-right-style"
33: "border-right-width"
34: "border-top-color"
35: "border-top-left-radius"
36: "border-top-right-radius"
37: "border-top-style"
38: "border-top-width"
39: "bottom"
40: "box-shadow"
41: "box-sizing"
42: "break-after"
43: "break-before"
44: "break-inside"
45: "caption-side"
46: "clear"
47: "clip"
48: "color"
49: "content"
50: "cursor"
51: "direction"
52: "display"
53: "empty-cells"
54: "float"
55: "font-family"
56: "font-kerning"
57: "font-optical-sizing"
58: "font-size"
59: "font-stretch"
60: "font-style"
61: "font-variant"
62: "font-variant-ligatures"
63: "font-variant-caps"
64: "font-variant-numeric"
65: "font-variant-east-asian"
66: "font-weight"
67: "height"
68: "image-orientation"
69: "image-rendering"
70: "isolation"
71: "justify-items"
72: "justify-self"
73: "left"
74: "letter-spacing"
75: "line-height"
76: "list-style-image"
77: "list-style-position"
78: "list-style-type"
79: "margin-bottom"
80: "margin-left"
81: "margin-right"
82: "margin-top"
83: "max-height"
84: "max-width"
85: "min-height"
86: "min-width"
87: "mix-blend-mode"
88: "object-fit"
89: "object-position"
90: "offset-distance"
91: "offset-path"
92: "offset-rotate"
93: "opacity"
94: "orphans"
95: "outline-color"
96: "outline-offset"
97: "outline-style"
98: "outline-width"
99: "overflow-anchor"
100: "overflow-wrap"
101: "overflow-x"
102: "overflow-y"
103: "padding-bottom"
104: "padding-left"
105: "padding-right"
106: "padding-top"
107: "pointer-events"
108: "position"
109: "resize"
110: "right"
111: "scroll-behavior"
112: "speak"
113: "table-layout"
114: "tab-size"
115: "text-align"
116: "text-align-last"
117: "text-decoration"
118: "text-decoration-line"
119: "text-decoration-style"
120: "text-decoration-color"
121: "text-decoration-skip-ink"
122: "text-underline-position"
123: "text-indent"
124: "text-rendering"
125: "text-shadow"
126: "text-size-adjust"
127: "text-overflow"
128: "text-transform"
129: "top"
130: "touch-action"
131: "transition-delay"
132: "transition-duration"
133: "transition-property"
134: "transition-timing-function"
135: "unicode-bidi"
136: "vertical-align"
137: "visibility"
138: "white-space"
139: "widows"
140: "width"
141: "will-change"
142: "word-break"
143: "word-spacing"
144: "z-index"
145: "zoom"
146: "-webkit-appearance"
147: "backface-visibility"
148: "-webkit-border-horizontal-spacing"
149: "-webkit-border-image"
150: "-webkit-border-vertical-spacing"
151: "-webkit-box-align"
152: "-webkit-box-decoration-break"
153: "-webkit-box-direction"
154: "-webkit-box-flex"
155: "-webkit-box-ordinal-group"
156: "-webkit-box-orient"
157: "-webkit-box-pack"
158: "-webkit-box-reflect"
159: "column-count"
160: "column-gap"
161: "column-rule-color"
162: "column-rule-style"
163: "column-rule-width"
164: "column-span"
165: "column-width"
166: "backdrop-filter"
167: "align-content"
168: "align-items"
169: "align-self"
170: "flex-basis"
171: "flex-grow"
172: "flex-shrink"
173: "flex-direction"
174: "flex-wrap"
175: "justify-content"
176: "-webkit-font-smoothing"
177: "grid-auto-columns"
178: "grid-auto-flow"
179: "grid-auto-rows"
180: "grid-column-end"
181: "grid-column-start"
182: "grid-template-areas"
183: "grid-template-columns"
184: "grid-template-rows"
185: "grid-row-end"
186: "grid-row-start"
187: "row-gap"
188: "-webkit-highlight"
189: "hyphens"
190: "-webkit-hyphenate-character"
191: "-webkit-line-break"
192: "-webkit-line-clamp"
193: "-webkit-locale"
194: "-webkit-mask-box-image"
195: "-webkit-mask-box-image-outset"
196: "-webkit-mask-box-image-repeat"
197: "-webkit-mask-box-image-slice"
198: "-webkit-mask-box-image-source"
199: "-webkit-mask-box-image-width"
200: "-webkit-mask-clip"
201: "-webkit-mask-composite"
202: "-webkit-mask-image"
203: "-webkit-mask-origin"
204: "-webkit-mask-position"
205: "-webkit-mask-repeat"
206: "-webkit-mask-size"
207: "order"
208: "perspective"
209: "perspective-origin"
210: "-webkit-print-color-adjust"
211: "-webkit-rtl-ordering"
212: "shape-outside"
213: "shape-image-threshold"
214: "shape-margin"
215: "-webkit-tap-highlight-color"
216: "-webkit-text-combine"
217: "-webkit-text-decorations-in-effect"
218: "-webkit-text-emphasis-color"
219: "-webkit-text-emphasis-position"
220: "-webkit-text-emphasis-style"
221: "-webkit-text-fill-color"
222: "-webkit-text-orientation"
223: "-webkit-text-security"
224: "-webkit-text-stroke-color"
225: "-webkit-text-stroke-width"
226: "transform"
227: "transform-origin"
228: "transform-style"
229: "-webkit-user-drag"
230: "-webkit-user-modify"
231: "user-select"
232: "-webkit-writing-mode"
233: "-webkit-app-region"
234: "buffered-rendering"
235: "clip-path"
236: "clip-rule"
237: "mask"
238: "filter"
239: "flood-color"
240: "flood-opacity"
241: "lighting-color"
242: "stop-color"
243: "stop-opacity"
244: "color-interpolation"
245: "color-interpolation-filters"
246: "color-rendering"
247: "fill"
248: "fill-opacity"
249: "fill-rule"
250: "marker-end"
251: "marker-mid"
252: "marker-start"
253: "mask-type"
254: "shape-rendering"
255: "stroke"
256: "stroke-dasharray"
257: "stroke-dashoffset"
258: "stroke-linecap"
259: "stroke-linejoin"
260: "stroke-miterlimit"
261: "stroke-opacity"
262: "stroke-width"
263: "alignment-baseline"
264: "baseline-shift"
265: "dominant-baseline"
266: "text-anchor"
267: "writing-mode"
268: "vector-effect"
269: "paint-order"
270: "d"
271: "cx"
272: "cy"
273: "x"
274: "y"
275: "r"
276: "rx"
277: "ry"
278: "caret-color"
279: "line-break"
```





CSS property

* layout
* interactive
* render / draw
* other
* svg









## 重学HTML

HTML的定义：XML 与 SGML

不间断空格：no-break space，用该空格连接起来的词会被视为一个词

需要记住的实体：

```html
<!ENTITY quot    CDATA "&#34;"   -- quotation mark = APL quote,
                                    U+0022 ISOnum -->
<!ENTITY amp     CDATA "&#38;"   -- ampersand, U+0026 ISOnum -->
<!ENTITY lt      CDATA "&#60;"   -- less-than sign, U+003C ISOnum -->
<!ENTITY gt      CDATA "&#62;"   -- greater-than sign, U+003E ISOnum -->
```





#### 合法元素

* Element
* Text
* Comment
* DocumentType：`<!Doctype html>`
* ProcessingInstruction：`<?a 1?>` 为预处理预留的，但基本不用
* CDATA：`<![CDATA[]]>`



#### 字符引用

* `&#161;`

* `&amp;`
* `&lt;`
* `&quot;`



Node:

* Element
  * HTMLElement
  * SVGElement
* Document
* CharacterData
  * 文本
  * 注释
  * ProcessingInstruction
* DocumentFragment
* DocumentType



操作DOM时，不需要先把它从DOM树上拿下来，比如二次插入时，它会先将DOM从树上摘下，再插入到相应位置。childNodes 是动态的，即使取出赋值给变量，只要操作修改了DOM树，childNodes 就会实时改变





####高级操作

* compareDocumentPosition
* contains
* isEqualNode
* isSameNode  可以用 ===
* cloneNode







###重学DOM

* DOM Tree
* Events
* Range





