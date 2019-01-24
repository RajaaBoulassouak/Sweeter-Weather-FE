var forecastButton = document.querySelector('.location-forecast')
var loc = document.querySelector('.location-input')
var currentForecast = document.querySelector('.current-forecast')
var hourlyForecast = document.querySelector('.hourly-forecast')

function getForecast () {
  var cityState = loc.value
  var forecastRequest = new XMLHttpRequest();
  forecastRequest.open('GET', `http://localhost:3000/api/v1/forecast?location=${cityState}`); 
  forecastRequest.onload = function() {
    var response = JSON.parse(forecastRequest.responseText);
    var data = Object.values(response['data']);
    var forecast = Object.values(data[2]);
    currentForecastHtml(forecast[0]);
    hourlyForecastHtml(forecast[1]);
  };
  forecastRequest.send();
};

function currentForecastHtml(data) {
  var htmlString1 = '';
  htmlString1 = "<p>" + Object.values(data) + ".</p>";
  currentForecast.insertAdjacentHTML('beforeend', htmlString1);
};

function hourlyForecastHtml(data) {
  var htmlString2 = '';
  for (i = 0; i < data.length; i++) {
    htmlString2 += "<p>" + Object.values(data[i]) + ".</p>";
  }
  hourlyForecast.insertAdjacentHTML('beforeend', htmlString2);
};

forecastButton.addEventListener('click', getForecast);