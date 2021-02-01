// Weather Dashboard

// Global Variables
var resultsContainerEl = document.querySelector("#resuts-container");
var citySearchTerm = document.querySelector('#city-search-term');
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');

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
    var city = cityInputEl.value.trim();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    localStorage.setItem("city", city)
    
    fetch(apiUrl).then(function(response) {
        if (response.ok)
        return response.json();
    }).then(function(data) {
        console.log(data)
    })
}

var displayEl = function(data) {

}



userFormEl.addEventListener('submit', formSubmitHandler);



