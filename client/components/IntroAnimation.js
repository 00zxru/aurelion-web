// Phase 5A: Intro Animation Sequence
// One-time per session cinematic entrance

class IntroAnimation {
    constructor() {
        this.isPlaying = false;
        this.sequenceTimers = [];
        this.sessionKey = 'aurelion_intro_played';
    }

    // Check if intro should play
    shouldPlay() {
        return !sessionStorage.getItem(this.sessionKey);
    }

    // Start the complete intro sequence
    start() {
        if (this.isPlaying || !this.shouldPlay()) return;
        
        this.isPlaying = true;
        this.createOverlay();
        this.runSequence();
    }

    // Create the overlay container
    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.id = 'introOverlay';
        this.overlay.innerHTML = `
            <div class="intro-background"></div>
            <div class="star-field" id="introStarField"></div>
            <div class="solar-glow" id="solarGlow"></div>
            <div class="sun-rays" id="sunRays"></div>
            <div class="wordmark" id="introWordmark"></div>
        `;
        
        // Add styles
        this.addStyles();
        
        // Append to body
        document.body.appendChild(this.overlay);
        
        // Initialize star field
        this.createStarField();
    }

    // Create intro star field
    createStarField() {
        const starField = document.getElementById('introStarField');
        if (!starField) return;
        
        const starCount = 100;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'intro-star';
            star.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: ${this.colors.light};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            starField.appendChild(star);
        }
    }

    // Run the timed animation sequence
    runSequence() {
        const sequence = [
            { time: 0, action: () => this.showBackground() },
            { time: 600, action: () => this.showStars() },
            { time: 1400, action: () => this.showSolarGlow() },
            { time: 1800, action: () => this.showSunRays() },
            { time: 2600, action: () => this.showWordmark() },
            { time: 3200, action: () => this.holdSequence() },
            { time: 3800, action: () => this.fadeOut() },
            { time: 4200, action: () => this.complete() }
        ];

        sequence.forEach(({ time, action }) => {
            const timer = setTimeout(action, time);
            this.sequenceTimers.push(timer);
        });
    }

    // Sequence steps
    showBackground() {
        this.overlay.style.opacity = '1';
    }

    showStars() {
        const stars = this.overlay.querySelectorAll('.intro-star');
        stars.forEach((star, index) => {
            setTimeout(() => {
                star.style.opacity = star.style.opacity || '0.7';
                star.style.transform = 'scale(1)';
            }, index * 10);
        });
    }

    showSolarGlow() {
        const glow = document.getElementById('solarGlow');
        if (glow) {
            glow.style.opacity = '0.6';
            glow.style.transform = 'scale(1)';
        }
    }

    showSunRays() {
        const rays = document.getElementById('sunRays');
        if (rays) {
            rays.style.opacity = '0.8';
            rays.style.transform = 'scale(1) rotate(0deg)';
        }
    }

    showWordmark() {
        const wordmark = document.getElementById('introWordmark');
        if (wordmark) {
            wordmark.style.opacity = '1';
            wordmark.style.transform = 'translateY(0) scale(1)';
            wordmark.style.letterSpacing = '0.4em';
        }
    }

    holdSequence() {
        // Brief pause at peak
    }

    fadeOut() {
        this.overlay.style.opacity = '0';
        this.overlay.style.pointerEvents = 'none';
    }

    complete() {
        this.cleanup();
        sessionStorage.setItem(this.sessionKey, 'true');
        this.isPlaying = false;
    }

    // Cleanup resources
    cleanup() {
        this.sequenceTimers.forEach(timer => clearTimeout(timer));
        this.sequenceTimers = [];
        
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
        }
        
        // Make main content interactive
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.pointerEvents = 'auto';
        }
    }

    // Add CSS styles for the animation
    addStyles() {
        if (document.getElementById('introAnimationStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'introAnimationStyles';
        style.textContent = `
            #introOverlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: #060606;
                z-index: 9999;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.6s ease;
                overflow: hidden;
            }

            .intro-background {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at center, #0a0a0a 0%, #060606 100%);
            }

            #introStarField {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            .intro-star {
                transform: scale(0);
                transition: all 0.8s ease;
            }

            #solarGlow {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 300px;
                height: 300px;
                transform: translate(-50%, -50%) scale(0.3);
                background: radial-gradient(circle, 
                    rgba(232, 200, 122, 0.8) 0%, 
                    rgba(201, 168, 76, 0.4) 50%, 
                    transparent 100%);
                border-radius: 50%;
                opacity: 0;
                transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
            }

            #sunRays {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 400px;
                height: 400px;
                transform: translate(-50%, -50%) scale(0) rotate(0deg);
                opacity: 0;
                transition: all 1.5s cubic-bezier(0.22, 1, 0.36, 1);
            }

            .sun-ray {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 2px;
                height: 180px;
                background: linear-gradient(to bottom, 
                    rgba(232, 200, 122, 0.6), 
                    transparent);
                transform-origin: center top;
                opacity: 0.8;
            }

            #introWordmark {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) translateY(20px) scale(0.9);
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 4rem;
                color: #c9a84c;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                opacity: 0;
                transition: all 1.5s cubic-bezier(0.22, 1, 0.36, 1);
                text-align: center;
                white-space: nowrap;
            }

            @keyframes twinkle {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 0.8; }
            }

            @keyframes rayRotate {
                from { transform: translate(-50%, -50%) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg); }
            }

            #sunRays {
                animation: rayRotate 60s linear infinite;
            }
        `;
        
        document.head.appendChild(style);
    }

    // Color palette
    get colors() {
        return {
            light: '#e8c87a',
            gold: '#c9a84c',
            muted: '#8a6f3a'
        };
    }

    // Static method to start intro
    static start() {
        const intro = new IntroAnimation();
        intro.start();
        return intro;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntroAnimation;
} else {
    window.IntroAnimation = IntroAnimation;
}
