const express = require("express");
const router = express.Router();
const accountModel = require("../../models/accountModel");
const bcrypt = require("bcryptjs");
/**
 * Deletes account using the ID given by client side and a password to verify.
 */
router.delete("/", async (req, res) => {
  try {
    console.log("recieved a request to delete an account");

    const { password, userId } = req.body;
    console.log("Recieved id: " + userId);

    existingAccount = await accountModel.findOne({
      _id: userId,
    });

    if (!existingAccount) {
      console.log("Account not found, it doesn't exist.");
      res.status(404).json({ message: "Account doesn't exist." });
      return;
    }

    try {
      const dBPassword = existingAccount.password;
      const passwordMatch = await bcrypt.compare(password, dBPassword);
      if (passwordMatch) {
        await accountModel.deleteOne({ _id: userId });

        console.log("Account Deleted Successfully!");

        res.status(204).send();
        return;
      } else {
        console.log("Account exists but passwords don't match.");
        res.status(400).json({ message: "Invalid Password" });
        return;
      }
    } catch (error) {
      console.log("error is: " + error);
    }
  } catch (error) {
    console.log("Error Deleting account " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
