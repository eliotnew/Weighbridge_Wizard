const dayjs = require("dayjs");
const expect = require("chai").expect;
const getTime = require("../../functions/getTime");

describe("getTime", () => {
  it("should return a string in the format HH:mm", () => {
    const currentTime = dayjs().format("HH:mm");
    const result = getTime();

    expect(result).to.be.a("string");
    expect(result).to.equal(currentTime);
  });
});
