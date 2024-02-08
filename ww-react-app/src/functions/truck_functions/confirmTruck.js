async function confirmTruck(reg) {
  /**
   * Confirms truck is on DB
   **/
  const apiEndpoint = "http://localhost:3001/trucks/confirm/" + reg;

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
export default confirmTruck;
