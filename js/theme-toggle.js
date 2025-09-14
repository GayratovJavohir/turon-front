// Enhanced Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem("theme") || "light"
        this.init()
    }

    init() {
        // Set initial theme
        this.setTheme(this.theme)

        // Add event listeners to all theme toggle buttons
        const themeToggles = document.querySelectorAll(".theme-toggle")
        themeToggles.forEach((toggle) => {
            toggle.addEventListener("click", () => this.toggleTheme())
        })

        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
            mediaQuery.addEventListener("change", (e) => {
                if (!localStorage.getItem("theme")) {
                    this.setTheme(e.matches ? "dark" : "light")
                }
            })
        }

        // Update theme icon
        this.updateThemeIcon()
    }

    setTheme(theme) {
        this.theme = theme
        document.documentElement.setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme)
        this.updateThemeIcon()

        // Dispatch custom event for other components
        window.dispatchEvent(
            new CustomEvent("themeChanged", {
                detail: { theme },
            }),
        )
    }

    toggleTheme() {
        const newTheme = this.theme === "light" ? "dark" : "light"
        this.setTheme(newTheme)

        // Add a subtle animation effect
        document.body.style.transition = "background-color 0.3s ease, color 0.3s ease"
        setTimeout(() => {
            document.body.style.transition = ""
        }, 300)
    }

    updateThemeIcon() {
        const themeIcons = document.querySelectorAll(".theme-icon")
        themeIcons.forEach((icon) => {
            icon.textContent = this.theme === "light" ? "🌙" : "☀️"
            icon.setAttribute("aria-label", this.theme === "light" ? "Switch to dark mode" : "Switch to light mode")
        })
    }

    getCurrentTheme() {
        return this.theme
    }
}

// Enhanced Mobile Menu Functionality
class MobileMenuManager {
    constructor() {
        this.isOpen = false
        this.init()
    }

    init() {
        const mobileToggle = document.getElementById("mobileMenuToggle")
        const navMenu = document.getElementById("navMenu")

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener("click", () => this.toggleMenu())

            // Close menu when clicking outside
            document.addEventListener("click", (e) => {
                if (this.isOpen && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                    this.closeMenu()
                }
            })

            // Close menu on escape key
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && this.isOpen) {
                    this.closeMenu()
                }
            })
        }
    }

    toggleMenu() {
        this.isOpen ? this.closeMenu() : this.openMenu()
    }

    openMenu() {
        this.isOpen = true
        const navMenu = document.getElementById("navMenu")
        const mobileToggle = document.getElementById("mobileMenuToggle")

        if (navMenu) {
            navMenu.style.display = "flex"
            navMenu.style.flexDirection = "column"
            navMenu.style.position = "absolute"
            navMenu.style.top = "100%"
            navMenu.style.left = "0"
            navMenu.style.right = "0"
            navMenu.style.background = "var(--bg-secondary)"
            navMenu.style.border = "1px solid var(--border-color)"
            navMenu.style.borderRadius = "var(--radius-xl)"
            navMenu.style.boxShadow = "var(--shadow-xl)"
            navMenu.style.padding = "var(--spacing-4)"
            navMenu.style.gap = "var(--spacing-2)"
            navMenu.style.zIndex = "1000"
            navMenu.classList.add("animate-fade-in-up")
        }

        if (mobileToggle) {
            const spans = mobileToggle.querySelectorAll("span")
            spans[0].style.transform = "rotate(45deg) translate(6px, 6px)"
            spans[1].style.opacity = "0"
            spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)"
        }
    }

    closeMenu() {
        this.isOpen = false
        const navMenu = document.getElementById("navMenu")
        const mobileToggle = document.getElementById("mobileMenuToggle")

        if (navMenu) {
            navMenu.style.display = "none"
            navMenu.classList.remove("animate-fade-in-up")
        }

        if (mobileToggle) {
            const spans = mobileToggle.querySelectorAll("span")
            spans[0].style.transform = ""
            spans[1].style.opacity = ""
            spans[2].style.transform = ""
        }
    }
}

// Enhanced Scroll Effects
class ScrollEffects {
    constructor() {
        this.init()
    }

    init() {
        // Add scroll-based navbar styling
        window.addEventListener("scroll", () => {
            const navbar = document.querySelector(".navbar")
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.style.background = "rgba(255, 255, 255, 0.95)"
                    navbar.style.backdropFilter = "blur(10px)"
                    navbar.style.boxShadow = "var(--shadow-lg)"
                } else {
                    navbar.style.background = "var(--bg-secondary)"
                    navbar.style.backdropFilter = "none"
                    navbar.style.boxShadow = "var(--shadow-sm)"
                }
            }
        })

        // Add intersection observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-fade-in-up")
                }
            })
        }, observerOptions)

        // Observe elements for animation
        const animateElements = document.querySelectorAll(".footer-section, .page-header, .section-title")
        animateElements.forEach((el) => observer.observe(el))
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new ThemeManager()
    new MobileMenuManager()
    new ScrollEffects()

    // Add smooth scrolling for anchor links
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
})

// Export for use in other scripts
window.ThemeManager = ThemeManager
window.MobileMenuManager = MobileMenuManager
window.ScrollEffects = ScrollEffects
