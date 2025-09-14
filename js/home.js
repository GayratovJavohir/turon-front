// Home page specific JavaScript

// Partners slider functionality
function initPartnersSlider() {
    const track = document.querySelector(".partners-track")
    if (!track) return

    // Clone items for seamless loop
    const items = track.children
    const itemCount = items.length / 2 // We already have duplicates in HTML

    // Add click handlers to partner items
    Array.from(items).forEach((item, index) => {
        item.addEventListener("click", () => {
            // Here you would typically open a modal or navigate to partner page
            console.log(`Partner ${index + 1} clicked`)
            // For demo purposes, we'll just show an alert
            alert(`Redirecting to partner ${index + 1} website...`)
        })
    })
}

// News card interactions
function initNewsCards() {
    const newsCards = document.querySelectorAll(".news-card")

    newsCards.forEach((card) => {
        card.addEventListener("click", () => {
            // Navigate to news detail page
            const title = card.querySelector(".news-card-title").textContent
            const slug = title
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "")
            window.location.href = `news-detail.html?slug=${slug}`
        })
    })
}

// Gallery tab functionality
function initGalleryTabs() {
    const galleryTabs = document.querySelectorAll(".gallery-tab")

    galleryTabs.forEach((tab) => {
        tab.addEventListener("click", function (e) {
            e.preventDefault()

            // Remove active class from all tabs
            galleryTabs.forEach((t) => t.classList.remove("active"))

            // Add active class to clicked tab
            this.classList.add("active")

            // Here you would typically load different gallery content
            const type = new URL(this.href).searchParams.get("type")
            console.log(`Loading ${type} gallery...`)
        })
    })
}

// Hero stats animation
function animateStats() {
    const stats = document.querySelectorAll(".hero-stat-number")

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target
                const finalValue = Number.parseInt(target.textContent)
                let currentValue = 0
                const increment = finalValue / 50 // Animation duration

                const timer = setInterval(() => {
                    currentValue += increment
                    if (currentValue >= finalValue) {
                        currentValue = finalValue
                        clearInterval(timer)
                    }
                    target.textContent = Math.floor(currentValue) + "+"
                }, 30)

                observer.unobserve(target)
            }
        })
    })

    stats.forEach((stat) => observer.observe(stat))
}

// Initialize home page functionality
document.addEventListener("DOMContentLoaded", () => {
    // Wait a bit for components to load
    setTimeout(() => {
        initPartnersSlider()
        initNewsCards()
        initGalleryTabs()
        animateStats()
    }, 200)
})

// Handle hero button clicks
document.addEventListener("click", (e) => {
    if (e.target.matches(".hero-buttons .btn")) {
        // Add click animation
        e.target.style.transform = "scale(0.95)"
        setTimeout(() => {
            e.target.style.transform = ""
        }, 150)
    }
})
