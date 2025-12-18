# Job Board Backend

This is the backend for a Job / Task Management platform built as part of a full-stack job assignment.

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt for password hashing

## Features
- User registration and login
- JWT-based authentication
- Role-Based Access Control (RBAC)
- Job/Task CRUD operations
- Admin and User roles
- Secure backend authorization

## Roles & Permissions

### User
- Can create jobs/tasks
- Can view, update, and delete only their own jobs/tasks

### Admin
- Can view all jobs/tasks
- Can update or delete any job/task

RBAC is enforced **on the backend**, not just the frontend.

## Authentication Flow
1. User registers with email and password
2. Password is hashed using bcrypt
3. User logs in and receives a JWT
4. JWT must be sent in `Authorization` header:

5. Protected routes verify JWT and extract user role

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Jobs (Protected)
- `POST /api/jobs`
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `PUT /api/jobs/:id`
- `DELETE /api/jobs/:id`

## Admin Creation
Users register as normal users by default.

To create an admin:
- Register a user
- Update their `role` field to `"admin"` directly in the database

This is intentional to prevent unauthorized admin creation.

## Environment Variables

Create a `.env` file in the backend root:


## Running Locally

```bash
npm install
npm run dev


---

## PART 3 — What we Have Achieved

At this point, what we have acheived in the backend:

✔ Real authentication (JWT)  
✔ Password hashing  
✔ Backend-enforced RBAC  
✔ Proper job ownership logic  
✔ Clean architecture  

---



