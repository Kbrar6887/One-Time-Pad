
 "use strict";

 // charcodes for converting between characters and code numbers.
 var charcodes = [];
 charcodes[0] = "a";
 charcodes[1] = "b";
 charcodes[2] = "c";
 charcodes[3] = "d";
 charcodes[4] = "e";
 charcodes[5] = "f";
 charcodes[6] = "g";
 charcodes[7] = "h";
 charcodes[8] = "i";
 charcodes[9] = "j";
 charcodes[10] = "k";
 charcodes[11] = "l";
 charcodes[12] = "m";
 charcodes[13] = "n";
 charcodes[14] = "o";
 charcodes[15] = "p";
 charcodes[16] = "q";
 charcodes[17] = "r";
 charcodes[18] = "s";
 charcodes[19] = "t";
 charcodes[20] = "u";
 charcodes[21] = "v";
 charcodes[22] = "w";
 charcodes[23] = "x";
 charcodes[24] = "y";
 charcodes[25] = "z";
 charcodes[26] = "A";
 charcodes[27] = "B";
 charcodes[28] = "C";
 charcodes[29] = "D";
 charcodes[30] = "E";
 charcodes[31] = "F";
 charcodes[32] = "G";
 charcodes[33] = "H";
 charcodes[34] = "I";
 charcodes[35] = "J";
 charcodes[36] = "K";
 charcodes[37] = "L";
 charcodes[38] = "M";
 charcodes[39] = "N";
 charcodes[40] = "O";
 charcodes[41] = "P";
 charcodes[42] = "Q";
 charcodes[43] = "R";
 charcodes[44] = "S";
 charcodes[45] = "T";
 charcodes[46] = "U";
 charcodes[47] = "V";
 charcodes[48] = "W";
 charcodes[49] = "X";
 charcodes[50] = "Y";
 charcodes[51] = "Z";
 charcodes[52] = "0";
 charcodes[53] = "1";
 charcodes[54] = "2";
 charcodes[55] = "3";
 charcodes[56] = "4";
 charcodes[57] = "5";
 charcodes[58] = "6";
 charcodes[59] = "7";
 charcodes[60] = "8";
 charcodes[61] = "9";
 charcodes[62] = "`";
 charcodes[63] = "~";
 charcodes[64] = "!";
 charcodes[65] = "@";
 charcodes[66] = "#";
 charcodes[67] = "$";
 charcodes[68] = "%";
 charcodes[69] = "^";
 charcodes[70] = "&";
 charcodes[71] = "*";
 charcodes[72] = "(";
 charcodes[73] = ")";
 charcodes[74] = "-";
 charcodes[75] = "=";
 charcodes[76] = "_";
 charcodes[77] = "+";
 charcodes[78] = "[";
 charcodes[79] = "]";
 charcodes[80] = "{";
 charcodes[81] = "}";
 charcodes[82] = "|";
 charcodes[83] = "\\";
 charcodes[84] = ";";
 charcodes[85] = ":";
 charcodes[86] = "'";
 charcodes[87] = "\"";
 charcodes[88] = ",";
 charcodes[89] = ".";
 charcodes[90] = "<";
 charcodes[91] = ">";
 charcodes[92] = "/";
 charcodes[93] = "?";
 charcodes[94] = " ";
 charcodes[95] = "\n";
 charcodes[96] = "\r";
 charcodes[97] = "\t";
 charcodes[98] = "–";
 charcodes[99] = "—";


 function runEncryptTest() {

	var messageTextbox = document.getElementById("messageToEncrypt").value;
	var keyTextbox = document.getElementById("keyToEncrypt").value;
	var keyRepetitionCheckbox = document.getElementById("keyRepetitionToEncrypt").checked;
	var plainText = messageTextbox;
	var encodedMessage = encode(plainText);
	var key = keyTextbox;
  var encodedKey = encode(key);
	var encryptedMessage = otp(plainText, key, "encrypt", keyRepetitionCheckbox);
	var decryptedMessage = otp(encryptedMessage, key, "decrypt", keyRepetitionCheckbox);


	document.getElementById("encoded").innerHTML = encodedMessage;
	document.getElementById("encrypted").innerHTML = encryptedMessage;
}

function runDecryptTest() {
	var ciphertextTextbox = document.getElementById("ciphertextToDecrypt").value;
	var keyTextbox = document.getElementById("keyToDecrypt").value;
	var keyRepetitionCheckbox = document.getElementById("keyRepetitionCheckboxDecrypt").checked;

	var encryptedMessage = ciphertextTextbox;
	var key = keyTextbox;
	var encodedKey = encode(key);
	var decryptedMessage = otp(encryptedMessage, key, "decrypt", keyRepetitionCheckbox);

	var plainText = decryptedMessage;
	var encodedMessage = encode(plainText);

	var decodedMessage = decode(decryptedMessage);
  alert(decryptedMessage)

		document.getElementById("encrypted").innerHTML = encryptedMessage;
	document.getElementById("decrypted").innerHTML = decryptedMessage;
}

 // Convert input text characters to code numbers using the charcodes.
 function encode(text) {
   // Loop through each text character.

   var code = [];
   for (var i=0; i<text.length; i++) {
     // Check if the character is in the charcodes, filter it out if it's not.
     if (charcodes.indexOf(text[i]) !== -1) {
       // Get the character's code number from the code book.
       code[i] = charcodes.indexOf(text[i]).toString();
       // Prepend a leading zero if code number is in range 0-9.
       if (code[i].length === 1) {
         code[i] = "0" + code[i];
       }
     }
   }
   return code.join("");
 }

 // Convert input code numbers to text characters using the charcodes.
 function decode(code) {
   // Split the code number string into an array where each item is 2 digits long.
   var codeLength = code.length / 2;
   code = code.match(/.{1,2}/g);
   // Loop through each two-digit code number.
   var text = [];
   for (var i=0; i<codeLength; i++) {
     // Convert the code from string to number format by multiplying by 1.
     code[i] *= 1;
     // Get the code number's character from the charcodes.
     text[i] = charcodes[code[i]];
   }
   return text.join("");
 }

 // Encrypt or decrypt a message with a key.
 function otp(message, key, mode, keyRepetition) {
   var codeMessage, error;
   // The message and key must not be empty.
   if (message === "" || key === "") {
     error = "Error: The message and key must not be be empty.";
     console.log("[OneTimePad.js] " + error);
     return error;
   }
   // Convert the message and key to number-encoded strings using the charcodes.
   var codeKey = encode(key);
   // Only number-encode the message if using encrypt mode. In decrypt mode, the message should already be number-encoded.
   if (mode == "encrypt") {
     codeMessage = encode(message);
   } else if (mode == "decrypt") {
     if (!isNaN(message)) {
       codeMessage = message;
     } else {
       error = "Error: When decrypting, the message must only contain numbers.";
       console.log("[OneTimePad.js] " + error);
       return error;
     }
   }
   // The key should be at least the same length as the message.
   if (codeKey.length < codeMessage.length) {
     if (keyRepetition === true) {
       if (mode == "encrypt") {
         console.log("[OneTimePad.js] WARNING: The key is shorter than the message.\nThe keyRepetition flag has been set, so OneTimePad.js will now repeat the key until it's long enough, but this is not secure. Repetition of the key will cause statistical patterns in the ciphertext that will make it easier for a third party to decrypt it without the key. You really should use a key at that's least the same length as the message.");
       }
       while (codeKey.length < codeMessage.length) {
         codeKey += codeKey;
       }
     // Otherwise, if the key is too short, fail with an error.
     } else {
       error = "Error: The key is shorter than the message.";
       console.log("[EncryptDecrypt.js] " + error);
       return error;
     }
   }
   // Split both the code strings into arrays where each array item is 1 digit long.
   codeMessage = codeMessage.split("");
   codeKey = codeKey.split("");
   // Loop through each one-digit code number.
   var codeOutput = [];
   for (var i=0; i<codeMessage.length; i++) {
     // Convert the codes from string to number format by multiplying by 1.
     codeMessage[i] *= 1;
     codeKey[i] *= 1;
     // Perform the OTP encryption by adding the message code number and key code number together.
     if (mode == "encrypt") {
       codeOutput[i] = (codeMessage[i] + codeKey[i]);
       // Number must be a single digit in range 0-9.
       // Use modular addition, modulo 10 - allow no carrying during addition.
       if (codeOutput[i] > 9) {
         codeOutput[i] -= 10;
       }
     }
     // Perform the OTP decryption by subtracting the key code number from the message code number.
     if (mode == "decrypt") {
       codeOutput[i] = (codeMessage[i] - codeKey[i]);
       // Number must be a single digit in range 0-9.
       // Use modular subtraction, modulo 10 - allow no carrying during subtraction.
       // Allow no negative numbers. If number is negative, make it positive.
       if (codeOutput[i] < 0) {
         codeOutput[i] += 10;
       }
     }
   }
   // If encrypting, return a number-encoded string. If decrypting, decode the number-encoded string to return the plaintext.
   var outputString = codeOutput.join("");
   if (mode == "decrypt") {
     return decode(outputString);
   } else {
     return outputString;
   }
 }
