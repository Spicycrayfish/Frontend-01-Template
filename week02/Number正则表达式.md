# 匹配所有 Number 直接量的正则表达式

查阅文档，*Number* 直接量分为四种：

1. *DecimalLiteral*
2. *BinaryIntegerLiteral*
3. *OctalIntegerLiteral*
4. *HexIntegerLiteral*

下面对上述四种直接量一一编写对应的正则表达式，但这里先从较为简单后面三类直接量开始，即 *BinaryIntegerLiteral*、*OctalIntegerLiteral*、*HexIntegerLiteral*



二进制直接量由 0b 或 0B 开头，后面由数字 0 或者 1 组成，正则表达式为：

`/^0[bB][01]+$/`

八进制直接量由 0o 或 0O 开头，后面由数字 0 至 7 组成，正则表达式为：

`/^0[oO][0-7]+$/`

十六进制直接量由 0x 或 0X 开头，后面由数字 0 至 9、字母 a 至 f、字母 A 至 F 组成，正则表达式为：

`/^0[xX][0-9a-fA-F]+$/`



然后编写带有小数的十进制直接量，这类直接量又分为三小类：

1. *DecimalIntegerLiteral . DecimalDigits(opt) ExponentPart(opt)*
2. *. DecimalDigits ExponentPart(opt)*
3. *DecimalIntegerLiteral ExponentPart(opt)*

下面一一对应编写其正则表达式：

*DecimalIntegerLiteral . DecimalDigits(opt) ExponentPart(opt)：*

`/^(?:0|(?:[1-9]\d*))\.\d*(?:[eE][+-]?\d+)?$/`

*. DecimalDigits ExponentPart(opt)：*

`/^\.\d+(?:[eE][+-]?\d+)?$/`

*DecimalIntegerLiteral ExponentPart(opt)：*

`/^(?:0|(?:[1-9]\d*))(?:[eE][+-]?\d+)?$/`



最后我直接将以上所有正则表达式简单粗暴地拼凑起来，用于匹配所有 *Number* 直接量，应该有更优雅的方法，但目前对正则还不熟练只想到这种简单处理的方式：

`/^0[bB][01]+$|^0[oO][0-7]+$|^0[xX][0-9a-fA-F]+$|^(?:0|(?:[1-9]\d*))(?:[eE][+-]?\d+)?$|^(?:0|(?:[1-9]\d*))\.\d*(?:[eE][+-]?\d+)?$|^\.\d+(?:[eE][+-]?\d+)?$/`