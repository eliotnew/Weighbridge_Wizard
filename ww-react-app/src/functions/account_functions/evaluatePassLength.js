//returns true if the password is long enough
export default function evaluatePassLength(password) {
    let strong = false;
  
    if (password.length > 10) {
      strong = true;
      return strong;
    }
    return strong;
  }
 // module.exports = evaluatePassLength;
  //export default evaluatePassLength;