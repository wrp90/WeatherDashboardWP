// Weather Dashboard

// Global Variables
var resultsContainerEl = document.querySelector("#resuts-container");
var citySearchTerm = document.querySelector('#city-search-term');
var userFormEl = document.querySelector('#user-form');

// var citySearch = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&appid=" + apiKey;

var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityInputEl = document.querySelector('#city');

    var citySearched = cityInputEl.value.trim();

    if (citySearched) {
        getCity(citySearched);
    }
}

var getCity = function() {
    var apiKey = "bd3c2a1565ecafc0056ecfa0ed7d9cf7";
    var cityInputEl = document.querySelector('#city');
    // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl + "&appid=" + apiKey;
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + apiKey;

    fetch(apiUrl).then(function(response) {
        if (response.ok)
        return response.json();
    }).then(responseData => {
        console.log(responseData)
    })
}


userFormEl.addEventListener('submit', formSubmitHandler);



