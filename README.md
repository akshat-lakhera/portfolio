# 🚀 3D Developer Portfolio — Akshat Lakhera

An interactive, high-performance 3D developer portfolio built with **React 18**, **Three.js**, **GSAP ScrollTrigger**, and **TypeScript**. Features an animated 3D character with real-time head tracking and typing postures, hardware-accelerated physics, smooth document scrolling, and an automated 3D Card-Shuffle showcase featuring 8 verified projects.

![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.x-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

---

## ✨ Core Features

- **Interactive 3D Character**:
  - Encrypted GLTF model with Draco compression and Web Crypto API runtime decryption.
  - Interactive mouse/cursor tracking with smooth head and eye articulation.
  - Dual animation states: hero standing posture transitioning to a seated workstation typing posture as the page scrolls.
  - Positioned and scaled with ample breathing room to prevent obscuring typography.
  - Clean upward fade-out as the user exits the introductory sections.
- **Synchronized Scroll Physics**:
  - GSAP ScrollTrigger and ScrollSmoother timelines controlling camera perspective, light sweeps, and character placement across sections.
- **Automated 3D Card-Shuffle Deck**:
  - Automated 3.5s card shuffle with elastic physics curves and perspective depth (`preserve-3d`).
  - Staggered depth layering and pause-on-hover inspection.
  - Synchronized left-panel project metadata, status indicators, and direct GitHub links.
  - Manual navigation arrows (`←` / `→`) and card-click support.
- **Interactive Tech Stack Physics**:
  - Physical 3D bouncing spheres with collision solvers and material shaders.
- **Engineered for Speed**:
  - Sub-400ms asset boot time with immediate progress resolution.
  - Viewport pixel-ratio clamping (`Math.min(window.devicePixelRatio, 1.5)`) preventing GPU fill-rate throttling on high-DPI/Retina screens.
  - High-efficiency production build generating in under 2 seconds.

---

## 🛠️ Verified Projects Showcased

1. **Vaani — Voice-Enabled Hindi RAG**
   - *Speech AI & Retrieval Systems*: Asynchronous voice-enabled Hindi retrieval service built under 48-hour sprint deadlines for HH Goa 2026, handling audio intake, vector query routing, and automated health checks.
   - *Tech*: FastAPI, PyTest, AsyncIO, Vector RAG, HH Goa 2026
   - [Repository](https://github.com/akshat-lakhera)

2. **DevDash — Native Database Platform**
   - *Native Systems Engineering*: High-performance native desktop database management system featuring AST query validation shields, schema visualizers, and instant multi-engine connection pooling.
   - *Tech*: Tauri 2.0, Rust, React, TypeScript, PostgreSQL, SQLite
   - [Repository](https://github.com/akshat-lakhera/DevDash)

3. **MarketScout (Scrapper) — Data Extraction**
   - *Backend & Data Extraction*: High-throughput web data extraction platform engineered with modular scrapers, robust SQLite/SQLAlchemy data persistence, and a 66-test PyTest test suite.
   - *Tech*: Python, FastAPI, SQLAlchemy, Pydantic, 66 PyTest Suite
   - [Repository](https://github.com/akshat-lakhera)

4. **Hopper v2 — Real-Time Student Matching**
   - *Distributed Full-Stack & WebRTC*: Verified academic real-time student matchmaking network featuring peer-to-peer WebRTC video/voice signaling, Redis queues, and Fastify concurrency.
   - *Tech*: Next.js 16, Fastify 5, WebRTC, Socket.IO, Redis, PostgreSQL, Prisma
   - [Repository](https://github.com/akshat-lakhera)

5. **Hacker House Goa — 3D Lanyard & Pass**
   - *Interactive 3D WebGL & Physics*: Official 3D interactive lanyard pass generator for Hacker House Goa 2026 attendees featuring harmonic spring physics, dual-side card rendering, and one-click X sharing.
   - *Tech*: React, Three.js, React Three Fiber, Harmonic Springs, Vite
   - [Repository](https://github.com/akshat-lakhera/ID_HHG)

6. **Keystroke Lab — Zero-Latency Typing Engine**
   - *High-Frequency Frontend Systems*: Sub-millisecond latency typing performance lab measuring raw CPM, accuracy telemetry, burst consistency, and custom audio mechanical switch synthesis.
   - *Tech*: React 18, TypeScript, Vite, Web Audio API, Tailwind CSS
   - [Repository](https://github.com/akshat-lakhera)

7. **DeepGuard AI — Deepfake Detection Engine**
   - *Computer Vision & Deep Learning*: Deep learning multimodal detection system evaluating spatial facial anomalies and temporal sequence consistency across manipulated video feeds.
   - *Tech*: Python, PyTorch, TensorFlow, Gradio, Docker
   - [Repository](https://github.com/akshat-lakhera/DEEPFAKE)

8. **Outreach RAG — AI Cold Mailer Automation**
   - *NLP & Autonomous Outreach*: Autonomous recruitment & cold outreach engine using ChromaDB semantic vector search and flexible LLM backend prompting for personalized email drafting.
   - *Tech*: Python, ChromaDB Vector Store, Semantic Search, RAG Pipelines
   - [Repository](https://github.com/akshat-lakhera)

---

## 👨‍💻 Developer Profile

- **Name**: Akshat Lakhera
- **Focus**: Python & Systems Development | AI & Machine Learning
- **Education**: B.Tech in Artificial Intelligence & Machine Learning, LNCT Bhopal (*2024–2028, GPA: 7.43 / 10*)
- **Honors & Milestones**:
  - Second Round Qualifier, EY Techathon 6.0 (Ernst & Young)
  - Certified in Machine Learning & AI, Internshala (2025)
  - HH Goa 2026 Hackathon Developer
- **GitHub**: [github.com/akshat-lakhera](https://github.com/akshat-lakhera)
- **LinkedIn**: [linkedin.com/in/gen-z-coder](https://www.linkedin.com/in/gen-z-coder/)
- **Email**: [akshatlakhera50@gmail.com](mailto:akshatlakhera50@gmail.com)
- **Résumé Status**: *Available on request* (`akshatlakhera50@gmail.com`)

---

## 💻 Tech Stack

- **Frontend**: React 18, TypeScript, Vanilla CSS
- **3D & Animation**: Three.js, `@react-three/fiber`, `@react-three/rapier`, GSAP, ScrollTrigger, ScrollSmoother, SplitText
- **Asset Pipeline**: Draco 3D decoder, Web Crypto AES-256-CBC decryption, Vite 8

---

## ⚡ Quick Start

### Prerequisites
- **Node.js**: `v18+` or `v20+`
- **npm**: `v9+`

### Installation

```bash
# Clone the repository
git clone https://github.com/GUNPARK-GOOKIM/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The portfolio will be available at `http://127.0.0.1:5173/`.

### Production Build

```bash
# Type-check and bundle production assets
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License

MIT License © 2026 Akshat Lakhera
