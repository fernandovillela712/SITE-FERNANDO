// js/navbar.js
import { setLanguage } from './utils.js';

// Define the custom element
class MyNavbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar">
                <div class="nav-container">
                    <a href="/index.html" class="logo">FERNANDO VILLELA</a>
                    
                    <button class="menu-toggle" aria-label="Toggle Menu">
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </button>

                    <div class="nav-menu">
                        <div class="nav-links">
                            <a href="/index.html" class="nav-item" data-label="work">Work</a>
                            <a href="/about/index.html" class="nav-item" data-label="about">About</a>
                            <!--<a href="mailto:you@email.com" class="nav-item contact-btn" data-label="contact">Contact</a>-->
                        </div>
                        
                        <div class="lang-switcher">
                            <button id="btn-pt">PT</button>
                            <span class="separator">/</span>
                            <button id="btn-en">EN</button>
                        </div>
                    </div>
                </div>
            </nav>
        `;

        // Add event listeners inside the component
        this.querySelector('#btn-pt').addEventListener('click', () => setLanguage('pt'));
        this.querySelector('#btn-en').addEventListener('click', () => setLanguage('en'));

        const toggleBtn = this.querySelector('.menu-toggle');
        const navMenu = this.querySelector('.nav-menu');

        toggleBtn.addEventListener('click', () => {
            toggleBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        this.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                toggleBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Signal that the navbar is ready to be translated
        this.dispatchEvent(new CustomEvent('navbar-loaded', { bubbles: true }));

        const page = document.body.getAttribute('data-current');

        // ACTIVE PAGE
        this.querySelectorAll('.nav-links a').forEach(link => {
            if (link.getAttribute('data-label') === page) {
                link.classList.add('active');
            }
        });
    }
}

// Register the tag <my-navbar>
customElements.define('my-navbar', MyNavbar);