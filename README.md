# AURELION

A selective creative entity that observes and recognizes creatives based on precision, discipline, and execution.

## Architecture

This is a cloud-deployable web application with the following structure:

```
├── client/                 # Frontend application
│   ├── index.html         # Main HTML file
│   ├── styles.css         # Complete styling
│   └── app.js            # Single-page application logic
├── server/                # Node.js Express backend
│   └── index.js          # API server with mock endpoints
├── services/              # Service layer
│   └── FirebaseService.js # Firebase integration placeholder
├── public/               # Static assets
│   └── uploads/          # Media uploads
├── package.json          # Dependencies and scripts
└── .env.example         # Environment variables template
```

## Features

### Core System
- **Single-Page Application**: Smooth transitions between views without page reloads
- **State Management**: Internal state tracking for user sessions and navigation
- **Responsive Design**: Mobile-optimized with bottom navigation, desktop sidebar
- **Premium Branding**: Matte gold aesthetic with deep black base

### Access System
- **Recognition Portal**: Code-based access (`AURELION2024`)
- **Mock Authentication**: Ready for Firebase integration
- **Session Management**: Persistent user sessions

### House System
- **Five Houses**: SOLIS, HELIOS, APOLLO, VULCAN, NOCTIS
- **Dedicated Views**: Each house has its own detailed page
- **Member Management**: House member display and organization
- **Work Gallery**: Portfolio showcase for each house

### Profile System
- **Step-based Creation**: Identity → House Selection → Social Links
- **Skip Option**: Users can defer profile completion
- **Profile Banner**: Persistent reminder for incomplete profiles
- **Dynamic Templates**: Different layouts based on house affiliation

### Admin System
- **Media Management**: Drag-and-drop upload interface
- **File Organization**: Grid-based media preview
- **Upload Validation**: File type and size restrictions
- **Mock Backend**: Simulated upload and management

## Deployment

### Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start
```

### Environment Setup
1. Copy `.env.example` to `.env`
2. Replace placeholder values with actual Firebase credentials
3. Configure CORS origin for your domain

### Cloud Deployment
The application is designed for deployment on:
- **Vercel**: Connect repository and deploy automatically
- **Railway**: Deploy as Node.js service
- **Render**: Deploy as web service
- **Heroku**: Deploy as Node.js app

### GitHub Pages
For static deployment:
1. Build the client files
2. Deploy `client/` directory to GitHub Pages
3. Update API base URL in `client/app.js`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration

### Profiles
- `POST /api/profile` - Create user profile
- `GET /api/profiles/:houseId` - Fetch profiles by house

### Media
- `POST /api/media/upload` - Upload media files
- `GET /api/media/:houseId` - Fetch media by house
- `DELETE /api/media/:mediaId` - Delete media

### Houses
- `GET /api/houses` - Fetch all houses

## Integration Points

### Firebase Integration
Replace mock implementations in:
- `services/FirebaseService.js` - Complete Firebase service
- `server/index.js` - Real Firebase authentication
- Environment variables in `.env`

### Database Schema
```javascript
// Users Collection
{
  id: string,
  email: string,
  name: string,
  house: string,
  createdAt: timestamp,
  profileComplete: boolean
}

// Profiles Collection
{
  userId: string,
  name: string,
  bio: string,
  house: string,
  socialLinks: object,
  createdAt: timestamp
}

// Media Collection
{
  id: string,
  userId: string,
  house: string,
  filename: string,
  originalName: string,
  mimetype: string,
  size: number,
  url: string,
  uploadedAt: timestamp
}
```

## Development

### Local Development
```bash
# Install dependencies
npm install

# Start with nodemon for auto-restart
npm run dev

# Access application
http://localhost:3000
```

### Code Structure
- **Modular Design**: Separate concerns for scalability
- **Mock First**: All functionality works without real backend
- **Progressive Enhancement**: Easy to replace mocks with real services
- **Environment Variables**: No hardcoded credentials

### Styling
- **CSS Custom Properties**: Consistent theming
- **Responsive Grid**: Mobile-first approach
- **Smooth Animations**: Hardware-accelerated transitions
- **Premium Aesthetics**: Matte gold with cinematic effects

## Performance

### Optimizations
- **Lazy Loading**: Content loaded on demand
- **Efficient Animations**: CSS transforms and opacity
- **Minimal Dependencies**: Lightweight core dependencies
- **Image Optimization**: WebP support and lazy loading

### Monitoring
- **Analytics Ready**: Firebase Analytics integration point
- **Error Tracking**: Centralized error handling
- **Performance Metrics**: Load time and interaction tracking

## Security

### Current Implementation
- **Input Validation**: Sanitization and validation
- **File Upload Security**: Type and size restrictions
- **CORS Configuration**: Proper cross-origin setup

### Production Requirements
- **HTTPS Enforcement**: Secure connections only
- **Firebase Security Rules**: Database access controls
- **Environment Variables**: No exposed credentials

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile Support**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement**: Core functionality works everywhere

## License

MIT License - See LICENSE file for details.

## Support

For deployment issues or feature requests:
1. Check environment configuration
2. Verify API endpoint accessibility
3. Review browser console for errors
4. Ensure proper Firebase integration when enabled

---

*AURELION observes.*
