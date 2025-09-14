document.addEventListener("DOMContentLoaded", () => {
    const filterBtns = document.querySelectorAll(".filter-btn")
    const galleryItems = document.querySelectorAll(".gallery-item")

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            // Remove active class from all buttons
            filterBtns.forEach((b) => b.classList.remove("active"))
            // Add active class to clicked button
            this.classList.add("active")

            const filter = this.getAttribute("data-filter")

            galleryItems.forEach((item) => {
                if (filter === "all") {
                    item.classList.remove("hidden")
                } else if (item.classList.contains(filter)) {
                    item.classList.remove("hidden")
                } else {
                    item.classList.add("hidden")
                }
            })
        })
    })

    // Add click event to gallery items for modal (future enhancement)
    galleryItems.forEach((item) => {
        item.addEventListener("click", function () {
            // Future: Open modal with larger image
            console.log("Gallery item clicked:", this)
        })
    })
})
