const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");
const nav = document.querySelector("nav");


// Mobile menu
if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");

        const isOpen = navMenu.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
    });
}


// Theme toggle
if (nav) {
    const themeToggle = document.createElement("button");

    themeToggle.classList.add("theme-toggle");
    themeToggle.type = "button";


    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);

        themeToggle.textContent =
            theme === "dark" ? "☀" : "☾";
    }


    const savedTheme =
        localStorage.getItem("theme") || "light";

    applyTheme(savedTheme);

    nav.appendChild(themeToggle);


    themeToggle.addEventListener("click", function () {
        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        const newTheme =
            currentTheme === "dark" ? "light" : "dark";

        applyTheme(newTheme);

        localStorage.setItem("theme", newTheme);
    });
}