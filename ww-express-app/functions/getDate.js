const dayjs = require("dayjs");
/**
 * returns a string of the date in format DD/MM/YYYY
 */
function getDate() {
  const now = dayjs().format("DD/MM/YYYY");
  return now;
}
module.exports = getDate;
