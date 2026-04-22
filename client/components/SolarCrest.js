// Phase 3C: Standalone Solar Crest Component
// Ancient mark from a forgotten order - not a modern logo

class SolarCrest {
    constructor(options = {}) {
        this.size = options.size || 'medium';
        this.color = options.color || 'gold';
        this.animation = options.animation || false;
        this.variant = options.variant || 'standard'; // standard, minimal, ornate
        
        this.sizes = {
            icon: 24,
            small: 32,
            medium: 56,
            large: 96,
            xlarge: 144
        };
        
        this.colors = {
            gold: '#c9a84c',
            light: '#e8c87a',
            muted: '#8a6f3a',
            white: '#f0ebe0'
        };
    }

    // Create refined solar crest with ancient, sacred aesthetic
    createCrestSVG() {
        const size = this.sizes[this.size];
        const center = size / 2;
        const coreRadius = size * 0.25;
        const innerRadius = size * 0.4;
        const outerRadius = size * 0.45;
        
        let svgContent = `
            <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" 
                 xmlns="http://www.w3.org/2000/svg"
                 class="solar-crest ${this.animation ? 'solar-crest-animated' : ''}">
        `;
        
        // Define gradients for depth and sacred feel
        svgContent += `
            <defs>
                <radialGradient id="coreGradient${size}">
                    <stop offset="0%" stop-color="${this.colors.light}" stop-opacity="0.95"/>
                    <stop offset="60%" stop-color="${this.colors[this.color]}" stop-opacity="0.8"/>
                    <stop offset="100%" stop-color="${this.colors.muted}" stop-opacity="0.6"/>
                </radialGradient>
                <radialGradient id="ringGradient${size}">
                    <stop offset="0%" stop-color="${this.colors[this.color]}" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="${this.colors.muted}" stop-opacity="0.1"/>
                </radialGradient>
            </defs>
        `;
        
        // Fragmented outer ring - ancient, broken feel
        if (this.variant !== 'minimal') {
            const fragments = this.createRingFragments(center, outerRadius, innerRadius);
            svgContent += fragments;
        }
        
        // Refined sun rays - 30-40% less dense than traditional
        const rays = this.createRefinedRays(center, innerRadius, size);
        svgContent += rays;
        
        // Central solar core
        svgContent += `
            <circle cx="${center}" cy="${center}" r="${coreRadius}" 
                    fill="url(#coreGradient${size})" 
                    opacity="0.9"/>
        `;
        
        // Inner most sacred point
        svgContent += `
            <circle cx="${center}" cy="${center}" r="${coreRadius * 0.3}" 
                    fill="${this.colors.light}" 
                    opacity="0.8"/>
        `;
        
        svgContent += '</svg>';
        
        // Add animation CSS if enabled
        if (this.animation) {
            svgContent += this.getAnimationCSS(size);
        }
        
        return svgContent;
    }

    // Create fragmented outer ring for ancient feel
    createRingFragments(center, outerRadius, innerRadius) {
        const fragments = [];
        const fragmentCount = 8;
        const gapAngle = Math.PI / 12; // Gaps between fragments
        
        for (let i = 0; i < fragmentCount; i++) {
            const startAngle = (i * 2 * Math.PI / fragmentCount) + gapAngle;
            const endAngle = ((i + 1) * 2 * Math.PI / fragmentCount) - gapAngle;
            
            const x1 = center + Math.cos(startAngle) * innerRadius;
            const y1 = center + Math.sin(startAngle) * innerRadius;
            const x2 = center + Math.cos(startAngle) * outerRadius;
            const y2 = center + Math.sin(startAngle) * outerRadius;
            const x3 = center + Math.cos(endAngle) * outerRadius;
            const y3 = center + Math.sin(endAngle) * outerRadius;
            const x4 = center + Math.cos(endAngle) * innerRadius;
            const y4 = center + Math.sin(endAngle) * innerRadius;
            
            fragments.push(`
                <path d="M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}"
                      fill="url(#ringGradient${this.sizes[this.size]})" 
                      opacity="0.6"/>
            `);
        }
        
        return fragments.join('');
    }

    // Create refined sun rays - elegant spacing, not overwhelming
    createRefinedRays(center, innerRadius, size) {
        const rays = [];
        const rayCount = 12; // Less dense than traditional sunbursts
        const maxRayLength = size * 0.85;
        
        for (let i = 0; i < rayCount; i++) {
            const angle = (i * 360 / rayCount) * Math.PI / 180;
            
            // Vary ray lengths for organic feel
            const lengthVariation = 0.8 + (Math.random() * 0.4);
            const rayLength = maxRayLength * lengthVariation;
            
            // Vary ray widths - primary vs secondary
            const isPrimary = i % 3 === 0;
            const rayWidth = isPrimary ? 1.5 : 1;
            const opacity = isPrimary ? 0.7 : 0.4;
            
            const x1 = center + Math.cos(angle) * (innerRadius + 2);
            const y1 = center + Math.sin(angle) * (innerRadius + 2);
            const x2 = center + Math.cos(angle) * rayLength;
            const y2 = center + Math.sin(angle) * rayLength;
            
            rays.push(`
                <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                       stroke="${this.colors[this.color]}" 
                       stroke-width="${rayWidth}" 
                       opacity="${opacity}"
                       stroke-linecap="round"
                       class="solar-ray ${isPrimary ? 'primary-ray' : 'secondary-ray'}"/>
            `);
        }
        
        return rays.join('');
    }

    // Get animation CSS for subtle breathing effect
    getAnimationCSS(size) {
        return `
            <style>
            .solar-crest-animated .solar-ray {
                animation: rayBreath 6s ease-in-out infinite;
                transform-origin: ${size/2}px ${size/2}px;
            }
            .solar-crest-animated .primary-ray {
                animation-delay: 0s;
            }
            .solar-crest-animated .secondary-ray:nth-child(odd) {
                animation-delay: 1s;
            }
            .solar-crest-animated .secondary-ray:nth-child(even) {
                animation-delay: 2s;
            }
            
            @keyframes rayBreath {
                0%, 100% { opacity: 0.4; }
                50% { opacity: 0.8; }
            }
            
            .solar-crest-animated circle:first-of-type {
                animation: corePulse 4s ease-in-out infinite;
            }
            
            @keyframes corePulse {
                0%, 100% { opacity: 0.9; }
                50% { opacity: 1; }
            }
            </style>
        `;
    }

    // Static method to create crest element
    static create(options = {}) {
        const crest = new SolarCrest(options);
        const container = document.createElement('div');
        container.className = 'solar-crest-container';
        container.innerHTML = crest.createCrestSVG();
        return container;
    }

    // Static method to replace existing elements
    static replace(selector, options = {}) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const crest = this.create(options);
            crest.className = element.className;
            element.parentNode.replaceChild(crest, element);
        });
    }

    // Static method for favicon generation
    static generateFavicon(size = 32) {
        const crest = new SolarCrest({ 
            size: 'icon', 
            color: 'gold', 
            variant: 'minimal',
            animation: false 
        });
        return crest.createCrestSVG();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SolarCrest;
} else {
    window.SolarCrest = SolarCrest;
}
