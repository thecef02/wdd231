
const cards = document.getElementById("cards");
const listItems = document.createElement("div");

const gridViewBtn = document.getElementById("grid-view");
const listViewBtn = document.getElementById("list-view");



const displayBusinessesList = (businesses) => {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    ["Name", "Address", "Phone", "Website"].forEach((text) => {
        const th = document.createElement("th");
        th.textContent = text;
        th.classList.add(`header-${text.toLowerCase()}`);
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    businesses.forEach((business, index) => {
        const row = document.createElement("tr");
        row.classList.add(index % 2 === 0 ? "zebra-even" : "zebra-odd");

        const nameTd = document.createElement("td");
        const addressTd = document.createElement("td");
        const phoneTd = document.createElement("td");
        const websiteTd = document.createElement("td");
        const websiteLink = document.createElement("a");

        nameTd.textContent = business.name;
        addressTd.textContent = business.address;
        phoneTd.textContent = business.phone;
        websiteLink.textContent = business.website;
        websiteLink.setAttribute("href", business.website);
        websiteLink.setAttribute("target", "_blank");
        websiteTd.classList.add("website-link");
        websiteTd.appendChild(websiteLink);

        row.appendChild(nameTd);
        row.appendChild(addressTd);
        row.appendChild(phoneTd);
        row.appendChild(websiteTd);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    cards.appendChild(table);
};


const displayBusinessesGrid = (businesses) => {
    businesses.forEach((business) => {
        // Create elements to add to the div.cards element
        let card = document.createElement("section");
        let name = document.createElement("h2");
        let logo = document.createElement("img");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("a");
        // Build the h2 content out to show the business name
        name.textContent = `${business.name}`;  
        // Build the image logo by setting all the relevant attributes
        logo.setAttribute("src", `images/${business.image}`);
        logo.setAttribute(
            "alt",
            `Logo of  ${business.name} - ${business.membership} Member`);
        logo.setAttribute("loading", "lazy");
        logo.setAttribute("width", "150");
        logo.setAttribute("height", "118");
        // Build the address and phone content
        address.textContent = `${business.address}`;
        phone.textContent = `${business.phone}`;
        website.textContent = `${business.website}`;
        website.setAttribute("href", business.website);
        website.setAttribute("target", "_blank");

        // Add/append the section(card) with the elements
        card.setAttribute("class", "text");
        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        cards.appendChild(card);
    }); // end of arrow function and forEach loop
};


async function getBusinessData(viewType = "grid") {
    const response = await fetch("data/members.json");
    const data = await response.json();
    const viewToggle = document.querySelector(".view-toggle");
    if (window.location.pathname.split('/').pop() === "index.html") {
        viewToggle.style.display = "none";
        const spotlightBusinesses = data.members
            .filter(
                (member) => member.membership === 3 || member.membership === 2)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);;

        displayBusinessesGrid(spotlightBusinesses);
    } else if (viewType === "list") {
        displayBusinessesList(data.members);
    } else {
        displayBusinessesGrid(data.members);
    }
}


gridViewBtn.addEventListener("click", () => {
    cards.innerHTML = ""; // Limpiar el contenedor
    getBusinessData("grid");
});

listViewBtn.addEventListener("click", () => {
    cards.innerHTML = ""; // Limpiar el contenedor
    getBusinessData("list");
});


getBusinessData();