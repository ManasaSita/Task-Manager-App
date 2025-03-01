# Task Management App

A full-stack task management application built with React, Node.js, and MongoDB.

## Features
- User authentication (login/register)
- Create, edit, delete tasks
- Task details view
- Secure private routes for authenticated users
- Filter to sort tasks based on task-status and due date

## Tech Stack
### Frontend:
- React.js
- React Router
- Bootstrap

### Backend:
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Setup Instructions

### Clone Repository
```sh
git clone https://github.com/ManasaSita/Task-Manager-App.git
```

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure the following environment variables:
   ```sh
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   PORT=5000
   JWT_SECRET=SECRET_TOKEN
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm start
   ```

## Usage
- Open the app in your browser at `http://localhost:3000/`
- Register a new user or log in with existing credentials
- Manage tasks from the dashboard

## Contributing
Feel free to submit pull requests or report issues.


