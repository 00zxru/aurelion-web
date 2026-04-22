// Phase 7: Full House System (5 Houses)
// Five distinct entities of observation with unique characteristics

class HouseSystem {
    constructor() {
        this.houses = this.initializeHouses();
        this.currentHouse = null;
    }

    // Initialize the five houses with unique characteristics
    initializeHouses() {
        return [
            {
                id: 'house1',
                name: 'House 1',
                symbol: 'H1',
                color: '#1a1a1a',
                accent: '#2d2d2d',
                description: 'The observers of precision',
                traits: ['Discipline', 'Focus', 'Analysis'],
                members: 0,
                founded: '2023',
                philosophy: 'Through careful observation, truth emerges.'
            },
            {
                id: 'house2',
                name: 'House 2',
                symbol: 'H2',
                color: '#c9a84c',
                accent: '#e8c87a',
                description: 'The architects of light',
                traits: ['Vision', 'Creation', 'Illumination'],
                members: 0,
                founded: '2023',
                philosophy: 'Light reveals what darkness conceals.'
            },
            {
                id: 'house3',
                name: 'House 3',
                symbol: 'H3',
                color: '#4a5568',
                accent: '#718096',
                description: 'The keepers of cycles',
                traits: ['Rhythm', 'Intuition', 'Reflection'],
                members: 0,
                founded: '2023',
                philosophy: 'In cycles, we find meaning.'
            },
            {
                id: 'house4',
                name: 'House 4',
                symbol: 'H4',
                color: '#1a202c',
                accent: '#2d3748',
                description: 'The masters of absence',
                traits: ['Silence', 'Space', 'Potential'],
                members: 0,
                founded: '2023',
                philosophy: 'In emptiness, possibility exists.'
            },
            {
                id: 'house5',
                name: 'House 5',
                symbol: 'H5',
                color: '#805ad5',
                accent: '#9f7aea',
                description: 'The explorers of probability',
                traits: ['Innovation', 'Uncertainty', 'Discovery'],
                members: 0,
                founded: '2023',
                philosophy: 'All possibilities exist simultaneously.'
            }
        ];
    }

    // Render houses grid
    renderHousesGrid() {
        const grid = document.getElementById('housesGrid');
        if (!grid) return;

        grid.innerHTML = '';
        
        this.houses.forEach(house => {
            const houseCard = this.createHouseCard(house);
            grid.appendChild(houseCard);
        });
    }

    // Create individual house card
    createHouseCard(house) {
        const card = document.createElement('div');
        card.className = 'house-card';
        card.dataset.houseId = house.id;
        
        card.innerHTML = `
            <div class="house-emblem" style="background: ${house.color}20; border: 2px solid ${house.color};">
                <span style="color: ${house.color}; font-size: 2rem; font-weight: bold;">${house.symbol}</span>
            </div>
            <h3 class="house-name" style="color: ${house.color};">${house.name}</h3>
            <p class="house-description">${house.description}</p>
            <div class="house-traits">
                ${house.traits.map(trait => `<span class="trait-tag">${trait}</span>`).join('')}
            </div>
            <div class="house-meta">
                <span class="house-founded">Founded ${house.founded}</span>
                <span class="house-members">${house.members} observed</span>
            </div>
        `;
        
        card.addEventListener('click', () => this.showHouseDetail(house));
        return card;
    }

    // Show house detail view
    showHouseDetail(house) {
        this.currentHouse = house;
        const detailView = document.getElementById('houseDetailView');
        const detailContainer = document.getElementById('houseDetail');
        
        if (!detailView || !detailContainer) return;
        
        // Hide other views
        document.querySelectorAll('.content-view').forEach(view => {
            view.classList.remove('active');
        });
        detailView.classList.add('active');
        
        detailContainer.innerHTML = `
            <div class="house-detail-container">
                <div class="house-detail-header">
                    <button class="back-button" onclick="houseSystem.showHousesGrid()">
                        <span>×</span>
                        <span>Return</span>
                    </button>
                    <div class="house-detail-emblem" style="background: ${house.color}20; border: 3px solid ${house.color};">
                        <span style="color: ${house.color}; font-size: 3rem; font-weight: bold;">${house.symbol}</span>
                    </div>
                    <h1 class="house-detail-name" style="color: ${house.color};">${house.name}</h1>
                    <p class="house-detail-description">${house.description}</p>
                </div>
                
                <div class="house-detail-content">
                    <section class="house-philosophy">
                        <h2>Philosophy</h2>
                        <p>${house.philosophy}</p>
                    </section>
                    
                    <section class="house-traits-detail">
                        <h2>Core Traits</h2>
                        <div class="traits-grid">
                            ${house.traits.map(trait => `
                                <div class="trait-card">
                                    <h3>${trait}</h3>
                                    <p>The embodiment of ${trait.toLowerCase()} in creative practice.</p>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                    
                    <section class="house-members">
                        <h2>Observed Members</h2>
                        <div class="members-grid" id="membersGrid">
                            ${this.renderMemberCards(house)}
                        </div>
                    </section>
                    
                    <section class="house-works">
                        <h2>Recognized Works</h2>
                        <div class="works-grid" id="worksGrid">
                            ${this.renderWorkCards(house)}
                        </div>
                    </section>
                </div>
            </div>
        `;
        
        // Update navigation
        this.updateNavigation(house);
    }

    // Render member cards for house
    renderMemberCards(house) {
        // Mock members for now - will be replaced with actual data
        const mockMembers = [
            { id: 1, name: 'Observer Alpha', role: 'Founder', joined: '2023' },
            { id: 2, name: 'Observer Beta', role: 'Elder', joined: '2023' },
            { id: 3, name: 'Observer Gamma', role: 'Novice', joined: '2024' }
        ];
        
        return mockMembers.map(member => `
            <div class="member-card">
                <div class="member-avatar">°</div>
                <div class="member-info">
                    <h4>${member.name}</h4>
                    <p>${member.role}</p>
                    <small>Joined ${member.joined}</small>
                </div>
            </div>
        `).join('');
    }

    // Render work cards for house
    renderWorkCards(house) {
        // Mock works for now - will be replaced with actual data
        const mockWorks = [
            { id: 1, title: 'Silent Observation', year: '2023', medium: 'Digital' },
            { id: 2, title: 'Precision Study', year: '2024', medium: 'Physical' },
            { id: 3, title: 'Discipline Practice', year: '2024', medium: 'Mixed' }
        ];
        
        return mockWorks.map(work => `
            <div class="work-card">
                <div class="work-preview">§</div>
                <div class="work-info">
                    <h4>${work.title}</h4>
                    <p>${work.year} · ${work.medium}</p>
                </div>
            </div>
        `).join('');
    }

    // Show houses grid
    showHousesGrid() {
        const housesView = document.getElementById('housesView');
        const detailView = document.getElementById('houseDetailView');
        
        if (housesView) housesView.classList.add('active');
        if (detailView) detailView.classList.remove('active');
        
        // Update navigation
        this.updateNavigation(null);
    }

    // Update navigation for current context
    updateNavigation(house) {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (house && item.dataset.view === 'houses') {
                item.classList.add('active');
            } else if (!house && item.dataset.view === 'houses') {
                item.classList.add('active');
            }
        });
    }

    // Initialize the house system
    initialize() {
        this.renderHousesGrid();
        this.addStyles();
    }

    // Add CSS styles for house system
    addStyles() {
        if (document.getElementById('houseSystemStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'houseSystemStyles';
        style.textContent = `
            .house-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                padding: var(--space-xl);
                border-radius: var(--radius-card);
                text-align: center;
                transition: all var(--duration-base) var(--ease-cinematic);
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }

            .house-card:hover {
                transform: translateY(-8px) scale(1.02);
                border-color: var(--color-gold);
                box-shadow: 0 20px 40px rgba(212, 165, 116, 0.2), 0 0 0 1px rgba(201, 168, 76, 0.1) inset;
            }

            .house-emblem {
                width: 80px;
                height: 80px;
                margin: 0 auto var(--space-lg);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .house-name {
                font-family: var(--font-display);
                font-size: var(--text-2xl);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .house-description {
                color: var(--color-text-secondary);
                margin-bottom: var(--space-lg);
                line-height: var(--leading-relaxed);
            }

            .house-traits {
                display: flex;
                flex-wrap: wrap;
                gap: var(--space-xs);
                justify-content: center;
                margin-bottom: var(--space-lg);
            }

            .trait-tag {
                background: var(--color-gold-dim);
                color: var(--color-gold);
                padding: var(--space-xs) var(--space-sm);
                border-radius: var(--radius-pill);
                font-size: var(--text-xs);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .house-meta {
                display: flex;
                justify-content: space-between;
                font-size: var(--text-xs);
                color: var(--color-text-muted);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .house-detail-container {
                max-width: 1000px;
                margin: 0 auto;
                padding: var(--space-3xl);
            }

            .house-detail-header {
                text-align: center;
                margin-bottom: var(--space-4xl);
            }

            .back-button {
                background: none;
                border: 1px solid var(--color-glass-border);
                color: var(--color-text-secondary);
                padding: var(--space-sm) var(--space-md);
                border-radius: var(--radius-pill);
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: var(--space-sm);
                margin-bottom: var(--space-xl);
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .back-button:hover {
                border-color: var(--color-gold);
                color: var(--color-gold);
            }

            .house-detail-emblem {
                width: 120px;
                height: 120px;
                margin: 0 auto var(--space-xl);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .house-detail-name {
                font-family: var(--font-display);
                font-size: var(--text-4xl);
                margin-bottom: var(--space-md);
                text-transform: uppercase;
                letter-spacing: var(--tracking-widest);
            }

            .house-detail-description {
                font-size: var(--text-lg);
                color: var(--color-text-secondary);
                max-width: 600px;
                margin: 0 auto var(--space-2xl);
            }

            .house-detail-content section {
                margin-bottom: var(--space-4xl);
            }

            .house-detail-content h2 {
                font-family: var(--font-display);
                font-size: var(--text-2xl);
                color: var(--color-gold);
                margin-bottom: var(--space-lg);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .traits-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: var(--space-lg);
            }

            .trait-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-lg);
                border-radius: var(--radius-card);
                text-align: center;
            }

            .trait-card h3 {
                font-family: var(--font-display);
                font-size: var(--text-xl);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
            }

            .members-grid,
            .works-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: var(--space-lg);
            }

            .member-card,
            .work-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-lg);
                border-radius: var(--radius-card);
                display: flex;
                align-items: center;
                gap: var(--space-md);
            }

            .member-avatar,
            .work-preview {
                width: 40px;
                height: 40px;
                background: var(--color-gold-dim);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--color-gold);
                font-size: 1.2rem;
            }

            .member-info h4,
            .work-info h4 {
                font-size: var(--text-base);
                margin-bottom: var(--space-xs);
            }

            .member-info p,
            .work-info p {
                color: var(--color-text-secondary);
                font-size: var(--text-sm);
            }

            @media (max-width: 768px) {
                .house-detail-container {
                    padding: var(--space-xl);
                }
                
                .traits-grid,
                .members-grid,
                .works-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Static method to initialize
    static init() {
        const houseSystem = new HouseSystem();
        houseSystem.initialize();
        return houseSystem;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HouseSystem;
} else {
    window.HouseSystem = HouseSystem;
}
