# Local Development Guide

This guide provides instructions for setting up and running the De Reality Spec monorepo locally.

## Prerequisites
- Node.js (v20+)
- Python (v3.12+)
- PostgreSQL (Local or Neon equivalent)

---

## 1. Backend Setup (FastAPI)

Navigate to the backend directory and set up your virtual environment:

```bash
cd backend
python -m venv venv
source venv/bin/activate
```

Install the dependencies:

```bash
pip install fastapi uvicorn sqlalchemy alembic asyncpg psycopg2-binary passlib bcrypt pyjwt pydantic[email]
```

**Database Configuration**

Create a local database or ensure you have your Neon `DATABASE_URL` ready. Set the environment variable:

```bash
export DATABASE_URL="postgresql+asyncpg://jules:password@localhost/derealityspec"
```

*Note: For Alembic to work correctly with async execution, the connection scheme must be `postgresql+asyncpg://`.*

## 2. Running Database Migrations

With the environment variable set, generate and apply migrations:

```bash
cd backend
alembic upgrade head
```

If you make model changes, generate a new migration script:
```bash
alembic revision --autogenerate -m "Description of change"
```

## 3. Running the Backend Server

Start the FastAPI server on port 8000:

```bash
cd backend
uvicorn main:app --reload --port 8000
```
The interactive API docs will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

## 4. Frontend Setup (Next.js)

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Start the Next.js development server:

```bash
npm run dev
```
The frontend will run on [http://localhost:3000](http://localhost:3000). The login portal is accessible at `http://localhost:3000/portal/login`.

## 5. Testing Locally

### Create the First Admin User
Use this `curl` command to register your initial Admin user directly against the API:

```bash
curl -X 'POST' \
  'http://localhost:8000/api/v1/users/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "admin@derealityspec.com",
  "full_name": "System Admin",
  "password": "securepassword123"
}'
```

### Log In to the Portal
1. Open `http://localhost:3000/portal/login` in your browser.
2. Enter the credentials (`admin@derealityspec.com` / `securepassword123`).
3. Upon success, you will receive an `access_token` stored as an HTTP-only cookie, and you will be redirected.