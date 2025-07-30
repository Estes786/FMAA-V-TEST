# FMAA Dashboard v2.0.0

**Federated Micro-Agents Architecture Dashboard** - Empowering Analytics with Intelligent Micro-Agents

## 🚀 Deployment ke Vercel

### Struktur Project
```
/workspace
├── frontend/          # React + Vite
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example
├── backend/           # FastAPI + Python
│   ├── server.py
│   ├── requirements.txt
│   └── .env.example
├── api/              # Node.js API (opsional)
├── vercel.json       # Konfigurasi Vercel
└── README.md
```

### Langkah Deploy

#### 1. **Setup Environment Variables**
**Di Vercel Dashboard → Project Settings → Environment Variables, tambahkan:**

**Frontend Variables:**
```
VITE_API_URL=https://fmaa-v-test-1.vercel.app/api
VITE_HUGGINGFACE_URL=https://api-inference.huggingface.co
VITE_HUGGINGFACE_TOKEN=your-huggingface-token
VITE_SUPABASE_URL=https://xyz.supabase.co
VITE_SUPABASE_KEY=your-supabase-anon-key
VITE_APP_NAME=FMAA Dashboard
VITE_APP_VERSION=2.0.0
```

**Backend Variables:**
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

#### 2. **Deploy ke Vercel**
1. Push code ke GitHub/GitLab
2. Hubungkan repo ke Vercel
3. Set environment variables (lihat di atas)
4. Deploy

#### 3. **Test Deployment**
- **Frontend:** `https://fmaa-v-test-1.vercel.app/`
- **Backend API:** `https://fmaa-v-test-1.vercel.app/api/health`
- **API Docs:** `https://fmaa-v-test-1.vercel.app/api/docs`

### Konfigurasi Routing (vercel.json)
- **`/api/*`** → Backend FastAPI
- **`/*`** → Frontend React

### Integrasi Services
- **HuggingFace:** Untuk AI/ML inference
- **Supabase:** Untuk database dan auth
- **MongoDB:** Untuk data storage

### Troubleshooting
- **404 Frontend:** Cek routing di `vercel.json`
- **API Error:** Cek environment variables
- **Build Error:** Cek dependencies di `package.json`

---

**Made with ❤️ by FFMA Team**

*FFMA Dashboard v1 - Empowering Analytics with Intelligent Micro-Agents*