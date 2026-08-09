import React from 'react';
import { useScrollReveal } from '../utils/ScrollObserver';
import { bioData } from '../data/bioData';

export const AboutSection: React.FC = () => {
  const ref = useScrollReveal();

  return (
    <section className="py-24 relative bg-[#030303]" id="about" ref={ref}>
      <div className="max-w-[920px] mx-auto px-6">
        <span className="font-body text-[11px] uppercase tracking-[0.3em] text-[#c9962a] block reveal">
          ABOUT
        </span>
        <h2 className="font-display italic font-normal text-[clamp(2rem,5vw,3rem)] text-[rgba(255,255,255,0.88)] leading-[1.3] mt-10 max-w-[16ch] reveal tracking-[0.01em]">
          I build systems where the hard parts matter — latency, correctness, scale, reasoning.
        </h2>
        <p className="font-body text-[clamp(15px,2vw,17px)] leading-[1.7] text-[rgba(255,255,255,0.55)] max-w-[640px] mt-[clamp(40px,6vw,64px)] reveal">
          {bioData.bio}
        </p>

        {/* Experience List */}
        <div className="mt-16 flex flex-col gap-14">
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 reveal">
            <div className="font-body text-[13px] tracking-[0.15em] uppercase text-[rgba(255,255,255,0.35)] md:w-[180px] pt-2 shrink-0">
              2024 – Present
            </div>
            <div className="flex-1">
              <div className="font-display text-[clamp(1.6rem,3.5vw,2rem)] text-[#c9962a] leading-[1.15]">
                {bioData.education[0].institution}
              </div>
              <div className="font-body text-[14px] text-[rgba(255,255,255,0.55)] mt-1">
                {bioData.education[0].degree}
              </div>
              <p className="font-body text-[15px] leading-[1.7] text-[rgba(255,255,255,0.88)] mt-5 max-w-[540px]">
                {bioData.education[0].highlights.join(' • ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
