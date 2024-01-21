
/**
 * Will return true if its a good password that passes all the required types of complexity.
 * Has numbers, upper and lower case letters and a symbol.
 *There is also a length checker function. 
 *
 */

export default function evaluatePassword(string) {
    const hasDigit = /\d/.test(string);
    console.log(hasDigit);
    const hasUppercase = /[A-Z]/.test(string);
    console.log(hasUppercase);
    const hasLowercase = /[a-z]/.test(string);
    console.log(hasLowercase);
    const hasSymbol = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(string);
    console.log(hasSymbol);
  
    if (!hasDigit || !hasUppercase || !hasLowercase || !hasSymbol) {
      return false;
    } else {
      return true;
    }
  }
  
  //export default evaluatePassword;
  //module.exports = evaluatePassword;