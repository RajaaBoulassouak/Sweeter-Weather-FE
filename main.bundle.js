/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	var weatherButton = document.querySelector('.weather-btn');
	var loc = document.querySelector('.input-field');
	var current1 = document.querySelector('.box-1-info-1');
	var current2 = document.querySelector('.box-1-info-2');
	var current3 = document.querySelector('.current-box-2');
	var hourlyForecast = document.querySelector('.hourly-forecast');
	var dailyForecast = document.querySelector('.daily-forecast');
	var addFaveButton = document.querySelector('.add-favorite-btn');
	var favoritesButton = document.querySelector('.favorites-btn');
	var favorites = document.querySelector('.favorites');

	function getWeather() {
	  if (loc.value === '') {
	    var cityState = 'Denver, CO';
	  } else var cityState = loc.value;
	  var weatherRequest = new XMLHttpRequest();
	  weatherRequest.open('GET', 'http://localhost:3000/api/v1/forecast?location=' + cityState);
	  weatherRequest.setRequestHeader('Content-Type', 'application/json');
	  weatherRequest.onload = function () {
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

	function defaultWeather() {
	  getWeather();
	}

	function currentWeatherHtml1(data) {
	  var date = new Date(data.time);
	  var hour = date.getHours();
	  var ampm = hour >= 12 ? 'PM' : 'AM';
	  var time = hour + ':' + date.getMinutes() + ' ' + ampm + ', ' + (date.getUTCMonth() + 1) + '/' + date.getUTCDate();

	  var currently1 = '<p class=\'summary-c1\'> ' + data.summary + ' </p>\n                    <p class=\'temp-c1\'> ' + data.temperature + '\u02DA </p>';
	  current1.innerHTML = currently1;

	  var currently2 = '<p class=\'city-c1\'> ' + data.location + ' </p>\n                    <p class=\'conutry-c1\'> United States </p>\n                    <p class=\'time-c1\'> ' + time + ' </p>';
	  current2.innerHTML = currently2;
	};

	function currentWeatherHtml2(data) {
	  var currently3 = '<p class=\'today-c2\'> ' + data.today + ' </p>\n                    <p class=\'feels-like-c2\'> Feels Like: ' + data.feels_like + '\u02DA </p>\n                    <p class=\'humidity-c2\'> Humidity: ' + data.humidity + '% </p>\n                    <p class=\'visibility-c2\'> Visibility: ' + data.visibility + ' miles </p>\n                    <p class=\'uv_index-c2\'> UV_Index: ' + data.uv_index + ' </p>';
	  current3.innerHTML = currently3;
	};

	function hourlyForecastHtml(data) {
	  var hourly = [];
	  var i;
	  for (i = 0; i < data.length; i++) {
	    var date = new Date(data[i].time);
	    var hour = date.getHours();
	    var ampm = hour >= 12 ? 'PM' : 'AM';
	    var hour = '<div class=\'hourly\'>\n                  <p class=\'hour-h\'> ' + hour + ' ' + ampm + ' </p>\n                  <p class=\'temp-h\'> ' + data[i].temperature + '\u02DA <p>\n                </div>';

	    hourly.push(hour);
	  };
	  hourlyForecast.innerHTML = hourly.join('');
	};

	function dailyForecastHtml(data) {
	  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	  var daily = [];
	  var i;
	  for (i = 0; i < data.length; i++) {
	    var date = new Date(data[i].time);
	    var dayName = days[date.getDay()];
	    if (data[i].precip_type === null) {
	      var type = '';
	    } else var type = data[i].precip_type;
	    var day = '<div class=\'daily\'>\n                 <p class=\'day-d\'> ' + dayName + ' </p>\n                 <p class=\'summary-d\'> ' + data[i].summary + ' </p>\n                 <p class=\'precip-d\'> Precipitation ' + data[i].precip + '% </p>\n                 <p class=\'precip-type-d\'> ' + type + ' </p>\n                 <p class=\'high-d\'> \u2191 ' + data[i].high + '\u02DA </p>\n                 <p class=\'low-d\'> \u2193 ' + data[i].low + '\u02DA </p>\n               </div>';
	    daily.push(day);
	  };
	  dailyForecast.innerHTML = daily.join('');
	};

	function addFavorite() {
	  if (loc.value != '') {
	    var cityState = loc.value;
	    var faveLocRequest = new XMLHttpRequest();
	    faveLocRequest.open('POST', 'http://localhost:3000/api/v1/favorites');
	    faveLocRequest.setRequestHeader('Content-Type', 'application/json');
	    faveLocRequest.onreadystatechange = function () {
	      if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
	        alert(cityState + ' added to Favorites');
	      };
	    };
	    var dataObject = { "location": '' + cityState, "api_key": "2a5cfce9-a913-4ea2-b8c9-5748795200e9" };
	    var jsonString = JSON.stringify(dataObject);
	    faveLocRequest.send(jsonString);
	  }
	};

	function getFavorites() {
	  var favoritesRequest = new XMLHttpRequest();
	  favoritesRequest.open('GET', 'http://localhost:3000/api/v1/favorites?api_key=2a5cfce9-a913-4ea2-b8c9-5748795200e9');
	  favoritesRequest.onload = function () {
	    var response = JSON.parse(favoritesRequest.responseText);
	    var favorites = Object.values(response['data']);
	    favoritesHtml(favorites);
	  };
	  favoritesRequest.send();
	};

	function favoritesHtml(data) {
	  console.log(data);
	  var faves = [];
	  var i;
	  for (i = 0; i < data.length; i++) {
	    var fave = '<div class=\'favorite\'>\n                  <div class=\'city-f\'> ' + data[i].id + '</div>\n                  <div class=\'time-f\'> Local Time: ' + data[i].attributes.time + ' </div>\n                  <div class=\'icon-f\'> ' + data[i].attributes.icon + ' </div>\n                  <div class=\'summary-f\'> ' + data[i].attributes.summary + ' </div>\n                  <div class=\'temp-f\'> ' + data[i].attributes.temperature + '\u02DA </div>\n                  <div class=\'feels-like-f\'> Feels like ' + data[i].attributes.feels_like + '\u02DA </div></br>\n                </div>';
	    faves.push(fave);
	  };
	  favorites.innerHTML = faves.join('');
	};

	window.addEventListener('load', defaultWeather);
	weatherButton.addEventListener('click', getWeather);
	addFaveButton.addEventListener('click', addFavorite);
	favoritesButton.addEventListener('click', getFavorites);

/***/ })
/******/ ]);