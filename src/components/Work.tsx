import { useState, useRef } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import CardSwap, { Card, type CardSwapRef } from "./CardSwap/CardSwap";

const projects = [
  {
    title: "Vaani — Voice-Enabled Hindi RAG",
    category: "Speech AI & Retrieval Systems",
    tools: "FastAPI, PyTest, AsyncIO, Vector RAG, HH Goa 2026",
    image: "/images/projects/vaani.png",
    link: "https://github.com/akshat-lakhera",
    status: "Hackathon Team Project",
    description:
      "Asynchronous voice-enabled Hindi retrieval service built under 48-hour sprint deadlines for HH Goa 2026, handling audio intake, vector query routing, and automated health checks.",
  },
  {
    title: "DevDash — Native Database Platform",
    category: "Native Systems Engineering",
    tools: "Tauri 2.0, Rust, React, TypeScript, PostgreSQL, SQLite",
    image: "/images/projects/devdash.png",
    link: "https://github.com/akshat-lakhera/DevDash",
    status: "Active Personal Project",
    description:
      "High-performance native desktop database management system featuring AST query validation shields, schema visualizers, and instant multi-engine connection pooling.",
  },
  {
    title: "MarketScout (Scrapper) — Data Extraction",
    category: "Backend & Data Extraction",
    tools: "Python, FastAPI, SQLAlchemy, Pydantic, 66 PyTest Suite",
    image: "/images/projects/marketscout.png",
    link: "https://github.com/akshat-lakhera",
    status: "Active Personal Project",
    description:
      "High-throughput web data extraction platform engineered with modular scrapers, robust SQLite/SQLAlchemy data persistence, and a 66-test PyTest test suite.",
  },
  {
    title: "Hopper v2 — Real-Time Student Matching",
    category: "Distributed Full-Stack & WebRTC",
    tools: "Next.js 16, Fastify 5, WebRTC, Socket.IO, Redis, PostgreSQL",
    image: "/images/projects/hopper.jpg",
    link: "https://github.com/akshat-lakhera",
    status: "Production Monorepo",
    description:
      "Verified academic real-time student matchmaking network featuring peer-to-peer WebRTC video/voice signaling, Redis queues, and Fastify concurrency.",
  },
  {
    title: "Hacker House Goa — 3D Lanyard & Pass",
    category: "Interactive 3D WebGL & Physics",
    tools: "React, Three.js, React Three Fiber, Harmonic Springs, Vite",
    image: "/images/projects/hhg.jpg",
    link: "https://github.com/akshat-lakhera/ID_HHG",
    status: "Official Event WebApp",
    description:
      "Official 3D interactive lanyard pass generator for Hacker House Goa 2026 attendees featuring harmonic spring physics, dual-side card rendering, and one-click X sharing.",
  },
  {
    title: "Keystroke Lab — Zero-Latency Typing Engine",
    category: "High-Frequency Frontend Systems",
    tools: "React 18, TypeScript, Vite, Web Audio API, Tailwind CSS",
    image: "/images/projects/keystroke.png",
    link: "https://github.com/akshat-lakhera",
    status: "Active Personal Project",
    description:
      "Sub-millisecond latency typing performance lab measuring raw CPM, accuracy telemetry, burst consistency, and custom audio mechanical switch synthesis.",
  },
  {
    title: "DeepGuard AI — Deepfake Detection Engine",
    category: "Computer Vision & Deep Learning",
    tools: "Python, PyTorch, TensorFlow, Gradio, Docker",
    image: "/images/projects/deepguard.png",
    link: "https://github.com/akshat-lakhera/DEEPFAKE",
    status: "Research Experiment",
    description:
      "Deep learning multimodal detection system evaluating spatial facial anomalies and temporal sequence consistency across manipulated video feeds.",
  },
  {
    title: "Outreach RAG — AI Cold Mailer Automation",
    category: "NLP & Autonomous Outreach",
    tools: "Python, ChromaDB Vector Store, Semantic Search, RAG Pipelines",
    image: "/images/projects/coldmailer.jpg",
    link: "https://github.com/akshat-lakhera",
    status: "Active Personal Project",
    description:
      "Autonomous recruitment & cold outreach engine using ChromaDB semantic vector search and flexible LLM backend prompting for personalized email drafting.",
  },
];

const Work = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardSwapRef = useRef<CardSwapRef>(null);

  const activeProject = projects[activeIndex];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Verified <span>Projects</span>
        </h2>

        <div className="work-deck-layout">
          {/* Left Column: Active Project Details & Controls */}
          <div className="work-details-panel">
            <div className="work-header-meta">
              <div className="work-badge-indicator">
                <span className="pulse-dot"></span>
                <span>{activeProject.status}</span>
              </div>
            </div>

            <div className="work-number-display">
              <h3>0{activeIndex + 1}</h3>
              <span className="work-total-count">/ 0{projects.length}</span>
            </div>

            <h3 className="work-project-title">{activeProject.title}</h3>
            <p className="work-project-category">{activeProject.category}</p>

            <p className="work-project-description">
              {activeProject.description}
            </p>

            <div className="work-tools-box">
              <span className="tools-label">Tools & Architecture</span>
              <p className="tools-content">{activeProject.tools}</p>
            </div>

            <div className="work-actions-row">
              <a
                href={activeProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-repo-btn"
                data-cursor="disable"
              >
                View Repository ↗
              </a>

              <div className="work-nav-arrows">
                <button
                  className="deck-nav-btn"
                  onClick={() => cardSwapRef.current?.prev()}
                  aria-label="Previous card"
                  title="Shuffle previous card"
                  data-cursor="disable"
                >
                  <MdArrowBack />
                </button>
                <button
                  className="deck-nav-btn"
                  onClick={() => cardSwapRef.current?.next()}
                  aria-label="Next card"
                  title="Shuffle next card"
                  data-cursor="disable"
                >
                  <MdArrowForward />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Automated Card-Swap Deck */}
          <div className="work-deck-wrapper">
            <CardSwap
              ref={cardSwapRef}
              width={540}
              height={380}
              cardDistance={35}
              verticalDistance={30}
              delay={3500}
              pauseOnHover={true}
              skewAmount={2}
              easing="elastic"
              onCardChange={(idx) => setActiveIndex(idx)}
            >
              {projects.map((proj, idx) => (
                <Card key={idx} customClass="project-deck-card">
                  <div className="card-top-bar">
                    <div className="card-status-dot"></div>
                    <span className="card-number">0{idx + 1}</span>
                    <span className="card-category-tag">{proj.category}</span>
                  </div>

                  <div className="card-image-stage">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="card-preview-img"
                    />
                    <div className="card-image-gradient"></div>
                  </div>

                  <div className="card-bottom-bar">
                    <div className="card-title-group">
                      <h5>{proj.title}</h5>
                      <span className="card-tools-summary">{proj.tools}</span>
                    </div>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-quick-link"
                      data-cursor="disable"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Repo ↗
                    </a>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
