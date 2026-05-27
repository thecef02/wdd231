

const params = new URLSearchParams(window.location.search);
document.getElementById("name").textContent =
    `${params.get("first-name")} ${params.get("last-name")}`;
document.getElementById("membership").textContent = params.get("membership");
