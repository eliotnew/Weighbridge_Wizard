const accountModel = require("../models/accountModel");
const checkAccExists = require("./accountCheck");
const bcrypt = require("bcryptjs");
/**
 * This function ensures that the required data exists on the db everytime it is started up.
 * This mostly pertains to products and also an account and data to populate my tables for development and demonstration.
 */
async function populateDB() {
  try {
    //----------------------------------------------------> Puts a default account on Weighbridge Wizard. (if it doesnt exist.)
    const password = "Helloworld1!";
    const saltRounds = 8;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const arthurAccount = new accountModel({
      firstName: "Arthur",
      lastName: "Pendragon",
      email: "arthur.pendragon@email.com",
      password: hashedPassword,
      location: "Camelot",
    });

    const accountExists = await checkAccExists(arthurAccount.email);

    if (!accountExists) {
      await arthurAccount.save();
      console.log("long live king arthur!");
    } else {
      await accountModel.updateOne(
        { email: "arthur.pendragon@email.com" },
        {
          $set: {
            foreName: arthurAccount.firstName,
            surName: arthurAccount.lastName,
            email: arthurAccount.email,
            password: arthurAccount.password,
            location: arthurAccount.location,
          },
        }
      );
      console.log("Restored King Arthur's account!");
    }
  } catch (error) {
    console.error("Error populating the database:", error);
  }
}
module.exports = populateDB;
