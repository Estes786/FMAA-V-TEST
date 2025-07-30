# 🚀 FMAA Dashboard - Deployment Guide

## 📋 Prerequisites
- GitHub/GitLab repository
- Vercel account
- MongoDB database (optional)
- HuggingFace account (optional)
- Supabase account (optional)

## 🛠️ Step-by-Step Deployment

### 1. **Setup Repository**
```bash
# Clone repository (jika belum)
git clone https://github.com/Estes786/FMAA-V-TEST.git
cd FMAA-V-TEST

# Pastikan struktur folder benar
ls -la
# Harus ada: frontend/, backend/, vercel.json
```

### 2. **Setup Environment Variables di Vercel**

**Buka Vercel Dashboard → Project Settings → Environment Variables**

#### **Frontend Variables (VITE_*):**
```
VITE_API_URL=https://fmaa-v-test-1.vercel.app/api
VITE_HUGGINGFACE_URL=https://api-inference.huggingface.co
VITE_HUGGINGFACE_TOKEN=your-huggingface-token
VITE_SUPABASE_URL=https://xyz.supabase.co
VITE_SUPABASE_KEY=your-supabase-anon-key
VITE_APP_NAME=FMAA Dashboard
VITE_APP_VERSION=2.0.0
```

#### **Backend Variables:**
```
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/fmaa_dashboard
HUGGINGFACE_URL=https://api-inference.huggingface.co
HUGGINGFACE_TOKEN=your-huggingface-token
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_KEY=your-supabase-service-key
APP_NAME=FMAA Dashboard API
APP_VERSION=2.0.0
DEBUG=false
```

### 3. **Deploy ke Vercel**

#### **Option A: Via Vercel Dashboard**
1. Buka [vercel.com](https://vercel.com)
2. Klik "New Project"
3. Import repository dari GitHub/GitLab
4. Set environment variables (lihat step 2)
5. Klik "Deploy"

#### **Option B: Via Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel --prod
```

### 4. **Verify Deployment**

#### **Test Frontend:**
```bash
curl https://fmaa-v-test-1.vercel.app/
# Harus return HTML, bukan 404
```

#### **Test Backend API:**
```bash
curl https://fmaa-v-test-1.vercel.app/api/health
# Harus return: {"status":"healthy","service":"fmaa-dashboard-api",...}
```

#### **Test API Documentation:**
```bash
curl https://fmaa-v-test-1.vercel.app/api/docs
# Harus return Swagger UI
```

### 5. **Troubleshooting**

#### **Frontend 404:**
- Cek `vercel.json` routing
- Pastikan `distDir: "dist"` (bukan `"frontend/dist"`)
- Cek build log di Vercel

#### **Backend API Error:**
- Cek environment variables
- Cek MongoDB connection
- Cek FastAPI logs di Vercel

#### **Build Error:**
- Cek `package.json` dependencies
- Cek `requirements.txt` (Python)
- Cek Node.js version compatibility

### 6. **Environment Variables Reference**

#### **Required for Frontend:**
- `VITE_API_URL` - Backend API URL
- `VITE_HUGGINGFACE_URL` - HuggingFace API URL
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_KEY` - Supabase anon key

#### **Required for Backend:**
- `MONGO_URL` - MongoDB connection string
- `HUGGINGFACE_URL` - HuggingFace API URL
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_KEY` - Supabase service key

#### **Optional:**
- `VITE_HUGGINGFACE_TOKEN` - HuggingFace API token
- `HUGGINGFACE_TOKEN` - Backend HuggingFace token
- `DEBUG` - Enable debug mode (true/false)

### 7. **Post-Deployment Checklist**

- [ ] Frontend accessible at root URL
- [ ] Backend API responding at `/api/health`
- [ ] Environment variables set correctly
- [ ] No console errors in browser
- [ ] API documentation accessible
- [ ] CORS working properly
- [ ] Database connection stable

### 8. **Monitoring & Maintenance**

#### **Vercel Analytics:**
- Monitor performance di Vercel Dashboard
- Check function execution times
- Monitor error rates

#### **Logs:**
- Check Vercel function logs
- Monitor API response times
- Track database connection issues

## 🎯 Quick Commands

```bash
# Test deployment
curl https://fmaa-v-test-1.vercel.app/api/health

# Check frontend
curl https://fmaa-v-test-1.vercel.app/

# View logs
vercel logs

# Redeploy
vercel --prod
```

## 📞 Support

Jika ada masalah:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Check browser console for errors

---

**Deployment selesai! 🚀**