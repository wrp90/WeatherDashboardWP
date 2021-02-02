// Weather Dashboard

// Global Variables
var userFormEl = document.querySelector('#user-form');
var citiesSearched = [];



var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityInputEl = document.querySelector('#cityInput');
    var city = cityInputEl.value.trim();
    
    if (city) {
        citiesSearched.unshift(city)
        recentSearched();
        getCityWeather();
        saveSearch();
    }
}

var recentSearched = function() {
    document.getElementById('city1').innerHTML = citiesSearched[0];
    document.getElementById('city2').innerHTML = citiesSearched[1];
    document.getElementById('city3').innerHTML = citiesSearched[2];
    document.getElementById('city4').innerHTML = citiesSearched[3];
    document.getElementById('city5').innerHTML = citiesSearched[4];
}

var saveSearch = function(){
    var cityInputEl = document.querySelector('#cityInput');
    var city = cityInputEl.value.trim();
    localStorage.setItem("Cities", JSON.stringify(city));
};



var getCityWeather = function() {
    var apiKey = "bd3c2a1565ecafc0056ecfa0ed7d9cf7";
    var cityInputEl = document.querySelector("#cityInput")
    var city = cityInputEl.value.trim();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(apiUrl).then(function(response) {
        if (response.ok)
        return response.json();
    }).then(function(data) {
        console.log(data)
        var date = new Date().toLocaleDateString()
        var iconcon = document.querySelector("#icon")
        iconcon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon +"@2x.png";

        document.getElementById("city").innerHTML = data.name + "(" + date + ")";
        document.getElementById("temp").innerHTML = "Temperature: " + data.main.temp + "F";
        document.getElementById("humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
        document.getElementById("wind-speed").innerHTML = "Wind Speed: " + data.wind.speed  + " MPH";
    })
}

    





userFormEl.addEventListener('submit', formSubmitHandler);



