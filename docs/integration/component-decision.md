# Component Decision Record

**Project**: BEYOND THE INTERFACE — Integrated Phase 1 Vertical Slice  
**Architecture Principle**: Assemble & Adapt Existing Components; No Rebuilding From Scratch  
**Date**: August 2026  

---

## 1. Selected Components & Integration Roles

| Category | Selected Component | Source & Author | License | Adaptation Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Pinned Stage Mechanism** | `ScrollExpand` pinned track pattern + `cinematic-scroll-prompt-kit` virtual stage | `react-bits` (`ScrollExpand.tsx`) & `cinematic-scroll-prompt-kit` | MIT | Adapt the pinned virtual scroll container (`300vh` scroll distance, inner `sticky` stage `top: 0; height: 100vh; overflow: hidden; isolation: isolate`). Replaces custom scroll-jacking with native browser scroll. |
| **Scroll Progress & Camera Depth** | Motion React `useScroll` + `useTransform` | `motion/react` (Motion React team) | MIT | Attach `useScroll` to the pinned container ref. Transform `scrollYProgress` to camera Z-translation (`translateZ: [0px, 850px]`), stage opacity curves, and layer separation offsets. Deterministic and natively reversible. |
| **2.5D Layered Depth** | `HeroParallax` depth plane model | `cinematic-scroll-skill` (`components/mode-b/hero-parallax.tsx`) | MIT | Adapt `ParallaxPlane` model (discrete Z-depths, mobile culling `hideOnMobile`, accessible text structure) to pure CSS 3D perspective (`perspective: 1200px; transform-style: preserve-3d`) and `motion.div` transforms, removing GSAP dependencies. |
| **Typography & Reveal** | `BlurText` word/character stagger (filter-free) | `react-bits` (`BlurText.tsx`) | MIT | Adapt `BlurText` to run via `motion/react`. Strip out the CSS `filter: blur()` to satisfy taste guardrail §1.1 ("Never animate blur during scroll"), leaving clean, compositor-accelerated `opacity` and `translateY` entrance animation. |
| **Scene Navigation & Controls** | Adapted Minimalist Floating Nav | `macbook-landing` (`NavBar.jsx`) | MIT / Permissive | Wrap semantic anchor navigation in an accessible, low-opacity matte glass pill (`backdrop-filter: blur(8px); background: rgba(28, 27, 24, 0.75)`), with `aria-current`, visible focus rings, and direct skip links. |
| **Project Showcase Cards** | Modular Editorial Project Presentation | `neeraj-portfolio/src/components/` & local `projectsData.ts` | MIT | Adapt into clean editorial card layouts with problem, architecture, verified tech tags, honest deployment status, and verified URLs. |

---

## 2. Rejected Alternatives & Reasons

| Category | Rejected Candidate | Source | Rejection Rationale |
| :--- | :--- | :--- | :--- |
| **Pinned Stage** | `Showcase` ScrollTrigger | `macbook-landing` | Requires `gsap` + `ScrollTrigger` and fixed layout coordinates that fail on mobile. |
| **Scroll Progress** | Custom rAF ticker loop | Custom / In-house | Duplicating an rAF ticker alongside `motion/react` introduces multi-loop contention and frame drops. |
| **Layered Depth** | Three.js / WebGL Room Corridor | `portfolio-itom` | Phase 1 strictly forbids Three.js/WebGL; DOM CSS perspective achieves instant paint with zero GPU context overhead. |
| **Typography** | `SplitText` | `react-bits` | Requires commercial GreenSock Club plugin `SplitText`. |
| **Typography** | `KineticHeadline` | `cinematic-scroll-skill` | Hardcoded GSAP matchMedia and ScrollTrigger. |
| **Navigation** | `PillNav` | `react-bits` | 477 lines of complex GSAP physics and `react-router-dom` dependency; oversized for a single-page portfolio. |
| **Visual Effects** | Glassmorphism on Hero Surface | Common AI templates | Strictly forbidden: Main hero surface must remain matte editorial graphite. Glassmorphism allowed only for compact navigation pills. |

---

## 3. Thin Integration Architecture

```text
src/
├── App.tsx                              <-- Shell assembling navigation, stage, and semantic sections
├── main.tsx                             <-- Standard React 19 / 18 entry
├── content/
│   ├── profile.ts                       <-- Verified Akshat Lakhera bio, education, links
│   ├── projects.ts                      <-- 5 verified projects with honest evidence status
│   └── skills.ts                        <-- Categorized engineering capabilities
├── components/
│   ├── IntegratedCinematicStage.tsx     <-- Thin integration wrapper coordinating adapted components
│   ├── SkipLink.tsx                     <-- Accessible jump directly to #projects
│   ├── StoryNavigation.tsx              <-- Compact floating navigation pill with aria-current
│   ├── ProjectsSection.tsx              <-- Semantic project cards outside/after pinned stage
│   ├── AboutSection.tsx                 <-- Verified education & systems engineering focus
│   ├── ContactSection.tsx               <-- Direct GitHub, LinkedIn, and email contact
│   └── integrations/
│       ├── AdaptedPinnedStage.tsx       <-- Adapted ScrollExpand / Prompt-Kit sticky container
│       ├── AdaptedLayeredPlanes.tsx     <-- Adapted HeroParallax depth plane stack
│       └── AdaptedTextReveal.tsx        <-- Adapted BlurText (filter-free compositor stagger)
├── hooks/
│   └── useReducedMotion.ts              <-- Native prefers-reduced-motion hook
└── styles/
    ├── tokens.css                       <-- Warm graphite, soft ivory, amber accent tokens
    └── index.css                        <-- Global reset, typography, and 3D perspective rules
```

---

## 4. Verification Evidence & Truthful Data Contract

- **User**: Akshat Lakhera
- **Role**: CSE AI-ML Student & Software Developer
- **Education**: B.Tech in Computer Science & Engineering (AI-ML), 2024–Present
- **Résumé Status**: "Résumé coming soon / Available on request" (Honest undergraduate status; no fabricated PDF or claims).
- **Projects (5 Verified)**:
  1. `DevDash`: Native Database Engineering Platform (Rust, Tauri 2.0, React, PostgreSQL, SQLite, Ollama LLM)
  2. `OpenOnyx`: Local-First AI Knowledge Workspace (Electron, React 19, TypeScript, D3.js, Transformers.js)
  3. `Keystroke Lab`: High-Performance Typing Diagnostics Engine (React, Vite, TypeScript, Web Audio API)
  4. `Hopper v2`: Verified Student Real-Time Matchmaking Platform (Next.js 16, Fastify 5, Socket.IO, WebRTC, Redis)
  5. `DEEPFAKE`: Real-Time AI Deepfake Detection Engine (Python, PyTorch, Computer Vision, Transformers)
