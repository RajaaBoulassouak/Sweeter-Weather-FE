let weatherButton = document.querySelector('.weather-btn')
var loc = document.querySelector('.input-field')
var current1 = document.querySelector('.box-1-info-1')
var current2 = document.querySelector('.box-1-info-2')
var current3 = document.querySelector('.current-box-2')
var hourlyForecast = document.querySelector('.hourly-forecast')
var dailyForecast = document.querySelector('.daily-forecast')
var addFaveButton = document.querySelector('.add-favorite-btn')
var favoritesButton = document.querySelector('.favorites-btn')
var favorites = document.querySelector('.favorites')

function checkFieldEmpty() {
  if (loc.value == '') {
    weatherButton.disabled = true
    addFaveButton.disabled = true
  } else {
    weatherButton.disabled = false
    addFaveButton.disabled = false
  }
}

loc.addEventListener('keyup', function (event) {
  checkFieldEmpty(event.target.value);
});

function getWeather () {
  if (loc.value === ''){
    var cityState = 'Denver, CO'
  } else 
    var cityState = loc.value
  var weatherRequest = new XMLHttpRequest();
  weatherRequest.open('GET', `https://rocky-spire-33194.herokuapp.com/api/v1/forecast?location=${cityState}`); 
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
  var ampm = hour >= 12 ? 'PM' : 'AM';
  var time = `${date.getHours()}:${date.getMinutes()} ${ampm}, ${date.getUTCMonth() +1}/${date.getUTCDate()}`;
  
  var currently1 = `<p class='summary-c1'> ${data.summary} </p>
                    <p class='temp-c1'> ${data.temperature}˚ </p>`
  current1.innerHTML = currently1
  
  var currently2 = `<p class='city-c1'> ${data.location} </p>
                    <p class='conutry-c1'> United States </p>
                    <p class='time-c1'> ${time} </p>`
  current2.innerHTML = currently2
};

function currentWeatherHtml2(data) {                  
  var currently3 = `<p class='today-c2'> ${data.today} </p>
                    <p class='feels-like-c2'> Feels Like ${data.feels_like}˚ </p>
                    <p class='humidity-c2'> Humidity: ${data.humidity}% </p>
                    <p class='visibility-c2'> Visibility: ${data.visibility} miles </p>
                    <p class='uv_index-c2'> UV_Index: ${data.uv_index} </p>`
  current3.innerHTML = currently3
};

function hourlyForecastHtml(data) {
  var hourly = []
  var i;
  for (i = 0; i < data.length; i++) {
    var date = new Date(data[i].time);
    var hour = date.getHours();
    var ampm = hour >= 12 ? 'PM' : 'AM';
    var hour = `<div class='hourly'>
                  <p class='hour-h'> ${hour} ${ampm} </p>
                  <p class='temp-h'> ${data[i].temperature}˚ <p>
                </div>`
                
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
    if (data[i].precip_type === null){
      var type = ''
    } else 
      var type = data[i].precip_type
    var day = `<div class='daily'>
                 <p class='day-d'> ${dayName} </p>
                 <p class='summary-d'> ${data[i].summary} </p>
                 <p class='precip-d'> Precipitation ${data[i].precip}% </p>
                 <p class='precip-type-d'> ${type} </p>
                 <p class='high-d'> ↑ ${data[i].high}˚ </p>
                 <p class='low-d'> ↓ ${data[i].low}˚ </p>
               </div>`
    daily.push(day)
  };
  dailyForecast.innerHTML = daily.join('');
};

function addFavorite () {
  if (loc.value != '') {
    var cityState = loc.value
    var faveLocRequest = new XMLHttpRequest();
    faveLocRequest.open('POST', 'https://rocky-spire-33194.herokuapp.com/api/v1/favorites');
    faveLocRequest.setRequestHeader('Content-Type', 'application/json');
    faveLocRequest.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
        alert(`${cityState} added to Favorites`);
      };
    };
    var dataObject = { "location": `${cityState}`, "api_key": "a33e6bab-1427-4e23-90c6-f85255305c43" };
    var jsonString = JSON.stringify(dataObject);
    faveLocRequest.send(jsonString)
  }
};

function getFavorites () {
  var favoritesRequest = new XMLHttpRequest();
  favoritesRequest.open('GET', 'https://rocky-spire-33194.herokuapp.com/api/v1/favorites?api_key=a33e6bab-1427-4e23-90c6-f85255305c43'); 
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
    var fave = `<div class='favorite'>
                  <p class='city-f'> ${data[i].id}</p>
                  <p class='summary-f'> ${data[i].attributes.summary} </p>
                  <p class='temp-f'> ${data[i].attributes.temperature}˚ </p>
                  <p class='feels-like-f'> Feels like ${data[i].attributes.feels_like}˚ </p>
                </div>`
    faves.push(fave)
  };
  favorites.innerHTML = faves.join('');
};

window.addEventListener('load', defaultWeather);
weatherButton.addEventListener('click', getWeather);
addFaveButton.addEventListener('click', addFavorite);
favoritesButton.addEventListener('click', getFavorites);