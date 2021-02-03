// Weather Dashboard

// Global Variables
var userFormEl = document.querySelector('#user-form');
var cityList = document.getElementById("city-list");
var citiesSearched = [];


//handler to take in search input and call the correct functions
//also saves the searched city into var citiesSearched for search history
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

//handles the clicks in the searched cities list
var searchHistoryHandler = function(event) {
    var cityName = event.target.textContent;
    getCityWeather(cityName);
}



//recent searched section.  Takes from the Array citiesSearched that's made from citiesSearched.unshift(cityName) (17)
var recentSearched = function() {
    document.getElementById('city1').innerHTML = citiesSearched[0] || '';
    document.getElementById('city2').innerHTML = citiesSearched[1] || '';
    document.getElementById('city3').innerHTML = citiesSearched[2] || '';
    document.getElementById('city4').innerHTML = citiesSearched[3] || '';
    document.getElementById('city5').innerHTML = citiesSearched[4] || '';
}

//saves the last search and stores it to local storage
var saveSearch = function(){
    var cityInputEl = document.querySelector('#cityInput');
    var city = cityInputEl.value.trim();
    localStorage.setItem("Cities", JSON.stringify(city));
};


//gets the city weather with 3 fetches for weather, uv index and 5 day forcast. 
var getCityWeather = function(city) {
    var fivedayShow = document.getElementById("5dayForcast")
    fivedayShow.style.removeProperty("display");
    //fetch request for current weather
    var apiKey = "bd3c2a1565ecafc0056ecfa0ed7d9cf7";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(apiUrl).then(function(response) {
        if (response.ok)
        return response.json();
    }).then(function(data) {
        var date = new Date().toLocaleDateString();//current date
        var icon = document.querySelector("#icon");//icon
        icon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";//icon source
        //adding parts of the data to the HTML
        document.getElementById("city").innerHTML = data.name + "(" + date + ")";
        document.getElementById("temp").innerHTML = "Temperature: " + data.main.temp + "F";
        document.getElementById("humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
        document.getElementById("wind-speed").innerHTML = "Wind Speed: " + data.wind.speed  + " MPH";

        //fetch request for the UV-index
        //vars for the uvapiURL
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
            //if and else if to select the proper uv color
            if (data.value <= 3) {
                uvIndex.classList.add("favorable");
            } else if (data.value > 3 || data.value <= 6) {
                uvIndex.classList.add("moderate");
            } else if (data.value > 6) {
                uvIndex.classList.add("extreme");
            // } else if (data.value > 7 || data.value <= 10) {
            //     uvIndex.classList.add("veryhigh");
            // } else if (data.value > 10) {
            //     uvIndex.classList.add("extreme");
            }

        })

        //5 day forcast fetch request using a for loop to loop through the data.list from the fetch data
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

//event listener for search button
userFormEl.addEventListener('submit', formSubmitHandler);
//event listener for the searched city list
cityList.addEventListener("click", searchHistoryHandler)


