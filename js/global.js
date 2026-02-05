import { getLanguage, setLanguage, dictionary } from './utils.js';

// Makes the language switcher clickable
window.changeLang = (lang) => {
    setLanguage(lang);
};

export function translateUI() {
    const lang = getLanguage(); // e.g., 'pt'

    // 1. Translate all text labels (Work, About, etc.)
    const elements = document.querySelectorAll('[data-label]');
    elements.forEach(el => {
        const key = el.getAttribute('data-label');
        if (dictionary[lang] && dictionary[lang][key]) {
            el.textContent = dictionary[lang][key];
        }
    });

    // 2. Update the Toggle Buttons (Bold/Faded state)
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
        // This adds the 'active' class if the ID matches the current lang
        btn.classList.toggle('active', btn.id === `btn-${lang}`);
    });
}


// RUN LOGIC:
// 1. Run on initial load for any static HTML
document.addEventListener('DOMContentLoaded', translateUI);

// 2. Run again specifically when the navbar component finishes injecting itself
document.addEventListener('navbar-loaded', translateUI);