// This function decides how your links are built
export function getProjectLink(id) {
    // Current way (Local testing)
    return `/templates/project.html?id=${id}`;
    
    // Future way (Deployment)
    // return `/${id}`; 
}


// LANGUAGE

export function getLanguage() {
    return localStorage.getItem('site-lang') || 'pt'; // Default to PT
}

export function setLanguage(lang) {
    localStorage.setItem('site-lang', lang);
    window.location.reload(); // Refresh to apply changes
}

export const dictionary = {
    pt: {
        work: "Trabalho",
        about: "Sobre",
        contact: "Contato",
        back: "Voltar",
        aboutTitle: "Motion Design & Ilustração",
        aboutDescription: "Focado em criar experiências visuais que contam histórias. Com 5 anos de experiência no mercado de...",
    },
    en: {
        work: "Work",
        about: "About",
        contact: "Contact",
        back: "Back",
        aboutTitle: "Motion Design & Illustration",
        aboutDescription: "Focused on creating visual experiences that tell stories. With 5 years of experience in the market...",
    }
};