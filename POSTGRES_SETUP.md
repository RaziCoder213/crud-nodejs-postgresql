# ✅ Vercel Postgres Setup - Final Steps

## Your App is Deployed! 🎉

**Live URL:** https://crud-nodejs-postgresql.vercel.app

**GitHub Repo:** https://github.com/RaziCoder213/crud-nodejs-postgresql

## Add PostgreSQL Database (2 minutes)

The Vercel dashboard should be open in your browser. Follow these steps:

### Option 1: Add Vercel Postgres (Recommended - Easiest)

1. In your Vercel project dashboard, go to the **Storage** tab
2. Click **Create Database**
3. Select **Postgres**
4. Click **Continue**
5. Name it: `crud-postgres-db`
6. Select region: Choose closest to you (e.g., `Washington, D.C., USA` for US East)
7. Click **Create**
8. Once created, click **Connect Project**
9. Select your `crud-nodejs-postgresql` project
10. Click **Connect**

✅ **Done!** Vercel automatically adds the `DATABASE_URL` environment variable to your project.

### Option 2: Use Neon (Alternative)

If you prefer Neon PostgreSQL:

1. Go to https://neon.tech
2. Sign up/Login
3. Create a new project
4. Copy the connection string
5. In Vercel dashboard:
   - Go to **Settings** → **Environment Variables**
   - Add: `DATABASE_URL` = your Neon connection string
   - Make sure to add `?sslmode=require` at the end
   - Click **Save**

## Redeploy

After adding the database:

```bash
vercel --prod
```

Or in Vercel dashboard:
- Go to **Deployments** tab
- Click the three dots (...) on latest deployment
- Click **Redeploy**

## Test Your API

Once redeployed, test these endpoints:

```bash
# Health check
curl https://crud-nodejs-postgresql.vercel.app/api/healthchecker

# Get all blogs
curl https://crud-nodejs-postgresql.vercel.app/api/blogs

# Create a blog (POST)
curl -X POST https://crud-nodejs-postgresql.vercel.app/api/blogs \\
  -H "Content-Type: application/json" \\
  -d '{"title":"My First Blog","content":"Hello World"}'
```

## View Logs

```bash
vercel logs https://crud-nodejs-postgresql.vercel.app
```

## Need Help?

Check the deployment logs in Vercel dashboard:
- Go to your project
- Click **Deployments**
- Click on the latest deployment
- View the **Runtime Logs**
