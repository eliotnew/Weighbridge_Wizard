const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const checkAccExists = require("../../functions/accountCheck");
const getAccountObject = require("../../functions/getAccount");

/**
 * Sign in Using email to identify account and password to verify
 */

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Recieved body at signin route:");
    console.log("email:", email);
    console.log("password:", password);

    const exists = await checkAccExists(email);

    if (exists) {
      console.log("Account exists. ");

      try {
        const existingAccount = await getAccountObject(email); //returns the account object without password for client side to use.

        const passwordMatch = await bcrypt.compare(
          password,
          existingAccount.password
        );

        if (passwordMatch) {
          console.log("Password matched, sending login to clientside");

          const idString = existingAccount._id.toString();

          res.status(200).json({
            message: "Login successful",
            userId: idString,
            firstName: existingAccount.firstName,
            lastName: existingAccount.lastName,
            email: existingAccount.email,
            location: existingAccount.location,
          });
        } else {
          console.log("A Password didn't match on a sign in attempt.");
          res.status(401).json({ message: "Invalid password" });
        }
      } catch {
        console.log("Something with the password verification went wrong");
      }
    } else {
      res.status(404).json({
        message: "Account does not exist, did you mean to sign up instead?",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
