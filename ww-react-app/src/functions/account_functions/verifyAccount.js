async function verifyAccount(jsonObj) {
  /**
   * Takes the object returned by the express API.
   *
   */
  const apiEndpoint = "http://localhost:3001/account/signin";

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
  } catch {
    window.alert("ERROR " + errorresponse);
  }
}
export default verifyAccount;
