var str = "BWTC32Key uses a BZip-family improvement and Base32768 to get extremely high efficiency, and its optional encryption is AES256-CTR to avoid padding. Anything you want (including strings), can be fed into it and the result will be a very efficient UTF16 string containing the input after heavy compression (and optionally encryption after the compression but before the Base32768.) I ran my 829KiB compendium of homemade Minecraft command block commands from eons ago through BWTC32Key, and I got a 13078 character output string. Minecraft command blocks can go up to 32767 characters, but some older versions of the game only allowed in-game use of strings half that size though by using MCEdit you could hit the 32767 size, though this issue was soon fixed.\n\nAnyway, 829KiB of plain text is far larger than the 32767 limit, but BWTC32Key makes it fit into less than 16K characters. For a more extreme example, the full chemical name of the Titin protein is 189 thousand letters. I can use BWTC32Key to get it down to around 640. Even using ASCII representations higher than 1 byte per character (like UTF16) as input still gives the savings.";
function toCharArray(str) {
    var array = [];
    for (var i = 0; i < str.length; i++) {
        var char = str[i];
        array.push(char);
    }
    return array;
}
function compress(str) {
    try {
        var dict = {};
        var data = toCharArray(str);
        var out = [];
        var currChar;
        var phrase = data[0];
        var code = 256;
        for (var i = 1; i < data.length; i++) {
            currChar = data[i];
            if (dict[phrase + currChar] != null) {
                phrase += currChar;
            }
            else {
                out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
                dict[phrase + currChar] = code;
                code++;
                phrase = currChar;
            }
        }
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
        for (var j = 0; j < out.length; j++) {
            out[j] = String.fromCharCode(out[j]);
        }
        return out.join('');
    }
    catch (e) {
        console.log('Failed to zip string return empty string', e);
        return '';
    }
}
function deCompress(str) {
    try {
        var dict = {};
        var data = (str + '').split('');
        var currChar = data[0];
        var oldPhrase = currChar;
        var out = [currChar];
        var code = 256;
        var phrase;
        for (var i = 1; i < data.length; i++) {
            var currCode = data[i].charCodeAt(0);
            if (currCode < 256) {
                phrase = data[i];
            }
            else {
                phrase = dict[currCode] ? dict[currCode] : oldPhrase + currChar;
            }
            out.push(phrase);
            currChar = phrase.charAt(0);
            dict[code] = oldPhrase + currChar;
            code++;
            oldPhrase = phrase;
        }
        return out.join('');
    }
    catch (e) {
        console.log('Failed to unzip string return empty string', e);
        return '';
    }
}
var input = str;
var compressed = compress(input);
var deCompressed = deCompress(compressed);
console.log("Base 64 Length is : ".concat(input.length));
console.log("Compressed Base 64 Length is : ".concat(compressed.length));
console.log("De Compressed Base 64 Length is : ".concat(deCompressed.length));
