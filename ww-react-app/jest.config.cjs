module.exports = {
  //setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/test/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
