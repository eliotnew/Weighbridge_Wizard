async function weighOut(jsonObj) {
  /**
   * Creates a weigh-out ticket with a post request. requires reg and out-weight
   **/
  const apiEndpoint = "http://localhost:3001/weigh/out";

  try {
    const response = await fetch(apiEndpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonObj),
    });

    // Check if the request was successful
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

export default weighOut;
