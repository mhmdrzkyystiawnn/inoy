"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const REVEAL_THRESHOLD = 0.55;

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isDrawing = useRef(false);

  const checkScratchPercent = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 128) transparent++;
    }
    const percent = transparent / (canvas.width * canvas.height);
    setScratchPercent(percent);
    if (percent > REVEAL_THRESHOLD && !isRevealed) {
      setIsRevealed(true);
      // Clear the whole canvas with a smooth fade
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [isRevealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw scratch layer — dark maroon with linen texture
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, '#7a2323');
    grad.addColorStop(0.5, '#8b3a3a');
    grad.addColorStop(1, '#5a1a1a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle noise texture overlay
    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const alpha = Math.random() * 0.12;
      ctx.fillStyle = `rgba(255,220,180,${alpha})`;
      ctx.fillRect(x, y, 1, 1);
    }

    // Decorative oval + ring
    ctx.strokeStyle = 'rgba(240,212,180,0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, canvas.height / 2, 110, 55, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(240,212,180,0.08)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, canvas.height / 2, 130, 68, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Corner ornaments
    const ornamentCorners = [[18, 18], [canvas.width - 18, 18], [18, canvas.height - 18], [canvas.width - 18, canvas.height - 18]];
    ornamentCorners.forEach(([cx, cy]) => {
      ctx.strokeStyle = 'rgba(240,212,180,0.25)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(240,212,180,0.3)';
      ctx.fill();
    });

    // Instruction text
    ctx.save();
    ctx.font = 'italic 600 17px "Cormorant Garamond", serif';
    ctx.fillStyle = 'rgba(250,235,215,0.92)';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 6;
    ctx.fillText('Gosok untuk kejutan', canvas.width / 2, canvas.height / 2 - 8);
    ctx.restore();

    ctx.save();
    ctx.font = '13px "EB Garamond", serif';
    ctx.fillStyle = 'rgba(240,212,180,0.55)';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '0.15em';
    ctx.fillText('✦  drag  ✦', canvas.width / 2, canvas.height / 2 + 16);
    ctx.restore();

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      // Soft eraser with falloff
      const radialGrad = ctx.createRadialGradient(x, y, 0, x, y, 30);
      radialGrad.addColorStop(0, 'rgba(0,0,0,1)');
      radialGrad.addColorStop(0.6, 'rgba(0,0,0,0.8)');
      radialGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = radialGrad;
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
      checkScratchPercent(ctx, canvas);
    };

    const onMouseDown = () => { isDrawing.current = true; };
    const onMouseUp = () => { isDrawing.current = false; };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDrawing.current) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      scratch((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const t = e.touches[0];
      scratch((t.clientX - rect.left) * scaleX, (t.clientY - rect.top) * scaleY);
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('touchmove', onTouchMove);
    };
  }, [checkScratchPercent]);

  const handleRevealAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsRevealed(true);
    setScratchPercent(1);
  };

  const progressDeg = Math.min(scratchPercent / REVEAL_THRESHOLD, 1) * 360;

  return (
    <section className="relative py-28 px-5 text-center overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#8b3a3a]/6 blur-[100px]" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16"
      >
        <div className="flex items-center justify-center gap-4 mb-5">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#8b3a3a]/50" />
          <p className="font-serif-vintage text-[10px] tracking-[0.5em] uppercase text-[#8b3a3a]">a special gift</p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#8b3a3a]/50" />
        </div>
        <h2 className="text-6xl md:text-7xl font-serif-vintage text-[#f0d4d4] italic leading-none">
          Ada Hadiah
        </h2>
        <h2 className="text-4xl md:text-5xl font-serif-vintage text-[#8b3a3a] italic mt-1">
          Buat Kamu
        </h2>
      </motion.div>

      {/* Scratch Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto"
        style={{ width: 340, height: 210 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Glow ring behind card */}
        <AnimatePresence>
          {isHovering && !isRevealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -inset-3 rounded-sm bg-[#8b3a3a]/10 blur-xl"
            />
          )}
        </AnimatePresence>

        {/* Card base — revealed content */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#faf5ef] via-[#f5ede0] to-[#ede0cc] rounded-sm overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.55),0_0_0_1px_rgba(139,58,58,0.18)]">
          {/* Paper ruled lines */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute left-0 right-0 border-b border-[#c9a88a]/12" style={{ top: `${44 + i * 26}px` }} />
          ))}
          <div className="absolute left-10 top-0 bottom-0 w-px bg-red-800/15" />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <AnimatePresence>
              {isRevealed ? (
                <motion.div
                  key="revealed"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                  className="flex flex-col items-center gap-2"
                >
                  {/* Wax seal large */}
                  <div className="w-14 h-14 bg-gradient-to-br from-[#c94040] via-[#a02828] to-[#7a1c1c] rounded-full shadow-[0_4px_20px_rgba(139,58,58,0.5)] flex items-center justify-center border border-[#e86060]/20 mb-1">
                    <span className="text-[#f0d4d4] text-2xl">✦</span>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.5em] text-[#8b3a3a]/60 font-serif-vintage">Selamat!</p>
                  <h3 className="text-2xl font-serif-vintage italic text-[#4a1c1c] leading-tight">
                    Gratis Peluk Seumur Hidup.
                  </h3>
                  <p className="text-xs text-[#7a3535]/70 italic font-serif-vintage mt-1">
                    Berlaku seumur hidup, dari aku untukmu ♡
                  </p>
                </motion.div>
              ) : (
                <motion.div key="hidden" className="flex flex-col items-center gap-1 opacity-30">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-[#8b3a3a] font-serif-vintage">hadiah untukmu</p>
                  <h3 className="text-2xl font-serif-vintage italic text-[#4a1c1c]">Kupon Spesial</h3>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Scratch canvas layer */}
        <canvas
          ref={canvasRef}
          width={680}
          height={420}
          className="absolute inset-0 w-full h-full rounded-sm cursor-crosshair touch-none transition-opacity duration-700"
          style={{ opacity: isRevealed ? 0 : 1 }}
        />

        {/* Progress ring (SVG, bottom-right corner) */}
        {!isRevealed && scratchPercent > 0.02 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -bottom-3 -right-3 w-9 h-9"
          >
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(139,58,58,0.2)" strokeWidth="2" />
              <circle
                cx="18" cy="18" r="14" fill="none"
                stroke="#8b3a3a" strokeWidth="2"
                strokeDasharray={`${(progressDeg / 360) * 88} 88`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-[#8b3a3a] font-serif-vintage">
              {Math.round((scratchPercent / REVEAL_THRESHOLD) * 100)}%
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Confetti burst on reveal */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 300,
                  y: (Math.random() - 0.5) * 200,
                  scale: 0,
                  opacity: 0,
                }}
                transition={{ duration: 1, delay: Math.random() * 0.3, ease: 'easeOut' }}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: ['#c94040', '#f0d4d4', '#8b3a3a', '#faf5ef'][i % 4] }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      {!isRevealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#8b3a3a]/50 font-serif-vintage">
            atau
          </p>
          <button
            onClick={handleRevealAll}
            className="text-[10px] uppercase tracking-[0.4em] text-[#8b3a3a]/70 border border-[#8b3a3a]/25 px-8 py-2.5 hover:bg-[#8b3a3a]/8 hover:text-[#8b3a3a] transition-all duration-300 font-serif-vintage"
          >
            Buka Sekarang
          </button>
        </motion.div>
      )}

      {/* Revealed message */}
      <AnimatePresence>
        {isRevealed && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 text-[10px] uppercase tracking-[0.5em] text-[#8b3a3a]/60 font-serif-vintage"
          >
            ✦ &nbsp; dengan segenap cinta &nbsp; ✦
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}