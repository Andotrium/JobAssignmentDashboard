# Job Assignment Dashboard – Frontend

This is the **frontend** of the **Job Assignment Dashboard** project, built using **React (Create React App)**.  
It provides the user interface for interacting with the backend APIs, including authentication and job-related operations.

---

##  Tech Stack

- React (Create React App)
- Axios – for API requests
- CSS for styling
- Environment variables for API configuration

---

##  Project Structure

client/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── api/ # Axios configuration
│ ├── App.js
│ └── index.js
├── .env
├── package.json
└── README.md


---

##  Environment Variables (Important)

###  Intentional `.env` Commit

This repository **intentionally includes** a `.env` file with **only one variable**:
REACT_APP_BASE_API_URL=...

### Why this is intentional:

- The variable contains **only the base URL of the backend API**
- ❌ No secrets, tokens, or credentials are included
-  Makes it easy to run the frontend locally without extra setup
-  Allows reviewers and testers to start the app immediately

> In real-world projects, secrets should never be committed.  
> This project follows that rule — the committed `.env` contains **no sensitive data**.

---

##  Getting Started (Local Setup)

###  Clone the repository

```bash
git clone https://github.com/Andotrium/JobAssignmentDashboard.git
cd JobAssignmentDashboard/client
Install dependencies
Start the development server
