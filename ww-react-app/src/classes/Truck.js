import createTruck from "../functions/truck_functions/createTruck";
class Truck {
  constructor(driverName, email, reg, trailerType, phoneNumber, truckType) {
    this.driverName = driverName;
    this.email = email;
    this.reg = reg;
    this.truckType = trailerType;
    this.phone = Number(phoneNumber);
    this.maxGVW = Number(truckType);

    this.truckData = this.toJSON();
  }

  toJSON() {
    return {
      driverName: this.driverName,
      email: this.email,
      reg: this.reg,
      truckType: this.truckType,
      phone: this.phone,
      maxGVW: this.maxGVW,
    };
  }

  async addTruck() {
    try {
      const response = await createTruck(this.truckData);
      return response;
    } catch (error) {
      console.log("Failed to add truck to the database", error);
    }
  }
}
export default Truck;
