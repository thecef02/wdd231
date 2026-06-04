const url =
    "https://developer.nps.gov/api/v1/parks?limit=50&q=UT&api_key=tdw9isKetJrvP6elZG8etg4G81ZuBi30JtwcfUPH";

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

async function displayParks() {
    try {
        const data = await apiFetch(url);
        const parksContainer = document.querySelector(".parks-container");
        data.data.forEach(park => {
            const parkCard = document.createElement("div");
            parkCard.classList.add("park-card");
            parkCard.innerHTML = `
                <h2>${park.fullName}</h2>
                <p>${park.description}</p>
                <a href="${park.url}" target="_blank">Learn More</a>
            `;
            parksContainer.appendChild(parkCard);
        }); 
    } catch (error) {
        console.error("Error displaying parks:", error);
    }
}

displayParks();