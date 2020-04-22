# 匹配所有字符串直接量的正则表达式

以下尝试对老师题解正则的解构：



查阅文档，*String* 直接量分为两种：

1. *" DoubleStringCharacters(opt) "*
2. *' SingleStringCharacters(opt) '*



以第一种为例：

1. *SourceCharacter* but not one of **"** or **\\** or *LineTerminator* 
2. <LS>
3. <PS>
4. **\\** *EscapeSequence*
5. *LineContinuation*





*SourceCharacter* but not one of **"** or **\\** or *LineTerminator* 的正则为：

`/[^"\n\\\r\u2028\u2029]/`



第四种的 *EscapeSequence* 又分为：

*CharacterEscapeSequence*

​		*SingleEscapeCharacter*：`' " \ b f n r t v`

​		*NonEscapeCharacter*

**0** [lookahead ∉ *DecimalDigit*] 

*HexEscapeSequence*

​		**x** *HexDigit HexDigit*

*UnicodeEscapeSequence*

​		**u** *Hex4Digits*

​		**u{** *CodePoint* **}**





  **\\** *EscapeSequence* 的 *CharacterEscapeSequence*  正则是：

`/\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)/`

  **\\** *EscapeSequence* 的 *HexEscapeSequence*  正则是：

`/\\x[0-9a-fA-F]{2}/`

  **\\** *EscapeSequence* 的 *UnicodeEscapeSequence*   **u** *Hex4Digits* 正则是：

`/\\u[0-9a-fA-F]{4}/`







