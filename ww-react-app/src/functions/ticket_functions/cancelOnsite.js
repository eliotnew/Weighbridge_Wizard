async function cancelOnsite(query) {
  /**
   * Deletes an onsite ticket
   **/
  const apiEndpoint = "http://localhost:3001/ticket/cancelonsite?reg=" + query;

  try {
    const response = await fetch(apiEndpoint, {
      method: "DELETE",
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
export default cancelOnsite;
