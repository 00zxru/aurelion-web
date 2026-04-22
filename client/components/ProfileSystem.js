// Phase 8: Profile System Expansion
// Enhanced profile with recognition history, achievements, and statistics

class ProfileSystem {
    constructor() {
        this.currentUser = null;
        this.profileData = null;
        this.recognitionHistory = [];
        this.achievements = [];
        this.statistics = {};
    }

    // Initialize profile system
    initialize() {
        this.loadCurrentUser();
        this.renderProfile();
        this.addStyles();
    }

    // Load current user data
    loadCurrentUser() {
        // Mock user data - will be replaced with Firebase auth
        this.currentUser = {
            id: 'user_001',
            name: 'Observer Alpha',
            email: 'observer@aurelion.org',
            joined: '2023-01-15',
            house: 'house1',
            role: 'Founder',
            status: 'active'
        };

        // Mock profile data
        this.profileData = {
            ...this.currentUser,
            bio: 'Precision in observation. Discipline in practice. Execution in creation.',
            specialties: ['Analysis', 'Systems', 'Methodology'],
            recognitionCount: 12,
            worksCount: 8,
            collaborationsCount: 3,
            lastActive: '2024-01-20'
        };

        // Mock statistics
        this.statistics = {
            totalObservations: 156,
            precisionScore: 94,
            disciplineScore: 89,
            executionScore: 91,
            overallScore: 91.3,
            rank: 'Elder',
            houseContribution: 87
        };

        // Mock achievements
        this.achievements = [
            {
                id: 'first_observation',
                name: 'First Observation',
                description: 'Completed initial recognition protocol',
                date: '2023-01-15',
                icon: '👁️'
            },
            {
                id: 'precision_master',
                name: 'Precision Master',
                description: 'Achieved 90+ precision score',
                date: '2023-06-20',
                icon: '🎯'
            },
            {
                id: 'house_contributor',
                name: 'House Contributor',
                description: 'Significant contribution to house activities',
                date: '2023-09-10',
                icon: '🏛️'
            }
        ];

        // Mock recognition history
        this.recognitionHistory = [
            {
                id: 'rec_001',
                type: 'work',
                title: 'Silent Observation Study',
                date: '2024-01-15',
                recognizedBy: 'House 1',
                score: 92,
                feedback: 'Exceptional precision in methodology'
            },
            {
                id: 'rec_002',
                type: 'collaboration',
                title: 'Systems Analysis Project',
                date: '2024-01-10',
                recognizedBy: 'House 2',
                score: 88,
                feedback: 'Strong collaborative execution'
            },
            {
                id: 'rec_003',
                type: 'innovation',
                title: 'Observation Framework v2',
                date: '2024-01-05',
                recognizedBy: 'AURELION',
                score: 95,
                feedback: 'Innovative approach to pattern recognition'
            }
        ];
    }

    // Render profile view
    renderProfile() {
        const container = document.getElementById('profileContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="profile-system">
                <!-- Profile Header -->
                <section class="profile-header">
                    <div class="profile-avatar">
                        <div class="avatar-symbol">°</div>
                        <div class="house-badge" style="background: ${this.getHouseColor()}">${this.currentUser.house.toUpperCase()}</div>
                    </div>
                    <div class="profile-info">
                        <h1 class="profile-name">${this.currentUser.name}</h1>
                        <p class="profile-role">${this.currentUser.role} · ${this.currentUser.house}</p>
                        <p class="profile-bio">${this.profileData.bio}</p>
                        <div class="profile-meta">
                            <span>Joined ${this.formatDate(this.currentUser.joined)}</span>
                            <span>Last active ${this.formatDate(this.profileData.lastActive)}</span>
                        </div>
                    </div>
                </section>

                <!-- Statistics Overview -->
                <section class="statistics-section">
                    <h2>Observation Metrics</h2>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <h3>${this.statistics.overallScore}</h3>
                            <p>Overall Score</p>
                            <div class="stat-bar">
                                <div class="stat-fill" style="width: ${this.statistics.overallScore}%"></div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <h3>${this.statistics.precisionScore}</h3>
                            <p>Precision</p>
                            <div class="stat-bar">
                                <div class="stat-fill" style="width: ${this.statistics.precisionScore}%"></div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <h3>${this.statistics.disciplineScore}</h3>
                            <p>Discipline</p>
                            <div class="stat-bar">
                                <div class="stat-fill" style="width: ${this.statistics.disciplineScore}%"></div>
                            </div>
                        </div>
                        <div class="stat-card">
                            <h3>${this.statistics.executionScore}</h3>
                            <p>Execution</p>
                            <div class="stat-bar">
                                <div class="stat-fill" style="width: ${this.statistics.executionScore}%"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Specialties & Skills -->
                <section class="specialties-section">
                    <h2>Areas of Focus</h2>
                    <div class="specialties-grid">
                        ${this.profileData.specialties.map(specialty => `
                            <div class="specialty-card">
                                <h3>${specialty}</h3>
                                <p>Advanced proficiency in ${specialty.toLowerCase()} methodology</p>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- Achievements -->
                <section class="achievements-section">
                    <h2>Recognition Achievements</h2>
                    <div class="achievements-grid">
                        ${this.achievements.map(achievement => `
                            <div class="achievement-card">
                                <div class="achievement-icon">${achievement.icon}</div>
                                <div class="achievement-info">
                                    <h3>${achievement.name}</h3>
                                    <p>${achievement.description}</p>
                                    <small>${this.formatDate(achievement.date)}</small>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- Recognition History -->
                <section class="recognition-history-section">
                    <h2>Recognition History</h2>
                    <div class="history-timeline">
                        ${this.recognitionHistory.map(recognition => `
                            <div class="history-item">
                                <div class="history-marker" style="background: ${this.getRecognitionColor(recognition.type)}"></div>
                                <div class="history-content">
                                    <h3>${recognition.title}</h3>
                                    <p>${recognition.feedback}</p>
                                    <div class="history-meta">
                                        <span>Score: ${recognition.score}</span>
                                        <span>By: ${recognition.recognizedBy}</span>
                                        <span>${this.formatDate(recognition.date)}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- Profile Actions -->
                <section class="profile-actions">
                    <button class="action-button primary" onclick="profileSystem.editProfile()">Edit Record</button>
                    <button class="action-button secondary" onclick="profileSystem.exportProfile()">Export Data</button>
                    <button class="action-button secondary" onclick="profileSystem.viewActivity()">Activity Log</button>
                </section>
            </div>
        `;
    }

    // Get house color
    getHouseColor() {
        const houseColors = {
            'house1': '#1a1a1a',
            'house2': '#c9a84c',
            'house3': '#4a5568',
            'house4': '#1a202c',
            'house5': '#805ad5'
        };
        return houseColors[this.currentUser.house] || '#1a1a1a';
    }

    // Get recognition color by type
    getRecognitionColor(type) {
        const colors = {
            'work': '#c9a84c',
            'collaboration': '#4a5568',
            'innovation': '#805ad5',
            'achievement': '#1a202c'
        };
        return colors[type] || '#1a1a1a';
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

    // Profile actions
    editProfile() {
        // Will implement profile editing modal
        console.log('Edit profile clicked');
    }

    exportProfile() {
        // Will implement profile data export
        const profileData = {
            user: this.currentUser,
            profile: this.profileData,
            statistics: this.statistics,
            achievements: this.achievements,
            recognitionHistory: this.recognitionHistory
        };
        
        const blob = new Blob([JSON.stringify(profileData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aurelion-profile-${this.currentUser.id}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    viewActivity() {
        // Will navigate to activity view
        console.log('View activity clicked');
    }

    // Add CSS styles
    addStyles() {
        if (document.getElementById('profileSystemStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'profileSystemStyles';
        style.textContent = `
            .profile-system {
                max-width: 1000px;
                margin: 0 auto;
                padding: var(--space-3xl);
            }

            .profile-header {
                display: flex;
                gap: var(--space-2xl);
                margin-bottom: var(--space-4xl);
                padding-bottom: var(--space-2xl);
                border-bottom: 1px solid var(--color-glass-border);
            }

            .profile-avatar {
                position: relative;
                width: 120px;
                height: 120px;
                flex-shrink: 0;
            }

            .avatar-symbol {
                width: 100%;
                height: 100%;
                background: var(--color-gold-dim);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                color: var(--color-gold);
            }

            .house-badge {
                position: absolute;
                bottom: -10px;
                right: -10px;
                color: white;
                padding: var(--space-xs) var(--space-sm);
                border-radius: var(--radius-pill);
                font-size: var(--text-xs);
                font-weight: 600;
                text-transform: uppercase;
            }

            .profile-info {
                flex: 1;
            }

            .profile-name {
                font-family: var(--font-display);
                font-size: var(--text-3xl);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .profile-role {
                font-size: var(--text-lg);
                color: var(--color-text-secondary);
                margin-bottom: var(--space-md);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .profile-bio {
                font-size: var(--text-base);
                line-height: var(--leading-relaxed);
                color: var(--color-text-primary);
                margin-bottom: var(--space-lg);
                max-width: 600px;
            }

            .profile-meta {
                display: flex;
                gap: var(--space-xl);
                font-size: var(--text-sm);
                color: var(--color-text-muted);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .statistics-section,
            .specialties-section,
            .achievements-section,
            .recognition-history-section {
                margin-bottom: var(--space-4xl);
            }

            .statistics-section h2,
            .specialties-section h2,
            .achievements-section h2,
            .recognition-history-section h2 {
                font-family: var(--font-display);
                font-size: var(--text-2xl);
                color: var(--color-gold);
                margin-bottom: var(--space-xl);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
                margin-bottom: var(--space-md);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                font-size: var(--text-sm);
            }

            .stat-bar {
                width: 100%;
                height: 4px;
                background: var(--color-glass-border);
                border-radius: var(--radius-pill);
                overflow: hidden;
            }

            .stat-fill {
                height: 100%;
                background: var(--color-gold);
                transition: width var(--duration-base) var(--ease-cinematic);
            }

            .specialties-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: var(--space-lg);
            }

            .specialty-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-lg);
                border-radius: var(--radius-card);
            }

            .specialty-card h3 {
                font-size: var(--text-xl);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .specialty-card p {
                color: var(--color-text-secondary);
                font-size: var(--text-sm);
            }

            .achievements-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: var(--space-lg);
            }

            .achievement-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-lg);
                border-radius: var(--radius-card);
                display: flex;
                gap: var(--space-md);
                align-items: flex-start;
            }

            .achievement-icon {
                font-size: 2rem;
                flex-shrink: 0;
            }

            .achievement-info h3 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                margin-bottom: var(--space-xs);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .achievement-info p {
                color: var(--color-text-secondary);
                margin-bottom: var(--space-sm);
                font-size: var(--text-sm);
            }

            .achievement-info small {
                color: var(--color-text-muted);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .history-timeline {
                position: relative;
                padding-left: var(--space-2xl);
            }

            .history-timeline::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 2px;
                background: var(--color-glass-border);
            }

            .history-item {
                position: relative;
                margin-bottom: var(--space-2xl);
                padding-left: var(--space-xl);
            }

            .history-marker {
                position: absolute;
                left: -9px;
                top: 0;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                border: 2px solid var(--deep-black);
            }

            .history-content {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-lg);
                border-radius: var(--radius-card);
            }

            .history-content h3 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .history-content p {
                color: var(--color-text-secondary);
                margin-bottom: var(--space-md);
            }

            .history-meta {
                display: flex;
                gap: var(--space-lg);
                font-size: var(--text-xs);
                color: var(--color-text-muted);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .profile-actions {
                display: flex;
                gap: var(--space-lg);
                justify-content: center;
                padding-top: var(--space-2xl);
                border-top: 1px solid var(--color-glass-border);
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

            @media (max-width: 768px) {
                .profile-system {
                    padding: var(--space-xl);
                }
                
                .profile-header {
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }
                
                .stats-grid,
                .specialties-grid,
                .achievements-grid {
                    grid-template-columns: 1fr;
                }
                
                .profile-actions {
                    flex-direction: column;
                }
                
                .history-meta {
                    flex-direction: column;
                    gap: var(--space-sm);
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Static method to initialize
    static init() {
        const profileSystem = new ProfileSystem();
        profileSystem.initialize();
        return profileSystem;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileSystem;
} else {
    window.ProfileSystem = ProfileSystem;
}
