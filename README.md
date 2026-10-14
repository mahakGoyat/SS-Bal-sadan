<img width="1351" height="642" alt="ss bal sadan" src="https://github.com/user-attachments/assets/fa2e7c20-49c4-4cc4-9f16-529d56766d19" />

# SS Bal Sadan School Website

A complete school website for SS Bal Sadan School, Siwan, Kaithal, Haryana. It has admission and contact forms that send real emails, a Hindi and English AI chatbot, and voice replies.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

**Live site:** [ss-bal-sadan-school-website.vercel.app](https://ss-bal-sadan-school-website.vercel.app)
**API:** [ss-bal-sadan.onrender.com](https://ss-bal-sadan.onrender.com)

<img width="640" height="301" alt="SS_Bal_Sadan_School" src="https://github.com/user-attachments/assets/2c8ebabd-ea43-4018-9021-05b4f760a529" />

---

## Features

- **10 pages:** Home, About, Academics, Admissions, Faculty, Gallery, Documents, News, Events and Contact
- **Admission and contact forms:** submissions go through the backend and arrive as real emails (sent with Brevo)
- **AI chatbot:** answers questions about the school in Hindi and English (Groq, Llama 3.3 70B)
- **Voice replies:** text to speech that detects Hindi or English automatically (Cartesia)
- **100 PageSpeed score:** WebP images, accessibility fixes and performance tuning
- **Responsive design:** works on phones, tablets and desktops

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Radix UI, Framer Motion
- **Backend:** Express, TypeScript
- **AI and voice:** Groq API, Cartesia
- **Email:** Brevo
- **Hosting:** Vercel (frontend) and Render (backend)
- **Tooling:** pnpm workspaces

## Project Structure

```
artifacts/
├── school-website/   # React frontend
└── api-server/       # Express backend (forms, chatbot, voice)
```

## Run Locally

### Prerequisites

- Node.js
- [pnpm](https://pnpm.io/installation) (this project uses pnpm, not npm)

### Setup

```bash
git clone https://github.com/mahakGoyat/SS-Bal-sadan.git
cd SS-Bal-sadan
pnpm install
```

### Start the backend

```bash
pnpm --filter @workspace/api-server run dev
```

The API runs on port 8080.

### Start the frontend

In a new terminal:

```bash
pnpm --filter @workspace/school-website run dev
```

## Environment Variables

Create a `.env` file for each part and add your own values. Never commit `.env` files or share your keys.

**Backend (`artifacts/api-server`)**

| Variable | Used for |
| --- | --- |
| `GROQ_API_KEY` | AI chatbot |
| `CARTESIA_API_KEY` | Voice replies |
| `BREVO_API_KEY` | Sending form emails |
| `SCHOOL_EMAIL` | Email address that receives form submissions |
| `FRONTEND_URL` | Allowed frontend URL for CORS |

**Frontend (`artifacts/school-website`)**

| Variable | Used for |
| --- | --- |
| `VITE_API_URL` | URL of the backend API |

## Author

Built by [Mahak Goyat](https://github.com/mahakGoyat).
