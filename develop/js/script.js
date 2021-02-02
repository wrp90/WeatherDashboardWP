// Weather Dashboard

// Global Variables
var citySearchTerm = document.querySelector('#city-search-term');
var userFormEl = document.querySelector('#user-form');
// var citiesSearched = [];



var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityInputEl = document.querySelector('#cityInput');

    var cityInput1 = document.querySelector('#city1');
    var cityInput2 = document.querySelector('#city2');
    var cityInput3 = document.querySelector('#city3');
    var cityInput4 = document.querySelector('#city4');
    var cityInput5 = document.querySelector('#city5');
    
    if (cityInput1.textContent === "") {
        document.getElementById('city1').innerHTML = cityInputEl.value;
        localStorage.setItem("firstCity", cityInputEl.value);
    } else if (cityInput2.textContent === "") {
        document.getElementById('city2').innerHTML = cityInputEl.value;
        localStorage.setItem("secondCity", cityInputEl.value);
    } else if (cityInput3.textContent === "") {
        document.getElementById('city3').innerHTML = cityInputEl.value;
        localStorage.setItem("thirdCity", cityInputEl.value);
    } else if (cityInput4.textContent === "") {
        document.getElementById('city4').innerHTML = cityInputEl.value;
        localStorage.setItem("fourthCity", cityInputEl.value);
    } else if (cityInput5.textContent === "") {
        document.getElementById('city5').innerHTML = cityInputEl.value;
        localStorage.setItem("fifthCity", cityInputEl.value);
    }
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



