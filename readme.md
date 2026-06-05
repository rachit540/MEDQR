<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a1a0a,50:1a3a1a,100:0d2b0d&height=200&section=header&text=MedQR&fontSize=60&fontColor=ffffff&fontAlignY=38&desc=Your%20Medical%20Profile.%20One%20Scan%20Away.&descAlignY=60&descSize=18&animation=fadeIn" width="100%"/>

<br/>

![React](https://img.shields.io/badge/React_19-0D1117?style=for-the-badge&logo=react&logoColor=4ADE80)
![Vite](https://img.shields.io/badge/Vite-0D1117?style=for-the-badge&logo=vite&logoColor=4ADE80)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-0D1117?style=for-the-badge&logo=tailwind-css&logoColor=4ADE80)
![Node.js](https://img.shields.io/badge/Node.js-0D1117?style=for-the-badge&logo=node.js&logoColor=4ADE80)
![Express](https://img.shields.io/badge/Express-0D1117?style=for-the-badge&logo=express&logoColor=4ADE80)

</div>

---

## 🏥 What is MedQR?

**MedQR** is a full-stack web application that lets users store their complete medical profile and generate a personal QR code — so that in any emergency, first responders can scan it and instantly access critical health information.

> *No app needed to scan. No login required for emergency access. Just scan and save a life.*

---

## ✨ Features

- 🔐 **Secure Profile Creation** — Register with email and password
- 🩸 **Complete Medical Profile** — Blood group, allergies, conditions, medications
- 🚨 **Emergency Contacts** — Store contacts that appear on emergency scan
- 🏥 **Doctor Info** — Save your primary doctor's name and phone
- 💊 **Medication Tracker** — List current medications with dosage and frequency
- 🫀 **Organ Donor Status** — Clearly flagged on emergency view
- 📱 **QR Code Generation** — Unique QR per profile, scannable by anyone
- ⚡ **Instant Emergency View** — No login needed to view emergency data via QR

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router v7, Tailwind CSS v4 |
| Build Tool | Vite 8 |
| Backend | Node.js, Express 5 |
| Database | LowDB (JSON-based local DB) |
| QR Code | qrcode (backend), qrcode.react (frontend) |
| HTTP Client | Axios |
| Auth | UUID-based profile tokens |

---

## 📁 Project Structure

```
MedQR/
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level pages
│   │   └── main.jsx        # App entry point
│   ├── index.html
│   └── vite.config.js
│
└── backend/                # Node.js + Express API
    ├── routes/
    │   ├── profile.js      # Profile CRUD routes
    │   └── emergency.js    # Public emergency access route
    ├── db.json             # LowDB database file
    └── server.js           # Express server entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/rachit540/MEDQR.git
cd MEDQR
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
PORT=5000
```

Start the backend server:

```bash
node server.js
```

> Server runs on `http://localhost:5000`

### 3. Setup the Frontend

```bash
cd frontend
npm install
npm run dev
```

> App runs on `http://localhost:5173`

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/profile/register` | Create a new profile |
| `POST` | `/api/profile/login` | Login with email & password |
| `GET` | `/api/profile/:uuid` | Get profile by UUID |
| `PUT` | `/api/profile/:uuid` | Update profile |
| `GET` | `/api/emergency/:uuid` | Public emergency view (no auth) |

---

## 📱 How It Works

```
User registers → Fills medical profile → Gets unique QR code
                                              ↓
                              Anyone scans QR in emergency
                                              ↓
                         Instant access to: blood group, allergies,
                         medications, emergency contacts, doctor info
```

---

## 🔒 Security Note

User passwords are encrypted using **bcryptjs** (with salt rounds) before being saved to the database. For full scale production deployments, it is recommended to transition from the lightweight local JSON database (LowDB) to a production-grade database such as MongoDB or PostgreSQL.

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a1a0a,50:1a3a1a,100:0d2b0d&height=100&section=footer" width="100%"/>

*Built with ❤️ by [Rachit Srivastava](https://github.com/rachit540)*

</div>
