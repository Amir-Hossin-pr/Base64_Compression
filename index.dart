const str =
    """BWTC32Key uses a BZip-family improvement and Base32768 to get extremely high efficiency, and its optional encryption is AES256-CTR to avoid padding. Anything you want (including strings), can be fed into it and the result will be a very efficient UTF16 string containing the input after heavy compression (and optionally encryption after the compression but before the Base32768.) I ran my 829KiB compendium of homemade Minecraft command block commands from eons ago through BWTC32Key, and I got a 13078 character output string. Minecraft command blocks can go up to 32767 characters, but some older versions of the game only allowed in-game use of strings half that size though by using MCEdit you could hit the 32767 size, though this issue was soon fixed.
Anyway, 829KiB of plain text is far larger than the 32767 limit, but BWTC32Key makes it fit into less than 16K characters. For a more extreme example, the full chemical name of the Titin protein is 189 thousand letters. I can use BWTC32Key to get it down to around 640. Even using ASCII representations higher than 1 byte per character (like UTF16) as input still gives the savings""";

String compress(String str) {
  var dict = {};
  var data = str.split('');
  var out = [];
  var currChar;
  var phrase = data[0];
  var code = 256;
  for (var i = 1; i < data.length; i++) {
    currChar = data[i];
    if (dict[phrase + currChar] != null) {
      phrase += currChar;
    } else {
      out.add(phrase.length > 1 ? dict[phrase] : phrase.codeUnitAt(0));
      dict[phrase + currChar] = code;
      code++;
      phrase = currChar;
    }
  }
  out.add(phrase.length > 1 ? dict[phrase] : phrase.codeUnitAt(0));
  for (var j = 0; j < out.length; j++) {
    out[j] = String.fromCharCode(out[j]);
  }
  return out.join('');
}

String deCompress(String str) {
  Map<int, String> dict = {};
  List<String> data = str.split('');
  String currChar = data[0];
  String oldPhrase = currChar;
  List<String> out = [currChar];
  int code = 256;
  String phrase = '';

  for (int i = 1; i < data.length; i++) {
    int currCode = data[i].codeUnitAt(0);
    if (currCode < 256) {
      phrase = data[i];
    } else {
      phrase = dict[currCode] != null
          ? dict[currCode].toString()
          : oldPhrase + currChar;
    }
    out.add(phrase);
    currChar = phrase[0];
    dict[code] = oldPhrase + currChar;
    code++;
    oldPhrase = phrase;
  }

  return out.join('');
}

void main(List<String> args) {
  var compressed = compress(str);
  var deCompressed = deCompress(compressed);
  print(
      "txt lenght is : ${str.length} and compressed length is : ${compressed.length}");
  print(
      "txt lenght is : ${str.length} and de compressed length is : ${deCompressed.length}");
  print("txt and de compressed is equal : ${str == deCompressed}");
}
