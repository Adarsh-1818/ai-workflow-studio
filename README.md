🚀 AI Workflow Studio

A full-stack AI-powered workflow builder and chat platform with authentication, PostgreSQL persistence, and a modern React + Node.js architecture.
Designed to simulate real-world SaaS product development.

✨ Features
🔐 Authentication
User registration & login
JWT-based authentication
Password hashing with bcrypt
Strong password validation (uppercase, number, special character)
Forgot password flow (API-ready)

💬 AI Chat System
Multi-chat support
Persistent chat history
AI response handling (mock or API-based fallback)

⚙️ Workflow System
Workflow builder architecture
Extensible node-based design (ready for AI automation pipelines)

🗄️ Backend & Database
Node.js + Express backend
PostgreSQL database (Neon supported)
Prisma ORM for type-safe queries
Clean REST API architecture

🎨 Frontend
React + TypeScript
Tailwind CSS UI
Zustand state management
Axios API layer with environment-based configuration

🚀 Deployment Ready
Frontend: Vercel
Backend: Render
Database: Neon PostgreSQL
Fully environment-based configuration

🏗️ Tech Stack
Frontend
React
TypeScript
Tailwind CSS
Vite
Axios
Zustand
Backend
Node.js
Express.js
TypeScript
Prisma ORM
bcryptjs
JSON Web Token (JWT)
Database
PostgreSQL (Neon)

📁 Project Structure
ai-workflow-studio/
│
├── client/        # Frontend (React + Vite)
│   ├── src/
│   └── ...
│
├── server/        # Backend (Node + Express)
│   ├── src/
│   ├── prisma/
│   └── ...
│
└── README.md

⚙️ Environment Variables
Backend (server/.env)
DATABASE_URL=your_postgres_url
JWT_SECRET=your_super_secret_key
Frontend (client/.env)
VITE_API_URL=http://localhost:5000/api

For production:

VITE_API_URL=https://your-backend-url.onrender.com/api
🚀 Getting Started (Local Setup)
1. Clone repository
git clone https://github.com/your-username/ai-workflow-studio.git
cd ai-workflow-studio
2. Backend setup
cd server
npm install
npx prisma generate
npm run dev
3. Frontend setup
cd client
npm install
npm run dev
🧪 Build for Production
Frontend
npm run build
Backend
npm run build
npm run start

🌐 Deployment
Frontend (Vercel)

Set environment variable:

VITE_API_URL=https://your-backend.onrender.com/api
Backend (Render)

Build Command:

npm install && npm run build && npx prisma generate

Start Command:

npm run start


📌 Key Learnings

This project demonstrates:

Full-stack SaaS architecture
Authentication & security best practices
API design with Express
Database modeling with Prisma
Frontend-backend integration
Production deployment workflow

🚀 Future Improvements
Refresh token authentication
Real AI integration (OpenAI / LLM APIs)
Workflow execution engine
Real-time updates (WebSockets)
Role-based access control
UI enhancements for workflow builder

👨‍💻 Author

Built by Adarsh
Full Stack Developer | AI Enthusiast

📄 License

This project is for educational and portfolio purposes.
