import weighIn from "../functions/ticket_functions/weighIn";

class InTicket {
  constructor(reg, tareWeight, clerk_Id, loadedLocation, order_Id) {
    this.reg = reg;
    this.tareWeight = tareWeight;
    this.clerk_Id = clerk_Id;
    this.loadedLocation = loadedLocation;
    this.order_Id = order_Id;

    this.inTicketData = this.toJSON();
  }

  toJSON() {
    return {
      reg: this.reg,
      tareWeight: this.tareWeight,
      clerk_Id: this.clerk_Id,
      loadedLocation: this.loadedLocation,
      order_Id: this.order_Id,
    };
  }

  async createTicket() {
    try {
      const response = await weighIn(this.inTicketData);
      return response;
    } catch (error) {
      console.log("Failed to add truck to the database", error);
    }
  }
}
export default InTicket;
