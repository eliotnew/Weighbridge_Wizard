const express = require("express");
const router = express.Router();
const ticketModel = require("../../models/ticketModel");
/**
 * Weigh in creates a ticket which will be half completed.
 */

router.delete("/", async (req, res) => {
  const { reg } = req.query;

  console.log("Recieved a request to cancel onsite with reg:", reg);

  if (!reg) {
    return res.status(400).json({ message: "Reg is required in query." });
  }

  try {
    const result = await ticketModel.deleteOne({ reg: reg, onSite: true });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Ticket not found or onsite." });
    }
    return res.status(204).send();
  } catch (error) {
    console.error("Failed to cancel onsite ticket:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
