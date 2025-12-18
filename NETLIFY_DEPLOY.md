# Deploying to Netlify

Your website is now ready for Netlify! Here's how to deploy it:

## Option 1: Drag & Drop (Easiest)

1. Build your project locally:
   ```bash
   npm install
   npm run build
   ```

2. Go to [Netlify Drop](https://app.netlify.com/drop)

3. Drag the `dist` folder into the drop zone

4. Done! Your site is live!

## Option 2: GitHub/Git (Recommended)

1. Push your code to GitHub

2. Go to [Netlify](https://app.netlify.com)

3. Click "Add new site" → "Import an existing project"

4. Connect to your GitHub repository

5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

6. Click "Deploy site"

## Environment Variables

If you need environment variables, add them in Netlify dashboard:
- Go to Site settings → Environment variables
- Add your variables (like `VITE_SUPABASE_URL`, etc.)

## Custom Domain

1. Go to Site settings → Domain management
2. Add your custom domain
3. Follow Netlify's DNS instructions

That's it! Your TradingCore website will be live on Netlify.
