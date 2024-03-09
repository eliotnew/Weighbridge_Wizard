const dayjs = require("dayjs");
const expect = require("chai").expect;
const getDate = require("../../functions/getDate");

describe("getDate", () => {
  it("should return a string in the format DD/MM/YYYY", () => {
    const currentDate = dayjs().format("DD/MM/YYYY");
    const result = getDate();

    expect(result).to.be.a("string");
    expect(result).to.equal(currentDate);
  });
});
