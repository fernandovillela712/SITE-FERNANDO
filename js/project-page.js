import { projects } from './projects.js';
import { getLanguage } from '/js/utils.js';
import { translateUI } from './global.js';

/**
 * HELPER: Handles all media URL logic in one place.
 */
const resolveMedia = (asset, projectFolder, type = 'image') => {
    const isCloudinary = asset.url && asset.url.includes('cloudinary.com');
    let src = asset.url || (projectFolder + asset.src);

    if (isCloudinary) {
        src = src.replace('/upload/', '/upload/f_auto,q_auto/');
        const poster = type === 'video' 
            ? asset.url.replace('/upload/', '/upload/f_auto,q_auto,so_0/').replace(/\.[^/.]+$/, ".jpg")
            : null;
            
        return { src, poster, isCloudinary };
    }
    return { src, poster: null, isCloudinary: false };
};

/**
 * COMPONENTS: Reusable HTML generators
 */
const Components = {
    image: (asset, folder, style = "") => {
        const { src } = resolveMedia(asset, folder, 'image');
        return `<img src="${src}" class="grid-item" ${style} loading="lazy">`;
    },

    video: (asset, folder, style = "", isFullWidth = false) => {
        const { src, poster } = resolveMedia(asset, folder, 'video');
        const className = isFullWidth ? 'video-block' : 'grid-item';
        return `
            <video autoplay loop muted playsinline class="${className}" ${style} ${poster ? `poster="${poster}"` : ''}>
                <source src="${src}" type="video/mp4">
            </video>`;
    },

    youtube: (id, style = "") => `
        <div class="grid-youtube grid-item" ${style}>
            <iframe src="https://www.youtube.com/embed/${id}?rel=0" frameborder="0" allowfullscreen loading="lazy"></iframe>
        </div>`
};

/**
 * MAIN RENDERER
 */
function renderProject(project, lang) {
    const container = document.querySelector('#project-content');
    if (!container) return;

    const contentHTML = project.content.map(block => {
        switch (block.type) {
            case 'text':
                return `
                    <section class="block text-block">
                        <div class="text-container">
                            ${block.title ? `<h2 class="text-block-title">${block.title[lang]}</h2>` : ""}
                            <p>${block.text[lang]}</p>
                        </div>
                    </section>`;

            case 'video':
                const isCloudinary = block.url && block.url.includes('cloudinary.com');
                const videoHTML = isCloudinary 
                    ? Components.video(block, project.folder, "", true)
                    : Components.youtube(block.id);
                return `${videoHTML}`;

            case 'grid':
                const assetsHTML = block.assets.map(asset => {
                    const style = `style="${(asset.span ? `grid-column: span ${asset.span};` : '') + (asset.rowSpan ? `grid-row: span ${asset.rowSpan};` : '')}"`;
                    
                    if (asset.type === 'image') return Components.image(asset, project.folder, style);
                    if (asset.type === 'video') return Components.video(asset, project.folder, style);
                    if (asset.type === 'youtube') return Components.youtube(asset.id, style);
                }).join('');

                return `<section class="grid-block" style="--columns: ${block.columns || 3}">${assetsHTML}</section>`;
        }
    }).join('');

    container.innerHTML = `
        <main class="project-detail">
            <header class="project-header">
                <h1 class="project-title">${project.title}</h1>
                <ul class="project-categories">${project.categories.map(c => `<li>${c}</li>`).join('')}</ul>
            </header>
            <div class="project-body">${contentHTML}</div>
            ${renderCredits(project.credits, lang)}
            <footer class="project-footer"><a href="../index.html" class="back-link" data-label="back"></a></footer>
        </main>
    `;
    translateUI();
}

function renderCredits(credits, lang) {
    if (!credits || !credits[lang]) return "";
    return `
        <div class="project-credits">
            ${Object.entries(credits[lang]).map(([role, name]) => `
                <div class="credit-row"><span class="credit-role">${role}</span><span class="credit-name">${name}</span></div>
            `).join('')}
        </div>`;
}

/**
 * INITIALIZATION LOGIC
 * This finds the project and triggers the renderProject function.
 */
function initProjectDetail() {
    const lang = getLanguage();
    
    // Get ID from URL
    let id = new URLSearchParams(window.location.search).get('id');
    if (!id) {
        id = window.location.pathname.split('/').pop();
    }

    const project = projects.find(p => p.id === id);
    
    if (project) {
        // This updates the browser tab name
        document.title = `${project.title}`; // NAME THE PAGE!!!
        renderProject(project, lang);
    } else {
        const container = document.querySelector('#project-content');
        if (container) {
            container.innerHTML = `<h1>Project not found</h1><a href="../index.html">Go Back</a>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', initProjectDetail);