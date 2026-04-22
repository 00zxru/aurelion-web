// AURELION Wordmark Component with Solar Crest
// Phase 3A & 3B: Luxury serif typography with integrated solar crest

class AurelionWordmark {
    constructor(options = {}) {
        this.size = options.size || 'medium';
        this.color = options.color || 'gold';
        this.showCrest = options.showCrest !== false; // Default true
        this.animation = options.animation || false;
        
        this.sizes = {
            small: { width: 120, height: 40, fontSize: 24 },
            medium: { width: 200, height: 60, fontSize: 36 },
            large: { width: 320, height: 96, fontSize: 56 },
            xlarge: { width: 480, height: 144, fontSize: 84 }
        };
        
        this.colors = {
            gold: '#c9a84c',
            light: '#e8c87a',
            white: '#f0ebe0'
        };
    }

    // Create solar crest SVG for the "O" replacement
    createSolarCrest(size) {
        const scale = size / 56; // Base size reference
        const center = 28 * scale;
        const radius = 20 * scale;
        
        // Create refined sun rays (16 rays, varying lengths)
        const rays = [];
        const rayCount = 16;
        const primaryRayLength = radius * 1.8;
        const secondaryRayLength = radius * 1.2;
        
        for (let i = 0; i < rayCount; i++) {
            const angle = (i * 360 / rayCount) * Math.PI / 180;
            const isPrimary = i % 2 === 0;
            const rayLength = isPrimary ? primaryRayLength : secondaryRayLength;
            const rayWidth = isPrimary ? 2 * scale : 1.5 * scale;
            const opacity = isPrimary ? 0.8 : 0.5;
            
            const x1 = center + Math.cos(angle) * (radius + 2);
            const y1 = center + Math.sin(angle) * (radius + 2);
            const x2 = center + Math.cos(angle) * rayLength;
            const y2 = center + Math.sin(angle) * rayLength;
            
            rays.push(
                `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                 stroke="${this.colors[this.color]}" 
                 stroke-width="${rayWidth}" 
                 opacity="${opacity}"
                 stroke-linecap="round"/>`
            );
        }
        
        return `
            <g transform="translate(${center}, ${center})">
                <!-- Outer rays -->
                ${rays.join('')}
                <!-- Central orb with gradient -->
                <defs>
                    <radialGradient id="crestGradient${size}">
                        <stop offset="0%" stop-color="${this.colors.light}" stop-opacity="0.9"/>
                        <stop offset="70%" stop-color="${this.colors[this.color]}" stop-opacity="0.7"/>
                        <stop offset="100%" stop-color="${this.colors[this.color]}" stop-opacity="0.3"/>
                    </radialGradient>
                </defs>
                <circle cx="0" cy="0" r="${radius}" 
                        fill="url(#crestGradient${size})" 
                        opacity="0.9"/>
                <!-- Inner core -->
                <circle cx="0" cy="0" r="${radius * 0.3}" 
                        fill="${this.colors.light}" 
                        opacity="0.8"/>
            </g>
        `;
    }

    // Generate the complete wordmark SVG
    render() {
        const { width, height, fontSize } = this.sizes[this.size];
        const letterSpacing = 0.15; // --tracking-wide
        const letterSpacingPx = fontSize * letterSpacing;
        
        // AURELI N letters (splitting around the "O" for crest)
        const letters = [
            { char: 'A', x: 0 },
            { char: 'U', x: letterSpacingPx + fontSize * 0.8 },
            { char: 'R', x: 2 * (letterSpacingPx + fontSize * 0.8) },
            { char: 'E', x: 3 * (letterSpacingPx + fontSize * 0.8) },
            { char: 'L', x: 4 * (letterSpacingPx + fontSize * 0.8) },
            // "O" position replaced by crest
            { char: 'N', x: 6 * (letterSpacingPx + fontSize * 0.8) }
        ];
        
        const crestX = 5 * (letterSpacingPx + fontSize * 0.8);
        const crestY = height / 2;
        
        let svgContent = `
            <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" 
                 xmlns="http://www.w3.org/2000/svg"
                 ${this.animation ? 'class="aurelion-wordmark-animated"' : ''}>
        `;
        
        // Add letters with luxury serif styling
        letters.forEach(letter => {
            svgContent += `
                <text x="${letter.x}" y="${height * 0.75}" 
                      font-family="'Playfair Display', Georgia, serif" 
                      font-size="${fontSize}" 
                      font-weight="400"
                      fill="${this.colors[this.color]}"
                      letter-spacing="${letterSpacingPx}">
                    ${letter.char}
                </text>
            `;
        });
        
        // Add solar crest in place of "O"
        if (this.showCrest) {
            svgContent += this.createSolarCrest(fontSize);
        }
        
        svgContent += '</svg>';
        
        // Add CSS animation if enabled
        if (this.animation) {
            svgContent += `
                <style>
                .aurelion-wordmark-animated line {
                    animation: rayPulse 4s ease-in-out infinite;
                    transform-origin: center;
                }
                .aurelion-wordmark-animated line:nth-child(odd) {
                    animation-delay: 0.5s;
                }
                @keyframes rayPulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.9; }
                }
                </style>
            `;
        }
        
        return svgContent;
    }

    // Static method to create wordmark element
    static create(options = {}) {
        const wordmark = new AurelionWordmark(options);
        const container = document.createElement('div');
        container.className = 'aurelion-wordmark';
        container.innerHTML = wordmark.render();
        return container;
    }

    // Static method to replace existing elements
    static replace(selector, options = {}) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const wordmark = this.create(options);
            wordmark.className = element.className;
            element.parentNode.replaceChild(wordmark, element);
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AurelionWordmark;
} else {
    window.AurelionWordmark = AurelionWordmark;
}
