const chai = require("chai");
const expect = chai.expect;
const generateOrderNumberID = require("../../functions/generateOrderNumberID");

describe("generateOrderNumberID", () => {
  it("should generate an order number with correct format and length", () => {
    const orderNumber = generateOrderNumberID();

    // Check if the generated order number starts with "ORDR"
    expect(orderNumber).to.match(/^ORDR/);

    // Check if the generated order number has a length of 12 characters (including "ORDR")
    expect(orderNumber).to.have.lengthOf(12);

    // Check if the characters after "ORDR" are digits
    const numericPart = orderNumber.substring(4);
    expect(/^\d+$/.test(numericPart)).to.be.true;
  });
});

describe("generateOrderNumberID", () => {
  it("should generate two unique order numbers", () => {
    const orderNumber1 = generateOrderNumberID();
    const orderNumber2 = generateOrderNumberID();

    // Check if the generated order numbers are not exactly the same
    expect(orderNumber1).to.not.equal(orderNumber2);
  });
});
