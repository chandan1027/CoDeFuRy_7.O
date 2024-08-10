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
const error_message = document.createElement('div');

error_message.style.color = 'red';
error_message.style.marginTop = '10px';
weatherSearch.appendChild(error_message);

showSearchBtn.addEventListener('click', () => {
    weatherSearch.style.display = 'block';
});

async function checkWeather(city) {
    if (city.trim() === "") {
        error_message.innerText = "Please enter a valid city name!";
        location_not_found.style.display = "none";
        weather_body.style.display = "none";
        return;
    }

    const api_key = "2e6239f0acfe196c0702010fccb0a3f4";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const weather_data = await fetch(url).then(response => response.json());

        if (weather_data.cod === '404') {
            error_message.innerText = "";
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            return;
        }

        error_message.innerText = ""; // Clear the error message if the input is valid
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        temperature.innerHTML = `Temperature: ${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = weather_data.weather[0].description;
        humidity.innerHTML = `Humidity: ${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `Wind speed: ${weather_data.wind.speed} km/h`;

        document.body.className = ''; // Clear previous classes
        switch (weather_data.weather[0].main.toLowerCase()) {
            case 'clouds':
                weather_img.src = "../images/cloud.png";
                document.body.classList.add('clouds');
                break;
            case 'clear':
                weather_img.src = "../images/clear.png";
                document.body.classList.add('clear');
                break;
            case 'rain':
                weather_img.src = "../images/rain.png";
                document.body.classList.add('rain');
                break;
            case 'mist':
                weather_img.src = "../images/mist.png";
                document.body.classList.add('mist');
                break;
            case 'snow':
                weather_img.src = "../images/snow.png";
                document.body.classList.add('snow');
                break;
            default:
                weather_img.src = "../images/404.png";
                document.body.classList.add('p404');
                break;
        }

    } catch (error) {
        console.error("Error fetching the weather data:", error);
        error_message.innerText = "Unable to retrieve weather data. Please try again later.";
        location_not_found.style.display = "none";
        weather_body.style.display = "none";
    }
}

searchbtn.addEventListener('click', () => {
    checkWeather(inputbox.value);
});