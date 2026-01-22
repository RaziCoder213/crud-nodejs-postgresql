# Vercel Deployment Guide

## Prerequisites
- Vercel account
- PostgreSQL database (e.g., Neon, Supabase, or Vercel Postgres)

## Deployment Steps

### 1. Set up your database
Make sure you have a PostgreSQL database URL ready. You can use:
- [Neon](https://neon.tech) (Free tier available)
- [Supabase](https://supabase.com) (Free tier available)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (Free tier available)

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Deploy
vercel

# Follow the prompts
```

#### Option B: Using Vercel Dashboard
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure environment variables (see below)
6. Click "Deploy"

### 3. Configure Environment Variables

Add these environment variables in your Vercel project settings:

- `DATABASE_URL`: Your PostgreSQL connection string
  - Format: `postgresql://username:password@host:port/database?sslmode=require`
  - Example: `postgresql://user:pass@ep-cool-name.us-east-2.aws.neon.tech/mydb?sslmode=require`
  
- `NODE_ENV`: Set to `production`

**Important:** Make sure your database connection string includes `?sslmode=require` at the end for secure connections.

### 4. Test Your Deployment

Once deployed, test these endpoints:
- `https://your-app.vercel.app/` - Should return "API is running"
- `https://your-app.vercel.app/api/healthchecker` - Should return health check JSON
- `https://your-app.vercel.app/api/blogs` - Your blog endpoints

## Local Development

```bash
# Install dependencies
npm install

# Create .env file with your local database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
NODE_ENV="development"
PORT="8081"

# Run in development mode
npm run dev
```

## Troubleshooting

### 404 Errors
- Make sure `vercel.json` exists in the root directory
- Verify all routes are properly configured
- Check Vercel deployment logs for errors

### Database Connection Issues
- Ensure DATABASE_URL is set in Vercel environment variables
- Make sure SSL mode is enabled (`?sslmode=require`)
- Check if your database allows connections from Vercel IPs

### Build Errors
- Run `npm run build` locally to check for TypeScript errors
- Make sure all dependencies are in `dependencies`, not `devDependencies`
