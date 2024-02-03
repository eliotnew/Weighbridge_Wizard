const truckModel = require("../../models/truckModel");
const generateOrderNumberID = require("../generateOrderNumberID");
/**
 * This function ensures that the required data exists on the db everytime it is started up.
 *  Trucks.
 */
async function populateTrucks() {
  try {
    //---------------------------------------------------> Create Entities

    const truck1 = new truckModel({
      driverName: "Max Power",
      email: "max.power@email.com",
      reg: "MX16PWR",
      truckType: "dump",
      phone: 442049233874,
      maxGVW: 44000,
    });
    const truck2 = new truckModel({
      driverName: "Rocky Roads",
      email: "rocky.roads@email.com",
      reg: "RR53TRK",
      truckType: "hotbox",
      phone: 441986574056,
      maxGVW: 26000,
    });
    const truck3 = new truckModel({
      driverName: "Wheeler Walker",
      email: "wheeler.walker@email.com",
      reg: "WW69BJR",
      truckType: "sidelifter",
      phone: 447915095954,
      maxGVW: 44000,
    });
    const truck4 = new truckModel({
      driverName: "Eliot Old",
      email: "eliot.old@email.com",
      reg: "EO77UOP",
      truckType: "dump",
      phone: 447915095954,
      maxGVW: 72000,
    });

    //----------------------------------------------------> Check that my default trucks exist there and replace/insert them

    const exists1 = await truckModel.findOne({ reg: "MX16PWR" });
    if (!exists1) {
      await truck1.save();
    } else
      truckModel.updateOne({ reg: "MX16PWR" }, { $set: truck1.toObject() });

    const exists2 = await truckModel.findOne({ reg: "RR53TRK" });
    if (!exists2) {
      await truck2.save();
    } else {
      truckModel.updateOne({ reg: "RR53TRK" }, { $set: truck2.toObject() });
    }

    const exists3 = await truckModel.findOne({ reg: "WW69BJR" });
    if (!exists3) {
      await truck3.save();
    } else {
      truckModel.updateOne({ reg: "WW69BJR" }, { $set: truck3.toObject() });
    }

    const exists4 = await truckModel.findOne({ reg: "EO77UOP" });
    if (!exists4) {
      await truck4.save();
    } else {
      truckModel.updateOne({ reg: "EO77UOP" }, { $set: truck4.toObject() });
    }
  } catch (error) {
    console.error("Error populating the trucks in the database:", error);
  }
}
module.exports = populateTrucks;
