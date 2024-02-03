const dayjs = require("dayjs");
/**
 * returns a string of the date in format hours and minutes
 */
function getTime() {
  const now = dayjs().format("HH:mm");
  return now;
}
module.exports = getTime;
