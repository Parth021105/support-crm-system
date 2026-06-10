# Support CRM System

A full-stack web application for managing customer support tickets. Built with Node.js, Express, SQLite, React, and Tailwind CSS.

## Features

✅ **Create Tickets** - Submit new support tickets with customer info and issue details
✅ **List Tickets** - View all tickets in a clean, organized list
✅ **Search Functionality** - Search tickets by customer name, email, ID, or subject
✅ **Filter by Status** - Filter tickets by Open, In Progress, or Closed
✅ **View & Update Tickets** - View detailed ticket info and update status with notes
✅ **Add Notes** - Add notes/comments to tickets for team collaboration
✅ **Responsive Design** - Mobile-friendly interface with Tailwind CSS

## Tech Stack

- **Backend**: Node.js, Express.js, SQLite
- **Frontend**: React, Vite, Tailwind CSS
- **Styling**: Tailwind CSS
- **API**: RESTful API with proper error handling
- **Database**: SQLite with proper schema and relationships

## Project Structure

```
support_crm_system/
├── server/
│   ├── src/
│   │   ├── index.js              # Main server file
│   │   ├── db/
│   │   │   └── database.js       # Database initialization and queries
│   │   ├── routes/
│   │   │   └── tickets.js        # API endpoints for tickets
│   │   └── middleware/
│   │       └── errorHandler.js   # Error handling middleware
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── client/
│   ├── src/
│   │   ├── main.jsx              # React entry point
│   │   ├── App.jsx               # Main App component
│   │   ├── components/
│   │   │   ├── Header.jsx        # Page header
│   │   │   ├── Navigation.jsx    # Navigation bar
│   │   │   └── TicketCard.jsx    # Ticket card component
│   │   ├── pages/
│   │   │   ├── TicketListPage.jsx    # Tickets list view
│   │   │   ├── CreateTicketPage.jsx  # Create ticket form
│   │   │   └── TicketDetailPage.jsx  # Ticket detail & update
│   │   └── styles/
│   │       └── index.css         # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .gitignore
│
└── README.md

```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

   The server will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

4. Open your browser and visit `http://localhost:5173`

## API Documentation

### Base URL
`http://localhost:5000/api`

### Endpoints

#### 1. Create Ticket
- **POST** `/tickets`
- **Body**:
  ```json
  {
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "subject": "Unable to login",
    "description": "I can't access my account"
  }
  ```
- **Response**: 
  ```json
  {
    "ticket_id": "TKT-ABC123",
    "created_at": "2024-01-15T10:30:00Z",
    "message": "Ticket created successfully"
  }
  ```

#### 2. List Tickets
- **GET** `/tickets?status=Open&search=john`
- **Query Parameters**:
  - `status` (optional): Filter by 'Open', 'In Progress', 'Closed'
  - `search` (optional): Search across name, email, ID, subject
- **Response**: Array of ticket objects

#### 3. Get Ticket Details
- **GET** `/tickets/{ticket_id}`
- **Response**:
  ```json
  {
    "id": 1,
    "ticket_id": "TKT-ABC123",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "subject": "Unable to login",
    "description": "I can't access my account",
    "status": "Open",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z",
    "notes": [
      {
        "id": 1,
        "note_text": "Investigating the issue",
        "created_at": "2024-01-15T11:00:00Z"
      }
    ]
  }
  ```

#### 4. Update Ticket
- **PUT** `/tickets/{ticket_id}`
- **Body** (both optional):
  ```json
  {
    "status": "In Progress",
    "notes": "Working on resolving this issue"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "updated_at": "2024-01-15T11:00:00Z"
  }
  ```

#### 5. Delete Ticket (Bonus)
- **DELETE** `/tickets/{ticket_id}`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Ticket deleted successfully"
  }
  ```

## Database Schema

### Tickets Table
```sql
CREATE TABLE tickets (
  id INTEGER PRIMARY KEY,
  ticket_id TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'Open',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Notes Table
```sql
CREATE TABLE notes (
  id INTEGER PRIMARY KEY,
  ticket_id TEXT NOT NULL,
  note_text TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ticket_id) REFERENCES tickets(ticket_id)
)
```

## Available Scripts

### Backend
- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Environment Variables

### Server (.env)
```
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
DB_PATH=./database.db
```

## Features Implemented

1. ✅ Create support tickets with customer information
2. ✅ List all tickets with pagination
3. ✅ Real-time search functionality
4. ✅ Filter tickets by status
5. ✅ View detailed ticket information
6. ✅ Update ticket status
7. ✅ Add notes/comments to tickets
8. ✅ Responsive mobile-friendly UI
9. ✅ Error handling and validation
10. ✅ Beautiful UI with Tailwind CSS

## Deployment

### Deploy Backend to Railway.app

1. Create account on [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Create a new project and select from GitHub
4. Set environment variables in Railway dashboard:
   - `PORT`: 5000
   - `NODE_ENV`: production
   - `CLIENT_URL`: your frontend URL

5. Deploy!

### Deploy Frontend to Vercel

1. Create account on [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Select the `client` folder as root directory
4. Add environment variable:
   - `VITE_API_URL`: your backend API URL

5. Deploy!

## Testing the Application

1. Go to "New Ticket" page
2. Fill in customer information and issue details
3. Click "Create Ticket"
4. Go back to "All Tickets" to see your ticket
5. Use the search box to find tickets
6. Filter by status
7. Click on a ticket to view details
8. Update status and add notes

## Troubleshooting

### Backend won't start
- Ensure Node.js v16+ is installed
- Check if port 5000 is available
- Delete `database.db` to reset the database

### Frontend won't connect to backend
- Ensure backend is running on http://localhost:5000
- Check `VITE_API_URL` environment variable
- Verify CORS is enabled in backend

### Database errors
- Delete `database.db` file to reset
- Ensure write permissions in the server directory

## Future Enhancements

- User authentication and roles
- Email notifications
- Advanced search filters
- Ticket priority levels
- SLA tracking
- Integration with third-party services
- Analytics dashboard
- Bulk operations

## License

MIT

## Support

For issues or questions, please create a GitHub issue or contact support.
