# Support CRM System - Deployment Guide

## Deploying to Production

### Option 1: Deploy Backend to Railway.app + Frontend to Vercel

#### Backend Deployment (Railway.app)

1. **Create Railway Account**
   - Go to [Railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository
   - Select the project repository

3. **Configure Railway**
   - Add environment variables:
     ```
     PORT=5000
     NODE_ENV=production
     CLIENT_URL=your-vercel-frontend-url.vercel.app
     DB_PATH=./database.db
     ```
   - Railway will automatically detect Node.js and start with `npm start`

4. **Get Backend URL**
   - Copy the public URL from Railway dashboard
   - Format: `https://your-project.up.railway.app`

#### Frontend Deployment (Vercel)

1. **Create Vercel Account**
   - Go to [Vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy Frontend**
   - Click "New Project"
   - Select your GitHub repository
   - Configure project:
     - Root Directory: `client`
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Set Environment Variables**
   - Add in Vercel dashboard:
     ```
     VITE_API_URL=https://your-backend-url
     ```

4. **Deploy**
   - Click Deploy
   - Wait for build to complete

### Option 2: Deploy to Render.com (Both Backend & Frontend)

#### Backend to Render

1. Create new Web Service on Render
2. Connect GitHub repository
3. Settings:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Environment variables as above

#### Frontend to Render

1. Create new Static Site on Render
2. Settings:
   - Build Command: `cd client && npm run build`
   - Publish Directory: `client/dist`

### Option 3: Docker Deployment (Any Platform)

1. **Create Dockerfile** at root level:
   ```dockerfile
   FROM node:18
   WORKDIR /app
   
   # Install dependencies
   COPY package*.json ./
   RUN npm install
   COPY server/package*.json ./server/
   RUN cd server && npm install
   
   # Build frontend
   COPY client ./client
   RUN cd client && npm run build
   
   # Copy server
   COPY server ./server
   
   EXPOSE 5000
   CMD ["node", "server/src/index.js"]
   ```

2. Deploy to Docker-compatible service (Railway, Render, etc.)

## Post-Deployment Checklist

- [ ] Backend API is responding
- [ ] Frontend loads without errors
- [ ] Can create a ticket
- [ ] Can view ticket list
- [ ] Search functionality works
- [ ] Filter by status works
- [ ] Can update ticket status
- [ ] Can add notes to tickets
- [ ] Database persists data
- [ ] No CORS errors
- [ ] Mobile responsive

## Monitoring & Maintenance

- Monitor backend logs in deployment platform
- Check database size periodically
- Set up email alerts for errors
- Regular backups of database (if applicable)
- Update dependencies periodically

## Common Deployment Issues

### CORS Errors
- Update `CLIENT_URL` env variable on backend
- Ensure frontend URL is correct

### Database Errors
- Check write permissions
- Ensure sufficient disk space
- Verify database path is correct

### API Connection Failures
- Verify backend URL in frontend env variables
- Check network connectivity
- Ensure both services are running

## Performance Optimization

1. Enable gzip compression on backend
2. Minify CSS and JavaScript
3. Use CDN for static assets
4. Add caching headers
5. Optimize database queries with indexes
6. Use pagination for large datasets

## Security Considerations

1. ✅ Input validation on all endpoints
2. ✅ CORS properly configured
3. ✅ Environment variables for sensitive data
4. ⚠️ Consider adding rate limiting
5. ⚠️ Add authentication (optional for MVP)
6. ⚠️ Use HTTPS (enforced by deployment platforms)
