# Development Setup Guide

## Prerequisites

- Node.js v16 or higher
- npm (comes with Node.js)
- Git
- Code editor (VS Code recommended)

## Installation Steps

### 1. Clone the Repository (if from GitHub)
```bash
git clone <repository-url>
cd support_crm_system
```

### 2. Install All Dependencies
```bash
npm run install:all
```

This command installs dependencies for:
- Root project
- Server (Express + SQLite)
- Client (React + Vite)

### 3. Set Up Environment Variables

**Backend (.env)**
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
DB_PATH=./database.db
```

**Frontend (.env.local)**
```bash
cd ../client
cp .env.example .env.local
```

Edit `client/.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Development Servers

**Option A: Two Terminal Windows**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

**Option B: Using npm concurrently (optional setup)**

Install concurrently:
```bash
npm install -g concurrently
```

Then run:
```bash
concurrently "npm run dev:server" "npm run dev:client"
```

### 5. Open Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- API Health Check: http://localhost:5000/api/health

## Available Commands

### Backend Commands
```bash
cd server

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start

# Install dependencies
npm install

# View installed packages
npm list
```

### Frontend Commands
```bash
cd client

# Development mode
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Install dependencies
npm install
```

## File Structure Reference

```
support_crm_system/
│
├── server/                      # Backend Application
│   ├── src/
│   │   ├── index.js            # Server entry point
│   │   ├── db/
│   │   │   └── database.js     # Database setup
│   │   ├── routes/
│   │   │   └── tickets.js      # API routes
│   │   └── middleware/
│   │       └── errorHandler.js # Error middleware
│   ├── package.json
│   ├── .env.example
│   ├── .env                     # Local configuration (git-ignored)
│   └── database.db              # SQLite database (created on first run)
│
├── client/                      # Frontend Application
│   ├── src/
│   │   ├── main.jsx            # React entry point
│   │   ├── App.jsx             # Main component
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   └── styles/             # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   ├── .env.example
│   └── .env.local               # Local configuration (git-ignored)
│
├── package.json                 # Root package.json
├── README.md                    # Project documentation
└── DEPLOYMENT.md               # Deployment instructions
```

## Database

### Initial Setup
- Database automatically initializes on first run
- Creates `tickets` and `notes` tables
- Stored in `server/database.db`

### Reset Database
```bash
# Stop the server
# Delete database.db in server folder
# Restart the server
```

### View Database (Optional Tools)
- SQLite Studio: https://www.sqlitestudio.pl/
- DB Browser for SQLite: https://sqlitebrowser.org/

## Troubleshooting

### Port Already in Use
```bash
# Change port in .env
PORT=5001

# Or kill process using port
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### Node Modules Issues
```bash
# Clear all node_modules and reinstall
rm -rf node_modules server/node_modules client/node_modules
npm run install:all
```

### Database Issues
```bash
# Reset database
cd server
rm database.db
npm run dev
```

### Frontend Won't Connect to Backend
- Ensure backend is running on port 5000
- Check firewall settings
- Verify VITE_API_URL in client/.env.local

## Testing Workflow

1. **Create a Ticket**
   - Go to "New Ticket"
   - Fill in all required fields
   - Click "Create Ticket"
   - Verify success message

2. **List Tickets**
   - Go to "All Tickets"
   - Should see your newly created ticket

3. **Search**
   - Type in search box
   - Results should filter in real-time

4. **Filter**
   - Select a status from dropdown
   - List should update

5. **View Details**
   - Click on a ticket
   - Should see full details

6. **Update Ticket**
   - Change status
   - Add a note
   - Click "Update Ticket"
   - Verify changes saved

## VS Code Extensions (Recommended)

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- SQLite
- REST Client (for testing API)

## Git Workflow

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Support CRM System"

# Create GitHub repo and push
git remote add origin <your-repo-url>
git push -u origin main
```

## Performance Tips

- Frontend will hot-reload on file changes during development
- Backend will restart with nodemon on file changes
- Browser DevTools for frontend debugging
- Backend console logs visible in terminal

## Next Steps

1. Test all features locally
2. Push to GitHub
3. Deploy to production (see DEPLOYMENT.md)
4. Create demo video
5. Submit assignment

Good luck! 🚀
