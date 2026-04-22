// Phase 12: Admin Dashboard Expansion
// Comprehensive admin interface for system management and oversight

class AdminSystem {
    constructor() {
        this.currentUser = null;
        this.systemStats = {};
        this.users = [];
        this.activities = [];
        this.issues = [];
        this.maintenance = [];
    }

    // Initialize admin system
    initialize() {
        this.loadCurrentUser();
        this.loadSystemData();
        this.renderAdminInterface();
        this.addStyles();
    }

    // Load current user
    loadCurrentUser() {
        // Mock admin user - will be replaced with Firebase auth
        this.currentUser = {
            id: 'admin_001',
            name: 'System Administrator',
            role: 'Admin',
            permissions: ['full_access', 'user_management', 'system_config', 'analytics']
        };
    }

    // Load system data
    loadSystemData() {
        // Mock system statistics
        this.systemStats = {
            totalUsers: 156,
            activeUsers: 89,
            totalWorks: 342,
            pendingRecognitions: 23,
            systemUptime: '99.8%',
            storageUsed: '67%',
            lastBackup: '2024-01-20T02:00:00Z',
            apiResponseTime: '142ms',
            errorRate: '0.3%'
        };

        // Mock users data
        this.users = [
            {
                id: 'user_001',
                name: 'Observer Alpha',
                house: 'house1',
                role: 'Elder',
                status: 'active',
                joined: '2023-01-15',
                lastActive: '2024-01-20',
                worksCount: 8,
                recognitionsGiven: 12,
                recognitionsReceived: 15
            },
            {
                id: 'user_002',
                name: 'Observer Beta',
                house: 'house2',
                role: 'Member',
                status: 'active',
                joined: '2023-03-20',
                lastActive: '2024-01-19',
                worksCount: 5,
                recognitionsGiven: 8,
                recognitionsReceived: 10
            },
            {
                id: 'user_003',
                name: 'Observer Gamma',
                house: 'house3',
                role: 'Member',
                status: 'inactive',
                joined: '2023-06-10',
                lastActive: '2023-12-15',
                worksCount: 3,
                recognitionsGiven: 4,
                recognitionsReceived: 6
            }
        ];

        // Mock activities
        this.activities = [
            {
                id: 'act_001',
                type: 'user_registration',
                description: 'New user registered: Observer Delta',
                timestamp: '2024-01-20T10:30:00Z',
                severity: 'info'
            },
            {
                id: 'act_002',
                type: 'system_alert',
                description: 'High memory usage detected on server',
                timestamp: '2024-01-20T09:15:00Z',
                severity: 'warning'
            },
            {
                id: 'act_003',
                type: 'recognition_submitted',
                description: 'Recognition submitted for work: Silent Observation Study',
                timestamp: '2024-01-20T08:45:00Z',
                severity: 'info'
            }
        ];

        // Mock issues
        this.issues = [
            {
                id: 'issue_001',
                title: 'User unable to submit work',
                description: 'Multiple users reporting submission failures',
                severity: 'high',
                status: 'open',
                reportedBy: 'Observer Beta',
                reportedAt: '2024-01-19T14:30:00Z',
                assignedTo: null
            },
            {
                id: 'issue_002',
                title: 'Recognition score calculation error',
                description: 'Scores not calculating correctly for certain criteria',
                severity: 'medium',
                status: 'investigating',
                reportedBy: 'System Monitor',
                reportedAt: '2024-01-18T11:20:00Z',
                assignedTo: 'Admin Team'
            }
        ];

        // Mock maintenance tasks
        this.maintenance = [
            {
                id: 'maint_001',
                title: 'Database optimization',
                description: 'Optimize database queries for better performance',
                scheduled: '2024-01-21T02:00:00Z',
                estimatedDuration: '2 hours',
                status: 'scheduled',
                impact: 'Read-only mode'
            },
            {
                id: 'maint_002',
                title: 'Security patch deployment',
                description: 'Deploy latest security patches',
                scheduled: '2024-01-22T01:00:00Z',
                estimatedDuration: '30 minutes',
                status: 'scheduled',
                impact: 'Brief downtime'
            }
        ];
    }

    // Render admin interface
    renderAdminInterface() {
        const container = document.getElementById('adminContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="admin-system">
                <!-- Admin Header -->
                <section class="admin-header">
                    <h1>System Administration</h1>
                    <p>Complete oversight and management of AURELION systems</p>
                    
                    <!-- Quick Actions -->
                    <div class="admin-actions">
                        <button class="action-button primary" onclick="adminSystem.performBackup()">
                            Perform Backup
                        </button>
                        <button class="action-button secondary" onclick="adminSystem.generateReport()">
                            Generate Report
                        </button>
                        <button class="action-button secondary" onclick="adminSystem.systemCheck()">
                            System Check
                        </button>
                        <button class="action-button warning" onclick="adminSystem.emergencyMode()">
                            Emergency Mode
                        </button>
                    </div>
                </section>

                <!-- System Overview -->
                <section class="system-overview">
                    <h2>System Status</h2>
                    <div class="status-grid">
                        ${this.renderSystemStatus()}
                    </div>
                </section>

                <!-- User Management -->
                <section class="user-management">
                    <h2>User Management</h2>
                    <div class="user-controls">
                        <button class="control-button" onclick="adminSystem.showAddUser()">
                            Add User
                        </button>
                        <button class="control-button" onclick="adminSystem.exportUsers()">
                            Export Users
                        </button>
                        <button class="control-button" onclick="adminSystem.bulkActions()">
                            Bulk Actions
                        </button>
                    </div>
                    <div class="users-table">
                        ${this.renderUsersTable()}
                    </div>
                </section>

                <!-- Activity Log -->
                <section class="activity-log">
                    <h2>System Activity</h2>
                    <div class="activity-controls">
                        <select onchange="adminSystem.filterActivities(this.value)">
                            <option value="all">All Activities</option>
                            <option value="user_registration">User Registration</option>
                            <option value="system_alert">System Alerts</option>
                            <option value="recognition_submitted">Recognition Submitted</option>
                        </select>
                        <button class="control-button" onclick="adminSystem.exportActivity()">
                            Export Log
                        </button>
                    </div>
                    <div class="activity-timeline">
                        ${this.renderActivityTimeline()}
                    </div>
                </section>

                <!-- Issue Tracking -->
                <section class="issue-tracking">
                    <h2>Issue Management</h2>
                    <div class="issue-controls">
                        <button class="control-button" onclick="adminSystem.createIssue()">
                            Create Issue
                        </button>
                        <button class="control-button" onclick="adminSystem.assignIssues()">
                            Assign Issues
                        </button>
                    </div>
                    <div class="issues-grid">
                        ${this.renderIssuesGrid()}
                    </div>
                </section>

                <!-- Maintenance Schedule -->
                <section class="maintenance-schedule">
                    <h2>Maintenance Schedule</h2>
                    <div class="maintenance-controls">
                        <button class="control-button" onclick="adminSystem.scheduleMaintenance()">
                            Schedule Maintenance
                        </button>
                        <button class="control-button" onclick="adminSystem.viewHistory()">
                            View History
                        </button>
                    </div>
                    <div class="maintenance-timeline">
                        ${this.renderMaintenanceTimeline()}
                    </div>
                </section>
            </div>
        `;
    }

    // Render system status
    renderSystemStatus() {
        const statusItems = [
            { label: 'Total Users', value: this.systemStats.totalUsers, icon: 'users', color: '#c9a84c' },
            { label: 'Active Users', value: this.systemStats.activeUsers, icon: 'active', color: '#4a5568' },
            { label: 'Total Works', value: this.systemStats.totalWorks, icon: 'works', color: '#805ad5' },
            { label: 'Pending Recognitions', value: this.systemStats.pendingRecognitions, icon: 'pending', color: '#1a202c' },
            { label: 'System Uptime', value: this.systemStats.systemUptime, icon: 'uptime', color: '#c9a84c' },
            { label: 'Storage Used', value: this.systemStats.storageUsed, icon: 'storage', color: '#4a5568' },
            { label: 'API Response Time', value: this.systemStats.apiResponseTime, icon: 'speed', color: '#805ad5' },
            { label: 'Error Rate', value: this.systemStats.errorRate, icon: 'error', color: '#1a202c' }
        ];

        return statusItems.map(item => `
            <div class="status-card" style="border-color: ${item.color}">
                <div class="status-icon" style="color: ${item.color}">${item.icon}</div>
                <div class="status-info">
                    <h3>${item.value}</h3>
                    <p>${item.label}</p>
                </div>
            </div>
        `).join('');
    }

    // Render users table
    renderUsersTable() {
        return `
            <div class="table-container">
                <table class="users-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>House</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Joined</th>
                            <th>Last Active</th>
                            <th>Works</th>
                            <th>Recognitions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.users.map(user => `
                            <tr>
                                <td class="user-info">
                                    <div class="user-avatar">${user.name.charAt(0)}</div>
                                    <span>${user.name}</span>
                                </td>
                                <td>${user.house}</td>
                                <td>${user.role}</td>
                                <td>
                                    <span class="status-badge ${user.status}">${user.status}</span>
                                </td>
                                <td>${this.formatDate(user.joined)}</td>
                                <td>${this.formatDate(user.lastActive)}</td>
                                <td>${user.worksCount}</td>
                                <td>${user.recognitionsGiven}/${user.recognitionsReceived}</td>
                                <td class="actions">
                                    <button class="action-btn" onclick="adminSystem.editUser('${user.id}')">Edit</button>
                                    <button class="action-btn danger" onclick="adminSystem.suspendUser('${user.id}')">Suspend</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    // Render activity timeline
    renderActivityTimeline() {
        return this.activities.map(activity => `
            <div class="activity-item ${activity.severity}">
                <div class="activity-marker ${activity.severity}"></div>
                <div class="activity-content">
                    <h4>${activity.description}</h4>
                    <div class="activity-meta">
                        <span class="activity-type">${activity.type}</span>
                        <span class="activity-time">${this.formatDateTime(activity.timestamp)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render issues grid
    renderIssuesGrid() {
        return this.issues.map(issue => `
            <div class="issue-card ${issue.severity}">
                <div class="issue-header">
                    <h3>${issue.title}</h3>
                    <span class="issue-status ${issue.status}">${issue.status}</span>
                </div>
                <p class="issue-description">${issue.description}</p>
                <div class="issue-meta">
                    <span>Severity: ${issue.severity}</span>
                    <span>Reported by: ${issue.reportedBy}</span>
                    <span>${this.formatDateTime(issue.reportedAt)}</span>
                </div>
                <div class="issue-actions">
                    <button class="action-btn" onclick="adminSystem.viewIssue('${issue.id}')">View</button>
                    <button class="action-btn" onclick="adminSystem.assignIssue('${issue.id}')">Assign</button>
                    <button class="action-btn success" onclick="adminSystem.resolveIssue('${issue.id}')">Resolve</button>
                </div>
            </div>
        `).join('');
    }

    // Render maintenance timeline
    renderMaintenanceTimeline() {
        return this.maintenance.map(task => `
            <div class="maintenance-item ${task.status}">
                <div class="maintenance-marker ${task.status}"></div>
                <div class="maintenance-content">
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <div class="maintenance-meta">
                        <span>Scheduled: ${this.formatDateTime(task.scheduled)}</span>
                        <span>Duration: ${task.estimatedDuration}</span>
                        <span>Impact: ${task.impact}</span>
                    </div>
                    <div class="maintenance-actions">
                        <button class="action-btn" onclick="adminSystem.editMaintenance('${task.id}')">Edit</button>
                        <button class="action-btn warning" onclick="adminSystem.cancelMaintenance('${task.id}')">Cancel</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Admin action methods
    performBackup() {
        alert('Backup initiated. System will notify when complete.');
    }

    generateReport() {
        alert('Generating comprehensive system report...');
    }

    systemCheck() {
        alert('Running system diagnostics...');
    }

    emergencyMode() {
        if (confirm('Activate emergency mode? This will restrict access to essential functions only.')) {
            alert('Emergency mode activated.');
        }
    }

    showAddUser() {
        alert('Add user modal would open here');
    }

    exportUsers() {
        const blob = new Blob([JSON.stringify(this.users, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aurelion-users-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    bulkActions() {
        alert('Bulk actions interface would open here');
    }

    filterActivities(type) {
        console.log('Filter activities by type:', type);
    }

    exportActivity() {
        const blob = new Blob([JSON.stringify(this.activities, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aurelion-activity-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    createIssue() {
        alert('Create issue form would open here');
    }

    assignIssues() {
        alert('Issue assignment interface would open here');
    }

    editUser(userId) {
        alert(`Edit user ${userId} interface would open here`);
    }

    suspendUser(userId) {
        if (confirm('Suspend this user?')) {
            alert(`User ${userId} suspended`);
        }
    }

    viewIssue(issueId) {
        alert(`View issue ${issueId} details`);
    }

    assignIssue(issueId) {
        alert(`Assign issue ${issueId} interface`);
    }

    resolveIssue(issueId) {
        if (confirm('Mark this issue as resolved?')) {
            alert(`Issue ${issueId} resolved`);
        }
    }

    scheduleMaintenance() {
        alert('Schedule maintenance form would open here');
    }

    viewHistory() {
        alert('Maintenance history would be displayed here');
    }

    editMaintenance(taskId) {
        alert(`Edit maintenance task ${taskId}`);
    }

    cancelMaintenance(taskId) {
        if (confirm('Cancel this maintenance task?')) {
            alert(`Maintenance task ${taskId} cancelled`);
        }
    }

    // Utility methods
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Add CSS styles
    addStyles() {
        if (document.getElementById('adminSystemStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'adminSystemStyles';
        style.textContent = `
            .admin-system {
                max-width: 1600px;
                margin: 0 auto;
                padding: var(--space-3xl);
            }

            .admin-header {
                margin-bottom: var(--space-4xl);
                padding-bottom: var(--space-2xl);
                border-bottom: 1px solid var(--color-glass-border);
            }

            .admin-header h1 {
                font-family: var(--font-display);
                font-size: var(--text-4xl);
                color: var(--color-gold);
                margin-bottom: var(--space-md);
                text-transform: uppercase;
                letter-spacing: var(--tracking-widest);
            }

            .admin-header p {
                font-size: var(--text-lg);
                color: var(--color-text-secondary);
                margin-bottom: var(--space-2xl);
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            .admin-actions {
                display: flex;
                gap: var(--space-lg);
                justify-content: center;
                flex-wrap: wrap;
            }

            .action-button {
                padding: var(--space-md) var(--space-xl);
                border-radius: var(--radius-pill);
                font-size: var(--text-sm);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                cursor: pointer;
                transition: all var(--duration-base) var(--ease-cinematic);
                border: none;
            }

            .action-button.primary {
                background: var(--color-gold);
                color: var(--deep-black);
            }

            .action-button.secondary {
                background: var(--color-glass-bg);
                color: var(--color-text-primary);
                border: 1px solid var(--color-glass-border);
            }

            .action-button.warning {
                background: #dc2626;
                color: white;
            }

            .action-button:hover {
                transform: translateY(-2px);
            }

            .system-overview,
            .user-management,
            .activity-log,
            .issue-tracking,
            .maintenance-schedule {
                margin-bottom: var(--space-4xl);
            }

            .system-overview h2,
            .user-management h2,
            .activity-log h2,
            .issue-tracking h2,
            .maintenance-schedule h2 {
                font-family: var(--font-display);
                font-size: var(--text-2xl);
                color: var(--color-gold);
                margin-bottom: var(--space-xl);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .status-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: var(--space-lg);
            }

            .status-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-lg);
                border-radius: var(--radius-card);
                display: flex;
                align-items: center;
                gap: var(--space-md);
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .status-card:hover {
                border-color: var(--color-gold);
                transform: translateY(-2px);
            }

            .status-icon {
                font-size: 2rem;
                font-weight: bold;
            }

            .status-info h3 {
                font-size: var(--text-2xl);
                color: var(--color-gold);
                margin-bottom: var(--space-xs);
            }

            .status-info p {
                color: var(--color-text-secondary);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                font-size: var(--text-sm);
            }

            .user-controls,
            .activity-controls,
            .issue-controls,
            .maintenance-controls {
                display: flex;
                gap: var(--space-md);
                margin-bottom: var(--space-lg);
                flex-wrap: wrap;
            }

            .control-button {
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

            .control-button:hover {
                border-color: var(--color-gold);
                color: var(--color-gold);
            }

            .table-container {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                border-radius: var(--radius-card);
                overflow: hidden;
            }

            .users-table {
                width: 100%;
                border-collapse: collapse;
            }

            .users-table th,
            .users-table td {
                padding: var(--space-md);
                text-align: left;
                border-bottom: 1px solid var(--color-glass-border);
            }

            .users-table th {
                background: var(--color-glass-border);
                color: var(--color-gold);
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                font-size: var(--text-sm);
            }

            .user-info {
                display: flex;
                align-items: center;
                gap: var(--space-sm);
            }

            .user-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: var(--color-gold);
                color: var(--deep-black);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
            }

            .status-badge {
                padding: var(--space-xs) var(--space-sm);
                border-radius: var(--radius-pill);
                font-size: var(--text-xs);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .status-badge.active {
                background: #10b981;
                color: white;
            }

            .status-badge.inactive {
                background: #6b7280;
                color: white;
            }

            .actions {
                display: flex;
                gap: var(--space-sm);
            }

            .action-btn {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                color: var(--color-text-primary);
                padding: var(--space-xs) var(--space-sm);
                border-radius: var(--radius-card);
                font-size: var(--text-xs);
                cursor: pointer;
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .action-btn:hover {
                border-color: var(--color-gold);
                color: var(--color-gold);
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

            .activity-timeline,
            .maintenance-timeline {
                position: relative;
                padding-left: var(--space-2xl);
            }

            .activity-timeline::before,
            .maintenance-timeline::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 2px;
                background: var(--color-glass-border);
            }

            .activity-item,
            .maintenance-item {
                position: relative;
                margin-bottom: var(--space-2xl);
                padding-left: var(--space-xl);
            }

            .activity-marker,
            .maintenance-marker {
                position: absolute;
                left: -9px;
                top: 0;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                border: 2px solid var(--deep-black);
            }

            .activity-marker.info,
            .maintenance-marker.scheduled {
                background: #3b82f6;
            }

            .activity-marker.warning {
                background: #f59e0b;
            }

            .activity-marker.error {
                background: #ef4444;
            }

            .activity-content,
            .maintenance-content {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-lg);
                border-radius: var(--radius-card);
            }

            .activity-content h4,
            .maintenance-content h3 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .activity-meta,
            .maintenance-meta {
                display: flex;
                gap: var(--space-lg);
                font-size: var(--text-xs);
                color: var(--color-text-muted);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .issues-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: var(--space-lg);
            }

            .issue-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-lg);
                border-radius: var(--radius-card);
            }

            .issue-card.high {
                border-color: #ef4444;
            }

            .issue-card.medium {
                border-color: #f59e0b;
            }

            .issue-card.low {
                border-color: #10b981;
            }

            .issue-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: var(--space-md);
            }

            .issue-header h3 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .issue-status {
                padding: var(--space-xs) var(--space-sm);
                border-radius: var(--radius-pill);
                font-size: var(--text-xs);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .issue-status.open {
                background: #ef4444;
                color: white;
            }

            .issue-status.investigating {
                background: #f59e0b;
                color: white;
            }

            .issue-status.resolved {
                background: #10b981;
                color: white;
            }

            .issue-description {
                color: var(--color-text-secondary);
                margin-bottom: var(--space-md);
                line-height: var(--leading-relaxed);
            }

            .issue-meta {
                display: flex;
                flex-direction: column;
                gap: var(--space-xs);
                font-size: var(--text-xs);
                color: var(--color-text-muted);
                margin-bottom: var(--space-md);
            }

            .issue-actions,
            .maintenance-actions {
                display: flex;
                gap: var(--space-sm);
            }

            @media (max-width: 768px) {
                .admin-system {
                    padding: var(--space-xl);
                }
                
                .admin-actions {
                    flex-direction: column;
                    align-items: center;
                }
                
                .status-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .users-table {
                    font-size: var(--text-sm);
                }
                
                .users-table th,
                .users-table td {
                    padding: var(--space-sm);
                }
                
                .issues-grid {
                    grid-template-columns: 1fr;
                }
                
                .activity-meta,
                .maintenance-meta {
                    flex-direction: column;
                    gap: var(--space-xs);
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Static method to initialize
    static init() {
        const adminSystem = new AdminSystem();
        adminSystem.initialize();
        return adminSystem;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminSystem;
} else {
    window.AdminSystem = AdminSystem;
}
