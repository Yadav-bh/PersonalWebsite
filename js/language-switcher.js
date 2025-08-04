document.addEventListener('DOMContentLoaded', function() {
    const languageSwitcher = document.getElementById('languageSwitcher');
    if (!languageSwitcher) return;

    // Language translations object
    const translations = {
        en: {
            // Navbar
            'home': 'Home',
            'about': 'About',
            'education': 'Education',
            'services': 'Services',
            'portfolio': 'Portfolio',
            'blog': 'Blog',
            'testimonials': 'Testimonials',
            'contact': 'Contact',
            // Add more translations as needed
        },
        np: {
            // Navbar
            'home': 'गृहपृष्ठ',
            'about': 'हाम्रो बारेमा',
            'education': 'शिक्षा',
            'services': 'सेवाहरू',
            'portfolio': 'पोर्टफोलियो',
            'blog': 'ब्लग',
            'testimonials': 'प्रशंसापत्र',
            'contact': 'सम्पर्क',
            // Add more translations as needed
        }
    };

    // Function to set language
    function setLanguage(lang) {
        // Update active state in the UI
        document.querySelectorAll('.language-option').forEach(option => {
            option.classList.toggle('active', option.dataset.lang === lang);
        });

        // Save preference to localStorage
        localStorage.setItem('preferredLanguage', lang);

        // Update the document language attribute
        document.documentElement.lang = lang;

        // Update text content based on language
        updateTextContent(lang);
    }

    // Function to update text content based on language
    function updateTextContent(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }

    // Event delegation for language switcher
    languageSwitcher.addEventListener('click', function(e) {
        const target = e.target.closest('.language-option');
        if (!target) return;
        
        const lang = target.dataset.lang;
        setLanguage(lang);
    });

    // Initialize with saved language or default to English
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLanguage);
});
