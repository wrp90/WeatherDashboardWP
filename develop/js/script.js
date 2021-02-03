// Weather Dashboard

// Global Variables
var userFormEl = document.querySelector('#user-form');
var citiesSearched = [];



var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityInputEl = document.querySelector('#cityInput');
    var cityName = cityInputEl.value.trim();
    
    if (cityName) {
        citiesSearched.unshift(cityName)
        recentSearched();
        getCityWeather(cityName);
        saveSearch();
    }
}

// for each citySearch
// -- listen for click on city[i]
// -- -- on click call getCityWeather(name of button)




var recentSearched = function() {
    document.getElementById('city1').innerHTML = citiesSearched[0] || '';
    document.getElementById('city2').innerHTML = citiesSearched[1] || '';
    document.getElementById('city3').innerHTML = citiesSearched[2] || '';
    document.getElementById('city4').innerHTML = citiesSearched[3] || '';
    document.getElementById('city5').innerHTML = citiesSearched[4] || '';
}

var saveSearch = function(){
    var cityInputEl = document.querySelector('#cityInput');
    var city = cityInputEl.value.trim();
    localStorage.setItem("Cities", JSON.stringify(city));
};



var getCityWeather = function(city) {
    var apiKey = "bd3c2a1565ecafc0056ecfa0ed7d9cf7";
    var cityInputEl = document.querySelector("#cityInput")
    
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(apiUrl).then(function(response) {
        if (response.ok)
        return response.json();
    }).then(function(data) {
        var date = new Date().toLocaleDateString();
        var icon = document.querySelector("#icon");
        icon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

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
        var daycount = 1;
        var forcastApiURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city +"&units=imperial&appid=" + apiKey;
        fetch(forcastApiURL).then(function(response) {
            if (response.ok)
            return response.json();
        }).then(function(data) {
                console.log(data)
                for (var i = 4; i < 40; i = i+8) {
                    var icon = document.querySelector("#day-icon" + daycount);
                    icon.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
                    document.getElementById("date" + daycount).innerHTML = data.list[i].dt_txt.substring(0,10);
                    document.getElementById("day-temp" + daycount).innerHTML = "Temp: " + data.list[i].main.temp; 
                    document.getElementById("day-humidity" + daycount).innerHTML = "Humidity: " + data.list[i].main.humidity;
                    // increment day
                    daycount = daycount + 1;
                }
        })
    })
}

userFormEl.addEventListener('submit', formSubmitHandler);



