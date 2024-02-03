const productModel = require("../../models/productModel");
/**
 * This function ensures that the required data exists on the db everytime it is started up.
 * Products.
 */
async function populateProducts() {
  try {
    //----------------------------------------------------> Tears down and replaces all Products
    await productModel.deleteMany({});

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

    const middleEarthProducts = [
      { product: "Limestone 6mm", compatible: "dump", location: "middleEarth" },
      {
        product: "Limestone 10mm",
        compatible: "dump",
        location: "middleEarth",
      },
      {
        product: "Limestone 20mm",
        compatible: "dump",
        location: "middleEarth",
      },
      {
        product: "Fine Sand 0/4mm",
        compatible: "dump",
        location: "middleEarth",
      },
      { product: "Clay Pellets", compatible: "dump", location: "middleEarth" },
      { product: "Animal Feed", compatible: "dump", location: "middleEarth" },
      {
        product: "Asphalt mix 1",
        compatible: "hotbox",
        location: "middleEarth",
      },
      {
        product: "Asphalt mix 2",
        compatible: "hotbox",
        location: "middleEarth",
      },
      {
        product: "Shipping Container",
        compatible: "sidelifter",
        location: "middleEarth",
      },
    ];

    await productModel.insertMany(camelotProducts);
    await productModel.insertMany(middleEarthProducts);
  } catch (error) {
    console.error("Error populating the products in the database:", error);
  }
}
module.exports = populateProducts;
