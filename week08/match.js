function match(ele, selector) {
    if (!selector || !ele.attributes) {
        return false;
    }

    let idReg = /(#\w+)+/g;
    let classReg = /(.\w+)+/g;

    let idMatched = selector.match(idReg);
    let classMatched = selector.match(classReg);

    // 判断类是否匹配
    if (classMatched) {
        let selectorClassArr = [];
        for (let i = 0; i < classMatched.length; i++) {
            let tmp = classMatched[i].split('.');
            for (let j = 0; j < tmp.length; j++) {
                selectorClassArr.push(tmp[j]);
            }
        }
        let attr = ele.attributes.filter(attr => attr.name === 'class')[0];
        let attrArr = [];
        if (attr && attr.value) {
            attrArr = attr.split(' ');
        }

        for (let i = 0; i < selectorClassArr.length; i++) {
            let res = attrArr.some(cls => {
                return cls === selectorClassArr[i];
            });
            if (!res) {
                return false;
            }
        }
    }

    if (idMatched) {
        let attr = ele.attributes.filter(attr => attr.name === "id")[0]
        if (attr && attr.value === idMatched[0].replace("#", '')) {
        } else {
            return false;
        }
    }

    if (selector.charAt(0) !== '#' && selector.charAt(0) !== '.') {
        if (ele.tagName === selector) {
            return true;
        } else {
            return false;
        }
    } else if ((classMatched && classMatched.length) || (idMatched && idMatched.length)) {
        return true;
    } else {
        return false;
    }
}