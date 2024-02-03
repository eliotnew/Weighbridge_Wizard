const accountModel = require("../models/accountModel");

/**
 * Returns true if account exists.
 */

async function checkAccountExists(email) {
  try {
    const existingAccount = await accountModel.findOne({ email });

    return !!existingAccount; //return a truthy existing account
  } catch (error) {
    throw new Error(
      "Something went wrong when attepting to check if the account already exists."
    );
  }
}
module.exports = checkAccountExists;
