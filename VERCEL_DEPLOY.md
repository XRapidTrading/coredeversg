# Deploy to Vercel

Vercel is often simpler than Netlify for custom domains.

## Steps

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub

2. Click **"Add New Project"**

3. **Import** your GitHub repository

4. Vercel will auto-detect settings, but verify:
   - **Framework Preset:** Other
   - **Build Command:** (leave as detected)
   - **Output Directory:** `dist`

5. Click **"Deploy"**

## Add Custom Domain

1. Once deployed, go to your project dashboard

2. Click **"Settings"** → **"Domains"**

3. Add your custom domain

4. Follow Vercel's DNS instructions (usually just add an A record or CNAME)

5. Done! Vercel handles SSL automatically.

## Why Vercel?

- Simpler custom domain setup
- Automatic SSL certificates
- Better build error handling
- Free for personal projects
