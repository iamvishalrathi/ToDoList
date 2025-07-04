# To-Do List Application

A simple To-Do List application built with MERN stack (MongoDB in-memory implementation, Express.js, React, Node.js) and Next.js for the frontend.

## Project Structure

```
├── backend/           # Node.js backend
│   ├── server.js      # Main server file
│   └── package.json   # Backend dependencies
├── frontend/          # Next.js frontend
│   ├── pages/         # Next.js pages
│   ├── components/    # React components
│   ├── styles/        # CSS styles
│   └── package.json   # Frontend dependencies
└── README.md          # This file
```

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   You can modify the values in the .env file according to your needs.

4. Start the server:
   ```
   npm start
   ```
   The server will run on http://localhost:5000 (or the port specified in your .env file)

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   You can modify the values in the .env file according to your needs.

4. Start the development server:
   ```
   npm run dev
   ```
   The frontend will run on http://localhost:3000

## API Endpoints

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task's completion status
- `DELETE /tasks/:id` - Delete a task

## Testing the Application

1. Open your browser and navigate to http://localhost:3000
2. Add a new task by typing in the input field and clicking "Add Task"
3. Mark tasks as completed by clicking the checkbox next to them
4. Delete tasks by clicking the delete button

## Features

- Create, read, update, and delete tasks
- Mark tasks as completed or active
- Bulk delete all tasks
- Filter tasks by status (All, Active, Completed)
- Search tasks by keyword
- Responsive design for mobile and desktop
- Accessible UI with ARIA labels
- Modal dialogs for viewing and deleting tasks
- Intuitive and modern user interface

## Website Preview

### Desktop View

![Desktop Preview](frontend/public/sns-desktop.png)

### Mobile View

![Mobile Preview](frontend/public/sns-mobile.png)