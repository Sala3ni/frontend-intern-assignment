# GitHub Repository Setup - role-based-frontend-app

## Step 1: Create GitHub Repo

1. Go to: https://github.com/new
2. Repository name: `role-based-frontend-app`
3. Description: `Full-stack task management system with JWT authentication and role-based access control`
4. Public/Private: Choose
5. DON'T initialize with README (we already have one)
6. Click "Create repository"

---

## Step 2: Push Code to GitHub

Open terminal in: `d:\Desktop\backend`

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Complete task management system with backend and frontend"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/role-based-frontend-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 3: Verify

Go to: `https://github.com/YOUR_USERNAME/role-based-frontend-app`

You should see:
```
role-based-frontend-app/
├── backend-api/
├── frontend-ui/
├── README.md
├── SCALABILITY.md
├── ARCHITECTURE_DIAGRAMS.md
└── ... (all other files)
```

---

## Step 4: Deploy on Vercel

### Backend:
1. Go to https://vercel.com
2. Import `role-based-frontend-app` repo
3. Root Directory: `backend-api`
4. Add environment variables
5. Deploy

### Frontend:
1. Import same repo again
2. Root Directory: `frontend-ui`
3. Add environment variable: `REACT_APP_API_URL`
4. Deploy

---

## Quick Commands (Copy-Paste)

```bash
cd d:\Desktop\backend
git init
git add .
git commit -m "Initial commit: Complete task management system"
git remote add origin https://github.com/YOUR_USERNAME/role-based-frontend-app.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username!

---

## If Git Not Installed

Download: https://git-scm.com/download/win

Then run above commands.

---

🚀 Done! Your code will be on GitHub!
