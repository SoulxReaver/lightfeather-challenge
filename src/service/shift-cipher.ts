import * as _ from 'lodash';

export const shiftMessage = (str, shift): String => {
    let ans = "";
    for (let i = 0; i < str.length; i++) {
        ans += shiftCharacter(str[i], shift);
    }
    return ans;
}

export const shiftCharacter  = (char, shift): String => {
    const alphabet = /[a-z]/i;

    if (!char.match(alphabet)) {
        return char;
    }
    const charCode = char.charCodeAt(0);
    const shiftedChar = String.fromCharCode(charCode + shift);

    if (shiftedChar.match(alphabet)) {
        return String.fromCharCode(charCode + shift);
    }
    else {
        throw new Error('unable to shift char');
    }
}
