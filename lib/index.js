let weatherButton = document.querySelector('.weather-btn')
var loc = document.querySelector('.input-field')
var current1 = document.querySelector('.current-box-1')
var current2 = document.querySelector('.current-box-2')
var hourlyForecast = document.querySelector('.hourly-forecast')
var dailyForecast = document.querySelector('.daily-forecast')
var addFaveButton = document.querySelector('.add-favorite-btn')
var favoritesButton = document.querySelector('.favorites-btn')
var favorites = document.querySelector('.favorites')

function getWeather () {
  if (loc.value === ''){
    var cityState = 'Denver,Co'
  } else 
    var cityState = loc.value
  var weatherRequest = new XMLHttpRequest();
  weatherRequest.open('GET', `http://localhost:3000/api/v1/forecast?location=${cityState}`); 
  weatherRequest.setRequestHeader('Content-Type', 'application/json');
  weatherRequest.onload = function() {
    var response = JSON.parse(weatherRequest.responseText);
    var data = Object.values(response['data']);
    var weather = Object.values(data[2]);
    currentWeatherHtml1(weather[0]);
    currentWeatherHtml2(weather[0]);
    hourlyForecastHtml(weather[1]);
    dailyForecastHtml(weather[2]);
  };
  weatherRequest.send();
};

function defaultWeather () {
  getWeather()
}

function currentWeatherHtml1(data) {
  var date = new Date(data.time);
  var hour = date.getHours()
  var ampm = hour >= 12 ? 'pm' : 'am';
  var time = `${hour}:${date.getMinutes()}${ampm}   ${date.getUTCMonth() +1}/${date.getUTCDate()}`;
  var currently1 = `<div class='icon-c1'> ${data.icon} </div>
                    <div class='summary-c1'> ${data.summary} </div>
                    <div class='temp-c1'> ${data.temperature}˚ </div>
                    <div class='city-c1'> ${data.location} </div>
                    <div class='time-c1'> ${time} </div>`
  current1.innerHTML = currently1
};

function currentWeatherHtml2(data) {
  var currently2 = `<div class='icon-c2'> ${data.icon} </div>
                    <div class='summary-c2'> ${data.summary} </div>
                    <div class='today-c2'> Today: ${data.today} </div>
                    <div class='feels-like-c2'> Feels Like: ${data.feels_like}˚ </div>
                    <div class='humidity-c2'> Humidity ${data.humidity}% </div>
                    <div class='visibility-c2'> Visibility ${data.visibility} miles </div>
                    <div class='uv_index-c2'> UV_Index ${data.uv_index} </div>`
  current2.innerHTML = currently2
};

function hourlyForecastHtml(data) {
  var hourly = []
  var i;
  for (i = 0; i < data.length; i++) {
    var date = new Date(data[i].time);
    var hour = date.getHours();
    var ampm = hour >= 12 ? 'pm' : 'am';
    var hour = `<div class='hour-h'> ${hour}${ampm} </div>
                <div class='icon-h'> ${data[i].icon} </div>
                <div class='temp-h'> ${data[i].temperature}˚ <div>`
    hourly.push(hour)
  };
  hourlyForecast.innerHTML = hourly.join('');
};
              
function dailyForecastHtml(data) {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var daily = []
  var i;
  for (i = 0; i < data.length; i++) {
    var date = new Date(data[i].time);
    var dayName = days[date.getDay()];
    var day = `<div class='day-d'> ${dayName} </div>
               <div class='summary-d'> ${data[i].summary} </div>
               <div class='icon-d'> ${data[i].icon} </div>
               <div class='precip-d'> ${data[i].precip}% </div>
               <div class='precip-type-d'> ${data[i].precip_type} </div>
               <div class='high-d'> High ${data[i].high}˚ </div>
               <div class='low-d'> Low ${data[i].low}˚ </div>`
    daily.push(day)
  };
  dailyForecast.innerHTML = daily.join('');
};

function addFavorite () {
  if (loc.value != '') {
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
  }
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
  var faves = [];
  var i;
  for (i = 0; i < data.length; i++) {
    var fave = `<div class='city-f'> ${data[i].id}</div>
    <div class='time-f'> Local Time: ${data[i].attributes.time} </div>
    <div class='icon-f'> ${data[i].attributes.icon} </div>
    <div class='summary-f'> ${data[i].attributes.summary} </div>
    <div class='temp-f'> ${data[i].attributes.temperature}˚ </div>
    <div class='feels-like-f'> Feels like ${data[i].attributes.feels_like}˚ </div></br>`
    faves.push(fave)
    var joinedFaves = faves.join(',').replace(/,/g, ' ').split();
  };
  favorites.innerHTML = faves.join('');
};

window.addEventListener('load', defaultWeather);
weatherButton.addEventListener('click', getWeather);
addFaveButton.addEventListener('click', addFavorite);
favoritesButton.addEventListener('click', getFavorites);