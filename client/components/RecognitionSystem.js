// Phase 9: Recognition System Implementation
// Peer recognition system with scoring, feedback, and validation

class RecognitionSystem {
    constructor() {
        this.currentUser = null;
        this.availableWorks = [];
        this.pendingRecognitions = [];
        this.completedRecognitions = [];
        this.recognitionCriteria = {
            precision: { weight: 0.4, description: 'Accuracy and attention to detail' },
            discipline: { weight: 0.3, description: 'Consistency and methodical approach' },
            execution: { weight: 0.3, description: 'Quality of final implementation' }
        };
    }

    // Initialize recognition system
    initialize() {
        this.loadCurrentUser();
        this.loadAvailableWorks();
        this.renderRecognitionInterface();
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

    // Load available works for recognition
    loadAvailableWorks() {
        // Mock works data
        this.availableWorks = [
            {
                id: 'work_001',
                title: 'Silent Observation Study',
                creator: 'Observer Beta',
                house: 'house2',
                medium: 'Digital',
                created: '2024-01-15',
                description: 'A comprehensive study of silent observation techniques',
                preview: '📊',
                status: 'pending'
            },
            {
                id: 'work_002',
                title: 'Systems Analysis Framework',
                creator: 'Observer Gamma',
                house: 'house3',
                medium: 'Methodology',
                created: '2024-01-12',
                description: 'Framework for analyzing complex systems with precision',
                preview: '🔍',
                status: 'pending'
            },
            {
                id: 'work_003',
                title: 'Discipline in Practice',
                creator: 'Observer Delta',
                house: 'house4',
                medium: 'Physical',
                created: '2024-01-10',
                description: 'Physical demonstration of disciplined practice',
                preview: '🎯',
                status: 'pending'
            }
        ];
    }

    // Render recognition interface
    renderRecognitionInterface() {
        const container = document.getElementById('adminContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="recognition-system">
                <!-- Recognition Header -->
                <section class="recognition-header">
                    <h1>Recognition Protocol</h1>
                    <p>Evaluate works based on precision, discipline, and execution</p>
                    <div class="recognition-stats">
                        <div class="stat-item">
                            <h3>${this.completedRecognitions.length}</h3>
                            <p>Completed</p>
                        </div>
                        <div class="stat-item">
                            <h3>${this.pendingRecognitions.length}</h3>
                            <p>Pending</p>
                        </div>
                        <div class="stat-item">
                            <h3>${this.availableWorks.length}</h3>
                            <p>Available</p>
                        </div>
                    </div>
                </section>

                <!-- Recognition Criteria -->
                <section class="recognition-criteria">
                    <h2>Evaluation Criteria</h2>
                    <div class="criteria-grid">
                        ${Object.entries(this.recognitionCriteria).map(([key, criteria]) => `
                            <div class="criteria-card">
                                <h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                                <p>${criteria.description}</p>
                                <div class="criteria-weight">Weight: ${(criteria.weight * 100).toFixed(0)}%</div>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- Available Works -->
                <section class="available-works">
                    <h2>Works Pending Recognition</h2>
                    <div class="works-grid">
                        ${this.availableWorks.map(work => this.renderWorkCard(work)).join('')}
                    </div>
                </section>

                <!-- Pending Recognitions -->
                <section class="pending-recognitions">
                    <h2>Your Pending Recognitions</h2>
                    <div class="pending-grid">
                        ${this.pendingRecognitions.length > 0 ? 
                            this.pendingRecognitions.map(recognition => this.renderPendingCard(recognition)).join('') :
                            '<p class="empty-state">No pending recognitions</p>'
                        }
                    </div>
                </section>

                <!-- Recognition History -->
                <section class="recognition-history">
                    <h2>Recognition History</h2>
                    <div class="history-timeline">
                        ${this.completedRecognitions.length > 0 ?
                            this.completedRecognitions.map(recognition => this.renderHistoryItem(recognition)).join('') :
                            '<p class="empty-state">No recognition history</p>'
                        }
                    </div>
                </section>
            </div>
        `;
    }

    // Render individual work card
    renderWorkCard(work) {
        return `
            <div class="work-card" data-work-id="${work.id}">
                <div class="work-preview">${work.preview}</div>
                <div class="work-info">
                    <h3>${work.title}</h3>
                    <p class="work-creator">By ${work.creator} · ${work.house}</p>
                    <p class="work-description">${work.description}</p>
                    <div class="work-meta">
                        <span>${work.medium}</span>
                        <span>${this.formatDate(work.created)}</span>
                    </div>
                </div>
                <div class="work-actions">
                    <button class="recognize-button" onclick="recognitionSystem.startRecognition('${work.id}')">
                        Recognize
                    </button>
                </div>
            </div>
        `;
    }

    // Render pending recognition card
    renderPendingCard(recognition) {
        return `
            <div class="pending-card">
                <div class="pending-work">
                    <h4>${recognition.workTitle}</h4>
                    <p>By ${recognition.workCreator}</p>
                </div>
                <div class="pending-scores">
                    <div class="score-input">
                        <label>Precision</label>
                        <input type="range" min="0" max="100" value="${recognition.scores.precision || 50}" 
                               onchange="recognitionSystem.updateScore('${recognition.id}', 'precision', this.value)">
                        <span>${recognition.scores.precision || 50}</span>
                    </div>
                    <div class="score-input">
                        <label>Discipline</label>
                        <input type="range" min="0" max="100" value="${recognition.scores.discipline || 50}"
                               onchange="recognitionSystem.updateScore('${recognition.id}', 'discipline', this.value)">
                        <span>${recognition.scores.discipline || 50}</span>
                    </div>
                    <div class="score-input">
                        <label>Execution</label>
                        <input type="range" min="0" max="100" value="${recognition.scores.execution || 50}"
                               onchange="recognitionSystem.updateScore('${recognition.id}', 'execution', this.value)">
                        <span>${recognition.scores.execution || 50}</span>
                    </div>
                </div>
                <div class="pending-feedback">
                    <label>Feedback</label>
                    <textarea placeholder="Provide detailed feedback..." 
                              onchange="recognitionSystem.updateFeedback('${recognition.id}', this.value)">${recognition.feedback || ''}</textarea>
                </div>
                <div class="pending-actions">
                    <button class="submit-button" onclick="recognitionSystem.submitRecognition('${recognition.id}')">
                        Submit Recognition
                    </button>
                    <button class="cancel-button" onclick="recognitionSystem.cancelRecognition('${recognition.id}')">
                        Cancel
                    </button>
                </div>
            </div>
        `;
    }

    // Render history item
    renderHistoryItem(recognition) {
        return `
            <div class="history-item">
                <div class="history-marker" style="background: ${this.getScoreColor(recognition.totalScore)}"></div>
                <div class="history-content">
                    <h4>${recognition.workTitle}</h4>
                    <p class="history-feedback">${recognition.feedback}</p>
                    <div class="history-scores">
                        <span>Precision: ${recognition.scores.precision}</span>
                        <span>Discipline: ${recognition.scores.discipline}</span>
                        <span>Execution: ${recognition.scores.execution}</span>
                        <span class="total-score">Total: ${recognition.totalScore}</span>
                    </div>
                    <div class="history-meta">
                        <span>By ${recognition.recognizedBy}</span>
                        <span>${this.formatDate(recognition.date)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Start recognition for a work
    startRecognition(workId) {
        const work = this.availableWorks.find(w => w.id === workId);
        if (!work) return;

        // Check if already recognizing
        const existing = this.pendingRecognitions.find(r => r.workId === workId);
        if (existing) {
            alert('Already recognizing this work');
            return;
        }

        // Create new recognition
        const recognition = {
            id: `rec_${Date.now()}`,
            workId: workId,
            workTitle: work.title,
            workCreator: work.creator,
            recognizedBy: this.currentUser.name,
            date: new Date().toISOString().split('T')[0],
            scores: {
                precision: 50,
                discipline: 50,
                execution: 50
            },
            feedback: '',
            totalScore: 50,
            status: 'pending'
        };

        this.pendingRecognitions.push(recognition);
        this.renderRecognitionInterface();
    }

    // Update score for pending recognition
    updateScore(recognitionId, criteria, value) {
        const recognition = this.pendingRecognitions.find(r => r.id === recognitionId);
        if (!recognition) return;

        recognition.scores[criteria] = parseInt(value);
        this.calculateTotalScore(recognition);
        this.renderRecognitionInterface();
    }

    // Update feedback for pending recognition
    updateFeedback(recognitionId, feedback) {
        const recognition = this.pendingRecognitions.find(r => r.id === recognitionId);
        if (!recognition) return;

        recognition.feedback = feedback;
    }

    // Calculate total score
    calculateTotalScore(recognition) {
        const { precision, discipline, execution } = recognition.scores;
        const { weight: wPrecision } = this.recognitionCriteria.precision;
        const { weight: wDiscipline } = this.recognitionCriteria.discipline;
        const { weight: wExecution } = this.recognitionCriteria.execution;

        recognition.totalScore = Math.round(
            precision * wPrecision + 
            discipline * wDiscipline + 
            execution * wExecution
        );
    }

    // Submit recognition
    submitRecognition(recognitionId) {
        const recognition = this.pendingRecognitions.find(r => r.id === recognitionId);
        if (!recognition) return;

        // Validate feedback
        if (!recognition.feedback || recognition.feedback.trim().length < 10) {
            alert('Please provide detailed feedback (minimum 10 characters)');
            return;
        }

        // Move to completed
        recognition.status = 'completed';
        this.completedRecognitions.unshift(recognition);
        
        // Remove from pending
        this.pendingRecognitions = this.pendingRecognitions.filter(r => r.id !== recognitionId);
        
        // Remove work from available
        this.availableWorks = this.availableWorks.filter(w => w.id !== recognition.workId);
        
        this.renderRecognitionInterface();
        alert('Recognition submitted successfully');
    }

    // Cancel recognition
    cancelRecognition(recognitionId) {
        this.pendingRecognitions = this.pendingRecognitions.filter(r => r.id !== recognitionId);
        this.renderRecognitionInterface();
    }

    // Get color based on score
    getScoreColor(score) {
        if (score >= 90) return '#c9a84c'; // Gold
        if (score >= 80) return '#4a5568'; // Blue
        if (score >= 70) return '#805ad5'; // Purple
        return '#1a202c'; // Dark
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

    // Add CSS styles
    addStyles() {
        if (document.getElementById('recognitionSystemStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'recognitionSystemStyles';
        style.textContent = `
            .recognition-system {
                max-width: 1200px;
                margin: 0 auto;
                padding: var(--space-3xl);
            }

            .recognition-header {
                text-align: center;
                margin-bottom: var(--space-4xl);
                padding-bottom: var(--space-2xl);
                border-bottom: 1px solid var(--color-glass-border);
            }

            .recognition-header h1 {
                font-family: var(--font-display);
                font-size: var(--text-4xl);
                color: var(--color-gold);
                margin-bottom: var(--space-md);
                text-transform: uppercase;
                letter-spacing: var(--tracking-widest);
            }

            .recognition-header p {
                font-size: var(--text-lg);
                color: var(--color-text-secondary);
                margin-bottom: var(--space-2xl);
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            .recognition-stats {
                display: flex;
                justify-content: center;
                gap: var(--space-3xl);
            }

            .stat-item {
                text-align: center;
            }

            .stat-item h3 {
                font-size: var(--text-3xl);
                color: var(--color-gold);
                margin-bottom: var(--space-xs);
            }

            .stat-item p {
                color: var(--color-text-secondary);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                font-size: var(--text-sm);
            }

            .recognition-criteria,
            .available-works,
            .pending-recognitions,
            .recognition-history {
                margin-bottom: var(--space-4xl);
            }

            .recognition-criteria h2,
            .available-works h2,
            .pending-recognitions h2,
            .recognition-history h2 {
                font-family: var(--font-display);
                font-size: var(--text-2xl);
                color: var(--color-gold);
                margin-bottom: var(--space-xl);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .criteria-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: var(--space-lg);
            }

            .criteria-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-lg);
                border-radius: var(--radius-card);
                text-align: center;
            }

            .criteria-card h3 {
                font-size: var(--text-xl);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .criteria-card p {
                color: var(--color-text-secondary);
                margin-bottom: var(--space-md);
            }

            .criteria-weight {
                font-size: var(--text-sm);
                color: var(--color-gold);
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .works-grid,
            .pending-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: var(--space-lg);
            }

            .work-card,
            .pending-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-lg);
                border-radius: var(--radius-card);
            }

            .work-preview {
                font-size: 3rem;
                text-align: center;
                margin-bottom: var(--space-md);
            }

            .work-info h3,
            .pending-work h4 {
                font-size: var(--text-xl);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .work-creator {
                color: var(--color-text-secondary);
                margin-bottom: var(--space-sm);
                font-size: var(--text-sm);
            }

            .work-description {
                color: var(--color-text-primary);
                margin-bottom: var(--space-md);
                line-height: var(--leading-relaxed);
            }

            .work-meta {
                display: flex;
                justify-content: space-between;
                font-size: var(--text-xs);
                color: var(--color-text-muted);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .work-actions {
                margin-top: var(--space-lg);
                text-align: center;
            }

            .recognize-button,
            .submit-button,
            .cancel-button {
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

            .recognize-button,
            .submit-button {
                background: var(--color-gold);
                color: var(--deep-black);
            }

            .recognize-button:hover,
            .submit-button:hover {
                background: var(--color-gold-dim);
                transform: translateY(-2px);
            }

            .cancel-button {
                background: var(--color-glass-bg);
                color: var(--color-text-secondary);
                border: 1px solid var(--color-glass-border);
                margin-left: var(--space-md);
            }

            .cancel-button:hover {
                border-color: var(--color-text-muted);
                color: var(--color-text-muted);
            }

            .pending-scores {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: var(--space-lg);
                margin-bottom: var(--space-lg);
            }

            .score-input {
                text-align: center;
            }

            .score-input label {
                display: block;
                font-size: var(--text-sm);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .score-input input[type="range"] {
                width: 100%;
                margin-bottom: var(--space-xs);
            }

            .score-input span {
                font-size: var(--text-lg);
                color: var(--color-gold);
                font-weight: 600;
            }

            .pending-feedback {
                margin-bottom: var(--space-lg);
            }

            .pending-feedback label {
                display: block;
                font-size: var(--text-sm);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .pending-feedback textarea {
                width: 100%;
                min-height: 100px;
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                color: var(--color-text-primary);
                padding: var(--space-md);
                border-radius: var(--radius-card);
                resize: vertical;
                font-family: var(--font-body);
            }

            .pending-actions {
                display: flex;
                justify-content: center;
                gap: var(--space-md);
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

            .history-content h4 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .history-feedback {
                color: var(--color-text-secondary);
                margin-bottom: var(--space-md);
                font-style: italic;
            }

            .history-scores {
                display: flex;
                gap: var(--space-lg);
                margin-bottom: var(--space-md);
                font-size: var(--text-sm);
            }

            .total-score {
                font-weight: 600;
                color: var(--color-gold);
            }

            .history-meta {
                display: flex;
                gap: var(--space-lg);
                font-size: var(--text-xs);
                color: var(--color-text-muted);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .empty-state {
                text-align: center;
                color: var(--color-text-muted);
                font-style: italic;
                padding: var(--space-2xl);
            }

            @media (max-width: 768px) {
                .recognition-system {
                    padding: var(--space-xl);
                }
                
                .recognition-stats {
                    flex-direction: column;
                    gap: var(--space-lg);
                }
                
                .criteria-grid,
                .works-grid,
                .pending-grid {
                    grid-template-columns: 1fr;
                }
                
                .pending-scores {
                    grid-template-columns: 1fr;
                }
                
                .pending-actions {
                    flex-direction: column;
                }
                
                .history-scores {
                    flex-direction: column;
                    gap: var(--space-sm);
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Static method to initialize
    static init() {
        const recognitionSystem = new RecognitionSystem();
        recognitionSystem.initialize();
        return recognitionSystem;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RecognitionSystem;
} else {
    window.RecognitionSystem = RecognitionSystem;
}
