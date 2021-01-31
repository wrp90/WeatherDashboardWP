// Weather Dashboard

// Global Variables
var resultsContainerEl = document.querySelector("#resuts-container");
var citySearchTerm = document.querySelector('#city-search-term');
var userFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var apiKey = "bd3c2a1565ecafc0056ecfa0ed7d9cf7";
var citySearch = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

var formSubmitHandler = function(event) {
    event.preventDefault();

    var citySearched = cityInputEl.value.trim();

    if (citySearched) {
        getCity(citySearched);
    }
}

var getCity = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + apiKey;

    fetch(apiUrl).then(function(response) {
        if (response.ok)
        response.json().then(function() {
            resultsContainerEl.textContent = response;
        })
        console.log(response)
    })

        
}


userFormEl.addEventListener('submit', formSubmitHandler);



