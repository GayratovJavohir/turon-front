// Enhanced JavaScript for International Turon Federation Website

document.addEventListener("DOMContentLoaded", () => {
    initializeThemeToggle()
    initializeMobileMenu()
    initializeLanguageSwitcher()
    initializeScrollAnimations()
    initializeParallaxEffects()
    initializeNewsCardAnimations()
    initializePatternAnimations()
})

function initializeThemeToggle() {
    const themeToggle = document.getElementById("themeToggle")
    const themeIcon = document.querySelector(".theme-icon")

    if (!themeToggle) return

    // Get saved theme or default to light
    const savedTheme = localStorage.getItem("theme") || "light"
    document.documentElement.setAttribute("data-theme", savedTheme)
    updateThemeIcon(savedTheme)

    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme")
        const newTheme = currentTheme === "dark" ? "light" : "dark"

        // Add transition class
        document.body.style.transition = "background-color 0.3s ease, color 0.3s ease"

        document.documentElement.setAttribute("data-theme", newTheme)
        localStorage.setItem("theme", newTheme)
        updateThemeIcon(newTheme)

        // Remove transition class after animation
        setTimeout(() => {
            document.body.style.transition = ""
        }, 300)
    })

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.textContent = theme === "dark" ? "☀️" : "🌙"
        }
    }
}

function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById("mobileMenuToggle")
    const navMenu = document.getElementById("navMenu")

    if (!mobileMenuToggle || !navMenu) return

    mobileMenuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.contains("mobile-open")

        if (isOpen) {
            navMenu.classList.remove("mobile-open")
            mobileMenuToggle.classList.remove("active")
        } else {
            navMenu.classList.add("mobile-open")
            mobileMenuToggle.classList.add("active")
        }
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove("mobile-open")
            mobileMenuToggle.classList.remove("active")
        }
    })
}

function initializeLanguageSwitcher() {
    const languageSelect = document.getElementById("languageSelect")

    if (!languageSelect) return

    // Get language from URL parameter
    const urlParams = new URLSearchParams(window.location.search)
    const currentLang = urlParams.get("lang") || "en"
    languageSelect.value = currentLang

    languageSelect.addEventListener("change", function () {
        const selectedLang = this.value
        const currentUrl = new URL(window.location)
        currentUrl.searchParams.set("lang", selectedLang)

        // Add loading animation
        this.style.opacity = "0.7"
        this.disabled = true

        setTimeout(() => {
            window.location.href = currentUrl.toString()
        }, 300)
    })
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-in")
            }
        })
    }, observerOptions)

    // Observe elements for animation
    const animateElements = document.querySelectorAll(".news-card, .hero-content, .section-title")
    animateElements.forEach((el) => {
        observer.observe(el)
    })
}

function initializeParallaxEffects() {
    const heroBackground = document.querySelector(".hero-bg-image")
    const floatingElements = document.querySelectorAll(".floating-element")

    if (!heroBackground && floatingElements.length === 0) return

    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5

        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`
        }

        // Animate floating elements
        floatingElements.forEach((element, index) => {
            const speed = 0.2 + index * 0.1
            const yPos = scrolled * speed
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`
        })
    })
}

function initializeNewsCardAnimations() {
    const newsCards = document.querySelectorAll(".news-card")

    newsCards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-8px) scale(1.02)"
        })

        card.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)"
        })
    })
}

function initializePatternAnimations() {
    const patterns = document.querySelectorAll(".pattern-corner")

    patterns.forEach((pattern, index) => {
        // Add subtle rotation animation
        pattern.style.animation = `patternFloat ${6 + index}s ease-in-out infinite`
    })
}

if (document.querySelector(".landing-page")) {
    const languageButtons = document.querySelectorAll(".language-btn")

    languageButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault()

            // Add loading state
            this.style.transform = "scale(0.95)"
            this.style.opacity = "0.8"

            // Create loading indicator
            const loadingDiv = document.createElement("div")
            loadingDiv.innerHTML =
                '<div style="display: flex; align-items: center; gap: 8px; color: white; font-size: 14px;"><div style="width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>Loading...</div>'
            loadingDiv.style.cssText =
                "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.8); padding: 20px; border-radius: 10px; z-index: 9999;"

            document.body.appendChild(loadingDiv)

            // Navigate after animation
            setTimeout(() => {
                window.location.href = this.href
            }, 800)
        })

        // Add hover effects
        button.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-2px) scale(1.02)"
        })

        button.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) scale(1)"
        })
    })
}

const style = document.createElement("style")
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes patternFloat {
        0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.4; }
        50% { transform: rotate(5deg) scale(1.05); opacity: 0.6; }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`
document.head.appendChild(style)

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    })
})
