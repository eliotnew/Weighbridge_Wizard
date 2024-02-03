const orderModel = require("../../models/orderModel");
const generateOrderNumberID = require("../generateOrderNumberID");
/**
 * This function ensures that the required data exists on the db everytime it is started up.
 * Orders to assign Jobs.
 */
async function populateOrders() {
  try {
    const camelotProducts = [
      { product: "Limestone 6mm", compatible: "dump", location: "camelot" },
      { product: "Limestone 10mm", compatible: "dump", location: "camelot" },
      { product: "Limestone 20mm", compatible: "dump", location: "camelot" },
      { product: "Fine Sand 0/4mm", compatible: "dump", location: "camelot" },
      { product: "Clay Pellets", compatible: "dump", location: "camelot" },
      { product: "Animal Feed", compatible: "dump", location: "camelot" },
      { product: "Asphalt mix 1", compatible: "hotbox", location: "camelot" },
      { product: "Asphalt mix 2", compatible: "hotbox", location: "camelot" },
      {
        product: "Shipping Container",
        compatible: "sidelifter",
        location: "camelot",
      },
    ];
    const id1 = generateOrderNumberID();
    const id2 = generateOrderNumberID();
    const id3 = generateOrderNumberID();
    const id4 = generateOrderNumberID();
    const id5 = generateOrderNumberID();
    const id6 = generateOrderNumberID();

    const closedOrder1 = {
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
    };
    const closedOrder2 = {
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
    };
    const openOrder1 = {
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
    };
    const openOrder2 = {
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
    };
    const openOrder3 = {
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
    };
    const openOrder4 = {
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
    };

    //----------------------------------------------------> Check that my default orders are there and replace/insert them
    await productModel.deleteMany({});
  } catch (error) {
    console.error("Error populating the products in the database:", error);
  }
}
module.exports = populateProducts;
