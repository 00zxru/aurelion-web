// Phase 10: Activity Feed & Boards
// Real-time activity tracking and board system for collective awareness

class ActivitySystem {
    constructor() {
        this.activities = [];
        this.boards = [];
        this.filters = {
            type: 'all',
            house: 'all',
            timeframe: 'week'
        };
        this.currentUser = null;
    }

    // Initialize activity system
    initialize() {
        this.loadCurrentUser();
        this.loadActivities();
        this.loadBoards();
        this.renderActivityInterface();
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

    // Load activities
    loadActivities() {
        // Mock activities data
        this.activities = [
            {
                id: 'act_001',
                type: 'recognition',
                title: 'Work recognized by House 2',
                description: 'Observer Beta\'s work "Silent Observation Study" received recognition',
                user: 'Observer Beta',
                house: 'house2',
                timestamp: '2024-01-20T10:30:00Z',
                metadata: {
                    workId: 'work_001',
                    score: 92,
                    recognizer: 'Observer Alpha'
                }
            },
            {
                id: 'act_002',
                type: 'collaboration',
                title: 'New collaboration started',
                description: 'Systems analysis project initiated with House 3',
                user: 'Observer Alpha',
                house: 'house1',
                timestamp: '2024-01-19T14:15:00Z',
                metadata: {
                    collaborators: ['Observer Gamma', 'Observer Delta'],
                    projectId: 'proj_001'
                }
            },
            {
                id: 'act_003',
                type: 'achievement',
                title: 'Achievement unlocked',
                description: 'Precision Master badge earned for consistent high-scoring recognitions',
                user: 'Observer Alpha',
                house: 'house1',
                timestamp: '2024-01-18T09:00:00Z',
                metadata: {
                    achievementId: 'precision_master',
                    level: 'Elder'
                }
            },
            {
                id: 'act_004',
                type: 'work_submission',
                title: 'New work submitted',
                description: 'Observation Framework v2 submitted for recognition',
                user: 'Observer Alpha',
                house: 'house1',
                timestamp: '2024-01-17T16:45:00Z',
                metadata: {
                    workId: 'work_002',
                    medium: 'Methodology'
                }
            },
            {
                id: 'act_005',
                type: 'house_event',
                title: 'House 1 gathering',
                description: 'Quarterly observation and discipline review session',
                user: 'House 1',
                house: 'house1',
                timestamp: '2024-01-16T20:00:00Z',
                metadata: {
                    eventType: 'gathering',
                    attendees: 12
                }
            }
        ];
    }

    // Load boards
    loadBoards() {
        this.boards = [
            {
                id: 'board_global',
                name: 'Global Activity',
                description: 'All activities across all houses',
                type: 'global',
                filters: ['type', 'timeframe']
            },
            {
                id: 'board_house1',
                name: 'House 1 Board',
                description: 'Activities specific to House 1',
                type: 'house',
                houseId: 'house1',
                filters: ['type', 'timeframe']
            },
            {
                id: 'board_house2',
                name: 'House 2 Board',
                description: 'Activities specific to House 2',
                type: 'house',
                houseId: 'house2',
                filters: ['type', 'timeframe']
            },
            {
                id: 'board_recognition',
                name: 'Recognition Board',
                description: 'All recognition activities and scores',
                type: 'specialized',
                filters: ['house', 'timeframe', 'score_range']
            }
        ];
    }

    // Render activity interface
    renderActivityInterface() {
        const container = document.getElementById('adminContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="activity-system">
                <!-- Activity Header -->
                <section class="activity-header">
                    <h1>Activity Boards</h1>
                    <p>Collective awareness and observation tracking</p>
                    
                    <!-- Board Navigation -->
                    <div class="board-nav">
                        ${this.boards.map(board => `
                            <button class="board-tab ${this.filters.type === 'all' && board.type === 'global' || this.filters.house === board.houseId ? 'active' : ''}" 
                                    onclick="activitySystem.switchBoard('${board.id}')">
                                ${board.name}
                            </button>
                        `).join('')}
                    </div>
                    
                    <!-- Filters -->
                    <div class="activity-filters">
                        <div class="filter-group">
                            <label>Type</label>
                            <select onchange="activitySystem.updateFilter('type', this.value)">
                                <option value="all">All Types</option>
                                <option value="recognition">Recognition</option>
                                <option value="collaboration">Collaboration</option>
                                <option value="achievement">Achievement</option>
                                <option value="work_submission">Work Submission</option>
                                <option value="house_event">House Event</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label>Timeframe</label>
                            <select onchange="activitySystem.updateFilter('timeframe', this.value)">
                                <option value="today">Today</option>
                                <option value="week" selected>This Week</option>
                                <option value="month">This Month</option>
                                <option value="all">All Time</option>
                            </select>
                        </div>
                    </div>
                </section>

                <!-- Activity Feed -->
                <section class="activity-feed">
                    <div class="feed-container">
                        ${this.renderFilteredActivities()}
                    </div>
                </section>

                <!-- Activity Stats -->
                <section class="activity-stats">
                    <h2>Activity Overview</h2>
                    <div class="stats-grid">
                        ${this.renderActivityStats()}
                    </div>
                </section>
            </div>
        `;
    }

    // Render filtered activities
    renderFilteredActivities() {
        const filtered = this.getFilteredActivities();
        
        if (filtered.length === 0) {
            return '<p class="empty-state">No activities found for current filters</p>';
        }

        return filtered.map(activity => this.renderActivityCard(activity)).join('');
    }

    // Render individual activity card
    renderActivityCard(activity) {
        const icon = this.getActivityIcon(activity.type);
        const color = this.getActivityColor(activity.type);
        const timeAgo = this.getTimeAgo(activity.timestamp);

        return `
            <div class="activity-card" data-activity-id="${activity.id}">
                <div class="activity-marker" style="background: ${color}">${icon}</div>
                <div class="activity-content">
                    <h3>${activity.title}</h3>
                    <p>${activity.description}</p>
                    <div class="activity-meta">
                        <span class="activity-user">${activity.user}</span>
                        <span class="activity-house">${activity.house}</span>
                        <span class="activity-time">${timeAgo}</span>
                    </div>
                    ${activity.metadata ? this.renderActivityMetadata(activity.metadata) : ''}
                </div>
            </div>
        `;
    }

    // Render activity metadata
    renderActivityMetadata(metadata) {
        return `
            <div class="activity-metadata">
                ${Object.entries(metadata).map(([key, value]) => {
                    if (Array.isArray(value)) {
                        return `<div class="metadata-item">
                            <span class="metadata-key">${key}:</span>
                            <span class="metadata-value">${value.join(', ')}</span>
                        </div>`;
                    } else if (typeof value === 'object') {
                        return `<div class="metadata-item">
                            <span class="metadata-key">${key}:</span>
                            <span class="metadata-value">${JSON.stringify(value)}</span>
                        </div>`;
                    } else {
                        return `<div class="metadata-item">
                            <span class="metadata-key">${key}:</span>
                            <span class="metadata-value">${value}</span>
                        </div>`;
                    }
                }).join('')}
            </div>
        `;
    }

    // Render activity statistics
    renderActivityStats() {
        const stats = this.calculateStats();
        
        return `
            <div class="stat-card">
                <h3>${stats.totalActivities}</h3>
                <p>Total Activities</p>
            </div>
            <div class="stat-card">
                <h3>${stats.recognitionCount}</h3>
                <p>Recognitions</p>
            </div>
            <div class="stat-card">
                <h3>${stats.collaborationCount}</h3>
                <p>Collaborations</p>
            </div>
            <div class="stat-card">
                <h3>${stats.achievementCount}</h3>
                <p>Achievements</p>
            </div>
            <div class="stat-card">
                <h3>${stats.activeUsers}</h3>
                <p>Active Users</p>
            </div>
        `;
    }

    // Get filtered activities
    getFilteredActivities() {
        let filtered = [...this.activities];

        // Filter by type
        if (this.filters.type !== 'all') {
            filtered = filtered.filter(activity => activity.type === this.filters.type);
        }

        // Filter by house
        if (this.filters.house !== 'all') {
            filtered = filtered.filter(activity => activity.house === this.filters.house);
        }

        // Filter by timeframe
        const now = new Date();
        filtered = filtered.filter(activity => {
            const activityDate = new Date(activity.timestamp);
            
            switch (this.filters.timeframe) {
                case 'today':
                    return activityDate.toDateString() === now.toDateString();
                case 'week':
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return activityDate >= weekAgo;
                case 'month':
                    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                    return activityDate >= monthAgo;
                default:
                    return true;
            }
        });

        // Sort by timestamp (newest first)
        return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    // Calculate statistics
    calculateStats() {
        const filtered = this.getFilteredActivities();
        const uniqueUsers = new Set(filtered.map(a => a.user));
        
        return {
            totalActivities: filtered.length,
            recognitionCount: filtered.filter(a => a.type === 'recognition').length,
            collaborationCount: filtered.filter(a => a.type === 'collaboration').length,
            achievementCount: filtered.filter(a => a.type === 'achievement').length,
            activeUsers: uniqueUsers.size
        };
    }

    // Get activity icon
    getActivityIcon(type) {
        const icons = {
            'recognition': '🏆',
            'collaboration': '🤝',
            'achievement': '🎯',
            'work_submission': '📊',
            'house_event': '🏛️'
        };
        return icons[type] || '📊';
    }

    // Get activity color
    getActivityColor(type) {
        const colors = {
            'recognition': '#c9a84c',
            'collaboration': '#4a5568',
            'achievement': '#805ad5',
            'work_submission': '#1a202c',
            'house_event': '#1a1a1a'
        };
        return colors[type] || '#1a1a1a';
    }

    // Get time ago string
    getTimeAgo(timestamp) {
        const now = new Date();
        const activityDate = new Date(timestamp);
        const diffMs = now - activityDate;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMins < 60) {
            return `${diffMins}m ago`;
        } else if (diffHours < 24) {
            return `${diffHours}h ago`;
        } else if (diffDays < 7) {
            return `${diffDays}d ago`;
        } else {
            return activityDate.toLocaleDateString();
        }
    }

    // Switch board
    switchBoard(boardId) {
        const board = this.boards.find(b => b.id === boardId);
        if (!board) return;

        if (board.type === 'house') {
            this.filters.house = board.houseId;
            this.filters.type = 'all';
        } else if (board.type === 'specialized') {
            this.filters.type = 'recognition';
            this.filters.house = 'all';
        } else {
            this.filters.type = 'all';
            this.filters.house = 'all';
        }

        this.renderActivityInterface();
    }

    // Update filter
    updateFilter(filterType, value) {
        this.filters[filterType] = value;
        this.renderActivityInterface();
    }

    // Add CSS styles
    addStyles() {
        if (document.getElementById('activitySystemStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'activitySystemStyles';
        style.textContent = `
            .activity-system {
                max-width: 1200px;
                margin: 0 auto;
                padding: var(--space-3xl);
            }

            .activity-header {
                margin-bottom: var(--space-4xl);
                padding-bottom: var(--space-2xl);
                border-bottom: 1px solid var(--color-glass-border);
            }

            .activity-header h1 {
                font-family: var(--font-display);
                font-size: var(--text-4xl);
                color: var(--color-gold);
                margin-bottom: var(--space-md);
                text-transform: uppercase;
                letter-spacing: var(--tracking-widest);
            }

            .activity-header p {
                font-size: var(--text-lg);
                color: var(--color-text-secondary);
                margin-bottom: var(--space-2xl);
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            .board-nav {
                display: flex;
                gap: var(--space-md);
                margin-bottom: var(--space-xl);
                flex-wrap: wrap;
            }

            .board-tab {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                color: var(--color-text-secondary);
                padding: var(--space-md) var(--space-xl);
                border-radius: var(--radius-pill);
                font-size: var(--text-sm);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                cursor: pointer;
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .board-tab:hover {
                border-color: var(--color-gold);
                color: var(--color-gold);
            }

            .board-tab.active {
                background: var(--color-gold);
                color: var(--deep-black);
                border-color: var(--color-gold);
            }

            .activity-filters {
                display: flex;
                gap: var(--space-xl);
                margin-bottom: var(--space-2xl);
                flex-wrap: wrap;
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

            .activity-feed {
                margin-bottom: var(--space-4xl);
            }

            .feed-container {
                display: grid;
                gap: var(--space-lg);
            }

            .activity-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-lg);
                border-radius: var(--radius-card);
                display: flex;
                gap: var(--space-md);
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .activity-card:hover {
                border-color: var(--color-gold);
                transform: translateY(-2px);
            }

            .activity-marker {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                color: white;
                flex-shrink: 0;
            }

            .activity-content {
                flex: 1;
            }

            .activity-content h3 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .activity-content p {
                color: var(--color-text-secondary);
                margin-bottom: var(--space-md);
                line-height: var(--leading-relaxed);
            }

            .activity-meta {
                display: flex;
                gap: var(--space-lg);
                font-size: var(--text-xs);
                color: var(--color-text-muted);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .activity-user {
                font-weight: 600;
                color: var(--color-text-primary);
            }

            .activity-house {
                color: var(--color-gold);
            }

            .activity-metadata {
                margin-top: var(--space-md);
                padding-top: var(--space-md);
                border-top: 1px solid var(--color-glass-border);
            }

            .metadata-item {
                display: flex;
                gap: var(--space-sm);
                margin-bottom: var(--space-xs);
                font-size: var(--text-xs);
            }

            .metadata-key {
                color: var(--color-gold);
                font-weight: 500;
                min-width: 80px;
            }

            .metadata-value {
                color: var(--color-text-secondary);
            }

            .activity-stats h2 {
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
                .activity-system {
                    padding: var(--space-xl);
                }
                
                .board-nav {
                    justify-content: center;
                }
                
                .activity-filters {
                    flex-direction: column;
                    gap: var(--space-lg);
                }
                
                .feed-container {
                    grid-template-columns: 1fr;
                }
                
                .activity-card {
                    flex-direction: column;
                    text-align: center;
                }
                
                .activity-meta {
                    flex-direction: column;
                    gap: var(--space-sm);
                    text-align: center;
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
        const activitySystem = new ActivitySystem();
        activitySystem.initialize();
        return activitySystem;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ActivitySystem;
} else {
    window.ActivitySystem = ActivitySystem;
}
