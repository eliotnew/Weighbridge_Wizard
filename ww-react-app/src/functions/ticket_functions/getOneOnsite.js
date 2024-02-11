async function getOneOnesite(reg) {
  /**
   * Returns one onsite by reg
   **/
  const apiEndpoint = "http://localhost:3001/ticket/getone/onsite/" + reg;

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
export default getOneOnesite;
