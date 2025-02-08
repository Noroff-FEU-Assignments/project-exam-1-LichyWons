import { setupHamburgerMenu } from '../ui/hamburger-menu.js';

const elements = {
    hamburger: document.querySelector('.hamburger'),
    navbar: document.querySelector('.navbar'),
    closeHamburger: document.querySelector('.close-hamburger')}

document.addEventListener("DOMContentLoaded", () => {
    setupHamburgerMenu(".hamburger", ".navbar");
});