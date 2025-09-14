document.addEventListener("DOMContentLoaded", () => {
    const filterBtns = document.querySelectorAll(".filter-btn")
    const eventCards = document.querySelectorAll(".event-card")

    filterBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
            // Remove active class from all buttons
            filterBtns.forEach((b) => b.classList.remove("active"))
            // Add active class to clicked button
            this.classList.add("active")

            const filter = this.getAttribute("data-filter")

            eventCards.forEach((card) => {
                if (filter === "all") {
                    card.classList.remove("hidden")
                } else if (card.classList.contains(filter)) {
                    card.classList.remove("hidden")
                } else {
                    card.classList.add("hidden")
                }
            })
        })
    })
})
