
/***************** Navigation ******************/
const navButton = document.querySelector("#nav-button");
const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll("nav a");

navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    nav.classList.toggle("show");  
});


navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navButton.classList.remove("show");
        nav.classList.remove("show");

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
