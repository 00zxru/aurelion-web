/*
=== PHASE 0: CODEBASE AUDIT FINDINGS ===

Unicode Escapes Found:
- index.html: Lines 67, 71, 75, 79, 87, 101, 105, 109, 113, 192
- app.js: Lines 249, 278, 345, 393, 493, 510, 543
Patterns: {'\u25c6'} (diamond), {'\u25c2'} (triangle left), {'\u25c9'} (circle), {'\u25c4'} (triangle right), {'\u25bc'} (down arrow), {'\u00d7'} (multiply), {'\u25b6'} (play)

Profile Banner Component:
- Located in index.html lines 187-193
- Renders unconditionally, needs auth guard

Navigation CSS:
- Mobile nav: .mobile-nav with padding: 1rem 0, no height specified
- Desktop nav: .desktop-nav with width: 280px
- Content wrapper needs padding-bottom fix

Solar Halo Implementation:
- CSS class .solar-halo using simple radial gradient
- Located in styles.css lines 429-437
- Needs multi-ray SVG replacement

Firebase Security Rules:
- Not implemented yet
- Need firestore.rules file

PWA Files:
- No manifest.json found
- No service worker found
- Need PWA implementation

Design Tokens:
- Basic CSS variables exist in :root
- Need comprehensive token system

=== END AUDIT ===
*/

// AURELION App State Management
class AurelionApp {
    constructor() {
        this.currentView = 'entry';
        this.currentUser = null;
        this.houses = [];
        this.profiles = [];
        this.media = [];
        this.isProfileComplete = false;
        this.apiBase = window.location.origin + '/api';
        
        this.init();
    }

    init() {
        this.initializeStarField();
        this.initializeCustomCursor();
        this.initializeScrollProgress();
        this.loadUserSession();
        this.setupEventListeners();
        this.initializeWordmark();
        this.initializeScrollNavigation();
        this.initializeIntroAnimation();
        this.initializeLandingMotion();
        this.initializeHouseSystem();
        this.initializeProfileSystem();
        this.initializeRecognitionSystem();
        this.initializeActivitySystem();
        this.initializeWorkSystem();
        this.initializeAdminSystem();
        this.initializeContactSystem();
        this.initializeAccessibilitySystem();
        this.initializeBrandVoiceSystem();
        this.initializeStretchGoalsSystem();
        
        // Start with entry screen
        setTimeout(() => {
            this.showView('access');
        }, 2000);
    }

    initializeIntroAnimation() {
        // Start intro animation if it should play
        setTimeout(() => {
            if (typeof IntroAnimation !== 'undefined') {
                IntroAnimation.start();
            }
        }, 500);
    }

    initializeLandingMotion() {
        // Initialize exaggerated landing motion for hero
        setTimeout(() => {
            if (typeof LandingMotion !== 'undefined') {
                this.landingMotion = LandingMotion.init();
            }
        }, 1000);
    }

    initializeHouseSystem() {
        // Initialize full house system
        setTimeout(() => {
            if (typeof HouseSystem !== 'undefined') {
                this.houseSystem = HouseSystem.init();
                window.houseSystem = this.houseSystem; // Global access for navigation
            }
        }, 1500);
    }

    initializeProfileSystem() {
        // Initialize profile system
        setTimeout(() => {
            if (typeof ProfileSystem !== 'undefined') {
                this.profileSystem = ProfileSystem.init();
                window.profileSystem = this.profileSystem; // Global access for navigation
            }
        }, 2000);
    }

    initializeRecognitionSystem() {
        // Initialize recognition system
        setTimeout(() => {
            if (typeof RecognitionSystem !== 'undefined') {
                this.recognitionSystem = RecognitionSystem.init();
                window.recognitionSystem = this.recognitionSystem; // Global access for navigation
            }
        }, 2500);
    }

    initializeActivitySystem() {
        // Initialize activity system
        setTimeout(() => {
            if (typeof ActivitySystem !== 'undefined') {
                this.activitySystem = ActivitySystem.init();
                window.activitySystem = this.activitySystem; // Global access for navigation
            }
        }, 3000);
    }

    initializeWorkSystem() {
        // Initialize work system
        setTimeout(() => {
            if (typeof WorkSystem !== 'undefined') {
                this.workSystem = WorkSystem.init();
                window.workSystem = this.workSystem; // Global access for navigation
            }
        }, 3500);
    }

    initializeAdminSystem() {
        // Initialize admin system
        setTimeout(() => {
            if (typeof AdminSystem !== 'undefined') {
                this.adminSystem = AdminSystem.init();
                window.adminSystem = this.adminSystem; // Global access for navigation
            }
        }, 4000);
    }

    initializeContactSystem() {
        // Initialize contact system
        setTimeout(() => {
            if (typeof ContactSystem !== 'undefined') {
                this.contactSystem = ContactSystem.init();
                window.contactSystem = this.contactSystem; // Global access for navigation
            }
        }, 4500);
    }

    initializeAccessibilitySystem() {
        // Initialize accessibility system
        setTimeout(() => {
            if (typeof AccessibilitySystem !== 'undefined') {
                this.accessibilitySystem = AccessibilitySystem.init();
                window.accessibilitySystem = this.accessibilitySystem; // Global access for navigation
            }
        }, 5000);
    }

    initializeBrandVoiceSystem() {
        // Initialize brand voice system
        setTimeout(() => {
            if (typeof BrandVoiceSystem !== 'undefined') {
                this.brandVoiceSystem = BrandVoiceSystem.init();
                window.brandVoiceSystem = this.brandVoiceSystem; // Global access for navigation
            }
        }, 5500);
    }

    initializeStretchGoalsSystem() {
        // Initialize stretch goals system
        setTimeout(() => {
            if (typeof StretchGoalsSystem !== 'undefined') {
                this.stretchGoalsSystem = StretchGoalsSystem.init();
                window.stretchGoalsSystem = this.stretchGoalsSystem; // Global access for navigation
            }
        }, 6000);
    }

    initializeWordmark() {
        // Replace all logo elements with AurelionWordmark
        setTimeout(() => {
            if (typeof AurelionWordmark !== 'undefined') {
                AurelionWordmark.replace('.logo', { size: 'medium', color: 'gold' });
                AurelionWordmark.replace('.page-title', { size: 'large', color: 'gold', animation: true });
            }
        }, 100);
    }

    initializeScrollNavigation() {
        // Add section IDs for scroll navigation
        this.addSectionIds();
        
        // Initialize scrollspy
        this.initializeScrollSpy();
        
        // Add smooth scroll behavior to navigation links
        this.addSmoothScroll();
    }

    addSectionIds() {
        // Add stable IDs to major sections
        const sections = [
            { selector: '.hero', id: 'hero' },
            { selector: '.houses-grid', id: 'houses' },
            { selector: '.work-grid', id: 'work' },
            { selector: '.members-grid', id: 'members' },
            { selector: '.admin-container', id: 'admin' }
        ];

        sections.forEach(section => {
            const element = document.querySelector(section.selector);
            if (element && !element.id) {
                element.id = section.id;
            }
        });
    }

    initializeScrollSpy() {
        const sections = document.querySelectorAll('[id]');
        const navItems = document.querySelectorAll('.nav-item');
        
        if (!sections.length || !navItems.length) return;

        const observerOptions = {
            root: document.querySelector('.main-content'),
            rootMargin: '-40% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.updateActiveNavItem(sectionId);
                    
                    // Update URL hash silently
                    if (history.replaceState) {
                        history.replaceState(null, null, `#${sectionId}`);
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    updateActiveNavItem(sectionId) {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.classList.remove('active');
            
            const href = item.getAttribute('href') || item.getAttribute('onclick');
            if (href && href.includes(sectionId)) {
                item.classList.add('active');
            }
        });
    }

    addSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-item[href], .mobile-nav-item[href]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const offset = 200; // Account for sidebar width
                        const targetPosition = targetElement.offsetTop - offset;
                        
                        document.querySelector('.main-content').scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // View Management
    showView(viewName, data = {}) {
        const views = document.querySelectorAll('.view');
        views.forEach(view => view.classList.remove('active'));
        
        // Hide mobile nav when switching views
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav) mobileNav.classList.remove('active');
        
        switch(viewName) {
            case 'entry':
                this.showEntryScreen();
                break;
            case 'access':
                this.showAccessPortal();
                break;
            case 'home':
                this.showMainApp();
                this.showContentView('homeView');
                break;
            case 'houses':
                this.showMainApp();
                this.showContentView('housesView');
                this.loadHouses();
                break;
            case 'houseDetail':
                this.showMainApp();
                this.showContentView('houseDetailView');
                this.loadHouseDetail(data.houseId);
                break;
            case 'profile':
                this.showMainApp();
                this.showContentView('profileView');
                this.loadProfile();
                break;
            case 'admin':
                this.showMainApp();
                this.showContentView('adminView');
                this.loadAdmin();
                break;
        }
        
        this.currentView = viewName;
        this.updateNavigation();
        this.showProfileBanner(); // Check banner visibility after route change
    }

    showContentView(viewId) {
        const contentViews = document.querySelectorAll('.content-view');
        contentViews.forEach(view => view.classList.remove('active'));
        
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.add('active');
        }
    }

    showEntryScreen() {
        document.getElementById('entryScreen').classList.add('active');
    }

    showAccessPortal() {
        document.getElementById('accessPortal').classList.add('active');
        setTimeout(() => {
            document.getElementById('accessCode').focus();
        }, 500);
    }

    showMainApp() {
        document.getElementById('mainApp').classList.add('active');
        this.initializeShootingStars();
    }

    // Navigation
    updateNavigation() {
        const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.view === this.currentView) {
                item.classList.add('active');
            }
        });
    }

    navigateTo(view, data = {}) {
        this.showView(view, data);
    }

    // Access Portal
    validateAccess() {
        const code = document.getElementById('accessCode').value.toUpperCase();
        const errorMessage = document.getElementById('errorMessage');
        const button = document.getElementById('accessButton');
        
        if (code === 'AURELION2024') {
            button.disabled = true;
            button.innerHTML = '<span class="loading"></span>';
            
            // Simulate authentication
            setTimeout(() => {
                this.currentUser = { id: 'user-1', name: 'UNREVEALED', house: 'solis' };
                this.saveUserSession();
                this.navigateTo('home');
            }, 1500);
        } else {
            errorMessage.classList.add('show');
            setTimeout(() => {
                errorMessage.classList.remove('show');
            }, 3000);
        }
    }

    // Houses
    async loadHouses() {
        try {
            const response = await fetch(`${this.apiBase}/houses`);
            const data = await response.json();
            
            if (data.success) {
                this.houses = data.houses;
                this.renderHouses();
            }
        } catch (error) {
            console.error('Failed to load houses:', error);
            this.renderMockHouses();
        }
    }

    renderHouses() {
        const housesGrid = document.getElementById('housesGrid');
        if (!housesGrid) return;
        
        housesGrid.innerHTML = '';
        
        this.houses.forEach((house, index) => {
            const houseCard = document.createElement('div');
            houseCard.className = 'house-card';
            houseCard.onclick = () => this.navigateTo('houseDetail', { houseId: house.id });
            
            houseCard.innerHTML = `
                <div class="house-emblem">${house.name.charAt(6)}</div>
                <h3 class="house-name">${house.name}</h3>
                <p class="house-description">${house.description}</p>
            `;
            
            housesGrid.appendChild(houseCard);
            
            // Stagger animation
            setTimeout(() => {
                houseCard.style.opacity = '0';
                houseCard.style.transform = 'translateY(20px)';
                houseCard.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    houseCard.style.opacity = '1';
                    houseCard.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    }

    renderMockHouses() {
        const mockHouses = [
            { id: 'solis', name: 'HOUSE SOLIS', description: 'Core / Vision' },
            { id: 'helios', name: 'HOUSE HELIOS', description: 'Photography' },
            { id: 'apollo', name: 'HOUSE APOLLO', description: 'Music' },
            { id: 'vulcan', name: 'HOUSE VULCAN', description: 'Fashion / Design' },
            { id: 'noctis', name: 'HOUSE NOCTIS', description: 'Experimental' }
        ];
        this.houses = mockHouses;
        this.renderHouses();
    }

    async loadHouseDetail(houseId) {
        const house = this.houses.find(h => h.id === houseId);
        if (!house) return;
        
        const houseDetail = document.getElementById('houseDetail');
        if (!houseDetail) return;
        
        houseDetail.innerHTML = `
            <div class="house-detail-header">
                <div class="house-detail-emblem">${house.name.charAt(6)}</div>
                <h2 class="house-detail-name">${house.name}</h2>
                <p class="house-detail-description">${house.description}</p>
            </div>
            
            <div class="house-section">
                <h3 class="house-section-title">Members</h3>
                <div class="house-members" id="houseMembers">
                    <!-- Members will be loaded here -->
                </div>
            </div>
            
            <div class="house-section">
                <h3 class="house-section-title">Work & Portfolio</h3>
                <div class="work-gallery" id="houseWorkGallery">
                    <!-- Work will be loaded here -->
                </div>
            </div>
        `;
        
        this.loadHouseMembers(houseId);
        this.loadHouseWork(houseId);
    }

    async loadHouseMembers(houseId) {
        const membersContainer = document.getElementById('houseMembers');
        if (!membersContainer) return;
        
        // Mock members
        const mockMembers = [
            { id: '1', name: 'UNREVEALED', status: 'Active' },
            { id: '2', name: 'UNREVEALED', status: 'Active' },
            { id: '3', name: 'UNREVEALED', status: 'Pending' }
        ];
        
        membersContainer.innerHTML = '';
        mockMembers.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card';
            memberCard.innerHTML = `
                <div class="member-avatar">°</div>
                <div class="member-name">${member.name}</div>
                <div class="member-status">${member.status}</div>
            `;
            membersContainer.appendChild(memberCard);
        });
    }

    async loadHouseWork(houseId) {
        const galleryContainer = document.getElementById('houseWorkGallery');
        if (!galleryContainer) return;
        
        // Mock work items
        const mockWork = [
            { title: 'Solar Eclipse', category: 'Photography', year: '2026' },
            { title: 'Urban Geometry', category: 'Architecture', year: '2026' },
            { title: 'Silent Motion', category: 'Video', year: '2025' },
            { title: 'Light Studies', category: 'Photography', year: '2025' }
        ];
        
        galleryContainer.innerHTML = '';
        mockWork.forEach(work => {
            const workItem = document.createElement('div');
            workItem.className = 'work-item';
            workItem.onclick = () => this.openWorkModal(work);
            
            workItem.innerHTML = `
                <div class="work-placeholder">
                    <div class="work-placeholder-content">
                        <div class="work-placeholder-icon">§</div>
                        <div class="work-title">${work.title}</div>
                        <div class="work-meta">${work.category} · ${work.year}</div>
                    </div>
                </div>
            `;
            galleryContainer.appendChild(workItem);
        });
    }

    // Profile
    async loadProfile() {
        const profileContainer = document.getElementById('profileContainer');
        if (!profileContainer) return;
        
        if (!this.isProfileComplete) {
            this.showProfileCreation();
        } else {
            this.showProfileView();
        }
    }

    showProfileCreation() {
        const profileContainer = document.getElementById('profileContainer');
        if (!profileContainer) return;
        
        profileContainer.innerHTML = `
            <div class="profile-creation">
                <div class="view-header">
                    <h2 class="view-title">Create Profile</h2>
                    <p class="view-subtitle">Complete your recognition</p>
                </div>
                
                <div class="profile-section">
                    <h3 class="profile-section-title">Step 1: Identity</h3>
                    <input type="text" class="form-input" id="profileName" placeholder="Name (or UNREVEALED)" style="margin-bottom: 1rem;">
                    <textarea class="form-input" id="profileBio" placeholder="Brief description" rows="4" style="margin-bottom: 1rem;"></textarea>
                </div>
                
                <div class="profile-section">
                    <h3 class="profile-section-title">Step 2: House Selection</h3>
                    <select class="form-input" id="houseSelect" style="margin-bottom: 1rem;">
                        <option value="">Select House</option>
                        ${this.houses.map(house => `<option value="${house.id}">${house.name}</option>`).join('')}
                    </select>
                </div>
                
                <div class="profile-section">
                    <h3 class="profile-section-title">Step 3: Social Links</h3>
                    <input type="url" class="form-input" id="socialInstagram" placeholder="Instagram (optional)" style="margin-bottom: 1rem;">
                    <input type="url" class="form-input" id="socialWebsite" placeholder="Website (optional)" style="margin-bottom: 1rem;">
                </div>
                
                <div style="text-align: center; margin-top: 2rem;">
                    <button class="form-button" onclick="app.completeProfile()">Complete Profile</button>
                    <button class="form-button" style="background: transparent; border: 1px solid var(--matte-gold); margin-left: 1rem;" onclick="app.skipProfile()">Skip for now</button>
                </div>
            </div>
        `;
    }

    showProfileView() {
        const profileContainer = document.getElementById('profileContainer');
        if (!profileContainer) return;
        
        profileContainer.innerHTML = `
            <div class="profile-header">
                <div class="profile-avatar">°</div>
                <h2 class="profile-name">${this.currentUser?.name || 'UNREVEALED'}</h2>
                <div class="profile-house">${this.houses.find(h => h.id === this.currentUser?.house)?.name || 'HOUSE SOLIS'}</div>
            </div>
            
            <div class="profile-section">
                <h3 class="profile-section-title">Work</h3>
                <div class="work-gallery">
                    <!-- User's work would be displayed here -->
                </div>
            </div>
            
            <div class="profile-section">
                <h3 class="profile-section-title">Contact</h3>
                <p style="color: var(--soft-white-70);">Contact information available to recognized members.</p>
            </div>
        `;
    }

    completeProfile() {
        const name = document.getElementById('profileName').value || 'UNREVEALED';
        const house = document.getElementById('houseSelect').value || 'solis';
        
        this.currentUser = { ...this.currentUser, name, house };
        this.isProfileComplete = true;
        this.saveUserSession();
        
        this.showProfileView();
        this.hideProfileBanner();
    }

    skipProfile() {
        this.showProfileView();
        this.showProfileBanner();
    }

    // Admin
    async loadAdmin() {
        const adminContainer = document.getElementById('adminContainer');
        if (!adminContainer) return;
        
        adminContainer.innerHTML = `
            <div class="admin-header">
                <h2 class="admin-title">Admin Archive</h2>
                <p class="admin-subtitle">Media Management System</p>
            </div>
            
            <div class="upload-area" id="uploadArea">
                <div class="upload-icon">§</div>
                <p class="upload-text">Click to select files or drag and drop</p>
                <p class="upload-hint">Images and videos only (max 50MB)</p>
                <input type="file" class="file-input" id="fileInput" multiple accept="image/*,video/*">
            </div>
            
            <button class="upload-button" id="uploadButton" onclick="app.handleUpload()">Upload Files</button>
            
            <div class="media-grid" id="mediaGrid">
                <!-- Media items will be loaded here -->
            </div>
        `;
        
        this.initializeUploadArea();
        this.loadMedia();
    }

    initializeUploadArea() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        
        if (!uploadArea || !fileInput) return;
        
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            fileInput.files = e.dataTransfer.files;
            this.updateUploadButton();
        });
        
        fileInput.addEventListener('change', () => this.updateUploadButton());
    }

    updateUploadButton() {
        const fileInput = document.getElementById('fileInput');
        const uploadButton = document.getElementById('uploadButton');
        const uploadArea = document.getElementById('uploadArea');
        
        if (!fileInput || !uploadButton || !uploadArea) return;
        
        if (fileInput.files.length > 0) {
            uploadButton.disabled = false;
            uploadArea.querySelector('.upload-text').textContent = `${fileInput.files.length} file(s) selected`;
        } else {
            uploadButton.disabled = true;
            uploadArea.querySelector('.upload-text').textContent = 'Click to select files or drag and drop';
        }
    }

    async handleUpload() {
        const fileInput = document.getElementById('fileInput');
        const uploadButton = document.getElementById('uploadButton');
        
        if (!fileInput || !fileInput.files.length) return;
        
        uploadButton.disabled = true;
        uploadButton.innerHTML = '<span class="loading"></span> Uploading...';
        
        // Simulate upload
        setTimeout(() => {
            this.loadMedia();
            uploadButton.innerHTML = 'Upload Files';
            fileInput.value = '';
            this.updateUploadButton();
        }, 2000);
    }

    async loadMedia() {
        const mediaGrid = document.getElementById('mediaGrid');
        if (!mediaGrid) return;
        
        // Mock media items
        const mockMedia = [
            { id: '1', name: 'solar-eclipse.jpg', type: 'image', url: '#' },
            { id: '2', name: 'urban-geometry.jpg', type: 'image', url: '#' },
            { id: '3', name: 'silent-motion.mp4', type: 'video', url: '#' }
        ];
        
        mediaGrid.innerHTML = '';
        mockMedia.forEach(media => {
            const mediaItem = document.createElement('div');
            mediaItem.className = 'media-item';
            
            if (media.type === 'image') {
                mediaItem.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: var(--matte-gold-10);">
                        <div style="text-align: center; color: var(--soft-white-50);">
                            <div style="font-size: 2rem;">§</div>
                            <div style="font-size: 0.8rem; margin-top: 0.5rem;">${media.name}</div>
                        </div>
                    </div>
                    <div class="media-info">
                        <div>${media.name}</div>
                    </div>
                    <div class="media-delete" onclick="app.deleteMedia('${media.id}')">
                        <svg viewBox="0 0 24 24">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </div>
                `;
            } else {
                mediaItem.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: var(--deep-black-50);">
                        <div style="text-align: center; color: var(--soft-white-50);">
                            <div style="font-size: 2rem;">»</div>
                            <div style="font-size: 0.8rem; margin-top: 0.5rem;">Video</div>
                            <div style="font-size: 0.7rem;">${media.name}</div>
                        </div>
                    </div>
                    <div class="media-delete" onclick="app.deleteMedia('${media.id}')">
                        <svg viewBox="0 0 24 24">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </div>
                `;
            }
            
            mediaGrid.appendChild(mediaItem);
        });
    }

    deleteMedia(mediaId) {
        console.log('Delete media:', mediaId);
        this.loadMedia();
    }

    // Modal
    openWorkModal(work) {
        const modal = document.getElementById('modal');
        const modalBody = document.getElementById('modalBody');
        
        if (!modal || !modalBody) return;
        
        modalBody.innerHTML = `
            <div style="text-align: center;">
                <div style="aspect-ratio: 16/10; background: linear-gradient(135deg, var(--deep-black-50) 0%, var(--matte-gold-10) 100%); border-radius: 8px; margin-bottom: 2rem; display: flex; align-items: center; justify-content: center;">
                    <div style="text-align: center; color: var(--soft-white-50);">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">§</div>
                        <div style="font-size: 1.5rem; color: var(--soft-white); margin-bottom: 0.5rem;">${work.title}</div>
                        <div style="color: var(--matte-gold-70);">${work.category} · ${work.year}</div>
                    </div>
                </div>
                <p style="color: var(--soft-white-70); line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    This work represents pinnacle of creative observation, where precision meets execution in perfect harmony.
                </p>
            </div>
        `;
        
        modal.classList.add('active');
    }

    closeModal() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Profile Banner
    showProfileBanner() {
        const banner = document.getElementById('profileBanner');
        if (!banner) return;
        
        // Only show banner if:
        // 1. User is authenticated (has currentUser)
        // 2. Profile is not complete
        // 3. Not on pre-auth routes (entry, access)
        const preAuthRoutes = ['entry', 'access'];
        const isPreAuthRoute = preAuthRoutes.includes(this.currentView);
        
        if (this.currentUser && !this.isProfileComplete && !isPreAuthRoute) {
            banner.classList.add('show');
        } else {
            banner.classList.remove('show');
        }
    }

    hideProfileBanner() {
        const banner = document.getElementById('profileBanner');
        if (banner) {
            banner.classList.remove('show');
        }
    }

    closeProfileBanner() {
        this.hideProfileBanner();
    }

    // Settings
    toggleSettings() {
        const dropdown = document.getElementById('settingsDropdown');
        if (dropdown) {
            dropdown.classList.toggle('open');
        }
    }

    logout() {
        this.currentUser = null;
        this.isProfileComplete = false;
        this.clearUserSession();
        this.showView('access');
    }

    // Session Management
    saveUserSession() {
        if (this.currentUser) {
            localStorage.setItem('aurelionUser', JSON.stringify(this.currentUser));
            localStorage.setItem('aurelionProfileComplete', this.isProfileComplete);
        }
    }

    loadUserSession() {
        const user = localStorage.getItem('aurelionUser');
        const profileComplete = localStorage.getItem('aurelionProfileComplete');
        
        if (user) {
            this.currentUser = JSON.parse(user);
            this.isProfileComplete = profileComplete === 'true';
            
            if (!this.isProfileComplete) {
                this.showProfileBanner();
            }
        }
    }

    clearUserSession() {
        localStorage.removeItem('aurelionUser');
        localStorage.removeItem('aurelionProfileComplete');
    }

    // Visual Effects
    initializeStarField() {
        const starField = document.getElementById('starField');
        if (!starField) return;
        
        const starCount = 100;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starField.appendChild(star);
        }
    }

    initializeShootingStars() {
        setInterval(() => {
            const starField = document.getElementById('starField');
            if (!starField) return;
            
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            shootingStar.style.left = Math.random() * 100 + '%';
            shootingStar.style.top = Math.random() * 50 + '%';
            starField.appendChild(shootingStar);
            
            setTimeout(() => {
                shootingStar.remove();
            }, 3000);
        }, 8000);
    }

    initializeCustomCursor() {
        const cursor = document.getElementById('customCursor');
        const trail = document.getElementById('cursorTrail');
        
        if (!cursor || !trail) return;
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mouseenter', (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('house-card') || e.target.classList.contains('work-item')) {
                cursor.classList.add('hover');
            }
        });
        
        document.addEventListener('mouseleave', (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('house-card') || e.target.classList.contains('work-item')) {
                cursor.classList.remove('hover');
            }
        });
    }

    initializeScrollProgress() {
        const progressBar = document.getElementById('scrollProgress');
        const mainContent = document.getElementById('mainContent');
        
        if (!progressBar || !mainContent) return;
        
        mainContent.addEventListener('scroll', () => {
            const scrollTop = mainContent.scrollTop;
            const docHeight = mainContent.scrollHeight - mainContent.clientHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    setupEventListeners() {
        // Access code enter key
        const accessCode = document.getElementById('accessCode');
        if (accessCode) {
            accessCode.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.validateAccess();
                }
            });
        }

        // Close modal on background click
        const modal = document.getElementById('modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Close modal on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Close settings dropdown on outside click
        document.addEventListener('click', (e) => {
            const dropdown = document.getElementById('settingsDropdown');
            if (dropdown && !dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });
    }
}

// Global Functions
let app;

function navigateTo(view, data = {}) {
    if (app) {
        app.navigateTo(view, data);
    }
}

function validateAccess() {
    if (app) {
        app.validateAccess();
    }
}

function closeModal() {
    if (app) {
        app.closeModal();
    }
}

function toggleSettings() {
    if (app) {
        app.toggleSettings();
    }
}

function logout() {
    if (app) {
        app.logout();
    }
}

function closeProfileBanner() {
    if (app) {
        app.closeProfileBanner();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app = new AurelionApp();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AurelionApp;
}
