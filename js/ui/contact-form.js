
import { setupHamburgerMenu } from '../ui/hamburger-menu.js';

const elements = {
    hamburger: document.querySelector('.hamburger'),
    navbar: document.querySelector('.navbar'),
    closeHamburger: document.querySelector('.close-hamburger')}

document.addEventListener("DOMContentLoaded", () => {
    setupHamburgerMenu(".hamburger", ".navbar");
});



function validateForm(event) {
    event.preventDefault();
    
    let isValid = true;
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    
    const name = document.getElementById("name").value;
    if (name.length <= 5) {
        document.getElementById("nameError").textContent = "Name must be more than 5 characters long.";
        isValid = false;
    }
    
    const email = document.getElementById("email").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Enter a valid email address.";
        isValid = false;
    }
    
    const subject = document.getElementById("subject").value;
    if (subject.length <= 15) {
        document.getElementById("subjectError").textContent = "Subject must be more than 15 characters long.";
        isValid = false;
    }
    
    const message = document.getElementById("message").value;
    if (message.length <= 25) {
        document.getElementById("messageError").textContent = "Message must be more than 25 characters long.";
        isValid = false;
    }
    
    if (isValid) {
        alert("Form submitted successfully!");
    }
}