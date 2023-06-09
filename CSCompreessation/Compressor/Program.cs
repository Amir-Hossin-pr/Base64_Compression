﻿string txt = @"BWTC32Key uses a BZip-family improvement and Base32768 to get extremely high efficiency, and its optional encryption is AES256-CTR to avoid padding. Anything you want (including strings), can be fed into it and the result will be a very efficient UTF16 string containing the input after heavy compression (and optionally encryption after the compression but before the Base32768.) I ran my 829KiB compendium of homemade Minecraft command block commands from eons ago through BWTC32Key, and I got a 13078 character output string. Minecraft command blocks can go up to 32767 characters, but some older versions of the game only allowed in-game use of strings half that size though by using MCEdit you could hit the 32767 size, though this issue was soon fixed.
Anyway, 829KiB of plain text is far larger than the 32767 limit, but BWTC32Key makes it fit into less than 16K characters. For a more extreme example, the full chemical name of the Titin protein is 189 thousand letters. I can use BWTC32Key to get it down to around 640. Even using ASCII representations higher than 1 byte per character (like UTF16) as input still gives the savings.";

static string Compress(string str)
{
    Dictionary<string, int> dict = new();
    var data = str.Select(s => s.ToString()).ToArray();
    List<int> outer = new();
    var currentChar = "";
    var pharse = data[0];
    var code = 256;
    var result = "";

    for (int i = 1; i < data.Length; i++)
    {
        currentChar = data[i];
        if (dict.ContainsKey(pharse + currentChar))
            pharse += currentChar;
        else
        {
            outer.Add(pharse.Length > 1 ? dict[pharse] : pharse.ToCharArray()[0]);
            dict[pharse + currentChar] = code;
            code++;
            pharse = currentChar;
        }
    }

    outer.Add(pharse.Length > 1 ? dict[pharse] : pharse.ToCharArray()[0]);
    for (int i = 0; i < outer.Count; i++)
        result += (char)outer[i];

    return result;
}

static string DeCompress(string str)
{
    Dictionary<int, string> dict = new();
    var data = str.Select(s => s.ToString()).ToArray();
    var currentChar = data[0];
    string outer = currentChar;
    var oldPharse = currentChar;
    var code = 256;
    var pharse = "";

    for (int i = 1; i < data.Length; i++)
    {
        var currentCode = (int)data[i][0];
        if (currentCode < 256)
            pharse = data[i];
        else
            pharse = dict.ContainsKey(currentCode) ?
                     dict[currentCode] : oldPharse + currentChar;

        outer += pharse;
        currentChar = pharse[0].ToString();
        dict[code] = oldPharse + currentChar;
        code++;
        oldPharse = pharse;
    }
    return outer;
}

var compressed = Compress(txt);
var deCompressed = DeCompress(compressed);
Console.WriteLine($"Orginal Text length is : {txt.Length} and compressed str length is : {compressed.Length}");
Console.WriteLine($"Orginal Text length is : {txt.Length} and deCompressed str length is : {deCompressed.Length}");
Console.WriteLine($"De Compressed Str is equal to original str : {deCompressed == txt}");