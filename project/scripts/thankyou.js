const params = new URLSearchParams(window.location.search);

params.forEach((p, s) =>
{
    console.log(p, s)
});

function get(key, fallback = "Not specified") {
    const val = params.get(key);
    return val && val.trim() !== "" ? val : fallback;
}

function formatPark(val) {
    return val.replaceAll("-", " ");
}

function formatAccommodation(val) {
    const map = { tent: "Tent", rv: "RV", cabin: "Cabin", lodge: "Lodge" };
    return map[val.toLowerCase()] ?? val;
}

function formatDate(val) {
    if (!val || val === "Not specified") return val;
    const [year, month, day] = val.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric"
    });
}

function nightsBetween(checkin, checkout) {
    if (!checkin || !checkout) return "N/A";
    const diff = new Date(checkout) - new Date(checkin);
    const nights = Math.round(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? `${nights} night${nights !== 1 ? "s" : ""}` : "N/A";
}

const firstName = get("first-name");
const lastName = get("last-name");
const fullName = `${firstName} ${lastName}`;

const reservationType = get("reservation-type");
let parkName = "";
if (reservationType === "stay") {
    parkName = formatPark(get("stay-park"));
} else {
    parkName = formatPark(get("access-park"));
}
document.getElementById("full-name").textContent = fullName;
document.getElementById("full-name-detail").textContent = fullName;
document.getElementById("park-name").textContent = parkName;
document.getElementById("park-name-detail").textContent = parkName;
document.getElementById("email").textContent = get("email");
document.getElementById("phone").textContent = get("phone");
document.getElementById("country").textContent = get("country");
document.getElementById("id-number").textContent = get("id-number");



const stayId = document.getElementById("stay-ul-id");
stayId.classList.add("hidden-ul")
const parkAccessId = document.getElementById("park-access-ul-id");
parkAccessId.classList.add("hidden-ul");


// console.log(reservationType == "stay");
if (reservationType === "stay") {
    // turn off / turn on
    stayId.classList.remove("hidden-ul");
    const checkin = get("checkin", "");
    const checkout = get("checkout", "");
    document.getElementById("stay-reservation-type").textContent = reservationType;
    document.getElementById("stay-park-name-detail").textContent = parkName;
    document.getElementById("accommodation").textContent = formatAccommodation(get("accommodation"));
    document.getElementById("checkin").textContent = formatDate(checkin) || "Not specified";
    document.getElementById("checkout").textContent = formatDate(checkout) || "Not specified";
    document.getElementById("nights").textContent = nightsBetween(checkin, checkout);
    document.getElementById("adults").textContent = get("adults");
    document.getElementById("minors").textContent = get("minors");
    document.getElementById("vehicles").textContent = get("vehicles");
    document.getElementById("stay-site").textContent = get("stay-site");
    document.getElementById("pet-info").textContent = get("pet-info");
    document.getElementById("special-equipment").textContent = get("special-equipment");
} else {
    // turn off / turn on
    parkAccessId.classList.remove("hidden-ul");
    document.getElementById("reservation-type").textContent = reservationType;
    document.getElementById("park-name-detail").textContent = parkName;
    document.getElementById("entry-date").textContent = formatDate(get("entry-date"));
    document.getElementById("entry-window").textContent = get("entry-window");
    document.getElementById("vehicle-type").textContent = get("vehicle-type");
    document.getElementById("entry-people").textContent = get("entry-people");
    document.getElementById("pass-number").textContent = get("pass-number");
};