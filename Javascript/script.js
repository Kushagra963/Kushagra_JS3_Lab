document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    const weatherResult = document.getElementById('weather-result');
    const cityNameElem = document.getElementById('city-name');
    const temperatureElem = document.getElementById('temperature');
    const descriptionElem = document.getElementById('description');
    const humidityElem = document.getElementById('humidity');
    const windSpeedElem = document.getElementById('wind-speed');

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    async function fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                displayWeather(data);
            } else {
                alert('City not found. Please enter a valid city.');
            }
        } catch (error) {
            console.error('Error fetching the weather data:', error);
        }
    }

    function displayWeather(data) {
        const { name, main, weather, wind } = data;
        cityNameElem.textContent = name;
        temperatureElem.textContent = `Temperature: ${main.temp}°C`;
        descriptionElem.textContent = `Weather: ${weather[0].description}`;
        humidityElem.textContent = `Humidity: ${main.humidity}%`;
        windSpeedElem.textContent = `Wind Speed: ${wind.speed} m/s`;
    }
});
