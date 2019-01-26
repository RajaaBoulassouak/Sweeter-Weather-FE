let forecastButton = document.querySelector('.forecast-btn')
var loc = document.querySelector('.input-field')
var current1 = document.querySelector('.current-box-1')
var current2 = document.querySelector('.current-box-2')
var hourlyForecast = document.querySelector('.hourly-forecast')
var dailyForecast = document.querySelector('.daily-forecast')
var addFaveButton = document.querySelector('.add-favorite-btn')
var favoritesButton = document.querySelector('.favorites-btn')
var favorites = document.querySelector('.favorites')

function getForecast () {
  var cityState = loc.value
  var forecastRequest = new XMLHttpRequest();
  forecastRequest.open('GET', `http://localhost:3000/api/v1/forecast?location=${cityState}`); 
  forecastRequest.setRequestHeader('Content-Type', 'application/json');
  forecastRequest.onload = function() {
    var response = JSON.parse(forecastRequest.responseText);
    var data = Object.values(response['data']);
    var forecast = Object.values(data[2]);
    currentForecastHtml1(forecast[0]);
    currentForecastHtml2(forecast[0]);
    hourlyForecastHtml(forecast[1]);
    dailyForecastHtml(forecast[2]);
  };
  forecastRequest.send();
};

function currentForecastHtml1(data) {
  var currently1 = `<div class='icon-1'> ${data.icon} </div>
                    <div class='summary-1'> ${data.summary} </div>
                    <div class='temp-1'> ${data.temperature}˚ </div>
                    <div class='city'> ${data.location} </div>
                    <div class='time'> ${data.time} </div>`
  current1.innerHTML = currently1
};

function currentForecastHtml2(data) {
  var currently2 = `<div class='icon-2'> ${data.icon} </div>
                    <div class='summary-2'> ${data.summary} </div>
                    <div class='today'> Today: ${data.today} </div>
                    <div class='feels-like'> Feels Like: ${data.feels_like}˚ </div>
                    <div class='humidity'> Humidity ${data.humidity}% </div>
                    <div class='visibility'> Visibility ${data.visibility} miles </div>
                    <div class='uv_index'> UV_Index ${data.uv_index} </div>`
  current2.innerHTML = currently2
};

function hourlyForecastHtml(data) {
  var i;
  var hourly = []
  for (i = 0; i < data.length; i++) {
    var hour = `<div class='hour'> ${data[i].time} </div>
                <div class='icon-3'> ${data[i].icon} </div>
                <div class='temp-2'> ${data[i].temperature}˚ </div>`
    hourly.push(hour)
  };
  hourlyForecast.innerHTML = hourly;
};
              
function dailyForecastHtml(data) {
  var i;
  var daily = []
  for (i = 0; i < data.length; i++) {
    var day = `<div class='day'> ${data[i].time} </div>
               <div class='summary-3'> ${data[i].summary} </div>
               <div class='icon-4'> ${data[i].icon} </div>
               <div class='precip'> ${data[i].precip}% </div>
               <div class='precip-type'> ${data[i].precip_type} </div>
               <div class='high'> High ${data[i].high}˚ </div>
               <div class='low'> Low ${data[i].low}˚ </div>`
    daily.push(day)
  };
  dailyForecast.innerHTML = daily;
};

function addFavorite () {
  var cityState = loc.value
  var faveLocRequest = new XMLHttpRequest();
  faveLocRequest.open('POST', 'http://localhost:3000/api/v1/favorites');
  faveLocRequest.setRequestHeader('Content-Type', 'application/json');
  faveLocRequest.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
      alert(`${cityState} added to Favorites`);
    };
  };
  var dataObject = { "location": `${cityState}`, "api_key": "2a5cfce9-a913-4ea2-b8c9-5748795200e9" };
  var jsonString = JSON.stringify(dataObject);
  faveLocRequest.send(jsonString)
};

function getFavorites () {
  var favoritesRequest = new XMLHttpRequest();
  favoritesRequest.open('GET', 'http://localhost:3000/api/v1/favorites?api_key=2a5cfce9-a913-4ea2-b8c9-5748795200e9'); 
  favoritesRequest.onload = function() {
    var response = JSON.parse(favoritesRequest.responseText);
    var favorites = Object.values(response['data']);
    favoritesHtml(favorites)
  };
  favoritesRequest.send();
};

function favoritesHtml(data) {
  var htmlString = '';
  var i;
  for (i = 0; i < data.length; i++) {
      htmlString += "<p>" + Object.values(data[i]) + ".</p>";
  };
  favorites.insertAdjacentHTML('beforeend', htmlString);
};

forecastButton.addEventListener('click', getForecast);
addFaveButton.addEventListener('click', addFavorite);
favoritesButton.addEventListener('click', getFavorites);
