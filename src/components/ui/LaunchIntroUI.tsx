import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LaunchIntroUIProps {
  onEnterSpace: () => void;
}

export const LaunchIntroUI: React.FC<LaunchIntroUIProps> = ({ onEnterSpace }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLaunchClick = () => {
    setIsPlayingVideo(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 100);
  };

  const handleVideoEnded = () => {
    onEnterSpace();
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-black flex flex-col justify-between items-center z-50">
      
      {/* Video Background (Plays ONLY when Launch Button is clicked) */}
      {isPlayingVideo && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full z-0"
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
          <button
            onClick={onEnterSpace}
            className="absolute top-8 right-8 z-30 bg-black/70 backdrop-blur-md border border-white/20 text-white font-sans text-[11px] px-5 py-2.5 rounded-full tracking-widest uppercase hover:bg-[#f5b942] hover:text-black transition-all cursor-pointer pointer-events-auto"
          >
            SKIP INTO COSMOS ⏩
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {!isPlayingVideo && (
          <>
            {/* Top Header Credentials */}
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="relative z-20 text-center mt-12 px-4"
            >
              <div className="text-[11px] font-mono text-[#f5b942] tracking-[0.4em] uppercase mb-1 drop-shadow-md">
                IIIT DELHI • B.TECH CS & APPLIED MATHEMATICS
              </div>
              <h1 className="font-sans text-4xl md:text-6xl text-white tracking-[0.2em] font-semibold drop-shadow-[0_0_30px_rgba(245,185,66,0.4)]">
                AKSHAT LAKHERA
              </h1>
              <p className="font-sans text-xs md:text-sm text-white/80 tracking-[0.25em] uppercase mt-2 max-w-xl mx-auto leading-relaxed">
                Engineering Intelligent Systems • Systems Engineer • Competitive Programmer
              </p>
            </motion.div>

            {/* Launch Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-20 bg-[#09080d]/95 backdrop-blur-xl border border-[#f5b942]/50 p-8 rounded-2xl max-w-lg text-center shadow-2xl pointer-events-auto my-auto"
            >
              <div className="text-xs font-mono text-[#f5b942] tracking-widest uppercase mb-3 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                LAUNCH PROTOCOL READY
              </div>
              <p className="font-sans text-xs text-white/80 leading-relaxed mb-6">
                Click below to trigger the custom rocket launch video sequence and break into orbit.
              </p>

              <button
                onClick={handleLaunchClick}
                className="w-full bg-[#f5b942] text-black font-sans text-xs font-bold py-4 rounded-xl tracking-[0.2em] uppercase hover:bg-white transition-all shadow-[0_0_35px_rgba(245,185,66,0.7)] cursor-pointer hover:scale-105 active:scale-95"
              >
                LAUNCH ROCKET 🚀
              </button>
            </motion.div>

            {/* Footer Credentials */}
            <motion.footer 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="relative z-20 w-full p-8 flex justify-between items-end text-[10px] font-mono text-white/60 tracking-widest uppercase"
            >
              <div>CODEFORCES SPECIALIST (1458) • IMC PROSPERITY FINALIST</div>
              <div>CUSTOM ROCKET LAUNCH 2026</div>
            </motion.footer>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};
