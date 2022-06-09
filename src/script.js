// DATE AND TIME

let now = new Date();

let h2 = document.querySelector("h2");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let week = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

let month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let day = week[now.getDay()];
let calendar = month[now.getMonth()];
h2.innerHTML = `${day}, ${calendar} ${hours}:${minutes}`;

// SUBMIT BUTTON

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = temp + `°F`;
  let cityName = document.querySelector("#city-results");
  cityName.innerHTML = response.data.name;
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;

  let apiKey = "679b40954b2c6d5ff093713c7a2bd537";
  let units = "imperial";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${cityInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);

// CURRENT LOCATION BUTTON

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(response) {
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;

  let apiKey = "679b40954b2c6d5ff093713c7a2bd537";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);
