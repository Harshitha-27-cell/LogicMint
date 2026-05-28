# LogicMint — Competitive Coding Platform

Full-stack MERN platform (CodeChef-style) with practice problems, contests, compiler, leaderboard, dashboards, AI assistant, and real-time notifications.

## Stack

- **Frontend:** React + Vite + Tailwind CSS + Monaco Editor + Chart.js
- **Backend:** Node.js + Express + MongoDB + Socket.io + Judge0
- **Deploy:** Vercel (frontend) + Render (backend) + MongoDB Atlas

## Quick Start

### Backend

```bash
cd Backend
cp .env.example .env
# Edit .env with DB_URL, SECRET_KEY, PORT
npm install
npm run dev
```

### Frontend

```bash
cd Frontend
cp .env.example .env
# Set VITE_API_URL=http://localhost:4000
npm install
npm run dev
```

### Docker

```bash
docker compose up --build
```

## Key Routes

| Feature | Frontend | Backend |
|---------|----------|---------|
| Auth | `/login`, `/signup` | `/api/auth/*` |
| Practice | `/practice`, `/course/:lang`, `/problem/:id` | `/question-api/*` |
| Compiler | `/compiler` | `/compiler-api/run` |
| Contests | `/contest-page`, `/contest-attempt/:id` | `/contest-api/*` |
| Dashboard | `/dashboard` | `/dashboard-api` |
| Leaderboard | `/leaderboard` | `/leaderboard-api` |
| AI Assistant | `/ai-assistant` | `/ai-api/chat` |
| Admin | `/admin`, `/contest` | `/admin-api/*`, `/user-api/all-users` |

## Admin Login

- Email: `admin@logicmint.com`
- Password: `LogicMint123`

## Optional

- Set `OPENAI_API_KEY` in Backend `.env` for full AI assistant responses.
