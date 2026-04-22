const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// Firebase Service Placeholder
class FirebaseService {
  constructor() {
    this.mockUsers = [];
    this.mockProfiles = [];
    this.mockMedia = [];
    this.mockHouses = [
      { id: 'solis', name: 'HOUSE SOLIS', description: 'Core / Vision', members: [] },
      { id: 'helios', name: 'HOUSE HELIOS', description: 'Photography', members: [] },
      { id: 'apollo', name: 'HOUSE APOLLO', description: 'Music', members: [] },
      { id: 'vulcan', name: 'HOUSE VULCAN', description: 'Fashion / Design', members: [] },
      { id: 'noctis', name: 'HOUSE NOCTIS', description: 'Experimental', members: [] }
    ];
  }

  async login(email, password) {
    // Mock authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          resolve({ 
            success: true, 
            user: { id: 'mock-user-1', email, house: 'solis' },
            token: 'mock-jwt-token'
          });
        } else {
          resolve({ success: false, error: 'Invalid credentials' });
        }
      }, 1000);
    });
  }

  async register(userData) {
    // Mock registration
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { id: 'mock-user-' + Date.now(), ...userData };
        this.mockUsers.push(newUser);
        resolve({ success: true, user: newUser });
      }, 1000);
    });
  }

  async createProfile(userId, profileData) {
    // Mock profile creation
    return new Promise((resolve) => {
      setTimeout(() => {
        const profile = { id: userId, ...profileData, createdAt: new Date() };
        this.mockProfiles.push(profile);
        resolve({ success: true, profile });
      }, 1000);
    });
  }

  async uploadMedia(fileData) {
    // Mock media upload
    return new Promise((resolve) => {
      setTimeout(() => {
        const media = { id: 'media-' + Date.now(), ...fileData };
        this.mockMedia.push(media);
        resolve({ success: true, media });
      }, 1000);
    });
  }

  async fetchHouseData() {
    // Mock house data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, houses: this.mockHouses });
      }, 500);
    });
  }

  async fetchProfiles(houseId = null) {
    // Mock profiles
    return new Promise((resolve) => {
      setTimeout(() => {
        let profiles = this.mockProfiles;
        if (houseId) {
          profiles = profiles.filter(p => p.house === houseId);
        }
        resolve({ success: true, profiles });
      }, 500);
    });
  }

  async fetchMedia(houseId = null) {
    // Mock media
    return new Promise((resolve) => {
      setTimeout(() => {
        let media = this.mockMedia;
        if (houseId) {
          media = media.filter(m => m.house === houseId);
        }
        resolve({ success: true, media });
      }, 500);
    });
  }
}

const firebaseService = new FirebaseService();

// API Routes

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await firebaseService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const userData = req.body;
    const result = await firebaseService.register(userData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Profile Routes
app.post('/api/profile', async (req, res) => {
  try {
    const { userId, profileData } = req.body;
    const result = await firebaseService.createProfile(userId, profileData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/profiles/:houseId?', async (req, res) => {
  try {
    const houseId = req.params.houseId;
    const result = await firebaseService.fetchProfiles(houseId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Media Routes
app.post('/api/media/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const fileData = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/${req.file.filename}`,
      uploadedAt: new Date()
    };

    const result = await firebaseService.uploadMedia(fileData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/media/:houseId?', async (req, res) => {
  try {
    const houseId = req.params.houseId;
    const result = await firebaseService.fetchMedia(houseId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/media/:mediaId', async (req, res) => {
  try {
    const mediaId = req.params.mediaId;
    // Mock deletion
    res.json({ success: true, deleted: mediaId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Houses Routes
app.get('/api/houses', async (req, res) => {
  try {
    const result = await firebaseService.fetchHouseData();
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Serve client app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, error: 'File too large' });
    }
  }
  res.status(500).json({ success: false, error: error.message });
});

// Start server (only for local development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`AURELION server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

// Export for Vercel serverless
module.exports = app;
