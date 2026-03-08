# special-winner

A full-stack task management application built with React, Express, MongoDB, and Docker.

## Features

- User registration and login with JWT authentication
- Create, view, update, and delete tasks
- Filter tasks by status (All, Active, Completed)
- Task attributes: title, description, status, priority, creation date, user ID
- Responsive UI with Tailwind CSS
- Dockerized for easy setup

## Tech Stack

- **Frontend**: React 19, React Router, Tailwind CSS, Vite
- **Backend**: Express, MongoDB, Mongoose, JWT, bcrypt
- **DevOps**: Docker, Docker Compose
- **State Management**: React Context for auth, local state for tasks
- **Custom Hook**: `useAuth` for authentication

## Architecture

- **Frontend**: Single-page React app with routes for login, register, and tasks. Uses Context API for auth state and a custom hook for auth operations.
- **Backend**: RESTful API with endpoints for auth (`/api/auth`) and tasks (`/api/tasks`). Secured with JWT.
- **Database**: MongoDB with schemas for users (email, password) and tasks (title, description, status, priority, userId, createdAt).
- **Docker**: Three services (frontend, backend, MongoDB) connected via a bridge network.

## Database Schema

### User

```javascript
{
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Task

```javascript
{
  title: String (required),
  description: String,
  status: String (enum: ['incomplete', 'complete'], default: 'incomplete'),
  priority: String (enum: ['Low', 'Medium', 'High'], default: 'Low'),
  userId: ObjectId (ref: 'User', required),
  createdAt: Date,
  updatedAt: Date
}
```

## Setup Instructions

### Prerequisites

- Docker and Docker Compose
- Node.js (optional for local development without Docker)

### Running with Docker

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-management
   ```
2. Create a `.env` file in `task-management-backend` with:
   ```env
   PORT=5001
   MONGODB_URI=mongodb://admin:admin123@mongodb:27017/taskdb?authSource=admin
   JWT_SECRET=your_jwt_secret_key_123
   ```
3. Start the services:
   ```bash
   docker-compose up --build
   ```
4. Access the app:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5001/api`
5. Seed the database with test data:
   ```bash
   docker-compose exec backend node seed.js
   ```

### Running Locally

1. **Backend**:
   ```bash
   cd task-management-backend
   npm install
   node seed.js
   npm start
   ```
2. **Frontend**:
   ```bash
   cd task-management-frontend
   npm install
   npm run dev
   ```

### Test Users

- User 1: `user1@example.com` / `password1`
- User 2: `user2@example.com` / `password2`

## Technical Choices

- **React with Vite**: Fast development and build times.
- **Tailwind CSS**: Utility-first CSS for rapid UI development.
- **JWT Authentication**: Secure and stateless auth mechanism.
- **MongoDB**: Flexible NoSQL database for rapid prototyping.
- **Docker Compose**: Simplifies multi-container setup and ensures consistency.
- **Context API**: Lightweight state management for auth.
- **Custom Hook**: Encapsulates auth logic for reusability.

## Notes

- The backend runs on port 5001 to avoid conflicts on macOS.
- Error handling is implemented for API requests and user input.
- PropTypes are used for prop validation in React components.
- Seed script provides sample data for testing.
