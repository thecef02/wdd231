const url =
    "https://developer.nps.gov/api/v1/parks?limit=50&q=UT&api_key=tdw9isKetJrvP6elZG8etg4G81ZuBi30JtwcfUPH";

const forecastUrlStr = "https://api.openweathermap.org/data/2.5/forecast?lat="
const forecastUrlMid = "&lon=";
const forecastUrlEnd = "&units=imperial&appid=a1cdf4d637caf46a9288686067728afa";
const currentUrlStr = "https://api.openweathermap.org/data/2.5/weather?lat=" 
const currentUrlMid = "&lon=";
const currentUrlEnd = "&units=imperial&appid=a1cdf4d637caf46a9288686067728afa"



async function apiFetch(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching API data:", error);
        throw error;
    }
}  

async function buildCurrentWeatherCard(url, parkId) {
    const data = await apiFetch(url);
    console.log(data);
    if (!data) return;
    const currentCardsHolder = document.createElement("div");
    currentCardsHolder.classList.add("current-cards-holder");
    const currentTemp = document.createElement("p");
    currentTemp.id = `current-temp-${parkId}`;
    const current = document.createElement("p");
    current.textContent = "Current";
    const weatherIcon = document.createElement("img");
    weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png `;
    weatherIcon.alt = "Weather icon";
    weatherIcon.width = 64;
    weatherIcon.height = 64;
    currentTemp.textContent = `${Math.round(data.main.temp)}Â°F`;
    currentCardsHolder.appendChild(current);
    currentCardsHolder.appendChild(weatherIcon);
    currentCardsHolder.appendChild(currentTemp);
    return currentCardsHolder;
}

async function buildForecastWeatherCard(url) {
    const data = await apiFetch(url);
    if (!data) return;
    const forecastCardsHolder = document.createElement("div");
    forecastCardsHolder.classList.add("forecast-cards-holder");
    data.list.forEach((forecast, forecastIndex) => {
        // API returns every 3h â†’ 8 entries/day. Index 4 = ~noon each day.
        if (forecastIndex % 16 === 4) {
            const card = document.createElement("div");
            card.classList.add("forecast-cards");
            card.innerHTML = `
                <p>${new Date(forecast.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}</p>
                <img src="https://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="Weather icon" width="48" height="48">
                <p>${Math.round(forecast.main.temp)}Â°F</p>
            `;
            forecastCardsHolder.appendChild(card);
        }
    });
    return forecastCardsHolder;
}


async function buildWeatherInfo(parkData) {
    const weatherInfoDiv = document.createElement("div");
    weatherInfoDiv.classList.add("weather-info");
    weatherInfoDiv.id = `weather-${parkData.id}`;
    const weatherCardElement = await buildCurrentWeatherCard(
        currentUrlStr +
            parkData.latitude +
            currentUrlMid +
            parkData.longitude +
            currentUrlEnd, parkData.id
    );
    if (weatherCardElement) {
        weatherInfoDiv.appendChild(weatherCardElement);
    }

    const forecastCardElement = await buildForecastWeatherCard(
        forecastUrlStr +
        parkData.latitude + 
        forecastUrlMid +
        parkData.longitude +
        forecastUrlEnd
    );
    if (forecastCardElement) {
        weatherInfoDiv.appendChild(forecastCardElement);
    }
    return weatherInfoDiv;
}




async function displayParks() {
    try {
        const data = await apiFetch(url);
        const parksContainer = document.querySelector(".parks-container");
        const data2 = data.data.filter(park => park.states.includes("UT"));
        console.log(data2.length);// Verificar cuÃ¡ntos parques se han filtrado
        for (const park of data2) {
            const weatherInfo = await buildWeatherInfo(park);
            // alert(weatherInfo.innerHTML); // Verificar que weatherInfo se estÃ¡ creando correctamente
            
            const parkCard = document.createElement("div");
            parkCard.classList.add("park-card");
            parkCard.innerHTML = `
            <img src="${park.images[0]?.url || "placeholder.jpg"}" alt="${park.fullName}">
            <h2>${park.fullName}</h2>
            <p>${park.description}</p>
            <div class="card-buttons">
            <p><strong></strong> ${park.addresses[0]?.city || "N/A"} <strong>, </strong> ${park.states}</p>
            <img class="set-as-favorite-park" data-park-id="${park.id}" src="images/heart-unselected.svg" width="24" height="24" alt="Set as Favorite">
            <a href="${park.url}" target="_blank">Learn More</a>
            <button class="park-info" data-park-id="${park.id}" data-modal="modal-park-info" aria-haspopup="dialog">Park Info</button>
            </div>
            <div class="weather" > 
            ${weatherInfo.outerHTML}
            </div>
            `;

            // get list from localStorage
            if (isFavorite(park.id)) {
                const heart = parkCard.querySelector(".set-as-favorite-park");
                heart.src = "images/heart-selected.svg";
                heart.alt = "Remove from Favorites";
            }

            parksContainer.appendChild(parkCard);
        }
    } catch (error) {
        console.error("Error displaying parks:", error);
    }
}


function toggleFavorite(parkId) {
    const favs = JSON.parse(localStorage.getItem("favParks") || "[]");
    const idx = favs.indexOf(parkId);
    const isNowFav = idx === -1;
    if (isNowFav) {
        favs.push(parkId);
    } else {
        favs.splice(idx, 1);
    }
    localStorage.setItem("favParks", JSON.stringify(favs));
    return isNowFav;
}

function isFavorite(parkId) {
    const favs = JSON.parse(localStorage.getItem("favParks") || "[]");
    return favs.includes(parkId);
}

displayParks();


document.querySelector(".parks-container").addEventListener("click", (e) => {
    const btn = e.target.closest(".park-info");
    if (btn) {
        document.getElementById(btn.dataset.modal).showModal();
    }
    const heart = e.target.closest(".set-as-favorite-park");
    if (heart) {
        const parkId = heart.dataset.parkId;
        const isNowFav = toggleFavorite(parkId);
        heart.src = `images/${isNowFav ? "heart-selected" : "heart-unselected"}.svg`;
        heart.alt = isNowFav ? "Remove from Favorites" : "Set as Favorite";
    }
});

document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", () => {
        btn.closest("dialog").close();
    });
});

document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close();
    });
});

// fullName en la parte superior, imagen del tamaÃ±o de la carta descripcion, state, city, phoneNumber(el primero), email, boton para mas info , weather info en la parte de abajo,
// usando....

// info en una modal: entrance fee, passes, directioninfo, url, operation hrs, lista de actividades
