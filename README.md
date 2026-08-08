# 🏫 SS Bal Sadan School Website

> A full-featured school website built for SS Bal Sadan — from admissions to contact, with a working email pipeline behind it. React + TypeScript frontend, Express + TypeScript backend.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

**🔗 Live site:** https://ss-bal-sadan-school-website.vercel.app
**🔗 API:** https://ss-bal-sadan.onrender.com
<img width="480" height="226" alt="SS_Bal_Sadan_School_small" src="https://github.com/user-attachments/assets/effb0a15-75a3-49a5-b633-a2b1049f43a9" />


---

## ✨ What it does

Nine sections covering everything a real school website needs — built to feel complete, not templated.

| Section | Details |
|---|---|
| **Home** | Landing hero, school highlights |
| **About** | School history, mission, facilities |
| **Admissions** | Working admission form — sends real emails on submit |
| **Contact** | Contact form wired to backend, plus school location |
| **Gallery / Academics / etc.** | Additional informational sections |

Runs at a **100 PageSpeed score** — images converted to WebP, accessibility fixes applied, performance tuned.

## 🛠️ How it's built

- **Frontend** — React + TypeScript, built with Vite, deployed on Vercel
- **Backend** — Express + TypeScript API, deployed on Render, handles email sending
- **Email** — Backend integrates with Brevo's email API for admission/contact form submissions
- **Styling** — Responsive layout, optimized images, accessibility-first markup

## 📁 Project structure

```
.
├── src/                 # React frontend source
├── artifacts/
│   └── api-server/      # Express backend
├── school-website/       # frontend build assets
├── package.json
└── render.yaml           # Render deployment config
```

## 🚀 Run it locally

```
git clone https://github.com/mahakGoyat/SS-Bal-sadan.git
cd SS-Bal-sadan
npm install
```

Copy `.env.example` to `.env` and fill in your own values, then:

```
npm run dev
```

## 📄 License

Built by [Mahak Goyat](https://github.com/mahakGoyat)
