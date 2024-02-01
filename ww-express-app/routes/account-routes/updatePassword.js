const express = require("express");
const router = express.Router();
const accountModel = require("../../models/accountModel");
const bcrypt = require("bcryptjs");
const getAccount = require("../../functions/getAccount");

/**
 *   Changes the password via provided Id , old password and new password.
 */

router.put("/", async (req, res) => {
  try {
    console.log("Recieved a request to change an account's password.");

    const { password, newPassword, userId } = req.body;

    const existingAccount = await getAccount(userId);

    //Compare the existing account with the password sent from the client
    const dBPassword = existingAccount.password;
    const passwordMatch = await bcrypt.compare(password, dBPassword);

    if (!!existingAccount && passwordMatch) {
      const saltRounds = 8;
      const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

      console.log("encrypted new password...");

      try {
        await accountModel.updateOne(
          { _id: userId },
          { $set: { password: newHashedPassword } }
        );

        console.log("Account password updated Successfully!");

        res
          .status(200)
          .json({ message: "Account password updated successfully" });
        return;
      } catch (error) {
        console.log("error is: " + error);
      }
    } else if (!!existingAccount && !passwordMatch) {
      console.log("Account exists but passwords don't match.");
      res.status(404).json({ message: "Invalid Password" });
    } else {
      console.log(
        "Something went wrong fetching the account or with the password comparison."
      );
      res.status(500).json({ message: "Invalid Account ID" });
    }
  } catch (error) {
    console.log("FAILED reached final catch with error " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
