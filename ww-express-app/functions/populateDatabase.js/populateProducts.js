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
      { product: "Limestone 6mm", compatible: "dump" },
      { product: "Limestone 10mm", compatible: "dump" },
      { product: "Limestone 20mm", compatible: "dump" },
      { product: "Fine Sand 0/4mm", compatible: "dump" },
      { product: "Clay Pellets", compatible: "dump" },
      { product: "Animal Feed", compatible: "dump" },
      { product: "Asphalt mix 1", compatible: "hotbox" },
      { product: "Asphalt mix 2", compatible: "hotbox" },
      {
        product: "Shipping Container",
        compatible: "sidelifter",
      },
    ];

    await productModel.insertMany(camelotProducts);
  } catch (error) {
    console.error("Error populating the products in the database:", error);
  }
}
module.exports = populateProducts;
