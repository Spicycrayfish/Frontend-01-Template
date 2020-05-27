let currentToken = null;
let currentAttribute = null;

let stack = [{ type: 'document', children: [] }];
let currentTextNode = null;
const cssParser = require('./parseCSS.js');
const layout = require('./layout.js');


function emit(token) {
    let top = stack[stack.length - 1];
    if (token.type === 'startTag') {
        let ele = {
            type: 'element',
            children: [],
            attributes: []
        };
        ele.tagName = token.tagName;
        for (let p in token) {
            if (p != 'type' || p != 'tagName') {
                ele.attributes.push({
                    name: p, value: token[p]
                });
            }
        }

        // 创建元素的同时计算其 CSS
        ele = cssParser.computeCSS(ele);

        top.children.push(ele);
        ele.parent = top;

        if (!token.isSelfClosing) {
            stack.push(ele);
        }
        currentTextNode = null;
    } else if (token.type === 'endTag') {
        if (top.tagName != token.tagName) {
            throw new Error('tag start end doesn\'t match!');
        } else {
            // 遇到 style 标签时  添加css规则
            if (top.tagName === 'style') {
                cssParser.addCSSRules(top.children[0].content);
            }
            layout(top);
            stack.pop();
        }
        currentTextNode = null;
    } else if (token.type == 'text') {
        if (currentTextNode == null) {
            currentTextNode = {
                type: 'text', content: ''
            };
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content;
    }
}

const EOF = Symbol('EOF');  // EOF: End Of File

function data(c) {
    if (c === '<') {
        return tagOpen;
    } else if (c == EOF) {
        emit({ type: 'EOF' });
        return ;
    } else {
        emit({
            type: 'text',
            content: c
        });
        return data;
    }
}

function tagOpen(c) {
    if (c == '/') {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        };
        return tagName(c);
    } else {
        emit({
            type: 'text',
            content: c
        });
        return ;
    }   
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == '/') {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;//.toLowerCase()
        return tagName;
    } else if (c == '>') {
        emit(currentToken);
        return data;
    } else {
        currentToken.tagName += c;
        return tagName;
    }
}


function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == '/' || c == '>' || c == EOF) {
        return afterAttributeName(c);
    } else if (c == '=') {
        // 报错
    } else {
        currentAttribute = {
            name: '', value: ''
        };
        return attributeName(c);
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
        return afterAttributeName(c);
    } else if (c == '=') {
        return beforeAttributeValue;
    } else if (c == '\u0000') {
    } else if (c == "\"" || c == "'" || c == '<') {
    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}

function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
        return beforeAttributeValue;
    } else if (c == '\"') {
        return doubleQuotedAttributeValue;
    } else if (c == '\'') {
        return singleQuotedAttributeValue;
    } else if (c == '>') {
        // return data
    } else {
        return unquotedAttributeValue(c);
    }
}

function doubleQuotedAttributeValue(c) {
    if (c == '\"') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c == '\u0000') {
    } else if (c == EOF) {
    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function singleQuotedAttributeValue(c) {
    if (c == '\'') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c == '\u0000') {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        // return doubleQuotedAttributeValue;
        return singleQuotedAttributeValue;
    }
}

function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == '/') {
        return selfClosingStartTag;
    } else if (c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue;
    }
}

function unquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if (c == '/') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if(c == '\u0000') {

    } else if (c == '\"' || c == '\'' || c == '<' || c == '=' || c == '`') {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return unquotedAttributeValue;
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        };
        return tagName(c);
    } else if (c == '>') {

    } else if (c == EOF) {

    } else {

    }
}

function selfClosingStartTag(c) {
    if (c == '>') {
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    } else if (c == 'EOF') {

    } else {

    }
}


function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if (c == '/') {
        return selfClosingStartTag;
    } else if (c == '=') {
        return beforeAttributeValue;
    } else if (c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c == EOF) {
        
    } else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = { name: '', value: '' };
        return attributeName(c);
    }
}


module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    // 标识文件结尾
    state = state(EOF);
    return stack[0];
}