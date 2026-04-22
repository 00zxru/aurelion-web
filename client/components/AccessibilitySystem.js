// Phase 16: Accessibility & Error Handling System
// Comprehensive accessibility features and robust error handling

class AccessibilitySystem {
    constructor() {
        this.announcements = [];
        this.errorLog = [];
        this.settings = {
            reducedMotion: false,
            highContrast: false,
            largeText: false,
            screenReader: false,
            keyboardNavigation: true,
            focusVisible: true
        };
        this.keyboardShortcuts = new Map();
        this.errorHandlers = new Map();
        this.announcementQueue = [];
        this.isAnnouncing = false;
    }

    // Initialize accessibility system
    initialize() {
        this.loadSettings();
        this.setupKeyboardNavigation();
        this.setupScreenReaderSupport();
        this.setupErrorHandling();
        this.setupFocusManagement();
        this.setupAriaLabels();
        this.createAnnouncementRegion();
        this.addStyles();
        this.detectUserPreferences();
    }

    // Load accessibility settings
    loadSettings() {
        const saved = localStorage.getItem('aurelion-accessibility');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
        this.applySettings();
    }

    // Detect user preferences from system
    detectUserPreferences() {
        // Detect reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.settings.reducedMotion = true;
        }

        // Detect high contrast preference
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            this.settings.highContrast = true;
        }

        // Detect screen reader
        if (window.speechSynthesis) {
            this.settings.screenReader = true;
        }

        this.saveSettings();
        this.applySettings();
    }

    // Apply accessibility settings
    applySettings() {
        const root = document.documentElement;
        
        // Reduced motion
        if (this.settings.reducedMotion) {
            root.style.setProperty('--duration-base', '0ms');
            root.style.setProperty('--duration-fast', '0ms');
            root.style.setProperty('--duration-slow', '0ms');
            root.classList.add('reduced-motion');
        } else {
            root.classList.remove('reduced-motion');
        }

        // High contrast
        if (this.settings.highContrast) {
            root.classList.add('high-contrast');
        } else {
            root.classList.remove('high-contrast');
        }

        // Large text
        if (this.settings.largeText) {
            root.style.fontSize = '120%';
            root.classList.add('large-text');
        } else {
            root.style.fontSize = '';
            root.classList.remove('large-text');
        }

        // Focus visible
        if (this.settings.focusVisible) {
            root.classList.add('focus-visible');
        } else {
            root.classList.remove('focus-visible');
        }
    }

    // Save settings
    saveSettings() {
        localStorage.setItem('aurelion-accessibility', JSON.stringify(this.settings));
    }

    // Setup keyboard navigation
    setupKeyboardNavigation() {
        // Define keyboard shortcuts
        this.keyboardShortcuts.set('Alt+H', () => this.navigateTo('home'));
        this.keyboardShortcuts.set('Alt+P', () => this.navigateTo('profile'));
        this.keyboardShortcuts.set('Alt+W', () => this.navigateTo('works'));
        this.keyboardShortcuts.set('Alt+A', () => this.navigateTo('activity'));
        this.keyboardShortcuts.set('Alt+C', () => this.navigateTo('contact'));
        this.keyboardShortcuts.set('Alt+S', () => this.toggleAccessibilityPanel());
        this.keyboardShortcuts.set('Escape', () => this.handleEscape());
        this.keyboardShortcuts.set('Tab', () => this.handleTab());
        this.keyboardShortcuts.set('Shift+Tab', () => this.handleShiftTab());

        // Add keyboard event listeners
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardShortcut(event);
        });

        // Add focus management
        this.setupFocusTraps();
    }

    // Handle keyboard shortcuts
    handleKeyboardShortcut(event) {
        // Don't interfere with typing in inputs
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        const key = this.getKeyCombo(event);
        const handler = this.keyboardShortcuts.get(key);
        
        if (handler) {
            event.preventDefault();
            handler();
            this.announce(`Keyboard shortcut activated: ${key}`);
        }
    }

    // Get key combination string
    getKeyCombo(event) {
        const parts = [];
        if (event.altKey) parts.push('Alt');
        if (event.ctrlKey) parts.push('Ctrl');
        if (event.shiftKey) parts.push('Shift');
        if (event.metaKey) parts.push('Meta');
        parts.push(event.key);
        return parts.join('+');
    }

    // Navigate to section
    navigateTo(section) {
        const element = document.querySelector(`[data-section="${section}"]`);
        if (element) {
            element.focus();
            element.scrollIntoView({ behavior: 'smooth' });
            this.announce(`Navigated to ${section}`);
        }
    }

    // Setup screen reader support
    setupScreenReaderSupport() {
        // Create live region for announcements
        this.createAnnouncementRegion();

        // Add ARIA labels to dynamic content
        this.setupAriaLabels();

        // Setup screen reader shortcuts
        this.setupScreenReaderShortcuts();
    }

    // Create announcement region
    createAnnouncementRegion() {
        let announcementRegion = document.getElementById('aurelion-announcements');
        
        if (!announcementRegion) {
            announcementRegion = document.createElement('div');
            announcementRegion.id = 'aurelion-announcements';
            announcementRegion.setAttribute('aria-live', 'polite');
            announcementRegion.setAttribute('aria-atomic', 'true');
            announcementRegion.style.position = 'absolute';
            announcementRegion.style.left = '-10000px';
            announcementRegion.style.width = '1px';
            announcementRegion.style.height = '1px';
            announcementRegion.style.overflow = 'hidden';
            document.body.appendChild(announcementRegion);
        }
        
        this.announcementRegion = announcementRegion;
    }

    // Announce message to screen readers
    announce(message, priority = 'polite') {
        this.announcementQueue.push({ message, priority });
        this.processAnnouncementQueue();
    }

    // Process announcement queue
    processAnnouncementQueue() {
        if (this.isAnnouncing || this.announcementQueue.length === 0) {
            return;
        }

        this.isAnnouncing = true;
        const { message, priority } = this.announcementQueue.shift();

        // Set appropriate live region
        this.announcementRegion.setAttribute('aria-live', priority);
        this.announcementRegion.textContent = message;

        // Clear after announcement
        setTimeout(() => {
            this.announcementRegion.textContent = '';
            this.isAnnouncing = false;
            this.processAnnouncementQueue();
        }, 1000);
    }

    // Setup ARIA labels
    setupAriaLabels() {
        // Add ARIA labels to navigation
        const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
        navItems.forEach(item => {
            if (!item.getAttribute('aria-label')) {
                const text = item.textContent.trim();
                item.setAttribute('aria-label', `Navigate to ${text}`);
            }
        });

        // Add ARIA labels to buttons
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            const text = button.textContent.trim();
            if (text && !button.getAttribute('aria-label')) {
                button.setAttribute('aria-label', text);
            }
        });

        // Add ARIA labels to interactive elements
        this.addInteractiveLabels();
    }

    // Add labels to interactive elements
    addInteractiveLabels() {
        // Work cards
        const workCards = document.querySelectorAll('.work-card');
        workCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent || 'Work';
            card.setAttribute('role', 'article');
            card.setAttribute('aria-label', `Work: ${title}`);
        });

        // Activity items
        const activityItems = document.querySelectorAll('.activity-item');
        activityItems.forEach(item => {
            const title = item.querySelector('h3')?.textContent || 'Activity';
            item.setAttribute('role', 'article');
            item.setAttribute('aria-label', `Activity: ${title}`);
        });

        // Recognition items
        const recognitionItems = document.querySelectorAll('.recognition-item');
        recognitionItems.forEach(item => {
            const title = item.querySelector('h3')?.textContent || 'Recognition';
            item.setAttribute('role', 'article');
            item.setAttribute('aria-label', `Recognition: ${title}`);
        });
    }

    // Setup focus management
    setupFocusManagement() {
        // Focus trap for modals
        this.setupFocusTraps();

        // Skip to main content link
        this.createSkipLink();

        // Focus indicators
        this.setupFocusIndicators();
    }

    // Create skip to main content link
    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.setAttribute('aria-label', 'Skip to main content');
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Hide skip link when not focused
        skipLink.style.position = 'absolute';
        skipLink.style.left = '-9999px';
        skipLink.style.top = 'auto';
        skipLink.style.width = '1px';
        skipLink.style.height = '1px';
        skipLink.style.overflow = 'hidden';

        skipLink.addEventListener('focus', () => {
            skipLink.style.position = 'static';
            skipLink.style.left = 'auto';
            skipLink.style.width = 'auto';
            skipLink.style.height = 'auto';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.position = 'absolute';
            skipLink.style.left = '-9999px';
        });
    }

    // Setup focus indicators
    setupFocusIndicators() {
        const style = document.createElement('style');
        style.textContent = `
            .focus-visible *:focus {
                outline: 3px solid #c9a84c !important;
                outline-offset: 2px !important;
            }
            
            .skip-link:focus {
                position: static !important;
                left: auto !important;
                width: auto !important;
                height: auto !important;
                padding: 1rem !important;
                background: #c9a84c !important;
                color: #0a0a0a !important;
                text-decoration: none !important;
                font-weight: bold !important;
                z-index: 10000 !important;
            }
            
            .high-contrast {
                filter: contrast(1.5);
            }
            
            .high-contrast * {
                border-color: #ffffff !important;
                color: #000000 !important;
                background-color: #ffffff !important;
            }
            
            .high-contrast .gold-accent {
                color: #000000 !important;
                background-color: #ffff00 !important;
            }
            
            .large-text {
                font-size: 120% !important;
            }
            
            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Setup focus traps for modals
    setupFocusTraps() {
        const modals = document.querySelectorAll('.modal, .dialog');
        modals.forEach(modal => {
            this.trapFocus(modal);
        });
    }

    // Trap focus within element
    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // Setup error handling
    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.handleError(event.error, 'JavaScript Error');
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, 'Unhandled Promise Rejection');
        });

        // Network error handler
        window.addEventListener('online', () => {
            this.announce('Connection restored');
        });

        window.addEventListener('offline', () => {
            this.announce('Connection lost. Working in offline mode.');
        });
    }

    // Handle errors
    handleError(error, type = 'Error') {
        const errorInfo = {
            type,
            message: error.message || 'Unknown error',
            stack: error.stack || '',
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };

        this.errorLog.push(errorInfo);
        console.error(`[${type}]`, errorInfo);

        // Announce to screen readers
        this.announce(`Error occurred: ${errorInfo.message}`, 'assertive');

        // Show user-friendly error message
        this.showErrorMessage(errorInfo);

        // Log to service if available
        this.logError(errorInfo);
    }

    // Show error message to user
    showErrorMessage(errorInfo) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.setAttribute('role', 'alert');
        errorDiv.setAttribute('aria-live', 'assertive');
        errorDiv.innerHTML = `
            <h3>Something went wrong</h3>
            <p>${errorInfo.message}</p>
            <button onclick="this.parentElement.remove()">Dismiss</button>
        `;

        document.body.appendChild(errorDiv);

        // Auto-remove after 8 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 8000);
        
        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                errorDiv.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
        
        // Close on background click
        errorDiv.addEventListener('click', (e) => {
            if (e.target === errorDiv) {
                errorDiv.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        });
    }

    // Log error to service
    logError(errorInfo) {
        // In production, this would send to an error logging service
        if (window.fetch && !window.location.hostname.includes('localhost')) {
            fetch('/api/errors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(errorInfo)
            }).catch(() => {
                // Silently fail if error logging fails
            });
        }
    }

    // Handle escape key
    handleEscape() {
        // Close modals
        const modals = document.querySelectorAll('.modal.active, .dialog.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
            this.announce('Modal closed');
        });

        // Return focus to previous element
        if (this.previousFocus) {
            this.previousFocus.focus();
        }
    }

    // Handle tab key
    handleTab() {
        // Store current focus for potential return
        this.previousFocus = document.activeElement;
    }

    // Handle shift+tab
    handleShiftTab() {
        this.previousFocus = document.activeElement;
    }

    // Toggle accessibility panel
    toggleAccessibilityPanel() {
        const panel = document.getElementById('accessibility-panel');
        
        if (!panel) {
            this.createAccessibilityPanel();
            return;
        }

        if (panel.classList.contains('active')) {
            panel.classList.remove('active');
            this.announce('Accessibility panel closed');
        } else {
            panel.classList.add('active');
            panel.querySelector('button, input, select').focus();
            this.announce('Accessibility panel opened');
        }
    }

    // Create accessibility panel
    createAccessibilityPanel() {
        const panel = document.createElement('div');
        panel.id = 'accessibility-panel';
        panel.className = 'accessibility-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Accessibility Settings');
        panel.innerHTML = `
            <div class="panel-content">
                <h2>Accessibility Settings</h2>
                
                <div class="setting-group">
                    <label>
                        <input type="checkbox" id="reduced-motion" ${this.settings.reducedMotion ? 'checked' : ''}>
                        <span>Reduced Motion</span>
                    </label>
                </div>
                
                <div class="setting-group">
                    <label>
                        <input type="checkbox" id="high-contrast" ${this.settings.highContrast ? 'checked' : ''}>
                        <span>High Contrast</span>
                    </label>
                </div>
                
                <div class="setting-group">
                    <label>
                        <input type="checkbox" id="large-text" ${this.settings.largeText ? 'checked' : ''}>
                        <span>Large Text</span>
                    </label>
                </div>
                
                <div class="setting-group">
                    <label>
                        <input type="checkbox" id="focus-visible" ${this.settings.focusVisible ? 'checked' : ''}>
                        <span>Focus Indicators</span>
                    </label>
                </div>
                
                <div class="setting-group">
                    <label>
                        <input type="checkbox" id="screen-reader" ${this.settings.screenReader ? 'checked' : ''}>
                        <span>Screen Reader Support</span>
                    </label>
                </div>
                
                <div class="panel-actions">
                    <button onclick="accessibilitySystem.resetSettings()">Reset</button>
                    <button onclick="accessibilitySystem.closePanel()">Close</button>
                </div>
            </div>
        `;

        document.body.appendChild(panel);

        // Add event listeners
        panel.querySelector('#reduced-motion').addEventListener('change', (e) => {
            this.settings.reducedMotion = e.target.checked;
            this.saveSettings();
            this.applySettings();
        });

        panel.querySelector('#high-contrast').addEventListener('change', (e) => {
            this.settings.highContrast = e.target.checked;
            this.saveSettings();
            this.applySettings();
        });

        panel.querySelector('#large-text').addEventListener('change', (e) => {
            this.settings.largeText = e.target.checked;
            this.saveSettings();
            this.applySettings();
        });

        panel.querySelector('#focus-visible').addEventListener('change', (e) => {
            this.settings.focusVisible = e.target.checked;
            this.saveSettings();
            this.applySettings();
        });

        panel.querySelector('#screen-reader').addEventListener('change', (e) => {
            this.settings.screenReader = e.target.checked;
            this.saveSettings();
            this.applySettings();
        });

        // Trap focus
        this.trapFocus(panel);
        
        // Open panel
        panel.classList.add('active');
        panel.querySelector('button, input').focus();
        this.announce('Accessibility panel opened');
    }

    // Close accessibility panel
    closePanel() {
        const panel = document.getElementById('accessibility-panel');
        if (panel) {
            panel.classList.remove('active');
            this.announce('Accessibility panel closed');
        }
    }

    // Reset settings
    resetSettings() {
        this.settings = {
            reducedMotion: false,
            highContrast: false,
            largeText: false,
            screenReader: false,
            keyboardNavigation: true,
            focusVisible: true
        };
        this.saveSettings();
        this.applySettings();
        this.announce('Accessibility settings reset to defaults');
    }

    // Setup screen reader shortcuts
    setupScreenReaderShortcuts() {
        // Add screen reader specific shortcuts
        this.keyboardShortcuts.set('Alt+R', () => {
            this.announce('Screen reader mode activated');
            this.settings.screenReader = true;
            this.saveSettings();
            this.applySettings();
        });

        this.keyboardShortcuts.set('Alt+L', () => {
            this.announce('Current page: ' + document.title);
        });

        this.keyboardShortcuts.set('Alt+K', () => {
            const links = document.querySelectorAll('a[href]');
            this.announce(`${links.length} links found on this page`);
        });

        this.keyboardShortcuts.set('Alt+H', () => {
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            this.announce(`${headings.length} headings found on this page`);
        });
    }

    // Add CSS styles
    addStyles() {
        if (document.getElementById('accessibilitySystemStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'accessibilitySystemStyles';
        style.textContent = `
            .accessibility-panel {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--color-glass-bg);
                border: 2px solid var(--color-gold);
                border-radius: var(--radius-card);
                padding: var(--space-2xl);
                z-index: 10000;
                max-width: 400px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }

            .accessibility-panel.hidden {
                display: none;
            }

            .panel-content h2 {
                font-family: var(--font-display);
                font-size: var(--text-2xl);
                color: var(--color-gold);
                margin-bottom: var(--space-lg);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .setting-group {
                margin-bottom: var(--space-md);
            }

            .setting-group label {
                display: flex;
                align-items: center;
                gap: var(--space-sm);
                cursor: pointer;
                padding: var(--space-sm);
                border-radius: var(--radius-card);
                transition: background-color var(--duration-base) var(--ease-cinematic);
            }

            .setting-group label:hover {
                background: var(--color-glass-border);
            }

            .setting-group input[type="checkbox"] {
                width: 20px;
                height: 20px;
                accent-color: var(--color-gold);
            }

            .setting-group span {
                color: var(--color-text-primary);
                font-size: var(--text-base);
            }

            .panel-actions {
                display: flex;
                gap: var(--space-md);
                margin-top: var(--space-lg);
                justify-content: flex-end;
            }

            .panel-actions button {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                color: var(--color-text-primary);
                padding: var(--space-sm) var(--space-lg);
                border-radius: var(--radius-pill);
                font-size: var(--text-sm);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                cursor: pointer;
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .panel-actions button:hover {
                border-color: var(--color-gold);
                color: var(--color-gold);
            }

            .error-message {
                position: fixed;
                top: var(--space-lg);
                right: var(--space-lg);
                background: #dc2626;
                color: white;
                padding: var(--space-lg);
                border-radius: var(--radius-card);
                z-index: 10000;
                max-width: 400px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .error-message h3 {
                margin-bottom: var(--space-sm);
                font-size: var(--text-lg);
            }

            .error-message p {
                margin-bottom: var(--space-md);
                line-height: var(--leading-relaxed);
            }

            .error-message button {
                background: white;
                color: #dc2626;
                border: none;
                padding: var(--space-sm) var(--space-md);
                border-radius: var(--radius-pill);
                font-size: var(--text-sm);
                font-weight: 500;
                cursor: pointer;
            }

            @media (max-width: 768px) {
                .accessibility-panel {
                    width: 95%;
                    padding: var(--space-lg);
                }
                
                .error-message {
                    top: var(--space-md);
                    right: var(--space-md);
                    left: var(--space-md);
                    max-width: none;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Static method to initialize
    static init() {
        const accessibilitySystem = new AccessibilitySystem();
        accessibilitySystem.initialize();
        return accessibilitySystem;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilitySystem;
} else {
    window.AccessibilitySystem = AccessibilitySystem;
}
