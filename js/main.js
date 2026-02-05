import { projects } from './projects.js';
import { getProjectLink } from './utils.js';
import { setLanguage } from './utils.js';

window.changeLang = (lang) => {
    setLanguage(lang);
};

function initGallery() {
    const grid = document.querySelector('#work-grid');
    if (!grid) return;

    projects.forEach(project => {
        const card = document.createElement('article');
        card.className = 'project-card';
        
        let previewSrc = project.preview;
        let posterSrc = '';
        const isCloudinary = previewSrc.includes('cloudinary.com');

        if (isCloudinary) {
            // 1. Optimized Video Source: Auto format, auto quality, resized
            const videoBase = previewSrc.replace('/upload/', '/upload/f_auto,q_auto,w_800/');
            
            // 2. Poster Source: First frame (so_0), optimized, resized, and forced to .jpg
            posterSrc = previewSrc
                .replace('/upload/', '/upload/f_auto,q_auto,w_800,so_0/')
                .replace(/\.[^/.]+$/, ".jpg"); 

            previewSrc = videoBase;
        } else {
            // Fallback for local files
            previewSrc = project.folder + project.preview;
        }

        card.innerHTML = `
            <a href="${getProjectLink(project.id)}">
                <video 
                    src="${previewSrc}" 
                    ${posterSrc ? `poster="${posterSrc}"` : ''}
                    muted loop playsinline 
                    preload="metadata">
                </video>
                <h3 class="card-title">${project.title}</h3>
            </a>
        `;

        const video = card.querySelector('video');

        // Logic to play/pause on hover
        card.addEventListener('mouseenter', () => {
            video.play().catch(error => {
                // Common in some browsers if user hasn't interacted with the page yet
                console.warn("Autoplay prevented:", error);
            });
        });

        card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0; 
        });

        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', initGallery);