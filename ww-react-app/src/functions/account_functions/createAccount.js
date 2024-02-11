async function createAccount(jsonObj) {
  /**
   * Signs up the user with a post request.
   **/
  const apiEndpoint = "http://localhost:3001/account/signup";

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
    window.alert("Error during API Request:", error.message);
    throw error;
  }
}
export default createAccount;
