let rules = []
function addCSSRules(text) {
    let ast = css.parse(text);
    console.log(JSON.stringify(ast, null, '     '));
    rules.push(...ast.stylesheet.rules);
}

function match(ele, selector) {
    if (!selector || !ele.attributes) {
        return false;
    }

    if (selector.charAt(0) === '#') {
        let attr = ele.attributes.filter(attr => attr.name === 'id')[0]
        if (attr && attr.value === selector.replace('#', '')) {
            return true;
        }
    } else if (selector.charAt(0) === '.') {
        let attr = ele.attributes.filter(attr => attr.name === 'class')[0]
        if (attr && attr.value === selector.replace('.', '')) {
            return true;
        }
    } else {
        if (ele.tagName === selector) {
            return true;
        }
    }
}

function computeCSS(ele) {
    // let elements = stack.slice().reverse();
    // 通过parent属性 逐级取出其父元素  [document, html, head]
    let elements = [];
    while (ele.parent) {
        elements.push(ele.parent)
    }

    if (!ele.computedStyle) {
        ele.computedStyle = {};
    }

    for (let rule of rules) {
        let selector = rule.selectors[0].split(' ').reverse();
        if (!match(ele, selector[0])) {
            continue;
        }

        let matched = false;

        let j = 1;
        for (let i = 0; i < elements.length; i++) {
            if (match(elements[i], selector[j])) {
                if (++j >= selector.length) {
                    break;
                }
            }
        }
        if (j >= selector.length) {
            matched = true;
        }
        if (matched) {
            // 匹配父元素序列成功
            let sp = specificity(rule.selectors[0]);
            let computedStyle = ele.computedStyle;
            for (let declaration of rule.declarations) {
                if (!computedStyle[declaration.property]) {
                    computedStyle[declaration.property] = {};
                }

                if (!computedStyle[declaration.property].specificity) {
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
                    // for (let k = 0; k < 4; k ++) {
                    //     computedStyle[declaration.property][declaration.value][k] += sp[k];
                    // }
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }
                
            }
        }
    }
    return ele;
}

function specificity(selector) {
    let p = [0, 0, 0, 0];
    let selectorParts = selector.split(' ');
    for (let p of selectorParts) {
        if (p.charAt(0) === '#') {
            p[1] += 1;
        } else if (p.charAt(0) === '.') {
            p[2] += 1;
        } else {
            p[3] += 1;
        }
    }
    return p;
}

function compare(sp1, sp2) {
    if (sp1[0] - sp2[0]) {
        return sp1[0] - sp2[0];
    }
    if (sp1[1] - sp2[1]) {
        return sp1[1] - sp2[1];
    }
    if (sp1[2] - sp2[2]) {
        return sp1[2] - sp2[2];
    }
    return sp1[3] - sp2[3];
}

module.exports = {
    computeCSS, addCSSRules
}
