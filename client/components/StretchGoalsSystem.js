// Phase 18: Stretch Goals System
// Advanced features: directory, invites, analytics, and premium features

class StretchGoalsSystem {
    constructor() {
        this.currentUser = null;
        this.directory = [];
        this.invitations = [];
        this.analytics = {};
        this.premiumFeatures = {
            advancedAnalytics: false,
            customThemes: false,
            prioritySupport: false,
            enhancedRecognition: false,
            exclusiveContent: false,
            earlyAccess: false
        };
        this.subscriptionStatus = null;
    }

    // Initialize stretch goals system
    initialize() {
        this.loadCurrentUser();
        this.loadDirectory();
        this.loadInvitations();
        this.loadAnalytics();
        this.loadSubscriptionStatus();
        this.renderStretchGoalsInterface();
        this.addStyles();
    }

    // Load current user
    loadCurrentUser() {
        // Mock user - will be replaced with Firebase auth
        this.currentUser = {
            id: 'user_001',
            name: 'Observer Alpha',
            email: 'observer@aurelion.org',
            house: 'house1',
            role: 'Elder',
            subscription: 'premium'
        };
    }

    // Load directory data
    loadDirectory() {
        // Mock directory data
        this.directory = [
            {
                id: 'user_001',
                name: 'Observer Alpha',
                title: 'Senior Recognition Analyst',
                house: 'house1',
                specialties: ['Precision Analysis', 'Methodology Development'],
                bio: 'Specializing in precision recognition and systematic observation methodologies.',
                avatar: 'https://picsum.photos/seed/alpha/100/100.jpg',
                contact: 'observer@aurelion.org',
                status: 'active',
                joined: '2023-01-15',
                recognitionsGiven: 45,
                recognitionsReceived: 38,
                averageScore: 91.2,
                availability: 'available',
                location: 'San Francisco, CA',
                languages: ['English', 'Spanish'],
                certifications: ['Advanced Recognition', 'Methodology Expert']
            },
            {
                id: 'user_002',
                name: 'Observer Beta',
                title: 'Discipline Specialist',
                house: 'house2',
                specialties: ['Discipline Training', 'Performance Analysis'],
                bio: 'Expert in discipline development and performance optimization strategies.',
                avatar: 'https://picsum.photos/seed/beta/100/100.jpg',
                contact: 'beta@aurelion.org',
                status: 'active',
                joined: '2023-03-20',
                recognitionsGiven: 32,
                recognitionsReceived: 28,
                averageScore: 87.5,
                availability: 'busy',
                location: 'New York, NY',
                languages: ['English', 'French'],
                certifications: ['Discipline Master', 'Performance Analyst']
            },
            {
                id: 'user_003',
                name: 'Observer Gamma',
                title: 'Execution Strategist',
                house: 'house3',
                specialties: ['Execution Planning', 'System Integration'],
                bio: 'Focused on execution strategies and integration of complex recognition systems.',
                avatar: 'https://picsum.photos/seed/gamma/100/100.jpg',
                contact: 'gamma@aurelion.org',
                status: 'active',
                joined: '2023-06-10',
                recognitionsGiven: 28,
                recognitionsReceived: 31,
                averageScore: 89.8,
                availability: 'available',
                location: 'London, UK',
                languages: ['English', 'German'],
                certifications: ['Execution Expert', 'Systems Integration']
            },
            {
                id: 'user_004',
                name: 'Observer Delta',
                title: 'Observation Researcher',
                house: 'house4',
                specialties: ['Observational Methods', 'Data Analysis'],
                bio: 'Researcher in advanced observational techniques and data-driven recognition.',
                avatar: 'https://picsum.photos/seed/delta/100/100.jpg',
                contact: 'delta@aurelion.org',
                status: 'away',
                joined: '2023-09-15',
                recognitionsGiven: 18,
                recognitionsReceived: 22,
                averageScore: 85.3,
                availability: 'away',
                location: 'Tokyo, Japan',
                languages: ['English', 'Japanese'],
                certifications: ['Research Methodology', 'Data Analysis']
            },
            {
                id: 'user_005',
                name: 'Observer Epsilon',
                title: 'Recognition Consultant',
                house: 'house5',
                specialties: ['Recognition Consulting', 'Quality Assurance'],
                bio: 'Consultant for recognition systems with focus on quality and precision.',
                avatar: 'https://picsum.photos/seed/epsilon/100/100.jpg',
                contact: 'epsilon@aurelion.org',
                status: 'active',
                joined: '2023-11-20',
                recognitionsGiven: 15,
                recognitionsReceived: 19,
                averageScore: 88.7,
                availability: 'available',
                location: 'Sydney, Australia',
                languages: ['English', 'Mandarin'],
                certifications: ['Consulting Excellence', 'Quality Assurance']
            }
        ];
    }

    // Load invitations
    loadInvitations() {
        // Mock invitations data
        this.invitations = [
            {
                id: 'inv_001',
                type: 'sent',
                recipientEmail: 'candidate@example.com',
                recipientName: 'Jane Candidate',
                senderId: 'user_001',
                senderName: 'Observer Alpha',
                houseId: 'house1',
                message: 'We would like to invite you to join House 1 as a recognition specialist.',
                status: 'pending',
                sentAt: '2024-01-18T10:30:00Z',
                expiresAt: '2024-02-18T10:30:00Z',
                invitationCode: 'AURELION-H1-2024-001'
            },
            {
                id: 'inv_002',
                type: 'received',
                senderId: 'user_002',
                senderName: 'Observer Beta',
                recipientId: 'user_001',
                recipientName: 'Observer Alpha',
                houseId: 'house2',
                message: 'Invitation to collaborate on cross-house recognition project.',
                status: 'pending',
                sentAt: '2024-01-17T14:15:00Z',
                expiresAt: '2024-01-31T14:15:00Z',
                invitationCode: 'AURELION-H2-2024-002'
            },
            {
                id: 'inv_003',
                type: 'sent',
                recipientEmail: 'newmember@example.com',
                recipientName: 'New Member',
                senderId: 'user_001',
                senderName: 'Observer Alpha',
                houseId: 'house1',
                message: 'Welcome invitation to join the AURELION recognition system.',
                status: 'accepted',
                sentAt: '2024-01-15T09:00:00Z',
                respondedAt: '2024-01-16T11:30:00Z',
                invitationCode: 'AURELION-H1-2024-003'
            }
        ];
    }

    // Load analytics data
    loadAnalytics() {
        // Mock analytics data
        this.analytics = {
            overview: {
                totalUsers: 156,
                activeUsers: 89,
                totalWorks: 342,
                totalRecognitions: 1247,
                averageScore: 87.3,
                growthRate: 12.5,
                engagementRate: 78.4
            },
            userMetrics: {
                newUsers: {
                    thisMonth: 12,
                    lastMonth: 8,
                    growth: 50
                },
                retention: {
                    day1: 95,
                    day7: 87,
                    day30: 72
                },
                activity: {
                    daily: 45,
                    weekly: 89,
                    monthly: 134
                }
            },
            contentMetrics: {
                works: {
                    submitted: 342,
                    published: 298,
                    draft: 44
                },
                recognitions: {
                    given: 1247,
                    averageScore: 87.3,
                    distribution: {
                        '90-100': 342,
                        '80-89': 567,
                        '70-79': 234,
                        '60-69': 89,
                        'below 60': 15
                    }
                }
            },
            houseMetrics: {
                house1: {
                    members: 32,
                    works: 89,
                    recognitions: 234,
                    avgScore: 91.2
                },
                house2: {
                    members: 28,
                    works: 76,
                    recognitions: 198,
                    avgScore: 87.5
                },
                house3: {
                    members: 31,
                    works: 82,
                    recognitions: 267,
                    avgScore: 89.8
                },
                house4: {
                    members: 29,
                    works: 71,
                    recognitions: 223,
                    avgScore: 85.3
                },
                house5: {
                    members: 36,
                    works: 92,
                    recognitions: 325,
                    avgScore: 88.7
                }
            },
            trends: {
                userGrowth: [
                    { month: '2023-08', users: 89 },
                    { month: '2023-09', users: 102 },
                    { month: '2023-10', users: 118 },
                    { month: '2023-11', users: 134 },
                    { month: '2023-12', users: 145 },
                    { month: '2024-01', users: 156 }
                ],
                recognitionVolume: [
                    { month: '2023-08', count: 156 },
                    { month: '2023-09', count: 189 },
                    { month: '2023-10', count: 203 },
                    { month: '2023-11', count: 234 },
                    { month: '2023-12', count: 267 },
                    { month: '2024-01', count: 298 }
                ]
            }
        };
    }

    // Load subscription status
    loadSubscriptionStatus() {
        // Mock subscription data
        this.subscriptionStatus = {
            plan: 'premium',
            status: 'active',
            startDate: '2023-01-15',
            nextBilling: '2024-02-15',
            price: 29.99,
            currency: 'USD',
            features: this.premiumFeatures,
            usage: {
                analyticsQueries: 1247,
                maxQueries: 5000,
                storageUsed: 2.3,
                maxStorage: 10,
                apiCalls: 8923,
                maxApiCalls: 50000
            }
        };
    }

    // Render stretch goals interface
    renderStretchGoalsInterface() {
        const container = document.getElementById('adminContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="stretch-goals-system">
                <!-- Stretch Goals Header -->
                <section class="stretch-header">
                    <h1>Advanced Features</h1>
                    <p>Directory, invitations, analytics, and premium capabilities</p>
                    
                    <!-- Feature Navigation -->
                    <div class="feature-nav">
                        <button class="nav-tab active" onclick="stretchGoals.switchTab('directory')">
                            Directory
                        </button>
                        <button class="nav-tab" onclick="stretchGoals.switchTab('invitations')">
                            Invitations
                        </button>
                        <button class="nav-tab" onclick="stretchGoals.switchTab('analytics')">
                            Analytics
                        </button>
                        <button class="nav-tab" onclick="stretchGoals.switchTab('premium')">
                            Premium
                        </button>
                    </div>
                </section>

                <!-- Directory Section -->
                <section class="directory-section active" id="directory-tab">
                    <h2>Observer Directory</h2>
                    <div class="directory-controls">
                        <div class="search-box">
                            <input type="text" placeholder="Search observers..." 
                                   onkeyup="stretchGoals.searchDirectory(this.value)">
                            <button class="search-button">Search</button>
                        </div>
                        <div class="filter-controls">
                            <select onchange="stretchGoals.filterByHouse(this.value)">
                                <option value="all">All Houses</option>
                                <option value="house1">House 1</option>
                                <option value="house2">House 2</option>
                                <option value="house3">House 3</option>
                                <option value="house4">House 4</option>
                                <option value="house5">House 5</option>
                            </select>
                            <select onchange="stretchGoals.filterByAvailability(this.value)">
                                <option value="all">All Status</option>
                                <option value="available">Available</option>
                                <option value="busy">Busy</option>
                                <option value="away">Away</option>
                            </select>
                        </div>
                    </div>
                    <div class="directory-grid" id="directory-grid">
                        ${this.renderDirectoryGrid()}
                    </div>
                </section>

                <!-- Invitations Section -->
                <section class="invitations-section" id="invitations-tab">
                    <h2>Invitation Management</h2>
                    <div class="invitation-actions">
                        <button class="action-button primary" onclick="stretchGoals.createInvitation()">
                            Send Invitation
                        </button>
                        <button class="action-button secondary" onclick="stretchGoals.viewInvitationHistory()">
                            View History
                        </button>
                    </div>
                    <div class="invitations-tabs">
                        <button class="inv-tab active" onclick="stretchGoals.switchInvitationTab('sent')">
                            Sent (${this.getInvitationCount('sent')})
                        </button>
                        <button class="inv-tab" onclick="stretchGoals.switchInvitationTab('received')">
                            Received (${this.getInvitationCount('received')})
                        </button>
                    </div>
                    <div class="invitations-list" id="invitations-list">
                        ${this.renderInvitationsList('sent')}
                    </div>
                </section>

                <!-- Analytics Section -->
                <section class="analytics-section" id="analytics-tab">
                    <h2>Advanced Analytics</h2>
                    <div class="analytics-overview">
                        ${this.renderAnalyticsOverview()}
                    </div>
                    <div class="analytics-charts">
                        <div class="chart-container">
                            <h3>User Growth Trend</h3>
                            <div class="chart-placeholder">
                                <p>User growth chart would be rendered here</p>
                            </div>
                        </div>
                        <div class="chart-container">
                            <h3>Recognition Volume</h3>
                            <div class="chart-placeholder">
                                <p>Recognition volume chart would be rendered here</p>
                            </div>
                        </div>
                    </div>
                    <div class="analytics-details">
                        <div class="detail-section">
                            <h3>User Metrics</h3>
                            ${this.renderUserMetrics()}
                        </div>
                        <div class="detail-section">
                            <h3>Content Metrics</h3>
                            ${this.renderContentMetrics()}
                        </div>
                        <div class="detail-section">
                            <h3>House Performance</h3>
                            ${this.renderHouseMetrics()}
                        </div>
                    </div>
                </section>

                <!-- Premium Section -->
                <section class="premium-section" id="premium-tab">
                    <h2>Premium Features</h2>
                    <div class="subscription-status">
                        ${this.renderSubscriptionStatus()}
                    </div>
                    <div class="premium-features">
                        <h3>Available Features</h3>
                        <div class="features-grid">
                            ${this.renderPremiumFeatures()}
                        </div>
                    </div>
                    <div class="usage-monitoring">
                        <h3>Usage Monitoring</h3>
                        ${this.renderUsageMonitoring()}
                    </div>
                </section>
            </div>
        `;
    }

    // Render directory grid
    renderDirectoryGrid() {
        return this.directory.map(member => `
            <div class="directory-card" data-house="${member.house}" data-availability="${member.availability}">
                <div class="member-avatar">
                    <img src="${member.avatar}" alt="${member.name}" loading="lazy">
                    <div class="status-indicator ${member.availability}"></div>
                </div>
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p class="member-title">${member.title}</p>
                    <p class="member-house">${member.house}</p>
                    <p class="member-bio">${member.bio}</p>
                    <div class="member-specialties">
                        ${member.specialties.map(specialty => `<span class="specialty">${specialty}</span>`).join('')}
                    </div>
                    <div class="member-stats">
                        <div class="stat">
                            <span class="stat-label">Recognitions Given:</span>
                            <span class="stat-value">${member.recognitionsGiven}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Recognitions Received:</span>
                            <span class="stat-value">${member.recognitionsReceived}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Average Score:</span>
                            <span class="stat-value">${member.averageScore}</span>
                        </div>
                    </div>
                    <div class="member-contact">
                        <span class="contact-email">${member.contact}</span>
                        <span class="contact-location">${member.location}</span>
                    </div>
                    <div class="member-actions">
                        <button class="action-btn" onclick="stretchGoals.contactMember('${member.id}')">
                            Contact
                        </button>
                        <button class="action-btn" onclick="stretchGoals.viewProfile('${member.id}')">
                            View Profile
                        </button>
                        <button class="action-btn" onclick="stretchGoals.inviteCollaboration('${member.id}')">
                            Invite Collaboration
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render invitations list
    renderInvitationsList(type) {
        const invitations = this.invitations.filter(inv => inv.type === type);
        
        if (invitations.length === 0) {
            return '<p class="empty-state">No invitations found</p>';
        }

        return invitations.map(invitation => `
            <div class="invitation-card ${invitation.status}">
                <div class="invitation-header">
                    <h4>
                        ${type === 'sent' ? `To: ${invitation.recipientName}` : `From: ${invitation.senderName}`}
                    </h4>
                    <span class="invitation-status ${invitation.status}">${invitation.status}</span>
                </div>
                <div class="invitation-content">
                    <p class="invitation-message">${invitation.message}</p>
                    <div class="invitation-details">
                        <span class="invitation-house">${invitation.houseId}</span>
                        <span class="invitation-date">${this.formatDate(invitation.sentAt)}</span>
                        <span class="invitation-code">Code: ${invitation.invitationCode}</span>
                    </div>
                </div>
                <div class="invitation-actions">
                    ${this.renderInvitationActions(invitation, type)}
                </div>
            </div>
        `).join('');
    }

    // Render invitation actions
    renderInvitationActions(invitation, type) {
        if (type === 'sent') {
            switch (invitation.status) {
                case 'pending':
                    return `
                        <button class="action-btn" onclick="stretchGoals.resendInvitation('${invitation.id}')">
                            Resend
                        </button>
                        <button class="action-btn danger" onclick="stretchGoals.cancelInvitation('${invitation.id}')">
                            Cancel
                        </button>
                    `;
                case 'accepted':
                    return `
                        <button class="action-btn success" onclick="stretchGoals.viewAcceptedInvitation('${invitation.id}')">
                            View Response
                        </button>
                    `;
                default:
                    return '';
            }
        } else {
            switch (invitation.status) {
                case 'pending':
                    return `
                        <button class="action-btn success" onclick="stretchGoals.acceptInvitation('${invitation.id}')">
                            Accept
                        </button>
                        <button class="action-btn danger" onclick="stretchGoals.declineInvitation('${invitation.id}')">
                            Decline
                        </button>
                    `;
                case 'accepted':
                    return `
                        <button class="action-btn" onclick="stretchGoals.viewAcceptedInvitation('${invitation.id}')">
                            View Details
                        </button>
                    `;
                default:
                    return '';
            }
        }
    }

    // Render analytics overview
    renderAnalyticsOverview() {
        const { overview } = this.analytics;
        
        return `
            <div class="overview-grid">
                <div class="overview-card">
                    <h3>${overview.totalUsers}</h3>
                    <p>Total Users</p>
                    <span class="trend positive">+${overview.growthRate}%</span>
                </div>
                <div class="overview-card">
                    <h3>${overview.activeUsers}</h3>
                    <p>Active Users</p>
                    <span class="trend positive">${((overview.activeUsers / overview.totalUsers) * 100).toFixed(1)}% engagement</span>
                </div>
                <div class="overview-card">
                    <h3>${overview.totalWorks}</h3>
                    <p>Total Works</p>
                    <span class="trend positive">Growth steady</span>
                </div>
                <div class="overview-card">
                    <h3>${overview.totalRecognitions}</h3>
                    <p>Total Recognitions</p>
                    <span class="trend positive">Volume increasing</span>
                </div>
                <div class="overview-card">
                    <h3>${overview.averageScore}</h3>
                    <p>Average Score</p>
                    <span class="trend neutral">Quality maintained</span>
                </div>
                <div class="overview-card">
                    <h3>${overview.engagementRate}%</h3>
                    <p>Engagement Rate</p>
                    <span class="trend positive">Above target</span>
                </div>
            </div>
        `;
    }

    // Render user metrics
    renderUserMetrics() {
        const { userMetrics } = this.analytics;
        
        return `
            <div class="metrics-grid">
                <div class="metric-card">
                    <h4>New Users</h4>
                    <div class="metric-value">${userMetrics.newUsers.thisMonth}</div>
                    <div class="metric-change positive">+${userMetrics.newUsers.growth}% from last month</div>
                </div>
                <div class="metric-card">
                    <h4>Day 1 Retention</h4>
                    <div class="metric-value">${userMetrics.retention.day1}%</div>
                    <div class="metric-change positive">Strong onboarding</div>
                </div>
                <div class="metric-card">
                    <h4>Day 7 Retention</h4>
                    <div class="metric-value">${userMetrics.retention.day7}%</div>
                    <div class="metric-change neutral">Good engagement</div>
                </div>
                <div class="metric-card">
                    <h4>Day 30 Retention</h4>
                    <div class="metric-value">${userMetrics.retention.day30}%</div>
                    <div class="metric-change neutral">Stable retention</div>
                </div>
            </div>
        `;
    }

    // Render content metrics
    renderContentMetrics() {
        const { contentMetrics } = this.analytics;
        
        return `
            <div class="metrics-grid">
                <div class="metric-card">
                    <h4>Published Works</h4>
                    <div class="metric-value">${contentMetrics.works.published}</div>
                    <div class="metric-change positive">${((contentMetrics.works.published / contentMetrics.works.submitted) * 100).toFixed(1)}% published rate</div>
                </div>
                <div class="metric-card">
                    <h4>Draft Works</h4>
                    <div class="metric-value">${contentMetrics.works.draft}</div>
                    <div class="metric-change neutral">Works in progress</div>
                </div>
                <div class="metric-card">
                    <h4>Total Recognitions</h4>
                    <div class="metric-value">${contentMetrics.recognitions.given}</div>
                    <div class="metric-change positive">Active recognition</div>
                </div>
                <div class="metric-card">
                    <h4>Average Score</h4>
                    <div class="metric-value">${contentMetrics.recognitions.averageScore}</div>
                    <div class="metric-change positive">Quality maintained</div>
                </div>
            </div>
        `;
    }

    // Render house metrics
    renderHouseMetrics() {
        const { houseMetrics } = this.analytics;
        
        return Object.entries(houseMetrics).map(([houseId, metrics]) => `
            <div class="house-metric-card">
                <h4>${houseId}</h4>
                <div class="house-stats">
                    <div class="house-stat">
                        <span class="stat-label">Members:</span>
                        <span class="stat-value">${metrics.members}</span>
                    </div>
                    <div class="house-stat">
                        <span class="stat-label">Works:</span>
                        <span class="stat-value">${metrics.works}</span>
                    </div>
                    <div class="house-stat">
                        <span class="stat-label">Recognitions:</span>
                        <span class="stat-value">${metrics.recognitions}</span>
                    </div>
                    <div class="house-stat">
                        <span class="stat-label">Avg Score:</span>
                        <span class="stat-value">${metrics.avgScore}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render subscription status
    renderSubscriptionStatus() {
        const { subscriptionStatus } = this;
        
        return `
            <div class="subscription-card">
                <div class="subscription-header">
                    <h3>Current Plan: ${subscriptionStatus.plan.toUpperCase()}</h3>
                    <span class="status-badge ${subscriptionStatus.status}">${subscriptionStatus.status}</span>
                </div>
                <div class="subscription-details">
                    <div class="detail-row">
                        <span>Monthly Price:</span>
                        <span>$${subscriptionStatus.price} ${subscriptionStatus.currency}</span>
                    </div>
                    <div class="detail-row">
                        <span>Next Billing:</span>
                        <span>${this.formatDate(subscriptionStatus.nextBilling)}</span>
                    </div>
                    <div class="detail-row">
                        <span>Member Since:</span>
                        <span>${this.formatDate(subscriptionStatus.startDate)}</span>
                    </div>
                </div>
                <div class="subscription-actions">
                    <button class="action-button primary" onclick="stretchGoals.manageSubscription()">
                        Manage Subscription
                    </button>
                    <button class="action-button secondary" onclick="stretchGoals.viewBillingHistory()">
                        Billing History
                    </button>
                </div>
            </div>
        `;
    }

    // Render premium features
    renderPremiumFeatures() {
        const features = [
            {
                id: 'advancedAnalytics',
                name: 'Advanced Analytics',
                description: 'Deep insights into recognition patterns and user behavior',
                enabled: this.premiumFeatures.advancedAnalytics
            },
            {
                id: 'customThemes',
                name: 'Custom Themes',
                description: 'Personalize your interface with custom themes and layouts',
                enabled: this.premiumFeatures.customThemes
            },
            {
                id: 'prioritySupport',
                name: 'Priority Support',
                description: 'Get faster response times and dedicated support channels',
                enabled: this.premiumFeatures.prioritySupport
            },
            {
                id: 'enhancedRecognition',
                name: 'Enhanced Recognition',
                description: 'Advanced recognition tools and AI-powered insights',
                enabled: this.premiumFeatures.enhancedRecognition
            },
            {
                id: 'exclusiveContent',
                name: 'Exclusive Content',
                description: 'Access to premium tutorials, templates, and resources',
                enabled: this.premiumFeatures.exclusiveContent
            },
            {
                id: 'earlyAccess',
                name: 'Early Access',
                description: 'Be the first to try new features and improvements',
                enabled: this.premiumFeatures.earlyAccess
            }
        ];

        return features.map(feature => `
            <div class="feature-card ${feature.enabled ? 'enabled' : 'disabled'}">
                <div class="feature-header">
                    <h4>${feature.name}</h4>
                    <span class="feature-status ${feature.enabled ? 'enabled' : 'disabled'}">
                        ${feature.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                </div>
                <p class="feature-description">${feature.description}</p>
                <div class="feature-actions">
                    ${feature.enabled ? 
                        `<button class="action-btn" onclick="stretchGoals.configureFeature('${feature.id}')">
                            Configure
                        </button>` :
                        `<button class="action-btn primary" onclick="stretchGoals.enableFeature('${feature.id}')">
                            Enable
                        </button>`
                    }
                </div>
            </div>
        `).join('');
    }

    // Render usage monitoring
    renderUsageMonitoring() {
        const { usage } = this.subscriptionStatus;
        
        return `
            <div class="usage-grid">
                <div class="usage-card">
                    <h4>Analytics Queries</h4>
                    <div class="usage-bar">
                        <div class="usage-fill" style="width: ${(usage.analyticsQueries / usage.maxQueries * 100)}%"></div>
                    </div>
                    <div class="usage-text">${usage.analyticsQueries} / ${usage.maxQueries}</div>
                </div>
                <div class="usage-card">
                    <h4>Storage Used</h4>
                    <div class="usage-bar">
                        <div class="usage-fill" style="width: ${(usage.storageUsed / usage.maxStorage * 100)}%"></div>
                    </div>
                    <div class="usage-text">${usage.storageUsed}GB / ${usage.maxStorage}GB</div>
                </div>
                <div class="usage-card">
                    <h4>API Calls</h4>
                    <div class="usage-bar">
                        <div class="usage-fill" style="width: ${(usage.apiCalls / usage.maxApiCalls * 100)}%"></div>
                    </div>
                    <div class="usage-text">${usage.apiCalls} / ${usage.maxApiCalls}</div>
                </div>
            </div>
        `;
    }

    // Tab switching
    switchTab(tabName) {
        // Update nav tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        event.target.classList.add('active');

        // Update content sections
        document.querySelectorAll('.directory-section, .invitations-section, .analytics-section, .premium-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    // Invitation tab switching
    switchInvitationTab(type) {
        // Update invitation tabs
        document.querySelectorAll('.inv-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        event.target.classList.add('active');

        // Update invitations list
        document.getElementById('invitations-list').innerHTML = this.renderInvitationsList(type);
    }

    // Get invitation count
    getInvitationCount(type) {
        return this.invitations.filter(inv => inv.type === type && inv.status === 'pending').length;
    }

    // Search directory
    searchDirectory(query) {
        const cards = document.querySelectorAll('.directory-card');
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Filter by house
    filterByHouse(houseId) {
        const cards = document.querySelectorAll('.directory-card');
        
        cards.forEach(card => {
            if (houseId === 'all' || card.dataset.house === houseId) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Filter by availability
    filterByAvailability(availability) {
        const cards = document.querySelectorAll('.directory-card');
        
        cards.forEach(card => {
            if (availability === 'all' || card.dataset.availability === availability) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
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

    // Action methods (mock implementations)
    contactMember(memberId) {
        console.log('Contact member:', memberId);
    }

    viewProfile(memberId) {
        console.log('View profile:', memberId);
    }

    inviteCollaboration(memberId) {
        console.log('Invite collaboration:', memberId);
    }

    createInvitation() {
        console.log('Create invitation');
    }

    viewInvitationHistory() {
        console.log('View invitation history');
    }

    resendInvitation(invitationId) {
        console.log('Resend invitation:', invitationId);
    }

    cancelInvitation(invitationId) {
        console.log('Cancel invitation:', invitationId);
    }

    acceptInvitation(invitationId) {
        console.log('Accept invitation:', invitationId);
    }

    declineInvitation(invitationId) {
        console.log('Decline invitation:', invitationId);
    }

    viewAcceptedInvitation(invitationId) {
        console.log('View accepted invitation:', invitationId);
    }

    manageSubscription() {
        console.log('Manage subscription');
    }

    viewBillingHistory() {
        console.log('View billing history');
    }

    configureFeature(featureId) {
        console.log('Configure feature:', featureId);
    }

    enableFeature(featureId) {
        console.log('Enable feature:', featureId);
    }

    // Add CSS styles
    addStyles() {
        if (document.getElementById('stretchGoalsSystemStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'stretchGoalsSystemStyles';
        style.textContent = `
            .stretch-goals-system {
                max-width: 1400px;
                margin: 0 auto;
                padding: var(--space-3xl);
            }

            .stretch-header {
                margin-bottom: var(--space-4xl);
                padding-bottom: var(--space-2xl);
                border-bottom: 1px solid var(--color-glass-border);
            }

            .stretch-header h1 {
                font-family: var(--font-display);
                font-size: var(--text-4xl);
                color: var(--color-gold);
                margin-bottom: var(--space-md);
                text-transform: uppercase;
                letter-spacing: var(--tracking-widest);
            }

            .stretch-header p {
                font-size: var(--text-lg);
                color: var(--color-text-secondary);
                margin-bottom: var(--space-2xl);
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            .feature-nav {
                display: flex;
                gap: var(--space-md);
                justify-content: center;
                flex-wrap: wrap;
            }

            .nav-tab {
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

            .nav-tab:hover {
                border-color: var(--color-gold);
                color: var(--color-gold);
            }

            .nav-tab.active {
                background: var(--color-gold);
                color: var(--deep-black);
                border-color: var(--color-gold);
            }

            .directory-section,
            .invitations-section,
            .analytics-section,
            .premium-section {
                display: none;
            }

            .directory-section.active,
            .invitations-section.active,
            .analytics-section.active,
            .premium-section.active {
                display: block;
            }

            .directory-section h2,
            .invitations-section h2,
            .analytics-section h2,
            .premium-section h2 {
                font-family: var(--font-display);
                font-size: var(--text-2xl);
                color: var(--color-gold);
                margin-bottom: var(--space-xl);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .directory-controls {
                display: flex;
                gap: var(--space-lg);
                margin-bottom: var(--space-2xl);
                flex-wrap: wrap;
                align-items: center;
            }

            .search-box {
                display: flex;
                gap: var(--space-sm);
                flex: 1;
                min-width: 300px;
            }

            .search-box input {
                flex: 1;
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                color: var(--color-text-primary);
                padding: var(--space-sm) var(--space-md);
                border-radius: var(--radius-card);
                font-size: var(--text-sm);
            }

            .search-button {
                background: var(--color-gold);
                color: var(--deep-black);
                border: none;
                padding: var(--space-sm) var(--space-lg);
                border-radius: var(--radius-card);
                font-size: var(--text-sm);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                cursor: pointer;
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .search-button:hover {
                background: var(--color-gold-dim);
            }

            .filter-controls {
                display: flex;
                gap: var(--space-sm);
            }

            .filter-controls select {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                color: var(--color-text-primary);
                padding: var(--space-sm) var(--space-md);
                border-radius: var(--radius-card);
                font-size: var(--text-sm);
                cursor: pointer;
            }

            .directory-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: var(--space-2xl);
            }

            .directory-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                border-radius: var(--radius-card);
                padding: var(--space-lg);
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .directory-card:hover {
                border-color: var(--color-gold);
                transform: translateY(-2px);
            }

            .member-avatar {
                position: relative;
                width: 80px;
                height: 80px;
                margin: 0 auto var(--space-md);
            }

            .member-avatar img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
            }

            .status-indicator {
                position: absolute;
                bottom: 5px;
                right: 5px;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                border: 2px solid var(--deep-black);
            }

            .status-indicator.available {
                background: #10b981;
            }

            .status-indicator.busy {
                background: #f59e0b;
            }

            .status-indicator.away {
                background: #6b7280;
            }

            .member-info {
                text-align: center;
            }

            .member-info h3 {
                font-size: var(--text-xl);
                color: var(--color-gold);
                margin-bottom: var(--space-xs);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .member-title {
                color: var(--color-text-secondary);
                margin-bottom: var(--space-xs);
                font-size: var(--text-sm);
            }

            .member-house {
                color: var(--color-gold);
                margin-bottom: var(--space-md);
                font-size: var(--text-sm);
                font-weight: 500;
            }

            .member-bio {
                color: var(--color-text-primary);
                margin-bottom: var(--space-md);
                line-height: var(--leading-relaxed);
                font-size: var(--text-sm);
            }

            .member-specialties {
                display: flex;
                gap: var(--space-xs);
                justify-content: center;
                margin-bottom: var(--space-md);
                flex-wrap: wrap;
            }

            .specialty {
                background: var(--color-glass-border);
                color: var(--color-text-secondary);
                padding: var(--space-xs) var(--space-sm);
                border-radius: var(--radius-pill);
                font-size: var(--text-xs);
            }

            .member-stats {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: var(--space-sm);
                margin-bottom: var(--space-md);
                font-size: var(--text-xs);
            }

            .stat {
                text-align: center;
            }

            .stat-label {
                display: block;
                color: var(--color-text-muted);
                margin-bottom: var(--space-xs);
            }

            .stat-value {
                display: block;
                color: var(--color-gold);
                font-weight: 600;
            }

            .member-contact {
                display: flex;
                justify-content: space-between;
                margin-bottom: var(--space-md);
                font-size: var(--text-xs);
                color: var(--color-text-muted);
            }

            .member-actions {
                display: flex;
                gap: var(--space-sm);
                justify-content: center;
                flex-wrap: wrap;
            }

            .action-btn {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                color: var(--color-text-primary);
                padding: var(--space-xs) var(--space-sm);
                border-radius: var(--radius-card);
                font-size: var(--text-xs);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                cursor: pointer;
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .action-btn:hover {
                border-color: var(--color-gold);
                color: var(--color-gold);
            }

            .action-btn.primary {
                background: var(--color-gold);
                color: var(--deep-black);
                border-color: var(--color-gold);
            }

            .action-btn.danger {
                border-color: #dc2626;
                color: #dc2626;
            }

            .action-btn.danger:hover {
                background: #dc2626;
                color: white;
            }

            .action-btn.success {
                border-color: #10b981;
                color: #10b981;
            }

            .action-btn.success:hover {
                background: #10b981;
                color: white;
            }

            .invitation-actions {
                display: flex;
                gap: var(--space-sm);
                margin-top: var(--space-md);
            }

            .invitations-tabs {
                display: flex;
                gap: var(--space-md);
                margin-bottom: var(--space-lg);
            }

            .inv-tab {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                color: var(--color-text-secondary);
                padding: var(--space-sm) var(--space-lg);
                border-radius: var(--radius-pill);
                font-size: var(--text-sm);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                cursor: pointer;
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .inv-tab:hover {
                border-color: var(--color-gold);
                color: var(--color-gold);
            }

            .inv-tab.active {
                background: var(--color-gold);
                color: var(--deep-black);
                border-color: var(--color-gold);
            }

            .invitations-list {
                display: grid;
                gap: var(--space-lg);
            }

            .invitation-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                border-radius: var(--radius-card);
                padding: var(--space-lg);
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .invitation-card.pending {
                border-color: #f59e0b;
            }

            .invitation-card.accepted {
                border-color: #10b981;
            }

            .invitation-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: var(--space-md);
            }

            .invitation-header h4 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .invitation-status {
                padding: var(--space-xs) var(--space-sm);
                border-radius: var(--radius-pill);
                font-size: var(--text-xs);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .invitation-status.pending {
                background: #f59e0b;
                color: white;
            }

            .invitation-status.accepted {
                background: #10b981;
                color: white;
            }

            .invitation-message {
                color: var(--color-text-primary);
                margin-bottom: var(--space-md);
                line-height: var(--leading-relaxed);
            }

            .invitation-details {
                display: flex;
                gap: var(--space-lg);
                font-size: var(--text-xs);
                color: var(--color-text-muted);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .overview-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: var(--space-lg);
                margin-bottom: var(--space-2xl);
            }

            .overview-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-lg);
                border-radius: var(--radius-card);
                text-align: center;
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .overview-card:hover {
                border-color: var(--color-gold);
                transform: translateY(-2px);
            }

            .overview-card h3 {
                font-size: var(--text-3xl);
                color: var(--color-gold);
                margin-bottom: var(--space-xs);
            }

            .overview-card p {
                color: var(--color-text-secondary);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                font-size: var(--text-sm);
            }

            .trend {
                font-size: var(--text-xs);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .trend.positive {
                color: #10b981;
            }

            .trend.negative {
                color: #dc2626;
            }

            .trend.neutral {
                color: var(--color-text-muted);
            }

            .analytics-charts {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                gap: var(--space-lg);
                margin-bottom: var(--space-2xl);
            }

            .chart-container {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                border-radius: var(--radius-card);
                padding: var(--space-lg);
            }

            .chart-container h3 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                margin-bottom: var(--space-md);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .chart-placeholder {
                height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--color-text-muted);
                font-style: italic;
            }

            .analytics-details {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: var(--space-lg);
            }

            .detail-section {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                border-radius: var(--radius-card);
                padding: var(--space-lg);
            }

            .detail-section h3 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                margin-bottom: var(--space-md);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .metrics-grid {
                display: grid;
                gap: var(--space-md);
            }

            .metric-card {
                background: var(--deep-black);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-md);
                border-radius: var(--radius-card);
            }

            .metric-card h4 {
                font-size: var(--text-sm);
                color: var(--color-text-secondary);
                margin-bottom: var(--space-xs);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .metric-value {
                font-size: var(--text-2xl);
                color: var(--color-gold);
                font-weight: 600;
                margin-bottom: var(--space-xs);
            }

            .metric-change {
                font-size: var(--text-xs);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .house-metric-card {
                background: var(--deep-black);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-md);
                border-radius: var(--radius-card);
            }

            .house-metric-card h4 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                margin-bottom: var(--space-md);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .house-stats {
                display: grid;
                gap: var(--space-xs);
            }

            .house-stat {
                display: flex;
                justify-content: space-between;
                font-size: var(--text-sm);
            }

            .house-stat .stat-label {
                color: var(--color-text-secondary);
            }

            .house-stat .stat-value {
                color: var(--color-gold);
                font-weight: 500;
            }

            .subscription-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-gold);
                border-radius: var(--radius-card);
                padding: var(--space-2xl);
                margin-bottom: var(--space-2xl);
            }

            .subscription-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: var(--space-lg);
            }

            .subscription-header h3 {
                font-size: var(--text-2xl);
                color: var(--color-gold);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .status-badge {
                padding: var(--space-sm) var(--space-lg);
                border-radius: var(--radius-pill);
                font-size: var(--text-sm);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .status-badge.active {
                background: #10b981;
                color: white;
            }

            .subscription-details {
                display: grid;
                gap: var(--space-sm);
                margin-bottom: var(--space-lg);
            }

            .detail-row {
                display: flex;
                justify-content: space-between;
                font-size: var(--text-sm);
            }

            .detail-row span:first-child {
                color: var(--color-text-secondary);
            }

            .detail-row span:last-child {
                color: var(--color-text-primary);
                font-weight: 500;
            }

            .subscription-actions {
                display: flex;
                gap: var(--space-lg);
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
            }

            .action-button.primary {
                background: var(--color-gold);
                color: var(--deep-black);
                border-color: var(--color-gold);
            }

            .premium-features h3 {
                font-family: var(--font-display);
                font-size: var(--text-2xl);
                color: var(--color-gold);
                margin-bottom: var(--space-xl);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .features-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: var(--space-lg);
                margin-bottom: var(--space-2xl);
            }

            .feature-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                border-radius: var(--radius-card);
                padding: var(--space-lg);
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .feature-card.enabled {
                border-color: #10b981;
            }

            .feature-card.disabled {
                border-color: var(--color-glass-border);
                opacity: 0.7;
            }

            .feature-card:hover {
                border-color: var(--color-gold);
                transform: translateY(-2px);
            }

            .feature-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: var(--space-md);
            }

            .feature-header h4 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .feature-status {
                padding: var(--space-xs) var(--space-sm);
                border-radius: var(--radius-pill);
                font-size: var(--text-xs);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .feature-status.enabled {
                background: #10b981;
                color: white;
            }

            .feature-status.disabled {
                background: var(--color-glass-border);
                color: var(--color-text-muted);
            }

            .feature-description {
                color: var(--color-text-secondary);
                margin-bottom: var(--space-md);
                line-height: var(--leading-relaxed);
                font-size: var(--text-sm);
            }

            .feature-actions {
                text-align: center;
            }

            .usage-monitoring h3 {
                font-family: var(--font-display);
                font-size: var(--text-2xl);
                color: var(--color-gold);
                margin-bottom: var(--space-xl);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .usage-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: var(--space-lg);
            }

            .usage-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                border-radius: var(--radius-card);
                padding: var(--space-lg);
            }

            .usage-card h4 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                margin-bottom: var(--space-md);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .usage-bar {
                width: 100%;
                height: 8px;
                background: var(--color-glass-border);
                border-radius: var(--radius-pill);
                overflow: hidden;
                margin-bottom: var(--space-sm);
            }

            .usage-fill {
                height: 100%;
                background: var(--color-gold);
                transition: width var(--duration-base) var(--ease-cinematic);
            }

            .usage-text {
                font-size: var(--text-sm);
                color: var(--color-text-secondary);
                text-align: center;
            }

            .empty-state {
                text-align: center;
                color: var(--color-text-muted);
                font-style: italic;
                padding: var(--space-4xl);
            }

            @media (max-width: 768px) {
                .stretch-goals-system {
                    padding: var(--space-xl);
                }
                
                .feature-nav {
                    flex-direction: column;
                    align-items: center;
                }
                
                .directory-controls {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .search-box {
                    min-width: auto;
                }
                
                .directory-grid {
                    grid-template-columns: 1fr;
                }
                
                .overview-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .analytics-charts {
                    grid-template-columns: 1fr;
                }
                
                .analytics-details {
                    grid-template-columns: 1fr;
                }
                
                .subscription-actions {
                    flex-direction: column;
                }
                
                .features-grid {
                    grid-template-columns: 1fr;
                }
                
                .usage-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Static method to initialize
    static init() {
        const stretchGoalsSystem = new StretchGoalsSystem();
        stretchGoalsSystem.initialize();
        return stretchGoalsSystem;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StretchGoalsSystem;
} else {
    window.StretchGoalsSystem = StretchGoalsSystem;
}
