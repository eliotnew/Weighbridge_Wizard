function generateOrderNumberID() {
  const orderString = "ORDR";
  const randNmbr = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  const nmbrToString = randNmbr.toString();
  return orderString + nmbrToString;
}
module.exports = generateOrderNumberID;
