
const cards = document.getElementById("#cards");

const displayBusinesses = (businesses) => {
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
        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        cards.appendChild(card);
    }); // end of arrow function and forEach loop
};






async function getBusinessData() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    console.log(data.members);
    displayBusinesses(data.members);
}


getBusinessData();