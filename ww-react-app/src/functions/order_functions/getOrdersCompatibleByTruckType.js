async function getOrdersCompatibleByTruckType(query) {
  /**
   * Get all orders that are open and have compatible cargo for the truck.
   **/
  const apiEndpoint =
    "http://localhost:3001/order/getcompatible?compatible=" + query;

  try {
    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {},
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result); // remove later
      return result;
    } else {
      console.log(
        "API Request failed, check server logs: ",
        response.statusText
      );
      const errorresponse = await response.json();
      return errorresponse;
    }
  } catch (error) {
    throw error;
  }
}
export default getClosedOrders;
