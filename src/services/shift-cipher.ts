import * as _ from 'lodash';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const saveTodisk = (content: string) => {
    const dir = './result';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    fs.writeFileSync(`result/${uuidv4()}.txt`, content);
}

export const shiftMessage = (str: string, shift: number): string => {
    let ans = "";
    for (let i = 0; i < str.length; i++) {
        ans += shiftCharacter(str[i], shift);
    }
    saveTodisk(ans);
    return ans;
}

export const shiftCharacter  = (char: string, shift: number): string => {
    const alphabet = /[a-z]/i;

    if (_.isEmpty(char) || !char.match(alphabet)) {
        return char;
    }

    const lowerCaseChar = char.toLowerCase();
    const charCode = lowerCaseChar.charCodeAt(0);
    const shiftedChar = String.fromCharCode(charCode + shift);

    if (shiftedChar.match(alphabet)) {
        if (lowerCaseChar === char) {
            return shiftedChar;
        }
        else {
            return shiftedChar.toUpperCase();
        }
    }
    else {
        throw new Error('Unable to encode');
    }
}
