// Weather Dashboard

// Global Variables
var citySearchTerm = document.querySelector('#city-search-term');
var userFormEl = document.querySelector('#user-form');
// var citiesSearched = [];



var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityInputEl = document.querySelector('#cityInput');

    var cityInput1 = document.querySelector('#city1');



    if (cityInputEl.textContent === null) {
        alert("Must type City");
    }
    
    if (cityInput1.textContent === "") {
        document.querySelector('#city1').innerHTML = cityInputEl.value;
        localStorage.setItem("firstCity", cityInputEl.value);
    } 
    // getCity();
}


var getCity = function() {
    var apiKey = "bd3c2a1565ecafc0056ecfa0ed7d9cf7";
    var cityInputEl = document.querySelector("#cityInput")
    var city = cityInputEl.value.trim();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    
    fetch(apiUrl).then(function(response) {
        if (response.ok)
        return response.json();
    }).then(function(data) {
        console.log(data)
    })
}

    





userFormEl.addEventListener('submit', formSubmitHandler);



