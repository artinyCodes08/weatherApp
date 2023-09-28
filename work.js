// Function to format a number as a two-digit string
function formatTwoDigits(number) {
  return number.toString().padStart(2, "0");
}

// Array for the days of the week
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Array for the months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Get the current date and time
const currentDate = new Date();
const currentDayOfWeek = daysOfWeek[currentDate.getDay()];
const currentMonth = months[currentDate.getMonth()];
const currentDayOfMonth = currentDate.getDate();
const currentHour = formatTwoDigits(currentDate.getHours());
const currentMinute = formatTwoDigits(currentDate.getMinutes());

// Generate the date and time strings
const dateSentence = `${currentDayOfWeek}, ${currentMonth} ${currentDayOfMonth}`;
const timeSentence = `${currentHour}:${currentMinute}`;

// Update the HTML elements
const dateElement = document.querySelector("#date");
dateElement.innerHTML = dateSentence;

const timeElement = document.querySelector("#time");
timeElement.innerHTML = timeSentence;

//searching button//
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function searchButton(event) {
  event.preventDefault();

  const input = document.querySelector("input");
  const resultHeading = document.querySelector("h2");

  const capitalizedValue = capitalizeFirstLetter(input.value);
  resultHeading.innerHTML = capitalizedValue;
}

const searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", searchButton);

//Get day
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Function to show the Remaining days
function displayForecast(response) {
  let foreCastResponce = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  console.log(foreCastResponce);
  let forcastHtml = `<div class="row">`;
  foreCastResponce.forEach(function (weatherDay, index) {
    if (index < 6) {
      forcastHtml =
        forcastHtml +
        ` 
          <div class="col-2">
        <div class="weather-forecast-day">${formatDay(weatherDay.time)}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            weatherDay.condition.icon
          }.png"
          alt=""
          width="42"
        />
        
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">  ${Math.round(
            weatherDay.temperature.maximum
          )}° </span>|
          <span class="weather-forecast-temperature-min">  ${Math.round(
            weatherDay.temperature.minimum
          )}° </span>
        </div>
      </div>
          
        `;
    }
  });
  forcastHtml = forcastHtml + `</div>`;
  forecastElement.innerHTML = forcastHtml;
}

function getForeCast(coordinates) {
  let apiKey = "a3a419258tfd9d7ae08b24f3893b14ob";
  let foreCastUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(foreCastUrl).then(displayForecast);
}

function handleSearch(cityName) {
  let apiKey = "a3a419258tfd9d7ae08b24f3893b14ob";
  let weatherUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(weatherUrl).then(weather);
}

//Function to fetch and display weather information
function searchButton2(event) {
  event.preventDefault();
  search2 = document.querySelector("input");
  let capitalizedValue = search2.value;
  handleSearch(capitalizedValue);
}
let functionRun2 = document.querySelector("#searchForm");
functionRun2.addEventListener("submit", searchButton2);

function weather(response) {
  console.log(response);
  // Display temperature
  let celciusTemperature = document.querySelector("#temp");
  celciusValue = Math.round(response.data.temperature.current);
  celciusTemperature.innerHTML = celciusValue;
  //Display humidity
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  //Display windSpeed
  let windSpeed = document.querySelector("#speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  //Display description
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  //Display WeatherIcon
  let icon = document.getElementById("weatherIcon");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  getForeCast(response.data.coordinates);
  console.log();
}

// JavaScript code to toggle dark mode based on time
const body = document.body;
const content = document.getElementById("content");
const buttons = document.getElementsByClassName("search");
// Select all <a> elements on the page
const linkElements = document.querySelectorAll("a");

//Select both link
const firstLink = linkElements[0];
const secondLink = linkElements[1];

function toggleModeBasedOnTime() {
  if (currentHour >= 18 || currentHour < 7) {
    body.classList.add("dark-mode"); // Activate dark mode during nighttime (adjust hours as needed)
    firstLink.classList.add("dark-mode");
    secondLink.classList.add("dark-mode");
    content.classList.add("dark-mode"); // Activate dark mode for content
    // Loop through all elements with class "search" and add the class when in dark mode
    for (let i = 0; i < buttons.length; i++) {
      buttons[0].classList.add("dark-mode");
    }
  } else {
    body.classList.remove("dark-mode"); // Activate light mode during the day
    firstLink.classList.remove("dark-mode");
    secondLink.classList.remove("dark-mode");
    content.classList.remove("dark-mode"); // Activate light mode for content
  }
}
// Automatically toggle mode when the page loads
toggleModeBasedOnTime();

// Check and toggle mode periodically (e.g., every minute)
setInterval(toggleModeBasedOnTime, 60000); // Adjust the interval as needed

//Converting celcius to farenheit

//Funtion that changes celcius to farenheit
function farenheitFunction(event) {
  event.preventDefault();
  let farenheit = document.querySelector("#temp");
  farenheit.innerHTML = Math.round((celciusValue * 9) / 5 + 32);
  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");
}
//Funtion that changes farenheit to celcius
function celciusFunction(event) {
  event.preventDefault();
  let farenheit = document.querySelector("#temp");
  farenheit.innerHTML = celciusValue;
  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");
}
//addEventListner
let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", farenheitFunction);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", celciusFunction);

let celciusValue = null;

handleSearch("Lagos");
