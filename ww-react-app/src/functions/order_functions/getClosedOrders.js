async function getClosedOrders() {
  /**
   * gets all orders that are closed
   **/
  const apiEndpoint = "http://localhost:3001/order/getclosed";

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
      return errorresponse;
    }
  } catch (error) {
    window.alert("Error during API Request:", error.message);
    throw error;
  }
}
export default getClosedOrders;
