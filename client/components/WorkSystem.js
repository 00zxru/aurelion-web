// Phase 11: Work/Portfolio System
// Comprehensive work submission, portfolio management, and showcase system

class WorkSystem {
    constructor() {
        this.currentUser = null;
        this.works = [];
        this.portfolio = [];
        this.categories = ['Digital', 'Physical', 'Methodology', 'Analysis', 'Innovation'];
        this.filters = {
            category: 'all',
            status: 'all',
            house: 'all',
            timeframe: 'all'
        };
    }

    // Initialize work system
    initialize() {
        this.loadCurrentUser();
        this.loadWorks();
        this.renderWorkInterface();
        this.addStyles();
    }

    // Load current user
    loadCurrentUser() {
        // Mock user - will be replaced with Firebase auth
        this.currentUser = {
            id: 'user_001',
            name: 'Observer Alpha',
            house: 'house1',
            role: 'Elder'
        };
    }

    // Load works data
    loadWorks() {
        // Mock works data
        this.works = [
            {
                id: 'work_001',
                title: 'Silent Observation Study',
                creator: 'Observer Alpha',
                house: 'house1',
                category: 'Digital',
                medium: 'Interactive visualization',
                created: '2024-01-15',
                status: 'published',
                description: 'A comprehensive study of silent observation techniques through digital visualization and interaction patterns.',
                preview: 'https://picsum.photos/seed/observation1/400/300.jpg',
                tags: ['observation', 'visualization', 'digital'],
                metrics: {
                    views: 156,
                    recognitions: 12,
                    averageScore: 89,
                    collaborations: 3
                },
                recognitionHistory: [
                    { date: '2024-01-20', score: 92, recognizer: 'House 2', feedback: 'Exceptional precision in methodology' },
                    { date: '2024-01-18', score: 87, recognizer: 'House 3', feedback: 'Strong analytical approach' }
                ]
            },
            {
                id: 'work_002',
                title: 'Observation Framework v2',
                creator: 'Observer Alpha',
                house: 'house1',
                category: 'Methodology',
                medium: 'Framework documentation',
                created: '2024-01-10',
                status: 'published',
                description: 'An enhanced framework for systematic observation with improved precision metrics and discipline protocols.',
                preview: 'https://picsum.photos/seed/framework2/400/300.jpg',
                tags: ['framework', 'methodology', 'precision'],
                metrics: {
                    views: 203,
                    recognitions: 18,
                    averageScore: 91,
                    collaborations: 5
                },
                recognitionHistory: [
                    { date: '2024-01-17', score: 95, recognizer: 'AURELION', feedback: 'Innovative approach to pattern recognition' },
                    { date: '2024-01-15', score: 88, recognizer: 'House 1', feedback: 'Methodologically sound' }
                ]
            },
            {
                id: 'work_003',
                title: 'Discipline in Practice',
                creator: 'Observer Beta',
                house: 'house2',
                category: 'Physical',
                medium: 'Performance piece',
                created: '2024-01-08',
                status: 'published',
                description: 'A physical demonstration of disciplined practice through movement and spatial awareness.',
                preview: 'https://picsum.photos/seed/discipline3/400/300.jpg',
                tags: ['discipline', 'physical', 'performance'],
                metrics: {
                    views: 178,
                    recognitions: 15,
                    averageScore: 86,
                    collaborations: 2
                },
                recognitionHistory: [
                    { date: '2024-01-14', score: 88, recognizer: 'House 2', feedback: 'Excellent physical discipline' },
                    { date: '2024-01-12', score: 84, recognizer: 'House 4', feedback: 'Strong spatial awareness' }
                ]
            },
            {
                id: 'work_004',
                title: 'Systems Analysis Project',
                creator: 'Observer Gamma',
                house: 'house3',
                category: 'Analysis',
                medium: 'Research paper',
                created: '2024-01-05',
                status: 'published',
                description: 'Comprehensive analysis of complex systems with focus on precision and systematic approach.',
                preview: 'https://picsum.photos/seed/analysis4/400/300.jpg',
                tags: ['analysis', 'systems', 'research'],
                metrics: {
                    views: 145,
                    recognitions: 10,
                    averageScore: 88,
                    collaborations: 4
                },
                recognitionHistory: [
                    { date: '2024-01-11', score: 90, recognizer: 'House 3', feedback: 'Thorough systematic analysis' },
                    { date: '2024-01-09', score: 86, recognizer: 'House 5', feedback: 'Well-structured methodology' }
                ]
            },
            {
                id: 'work_005',
                title: 'Innovation Protocol',
                creator: 'Observer Alpha',
                house: 'house1',
                category: 'Innovation',
                medium: 'Protocol documentation',
                created: '2024-01-03',
                status: 'draft',
                description: 'Draft protocol for innovative approaches to observation and recognition systems.',
                preview: 'https://picsum.photos/seed/innovation5/400/300.jpg',
                tags: ['innovation', 'protocol', 'draft'],
                metrics: {
                    views: 23,
                    recognitions: 0,
                    averageScore: 0,
                    collaborations: 1
                },
                recognitionHistory: []
            }
        ];
    }

    // Render work interface
    renderWorkInterface() {
        const container = document.getElementById('adminContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="work-system">
                <!-- Work Header -->
                <section class="work-header">
                    <h1>Work Portfolio</h1>
                    <p>Showcase and manage observational works and methodologies</p>
                    
                    <!-- Action Buttons -->
                    <div class="work-actions">
                        <button class="action-button primary" onclick="workSystem.showSubmitModal()">
                            Submit Work
                        </button>
                        <button class="action-button secondary" onclick="workSystem.showPortfolio()">
                            View Portfolio
                        </button>
                        <button class="action-button secondary" onclick="workSystem.exportWorks()">
                            Export Data
                        </button>
                    </div>
                    
                    <!-- Filters -->
                    <div class="work-filters">
                        <div class="filter-group">
                            <label>Category</label>
                            <select onchange="workSystem.updateFilter('category', this.value)">
                                <option value="all">All Categories</option>
                                ${this.categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>Status</label>
                            <select onchange="workSystem.updateFilter('status', this.value)">
                                <option value="all">All Status</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>House</label>
                            <select onchange="workSystem.updateFilter('house', this.value)">
                                <option value="all">All Houses</option>
                                <option value="house1">House 1</option>
                                <option value="house2">House 2</option>
                                <option value="house3">House 3</option>
                                <option value="house4">House 4</option>
                                <option value="house5">House 5</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>Timeframe</label>
                            <select onchange="workSystem.updateFilter('timeframe', this.value)">
                                <option value="all">All Time</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="year">This Year</option>
                            </select>
                        </div>
                    </div>
                </section>

                <!-- Work Grid -->
                <section class="work-grid-section">
                    <div class="works-grid">
                        ${this.renderFilteredWorks()}
                    </div>
                </section>

                <!-- Work Statistics -->
                <section class="work-stats">
                    <h2>Portfolio Overview</h2>
                    <div class="stats-grid">
                        ${this.renderWorkStatistics()}
                    </div>
                </section>
            </div>
        `;
    }

    // Render filtered works
    renderFilteredWorks() {
        const filtered = this.getFilteredWorks();
        
        if (filtered.length === 0) {
            return '<p class="empty-state">No works found for current filters</p>';
        }

        return filtered.map(work => this.renderWorkCard(work)).join('');
    }

    // Render individual work card
    renderWorkCard(work) {
        const statusColor = this.getStatusColor(work.status);
        const categoryColor = this.getCategoryColor(work.category);

        return `
            <div class="work-card" data-work-id="${work.id}">
                <div class="work-preview">
                    <img src="${work.preview}" alt="${work.title}" loading="lazy">
                    <div class="work-overlay">
                        <button class="view-button" onclick="workSystem.viewWork('${work.id}')">
                            View Details
                        </button>
                    </div>
                </div>
                <div class="work-info">
                    <h3>${work.title}</h3>
                    <p class="work-creator">By ${work.creator} · ${work.house}</p>
                    <p class="work-description">${work.description}</p>
                    <div class="work-meta">
                        <span class="work-category" style="background: ${categoryColor}">${work.category}</span>
                        <span class="work-status" style="background: ${statusColor}">${work.status}</span>
                        <span class="work-date">${this.formatDate(work.created)}</span>
                    </div>
                    <div class="work-tags">
                        ${work.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="work-metrics">
                        <div class="metric">
                            <span class="metric-icon">eye</span>
                            <span class="metric-value">${work.metrics.views}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-icon">trophy</span>
                            <span class="metric-value">${work.metrics.recognitions}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-icon">star</span>
                            <span class="metric-value">${work.metrics.averageScore || '-'}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-icon">users</span>
                            <span class="metric-value">${work.metrics.collaborations}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Render work statistics
    renderWorkStatistics() {
        const stats = this.calculateWorkStats();
        
        return `
            <div class="stat-card">
                <h3>${stats.totalWorks}</h3>
                <p>Total Works</p>
            </div>
            <div class="stat-card">
                <h3>${stats.publishedWorks}</h3>
                <p>Published</p>
            </div>
            <div class="stat-card">
                <h3>${stats.totalViews}</h3>
                <p>Total Views</p>
            </div>
            <div class="stat-card">
                <h3>${stats.totalRecognitions}</h3>
                <p>Recognitions</p>
            </div>
            <div class="stat-card">
                <h3>${stats.averageScore}</h3>
                <p>Avg Score</p>
            </div>
            <div class="stat-card">
                <h3>${stats.collaborations}</h3>
                <p>Collaborations</p>
            </div>
        `;
    }

    // Get filtered works
    getFilteredWorks() {
        let filtered = [...this.works];

        // Filter by category
        if (this.filters.category !== 'all') {
            filtered = filtered.filter(work => work.category === this.filters.category);
        }

        // Filter by status
        if (this.filters.status !== 'all') {
            filtered = filtered.filter(work => work.status === this.filters.status);
        }

        // Filter by house
        if (this.filters.house !== 'all') {
            filtered = filtered.filter(work => work.house === this.filters.house);
        }

        // Filter by timeframe
        const now = new Date();
        filtered = filtered.filter(work => {
            const workDate = new Date(work.created);
            
            switch (this.filters.timeframe) {
                case 'week':
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return workDate >= weekAgo;
                case 'month':
                    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                    return workDate >= monthAgo;
                case 'year':
                    const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
                    return workDate >= yearAgo;
                default:
                    return true;
            }
        });

        // Sort by creation date (newest first)
        return filtered.sort((a, b) => new Date(b.created) - new Date(a.created));
    }

    // Calculate work statistics
    calculateWorkStats() {
        const filtered = this.getFilteredWorks();
        const published = filtered.filter(w => w.status === 'published');
        
        const totalViews = filtered.reduce((sum, work) => sum + work.metrics.views, 0);
        const totalRecognitions = filtered.reduce((sum, work) => sum + work.metrics.recognitions, 0);
        const collaborations = filtered.reduce((sum, work) => sum + work.metrics.collaborations, 0);
        
        const scores = published.map(w => w.metrics.averageScore).filter(score => score > 0);
        const averageScore = scores.length > 0 ? 
            Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0;

        return {
            totalWorks: filtered.length,
            publishedWorks: published.length,
            totalViews,
            totalRecognitions,
            averageScore,
            collaborations
        };
    }

    // Get status color
    getStatusColor(status) {
        const colors = {
            'published': '#c9a84c',
            'draft': '#4a5568',
            'archived': '#1a202c'
        };
        return colors[status] || '#1a202c';
    }

    // Get category color
    getCategoryColor(category) {
        const colors = {
            'Digital': '#805ad5',
            'Physical': '#1a1a1a',
            'Methodology': '#c9a84c',
            'Analysis': '#4a5568',
            'Innovation': '#805ad5'
        };
        return colors[category] || '#1a202c';
    }

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    // View work details
    viewWork(workId) {
        const work = this.works.find(w => w.id === workId);
        if (!work) return;

        // Will implement work detail modal
        console.log('View work:', work);
    }

    // Show submit modal
    showSubmitModal() {
        // Will implement work submission modal
        console.log('Show submit modal');
    }

    // Show portfolio
    showPortfolio() {
        // Will implement portfolio view
        console.log('Show portfolio');
    }

    // Export works data
    exportWorks() {
        const filtered = this.getFilteredWorks();
        const exportData = {
            works: filtered,
            statistics: this.calculateWorkStats(),
            exported: new Date().toISOString(),
            filters: this.filters
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aurelion-works-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Update filter
    updateFilter(filterType, value) {
        this.filters[filterType] = value;
        this.renderWorkInterface();
    }

    // Add CSS styles
    addStyles() {
        if (document.getElementById('workSystemStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'workSystemStyles';
        style.textContent = `
            .work-system {
                max-width: 1400px;
                margin: 0 auto;
                padding: var(--space-3xl);
            }

            .work-header {
                margin-bottom: var(--space-4xl);
                padding-bottom: var(--space-2xl);
                border-bottom: 1px solid var(--color-glass-border);
            }

            .work-header h1 {
                font-family: var(--font-display);
                font-size: var(--text-4xl);
                color: var(--color-gold);
                margin-bottom: var(--space-md);
                text-transform: uppercase;
                letter-spacing: var(--tracking-widest);
            }

            .work-header p {
                font-size: var(--text-lg);
                color: var(--color-text-secondary);
                margin-bottom: var(--space-2xl);
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            .work-actions {
                display: flex;
                gap: var(--space-lg);
                justify-content: center;
                margin-bottom: var(--space-2xl);
                flex-wrap: wrap;
            }

            .action-button {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                color: var(--color-text-primary);
                padding: var(--space-md) var(--space-xl);
                border-radius: var(--radius-pill);
                font-size: var(--text-sm);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                cursor: pointer;
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .action-button:hover {
                border-color: var(--color-gold);
                color: var(--color-gold);
                transform: translateY(-2px);
            }

            .action-button.primary {
                background: var(--color-gold);
                color: var(--deep-black);
                border-color: var(--color-gold);
            }

            .action-button.primary:hover {
                background: var(--color-gold-dim);
                border-color: var(--color-gold-dim);
            }

            .work-filters {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: var(--space-lg);
                margin-bottom: var(--space-2xl);
            }

            .filter-group {
                display: flex;
                flex-direction: column;
                gap: var(--space-sm);
            }

            .filter-group label {
                font-size: var(--text-sm);
                color: var(--color-gold);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                font-weight: 500;
            }

            .filter-group select {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                color: var(--color-text-primary);
                padding: var(--space-sm) var(--space-md);
                border-radius: var(--radius-card);
                font-size: var(--text-sm);
                cursor: pointer;
            }

            .work-grid-section {
                margin-bottom: var(--space-4xl);
            }

            .works-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: var(--space-2xl);
            }

            .work-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                border-radius: var(--radius-card);
                overflow: hidden;
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .work-card:hover {
                border-color: var(--color-gold);
                transform: translateY(-4px);
            }

            .work-preview {
                position: relative;
                height: 200px;
                overflow: hidden;
            }

            .work-preview img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform var(--duration-base) var(--ease-cinematic);
            }

            .work-card:hover .work-preview img {
                transform: scale(1.05);
            }

            .work-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity var(--duration-base) var(--ease-cinematic);
            }

            .work-card:hover .work-overlay {
                opacity: 1;
            }

            .view-button {
                background: var(--color-gold);
                color: var(--deep-black);
                padding: var(--space-sm) var(--space-lg);
                border: none;
                border-radius: var(--radius-pill);
                font-size: var(--text-sm);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                cursor: pointer;
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .view-button:hover {
                background: var(--color-gold-dim);
                transform: translateY(-2px);
            }

            .work-info {
                padding: var(--space-lg);
            }

            .work-info h3 {
                font-size: var(--text-xl);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .work-creator {
                color: var(--color-text-secondary);
                margin-bottom: var(--space-md);
                font-size: var(--text-sm);
            }

            .work-description {
                color: var(--color-text-primary);
                margin-bottom: var(--space-md);
                line-height: var(--leading-relaxed);
                font-size: var(--text-sm);
            }

            .work-meta {
                display: flex;
                gap: var(--space-sm);
                margin-bottom: var(--space-md);
                flex-wrap: wrap;
            }

            .work-category,
            .work-status {
                color: white;
                padding: var(--space-xs) var(--space-sm);
                border-radius: var(--radius-pill);
                font-size: var(--text-xs);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .work-date {
                color: var(--color-text-muted);
                font-size: var(--text-xs);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .work-tags {
                display: flex;
                gap: var(--space-sm);
                margin-bottom: var(--space-md);
                flex-wrap: wrap;
            }

            .tag {
                background: var(--color-glass-border);
                color: var(--color-text-secondary);
                padding: var(--space-xs) var(--space-sm);
                border-radius: var(--radius-pill);
                font-size: var(--text-xs);
            }

            .work-metrics {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: var(--space-sm);
                padding-top: var(--space-md);
                border-top: 1px solid var(--color-glass-border);
            }

            .metric {
                display: flex;
                align-items: center;
                gap: var(--space-xs);
                font-size: var(--text-xs);
                color: var(--color-text-muted);
            }

            .metric-icon {
                font-size: var(--text-sm);
                color: var(--color-gold);
            }

            .metric-value {
                font-weight: 600;
                color: var(--color-text-secondary);
            }

            .work-stats h2 {
                font-family: var(--font-display);
                font-size: var(--text-2xl);
                color: var(--color-gold);
                margin-bottom: var(--space-xl);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: var(--space-lg);
            }

            .stat-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-lg);
                border-radius: var(--radius-card);
                text-align: center;
            }

            .stat-card h3 {
                font-size: var(--text-3xl);
                color: var(--color-gold);
                margin-bottom: var(--space-xs);
            }

            .stat-card p {
                color: var(--color-text-secondary);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                font-size: var(--text-sm);
            }

            .empty-state {
                text-align: center;
                color: var(--color-text-muted);
                font-style: italic;
                padding: var(--space-4xl);
            }

            @media (max-width: 768px) {
                .work-system {
                    padding: var(--space-xl);
                }
                
                .work-actions {
                    flex-direction: column;
                    align-items: center;
                }
                
                .work-filters {
                    grid-template-columns: 1fr;
                }
                
                .works-grid {
                    grid-template-columns: 1fr;
                }
                
                .work-metrics {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Static method to initialize
    static init() {
        const workSystem = new WorkSystem();
        workSystem.initialize();
        return workSystem;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkSystem;
} else {
    window.WorkSystem = WorkSystem;
}
