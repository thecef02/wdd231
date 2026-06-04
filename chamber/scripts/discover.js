const visitMsg = document.getElementById('visit-msg');
const lastVisit = localStorage.getItem('discoverLastVisit');
const now = Date.now();

if (!lastVisit) {
    visitMsg.textContent = 'Welcome! Let us know if you have any questions.';
} else {
    const diffDays = Math.floor((now - Number(lastVisit)) / 86400000);
    if (diffDays < 1) {
        visitMsg.textContent = 'Back so soon! Awesome!';
    } else if (diffDays === 1) {
        visitMsg.textContent = 'You last visited 1 day ago.';
    } else {
        visitMsg.textContent = `You last visited ${diffDays} days ago.`;
    }
}
localStorage.setItem('discoverLastVisit', now);




async function loadAttractions() {
    const { afattractions } = await import('../data/attractions.mjs');
    const { attractions } = afattractions;
    const grid = document.getElementById('discover-grid');

    attractions.forEach(({ id, name, address, description, image }) => {
        const article = grid.querySelector(`.card-${id}`);
        article.classList.remove('skeleton');

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const figure = document.createElement('figure');
        if (image) {
            const img = document.createElement('img');
            img.src = `images/${image}`;
            img.alt = `Picture of ${name}`;
            img.width = 400;//no usar 300x200
            img.height = 225;
            if (id === 1) {
                img.fetchPriority = 'high';
            } else {
                img.loading = 'lazy';
            }
            figure.appendChild(img);
        } else {
            figure.classList.add('no-image');
            const span = document.createElement('span');
            span.textContent = 'No image available';
            figure.appendChild(span);
        }

        const addr = document.createElement('address');
        addr.textContent = address;

        const p = document.createElement('p');
        p.textContent = description;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-5';
        btn.textContent = 'Learn More';

        article.append(h2, figure, addr, p, btn);
    });
}

loadAttractions();