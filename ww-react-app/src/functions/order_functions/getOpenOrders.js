async function getClosedOrders() {
  /**
   * Get all orders that are open
   **/
  const apiEndpoint = "http://localhost:3001/order/getopen";

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
