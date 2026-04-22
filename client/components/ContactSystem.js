// Phase 13: Contact Page Implementation
// Professional contact system with inquiry management and communication tracking

class ContactSystem {
    constructor() {
        this.currentUser = null;
        this.inquiries = [];
        this.departments = [
            { id: 'general', name: 'General Inquiries', email: 'contact@aurelion.org' },
            { id: 'technical', name: 'Technical Support', email: 'support@aurelion.org' },
            { id: 'recognition', name: 'Recognition System', email: 'recognition@aurelion.org' },
            { id: 'houses', name: 'House Coordination', email: 'houses@aurelion.org' },
            { id: 'partnerships', name: 'Partnerships', email: 'partners@aurelion.org' }
        ];
        this.contactMethods = [
            { type: 'email', icon: 'email', value: 'contact@aurelion.org', description: 'General correspondence' },
            { type: 'phone', icon: 'phone', value: '+1 (555) 123-4567', description: 'Business hours only' },
            { type: 'location', icon: 'location', value: 'San Francisco, CA', description: 'Primary headquarters' },
            { type: 'hours', icon: 'clock', value: 'Mon-Fri 9AM-5PM PST', description: 'Response times' }
        ];
    }

    // Initialize contact system
    initialize() {
        this.loadCurrentUser();
        this.loadInquiries();
        this.renderContactInterface();
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
            role: 'Elder'
        };
    }

    // Load inquiries data
    loadInquiries() {
        // Mock inquiries data
        this.inquiries = [
            {
                id: 'inq_001',
                name: 'John Smith',
                email: 'john@example.com',
                department: 'general',
                subject: 'Question about membership',
                message: 'I am interested in learning more about becoming a member of AURELION.',
                status: 'responded',
                submitted: '2024-01-20T10:30:00Z',
                response: 'Thank you for your interest. We have sent you our membership information.',
                respondedAt: '2024-01-20T14:15:00Z'
            },
            {
                id: 'inq_002',
                name: 'Sarah Johnson',
                email: 'sarah@example.com',
                department: 'technical',
                subject: 'Issue with work submission',
                message: 'I am unable to submit my work for recognition. The system shows an error.',
                status: 'pending',
                submitted: '2024-01-19T16:45:00Z',
                response: null,
                respondedAt: null
            },
            {
                id: 'inq_003',
                name: 'Michael Chen',
                email: 'michael@example.com',
                department: 'recognition',
                subject: 'Recognition score inquiry',
                message: 'I would like to understand how recognition scores are calculated.',
                status: 'in_progress',
                submitted: '2024-01-18T09:20:00Z',
                response: null,
                respondedAt: null
            }
        ];
    }

    // Render contact interface
    renderContactInterface() {
        const container = document.getElementById('adminContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="contact-system">
                <!-- Contact Header -->
                <section class="contact-header">
                    <h1>Contact AURELION</h1>
                    <p>Connect with our community and administration team</p>
                </section>

                <!-- Contact Information -->
                <section class="contact-info">
                    <h2>Get in Touch</h2>
                    <div class="contact-grid">
                        ${this.contactMethods.map(method => this.renderContactMethod(method)).join('')}
                    </div>
                </section>

                <!-- Contact Form -->
                <section class="contact-form-section">
                    <h2>Send a Message</h2>
                    <form class="contact-form" onsubmit="contactSystem.handleSubmit(event)">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="name">Full Name *</label>
                                <input type="text" id="name" name="name" required 
                                       value="${this.currentUser ? this.currentUser.name : ''}">
                            </div>
                            <div class="form-group">
                                <label for="email">Email Address *</label>
                                <input type="email" id="email" name="email" required 
                                       value="${this.currentUser ? this.currentUser.email : ''}">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="department">Department *</label>
                                <select id="department" name="department" required>
                                    <option value="">Select Department</option>
                                    ${this.departments.map(dept => 
                                        `<option value="${dept.id}">${dept.name}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="subject">Subject *</label>
                                <input type="text" id="subject" name="subject" required 
                                       placeholder="Brief description of your inquiry">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="message">Message *</label>
                            <textarea id="message" name="message" rows="6" required 
                                      placeholder="Please provide detailed information about your inquiry..."></textarea>
                        </div>
                        <div class="form-group checkbox-group">
                            <input type="checkbox" id="urgent" name="urgent">
                            <label for="urgent">Mark as urgent inquiry</label>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="submit-button">Send Message</button>
                            <button type="button" class="reset-button" onclick="contactSystem.resetForm()">Clear Form</button>
                        </div>
                    </form>
                </section>

                <!-- Department Information -->
                <section class="departments-section">
                    <h2>Departments</h2>
                    <div class="departments-grid">
                        ${this.departments.map(dept => this.renderDepartmentCard(dept)).join('')}
                    </div>
                </section>

                <!-- FAQ Section -->
                <section class="faq-section">
                    <h2>Frequently Asked Questions</h2>
                    <div class="faq-list">
                        ${this.renderFAQItems()}
                    </div>
                </section>

                <!-- Response Time Information -->
                <section class="response-info">
                    <h2>Response Times</h2>
                    <div class="response-grid">
                        <div class="response-card">
                            <h3>General Inquiries</h3>
                            <p>24-48 hours</p>
                            <small>Standard business days</small>
                        </div>
                        <div class="response-card">
                            <h3>Technical Support</h3>
                            <p>12-24 hours</p>
                            <small>During business hours</small>
                        </div>
                        <div class="response-card">
                            <h3>Urgent Matters</h3>
                            <p>2-4 hours</p>
                            <small>Marked urgent inquiries</small>
                        </div>
                        <div class="response-card">
                            <h3>Partnerships</h3>
                            <p>3-5 business days</p>
                            <small>Requires review process</small>
                        </div>
                    </div>
                </section>
            </div>
        `;
    }

    // Render contact method
    renderContactMethod(method) {
        const icons = {
            'email': 'email',
            'phone': 'phone',
            'location': 'location',
            'hours': 'clock'
        };

        return `
            <div class="contact-method">
                <div class="contact-icon">${icons[method.type]}</div>
                <div class="contact-details">
                    <h3>${method.value}</h3>
                    <p>${method.description}</p>
                </div>
            </div>
        `;
    }

    // Render department card
    renderDepartmentCard(dept) {
        return `
            <div class="department-card">
                <h3>${dept.name}</h3>
                <p>${dept.email}</p>
                <button class="contact-button" onclick="contactSystem.contactDepartment('${dept.id}')">
                    Contact Department
                </button>
            </div>
        `;
    }

    // Render FAQ items
    renderFAQItems() {
        const faqs = [
            {
                question: 'How do I become a member of AURELION?',
                answer: 'Membership is by invitation only. Current members can nominate candidates who demonstrate exceptional precision, discipline, and execution in their respective fields.'
            },
            {
                question: 'What is the recognition system?',
                answer: 'The recognition system allows members to evaluate and provide feedback on works submitted by other members. Scores are calculated based on precision (40%), discipline (30%), and execution (30%).'
            },
            {
                question: 'How are houses determined?',
                answer: 'New members are assigned to houses based on their skills, temperament, and the current needs of each house. The goal is to create balanced, complementary teams.'
            },
            {
                question: 'Can I submit work in any medium?',
                answer: 'Yes, we accept works in digital, physical, methodology, analysis, and innovation categories. Each category has specific evaluation criteria.'
            },
            {
                question: 'How long does recognition take?',
                answer: 'Recognition typically takes 3-7 business days, depending on the availability of qualified evaluators and the complexity of the work.'
            }
        ];

        return faqs.map((faq, index) => `
            <div class="faq-item">
                <div class="faq-question" onclick="contactSystem.toggleFAQ(${index})">
                    <h3>${faq.question}</h3>
                    <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer" id="faq-answer-${index}">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `).join('');
    }

    // Handle form submission
    handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const inquiry = {
            id: `inq_${Date.now()}`,
            name: formData.get('name'),
            email: formData.get('email'),
            department: formData.get('department'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            urgent: formData.get('urgent') === 'on',
            status: 'submitted',
            submitted: new Date().toISOString(),
            response: null,
            respondedAt: null
        };

        // Add to inquiries
        this.inquiries.unshift(inquiry);

        // Show success message
        this.showSuccessMessage();

        // Reset form
        event.target.reset();

        console.log('Inquiry submitted:', inquiry);
    }

    // Show success message
    showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <h3>Message Sent Successfully</h3>
            <p>Thank you for contacting AURELION. We will respond to your inquiry within the specified timeframe.</p>
            <button onclick="this.parentElement.remove()">Close</button>
        `;

        document.querySelector('.contact-form-section').appendChild(successDiv);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (successDiv.parentElement) {
                successDiv.remove();
            }
        }, 5000);
    }

    // Reset form
    resetForm() {
        document.querySelector('.contact-form').reset();
    }

    // Contact department
    contactDepartment(deptId) {
        const department = this.departments.find(d => d.id === deptId);
        if (department) {
            document.getElementById('department').value = deptId;
            document.getElementById('subject').focus();
            
            // Scroll to form
            document.querySelector('.contact-form-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    }

    // Toggle FAQ
    toggleFAQ(index) {
        const answer = document.getElementById(`faq-answer-${index}`);
        const toggle = answer.previousElementSibling.querySelector('.faq-toggle');
        
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            toggle.textContent = '+';
        } else {
            answer.style.display = 'block';
            toggle.textContent = '-';
        }
    }

    // Add CSS styles
    addStyles() {
        if (document.getElementById('contactSystemStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'contactSystemStyles';
        style.textContent = `
            .contact-system {
                max-width: 1200px;
                margin: 0 auto;
                padding: var(--space-3xl);
            }

            .contact-header {
                text-align: center;
                margin-bottom: var(--space-4xl);
                padding-bottom: var(--space-2xl);
                border-bottom: 1px solid var(--color-glass-border);
            }

            .contact-header h1 {
                font-family: var(--font-display);
                font-size: var(--text-4xl);
                color: var(--color-gold);
                margin-bottom: var(--space-md);
                text-transform: uppercase;
                letter-spacing: var(--tracking-widest);
            }

            .contact-header p {
                font-size: var(--text-lg);
                color: var(--color-text-secondary);
                max-width: 600px;
                margin: 0 auto;
            }

            .contact-info,
            .contact-form-section,
            .departments-section,
            .faq-section,
            .response-info {
                margin-bottom: var(--space-4xl);
            }

            .contact-info h2,
            .contact-form-section h2,
            .departments-section h2,
            .faq-section h2,
            .response-info h2 {
                font-family: var(--font-display);
                font-size: var(--text-2xl);
                color: var(--color-gold);
                margin-bottom: var(--space-xl);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .contact-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: var(--space-lg);
            }

            .contact-method {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-lg);
                border-radius: var(--radius-card);
                display: flex;
                align-items: center;
                gap: var(--space-md);
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .contact-method:hover {
                border-color: var(--color-gold);
                transform: translateY(-2px);
            }

            .contact-icon {
                width: 48px;
                height: 48px;
                background: var(--color-gold);
                color: var(--deep-black);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                font-weight: bold;
                flex-shrink: 0;
            }

            .contact-details h3 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                margin-bottom: var(--space-xs);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .contact-details p {
                color: var(--color-text-secondary);
                font-size: var(--text-sm);
            }

            .contact-form {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-2xl);
                border-radius: var(--radius-card);
            }

            .form-row {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: var(--space-lg);
            }

            .form-group {
                margin-bottom: var(--space-lg);
            }

            .form-group label {
                display: block;
                font-size: var(--text-sm);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                font-weight: 500;
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                background: var(--deep-black);
                border: 1px solid var(--color-glass-border);
                color: var(--color-text-primary);
                padding: var(--space-md);
                border-radius: var(--radius-card);
                font-size: var(--text-base);
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: var(--color-gold);
                box-shadow: 0 0 0 2px rgba(201, 168, 76, 0.2);
            }

            .checkbox-group {
                display: flex;
                align-items: center;
                gap: var(--space-sm);
            }

            .checkbox-group input[type="checkbox"] {
                width: auto;
                margin: 0;
            }

            .form-actions {
                display: flex;
                gap: var(--space-lg);
                justify-content: flex-end;
            }

            .submit-button,
            .reset-button {
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

            .submit-button {
                background: var(--color-gold);
                color: var(--deep-black);
            }

            .submit-button:hover {
                background: var(--color-gold-dim);
                transform: translateY(-2px);
            }

            .reset-button {
                background: var(--color-glass-bg);
                color: var(--color-text-primary);
                border: 1px solid var(--color-glass-border);
            }

            .reset-button:hover {
                border-color: var(--color-gold);
                color: var(--color-gold);
            }

            .success-message {
                background: #10b981;
                color: white;
                padding: var(--space-lg);
                border-radius: var(--radius-card);
                margin-top: var(--space-lg);
                text-align: center;
            }

            .success-message h3 {
                margin-bottom: var(--space-sm);
                font-size: var(--text-lg);
            }

            .success-message button {
                background: white;
                color: #10b981;
                border: none;
                padding: var(--space-sm) var(--space-md);
                border-radius: var(--radius-pill);
                margin-top: var(--space-sm);
                cursor: pointer;
            }

            .departments-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: var(--space-lg);
            }

            .department-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-lg);
                border-radius: var(--radius-card);
                text-align: center;
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .department-card:hover {
                border-color: var(--color-gold);
                transform: translateY(-2px);
            }

            .department-card h3 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .department-card p {
                color: var(--color-text-secondary);
                margin-bottom: var(--space-md);
                font-size: var(--text-sm);
            }

            .contact-button {
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

            .contact-button:hover {
                background: var(--color-gold-dim);
                transform: translateY(-2px);
            }

            .faq-list {
                display: grid;
                gap: var(--space-md);
            }

            .faq-item {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                border-radius: var(--radius-card);
                overflow: hidden;
            }

            .faq-question {
                padding: var(--space-lg);
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .faq-question:hover {
                background: var(--color-glass-border);
            }

            .faq-question h3 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                margin: 0;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .faq-toggle {
                font-size: var(--text-2xl);
                color: var(--color-gold);
                font-weight: bold;
            }

            .faq-answer {
                padding: 0 var(--space-lg);
                display: none;
            }

            .faq-answer p {
                color: var(--color-text-secondary);
                line-height: var(--leading-relaxed);
                padding-bottom: var(--space-lg);
            }

            .response-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: var(--space-lg);
            }

            .response-card {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                padding: var(--space-lg);
                border-radius: var(--radius-card);
                text-align: center;
                transition: all var(--duration-base) var(--ease-cinematic);
            }

            .response-card:hover {
                border-color: var(--color-gold);
                transform: translateY(-2px);
            }

            .response-card h3 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }

            .response-card p {
                font-size: var(--text-2xl);
                color: var(--color-text-primary);
                margin-bottom: var(--space-xs);
                font-weight: 600;
            }

            .response-card small {
                color: var(--color-text-muted);
                font-size: var(--text-sm);
            }

            @media (max-width: 768px) {
                .contact-system {
                    padding: var(--space-xl);
                }
                
                .contact-grid,
                .departments-grid,
                .response-grid {
                    grid-template-columns: 1fr;
                }
                
                .form-row {
                    grid-template-columns: 1fr;
                }
                
                .form-actions {
                    flex-direction: column;
                }
                
                .faq-question {
                    padding: var(--space-md);
                }
                
                .faq-question h3 {
                    font-size: var(--text-base);
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Static method to initialize
    static init() {
        const contactSystem = new ContactSystem();
        contactSystem.initialize();
        return contactSystem;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactSystem;
} else {
    window.ContactSystem = ContactSystem;
}
