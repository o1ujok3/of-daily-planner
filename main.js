const currentDay = document.querySelector("#currentDay");
const timeblocks = document.querySelectorAll(".time-block");
const descriptions = document.querySelectorAll(".description");
const saveBtns = document.querySelectorAll(".saveBtn");

// Get the current time
const now = new Date();
const currentHour = now.getHours();

// Display the current day at the top of the page
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
