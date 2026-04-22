# AURELION Deployment & Testing Guide

## Quick Launch Instructions

### 1. Local Testing
```bash
# Navigate to project directory
cd windsurf-project

# Install dependencies
npm install

# Start development server
npm run dev

# Access application
http://localhost:3000
```

### 2. Production Deployment

#### Option A: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Follow prompts:
# - Link to existing project? No
# - What's your project's name? aurelion
# - In which directory is your code located? ./
# - Want to override the settings? No
```

#### Option B: Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy project
railway up
```

#### Option C: Render
```bash
# Push to GitHub repository
git add .
git commit -m "Deploy AURELION"
git push origin main

# Connect repository to Render
# 1. Go to dashboard.render.com
# 2. Click "New +"
# 3. Connect GitHub repository
# 4. Select "Web Service"
# 5. Build Command: npm install
# 6. Start Command: npm start
# 7. Click "Deploy"
```

#### Option D: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create aurelion-app

# Deploy
git push heroku main
```

## Testing Instructions

### 1. Access Testing
1. **Entry Screen**: Should display for 2 seconds, then transition
2. **Access Portal**: Enter code `AURELION2024`
3. **Success**: Should show success screen, then main app

### 2. Navigation Testing
4. **Desktop**: Test sidebar navigation (Home, Houses, Profile, Admin)
5. **Mobile**: Test bottom navigation bar
6. **Transitions**: Verify smooth view changes without page reloads

### 3. House System Testing
7. **Houses View**: Click on each house
8. **House Detail**: Verify dedicated pages load
9. **Members**: Check "UNREVEALED" status display
10. **Work Gallery**: Test modal functionality

### 4. Profile System Testing
11. **Profile Creation**: Complete all steps
12. **Skip Option**: Test "Skip for now" functionality
13. **Profile Banner**: Verify reminder appears when skipped
14. **Profile Display**: Check completed profile view

### 5. Admin System Testing
15. **Media Upload**: Test drag-and-drop and file selection
16. **File Validation**: Try uploading invalid files
17. **Media Grid**: Verify uploaded items display
18. **Delete Function**: Test media deletion

### 6. Responsive Testing
19. **Desktop**: Test at 1920x1080 resolution
20. **Tablet**: Test at 768x1024 resolution
21. **Mobile**: Test at 375x667 resolution

### 7. Visual Effects Testing
22. **Star Field**: Verify animated background
23. **Solar Halo**: Check rotating animation
24. **Shooting Stars**: Confirm periodic animations
25. **Custom Cursor**: Test hover effects
26. **Scroll Progress**: Verify progress bar

## Environment Configuration

### Development (.env)
```bash
NODE_ENV=development
PORT=3000
CORS_ORIGIN=http://localhost:3000
```

### Production (.env)
```bash
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://your-domain.com
FIREBASE_API_URL=https://your-project.firebaseio.com
FIREBASE_API_KEY=your-firebase-api-key
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Or use different port
PORT=3001 npm start
```

#### CORS Errors
- Verify `CORS_ORIGIN` matches your domain
- Check API base URL in `client/app.js`

#### File Upload Issues
- Ensure `public/uploads` directory exists
- Check file size limits (50MB max)
- Verify allowed file types

#### Navigation Not Working
- Check browser console for JavaScript errors
- Verify all views have correct CSS classes
- Test in different browsers

### Performance Issues

#### Slow Animations
- Reduce star count in `initializeStarField()`
- Disable custom cursor on mobile devices
- Optimize image sizes

#### Memory Issues
- Clear browser cache
- Restart development server
- Check for memory leaks in browser console

## Browser Compatibility Testing

### Required Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile Testing
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+

## Production Checklist

### Before Deployment
- [ ] All tests pass locally
- [ ] Environment variables configured
- [ ] No console errors
- [ ] Responsive design works
- [ ] File uploads functional
- [ ] Navigation smooth

### After Deployment
- [ ] Application loads at domain
- [ ] All API endpoints respond
- [ ] File uploads work in production
- [ ] Mobile navigation functions
- [ ] Performance acceptable (>90 Lighthouse score)
- [ ] No mixed content warnings

## Monitoring

### Performance Metrics
- **Load Time**: < 3 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1

### Error Tracking
- Monitor browser console
- Check server logs
- Track API response times
- Monitor upload failures

## Security Checklist

### Production Security
- [ ] HTTPS enforced
- [ ] Environment variables secured
- [ ] File upload restrictions active
- [ ] CORS properly configured
- [ ] No sensitive data in client code
- [ ] Input validation working
- [ ] Rate limiting considered

## Scaling Considerations

### Database Scaling
- Implement Firebase when user count > 1000
- Add pagination for media galleries
- Consider CDN for static assets

### Performance Scaling
- Enable gzip compression
- Implement caching headers
- Optimize images and videos
- Consider server-side rendering for SEO

## Support

### Deployment Issues
1. Check environment variables
2. Verify server logs
3. Test API endpoints individually
4. Validate file permissions

### Feature Requests
1. Document expected behavior
2. Provide browser/OS details
3. Include error screenshots
4. Test in multiple browsers

---

**AURELION** - Precision. Discipline. Execution.
