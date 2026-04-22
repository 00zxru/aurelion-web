// Phase 5C: Exaggerated Landing Motion (Hero Only)
// Parallax, floating gold dust, solar flare sweeps, edge vignette

class LandingMotion {
    constructor() {
        this.isActive = false;
        this.particles = [];
        this.flares = [];
        this.parallaxElements = [];
        this.animationFrame = null;
    }

    // Initialize landing motion for hero section only
    initialize() {
        if (this.isActive) return;
        
        const hero = document.querySelector('.hero');
        if (!hero) return;

        this.isActive = true;
        this.hero = hero;
        
        // Create parallax layers
        this.createParallaxLayers();
        
        // Create floating gold dust
        this.createGoldDust();
        
        // Create solar flare sweeps
        this.createSolarFlares();
        
        // Create edge vignette
        this.createVignette();
        
        // Start animation loop
        this.startAnimationLoop();
        
        // Add scroll listener for parallax
        this.addScrollListener();
    }

    // Create parallax layers for hero elements
    createParallaxLayers() {
        // Background stars (slowest)
        const stars = this.hero.querySelector('.hero-stars');
        if (stars) {
            this.parallaxElements.push({
                element: stars,
                speed: 0.2,
                baseY: 0
            });
        }

        // Solar halo (medium)
        const halo = this.hero.querySelector('.hero-solar-halo');
        if (halo) {
            this.parallaxElements.push({
                element: halo,
                speed: 0.5,
                baseY: 0
            });
        }

        // Hero content (foreground, normal speed)
        const content = this.hero.querySelector('.hero-content');
        if (content) {
            this.parallaxElements.push({
                element: content,
                speed: 1,
                baseY: 0
            });
        }
    }

    // Create floating gold dust particles
    createGoldDust() {
        const dustContainer = document.createElement('div');
        dustContainer.className = 'gold-dust-container';
        dustContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
        `;

        const particleCount = 25;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'gold-dust-particle';
            
            // Random properties
            const size = Math.random() * 2 + 1; // 1-3px
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const duration = Math.random() * 20 + 10; // 10-30s
            const delay = Math.random() * 5; // 0-5s delay
            const opacity = Math.random() * 0.15 + 0.1; // 0.1-0.25 opacity
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: #c9a84c;
                border-radius: 50%;
                left: ${startX}%;
                top: ${startY}%;
                opacity: ${opacity};
                animation: dustFloat ${duration}s ease-in-out ${delay}s infinite;
                box-shadow: 0 0 4px rgba(201, 168, 76, 0.3);
            `;
            
            dustContainer.appendChild(particle);
            this.particles.push(particle);
        }

        this.hero.appendChild(dustContainer);
    }

    // Create solar flare sweep effects
    createSolarFlares() {
        const flareContainer = document.createElement('div');
        flareContainer.className = 'solar-flare-container';
        flareContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;

        // Create multiple flares with different timings
        const flareCount = 3;
        
        for (let i = 0; i < flareCount; i++) {
            const flare = document.createElement('div');
            flare.className = 'solar-flare';
            
            // Random properties
            const angle = Math.random() * 45 - 22.5; // -22.5 to 22.5 degrees
            const duration = Math.random() * 4 + 6; // 6-10s
            const delay = i * 3; // Staggered starts
            const opacity = Math.random() * 0.04 + 0.04; // 0.04-0.08 opacity
            
            flare.style.cssText = `
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(${angle}deg, 
                    transparent 0%, 
                    rgba(201, 168, 76, ${opacity}) 45%, 
                    rgba(232, 200, 122, ${opacity * 0.7}) 50%, 
                    rgba(201, 168, 76, ${opacity}) 55%, 
                    transparent 100%);
                transform: rotate(${angle}deg);
                opacity: 0;
                animation: flareSweep ${duration}s ease-in-out ${delay}s infinite;
            `;
            
            flareContainer.appendChild(flare);
            this.flares.push(flare);
        }

        this.hero.appendChild(flareContainer);
    }

    // Create edge vignette effect
    createVignette() {
        const vignette = document.createElement('div');
        vignette.className = 'hero-vignette';
        vignette.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 4;
            background: radial-gradient(ellipse at center, 
                transparent 0%, 
                transparent 40%, 
                rgba(6, 6, 6, 0.1) 70%, 
                rgba(6, 6, 6, 0.3) 90%, 
                rgba(6, 6, 6, 0.5) 100%);
        `;
        
        this.hero.appendChild(vignette);
    }

    // Add scroll listener for parallax effect
    addScrollListener() {
        this.scrollHandler = () => this.updateParallax();
        window.addEventListener('scroll', this.scrollHandler, { passive: true });
    }

    // Update parallax positions based on scroll
    updateParallax() {
        if (!this.isActive) return;
        
        const scrollY = window.pageYOffset;
        const heroRect = this.hero.getBoundingClientRect();
        const heroCenter = heroRect.top + heroRect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const scrollProgress = (viewportCenter - heroCenter) / window.innerHeight;
        
        this.parallaxElements.forEach(layer => {
            const translateY = scrollY * layer.speed * -0.5;
            layer.element.style.transform = `translateY(${translateY}px)`;
        });
    }

    // Start animation loop for continuous effects
    startAnimationLoop() {
        const animate = () => {
            if (!this.isActive) return;
            
            // Update any real-time animations here
            this.updateParticles();
            
            this.animationFrame = requestAnimationFrame(animate);
        };
        
        animate();
    }

    // Update particle positions (if needed)
    updateParticles() {
        // Particles are CSS-animated, but we can add extra logic here if needed
    }

    // Add CSS animations
    addStyles() {
        if (document.getElementById('landingMotionStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'landingMotionStyles';
        style.textContent = `
            @keyframes dustFloat {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.1;
                }
                25% {
                    transform: translate(30px, -20px) scale(1.2);
                    opacity: 0.2;
                }
                50% {
                    transform: translate(-20px, -40px) scale(0.8);
                    opacity: 0.15;
                }
                75% {
                    transform: translate(-30px, 20px) scale(1.1);
                    opacity: 0.25;
                }
            }
            
            @keyframes flareSweep {
                0%, 100% {
                    opacity: 0;
                    transform: translateX(-100%) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: translateX(100%) rotate(0deg);
                }
            }
            
            .gold-dust-particle {
                will-change: transform, opacity;
            }
            
            .solar-flare {
                will-change: transform, opacity;
            }
            
            @media (prefers-reduced-motion: reduce) {
                .gold-dust-particle,
                .solar-flare {
                    animation: none !important;
                }
                
                .gold-dust-particle {
                    opacity: 0.1 !important;
                }
                
                .solar-flare {
                    opacity: 0 !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Cleanup method
    destroy() {
        this.isActive = false;
        
        // Remove event listeners
        if (this.scrollHandler) {
            window.removeEventListener('scroll', this.scrollHandler);
        }
        
        // Cancel animation frame
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Remove created elements
        const dustContainer = this.hero.querySelector('.gold-dust-container');
        const flareContainer = this.hero.querySelector('.solar-flare-container');
        const vignette = this.hero.querySelector('.hero-vignette');
        
        if (dustContainer) dustContainer.remove();
        if (flareContainer) flareContainer.remove();
        if (vignette) vignette.remove();
        
        // Reset transforms
        this.parallaxElements.forEach(layer => {
            layer.element.style.transform = '';
        });
        
        // Clear arrays
        this.particles = [];
        this.flares = [];
        this.parallaxElements = [];
    }

    // Static method to initialize
    static init() {
        const motion = new LandingMotion();
        motion.addStyles();
        motion.initialize();
        return motion;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LandingMotion;
} else {
    window.LandingMotion = LandingMotion;
}
