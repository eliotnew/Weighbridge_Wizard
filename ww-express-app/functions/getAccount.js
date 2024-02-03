const accountModel = require("../models/accountModel");

/**
 * Returns an object of the account.
 */

async function getAccountObject(email) {
  try {
    const existingAccount = await accountModel.findOne({ email });

    const accountObject = {
      _id: existingAccount._id,
      foreName: existingAccount.foreName,
      surName: existingAccount.surName,
      email: existingAccount.email,
      password: existingAccount.password,
      location: existingAccount.location,
    };

    return accountObject;
  } catch (error) {
    console.log(`Error in getAccount function: ${error.message}`);
  }
}
module.exports = getAccountObject;
