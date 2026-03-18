let tooltipTimeout;
const HOVER_DELAY = 500; // 1 miessegundo

const Tooltip = {
    el: null,

    init() {
        // Create the tooltip element once
        this.el = document.createElement('div');
        this.el.className = 'custom-tooltip';
        document.body.appendChild(this.el);

        // Global listeners for efficiency
        document.addEventListener('mouseover', (e) => this.handleMouseOver(e));
        document.addEventListener('mouseout', (e) => this.handleMouseOut(e));
        document.addEventListener('mousemove', (e) => this.moveTooltip(e));
    },

    handleMouseOver(e) {
        const target = e.target.closest('[data-tooltip]');
        if (!target) return;

        const text = target.getAttribute('data-tooltip');

        // Start the timer
        tooltipTimeout = setTimeout(() => {
            this.el.textContent = text;
            this.el.classList.add('is-active');
        }, HOVER_DELAY);
    },

    handleMouseOut() {
        clearTimeout(tooltipTimeout);
        this.el.classList.remove('is-active');
    },

    moveTooltip(e) {
        // Offset the tooltip slightly from the cursor so it doesn't flicker
        const x = e.clientX + 15;
        const y = e.clientY + 15;
        
        this.el.style.transform = `translate(${x}px, ${y}px)`;
    }
};

// Initialize when the script loads
Tooltip.init();