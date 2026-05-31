# LogicMint Coding Platform

LogicMint is a full-stack coding platform built with the MERN stack.  
It supports secure authentication, coding practice, timed contests, rankings, an AI assistant, and admin management tools.

## Features

- User authentication (email/password + Google)
- Practice problems with progress tracking
- Online compiler execution
- Contest lifecycle:
  - current/upcoming contests
  - previous contests
  - user attempt tracking
- Leaderboard and score aggregation
- User profile with:
  - editable username/profile image
  - submission heatmap
  - learning path progress
- Admin panel:
  - user controls
  - contest creation
  - contest history view
- Dark/light theme across pages
- AI assistant with persistent chat history

## Technology Used

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Firebase Authentication
- Monaco Editor
- Chart.js

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer
- Socket.io

### Deploy
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Project Structure

```text
Frontend/
  src/
    components/
    pages/
    services/
    context/
    assets/

Backend/
  API/
  Models/
  services/
  middlewares/
  utils/
```

## Installation

### 1) Clone and install dependencies

```bash
git clone <your-repo-url>
cd CC

cd Backend
npm install

cd ../Frontend
npm install
```

### 2) Configure environment variables

Create `.env` files from examples:

```bash
cd Backend
cp .env.example .env

cd ../Frontend
cp .env.example .env
```

Set values in `Backend/.env` and `Frontend/.env` as required for your deployment.

## Running Locally

### Backend

```bash
cd Backend
npm run dev
```

### Frontend

```bash
cd Frontend
npm run dev
```

Frontend will run on `http://localhost:5173` and backend on `http://localhost:4000` (unless changed).

## Build for Production

```bash
cd Frontend
npm run build
```

```bash
cd Backend
node --check server.js
```

## Important Setup Notes

### Google Sign-In
- Add your frontend domain to Firebase authorized domains.
- Example production domain: `logic-mint.vercel.app`

### Forgot Password Email
- Configure SMTP or EMAIL credentials in backend environment variables.
- Use app passwords when required by your email provider.

## API Overview

- Auth APIs: `/api/auth/*`
- Practice APIs: `/question-api/*`
- Compiler APIs: `/compiler-api/*`
- Contest APIs: `/contest-api/*`
- Admin APIs: `/admin-api/*`
- Leaderboard APIs: `/leaderboard-api/*`
- AI APIs: `/ai-api/*`

## License

This project is for educational and development use.
