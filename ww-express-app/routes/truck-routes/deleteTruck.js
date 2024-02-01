const express = require("express");
const router = express.Router();
const truckModel = require("../../models/truckModel");

/**
 * delete truck on the db by reg.
 */

router.delete("/", async (req, res) => {
  const { reg } = req.body;

  console.log("Recieved a request to DELETE a truck by reg:", reg);

  const truck = await truckModel.findOne({ reg: reg });

  if (truck) {
    await truckModel.deleteOne({ reg: reg });

    res.status(204).send();

    return;
  } else {
    res.status(404).json({ message: "The truck does not exist on the db." });
    return;
  }
});

module.exports = router;
