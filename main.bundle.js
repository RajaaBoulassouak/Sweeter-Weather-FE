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

	var forecastButton = document.querySelector('.forecast');
	var loc = document.querySelector('.location-input');
	var currentForecast = document.querySelector('.current-forecast');
	var hourlyForecast = document.querySelector('.hourly-forecast');
	var dailyForecast = document.querySelector('.daily-forecast');
	var addFaveButton = document.querySelector('.add-favorite');
	var favoritesButton = document.querySelector('.favorites');

	function getForecast() {
	  var cityState = loc.value;
	  var forecastRequest = new XMLHttpRequest();
	  forecastRequest.open('GET', 'http://localhost:3000/api/v1/forecast?location=' + cityState);
	  forecastRequest.onload = function () {
	    var response = JSON.parse(forecastRequest.responseText);
	    var data = Object.values(response['data']);
	    var forecast = Object.values(data[2]);
	    currentForecastHtml(forecast[0]);
	    hourlyForecastHtml(forecast[1]);
	    dailyForecastHtml(forecast[2]);
	  };
	  forecastRequest.send();
	};

	function getFavorites() {
	  var favoritesRequest = new XMLHttpRequest();
	  favoritesRequest.open('GET', 'http://localhost:3000/api/v1/favorites');
	  favoritesRequest.setRequestHeader('Content-Type', 'application/json');
	  favoritesRequest.onreadystatechange = function () {
	    var response = favoritesRequest.responseText;
	    var data = response['data'];
	    console.log(data);
	  };
	  var keyObject = { "api_key": "74b4fe88-3750-480d-9839-2cf689394ae5" };
	  var jsonString = JSON.stringify(keyObject);
	  favoritesRequest.send(jsonString);
	};

	function addFavorite() {
	  var cityState = loc.value;
	  var faveLocRequest = new XMLHttpRequest();
	  faveLocRequest.open('POST', 'http://localhost:3000/api/v1/favorites');
	  faveLocRequest.setRequestHeader('Content-Type', 'application/json');
	  faveLocRequest.onreadystatechange = function () {
	    if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
	      alert(cityState + ' added to Favorites');
	    };
	  };
	  var dataObject = { "location": '' + cityState, "api_key": "74b4fe88-3750-480d-9839-2cf689394ae5" };
	  var jsonString = JSON.stringify(dataObject);
	  faveLocRequest.send(jsonString);
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
	  var htmlString3 = '';
	  var i;
	  for (i = 0; i < data.length; i++) {
	    htmlString3 += "<p>" + Object.values(data[i]) + ".</p>";
	  }
	  dailyForecast.insertAdjacentHTML('beforeend', htmlString3);
	};

	forecastButton.addEventListener('click', getForecast);
	addFaveButton.addEventListener('click', addFavorite);
	favoritesButton.addEventListener('click', getFavorites);

/***/ })
/******/ ]);