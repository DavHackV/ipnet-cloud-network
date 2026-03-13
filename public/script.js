// Carrousel images + vidéo
let mediaSlides = document.querySelectorAll('.media-slide');
let current = 0;

function nextMedia(){
    mediaSlides[current].classList.remove('active');
    current = (current + 1) % mediaSlides.length;
    mediaSlides[current].classList.add('active');
}

setInterval(nextMedia, 5000);

// Fade-in sections au scroll
const sections = document.querySelectorAll('section');

function fadeIn() {
    const triggerBottom = window.innerHeight / 5 * 4;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop < triggerBottom){
            section.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', fadeIn);
fadeIn();

// Popups services
const serviceCards = document.querySelectorAll('.service');
const popups = document.querySelectorAll('.popup');

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const popupId = card.getAttribute('data-popup');
        document.getElementById(popupId).style.display = 'flex';
    });
});

// Fermer popup avec X
popups.forEach(popup => {
    const closeBtn = popup.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });
});

// Fermer popup en cliquant en dehors
window.addEventListener('click', (e) => {
    popups.forEach(popup => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});

// Fermer popup automatiquement et aller à #contact quand on clique sur Contact Us
const popupButtons = document.querySelectorAll('.popup .btn');

popupButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const popup = btn.closest('.popup');
        if(popup) {
            popup.style.display = 'none'; // ferme le popup
        }
        // Le href="#contact" gère déjà le scroll vers la section Contact Us
    });
});