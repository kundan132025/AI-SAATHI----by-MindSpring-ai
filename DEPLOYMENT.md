# AI Saathi Backend Deployment

## Render Deployment Instructions

### 1. Prerequisites
- MongoDB Atlas database
- Google Cloud Platform account with APIs enabled
- Environment variables ready

### 2. Deploy to Render

1. **Connect GitHub Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select repository: `AI-SAATHI----by-MindSpring-ai`

2. **Configure Service**
   - **Name**: `ai-saathi-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Environment Variables**
   Add these in Render dashboard:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_API_KEY=your_google_api_key
   GEMINI_API_KEY=your_gemini_api_key
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://your-service.onrender.com`

### 3. Update Frontend
Update `Frontend/src/utils/axios.js`:
```javascript
const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://your-render-service.onrender.com/api'
  : 'http://localhost:5000/api';
```

### 4. Environment Variables Needed

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret for JWT tokens | `your-super-secret-key` |
| `GOOGLE_API_KEY` | Google Cloud API key | `AIza...` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` |
| `GOOGLE_CLIENT_ID` | OAuth client ID | `123...apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | OAuth client secret | `GOCSPX-...` |
| `FRONTEND_URL` | Vercel frontend URL | `https://app.vercel.app` |

### 5. Testing
- Health check: `GET https://your-service.onrender.com/`
- API test: `GET https://your-service.onrender.com/api/health`