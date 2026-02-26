// This function decides how your links are built
export function getProjectLink(id) {
    // Current way (Local testing)
    return `./projects/index.html?id=${id}`;

}

export function getRootPath() {
    // If we are on GitHub Pages subfolder, return the repo name, otherwise root
    return window.location.hostname.includes('github.io') 
        ? '/SITE-FERNANDO/' 
        : '/';
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
        aboutTitle: "Motion Design",
        aboutDescription: "Sou motion designer com 10 anos de experiência, atuando como generalista com foco em animação 2D, 3D e ilustração. Trabalho no desenvolvimento de projetos que combinam narrativa visual, motion systems, linguagem de movimento e branding, explorando o motion como ferramenta de comunicação, estrutura visual e construção de identidade. Atualmente, atuo como motion designer na NOO Works, baseado no Rio de Janeiro, participando de projetos para marcas, estúdios e plataformas digitais. Meu trabalho transita entre projetos autorais e comerciais, sempre buscando clareza visual, consistência estética e soluções criativas orientadas por conceito.",
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