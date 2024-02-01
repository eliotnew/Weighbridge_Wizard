const express = require("express");
const router = express.Router();
const accountModel = require("../../models/accountModel");
const bcrypt = require("bcryptjs");
const getAccount = require("../../functions/getAccount");

/**
 *   Edit/Updates the account , the front end should provide the whole model with only the desired change seperate.
 *    Does not change the password (../See updatePassword.js)
 */

router.put("/", async (req, res) => {
  try {
    console.log("Received a request to change account details.");

    const { foreName, surName, email, password, userId, location } = req.body;
    console.log("Received id: " + userId);

    let existingAccount;

    existingAccount = await getAccount(userId);

    if (!existingAccount) {
      console.log("Account not found, it doesn't exist.");
      res.status(404).json({ message: "Account not found" });
      return;
    }

    // Compare the existing account with the password sent from the client
    const originalPassword = existingAccount.password;
    const passwordMatch = await bcrypt.compare(password, originalPassword);

    if (passwordMatch) {
      try {
        await accountModel.updateOne(
          { _id: userId },
          {
            $set: {
              foreName: foreName,
              surName: surName,
              email: email,
              password: originalPassword,
              location: location,
            },
          }
        );

        console.log("Account updated successfully!");

        res.status(200).json({
          message: "Account updated successfully",
          userId: userId,
          foreName: foreName,
          surName: surName,
          email: email,
          location: location,
        });
      } catch (error) {
        console.log("Error updating account: " + error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }
    } else {
      console.log("Account exists but passwords don't match.");
      res.status(400).json({ message: "Invalid Password" });
      return;
    }
  } catch (error) {
    console.log("Failed reached final catch with error " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
