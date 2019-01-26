let forecastButton = document.querySelector('.forecast-btn')
var loc = document.querySelector('.input-field')
var currentForecast = document.querySelector('.current-forecast')
var hourlyForecast = document.querySelector('.hourly-forecast')
var dailyForecast = document.querySelector('.daily-forecast')
var addFaveButton = document.querySelector('.add-favorite-btn')
var favoritesButton = document.querySelector('.favorites-btn')
var favorites = document.querySelector('.favorites')

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
    dailyForecastHtml(forecast[2]);
  };
  forecastRequest.send();
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

function currentForecastHtml(data) {
  var htmlString1 = '';
  htmlString1 = "<p>" + Object.values(data) + ".</p>";
  currentForecast.insertAdjacentHTML('beforeend', htmlString1);
};

function hourlyForecastHtml(data) {
  var htmlString2 = '';
  var i;
  for (i = 0; i < data.length; i++) {
    htmlString2 += "<p>" + Object.values(data[i]) + ".</p>";
  }
  hourlyForecast.insertAdjacentHTML('beforeend', htmlString2);
};

function dailyForecastHtml(data) {
  var htmlString = '';
  var i;
  for (i = 0; i < data.length; i++) {
    htmlString += "<p>" + Object.values(data[i]) + ".</p>";
  }
  dailyForecast.insertAdjacentHTML('beforeend', htmlString);
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