# ⚙️ Application Setup (Client + Server)



## 🛠 Local Development Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Aniket897/OutFlo-Assignment
cd OutFlo-Assignment
```

### 2️⃣ Install Dependencies

#### 🖥 Server
```bash
cd server
npm install
```

#### 🌐 Client
```bash
cd ../client
npm install
```

---

### 3️⃣ Setup Environment Variables

#### 📁 In `server/.env`

```env
PORT=8080
MONGO_URL=
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=

```

#### 📁 In `client/.env`

```env
SERVER_URL=
```
---

### 4️⃣ Run the Development Servers

#### 🖥 Server (TypeScript + Nodemon)
```bash
cd server
npm run dev
```

#### 🌐 Client (React App)
```bash
cd client
npm start
```

---

## 📂 Project Structure

```
Root/
│
├── client/                # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── package.json
│   └── .env               # React environment config

├── server/                # Node + TS Backend
│   ├── src/
│   │   ├── server.ts       # Entry point
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── helpers/
│   ├── .env
│   ├── tsconfig.json
│   ├── nodemon.json
│   └── package.json

├── README.md
└── .gitignore
```

---

