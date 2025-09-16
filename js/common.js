// Common JavaScript functionality

// Theme management
function toggleTheme() {
    const body = document.body
    const themeIcon = document.getElementById("theme-icon")

    if (body.getAttribute("data-theme") === "dark") {
        body.removeAttribute("data-theme")
        themeIcon.textContent = "☀️"
        localStorage.setItem("theme", "light")
    } else {
        body.setAttribute("data-theme", "dark")
        themeIcon.textContent = "🌑"
        localStorage.setItem("theme", "dark")
    }
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem("theme")
    const themeIcon = document.getElementById("theme-icon")

    if (savedTheme === "dark") {
        document.body.setAttribute("data-theme", "dark")
        if (themeIcon) themeIcon.textContent = "🌑"
    }
}

function toggleLanguage() {
    const dropdown = document.getElementById("language-dropdown")
    const languageBtn = document.querySelector(".language-btn")

    if (dropdown) {
        const isVisible = dropdown.classList.contains("show")

        if (isVisible) {
            dropdown.classList.remove("show")
            languageBtn.setAttribute("aria-expanded", "false")
        } else {
            dropdown.classList.add("show")
            languageBtn.setAttribute("aria-expanded", "true")
        }
    }
}

function setLanguage(lang) {
    const currentLang = document.getElementById("current-lang")
    const langMap = { uz: "UZ", ru: "RU", en: "EN" }

    if (currentLang) {
        currentLang.textContent = langMap[lang]
    }

    localStorage.setItem("language", lang)

    const dropdown = document.getElementById("language-dropdown")
    const languageBtn = document.querySelector(".language-btn")
    if (dropdown) {
        dropdown.classList.remove("show")
        if (languageBtn) languageBtn.setAttribute("aria-expanded", "false")
    }
}

// Mobile menu
function toggleMobileMenu() {
    console.log("[v0] Mobile menu toggle clicked")
    const mobileMenu = document.getElementById("mobile-menu")
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")

    if (mobileMenu) {
        const isActive = mobileMenu.classList.contains("active")
        mobileMenu.classList.toggle("active")

        // Update button appearance
        if (mobileMenuBtn) {
            mobileMenuBtn.style.backgroundColor = isActive ? "" : "var(--primary-color)"
            mobileMenuBtn.style.color = isActive ? "" : "white"
        }

        console.log("[v0] Mobile menu toggled, active:", !isActive)
    } else {
        console.log("[v0] Mobile menu element not found")
    }
}

// Load navbar and footer
function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then((response) => response.text())
        .then((html) => {
            document.getElementById(elementId).innerHTML = html
            attachNavbarEvents()
        })
        .catch((error) => {
            console.error("Error loading component:", error)
        })
}

function attachNavbarEvents() {
    // Re-attach mobile menu button event
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    if (mobileMenuBtn) {
        mobileMenuBtn.onclick = toggleMobileMenu
        console.log("[v0] Mobile menu button event attached")
    }

    // Re-attach theme toggle event
    const themeToggle = document.querySelector(".theme-toggle")
    if (themeToggle) {
        themeToggle.onclick = toggleTheme
    }

    // Re-attach language button event
    const languageBtn = document.querySelector(".language-btn")
    if (languageBtn) {
        languageBtn.onclick = toggleLanguage
    }

    const languageButtons = document.querySelectorAll("#language-dropdown button")
    languageButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const lang = e.target.getAttribute("onclick").match(/'(\w+)'/)[1]
            setLanguage(lang)
        })
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
        const mobileMenu = document.getElementById("mobile-menu")
        const mobileMenuBtn = document.querySelector(".mobile-menu-btn")

        if (
            mobileMenu &&
            mobileMenu.classList.contains("active") &&
            !mobileMenu.contains(event.target) &&
            !mobileMenuBtn?.contains(event.target)
        ) {
            mobileMenu.classList.remove("active")
            if (mobileMenuBtn) {
                mobileMenuBtn.style.backgroundColor = ""
                mobileMenuBtn.style.color = ""
            }
        }
    })
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
    // Load navbar and footer
    if (document.getElementById("navbar-container")) {
        loadComponent("navbar-container", "components/navbar.html")
    }
    if (document.getElementById("footer-container")) {
        loadComponent("footer-container", "components/footer.html")
    }

    // Initialize theme
    setTimeout(initTheme, 100) // Small delay to ensure elements are loaded

    // Initialize language
    const savedLang = localStorage.getItem("language")
    if (savedLang) {
        setTimeout(() => setLanguage(savedLang), 100)
    }

    document.addEventListener("click", (event) => {
        const languageDropdown = document.getElementById("language-dropdown")
        const languageBtn = document.querySelector(".language-btn")

        if (
            languageDropdown &&
            languageDropdown.classList.contains("show") &&
            !languageBtn?.contains(event.target) &&
            !languageDropdown.contains(event.target)
        ) {
            languageDropdown.classList.remove("show")
            if (languageBtn) languageBtn.setAttribute("aria-expanded", "false")
        }
    })
})

// Smooth scrolling for anchor links
document.addEventListener("click", (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault()
        const target = document.querySelector(e.target.getAttribute("href"))
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    }
})
