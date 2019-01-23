var forecastButton = document.querySelector('.location-forecast')
var loc = document.querySelector('.location-input')

function getForecast () {
  var cityState = loc.value
  var forecastRequest = new XMLHttpRequest();
  forecastRequest.open('GET', `http://localhost:3000/api/v1/forecast?location=${cityState}`); 
  forecastRequest.onload = function() {
    var forecast = JSON.parse(forecastRequest.responseText);
  };
  forecastRequest.send();
};

forecastButton.addEventListener('click', getForecast);