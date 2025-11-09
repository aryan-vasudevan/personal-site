# Deployment Guide

## Railway Deployment (Recommended)

### Prerequisites
- GitHub account
- Railway account ([railway.app](https://railway.app))
- Push your code to GitHub

### Step-by-Step Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Create Railway Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Environment Variables**
   In Railway dashboard, add these variables:
   ```
   NODE_ENV=production
   BASE_URL=https://your-app-name.up.railway.app
   ```

4. **Deploy**
   - Railway will automatically detect your project
   - Build command: `npm run build`
   - Start command: `npm start`
   - It will auto-deploy!

5. **Get Your URL**
   - Railway will provide a URL like: `https://your-app-name.up.railway.app`
   - Copy this URL

6. **Update BASE_URL**
   - In Railway settings, update `BASE_URL` to your actual Railway URL
   - Redeploy if needed

### For Frontend-Only Deployment (Vercel)

If you want to deploy frontend separately:

1. **Deploy Frontend to Vercel**
   ```bash
   cd client
   npx vercel
   ```

2. **Set Environment Variable**
   ```bash
   vercel env add VITE_API_URL
   # Enter your Railway backend URL
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

## Environment Variables

### Backend (.env in server/)
```env
PORT=3001
BASE_URL=https://your-backend-url.railway.app
NODE_ENV=production
```

### Frontend (.env in client/)
```env
VITE_API_URL=https://your-backend-url.railway.app
```

## Troubleshooting

### Images not loading
- Check BASE_URL in Railway is correct
- Ensure `/server/public` folder is included in deployment

### API calls failing
- Verify VITE_API_URL is set correctly
- Check CORS settings in server.js
- Ensure Railway backend is running

### Build fails
- Check build logs in Railway
- Verify all dependencies are in package.json
- Ensure Node version compatibility

## Post-Deployment Checklist

- [ ] Test all pages (gallery, projects, experience)
- [ ] Verify images load correctly
- [ ] Check dark mode toggle works
- [ ] Test on mobile devices
- [ ] Verify snowflakes appear in dark mode (desktop only)
- [ ] Test modal gallery functionality
