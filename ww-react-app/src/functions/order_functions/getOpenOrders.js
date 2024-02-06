async function getClosedOrders() {
  /**
   * Using the userID , requests for and returns all bookings for hotel rooms
   **/
  const apiEndpoint = "http://localhost:3001/order/getopen";

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
