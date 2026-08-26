# Component Source Audit

**Project**: BEYOND THE INTERFACE — Integrated Phase 1 Vertical Slice  
**Target Stack**: React 19 / 18, TypeScript, Vite, `motion/react`, Tailwind CSS v4, native browser scrolling  
**Date**: August 2026  

---

## 1. Candidate Components Evaluated

### Category A: Pinned Scroll Stages & Virtual Timelines

| Candidate | Source Location | Framework & Deps | License | Status | Technical Assessment |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A1. ScrollExpand** | `E:\ai-design-skills\react-bits\src\ts-tailwind\Animations\ScrollExpand\ScrollExpand.tsx` | React, TypeScript, Native DOM / CSS (Zero runtime deps) | MIT | **Candidate for Adaptation** | Provides a virtual track (`stageH * (1 + scrollDistance + holdDistance)`), a `sticky` inner stage (`top: 0; height: 100vh; overflow: hidden`), native window scrolling (`useWindowScroll`), rAF loop with exponential smoothing `1 - Math.exp(-1 / (60 * k))`, and built-in `prefers-reduced-motion` detection. Clean, lightweight, zero licensing issues. |
| **A2. Pinned Stage Contract** | `cinematic-scroll-prompt-kit/PROMPT.txt` | Native CSS + DOM / Motion | MIT | **Candidate for Adaptation** | Reusable 300vh–400vh virtual timeline architecture. Normalizes progress $p \in [0.0, 1.0]$. Uses `position: sticky; top: 0; height: 100vh; overflow: hidden; isolation: isolate`. Integrates cleanly with React and CSS perspective. |
| **A3. Showcase Pin** | `macbook-landing/src/components/Showcase.jsx` | React, GSAP (`gsap`, `ScrollTrigger`, `@gsap/react`), `react-responsive` | Unspecified | **REJECTED** | Relies on GSAP ScrollTrigger which conflicts with the Motion/React native requirement, lacks clear license headers, and uses fixed viewport hacks that break on mobile. |
| **A4. PinnedReveal** | `cinematic-scroll-skill/components/mode-b/pinned-reveal.tsx` | Next.js / React, GSAP ScrollTrigger | MIT | **REJECTED** | Hardcoded GSAP `ScrollTrigger` and `@gsap/react` dependency. |

---

### Category B: Scroll Progress & Camera Depth Zoom

| Candidate | Source Location | Framework & Deps | License | Status | Technical Assessment |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **B1. Motion Scroll Zoom** | `motion/react` (`useScroll`, `useTransform`) | React, `motion/react` | MIT | **SELECTED** | Native React scroll hooks mapping `scrollYProgress` across `[0, 0.35, 0.7, 1.0]` to hardware-accelerated transforms (`translateZ`, `scale`, `opacity`, `rotateX`). Eliminates React render-loop bottlenecks by updating compositor styles directly. Reversible out of the box. |
| **B2. rAF Custom Lerp Loop** | `E:\ai-design-skills\react-bits\src\ts-tailwind\Animations\ScrollExpand\ScrollExpand.tsx` | Vanilla JS / React Refs | MIT | **Candidate for Reference** | Excellent lightweight lerp implementation, but duplicating rAF alongside `motion/react` risks dual scroll tickers. We will adopt its sticky track measurement pattern while using `motion/react` for values. |
| **B3. GSAP Timeline Scrub** | `macbook-landing/src/components/Showcase.jsx` | GSAP | Unspecified | **REJECTED** | Violates constraint: "Do not combine Motion and GSAP for the same animation." |

---

### Category C: Layered 2.5D Depth & Exploded Planes

| Candidate | Source Location | Framework & Deps | License | Status | Technical Assessment |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **C1. HeroParallax Depth Model** | `cinematic-scroll-skill/components/mode-b/hero-parallax.tsx` | React, TypeScript (GSAP in original) | MIT | **ADAPTED to Motion** | Defines structured `ParallaxPlane` types with discrete depth multipliers (`depth: 0.16, 0.34, 0.62`), z-index layering, mobile plane culling (`hideOnMobile`), and accessible semantic text hierarchy. We adapt this structure to Motion React `motion.div` and CSS 3D perspective (`translateZ`). |
| **C2. 2.5D Layer Stack** | `cinematic-scroll-prompt-kit/examples/assets.example.json` | JSON Schema / Architectural Spec | MIT | **ADOPTED** | Architectural model separating scenes into Background Plane, Midground Planes (exploded architecture), Foreground Monolith (Surface), and Gateway Portal. |
| **C3. PaperTransition** | `portfolio-itom/src/components/dom/PaperTransition.jsx` | React, GSAP, CSS | MIT | **REJECTED** | Built specifically for Three.js scene wipe; tightly coupled to ITom's room-switching architecture. |

---

### Category D: Typography & Entrance Reveals

| Candidate | Source Location | Framework & Deps | License | Status | Technical Assessment |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **D1. BlurText** | `E:\ai-design-skills\react-bits\src\ts-tailwind\TextAnimations\BlurText\BlurText.tsx` | React, TypeScript, `motion/react` | MIT | **ADAPTED** | Built natively with `import { motion } from 'motion/react'`. Staggers word/character entrance via `IntersectionObserver`. **Adaptation**: Remove `filter: blur()` to strictly follow taste guardrail §1.1 ("Never animate blur during scroll") and replace with compositor-safe `opacity` + `translateY` stagger. |
| **D2. SplitText** | `E:\ai-design-skills\react-bits\src\ts-tailwind\TextAnimations\SplitText\SplitText.tsx` | React, `gsap/SplitText` | Commercial / Club GreenSock | **REJECTED** | Requires commercial GreenSock plugin `SplitText` with license restrictions. |
| **D3. KineticHeadline** | `cinematic-scroll-skill/components/mode-b/kinetic-headline.tsx` | React, GSAP | MIT | **REJECTED** | Requires GSAP runtime. |

---

### Category E: Navigation & Skip Links

| Candidate | Source Location | Framework & Deps | License | Status | Technical Assessment |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **E1. Floating NavBar** | `macbook-landing/src/components/NavBar.jsx` | React, Semantic HTML | Unspecified | **ADAPTED** | Clean, minimal header structure with logo and nav anchor links. We adapt this into an accessible glassmorphism pill with `aria-current`, visible focus rings, and direct skip links. |
| **E2. PillNav** | `E:\ai-design-skills\react-bits\src\ts-tailwind\Components\PillNav\PillNav.tsx` | React, `react-router-dom`, `gsap` | MIT | **REJECTED** | Overly heavy (477 lines), requires `react-router-dom` and GSAP timeline physics. |

---

### Category F: Project Showcase & Presentation

| Candidate | Source Location | Framework & Deps | License | Status | Technical Assessment |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **F1. Modular Project Card** | `neeraj-portfolio/src/components/` & `src/data/projectsData.ts` | React, TypeScript, Tailwind CSS | MIT | **ADAPTED** | Clean editorial card layout with category badges, problem/architecture summaries, technical tags, verified live/repo links, and zero telemetry fluff. |
| **F2. TiltCard** | `cinematic-scroll-skill/components/mode-b/tilt-card.tsx` | React, Pointer events | MIT | **REJECTED for Hero** | Interactive tilt is not appropriate for the primary editorial hero surface (violates restraint rule); can be used only for subtle micro-interactions on project cards if needed. |

---

## 2. Licensing & Compatibility Summary

All selected components are under permissive **MIT License**. No commercial GSAP plugins (`SplitText`, `ScrollSmoother`), no proprietary code, and no restricted dependencies are included.
All selected components use or will be adapted to:
- `react`: `^19.2.8` / `^18.x`
- `typescript`: `~6.0.2`
- `motion/react`: from installed motion package
- `tailwindcss`: `^4.3.3`
