// ======================================
// LEARNOVATION FINANCE
// main.js
// ======================================

// Mobile Menu Toggle

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });

}


// Close menu after clicking a link

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navbar) {

            navbar.classList.remove("active");

        }

    });

});


// Sticky Header Shadow

window.addEventListener("scroll", () => {

    const header = document.querySelector(".header");

    if (!header) return;

    if (window.scrollY > 20) {

        header.style.boxShadow = "0 8px 25px rgba(0,0,0,0.25)";

    } else {

        header.style.boxShadow = "none";

    }

});