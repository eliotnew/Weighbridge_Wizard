const express = require("express");
const router = express.Router();
const ticketModel = require("../../models/ticketModel");
/**
 * Weigh in creates a ticket which will be half completed.
 */

router.delete("/", async (req, res) => {
  const { reg } = req.query;

  if (!reg) {
    return res
      .status(400)
      .json({ message: "Reg was not recieved in query (no reg given)." });
  }

  console.log("Recieved a request to cancel onsite with reg:", reg);

  try {
    await ticketModel.deleteOne({ reg: reg, onsite: true });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Ticket not found or onsite." });
    }
    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
