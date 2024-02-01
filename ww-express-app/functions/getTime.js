const dayjs = require("dayjs");
/**
 * returns a string of the date in format DD/MM/YYYY
 */
function getTime() {
  const now = dayjs().format("HH:mm");
  return now;
}
module.exports = getTime;
