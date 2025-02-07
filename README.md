# Task Management Application (MERN)

## Overview
This is a full-stack task management application built using the MERN stack (MongoDB, Express.js, React, Node.js) with TypeScript. Users can register, log in, create, update, delete, and mark tasks as completed. The application features JWT-based authentication, protected routes, and a responsive UI using Tailwind CSS.

## Features
- **User Authentication**: JWT-based login and password hashing using bcrypt.
- **Task Management**: CRUD operations for tasks, marking tasks as completed or pending.
- **Task Listing Page**: Search and filter options for better task management.
- **Responsive UI**: Built using Tailwind CSS.
- **State Management**: Utilizes Context API.
- **Protected Routes**: Ensures only authenticated users can access task-related features.

---

## Project Structure

### Backend (`backend/`)
```
backend/
├── config/
│   ├── db.js                   # Database connection setup
├── controller/
│   ├── TaskController.js       # Handles task-related operations
│   ├── UserController.js       # Handles user-related operations
├── middleware/
│   ├── authentication.js       # JWT authentication middleware
├── models/
│   ├── TaskModel.js            # Mongoose schema for tasks
│   ├── UserModel.js            # Mongoose schema for users
├── routes/
│   ├── TaskRoutes.js           # Task-related API routes
│   ├── UserRoutes.js           # User authentication API routes
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
├── index.js                    # Entry point of the backend server
├── package.json                # Node.js dependencies and scripts
```

### Frontend (`frontend/src/`)
```
frontend/src/
├── api/
│   ├── authApi.ts              # API calls for authentication
├── components/
│   ├── Model.tsx               # Modal component
│   ├── Navbar.tsx              # Navigation bar component
├── context/
│   ├── AuthContext.tsx         # Authentication context provider
├── pages/
│   ├── Login.tsx               # User login page
│   ├── Signup.tsx              # User signup page
│   ├── Tasks.tsx               # Task dashboard page
│   ├── TaskForm.tsx            # Task creation form
│   ├── TaskList.tsx            # Task list component
├── routes/
│   ├── App.tsx                 # Application routes
├── App.css                     # Global styles
├── index.css                   # Index styles
├── main.tsx                    # Entry point of the frontend
```

## 🛠️ Installation & Setup

1. **Clone the Repository:**
```sh
git https://github.com/Sajid788/Kazam-Assignment.git
cd backend
cd frontend
```

2. **Install Dependencies:**
```sh
npm install
```

3. **Start Running Server:**
```sh
npm nodemon index.js
```
3. **Start Running client:**
```sh
npm run dev
```

# MERN Task Manager API

## Tech Stack
- **Frontend:** React,TypeScript, ContextApi, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Token)

## API Endpoints

### 1. Register a User
**POST** `/api/users/register`
- **URL:** `http://localhost:<PORT>/api/users/register`
- **Body (JSON):**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "User signed up successfully",
    "user": {
      "_id": "123456789",
      "name": "John Doe",
      "email": "john@example.com",
      "password": "<hashed password>"
    }
  }
  ```

### 2. Login to Get Token
**POST** `/api/users/login`
- **URL:** `http://localhost:<PORT>/api/users/login`
- **Body (JSON):**
  ```json
  {
    "email": "john@example.com",
    "password": "123456"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Login successful",
    "token": "your_jwt_token"
  }
  ```

### 3. Create a Task
**POST** `/api/tasks/create`
- **URL:** `http://localhost:<PORT>/api/tasks/create`
- **Headers:**
  ```
  Authorization: Bearer your_jwt_token
  ```
- **Body (JSON):**
  ```json
  {
    "title": "Complete Project",
    "description": "Finish MERN stack project",
    "completed": false
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "Added successfully",
    "task": {
      "_id": "123456",
      "title": "Complete Project",
      "description": "Finish MERN stack project",
      "completed": false,
      "userId": "user_id_here"
    }
  }
  ```

### 4. Get All Tasks
**GET** `/api/tasks/mytasks`
- **URL:** `http://localhost:<PORT>/api/tasks/mytasks`
- **Headers:**
  ```
  Authorization: Bearer your_jwt_token
  ```
- **Response (200 OK):**
  ```json
  [
    {
      "_id": "123456",
      "title": "Complete Project",
      "description": "Finish MERN stack project",
      "completed": false,
      "userId": "user_id_here"
    }
  ]
  ```

### 5. Update a Task
**PUT** `/api/tasks/update/:id`
- **URL:** `http://localhost:<PORT>/api/tasks/update/123456`
- **Headers:**
  ```
  Authorization: Bearer your_jwt_token
  ```
- **Body (JSON):**
  ```json
  {
    "title": "Update Project",
    "description": "Updated task description",
    "completed": true
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Task updated successfully",
    "task": {
      "_id": "123456",
      "title": "Update Project",
      "description": "Updated task description",
      "completed": true,
      "userId": "user_id_here"
    }
  }
  ```

### 6. Toggle Task Completion
**PUT** `/api/tasks/complete/:id`
- **URL:** `http://localhost:<PORT>/api/tasks/complete/123456`
- **Response (200 OK):**
  ```json
  {
    "message": "Task status updated",
    "task": {
      "_id": "123456",
      "title": "Update Project",
      "description": "Updated task description",
      "completed": false
    }
  }
  ```

### 7. Delete a Task
**DELETE** `/api/tasks/delete/:taskId`
- **URL:** `http://localhost:<PORT>/api/tasks/delete/123456`
- **Headers:**
  ```
  Authorization: Bearer your_jwt_token
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

### 8. Test Unauthorized Requests
Try accessing any `/api/tasks` route without a token.
- **Expected Response:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

## Technologies Used
- **Frontend**: React, TypeScript, Tailwind CSS, Context API
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, joe

## 📌 Application ScreenShots

![image](https://github.com/user-attachments/assets/d9fffc5b-34a4-43b7-9d27-403e34f27f22)
![image](https://github.com/user-attachments/assets/8ab3d11b-0899-4418-b6e5-f086df544ed7)
![image](https://github.com/user-attachments/assets/c91f55ab-d84b-4bc4-b064-1cb281866ce3)
![image](https://github.com/user-attachments/assets/9f2f9c4e-2d98-4c33-8df9-57bd1d8fb53c)
![image](https://github.com/user-attachments/assets/e26a4fb4-72ba-4818-8802-2861ffb0d4b1)




## License
This project is open-source and available under the MIT License.










