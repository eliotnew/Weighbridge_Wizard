async function deleteTruck(reg) {
  /**
   * Deletes the truck by reg
   */
  const apiEndpoint = "http://localhost:3001/truck/delete/" + reg;

  try {
    const response = await fetch(apiEndpoint, {
      method: "DELETE",
      headers: {},
    });

    if (response.ok) {
      return { success: true };
    } else {
      console.log(
        "API Request failed, check server logs: ",
        response.statusText
      );
      const errorResponse = await response.json();
      return { success: false, error: errorResponse };
    }
  } catch (error) {
    throw error;
  }
}
export default deleteTruck;
