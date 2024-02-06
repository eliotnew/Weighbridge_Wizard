function saveLocalAccountDetails(responseBody) {
  /**
   * Saves the successful account created to the local storage using the confirmed details from the database to prevent false log in data.
   */

  localStorage.setItem("foreName", responseBody.foreName);
  localStorage.setItem("surName", responseBody.surName);
  localStorage.setItem("id", responseBody.userId);
  localStorage.setItem("email", responseBody.email);
  localStorage.setItem("location", location);
}
export default saveLocalAccountDetails;
