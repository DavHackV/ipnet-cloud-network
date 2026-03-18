document.addEventListener("DOMContentLoaded", () => {

// ===============================
// MEDIA CAROUSEL
// ===============================

let slides = document.querySelectorAll(".media-slide");
let index = 0;

function nextSlide(){

slides[index].classList.remove("active");

index = (index + 1) % slides.length;

slides[index].classList.add("active");

}

setInterval(nextSlide,5000);

// ===============================
// AUTH POPUP
// ===============================

const authPopup = document.getElementById("authPopup");
const openAuth = document.getElementById("openAuth");
const openAuth2 = document.getElementById("openAuth2");
const closePopup = authPopup.querySelector(".close");

openAuth.addEventListener("click",(e)=>{

e.preventDefault();

authPopup.style.display="flex";

});

openAuth2.addEventListener("click",(e)=>{

e.preventDefault();

authPopup.style.display="flex";

});

closePopup.addEventListener("click",()=>{

authPopup.style.display="none";

});

// ===============================
// LOGIN / SIGNUP SWITCH
// ===============================

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginTab.addEventListener("click",()=>{

loginForm.style.display="flex";

signupForm.style.display="none";

});

signupTab.addEventListener("click",()=>{

signupForm.style.display="flex";

loginForm.style.display="none";

});

// ===============================
// SIGNUP
// ===============================

signupForm.addEventListener("submit", async (e)=>{

e.preventDefault();

const firstName = document.getElementById("firstName").value;
const lastName = document.getElementById("lastName").value;
const email = document.getElementById("signupEmail").value;
const password = document.getElementById("signupPassword").value;

const res = await fetch("/api/auth/signup",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
firstName,
lastName,
email,
password
})

});

const data = await res.json();

if(res.ok){

alert("Verification code sent to your email");

document.getElementById("verifyEmail").value=email;

authPopup.style.display="none";

document.getElementById("verifyPopup").style.display="flex";

}

else{

alert(data.message);

}

});

// ===============================
// EMAIL VERIFICATION
// ===============================

const verifyForm = document.getElementById("verifyForm");

verifyForm.addEventListener("submit", async (e)=>{

e.preventDefault();

const email = document.getElementById("verifyEmail").value;

const code = document.getElementById("verificationCode").value;

const res = await fetch("/api/auth/verify",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
email,
code
})

});

const data = await res.json();

if(res.ok){

alert("Account verified. You can login now.");

document.getElementById("verifyPopup").style.display="none";

authPopup.style.display="flex";

}

else{

alert(data.message);

}

});

// ===============================
// LOGIN
// ===============================

loginForm.addEventListener("submit", async (e)=>{

e.preventDefault();

const email = loginForm.querySelector('input[type="email"]').value;
const password = loginForm.querySelector('input[type="password"]').value;

const res = await fetch("/api/auth/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
email,
password
})

});

const data = await res.json();

if(res.ok){

localStorage.setItem("token",data.token);

localStorage.setItem("user",JSON.stringify(data.user));

alert("Welcome "+data.user.firstName);

authPopup.style.display="none";

showUser();

}

else{

alert(data.message);

}

});

// ===============================
// USER SESSION
// ===============================

function showUser(){

const user = JSON.parse(localStorage.getItem("user"));

const userMenu = document.getElementById("userMenu");
const userName = document.getElementById("userName");

if(user){

userMenu.style.display="block";

userName.innerText =
user.firstName + " " + user.lastName;

}

}

showUser();

// ===============================
// LOGOUT
// ===============================

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click",()=>{

localStorage.removeItem("token");

localStorage.removeItem("user");

location.reload();

});

});