# Support CRM System - Master Folder Structure

All files and folders for the Support CRM System project.

## Root Level
```
support_crm_system/
├── server/                 # Backend Node.js/Express application
├── client/                 # Frontend React/Vite application
├── package.json           # Root package.json (optional, for convenience scripts)
├── README.md              # Main project documentation
├── SETUP.md               # Local development setup guide
└── DEPLOYMENT.md          # Production deployment guide
```

## Server Structure
```
server/
├── src/
│   ├── index.js                      # Express server entry point
│   ├── db/
│   │   └── database.js              # SQLite database setup & queries
│   ├── routes/
│   │   └── tickets.js               # Ticket API endpoints
│   └── middleware/
│       └── errorHandler.js          # Error handling middleware
├── database.db                      # SQLite database (created at runtime)
├── package.json
├── .env.example                     # Environment variables template
├── .env                            # Local environment variables (git-ignored)
├── .gitignore
└── node_modules/                   # Dependencies (git-ignored)
```

## Client Structure
```
client/
├── src/
│   ├── main.jsx                     # React entry point
│   ├── App.jsx                      # Main App component
│   ├── components/
│   │   ├── Header.jsx              # Page header component
│   │   ├── Navigation.jsx          # Navigation bar
│   │   └── TicketCard.jsx          # Reusable ticket card
│   ├── pages/
│   │   ├── TicketListPage.jsx      # View all tickets
│   │   ├── CreateTicketPage.jsx    # Create new ticket
│   │   └── TicketDetailPage.jsx    # View & update ticket
│   └── styles/
│       └── index.css               # Global styles
├── public/                         # Static assets
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── package.json
├── .env.example                    # Environment variables template
├── .env.local                      # Local environment variables (git-ignored)
├── .gitignore
├── node_modules/                   # Dependencies (git-ignored)
└── dist/                          # Production build (git-ignored)
```

## Key Files Explained

### Backend
- **index.js**: Express server setup, middleware, routes initialization
- **database.js**: SQLite connection, table creation, query helpers
- **tickets.js**: REST API endpoints for all ticket operations
- **errorHandler.js**: Global error handling middleware

### Frontend
- **App.jsx**: Main component managing navigation and state
- **pages/***: Full page components for different views
- **components/***: Reusable UI components
- **index.css**: Global Tailwind CSS and custom styles

### Configuration
- **.env files**: Store sensitive configuration (ports, URLs, paths)
- **.gitignore**: Prevent committing node_modules, .env, database
- **package.json**: Project dependencies and scripts
- **vite.config.js**: Frontend build tool configuration
- **tailwind.config.js**: CSS framework configuration

## Environment Files

### .env.example files
- Committed to git
- Shows required environment variables
- Template for developers
- No sensitive data

### .env / .env.local files
- Git-ignored (in .gitignore)
- Local machine only
- Contains actual credentials/URLs
- Not shared in repository

## Installation & Setup

See **SETUP.md** for detailed local development setup.

Quick start:
```bash
npm run install:all    # Install all dependencies
cd server && npm run dev    # Start backend
cd ../client && npm run dev  # Start frontend (in new terminal)
```

## Database

**Tables:**
1. `tickets` - Main ticket data
2. `notes` - Comments/notes on tickets

**File:** `server/database.db` (SQLite)

Auto-created on first server run.

## Deployment

See **DEPLOYMENT.md** for:
- Railway.app + Vercel setup
- Render.com deployment
- Docker deployment
- Post-deployment checklist

## Git Ignored Files

```
node_modules/          # Dependencies
.env                   # Sensitive data
*.db                   # Database
dist/                  # Production build
.DS_Store             # Mac files
```

## Technologies Used

- **Backend**: Node.js, Express, SQLite3
- **Frontend**: React 18, Vite, Tailwind CSS
- **HTTP**: REST API, CORS, Axios
- **Database**: SQLite with proper relationships
- **Styling**: Tailwind CSS utility-first approach
- **Build Tools**: Vite, npm

## API Base URL

Development: `http://localhost:5000/api`
Production: `https://your-backend-domain/api`

## Frontend URL

Development: `http://localhost:5173`
Production: `https://your-frontend-domain`

---

For detailed setup instructions, see SETUP.md
For deployment instructions, see DEPLOYMENT.md
For API documentation, see README.md
