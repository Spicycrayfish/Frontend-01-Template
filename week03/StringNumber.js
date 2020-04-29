function convertStringToNumber(str, x) {
    if (arguments.length < 2) {
        x = 10;
    }
    let chars = str.split('');
    let number = 0;
    let isNeg = false;

    let i = 0;
    if (chars[0] === '-') {
        i++;
        isNeg = true;
    }

    while (i < chars.length && chars[i] !== '.') {
        number *= x;
        number += (chars[i].codePointAt() - '0'.codePointAt());
        i++;
    }
    if (chars[i] === '.') i++;
    
    let fraction = 1;
    while (i < chars.length && chars[i] !== 'e' && chars[i] !== 'E') {
        fraction /= x;
        number += (chars[i].codePointAt() - '0'.codePointAt()) * fraction;
        i++;
    }

    if (chars[i] === 'e' || chars[i] === 'E') i++;
    
    let isNegExp = false;
    if (chars[i] === '-') {
        i++;
        isNegExp = true;
    }

    let exp = 0;
    while (i < chars.length) {
        exp *= 10;
        exp += (chars[i].codePointAt() - '0'.codePointAt());
        i++;
    }

    number *= 10 ** (isNegExp ? -exp : exp);

    if (isNeg) {
        number *= -1;
    }
    return number;
}
console.log(str2num('0.234', 10))
console.log(str2num('434.234', 10))
console.log(str2num('100.100', 2))
console.log(str2num('17.5e3'))
console.log(str2num('1.5e-3'))


function convertNumberToString(num, x) {
    if (arguments.length < 2) {
        x = 10
    }
    let integer = Math.floor(num);
    let fraction = num - integer;

    let str = ''
    while (integer > 0) {
        str = String(integer % x) + str;
        integer = Math.floor(integer / x);
    }
    return str;
}
console.log(str2num(0.234, 10))
console.log(str2num(434.23, 8))
console.log(str2num(100.100, 2))