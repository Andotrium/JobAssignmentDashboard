
# Job Assignment Dashboard  
### Full-Stack Job / Task Management Platform with Authentication & RBAC

This project is a **full-stack job/task management application** built as part of a technical job assignment.  
It demonstrates **real authentication**, **role-based authorization (RBAC)**, clean API design, and seamless integration between a **React frontend** and a **Node.js backend**.

---

##  Overview

The application allows users to create, view, update, and delete jobs/tasks.  
Access to resources is controlled using **JWT-based authentication** and **role-based access control**.

- **Users** can manage only their own jobs
- **Admins** can manage all jobs

All authorization rules are **enforced on the backend**.

---

##  Key Concepts Demonstrated

- Secure authentication using JWT
- Password hashing with bcrypt
- Backend-enforced RBAC (Admin / User)
- RESTful API design
- MongoDB data modeling with Mongoose
- React frontend with protected routes
- Clean, scalable project structure

---

##  Tech Stack

### Frontend
- React (Create React App)
- React Router
- Axios
- Context API for global auth state

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv
- cors

---

##  Authentication Flow

1. User registers with email and password
2. Password is hashed using **bcrypt**
3. User logs in and receives a **JWT**
4. JWT is sent in request headers:
5. Backend middleware verifies JWT on protected routes
6. User identity and role are extracted from token

---

##  Authorization (RBAC)

### Roles

#### User
- Create jobs
- View, edit, and delete **only their own jobs**

#### Admin
- View **all jobs**
- Edit or delete **any job**

RBAC is enforced **strictly on the backend**, not just the frontend UI.

---

##  API Endpoints

### Authentication
| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |

---

### Jobs (Protected Routes)
| Method | Endpoint | Access |
|------|---------|--------|
| POST | `/api/jobs` | User / Admin |
| GET | `/api/jobs` | User → own jobs, Admin → all jobs |
| GET | `/api/jobs/:id` | Owner or Admin |
| PUT | `/api/jobs/:id` | Owner or Admin |
| DELETE | `/api/jobs/:id` | Owner or Admin |

---

##  Admin Role Creation

Users register as normal users by default.

To create an admin user:
1. Register a user using the application
2.  MongoDB (Atlas or Compass)
3. Update the user document:

```json
{
  "role": "admin"
}
