async function getTruck(reg) {
  /**
   * Returns all trucks from server
   **/
  const apiEndpoint = "http://localhost:3001/truck/get/" + reg;

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
    throw error;
  }
}
export default getTruck;
