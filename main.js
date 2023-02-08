//references to DOM Elements
var dataDisplayEl = $("#currentDay");
var container = $(".container");

var btnObj = {
  "9AM": "9AM-btn",
  "10AM": "10AM-btn",
  "11AM": "11AM-btn",
  "12PM": "12PM-btn",
  "1PM": "1PM-btn",
  "2PM": "2PM-btn",
  "3PM": "3PM-btn",
  "4PM": "4PM-btn",
  "5PM": "5PM-btn",
};

//Function to display data
function dispDate() {
  var currentDate = moment().format("dddd, MMMM Do");

  dataDisplayEl.text(currentDate);

  timeStyle();
}

//Function to style based on past, present and future plan
function timeStyle() {
  var currentTime = moment().format("LT");

  for (var btn in btnObj) {
    $(`#${btn}`).attr("class", "row past");

    var sliTime = currentTime.slice(0, -6) + currentTime.slice(-2);

    if (sliTime == btn) {
      $(`#${btn}`).attr("class", "row present");
      break;
    }
  }
}

//Function to store data to local storage
function submitText() {
  var toDoList = getLocalStorage();

  var eventID = $(this).attr("id").slice(0, -4);

  var textarea = $(`#${eventID}`).val();

  toDoList[eventID] = textarea;

  localStorage.setItem("toDoList", JSON.stringify(toDoList));

  $(".localStorageContainer").html(`
   <p>Appointment Added to <span class='time-block red-text'>localStorage</span>&#10004</p>
   `);
}

//Function to populate text area
function getLocalStorage() {
  return JSON.parse(localStorage.getItem("toDoList")) || {};
}

//Function to load from local storage onto page
function loadLocalStorage() {
  var toDoList = getLocalStorage();

  for (var item in toDoList) {
    var currentTxtArea = $(`#${item}`);

    currentTxtArea.val(toDoList[item]);
  }
}

function loadPlanner() {
  for (var hour in btnObj) {
    var currentBtn = btnObj[hour];

    container.append(`
        <label for="${hour}" class="hour description">${hour}</label>
        <textarea id="${hour}" name="${hour}" class="row future"></textarea>
        <button id="${currentBtn}" class="saveBtn"><i class="fas fa-save"></i></button>
        `);

    $(`#${currentBtn}`).on("click", submitText);
  }
}

//Function to initialise file
function init() {
  loadPlanner();

  loadLocalStorage();

  timeStyle();

  setInterval(dispDate, 1000);
}

init();
