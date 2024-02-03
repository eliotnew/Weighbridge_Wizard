const orderModel = require("../../models/orderModel");
const generateOrderNumberID = require("../generateOrderNumberID");
/**
 * This function ensures that the required data exists on the db everytime it is started up.
 * Orders to assign Jobs.
 */
async function populateOrders() {
  try {
    //---------------------------------------------------> Create ids
    const id1 = generateOrderNumberID();
    const exists1 = await orderModel.findOne({ orderNumber: id1 });

    const id2 = generateOrderNumberID();
    const exists2 = await orderModel.findOne({ orderNumber: id2 });

    const id3 = generateOrderNumberID();
    const exists3 = await orderModel.findOne({ orderNumber: id3 });

    const id4 = generateOrderNumberID();
    const exists4 = await orderModel.findOne({ orderNumber: id4 });

    const id5 = generateOrderNumberID();
    const exists5 = await orderModel.findOne({ orderNumber: id5 });

    const id6 = generateOrderNumberID();
    const exists6 = await orderModel.findOne({ orderNumber: id6 });

    //---------------------------------------------------> Create Entities

    const closedOrder1 = new orderModel({
      orderNumber: id1,
      company: "Smith & Sons Tarmac",
      dateStart: "04/10/2023",
      dateFinish: "15/10/2023",
      open: false,
      product: "Asphalt mix 1",
      quantity: 2500,
      amountDelivered: 2500,
      deliveryAddress1: "39 Silver Street",
      deliveryAddress2: "",
      deliveryTown: "Plymouth",
      deliveryPostCode: "PL36YE",
      contactPhone: 445512439303,
      contactEmail: "smith.tarmac@email.com",
    });
    const closedOrder2 = new orderModel({
      orderNumber: id2,
      company: "Ace Construction",
      dateStart: "08/10/2023",
      dateFinish: "15/12/2023",
      open: false,
      product: "Limestone 6mm",
      quantity: 5000,
      amountDelivered: 5000,
      deliveryAddress1: "91 Meadows Valley",
      deliveryAddress2: "Sunny Vales",
      deliveryTown: "Fictionville",
      deliveryPostCode: "FV31DA",
      contactPhone: 447390796360,
      contactEmail: "ace.construction@email.com",
    });
    const openOrder1 = new orderModel({
      orderNumber: id3,
      company: "Smith & Sons Tarmac",
      dateStart: "05/01/2024",
      dateFinish: "Asphalt mix 2",
      open: true,
      product: "",
      quantity: 5000,
      amountDelivered: 2500,
      deliveryAddress1: "14 New Build Ave.",
      deliveryAddress2: "Rainy Lane",
      deliveryTown: "Fictionville",
      deliveryPostCode: "FV11GT",
      contactPhone: 447390796360,
      contactEmail: "ace.construction@email.com",
    });
    const openOrder2 = new orderModel({
      orderNumber: id4,
      company: "Ace Construction",
      dateStart: "02/02/2024",
      dateFinish: "",
      open: true,
      product: "Limestone 10mm",
      quantity: 3000,
      amountDelivered: 1250,
      deliveryAddress1: "91 Meadows Valley",
      deliveryAddress2: "Sunny Vales",
      deliveryTown: "Fictionville",
      deliveryPostCode: "FV31DA",
      contactPhone: 447390796360,
      contactEmail: "ace.construction@email.com",
    });
    const openOrder3 = new orderModel({
      orderNumber: id5,
      company: "Colossal Industries",
      dateStart: "25/01/2024",
      dateFinish: "",
      open: true,
      product: "Shipping Container",
      quantity: 700,
      amountDelivered: 110,
      deliveryAddress1: "Unit 2",
      deliveryAddress2: "Bolton Industrial Estate",
      deliveryTown: "Bolton",
      deliveryPostCode: "BT21RT",
      contactPhone: 445612425468,
      contactEmail: "colossal.industries@email.com",
    });
    const openOrder4 = new orderModel({
      orderNumber: id6,
      company: "Ace Construction",
      dateStart: "14/01/2024",
      dateFinish: "",
      open: true,
      product: "Limestone 20mm",
      quantity: 5000,
      amountDelivered: 3500,
      deliveryAddress1: "91 Meadows Valley",
      deliveryAddress2: "Sunny Vales",
      deliveryTown: "Fictionville",
      deliveryPostCode: "FV31DA",
      contactPhone: 447390796360,
      contactEmail: "ace.construction@email.com",
    });

    //----------------------------------------------------> Check that my default orders are there and replace/insert them
    if (!exists1) {
      await closedOrder1.save();
    } else
      orderModel.updateOne(
        { orderNumber: id1 },
        { $set: closedOrder1.toObject() }
      );

    if (!exists2) {
      await closedOrder2.save();
    } else {
      await orderModel.updateOne(
        { orderNumber: id2 },
        { $set: closedOrder2.toObject() }
      );
    }

    if (!exists3) {
      await openOrder1.save();
    } else {
      await orderModel.updateOne(
        { orderNumber: id3 },
        { $set: openOrder1.toObject() }
      );
    }

    if (!exists4) {
      await openOrder2.save();
    } else {
      await orderModel.updateOne(
        { orderNumber: id4 },
        { $set: openOrder2.toObject() }
      );
    }

    if (!exists5) {
      await openOrder3.save();
    } else {
      await orderModel.updateOne(
        { orderNumber: id5 },
        { $set: openOrder3.toObject() }
      );
    }

    if (!exists6) {
      await openOrder4.save();
    } else {
      await orderModel.updateOne(
        { orderNumber: id6 },
        { $set: openOrder4.toObject() }
      );
    }
  } catch (error) {
    console.error("Error populating the orders in the database:", error);
  }
}
module.exports = populateOrders;
