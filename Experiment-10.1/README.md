# Todo Application with CRUD Operations

A modern, minimalist full-stack todo application built with React, Node.js, Express, and MongoDB.

## Features

- ✅ Create new todo items
- 📋 View all todos
- ✏️ Edit existing todos
- ✓ Mark todos as complete/incomplete
- 🗑️ Delete todos
- 📊 Track completion statistics
- 🎨 Beautiful, responsive UI

## Tech Stack

**Frontend:**
- React 18
- Vite
- CSS3

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)

## Installation & Setup

### Step 1: Install MongoDB

**For macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**For Windows:**
1. Download MongoDB Community Server from the official website
2. Run the installer
3. Start MongoDB service from Services

**For Linux (Ubuntu/Debian):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Verify MongoDB is running:**
```bash
mongosh
# You should see MongoDB shell open
# Type 'exit' to close it
```

### Step 2: Clone/Download the Project

If you have the files, navigate to the project directory:
```bash
cd todo-app
```

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 4: Install Frontend Dependencies

Open a new terminal window/tab:
```bash
cd frontend
npm install
```

## Running the Application

You need to run both the backend and frontend servers simultaneously.

### Terminal 1: Start the Backend Server

```bash
cd backend
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

### Terminal 2: Start the Frontend Development Server

Open a new terminal:
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. **Add a Todo**: Type in the input field and click "Add" or press Enter
2. **Complete a Todo**: Click the checkbox next to any todo item
3. **Edit a Todo**: Click the "Edit" button, modify the text, then click "Save"
4. **Delete a Todo**: Click the "Delete" button to remove a todo

## Project Structure

```
todo-app/
├── backend/
│   ├── server.js          # Express server with API routes
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.jsx       # Main React component
│   │   ├── App.css       # Styles
│   │   └── main.jsx      # React entry point
│   ├── index.html        # HTML template
│   ├── package.json      # Frontend dependencies
│   └── vite.config.js    # Vite configuration
└── README.md             # This file
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |

## Troubleshooting

### MongoDB Connection Error

If you see "MongoDB connection error":
1. Make sure MongoDB is running: `brew services list` (macOS) or `sudo systemctl status mongod` (Linux)
2. Check if port 27017 is available
3. Try restarting MongoDB service

### Port Already in Use

If port 5000 or 3000 is already in use:
- **Backend**: Change PORT in `backend/.env`
- **Frontend**: Change port in `frontend/vite.config.js`

### Cannot GET /api/todos

Make sure the backend server is running on port 5000. Check the backend terminal for any errors.

### CORS Error

This shouldn't happen as CORS is enabled, but if it does:
1. Make sure both servers are running
2. Check that the frontend is requesting `http://localhost:5000`

## Development Notes

- Backend runs on **http://localhost:5000**
- Frontend runs on **http://localhost:3000**
- MongoDB runs on **mongodb://localhost:27017**
- Data persists in MongoDB, so your todos will remain even after restarting

## Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

The optimized files will be in `frontend/dist/`

### Backend Production

```bash
cd backend
NODE_ENV=production npm start
```

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Support

If you encounter any issues:
1. Make sure all prerequisites are installed
2. Check that both servers are running
3. Verify MongoDB is running
4. Check the terminal output for error messages

Happy coding! 🚀
