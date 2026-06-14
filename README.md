# ✨ Nova AI Agent

> A personal AI assistant built with React + Vite, powered by Groq's free Llama 3.3 70B model — made as a learning project.

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-Free_API-F55036?style=for-the-badge&logoColor=white)
![Llama](https://img.shields.io/badge/Llama_3.3-70B-7C6AF7?style=for-the-badge&logo=meta&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)
![Netlify](https://img.shields.io/badge/Netlify-Live-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

---

## 🌐 Live Demo

👉 **https://unrivaled-monstera-6eca17.netlify.app/**

---

## 🤖 What is Nova?

Nova is a fully functional AI chat agent that runs in your browser. It supports 8 different modes — from writing code to solving math problems — all powered by the Llama 3.3 70B model via Groq's free API. Built as a personal learning project to understand React, API integration, and modern UI design.

---

## ✨ Features

- 💬 **8 AI Modes** — Chat, Code, Math, Write, Explain, Translate, Summarize, Plan
- 🧠 **Conversation Memory** — remembers full chat context within a session
- 📝 **Markdown Rendering** — bold, code blocks, bullet points, headings
- ⚡ **Super Fast** — Groq is one of the fastest AI inference providers
- 🌙 **Dark Mode UI** — modern, clean dark design
- 💸 **100% Free** — no credit card, no paid API required
- 📱 **Mobile Friendly** — works on phone browsers too
- 🇮🇳 **Works in India** — unlike Gemini free tier

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Groq API | AI inference (free) |
| Llama 3.3 70B | The AI model |
| react-markdown | Markdown rendering |
| lucide-react | Icons |
| Netlify | Free hosting & deployment |

---

## 🚀 Run Locally

### Prerequisites
- [Node.js](https://nodejs.org) v18 or higher
- A free [Groq API key](https://console.groq.com)

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/Harshi115/Nova-agent.git
cd Nova-agent
```

**2. Install dependencies**
```bash
npm install
```

**3. Get your FREE Groq API key**
- Go to 👉 https://console.groq.com
- Sign up with Google
- Click **API Keys** → **Create API Key**
- Copy the key — starts with `gsk_...`

**4. Add your API key in `src/App.jsx` line 11**
```js
const GROQ_API_KEY = 'gsk_your_key_here'
```

**5. Start the app**
```bash
npm run dev
```

Open 👉 **http://localhost:5173** 🎉

---

## 📁 Project Structure

```
Nova-agent/
├── index.html          ← HTML entry point
├── package.json        ← Dependencies & scripts
├── vite.config.js      ← Vite configuration
└── src/
    ├── main.jsx        ← React app entry
    ├── App.jsx         ← Main agent logic & UI
    └── index.css       ← All styles
```

---

## 🤖 AI Modes

| Mode | What it does |
|---|---|
| 💬 Chat | General conversation & Q&A |
| 💻 Code | Write, explain & debug code in any language |
| 🔢 Math | Step-by-step problem solving |
| ✍️ Write | Essays, emails, stories, captions |
| 💡 Explain | Break down complex topics simply |
| 🌐 Translate | Multilingual translation with context |
| 📋 Summarize | Condense long content into key points |
| 📅 Plan | Structured roadmaps & action plans |

---

## 🔒 Security

- API key is stored locally in `src/App.jsx` only
- Never push your real API key to GitHub
- Replace key with placeholder before committing:
```js
const GROQ_API_KEY = 'YOUR_GROQ_API_KEY_HERE'
```

---

## 🎓 What I Learned Building This

- ✅ React functional components & JSX
- ✅ useState & useEffect hooks
- ✅ Async/await & Fetch API
- ✅ Calling AI APIs & managing conversation history
- ✅ CSS variables & modern dark UI design
- ✅ Vite build tool & project structure
- ✅ Git & GitHub workflow
- ✅ Deploying on Netlify

---

## 📄 License

MIT License — free to use, modify and share!

---

<div align="center">

Made with ❤️ by [Harshi115](https://github.com/Harshi115)

⭐ **Star this repo if you found it helpful!**

</div>
