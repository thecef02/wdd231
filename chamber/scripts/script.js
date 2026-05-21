/***************** Navigation ******************/
const navButton = document.querySelector("#nav-button");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");
const header = document.querySelector("header");   

navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    nav.classList.toggle("show");
    header.classList.toggle("open");
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navButton.classList.remove("show");
        nav.classList.remove("show");
        header.classList.remove("open");
        navLinks.forEach((navLink) => {
            navLink.parentElement.classList.remove("current");
        });
        link.parentElement.classList.add("current");
    });
});

/***************** End Navigation ******************/

/******************** footer ***********************/

let yr = new Date().getFullYear();
document.getElementById("currentyear").textContent =
    `${yr} Cristian Fernandez | Utah, USA`;

const d = new Date(document.lastModified);
document.getElementById("lastModified").textContent =
    `Last Modify ${d.toLocaleString("en-US", { hour12: false }).replace(",", "")}`;

/******************** End footer ***********************/



/******************** middle-content *********************/


const forecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=40.376&lon=-111.795&appid=a1cdf4d637caf46a9288686067728afa";

const currentUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=40.376&lon=-111.795&units=imperial&appid=a1cdf4d637caf46a9288686067728afa";


async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
        return null; // el caller puede hacer: if (data) { ... }
    }
}

async function buildForecastWeatherCard(url) {
    const data = await apiFetch(url);
    if (!data) return;
    const forecastCardsHolder = document.querySelector(".forecast-cards-holder");
    data.list.forEach((forecast, forecastIndex) => {
        if (forecastIndex % 16 === 7 || forecastIndex === 7) {
            const card = document.createElement("div");
            card.classList.add("forecast-cards");
            card.innerHTML = card.innerHTML + `
            <p>${new Date(forecast.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}</p>
            <img src="https://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="Weather icon" width="48" height="48">
            <p>${Math.round(forecast.main.temp)}°F</p>
        `;
        forecastCardsHolder.appendChild(card);
    }
});
}

async function buildCurrentWeatherCard(url) {
    const data = await apiFetch(url);
    if (!data) return;
    const currentCardsHolder = document.querySelector(".current-cards-holder");
    const holderLeft = document.createElement("div");
    holderLeft.classList.add("current-card-left");
    const holderRight = document.createElement("div");
    holderRight.classList.add("current-card-right");
    const currentTemp = document.createElement("p");
    currentTemp.id = "current-temp";

    console.log(currentTemp.textContent);
    currentTemp.textContent = `${Math.round(data.main.temp)}°F`;
    const weatherIcon = document.createElement("img");
    weatherIcon.id = "weather-icon";
    weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.width = 64;
    weatherIcon.height = 64;
    weatherIcon.alt = data.weather[0].description;
    const captionDesc = document.createElement("figcaption");
    captionDesc.textContent = data.weather[0].description;
    const maxTemp = document.createElement("p");
    maxTemp.id = "max-temp";
    maxTemp.textContent = `Max:${Math.round(data.main.temp_max)}°F`;
    const minTemp = document.createElement("p");
    minTemp.id = "min-temp";
    minTemp.textContent = `Min:${Math.round(data.main.temp_min)}°F`;
    const humidity = document.createElement("p");
    humidity.id = "humidity";
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    sunrise = document.createElement("p");
    sunrise.id = "sunrise";
    sunrise.textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}`;
    const sunset = document.createElement("p");
    sunset.id = "sunset";
    sunset.textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}`;

    holderLeft.appendChild(weatherIcon);
    holderRight.appendChild(currentTemp);
    holderRight.appendChild(captionDesc);
    holderRight.appendChild(maxTemp);
    holderRight.appendChild(minTemp);
    holderRight.appendChild(humidity);
    holderRight.appendChild(sunrise);
    holderRight.appendChild(sunset);
    currentCardsHolder.appendChild(holderLeft);
    currentCardsHolder.appendChild(holderRight);

}



buildForecastWeatherCard(forecastUrl);
buildCurrentWeatherCard(currentUrl);































