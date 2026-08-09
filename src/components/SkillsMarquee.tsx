import React from 'react';
import { useScrollReveal } from '../utils/ScrollObserver';

const LANGUAGES = ['Python', 'C++', 'C', 'Java', 'JavaScript', 'TypeScript', 'SQL'];
const TECHNOLOGIES = ['React', 'Next.js', 'Node.js', 'FastAPI', 'Kafka', 'REST APIs', 'PostgreSQL', 'MongoDB', 'Redis', 'LangGraph', 'RAG', 'Agentic AI'];
const FOUNDATIONS = ['Data Structures', 'Algorithms', 'Operating Systems', 'Computer Networks', 'Parallel Programming', 'Machine Learning', 'Distributed Systems'];

export const SkillsMarquee: React.FC = () => {
  const ref = useScrollReveal();

  const MarqueeRow = ({ items, duration, reverse = false, title }: { items: string[], duration: string, reverse?: boolean, title: string }) => (
    <div className="relative flex flex-col gap-3 my-8">
      <span className="block text-[11px] uppercase tracking-[0.3em] text-[#c9962a] pl-[max(24px,calc((100%-1080px)/2+24px))]">
        {title}
      </span>
      <div 
        className="relative overflow-hidden py-4 border-y border-[rgba(201,150,42,0.2)] bg-gradient-to-b from-[rgba(201,150,42,0.05)] to-[rgba(0,0,0,0.22)] backdrop-blur-md"
        style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, #000 5%, #000 95%, transparent)' }}
      >
        <div 
          className="marquee-track flex w-max" 
          style={{ animationDuration: duration, animationDirection: reverse ? 'reverse' : 'normal' }}
        >
          {/* Double the list for seamless loop */}
          <div className="flex items-center flex-nowrap shrink-0">
            {items.map((item, idx) => (
              <React.Fragment key={`group1-${idx}`}>
                <span className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-none tracking-[0.06em] uppercase text-[rgba(255,255,255,0.3)] px-1.5 transition-all duration-300 hover:text-[#f5b942] hover:drop-shadow-[0_0_24px_rgba(245,185,66,0.55)] cursor-default">
                  {item}
                </span>
                <span className="text-[rgba(201,150,42,0.45)] text-[0.66rem] mx-6 -translate-y-0.5">◈</span>
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center flex-nowrap shrink-0">
            {items.map((item, idx) => (
              <React.Fragment key={`group2-${idx}`}>
                <span className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-none tracking-[0.06em] uppercase text-[rgba(255,255,255,0.3)] px-1.5 transition-all duration-300 hover:text-[#f5b942] hover:drop-shadow-[0_0_24px_rgba(245,185,66,0.55)] cursor-default">
                  {item}
                </span>
                <span className="text-[rgba(201,150,42,0.45)] text-[0.66rem] mx-6 -translate-y-0.5">◈</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-24 relative overflow-hidden bg-[#030303]" ref={ref}>
      <div className="max-w-[1080px] mx-auto px-6 mb-12">
        <span className="font-body text-[11px] uppercase tracking-[0.3em] text-[#c9962a] block reveal">
          TECHNICAL STACK
        </span>
        <h2 className="font-display font-normal text-[clamp(2.25rem,5vw,3.5rem)] text-[rgba(255,255,255,0.88)] leading-[1.1] mt-2 reveal">
          The tools, and the theory.
        </h2>
      </div>

      <div className="relative mt-12 isolate reveal">
        {/* The Golden Center Spotlight */}
        <div className="skill-spotlight"></div>

        <MarqueeRow title="Languages" items={LANGUAGES} duration="30s" />
        <MarqueeRow title="Technologies" items={TECHNOLOGIES} duration="60s" reverse />
        <MarqueeRow title="CS Foundations" items={FOUNDATIONS} duration="42s" />
      </div>
    </section>
  );
};
