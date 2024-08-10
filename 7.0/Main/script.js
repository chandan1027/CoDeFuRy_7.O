const inputbox = document.querySelector('.input-box');
const searchbtn = document.querySelector('#searchbtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('#humidity');
const wind_speed = document.querySelector('#wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const showSearchBtn = document.querySelector('#show-search-btn');
const weatherSearch = document.querySelector('#weather-search');
const currLocation = document.querySelector('#your-weather');

function displayError(message) {
    location_not_found.innerText = message;
    location_not_found.style.display = "block";
    weather_body.style.display = "none";
}


function displayWeather(data) {
    temperature.innerText = `Temperature: ${Math.round(data.main.temp - 273.15)}°C`;
    description.innerText = data.weather[0].description;
    humidity.innerText = `Humidity: ${data.main.humidity}%`;
    wind_speed.innerText = `Wind Speed: ${data.wind.speed} km/h`;
    weather_img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weather_body.style.display = "block";
    location_not_found.style.display = "none";
}


showSearchBtn.addEventListener('click', () => {
    weatherSearch.style.display = weatherSearch.style.display === 'none' ? 'block' : 'none';

   
    weather_body.style.display = "none";
    location_not_found.style.display = "none";
});


async function checkWeather(city) {
    const api_key = "2e6239f0acfe196c0702010fccb0a3f4";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === '404') {
            displayError("City not found. Please enter a valid city name.");
        } else {
            displayWeather(weather_data);
        }
    } catch (error) {
        console.error("Error fetching the weather data:", error);
        displayError("Unable to retrieve weather data. Please try again later.");
    }
}


searchbtn.addEventListener('click', () => {
    const city = inputbox.value.trim();
    if (city === "") {
        displayError("Please enter a valid city name!");
    } else {
        checkWeather(city);
    }
});


inputbox.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        const city = inputbox.value.trim();
        if (city === "") {
            displayError("Please enter a valid city name!");
        } else {
            checkWeather(city);
        }
    }
});


async function getData(lat, long) {
    const api_key = "2e6239f0acfe196c0702010fccb0a3f4"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();
        console.log('Weather data:', weather_data); 
        displayWeather(weather_data);
    } catch (error) {
        console.error("Error fetching the weather data:", error);
        displayError("Unable to retrieve weather data. Please try again later.");
    }
}

function getLocation(position) {
    const { latitude, longitude } = position.coords;
    console.log('Location coordinates:', latitude, longitude); 
    getData(latitude, longitude);
}

function failedToGet() {
    displayError("Failed to retrieve your location. Please try again later.");
}

currLocation.addEventListener('click', () => {
   
    weatherSearch.style.display = 'none';
    location_not_found.style.display = "none";

    
    navigator.geolocation.getCurrentPosition(getLocation, failedToGet);
});
