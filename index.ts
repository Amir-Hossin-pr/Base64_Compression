const str = `
BWTC32Key uses a BZip-family improvement and Base32768 to get extremely high efficiency, and its optional encryption is AES256-CTR to avoid padding. Anything you want (including strings), can be fed into it and the result will be a very efficient UTF16 string containing the input after heavy compression (and optionally encryption after the compression but before the Base32768.) I ran my 829KiB compendium of homemade Minecraft command block commands from eons ago through BWTC32Key, and I got a 13078 character output string. Minecraft command blocks can go up to 32767 characters, but some older versions of the game only allowed in-game use of strings half that size though by using MCEdit you could hit the 32767 size, though this issue was soon fixed.

Anyway, 829KiB of plain text is far larger than the 32767 limit, but BWTC32Key makes it fit into less than 16K characters. For a more extreme example, the full chemical name of the Titin protein is 189 thousand letters. I can use BWTC32Key to get it down to around 640. Even using ASCII representations higher than 1 byte per character (like UTF16) as input still gives the savings.`;

function compress(str) {
    let x = 'charCodeAt';
    let e = {};
    let strLetters = str.split("")
    let reult = [] as Array<any>
    let firstLetter = strLetters[0]
    let charSize = 256;
    for (let i = 1; i < strLetters.length; i++) {
        str = strLetters[i]
        e[firstLetter + str] ? firstLetter += str : (reult.push(1 < firstLetter.length ? e[firstLetter] : firstLetter[x](0)), e[firstLetter + str] = charSize, charSize++, firstLetter = str);
    }
    reult.push(1 < firstLetter.length ? e[firstLetter] : firstLetter[x](0));
    for (let i = 0; i < reult.length; i++) {
        reult[i] = String.fromCharCode(reult[i]);
    }
    return reult.join("")
}

function deCompress(str) {
    let a, e = {}
    let strLetters = str.split("")
    let firstLetter = strLetters[0]
    let f = strLetters[0]
    let result = [firstLetter]
    let h = 256;
    let o = 256;
    for (let i = 1; i < strLetters.length; i++) {
        a = strLetters[i].charCodeAt(0)
        a = h > a ? strLetters[i] : e[a] ? e[a] : f + firstLetter
        result.push(a)
        firstLetter = a.charAt(0)
        e[o] = f + firstLetter
        o++
        f = a;
    }
    return result.join("")
}

let compressed = compress(str);
let deCompressed = deCompress(compressed);

console.log(`Base 64 Length is : ${str.length}`);
console.log(`Compressed Base 64 Length is : ${compressed.length}`);
console.log(`De Compressed Base 64 Length is : ${deCompressed.length}`);