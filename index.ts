const str = `BWTC32Key uses a BZip-family improvement and Base32768 to get extremely high efficiency, and its optional encryption is AES256-CTR to avoid padding. Anything you want (including strings), can be fed into it and the result will be a very efficient UTF16 string containing the input after heavy compression (and optionally encryption after the compression but before the Base32768.) I ran my 829KiB compendium of homemade Minecraft command block commands from eons ago through BWTC32Key, and I got a 13078 character output string. Minecraft command blocks can go up to 32767 characters, but some older versions of the game only allowed in-game use of strings half that size though by using MCEdit you could hit the 32767 size, though this issue was soon fixed.

Anyway, 829KiB of plain text is far larger than the 32767 limit, but BWTC32Key makes it fit into less than 16K characters. For a more extreme example, the full chemical name of the Titin protein is 189 thousand letters. I can use BWTC32Key to get it down to around 640. Even using ASCII representations higher than 1 byte per character (like UTF16) as input still gives the savings.`;

function compress(str: string) {
    let dict = {}
    let data = str.split('');
    let out = [] as Array<any>
    let currChar = ''
    let phrase = data[0]
    let code = 256
    for (let i = 1; i < data.length; i++) {
        currChar = data[i]
        if (dict[phrase + currChar] != null) {
            phrase += currChar
        } else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0))
            dict[phrase + currChar] = code
            code++
            phrase = currChar
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0))
    for (let j = 0; j < out.length; j++) {
        out[j] = String.fromCharCode(out[j])
    }
    return out.join('')
}

function deCompress(str: string) {
    let dict = {}
    let data = str.split('')
    let currChar = data[0]
    let oldPhrase = currChar
    let out = [currChar]
    let code = 256
    let phrase = ''
    for (let i = 1; i < data.length; i++) {
        let currCode = data[i].charCodeAt(0)
        if (currCode < 256) {
            phrase = data[i]
        } else {
            phrase = dict[currCode] ? dict[currCode] : oldPhrase + currChar
        }
        out.push(phrase)
        currChar = phrase.charAt(0)
        dict[code] = oldPhrase + currChar
        code++
        oldPhrase = phrase
    }
    return out.join('')
}

const input = str;

let compressed = compress(input);
let deCompressed = deCompress(compressed);

console.log(`Base 64 Length is : ${input.length}`);
console.log(`Compressed Base 64 Length is : ${compressed.length}`);
console.log(`De Compressed Base 64 Length is : ${deCompressed.length}`);
console.log(`De Compressed is equal with txt : ${deCompressed == input}`);