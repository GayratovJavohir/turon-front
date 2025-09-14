// Main JavaScript functionality for the website

document.addEventListener("DOMContentLoaded", () => {
    // Initialize theme
    initializeTheme()

    // Initialize mobile menu
    initializeMobileMenu()

    // Initialize language switcher
    initializeLanguageSwitcher()

    // Initialize gallery functionality
    initializeGallery()

    // Initialize forms
    initializeForms()

    // Initialize patterns animation
    initializePatternsAnimation()

    // Initialize smooth scrolling
    initializeSmoothScrolling()
})

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById("themeToggle")
    const themeIcon = document.querySelector(".theme-icon")

    // Load saved theme
    const savedTheme = localStorage.getItem("theme") || "light"
    document.documentElement.setAttribute("data-theme", savedTheme)
    updateThemeIcon(savedTheme, themeIcon)

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme")
            const newTheme = currentTheme === "dark" ? "light" : "dark"

            document.documentElement.setAttribute("data-theme", newTheme)
            localStorage.setItem("theme", newTheme)
            updateThemeIcon(newTheme, themeIcon)
        })
    }
}

function updateThemeIcon(theme, iconElement) {
    if (iconElement) {
        iconElement.textContent = theme === "dark" ? "☀️" : "🌙"
    }
}

// Mobile Menu Management
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById("mobileMenuToggle")
    const navMenu = document.getElementById("navMenu")

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active")
            mobileMenuToggle.classList.toggle("active")
        })

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove("active")
                mobileMenuToggle.classList.remove("active")
            }
        })
    }
}

function initializeLanguageSwitcher() {
    const languageSelect = document.getElementById("languageSelect")

    if (languageSelect) {
        // Set initial value
        const currentLang = window.translationManager ? window.translationManager.currentLanguage : "en"
        languageSelect.value = currentLang

        languageSelect.addEventListener("change", function () {
            const selectedLang = this.value
            if (window.translationManager) {
                window.translationManager.setLanguage(selectedLang)
            }
        })
    }

    // Handle language buttons on landing page
    const languageButtons = document.querySelectorAll(".language-btn")
    languageButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
            const lang = this.getAttribute("data-lang")
            if (lang && window.translationManager) {
                window.translationManager.setLanguage(lang)
            }
        })
    })
}

// Gallery Functionality
function initializeGallery() {
    const galleryItems = document.querySelectorAll(".gallery-item")

    galleryItems.forEach((item) => {
        item.addEventListener("click", function () {
            const img = this.querySelector(".gallery-image")
            if (img) {
                openLightbox(img.src, img.alt)
            }
        })
    })

    // Video play buttons
    const playButtons = document.querySelectorAll(".play-button")
    playButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.stopPropagation()
            // Add video play functionality here
            console.log("Play video")
        })
    })
}

function openLightbox(src, alt) {
    // Create lightbox overlay
    const lightbox = document.createElement("div")
    lightbox.className = "lightbox-overlay"
    lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `

    lightbox.innerHTML = `
    <div class="lightbox-content" style="position: relative; max-width: 90%; max-height: 90%;">
      <img src="${src}" alt="${alt}" class="lightbox-image" style="max-width: 100%; max-height: 100%; object-fit: contain;">
      <button class="lightbox-close" style="position: absolute; top: -40px; right: 0; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">&times;</button>
    </div>
  `

    document.body.appendChild(lightbox)
    document.body.style.overflow = "hidden"

    // Fade in
    setTimeout(() => {
        lightbox.style.opacity = "1"
    }, 10)

    // Close lightbox
    const closeBtn = lightbox.querySelector(".lightbox-close")
    closeBtn.addEventListener("click", closeLightbox)
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox()
        }
    })

    function closeLightbox() {
        lightbox.style.opacity = "0"
        setTimeout(() => {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox)
            }
            document.body.style.overflow = ""
        }, 300)
    }
}

// Form Management
function initializeForms() {
    const forms = document.querySelectorAll("form")

    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault()

            // Basic form validation
            const inputs = form.querySelectorAll("input[required], textarea[required]")
            let isValid = true

            inputs.forEach((input) => {
                if (!input.value.trim()) {
                    isValid = false
                    input.classList.add("error")
                } else {
                    input.classList.remove("error")
                }
            })

            if (isValid) {
                // Show success message
                showNotification("Form submitted successfully!", "success")
                form.reset()
            } else {
                showNotification("Please fill in all required fields.", "error")
            }
        })
    })
}

function showNotification(message, type) {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    ${type === "success" ? "background: #10B981;" : "background: #EF4444;"}
  `
    notification.textContent = message

    document.body.appendChild(notification)

    setTimeout(() => {
        notification.style.transform = "translateX(0)"
    }, 100)

    setTimeout(() => {
        notification.style.transform = "translateX(100%)"
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification)
            }
        }, 300)
    }, 3000)
}

function initializePatternsAnimation() {
    const patterns = document.querySelectorAll(".pattern-corner")

    patterns.forEach((pattern, index) => {
        // Add subtle floating animation with different delays
        pattern.style.animationDelay = `${index * 0.5}s`

        // Add hover effect
        pattern.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.1) rotate(10deg)"
            this.style.transition = "transform 0.3s ease"
        })

        pattern.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1) rotate(0deg)"
        })
    })
}

function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]')

    links.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href").substring(1)
            const targetElement = document.getElementById(targetId)

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                })
            }
        })
    })
}

// Utility Functions
function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

// No register buttons or filter buttons needed

// Add CSS for error states and animations
const additionalStyles = `
  <style>
    .error {
      border-color: #EF4444 !important;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .nav-menu.active {
      display: flex !important;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background: var(--surface-color);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      box-shadow: var(--shadow-medium);
      padding: 1rem;
      gap: 0.5rem;
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
    
    @media (max-width: 768px) {
      .nav-menu {
        display: none;
      }
    }
  </style>
`

// Inject additional styles
document.head.insertAdjacentHTML("beforeend", additionalStyles)
