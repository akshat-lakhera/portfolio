import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuroraBackground } from '../react-bits/AuroraBackground';
import { DecryptedText } from '../react-bits/DecryptedText';
import { SplitText } from '../react-bits/SplitText';
import { SpotlightCard } from '../react-bits/SpotlightCard';
import { MagnetButton } from '../react-bits/MagnetButton';
import { logger } from '../../lib/contracts';

interface LaunchIntroUIProps {
  onEnterSpace: () => void;
}

export const LaunchIntroUI: React.FC<LaunchIntroUIProps> = ({ onEnterSpace }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLaunchClick = () => {
    logger.log('info', 'LaunchIntroUI', 'LaunchButtonClicked');
    setIsPlayingVideo(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 100);
  };

  const handleVideoEnded = () => {
    logger.log('info', 'LaunchIntroUI', 'VideoEndedCompleted');
    onEnterSpace();
  };

  return (
    <AuroraBackground className="w-full h-full relative overflow-hidden flex flex-col justify-between items-center z-50">
      {/* Video Background (Plays ONLY when Launch Button is clicked) */}
      {isPlayingVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full z-10"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/textures/intro.mp4"
            autoPlay
            playsInline
            onEnded={handleVideoEnded}
          />

          {/* Skip Button during Video Playback */}
          <MagnetButton
            onClick={onEnterSpace}
            className="absolute top-8 right-8 z-30"
          >
            <div className="bg-[#070a0f]/80 backdrop-blur-md border border-amber-400/30 text-amber-200 font-mono text-[11px] px-5 py-2.5 rounded-full tracking-widest uppercase hover:bg-amber-400 hover:text-black transition-all shadow-xl">
              SKIP INTO COSMOS ⏩
            </div>
          </MagnetButton>
        </motion.div>
      )}

      <AnimatePresence>
        {!isPlayingVideo && (
          <>
            {/* Top Header Credentials */}
            <motion.div
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 text-center mt-12 px-4"
            >
              <div className="text-[11px] font-mono text-amber-400/90 tracking-[0.35em] uppercase mb-2 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span>IIIT DELHI • B.TECH CS & APPLIED MATHEMATICS</span>
              </div>

              <h1 className="font-heading text-5xl md:text-7xl text-slate-100 tracking-[0.12em] font-extrabold drop-shadow-[0_0_40px_rgba(245,185,66,0.3)]">
                <DecryptedText text="AKSHAT LAKHERA" speed={30} maxIterations={12} />
              </h1>

              <div className="font-sans text-xs md:text-sm text-slate-300/80 tracking-[0.2em] uppercase mt-3 max-w-2xl mx-auto leading-relaxed">
                <SplitText
                  text="Engineering Intelligent Systems • Systems Engineer • Competitive Programmer"
                  delay={0.2}
                  stagger={0.015}
                />
              </div>
            </motion.div>

            {/* High-Taste Spotlight Launch Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 max-w-lg w-full px-4 my-auto"
            >
              <SpotlightCard
                spotlightColor="rgba(245, 185, 66, 0.22)"
                borderColor="rgba(245, 185, 66, 0.45)"
                className="p-8 text-center glass-panel-amber"
              >
                <div className="text-xs font-mono text-amber-400 tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 absolute"></span>
                  <DecryptedText text="LAUNCH PROTOCOL READY" speed={25} />
                </div>

                <p className="font-sans text-xs text-slate-300/85 leading-relaxed mb-6">
                  Click below to trigger the custom rocket launch video sequence and break into orbit.
                </p>

                <MagnetButton onClick={handleLaunchClick} className="w-full">
                  <div className="w-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-heading text-xs font-extrabold py-4 px-8 rounded-xl tracking-[0.2em] uppercase hover:brightness-110 transition-all shadow-[0_0_35px_rgba(245,185,66,0.6)]">
                    LAUNCH ROCKET 🚀
                  </div>
                </MagnetButton>
              </SpotlightCard>
            </motion.div>

            {/* Footer Credentials */}
            <motion.footer
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 w-full p-8 flex justify-between items-end text-[10px] font-mono text-slate-400/80 tracking-widest uppercase"
            >
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">⚡</span>
                <span>CODEFORCES SPECIALIST (1458) • IMC PROSPERITY FINALIST</span>
              </div>
              <div className="text-right">
                <span className="text-amber-400 font-bold">PROD</span> • CUSTOM ROCKET LAUNCH 2026
              </div>
            </motion.footer>
          </>
        )}
      </AnimatePresence>
    </AuroraBackground>
  );
};
