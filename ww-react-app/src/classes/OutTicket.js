import weighOut from "../functions/ticket_functions/weighOut";

class OutTicket {
  constructor(reg, grossWeight) {
    this.reg = reg;
    this.grossWeight = Number(grossWeight);

    this.outTicketData = this.toJSON();
  }

  toJSON() {
    return {
      reg: this.reg,
      outWeight: this.grossWeight,
    };
  }

  async updateTicket() {
    try {
      const response = await weighOut(this.outTicketData);
      return response;
    } catch (error) {
      console.log("Failed to add truck to the database", error);
    }
  }
}
export default OutTicket;
