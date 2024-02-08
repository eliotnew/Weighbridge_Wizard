async function weighIn(jsonObj) {
  /**
   * Creates a weigh-in ticket with a post request.
   **/
  const apiEndpoint = "http://localhost:3001/weigh/in";

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
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

export default weighIn;
