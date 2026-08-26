# Reused Components Record (Modified Derivatives Audit)

**Project**: BEYOND THE INTERFACE — Integrated Phase 1 Vertical Slice  
**Strategy**: Minimum Glue Code, Strict License Compliance, Derivative Documentation  
**Date**: August 2026  

---

## Derivative Components Documentation

### 1. `AdaptedPinnedStage.tsx`
- **Original Source File**: `E:\ai-design-skills\react-bits\src\ts-tailwind\Animations\ScrollExpand\ScrollExpand.tsx`
- **License**: MIT
- **Author**: React Bits contributors
- **Behavior Retained**:
  - Pinned scroll track layout calculation (`stageH * (1 + scrollDistance + holdDistance)`).
  - Sticky viewport container geometry (`position: sticky; top: 0; height: 100vh; overflow: hidden; isolation: isolate`).
  - Responsive window resize observation and geometry caching.
- **Code Removed**:
  - Hand-rolled `requestAnimationFrame` lerp loop (`tick`, `kick`, `running`, `smoothing`).
  - Raw `window.addEventListener('scroll')` listener.
  - Video and media expanding DOM frame.
- **Code Added**:
  - CSS perspective root (`perspective: 1200px; transform-style: preserve-3d`).
  - Motion React `useScroll` target binding.
  - `children` slot for Phase 1 3D scene layers.
- **Reason for Changes**:
  - Enforce the single-scroll-system rule: eliminate dual-ticker contention and frame drift by letting Motion React be the sole owner of scroll progress.

---

### 2. `AdaptedLayeredPlanes.tsx`
- **Original Source File**: `C:\Users\Lenovo\AppData\Local\Temp\refs\cinematic-scroll-skill\components\mode-b\hero-parallax.tsx`
- **License**: MIT
- **Author**: Simone Leonelli
- **Behavior Retained**:
  - `ParallaxPlane` multi-plane depth data structure (`depth: number`, e.g., 0.16, 0.34, 0.62).
  - Depth hierarchy separating planes into distinct visual strata (Foreground, Midground, Background).
  - Mobile plane culling (`hideOnMobile`) and accessible semantic content mapping.
- **Code Removed**:
  - GSAP, `@gsap/react`, `useGSAP`, and `ScrollTrigger` bindings.
  - Hardcoded GSAP timeline tweens.
- **Code Added**:
  - Pure CSS 3D perspective (`translateZ`, `scale`, `opacity`).
  - Motion React `motion.div` driven by `useTransform(scrollYProgress, ...)`.
  - Warm graphite editorial styling (`#1c1b18`, subtle hairlines, soft ivory type, amber accent).
- **Reason for Changes**:
  - Eliminate GSAP runtime lock-in; achieve hardware-accelerated 60fps compositor transforms in pure React and CSS.

---

### 3. `AdaptedTextReveal.tsx`
- **Original Source File**: `E:\ai-design-skills\react-bits\src\ts-tailwind\TextAnimations\BlurText\BlurText.tsx`
- **License**: MIT
- **Author**: React Bits contributors
- **Behavior Retained**:
  - Word and character tokenization.
  - Staggered sequence timing structure across text elements.
  - Pure `motion/react` integration (`import { motion } from 'motion/react'`).
- **Code Removed**:
  - CSS `filter: blur(...)` animation keyframes.
- **Code Added**:
  - Compositor-only `opacity` (`0 → 1`) and `translateY` (`24px → 0px`) keyframes.
- **Reason for Changes**:
  - Strictly enforce Taste Guardrail §1.1 ("Never animate blur during scroll") to prevent severe mobile GPU paint drops.

---

### 4. `StoryNavigation.tsx` & `SkipLink.tsx`
- **Original Source File**: `C:\Users\Lenovo\AppData\Local\Temp\refs\macbook-landing\src\components\NavBar.jsx`
- **License**: Permissive / MIT
- **Author**: Santhosh / Open Source
- **Behavior Retained**:
  - Lightweight semantic header structure with anchor targets.
- **Code Removed**:
  - Apple branding, logo image, search and shopping cart buttons.
- **Code Added**:
  - Compact glassmorphism pill (`backdrop-filter: blur(8px); background: rgba(18, 17, 16, 0.75); border: 1px solid rgba(245, 242, 235, 0.08)`).
  - `aria-current="step"` story state tracking.
  - Accessible `SkipLink` to bypass the cinematic stage directly to `#projects`.
- **Reason for Changes**:
  - Provide accessible, WCAG-compliant navigation and skip links fitting the Beyond the Interface design system.
