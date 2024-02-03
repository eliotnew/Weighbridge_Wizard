const express = require("express");
const router = express.Router();
const truckModel = require("../../models/truckModel");

/**
 * gets all trucks on the db by reg.
 */

router.get("/", async (req, res) => {
  console.log("Recieved a request to GET all trucks");
  try {
    const trucks = await truckModel.find();
    return res.status(200).json(trucks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
