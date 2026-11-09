# SecureAudit – Security Policy Compliance and Audit Management Platform

## Project Overview

SecureAudit is a web-based application designed to help organizations manage security policies, monitor compliance, schedule audits, track findings, and manage corrective actions through a centralized platform.

The system provides role-based access, dashboard analytics, compliance reports, and evidence management to support organizational security governance.

## Key Features

- **Authentication & Authorization:** Secure login and role-based access control.
- **Dashboard:** Overview of compliance activities and organizational records.
- **Department Management:** Manage departments and their information.
- **Policy Management:** Create and manage organizational security policies.
- **Control Management:** Track security controls linked to policies.
- **Asset Management:** Maintain organizational asset records.
- **Audit Scheduling:** Schedule and track compliance audits.
- **Evidence Management:** Upload and manage audit evidence.
- **Findings Management:** Track audit findings.
- **Corrective Actions:** Manage actions required to resolve compliance issues.
- **Reports & Analytics:** Generate detailed compliance reports and export them as CSV or PDF.

## Technology Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Node.js
- Express.js
- REST APIs
- JWT Authentication
- bcryptjs

### Database
- MongoDB
- Mongoose

### Deployment & Development Tools
- Docker
- Docker Compose
- Nginx
- Git
- GitHub

## Project Structure

```text
security-compliance-platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── Dockerfile
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   └── nginx.conf
│
├── compose.yaml
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account or MongoDB instance
- Docker Desktop (for containerized deployment)

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd security-compliance-platform
```

### 2. Configure Backend Environment

Create a `.env` file inside the `backend` directory.

Add the following variables:

```env
PORT=5051
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use your own credentials. Never commit the `.env` file.

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 5. Run the Application

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd frontend
npm run dev
```

Open the local frontend URL displayed by Vite in your terminal.

## Docker Deployment

Make sure Docker Desktop is running and `backend/.env` is configured.

From the project root, run:

```bash
docker compose build
docker compose up -d
```

Access the application:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5051

Check running containers:

```bash
docker compose ps
```

Stop the containers:

```bash
docker compose down
```

## API Modules

The backend provides REST API routes for:

- Authentication – `/api/auth`
- Users – `/api/users`
- Departments – `/api/departments`
- Policies – `/api/policies`
- Controls – `/api/controls`
- Assets – `/api/assets`
- Audits – `/api/audits`
- Evidence – `/api/evidence`
- Findings – `/api/findings`
- Correct