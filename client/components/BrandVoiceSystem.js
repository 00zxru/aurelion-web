// Phase 17: Microcopy & Brand Voice Enforcement
// Comprehensive brand voice management and microcopy system

class BrandVoiceSystem {
    constructor() {
        this.brandGuidelines = {
            tone: 'precise, disciplined, elevated',
            voice: 'authoritative yet approachable',
            personality: 'observational, analytical, methodical',
            values: ['precision', 'discipline', 'execution', 'observation'],
            vocabulary: {
                preferred: ['observe', 'recognize', 'precision', 'discipline', 'execution', 'methodical', 'systematic', 'analysis'],
                avoided: ['awesome', 'amazing', 'cool', 'stuff', 'things', 'random', 'basically', 'literally']
            },
            formatting: {
                sentenceLength: 'medium (15-25 words)',
                paragraphLength: 'short (2-4 sentences)',
                headings: 'title case, no end punctuation',
                lists: 'parallel structure, consistent punctuation'
            }
        };
        
        this.microcopyLibrary = {
            // Navigation
            navigation: {
                home: 'Return to observation center',
                profile: 'View recognition record',
                works: 'Examine submitted works',
                activity: 'Monitor system activity',
                houses: 'House coordination',
                admin: 'System administration',
                contact: 'Establish connection'
            },
            
            // Actions
            actions: {
                submit: 'Submit for recognition',
                save: 'Record changes',
                cancel: 'Abort operation',
                delete: 'Remove permanently',
                edit: 'Modify record',
                view: 'Examine details',
                close: 'Return to previous',
                continue: 'Proceed to next phase',
                confirm: 'Validate selection',
                search: 'Query database',
                filter: 'Refine results',
                sort: 'Order by criteria'
            },
            
            // Status Messages
            status: {
                loading: 'System processing request',
                success: 'Operation completed successfully',
                error: 'System error detected',
                warning: 'Attention required',
                info: 'System information',
                offline: 'Operating in offline mode',
                online: 'Connection restored',
                saving: 'Recording changes',
                saved: 'Changes recorded',
                deleted: 'Record removed',
                updated: 'Record modified'
            },
            
            // Form Labels
            forms: {
                name: 'Observer Name',
                email: 'Contact Address',
                title: 'Work Title',
                description: 'Work Description',
                category: 'Work Category',
                house: 'House Assignment',
                role: 'System Role',
                status: 'Current Status',
                priority: 'Priority Level',
                deadline: 'Completion Target',
                notes: 'Observation Notes',
                feedback: 'Recognition Feedback'
            },
            
            // Validation Messages
            validation: {
                required: 'This field requires completion',
                email: 'Enter valid contact address',
                minLength: 'Minimum length not met',
                maxLength: 'Maximum length exceeded',
                pattern: 'Format does not match requirements',
                number: 'Enter numerical value',
                date: 'Select valid date',
                file: 'Select valid file format',
                size: 'File size exceeds limits'
            },
            
            // Empty States
            empty: {
                works: 'No works submitted for recognition',
                activities: 'No recent system activity',
                recognitions: 'No recognitions recorded',
                users: 'No observers found',
                messages: 'No communications available',
                results: 'Query returned no results',
                notifications: 'No pending notifications'
            },
            
            // Help Text
            help: {
                recognition: 'Evaluate works based on precision, discipline, and execution',
                submission: 'Submit works for peer recognition and evaluation',
                profile: 'Manage your recognition record and achievements',
                houses: 'Coordinate with house members and activities',
                activity: 'Monitor system-wide recognition activities',
                admin: 'Oversee system operations and user management'
            }
        };
        
        this.contentGuidelines = {
            // Writing style rules
            writing: {
                useActiveVoice: true,
                avoidJargon: false, // We use specific terminology
                beSpecific: true,
                stayConcise: true,
                maintainConsistency: true,
                useNumbers: 'spell out 1-9, use digits for 10+',
                timeFormat: '24-hour notation',
                dateFormat: 'YYYY-MM-DD'
            },
            
            // Content structure
            structure: {
                pageTitle: 'Page | AURELION',
                metaDescription: 'Maximum 160 characters',
                headings: 'H1 for page title, H2 for sections, H3 for subsections',
                paragraphs: 'Maximum 4 sentences',
                lists: 'Maximum 7 items',
                links: 'Descriptive anchor text'
            }
        };
        
        this.validationRules = {
            // Content validation
            content: {
                maxSentenceLength: 30,
                maxParagraphLength: 100,
                minReadabilityScore: 60,
                maxJargonDensity: 0.15,
                requiredAltText: true
            },
            
            // Brand compliance
            brand: {
                noCasualLanguage: true,
                properTerminology: true,
                consistentFormatting: true,
                appropriateTone: true
            }
        };
    }

    // Initialize brand voice system
    initialize() {
        this.setupContentValidation();
        this.setupMicrocopyInjection();
        this.setupBrandMonitoring();
        this.setupContentGuidelines();
        this.addStyles();
        this.validateExistingContent();
    }

    // Setup content validation
    setupContentValidation() {
        // Validate new content as it's added
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        this.validateElement(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Validate individual element
    validateElement(element) {
        // Check text content
        if (element.textContent) {
            this.validateTextContent(element.textContent, element);
        }

        // Check attributes
        ['title', 'alt', 'placeholder', 'aria-label'].forEach(attr => {
            if (element.hasAttribute(attr)) {
                this.validateTextContent(element.getAttribute(attr), element, attr);
            }
        });

        // Check for required microcopy
        this.validateRequiredMicrocopy(element);
    }

    // Validate text content
    validateTextContent(text, element, attribute = null) {
        const issues = [];

        // Check for avoided vocabulary
        this.brandGuidelines.vocabulary.avoided.forEach(word => {
            if (text.toLowerCase().includes(word.toLowerCase())) {
                issues.push(`Avoided vocabulary: "${word}"`);
            }
        });

        // Check sentence length
        const sentences = text.split(/[.!?]+/);
        sentences.forEach((sentence, index) => {
            const wordCount = sentence.trim().split(/\s+/).length;
            if (wordCount > this.validationRules.content.maxSentenceLength) {
                issues.push(`Sentence ${index + 1} too long: ${wordCount} words`);
            }
        });

        // Check for casual language patterns
        const casualPatterns = [
            /\b(awesome|amazing|cool|stuff|things|random|basically|literally)\b/gi,
            /\b(very|really|quite|rather|pretty)\s+\w+/gi,
            /\b\w+(?:'s|s')\s+(?:awesome|amazing|cool|great)\b/gi
        ];

        casualPatterns.forEach(pattern => {
            const matches = text.match(pattern);
            if (matches) {
                matches.forEach(match => {
                    issues.push(`Casual language detected: "${match}"`);
                });
            }
        });

        // Report issues
        if (issues.length > 0) {
            this.reportValidationIssues(issues, element, attribute);
        }
    }

    // Report validation issues
    reportValidationIssues(issues, element, attribute) {
        if (window.DEBUG_MODE) {
            console.warn('Brand Voice Issues:', {
                element: element.tagName + (element.id ? '#' + element.id : ''),
                attribute: attribute || 'textContent',
                issues: issues
            });
        }

        // Add warning class to element
        element.classList.add('brand-voice-warning');

        // Add data attribute with issues
        element.setAttribute('data-brand-issues', JSON.stringify(issues));
    }

    // Validate required microcopy
    validateRequiredMicrocopy(element) {
        const tagName = element.tagName.toLowerCase();
        
        // Check for required attributes
        if (tagName === 'img' && !element.hasAttribute('alt')) {
            this.reportValidationIssues(['Missing alt text for image'], element, 'alt');
        }

        if (tagName === 'button' && !element.textContent.trim() && !element.hasAttribute('aria-label')) {
            this.reportValidationIssues(['Button lacks accessible label'], element);
        }

        if (tagName === 'a' && !element.textContent.trim() && !element.hasAttribute('aria-label')) {
            this.reportValidationIssues(['Link lacks accessible label'], element);
        }
    }

    // Setup microcopy injection
    setupMicrocopyInjection() {
        // Replace generic text with brand-specific microcopy
        this.replaceGenericText();
        
        // Add tooltips for help text
        this.addTooltips();
        
        // Update form labels
        this.updateFormLabels();
        
        // Update button text
        this.updateButtonText();
    }

    // Replace generic text
    replaceGenericText() {
        const replacements = {
            'Submit': this.microcopyLibrary.actions.submit,
            'Save': this.microcopyLibrary.actions.save,
            'Cancel': this.microcopyLibrary.actions.cancel,
            'Delete': this.microcopyLibrary.actions.delete,
            'Edit': this.microcopyLibrary.actions.edit,
            'View': this.microcopyLibrary.actions.view,
            'Close': this.microcopyLibrary.actions.close,
            'Continue': this.microcopyLibrary.actions.continue,
            'Confirm': this.microcopyLibrary.actions.confirm,
            'Search': this.microcopyLibrary.actions.search,
            'Filter': this.microcopyLibrary.actions.filter,
            'Sort': this.microcopyLibrary.actions.sort,
            'Loading...': this.microcopyLibrary.status.loading,
            'Success': this.microcopyLibrary.status.success,
            'Error': this.microcopyLibrary.status.error,
            'Warning': this.microcopyLibrary.status.warning,
            'Name': this.microcopyLibrary.forms.name,
            'Email': this.microcopyLibrary.forms.email,
            'Title': this.microcopyLibrary.forms.title,
            'Description': this.microcopyLibrary.forms.description,
            'Category': this.microcopyLibrary.forms.category,
            'Status': this.microcopyLibrary.forms.status
        };

        Object.entries(replacements).forEach(([generic, branded]) => {
            this.replaceTextInDocument(generic, branded);
        });
    }

    // Replace text in document
    replaceTextInDocument(searchText, replaceText) {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const textNodes = [];
        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach(node => {
            if (node.textContent.includes(searchText)) {
                node.textContent = node.textContent.replace(new RegExp(searchText, 'g'), replaceText);
            }
        });
    }

    // Add tooltips for help text
    addTooltips() {
        const helpElements = document.querySelectorAll('[data-help]');
        
        helpElements.forEach(element => {
            const helpKey = element.getAttribute('data-help');
            const helpText = this.getHelpText(helpKey);
            
            if (helpText) {
                this.createTooltip(element, helpText);
            }
        });
    }

    // Get help text
    getHelpText(key) {
        const keys = key.split('.');
        let value = this.microcopyLibrary;
        
        for (const k of keys) {
            value = value?.[k];
        }
        
        return value || null;
    }

    // Create tooltip
    createTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'brand-tooltip';
        tooltip.textContent = text;
        tooltip.setAttribute('role', 'tooltip');
        tooltip.setAttribute('aria-hidden', 'true');
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const positionTooltip = () => {
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        };
        
        element.addEventListener('mouseenter', () => {
            tooltip.setAttribute('aria-hidden', 'false');
            positionTooltip();
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.setAttribute('aria-hidden', 'true');
        });
        
        element.addEventListener('focus', () => {
            tooltip.setAttribute('aria-hidden', 'false');
            positionTooltip();
        });
        
        element.addEventListener('blur', () => {
            tooltip.setAttribute('aria-hidden', 'true');
        });
    }

    // Update form labels
    updateFormLabels() {
        const labels = document.querySelectorAll('label');
        
        labels.forEach(label => {
            const forId = label.getAttribute('for');
            if (forId) {
                const input = document.getElementById(forId);
                if (input) {
                    const inputType = input.type || input.tagName.toLowerCase();
                    const labelText = this.getFormLabel(inputType, input.name);
                    
                    if (labelText && !label.textContent.includes(labelText)) {
                        // Preserve existing content but add brand voice
                        const existingText = label.textContent.trim();
                        if (existingText === input.name || existingText === '') {
                            label.textContent = labelText;
                        }
                    }
                }
            }
        });
    }

    // Get form label
    getFormLabel(inputType, inputName) {
        const typeMap = {
            'text': this.microcopyLibrary.forms.name,
            'email': this.microcopyLibrary.forms.email,
            'title': this.microcopyLibrary.forms.title,
            'description': this.microcopyLibrary.forms.description,
            'category': this.microcopyLibrary.forms.category,
            'status': this.microcopyLibrary.forms.status,
            'select': this.microcopyLibrary.forms.category,
            'textarea': this.microcopyLibrary.forms.description
        };
        
        return typeMap[inputType] || this.microcopyLibrary.forms.name;
    }

    // Update button text
    updateButtonText() {
        const buttons = document.querySelectorAll('button');
        
        buttons.forEach(button => {
            const currentText = button.textContent.trim();
            const brandedText = this.getButtonText(currentText);
            
            if (brandedText && brandedText !== currentText) {
                button.textContent = brandedText;
            }
        });
    }

    // Get button text
    getButtonText(currentText) {
        const actionMap = {
            'submit': this.microcopyLibrary.actions.submit,
            'save': this.microcopyLibrary.actions.save,
            'cancel': this.microcopyLibrary.actions.cancel,
            'delete': this.microcopyLibrary.actions.delete,
            'edit': this.microcopyLibrary.actions.edit,
            'view': this.microcopyLibrary.actions.view,
            'close': this.microcopyLibrary.actions.close,
            'continue': this.microcopyLibrary.actions.continue,
            'confirm': this.microcopyLibrary.actions.confirm,
            'search': this.microcopyLibrary.actions.search,
            'filter': this.microcopyLibrary.actions.filter,
            'sort': this.microcopyLibrary.actions.sort
        };
        
        const lowerText = currentText.toLowerCase();
        
        for (const [key, value] of Object.entries(actionMap)) {
            if (lowerText.includes(key)) {
                return value;
            }
        }
        
        return null;
    }

    // Setup brand monitoring
    setupBrandMonitoring() {
        // Monitor for brand violations
        setInterval(() => {
            this.scanForViolations();
        }, 30000); // Scan every 30 seconds
        
        // Add brand monitoring panel (in debug mode)
        if (window.DEBUG_MODE) {
            this.createBrandMonitor();
        }
    }

    // Scan for violations
    scanForViolations() {
        const violations = document.querySelectorAll('.brand-voice-warning');
        
        if (violations.length > 0) {
            console.warn(`Found ${violations.length} brand voice violations`);
            
            violations.forEach(element => {
                const issues = JSON.parse(element.getAttribute('data-brand-issues') || '[]');
                console.warn('Violation:', element.tagName, issues);
            });
        }
    }

    // Create brand monitor (debug mode)
    createBrandMonitor() {
        const monitor = document.createElement('div');
        monitor.id = 'brand-monitor';
        monitor.innerHTML = `
            <h3>Brand Voice Monitor</h3>
            <div class="monitor-stats">
                <div class="stat">
                    <span class="label">Violations:</span>
                    <span class="value" id="violation-count">0</span>
                </div>
                <div class="stat">
                    <span class="label">Elements Checked:</span>
                    <span class="value" id="elements-checked">0</span>
                </div>
            </div>
            <div class="monitor-actions">
                <button onclick="brandVoiceSystem.scanForViolations()">Scan Now</button>
                <button onclick="brandVoiceSystem.fixViolations()">Auto-Fix</button>
                <button onclick="brandVoiceSystem.toggleMonitor()">Hide</button>
            </div>
        `;
        
        document.body.appendChild(monitor);
        this.updateMonitorStats();
    }

    // Update monitor statistics
    updateMonitorStats() {
        const violations = document.querySelectorAll('.brand-voice-warning').length;
        const elements = document.querySelectorAll('*').length;
        
        const violationCount = document.getElementById('violation-count');
        const elementsChecked = document.getElementById('elements-checked');
        
        if (violationCount) violationCount.textContent = violations;
        if (elementsChecked) elementsChecked.textContent = elements;
    }

    // Fix violations automatically
    fixViolations() {
        const violations = document.querySelectorAll('.brand-voice-warning');
        
        violations.forEach(element => {
            const issues = JSON.parse(element.getAttribute('data-brand-issues') || '[]');
            
            issues.forEach(issue => {
                if (issue.includes('Avoided vocabulary')) {
                    this.fixVocabulary(element, issue);
                } else if (issue.includes('Casual language')) {
                    this.fixCasualLanguage(element, issue);
                }
            });
            
            element.classList.remove('brand-voice-warning');
            element.removeAttribute('data-brand-issues');
        });
        
        this.updateMonitorStats();
        console.log('Fixed brand voice violations');
    }

    // Fix vocabulary issues
    fixVocabulary(element, issue) {
        const match = issue.match(/"([^"]+)"/);
        if (match) {
            const word = match[1];
            const replacement = this.getVocabularyReplacement(word);
            
            if (replacement) {
                element.textContent = element.textContent.replace(
                    new RegExp(word, 'gi'),
                    replacement
                );
            }
        }
    }

    // Get vocabulary replacement
    getVocabularyReplacement(word) {
        const replacements = {
            'awesome': 'exceptional',
            'amazing': 'remarkable',
            'cool': 'impressive',
            'stuff': 'materials',
            'things': 'elements',
            'random': 'unspecified',
            'basically': 'essentially',
            'literally': 'actually'
        };
        
        return replacements[word.toLowerCase()] || null;
    }

    // Fix casual language
    fixCasualLanguage(element, issue) {
        const match = issue.match(/"([^"]+)"/);
        if (match) {
            const phrase = match[1];
            const replacement = this.getCasualLanguageReplacement(phrase);
            
            if (replacement) {
                element.textContent = element.textContent.replace(
                    new RegExp(phrase, 'gi'),
                    replacement
                );
            }
        }
    }

    // Get casual language replacement
    getCasualLanguageReplacement(phrase) {
        const replacements = {
            'very good': 'excellent',
            'really good': 'exceptional',
            'quite good': 'notable',
            'pretty good': 'commendable',
            'very important': 'critical',
            'really important': 'essential',
            'quite important': 'significant',
            'pretty important': 'notable'
        };
        
        return replacements[phrase.toLowerCase()] || null;
    }

    // Toggle monitor visibility
    toggleMonitor() {
        const monitor = document.getElementById('brand-monitor');
        if (monitor) {
            monitor.style.display = monitor.style.display === 'none' ? 'block' : 'none';
        }
    }

    // Setup content guidelines
    setupContentGuidelines() {
        // Add content guidelines to editor interfaces
        this.addEditorGuidelines();
        
        // Add writing assistance
        this.addWritingAssistance();
        
        // Add brand voice shortcuts
        this.addBrandShortcuts();
    }

    // Add editor guidelines
    addEditorGuidelines() {
        const textareas = document.querySelectorAll('textarea');
        
        textareas.forEach(textarea => {
            this.addEditorGuideline(textarea);
        });
    }

    // Add editor guideline to textarea
    addEditorGuideline(textarea) {
        const guideline = document.createElement('div');
        guideline.className = 'editor-guideline';
        guideline.innerHTML = `
            <div class="guideline-item">
                <span class="guideline-label">Tone:</span>
                <span class="guideline-value">${this.brandGuidelines.tone}</span>
            </div>
            <div class="guideline-item">
                <span class="guideline-label">Length:</span>
                <span class="guideline-value">${this.brandGuidelines.formatting.sentenceLength}</span>
            </div>
            <div class="guideline-item">
                <span class="guideline-label">Words:</span>
                <span class="guideline-value" id="word-count">0</span>
            </div>
        `;
        
        textarea.parentNode.insertBefore(guideline, textarea.nextSibling);
        
        // Update word count
        textarea.addEventListener('input', () => {
            const wordCount = textarea.value.trim().split(/\s+/).length;
            const wordCountElement = guideline.querySelector('#word-count');
            if (wordCountElement) {
                wordCountElement.textContent = wordCount;
            }
        });
    }

    // Add writing assistance
    addWritingAssistance() {
        // Add writing assistance toolbar
        const toolbar = document.createElement('div');
        toolbar.className = 'writing-assistance';
        toolbar.innerHTML = `
            <button onclick="brandVoiceSystem.suggestImprovement()">Suggest Improvement</button>
            <button onclick="brandVoiceSystem.checkCompliance()">Check Compliance</button>
            <button onclick="brandVoiceSystem.getBrandGuidelines()">View Guidelines</button>
        `;
        
        document.body.appendChild(toolbar);
    }

    // Suggest improvement
    suggestImprovement() {
        const selection = window.getSelection();
        if (selection && selection.toString().trim()) {
            const suggestion = this.generateSuggestion(selection.toString());
            
            if (suggestion) {
                this.showSuggestion(selection, suggestion);
            } else {
                // Show no suggestion message
                this.showComplianceResult('No specific suggestions available for selected text');
            }
        } else {
            // Show message to select text first
            this.showComplianceResult('Please select some text to get suggestions');
        }
    }

    // Generate suggestion
    generateSuggestion(text) {
        // Simple suggestion logic - in production would use NLP
        if (text.includes('awesome')) {
            return 'Consider using "exceptional" or "remarkable" instead of "awesome"';
        }
        
        if (text.includes('very')) {
            return 'Consider using more specific language instead of "very"';
        }
        
        if (text.split(' ').length > 25) {
            return 'Consider breaking this into shorter sentences for clarity';
        }
        
        return null;
    }

    // Show suggestion
    showSuggestion(selection, suggestion) {
        // Remove existing suggestion box
        const existingBox = document.querySelector('.suggestion-box');
        if (existingBox) {
            existingBox.remove();
        }
        
        const suggestionBox = document.createElement('div');
        suggestionBox.className = 'suggestion-box';
        suggestionBox.innerHTML = `
            <div class="suggestion-content">
                <h4>Suggestion</h4>
                <p>${suggestion}</p>
                <div class="suggestion-actions">
                    <button class="dismiss-button" onclick="this.closest('.suggestion-box').remove()">Dismiss</button>
                    <button class="apply-button" onclick="brandVoiceSystem.applySuggestion('${suggestion}')">Apply</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(suggestionBox);
        
        // Position near selection
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        suggestionBox.style.left = rect.left + 'px';
        suggestionBox.style.top = (rect.bottom + 10) + 'px';
        
        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                suggestionBox.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
        
        // Close on background click
        suggestionBox.addEventListener('click', (e) => {
            if (e.target === suggestionBox) {
                suggestionBox.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        });
    }

    // Apply suggestion
    applySuggestion(suggestion) {
        // In production, would apply the actual suggestion
        console.log('Applied suggestion:', suggestion);
        document.querySelector('.suggestion-box')?.remove();
    }

    // Check compliance
    checkCompliance() {
        const violations = document.querySelectorAll('.brand-voice-warning');
        
        if (violations.length === 0) {
            this.showComplianceResult('Content complies with brand guidelines');
        } else {
            this.showComplianceResult(`Found ${violations.length} brand guideline violations`);
        }
    }

    // Show compliance result
    showComplianceResult(message) {
        // Remove existing result box
        const existingBox = document.querySelector('.compliance-result');
        if (existingBox) {
            existingBox.remove();
        }
        
        const resultBox = document.createElement('div');
        resultBox.className = 'compliance-result';
        resultBox.innerHTML = `
            <div class="result-content">
                <p>${message}</p>
                <button class="close-button" onclick="this.closest('.compliance-result').remove()">Close</button>
            </div>
        `;
        
        document.body.appendChild(resultBox);
        
        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                resultBox.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
        
        // Close on background click
        resultBox.addEventListener('click', (e) => {
            if (e.target === resultBox) {
                resultBox.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        });
        
        setTimeout(() => {
            resultBox.remove();
            document.removeEventListener('keydown', handleEscape);
        }, 5000);
    }

    // Get brand guidelines
    getBrandGuidelines() {
        // Remove existing guidelines box if present
        const existingBox = document.querySelector('.guidelines-box');
        if (existingBox) {
            existingBox.remove();
        }
        
        const guidelinesBox = document.createElement('div');
        guidelinesBox.className = 'guidelines-box';
        guidelinesBox.innerHTML = `
            <div class="guidelines-content">
                <h3>Brand Voice Guidelines</h3>
                <div class="guideline-section">
                    <h4>Tone</h4>
                    <p>${this.brandGuidelines.tone}</p>
                </div>
                <div class="guideline-section">
                    <h4>Voice</h4>
                    <p>${this.brandGuidelines.voice}</p>
                </div>
                <div class="guideline-section">
                    <h4>Values</h4>
                    <ul>
                        ${this.brandGuidelines.values.map(value => `<li>${value}</li>`).join('')}
                    </ul>
                </div>
                <div class="guideline-section">
                    <h4>Preferred Vocabulary</h4>
                    <ul>
                        ${this.brandGuidelines.vocabulary.preferred.map(word => `<li>${word}</li>`).join('')}
                    </ul>
                </div>
                <div class="guideline-section">
                    <h4>Avoided Vocabulary</h4>
                    <ul>
                        ${this.brandGuidelines.vocabulary.avoided.map(word => `<li>${word}</li>`).join('')}
                    </ul>
                </div>
                <button class="close-button" onclick="this.closest('.guidelines-box').remove()">Close</button>
            </div>
        `;
        
        document.body.appendChild(guidelinesBox);
        
        // Focus management
        guidelinesBox.focus();
        
        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                guidelinesBox.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
        
        // Close on background click
        guidelinesBox.addEventListener('click', (e) => {
            if (e.target === guidelinesBox) {
                guidelinesBox.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        });
    }

    // Add brand shortcuts
    addBrandShortcuts() {
        // Add keyboard shortcuts for brand voice tools
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.shiftKey) {
                switch (event.key) {
                    case 'B':
                        event.preventDefault();
                        this.getBrandGuidelines();
                        break;
                    case 'C':
                        event.preventDefault();
                        this.checkCompliance();
                        break;
                    case 'S':
                        event.preventDefault();
                        this.suggestImprovement();
                        break;
                }
            }
        });
    }

    // Validate existing content
    validateExistingContent() {
        // Validate all existing content
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(element => {
            this.validateElement(element);
        });
        
        console.log('Validated existing content for brand compliance');
    }

    // Add CSS styles
    addStyles() {
        if (document.getElementById('brandVoiceSystemStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'brandVoiceSystemStyles';
        style.textContent = `
            .brand-voice-warning {
                border: 2px dashed #dc2626 !important;
                background-color: rgba(220, 38, 38, 0.1) !important;
            }
            
            .brand-tooltip {
                position: absolute;
                background: var(--color-glass-bg);
                border: 1px solid var(--color-gold);
                color: var(--color-text-primary);
                padding: var(--space-sm) var(--space-md);
                border-radius: var(--radius-card);
                font-size: var(--text-sm);
                max-width: 300px;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity var(--duration-base) var(--ease-cinematic);
            }
            
            .brand-tooltip[aria-hidden="false"] {
                opacity: 1;
            }
            
            #brand-monitor {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--color-glass-bg);
                border: 2px solid var(--color-gold);
                border-radius: var(--radius-card);
                padding: var(--space-lg);
                z-index: 10000;
                min-width: 250px;
            }
            
            #brand-monitor h3 {
                font-family: var(--font-display);
                font-size: var(--text-lg);
                color: var(--color-gold);
                margin-bottom: var(--space-md);
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
            }
            
            .monitor-stats {
                margin-bottom: var(--space-lg);
            }
            
            .monitor-stats .stat {
                display: flex;
                justify-content: space-between;
                margin-bottom: var(--space-sm);
            }
            
            .monitor-stats .label {
                color: var(--color-text-secondary);
                font-size: var(--text-sm);
            }
            
            .monitor-stats .value {
                color: var(--color-gold);
                font-weight: 600;
            }
            
            .monitor-actions {
                display: flex;
                gap: var(--space-sm);
                flex-wrap: wrap;
            }
            
            .monitor-actions button {
                background: var(--color-gold);
                color: var(--deep-black);
                border: none;
                padding: var(--space-xs) var(--space-sm);
                border-radius: var(--radius-pill);
                font-size: var(--text-xs);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                cursor: pointer;
                transition: all var(--duration-base) var(--ease-cinematic);
            }
            
            .monitor-actions button:hover {
                background: var(--color-gold-dim);
            }
            
            .editor-guideline {
                background: var(--color-glass-bg);
                border: 1px solid var(--color-glass-border);
                border-radius: var(--radius-card);
                padding: var(--space-sm);
                margin-top: var(--space-sm);
                font-size: var(--text-xs);
            }
            
            .guideline-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: var(--space-xs);
            }
            
            .guideline-label {
                color: var(--color-text-secondary);
            }
            
            .guideline-value {
                color: var(--color-gold);
                font-weight: 500;
            }
            
            .writing-assistance {
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: var(--color-glass-bg);
                border: 1px solid var(--color-gold);
                border-radius: var(--radius-card);
                padding: var(--space-sm);
                z-index: 1000;
            }
            
            .writing-assistance button {
                background: var(--color-gold);
                color: var(--deep-black);
                border: none;
                padding: var(--space-xs) var(--space-sm);
                border-radius: var(--radius-pill);
                font-size: var(--text-xs);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                cursor: pointer;
                margin-right: var(--space-xs);
                transition: all var(--duration-base) var(--ease-cinematic);
            }
            
            .writing-assistance button:hover {
                background: var(--color-gold-dim);
            }
            
            .suggestion-box,
            .compliance-result,
            .guidelines-box {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--color-glass-bg);
                border: 2px solid var(--color-gold);
                border-radius: var(--radius-card);
                padding: var(--space-lg);
                z-index: 10000;
                max-width: 500px;
                max-height: 80vh;
                overflow-y: auto;
            }
            
            .suggestion-content h4,
            .result-content p,
            .guidelines-content h3 {
                font-family: var(--font-display);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
            }
            
            .suggestion-actions,
            .result-content button,
            .guidelines-content button {
                background: var(--color-gold);
                color: var(--deep-black);
                border: none;
                padding: var(--space-sm) var(--space-md);
                border-radius: var(--radius-pill);
                font-size: var(--text-sm);
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: var(--tracking-wide);
                cursor: pointer;
                margin-right: var(--space-sm);
                transition: all var(--duration-base) var(--ease-cinematic);
            }
            
            .guidelines-section {
                margin-bottom: var(--space-lg);
            }
            
            .guidelines-section h4 {
                font-size: var(--text-lg);
                color: var(--color-gold);
                margin-bottom: var(--space-sm);
            }
            
            .guidelines-section ul {
                list-style: none;
                padding-left: 0;
            }
            
            .guidelines-section li {
                color: var(--color-text-secondary);
                margin-bottom: var(--space-xs);
                padding-left: var(--space-md);
                position: relative;
            }
            
            .guidelines-section li::before {
                content: '°';
                position: absolute;
                left: 0;
                color: var(--color-gold);
            }
            
            @media (max-width: 768px) {
                #brand-monitor {
                    top: 10px;
                    right: 10px;
                    min-width: 200px;
                }
                
                .writing-assistance {
                    bottom: 10px;
                    left: 10px;
                }
                
                .suggestion-box,
                .compliance-result,
                .guidelines-box {
                    width: 90%;
                    max-width: none;
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Static method to initialize
    static init() {
        const brandVoiceSystem = new BrandVoiceSystem();
        brandVoiceSystem.initialize();
        return brandVoiceSystem;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BrandVoiceSystem;
} else {
    window.BrandVoiceSystem = BrandVoiceSystem;
}
