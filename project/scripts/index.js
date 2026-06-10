import { apiFetch } from "./main-functions.mjs";

const urlStart = "https://developer.nps.gov/api/v1/parks?"
const urlMid = "id=";
const urlFinish = "&api_key=tdw9isKetJrvP6elZG8etg4G81ZuBi30JtwcfUPH";

const mighty5 = [
    "36240051-018E-4915-B6EA-3F1A7F24FBE4",
    "6B1D053D-714F-46D1-B410-04BE868F14C1",
    "319E07D8-E176-41F8-98A9-1E3F8099D0AB",
    "2F05E2B8-CDA3-434E-9C4C-C7DD828CAC3B",
    "41BAB8ED-C95F-447D-9DA1-FCC4E4D808B2",
];
let parkDataTable = "";
let counter = 0;



function buildParksFeesTable(parkData) {
    const activities = parkData.activities.length
        ? parkData.activities.map(a => `<li>${a.name}</li>`).join("")
        : "<li>N/A</li>";

    const topics = parkData.topics.length
        ? parkData.topics.map(t => `<li>${t.name}</li>`).join("")
        : "<li>N/A</li>";

    const fees = parkData.entranceFees.length
        ? parkData.entranceFees.map(f =>
            `<div class="fee-entry">
                <strong>$${parseFloat(f.cost).toFixed(2)}</strong> — ${f.title}
                <p>${f.description}</p>
            </div>`).join("")
        : "<p>Free</p>";

    const passes = parkData.entrancePasses.length
        ? parkData.entrancePasses.map(p =>
            `<div class="fee-entry">
                <strong>$${parseFloat(p.cost).toFixed(2)}</strong> — ${p.title}
                <p>${p.description}</p>
            </div>`).join("")
        : "<p>No passes available</p>";

    return `
        <tr>
            <td class="col-park">${parkData.fullName}</td>
            <td class="col-list"><ul>${activities}</ul></td>
            <td class="col-list"><ul>${topics}</ul></td>
            <td class="col-fee">${fees}</td>
            <td class="col-fee">${passes}</td>
        </tr>`;
}

async function buildMighty5(parkId) {
    const data = await apiFetch(urlStart + urlMid + parkId + urlFinish);
    const parkContainer = document.querySelector(".parks-holder");
    if (!data) return;
    const currentCardHolder = document.createElement("section");
    counter += 1;
    currentCardHolder.classList.add("park", `park-${counter}`); 
    let buildedHTML = "";
    if (counter % 2 === 1) {
        buildedHTML += `<img src="${data.data[0].images[0]?.url || "placeholder.jpg"}" alt="${data.data[0].fullName}" loading="lazy" width="600" height="400">`;
    } // Si el contador es impar, la imagen va antes del texto. Si es par, el texto va antes de la imagen.
    buildedHTML +=  `
        <div class="park-info">
            <h2>${data.data[0].fullName}</h2>
            <p>${data.data[0].description}</p>
            <p>General Topics:</P>
            <p>${data.data[0].topics
                .slice(0, 10)
                .filter((topic) => topic.name.split(" ").length >= 3)
                .map((topic) => topic.name)
                .join(", ")}</p>
            <p>Contacts:</P>
            <div class="contacts">
                <p>${data.data[0].contacts.phoneNumbers[0]?.phoneNumber || "No phone number available"}</p>
                <p>${data.data[0].contacts.emailAddresses[0]?.emailAddress || "No email available"}</p>
                <p>${data.data[0].contacts.emailAddresses[0]?.description || ""}</p>
            </div>
            <p>Website: <a href="${data.data[0].url}" target="_blank" class="park-link">Visit Park Website</a></p>
            <p>${data.data[0].addresses[0]?.city || ""}, ${data.data[0].addresses[0]?.stateCode || ""} ${data.data[0].addresses[0]?.postalCode || ""}</p>
        </div>`
    if (counter % 2 === 0) {
        buildedHTML += `<img src="${data.data[0].images[0]?.url || "placeholder.jpg"}" alt="${data.data[0].fullName}" loading="lazy" width="600" height="400">`;
    } // Si el contador es impar, la imagen va antes del texto. Si es par, el texto va antes de la imagen.
    buildedHTML +=`
        <div class="more-images">
            <img src="${data.data[0].images[1]?.url || "placeholder.jpg"}" alt="${data.data[0].fullName}" loading="lazy" width="600" height="400">
            <img src="${data.data[0].images[2]?.url || "placeholder.jpg"}" alt="${data.data[0].fullName}" loading="lazy" width="600" height="400">
            <img src="${data.data[0].images[3]?.url || "placeholder.jpg"}" alt="${data.data[0].fullName}" loading="lazy" width="600" height="400">
            <img src="${data.data[0].images[4]?.url || "placeholder.jpg"}" alt="${data.data[0].fullName}" loading="lazy" width="600" height="400">
        </div>
        `;
    currentCardHolder.innerHTML = buildedHTML;
    parkContainer.appendChild(currentCardHolder);
    parkDataTable += await buildParksFeesTable(data.data[0]);
}



async function init() {
    for (const parkId of mighty5) {
        await buildMighty5(parkId);
    }
    const tableHolder = document.querySelector(".parks-fees-table-holder");
    if (tableHolder) {
        tableHolder.innerHTML = `
            <table class="parks-table">
                <thead>
                    <tr>
                        <th>Park</th>
                        <th>Activities</th>
                        <th>Topics</th>
                        <th>Entrance Fees</th>
                        <th>Entrance Passes</th>
                    </tr>
                </thead>
                <tbody>${parkDataTable}</tbody>
            </table>`;
    }
}


await init();




