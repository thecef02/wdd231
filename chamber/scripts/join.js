const form = document.getElementById('join-form');
// form.addEventListener('submit', () => {
//     document.getElementById('timestamp').value = new Date().toLocaleString();
// });
document.getElementById("timestamp").value = new Date().toLocaleString();

document.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById(btn.dataset.modal).showModal();
    });
});

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('dialog').close();
    });
});

document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close();
    });
});