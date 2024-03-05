const chai = require("chai");
const expect = chai.expect;
const generateOrderNumberID = require("../../functions/generateOrderNumberID");

describe("generateOrderNumberID", () => {
  it("should generate an order number with correct format and length", () => {
    const orderNumber = generateOrderNumberID();

    // Check if the generated order number starts with "ORDR"
    expect(orderNumber).to.match(/^ORDR/);

    // Check if the generated order number has a length of 12 characters (including "ORDR")
    expect(orderNumber).to.have.lengthOf(10);

    // Check if the characters after "ORDR" are digits
    const numericPart = orderNumber.substring(4);
    expect(/^\d+$/.test(numericPart)).to.be.true;
  });
});

describe("generateOrderNumberID", () => {
  it("should generate two unique order numbers", () => {
    const orderNumber1 = generateOrderNumberID();
    const orderNumber2 = generateOrderNumberID();
    const orderNumber3 = generateOrderNumberID();
    const orderNumber4 = generateOrderNumberID();
    const orderNumber5 = generateOrderNumberID();
    const orderNumber6 = generateOrderNumberID();
    const orderNumber7 = generateOrderNumberID();
    const orderNumber8 = generateOrderNumberID();
    const orderNumber9 = generateOrderNumberID();

    // Check if the generated order numbers are not exactly the same
    expect(orderNumber1).to.not.equal(orderNumber2);
    expect(orderNumber1).to.not.equal(orderNumber3);
    expect(orderNumber1).to.not.equal(orderNumber4);
    expect(orderNumber1).to.not.equal(orderNumber5);
    expect(orderNumber1).to.not.equal(orderNumber6);
    expect(orderNumber1).to.not.equal(orderNumber7);
    expect(orderNumber1).to.not.equal(orderNumber8);
    expect(orderNumber1).to.not.equal(orderNumber9);
  });
});
