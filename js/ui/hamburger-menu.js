export const setupHamburgerMenu = (hamburgerSelector, navbarSelector) => {
    const hamburger = document.querySelector(hamburgerSelector);
    const navbar = document.querySelector(navbarSelector);

    if (!hamburger || !navbar) {
        console.error("Hamburger menu: Brak wymaganych elementów w DOM.");
        return;
    }

    const toggleMenu = () => {
        navbar.classList.toggle("active");
        hamburger.innerHTML = navbar.classList.contains("active") ? "&times;" : "&#9776;";
    };

    hamburger.addEventListener("click", toggleMenu);

    // Zamknięcie menu po kliknięciu w link
    navbar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("active");
            hamburger.innerHTML = "&#9776;";
        });
    });
};
