// Arrays for each character type that can be included in the password.
let lowerCase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let upperCase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
let specialChars = ["!","@", "#", "%","$", "%", "^", "&", "*", "(", ")", "+", "=","?","<",">", ":", "|", "{","}", "[","]"];
  
// FUNCTION: Password character length prompt.
function customPasswordProperties() {
    var pwLength = parseInt(
        prompt("Enter desired password length between 8 and 128 characters.")
    );
  
    // Checking if desired password length is all numbers.
    if (isNaN(pwLength) === true) {
        alert("Please provide a number between 8 and 128 for the password length.");
        return;
    }
    // Checking if user indicates a password length between 8 and 128 characters. 
    if (pwLength < 8 || pwLength > 129) {
        alert("Your password length must be at least 8 characters, but no more than 128.");
        return;
    }
  
    // Asking user to confirm which pwProperties (numbers, lowercase, uppercase, special characters) they would like to include in their password.
    var includeNumbers = confirm("Would you like to include numbers? Click OK to accept, or Cancel to skip.");
    var includeUpperCase = confirm("Would you like to include uppercase letters? Click OK to accept, or Cancel to skip.");
    var includeLowerCase = confirm("Would you like to include lowercase letters? Click OK to accept, or Cancel to skip.");
    var includeSpecialChars = confirm("Would you like to include special characters? Click OK to accept, or Cancel to skip.");
    
    // Checking if user confirmed at least one of the pwProperties.
    if (includeNumbers === false &&
        includeUpperCase === false &&
        includeLowerCase === false &&
        includeSpecialChars === false) {
        alert("You must select at least one option. Please try again.");
        return;
    }
    // Save different pwProperties from earlier prompts into an object and return password properties.
    var pwProperties = {
        length: pwLength,
        includeNumbers: includeNumbers,
        includeUpperCase: includeUpperCase,
        includeLowerCase: includeLowerCase,
        includeSpecialChars: includeSpecialChars
    };
    return pwProperties;
}

  
// FUNCTION: Returns random character or number from an array. We will use this later to generate the password.
function returnCharacter(myArray) {
    //Generate a number that will serve as array index to randomly return a character from a given array.
    var index = Math.floor(Math.random() * myArray.length);
    return myArray[index];
}
  
// FUNCTION: This will create a password according to the user preferences.
function generatePassword() {
    
    var myPassword = [];    // Variable myPassword will store password as array.
    var pwProperties = customPasswordProperties();  // This will contain the desired password properties.
    var allCharOptions = [];    // Contains all possible characters based on desired properties.

    // Concatenate all possible custom properties to one array so that we can randomly select from it for final password.
    if (pwProperties.includeNumbers) {
        allCharOptions = allCharOptions.concat(numbers);
    }
    if (pwProperties.includeLowerCase) {
        allCharOptions = allCharOptions.concat(lowerCase);
    }
    if (pwProperties.includeUpperCase) {
        allCharOptions = allCharOptions.concat(upperCase);
    }
    if (pwProperties.includeSpecialChars) {
        allCharOptions = allCharOptions.concat(specialChars);
    }

    // While not a requirement of the user story, it makes sense to include at least one of each type requested. 
    // We can add one of each to start, and then fill the rest with random characters from the requested types.
    var myPassword = [];
    if (pwProperties.includeNumbers) {
        myPassword.push(returnCharacter(numbers));
    }
    if (pwProperties.includeLowerCase) {
        myPassword.push(returnCharacter(lowerCase));
    }
    if (pwProperties.includeUpperCase) {
        myPassword.push(returnCharacter(upperCase));
    }
    if (pwProperties.includeSpecialChars) {
        myPassword.push(returnCharacter(specialChars));
    }  

    // The first few characters of myPassword contain the desired properties for PW. Now we are adding the rest from all potential options.
    for (var i = myPassword.length; i < pwProperties.length; i++) {
        var randomChar = returnCharacter(allCharOptions);
        myPassword.push(randomChar);
    }
  
    // Return myPassword as a string.
    return myPassword.join('');
    
}
  

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

  