"use client";
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (audioRef.current && !hasError) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          setHasError(true);
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-100">
      <audio 
        ref={audioRef} 
        loop
        onError={() => setHasError(true)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src="/music/lagu.mp3" type="audio/mpeg" />
      </audio>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        disabled={hasError}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl text-white transition-colors ${
          hasError ? 'bg-gradient-to-br from-[#9b6b6b] to-[#7a5a5a]' : isPlaying ? 'bg-gradient-to-br from-[#dc2f45] to-[#8b3a3a] animate-spin-slow' : 'bg-gradient-to-br from-[#c95555] to-[#7a2525]'
        }`}
      >
        {hasError ? (
          <span className="text-xl">♫</span>
        ) : isPlaying ? (
          <span className="text-xl">♫</span>
        ) : (
          <span className="text-xl">♪</span>
        )}
      </motion.button>
      
      {/* Tooltip kecil */}
      <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-[#f5ede6] px-3 py-1 rounded-md shadow-sm border border-[#8b3a3a] text-[10px] font-bold uppercase text-[#7a2525] pointer-events-none whitespace-nowrap">
        {hasError ? 'No Music' : isPlaying ? 'Playing' : 'Play'}
      </div>
    </div>
  );
}