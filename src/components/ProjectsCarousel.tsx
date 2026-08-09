import React, { useRef } from 'react';
import { useScrollReveal } from '../utils/ScrollObserver';
import { projectsData } from '../data/projectsData';

export const ProjectsCarousel: React.FC = () => {
  const ref = useScrollReveal();
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.querySelector('.proj-card')?.clientWidth || 400;
      trackRef.current.scrollBy({ left: -(cardWidth + 32), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      const cardWidth = trackRef.current.querySelector('.proj-card')?.clientWidth || 400;
      trackRef.current.scrollBy({ left: cardWidth + 32, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 relative bg-[#0a0807]" ref={ref}>
      <div className="max-w-[1240px] mx-auto px-6">
        <span className="font-body text-[11px] uppercase tracking-[0.3em] text-[#c9962a] block reveal">
          SELECTED WORK
        </span>
        <h2 className="font-display font-normal text-[clamp(2.25rem,5vw,3.5rem)] text-[rgba(255,255,255,0.88)] leading-[1.1] mt-2 reveal">
          Projects that taught me something.
        </h2>

        <div className="relative mt-12 reveal">
          <div className="flex justify-end gap-3 mb-6">
            <button 
              onClick={scrollLeft}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-transparent border border-[rgba(201,150,42,0.15)] text-[#c9962a] text-lg hover:border-[#c9962a] hover:text-[#f5b942] transition-colors"
              aria-label="Previous project"
            >
              ←
            </button>
            <button 
              onClick={scrollRight}
              className="w-11 h-11 rounded-full flex items-center justify-center bg-transparent border border-[rgba(201,150,42,0.15)] text-[#c9962a] text-lg hover:border-[#c9962a] hover:text-[#f5b942] transition-colors"
              aria-label="Next project"
            >
              →
            </button>
          </div>

          <div 
            ref={trackRef}
            className="proj-grid pb-12"
          >
            {projectsData.map((proj) => (
              <article 
                key={proj.id} 
                className="proj-card bg-[#0a0807] border border-[rgba(201,150,42,0.15)] rounded flex flex-col min-h-[360px] p-8 md:p-9 transition-all duration-400 hover:-translate-y-3 hover:border-[#c9962a] hover:shadow-[0_24px_48px_-16px_rgba(201,150,42,0.25)]"
              >
                <div className="font-body text-[10px] uppercase tracking-[0.2em] text-[#c9962a] opacity-80 mb-4">
                  {proj.tags.slice(0, 4).join(' / ')}
                </div>
                <h3 className="font-display text-[1.625rem] text-[rgba(255,255,255,0.88)] leading-[1.2] mb-4">
                  {proj.title}
                </h3>
                <p className="font-body text-[14px] leading-[1.65] text-[rgba(255,255,255,0.55)] flex-grow">
                  {proj.longDescription}
                </p>
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-[rgba(255,255,255,0.05)]">
                  <span className="font-body text-[11px] uppercase tracking-[0.15em] text-[rgba(255,255,255,0.35)]">
                    {proj.status}
                  </span>
                  <a 
                    href={proj.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-body text-[11px] uppercase tracking-[0.2em] text-[#c9962a] hover:text-[#f5b942] transition-colors"
                  >
                    VIEW →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
