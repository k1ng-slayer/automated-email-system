# Automated Email System

Small FastAPI + React app for sending two types of emails from an Excel sheet:

- `Defaulter`: sends emails to students below an attendance threshold
- `Customize`: sends a custom subject and message to students

## Stack

- Backend: FastAPI
- Frontend: React + TypeScript + Tailwind

## Excel Format

The app expects sheets in this format:

`Roll No | Name | Class | Email | Attendance`

For custom emails, the app uses the `Email` column.  
For defaulter emails, the app uses both `Email` and `Attendance`.

## Run Locally

Backend:

```powershell
cd backend
uvicorn main:app --reload --port 8000
```

Frontend:

```powershell
cd frontend
npm run dev
```

## Note

This app can still be run locally. For sending emails with Gmail SMTP, use a Google App Password instead of your normal Gmail account password.
