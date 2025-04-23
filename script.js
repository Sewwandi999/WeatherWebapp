const API_KEY = 'd65b6f7e573f0ae745b4b8917cd6ba01'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

let lastCityClicked = null; 

async function getWeather(city) {
    const weatherDiv = document.getElementById('weather-info');

    
    if (lastCityClicked === city && !weatherDiv.classList.contains('hidden')) {
        weatherDiv.classList.add('hidden');
        lastCityClicked = null; 
        return;
    }

    
    lastCityClicked = city;

   
    const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`; 
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();

        
        displayWeather(data, city);
    } catch (error) {
        alert(`Error fetching weather data: ${error.message}`);
    }
}

function displayWeather(data, city) {
    const weatherDiv = document.getElementById('weather-info');
    const temperature = data.main.temp;
    const timezoneOffset = data.timezone; 

    
    const localTime = getLocalTime(timezoneOffset);

    
    let weatherIcon = '';
    if (data.weather[0].description.includes('rain')) {
        weatherIcon = `<img src="images/rainy.png" alt="Weather Icon" class="weather-icon">`;
    } else if (temperature < 20) {
        weatherIcon = `<img src="images/cold.png" alt="Weather Icon" class="weather-icon">`;
    } else if (temperature > 27) {
        weatherIcon = `<img src="images/hot.png" alt="Weather Icon" class="weather-icon">`;
    } else {
        weatherIcon = `<img src="images/moderate.png" alt="Weather Icon" class="weather-icon">`;
    }

    
    weatherDiv.innerHTML = `
        <h2>Weather in ${city}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Current Time: ${localTime}</p>
        ${weatherIcon}
        <p>Condition: ${data.weather[0].description}</p>
    `;

    
    weatherDiv.classList.remove('hidden');
}


function getLocalTime(timezoneOffset) {
    const offsetInMs = timezoneOffset * 1000;
    const utcTime = new Date().getTime();
    const localTime = new Date(utcTime + offsetInMs);

    const hours = localTime.getUTCHours();
    const minutes = localTime.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    
    return formattedTime;
}
