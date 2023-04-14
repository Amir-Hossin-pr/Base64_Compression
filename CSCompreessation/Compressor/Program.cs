string txt = @"BWTC32Key uses a BZip-family improvement and Base32768 to get extremely high efficiency, and its optional encryption is AES256-CTR to avoid padding. Anything you want (including strings), can be fed into it and the result will be a very efficient UTF16 string containing the input after heavy compression (and optionally encryption after the compression but before the Base32768.) I ran my 829KiB compendium of homemade Minecraft command block commands from eons ago through BWTC32Key, and I got a 13078 character output string. Minecraft command blocks can go up to 32767 characters, but some older versions of the game only allowed in-game use of strings half that size though by using MCEdit you could hit the 32767 size, though this issue was soon fixed.
Anyway, 829KiB of plain text is far larger than the 32767 limit, but BWTC32Key makes it fit into less than 16K characters. For a more extreme example, the full chemical name of the Titin protein is 189 thousand letters. I can use BWTC32Key to get it down to around 640. Even using ASCII representations higher than 1 byte per character (like UTF16) as input still gives the savings.";

string Compress(string str)
{
    Dictionary<int, int> charDict = new();
    var strLetters = str.ToCharArray();
    string resultCode = "";
    var firstLetter = strLetters[0];
    var byteSize = 256;

    for (int i = 1; i < strLetters.Length; i++)
    {
        var strIndex = strLetters[i];
        if (charDict.ContainsKey(firstLetter + strIndex))
            firstLetter += strIndex;
        else
        {
            resultCode += $"{(int)firstLetter},";
            charDict.Add(firstLetter + strIndex, byteSize);
            byteSize++;
            firstLetter = strIndex;
        }
    }
    resultCode += $"{(int)firstLetter}";
    string result = "";
    foreach (var item in resultCode.Split(","))
    {
        var letter = (char)int.Parse(item);
        result += letter;
    }

    return result;
}

var compressed = Compress(txt);
Console.WriteLine($"Orginal Text length is : {txt.Length} and compressed str length is : {compressed.Length}");