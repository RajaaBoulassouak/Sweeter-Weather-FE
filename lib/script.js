var forecastButton = document.querySelector('.location-forecast')
var loc = document.querySelector('.location-input')
var currentForecast = document.querySelector('.current-forecast')

function getForecast () {
  var cityState = loc.value
  var forecastRequest = new XMLHttpRequest();
  forecastRequest.open('GET', `http://localhost:3000/api/v1/forecast?location=${cityState}`); 
  forecastRequest.onload = function() {
    var response = JSON.parse(forecastRequest.responseText);
    var data = Object.values(response['data']);
    var forecast = Object.values(data[2]);
    currentForecastHtml(forecast[0]);
  };
  forecastRequest.send();
};

function currentForecastHtml(data) {
  var htmlStringOne = '';
  htmlStringOne = "<p>" + Object.values(data) + ".</p>";
  currentForecast.insertAdjacentHTML('beforeend', htmlStringOne);
};

forecastButton.addEventListener('click', getForecast);