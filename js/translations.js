class TranslationManager {
    constructor() {
        this.currentLanguage = this.getLanguageFromURL() || localStorage.getItem("language") || "en"
        this.translations = {}
        this.loadTranslations()
    }

    getLanguageFromURL() {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get("lang")
    }

    async loadTranslations() {
        try {
            const response = await fetch("js/translations.json")
            this.translations = await response.json()
            this.updatePageContent()
        } catch (error) {
            console.error("Failed to load translations:", error)
        }
    }

    setLanguage(lang) {
        this.currentLanguage = lang
        localStorage.setItem("language", lang)
        this.updatePageContent()

        // Update language selector
        const languageSelect = document.getElementById("languageSelect")
        if (languageSelect) {
            languageSelect.value = lang
        }

        // Update URL parameter
        const url = new URL(window.location)
        url.searchParams.set("lang", lang)
        window.history.replaceState({}, "", url)
    }

    translate(key) {
        const keys = key.split(".")
        let value = this.translations[this.currentLanguage]

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k]
            } else {
                return key // Return key if translation not found
            }
        }

        return value || key
    }

    updatePageContent() {
        const elementsWithTranslations = document.querySelectorAll("[data-translate]")

        elementsWithTranslations.forEach((element) => {
            const key = element.getAttribute("data-translate")
            const translation = this.translate(key)

            if (element.tagName === "INPUT" && element.type === "submit") {
                element.value = translation
            } else if (element.tagName === "INPUT" && element.placeholder) {
                element.placeholder = translation
            } else {
                element.textContent = translation
            }
        })

        // Update document title based on page
        const pageTitle = document.title
        if (pageTitle.includes("Home")) {
            document.title = `${this.translate("nav.home")} - International Turon Federation`
        } else if (pageTitle.includes("About")) {
            document.title = `${this.translate("nav.about")} - International Turon Federation`
        } else if (pageTitle.includes("News")) {
            document.title = `${this.translate("nav.news")} - International Turon Federation`
        } else if (pageTitle.includes("Events")) {
            document.title = `${this.translate("nav.events")} - International Turon Federation`
        } else if (pageTitle.includes("Gallery")) {
            document.title = `${this.translate("nav.gallery")} - International Turon Federation`
        } else if (pageTitle.includes("Contact")) {
            document.title = `${this.translate("nav.contact")} - International Turon Federation`
        }
    }
}

// Initialize translation manager
const translationManager = new TranslationManager()

// Export for use in other scripts
window.translationManager = translationManager
