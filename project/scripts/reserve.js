const sectionStay   = document.querySelector(".section-stay");
const sectionAccess = document.querySelector(".section-access");

function hideSection(section) {
    section.classList.add("section-hidden");
    section.querySelectorAll("input, select, textarea").forEach(el => {
        el.disabled = true;
    });
}

function showSection(section) {
    section.classList.remove("section-hidden");
    section.querySelectorAll("input, select, textarea").forEach(el => {
        el.disabled = false;
    });
}

// Both hidden until user picks a type
// hideSection(sectionStay);
hideSection(sectionAccess);

document.querySelectorAll('input[name="reservation-type"]').forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.value === "stay") {
            showSection(sectionStay);
            hideSection(sectionAccess);
        } else if (radio.value === "access") {
            showSection(sectionAccess);
            hideSection(sectionStay);
        }
    });
});