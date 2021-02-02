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
        getUvIndex();
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
        // console.log(data)
        var date = new Date().toLocaleDateString()
        var iconcon = document.querySelector("#icon")
        iconcon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon +"@2x.png";

        document.getElementById("city").innerHTML = data.name + "(" + date + ")";
        document.getElementById("temp").innerHTML = "Temperature: " + data.main.temp + "F";
        document.getElementById("humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
        document.getElementById("wind-speed").innerHTML = "Wind Speed: " + data.wind.speed  + " MPH";


        var lat = data.coord.lat;
        var lon = data.coord.lon;
    
        var apiKey = "bd3c2a1565ecafc0056ecfa0ed7d9cf7";
        var uvapiURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    
        fetch(uvapiURL).then(function(response) {
            if (response.ok)
            return response.json();
        }).then(function(data) {
            uvIndex = document.getElementById("uvcolor");

            uvIndex.innerHTML = "UV: " + data.value;

            if (data.value <= 2) {
                uvIndex.classList.add("low");
            } else if (data.value > 2 || data.value <= 5) {
                uvIndex.classList.add("moderate");
            } else if (data.value > 5 || data.value <= 7) {
                uvIndex.classList.add("high");
            } else if (data.value > 7 || data.value <= 10) {
                uvIndex.classList.add("veryhigh");
            } else if (data.value > 10) {
                uvIndex.classList.add("extreme");
            }

        })
    })
}



var getUvIndex = function(lat, lon) {

    
}


        








userFormEl.addEventListener('submit', formSubmitHandler);



