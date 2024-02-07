async function getAllProducts() {
  /**
   * Returns all Products
   **/
  const apiEndpoint = "http://localhost:3001/products/getall";

  try {
    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {},
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.log(
        "API Request failed, check server logs: ",
        response.statusText
      );
      const errorresponse = await response.json();
      return [];
    }
  } catch (error) {
    throw [];
  }
}
export default getAllProducts;
