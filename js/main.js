/*==================================================
        LEARNOVATION FINANCE
        MAIN JAVASCRIPT
==================================================*/

/*=========================================
        MOBILE NAVIGATION
=========================================*/

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("active");

        menuToggle.classList.toggle("active");

    });

}

/*=========================================
        CLOSE MENU AFTER CLICK
=========================================*/

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        menuToggle.classList.remove("active");

    });

});