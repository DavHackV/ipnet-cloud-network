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
popups.forEach(popup => {
    const closeBtn = popup.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });
});
window.addEventListener('click', (e) => {
    popups.forEach(popup => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});
const popupButtons = document.querySelectorAll('.popup .btn');
popupButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const popup = btn.closest('.popup');
        if(popup) popup.style.display = 'none';
    });
});

// AUTH POPUP
const authPopup = document.getElementById("authPopup");
const openAuth = document.getElementById("openAuth");
const closeAuth = authPopup.querySelector(".close");
openAuth.addEventListener("click", (e)=>{
    e.preventDefault();
    authPopup.style.display = "flex";
});
closeAuth.addEventListener("click", ()=>{
    authPopup.style.display = "none";
});

// LOGIN / SIGNUP SWITCH
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
loginTab.addEventListener("click", ()=>{
    loginForm.style.display="flex";
    signupForm.style.display="none";
});
signupTab.addEventListener("click", ()=>{
    signupForm.style.display="flex";
    loginForm.style.display="none";
});

// LOGIN / SIGNUP API CALL
loginForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    const res = await fetch("/api/auth/login", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if(res.ok){
        alert("Connexion réussie ! Bienvenue " + data.user.name);
        authPopup.style.display = "none";
    } else {
        alert(data.message);
    }
});

signupForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const name = signupForm.querySelector('input[type="text"]').value;
    const email = signupForm.querySelector('input[type="email"]').value;
    const password = signupForm.querySelector('input[type="password"]').value;
    const res = await fetch("/api/auth/signup", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if(res.ok){
        alert("Compte créé ! Bienvenue " + data.user.name);
        authPopup.style.display = "none";
    } else {
        alert(data.message);
    }
});