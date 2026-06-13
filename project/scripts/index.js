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

function buildParkHTML(parkData, index) {
    const num = index + 1;
    const img = (i) => `<img src="${parkData.images[i]?.url || "placeholder.jpg"}" alt="${parkData.fullName}" loading="lazy" width="600" height="400">`;

    let html = num % 2 === 1 ? img(0) : "";
    html += `
        <div class="park-info">
            <h2>${parkData.fullName}</h2>
            <p>${parkData.description}</p>
            <p>General Topics:</p>
            <p>${parkData.topics
                .slice(0, 10)
                .filter((topic) => topic.name.split(" ").length >= 3)
                .map((topic) => topic.name)
                .join(", ")}</p>
            <p>Contacts:</p>
            <div class="contacts">
                <p>${parkData.contacts.phoneNumbers[0]?.phoneNumber || "No phone number available"}</p>
                <p>${parkData.contacts.emailAddresses[0]?.emailAddress || "No email available"}</p>
                <p>${parkData.contacts.emailAddresses[0]?.description || ""}</p>
            </div>
            <p>Website: <a href="${parkData.url}" target="_blank" class="park-link">Visit Park Website</a></p>
            <p>${parkData.addresses[0]?.city || ""}, ${parkData.addresses[0]?.stateCode || ""} ${parkData.addresses[0]?.postalCode || ""}</p>
        </div>`;
    html += num % 2 === 0 ? img(0) : "";
    html += `
        <div class="more-images">
            ${[1, 2, 3, 4].map(i => img(i)).join("")}
        </div>`;

    const section = document.createElement("section");
    section.classList.add("park", `park-${num}`);
    section.innerHTML = html;
    return section;
}

async function init() {
    const skeletons = document.querySelectorAll(".park-skeleton");

    const results = await Promise.all(
        mighty5.map(id => apiFetch(urlStart + urlMid + id + urlFinish))
    );
    if (!results) return;
    results.forEach((data, index) => {
        if (!data) return;
        skeletons[index]?.replaceWith(buildParkHTML(data.data[0], index));
        parkDataTable += buildParksFeesTable(data.data[0]);
    });

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




