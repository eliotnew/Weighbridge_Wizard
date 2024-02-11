const express = require("express");
const router = express.Router();
const accountModel = require("../../models/accountModel");
const bcrypt = require("bcryptjs");
const checkAccExists = require("../../functions/accountCheck");
const getAccountObject = require("../../functions/getAccount");

/**
 * Create an account using given data and formats it into accountModel schema on the database.
 */

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password, location } = req.body;

    console.log("Recieved body : foreName:", firstName);
    console.log("surName:", firstName);
    console.log("email:", lastName);
    console.log("password:", password);
    console.log("location:", location);

    const exists = await checkAccExists(email);

    if (exists == false) {
      // create the account

      const saltRounds = 8;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      console.log("encrypting password " + password + "into " + hashedPassword);

      const createAccount = new accountModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        location,
      });

      console.log("createAccount:", createAccount);

      // Save to db and respond
      await createAccount.save();

      const existingAccount = await getAccountObject(email);
      const theID = existingAccount._id.toString();
      console.log("SUccessfully created an account!");
      res.status(201).json({
        message: "Account created successfully",
        userId: theID,
        firstName: existingAccount.firstName,
        lastName: existingAccount.lastName,
        email: existingAccount.email,
        location: existingAccount.location,
      }); //returns the account object without password for client side to use.
    } else {
      return res.status(400).json({
        message:
          "An account with this email already exists, did you mean to sign IN instead?",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
