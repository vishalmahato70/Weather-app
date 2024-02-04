const container = document.querySelector('.container');
const inputBox = document.querySelector('.input-box');
const search = document.getElementById('searchBtn')
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity span');
const wind = document.querySelector('.wind span');

const location_not_found = document.querySelector('.location-not-found');

const weather_box = document.querySelector('.weather-box');


async function checkWeather(city){
    const api_key = "4528858125a255b6f9cbe2f50247d206";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_box.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_box.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind.innerHTML = `${weather_data.wind.speed}Km/h`;


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

    }

    console.log(weather_data);
}


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});