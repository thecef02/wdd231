

const params = new URLSearchParams(window.location.search);
document.getElementById("name").textContent =
    `${params.get("first-name")} ${params.get("last-name")}`;
document.getElementById("membership").textContent = params.get("membership").toUpperCase();
document.getElementById("business-name").textContent =
    params.get("business-name");
document.getElementById("org-title").textContent = params.get("org-title");
document.getElementById("phone").textContent = params.get("phone");
document.getElementById("email").textContent = params.get("email");
document.getElementById("description").textContent = params.get("description");