async function getAllOnsite() {
  /**
   * Returns all tickets onsite == true
   **/
  const apiEndpoint = "http://localhost:3001/ticket/get/onsite";

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
      return [];
    }
  } catch (error) {
    throw [];
  }
}
export default getAllOnsite;
