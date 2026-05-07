const container = document.querySelector('.container');
const inputBox = document.querySelector('.input-box');
const search = document.getElementById('searchBtn');

const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity span');
const wind = document.querySelector('.wind span');

const location_not_found = document.querySelector('.location-not-found');

async function checkWeather(city) {

    if(city === ""){
        alert("Please enter city name");
        return;
    }

    const api_key = "4528858125a255b6f9cbe2f50247d206";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(url).then(response => response.json());

    console.log(weather_data);

    if(weather_data.cod == "404"){

        location_not_found.style.display = "flex";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";

        return;
    }

    location_not_found.style.display = "none";
    weatherBox.style.display = "block";
    weatherDetails.style.display = "flex";

    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}<span>°C</span>`;

    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;

    wind.innerHTML = `${weather_data.wind.speed} Km/h`;



    switch(weather_data.weather[0].main){

        case 'Clouds':
            image.src = "cloud.png";
            break;

        case 'Clear':
            image.src = "sun.png";
            break;

        case 'Rain':
            image.src = "rain.png";
            break;

        case 'Mist':
            image.src = "mist.png";
            break;

        case 'Snow':
            image.src = "snow.png";
            break;

        case 'Haze':
            image.src = "mist.png";
            break;

        default:
            image.src = "cloud.png";
    }
}

search.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
