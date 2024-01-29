import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarContent() {
  const num = Math.floor(Math.random() * 10000);
  return (
    <>
      <Calendar />
    </>
  );
}
export default CalendarContent;
