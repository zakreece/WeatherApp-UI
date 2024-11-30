// script.js
const apiKey = "d6d051c3153b3cafbc3ca10311f85a55"; // Replace with your OpenWeatherMap API key

const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const weatherIcon = document.getElementById("weatherIcon");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");

searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            alert("City not found. Please try again.");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Unable to fetch data. Please try later.");
    }
}

function displayWeather(data) {
    const { name, main, weather, wind: windData } = data;

    // Update UI with weather data
    cityName.textContent = name;
    temperature.textContent = `${main.temp}°C`;
    weatherDescription.textContent = weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;
    humidity.textContent = `${main.humidity}%`;
    wind.textContent = `${windData.speed} km/h`;
    pressure.textContent = `${main.pressure} hPa`;

    // Show weather card
    weatherCard.classList.remove("d-none");
}
