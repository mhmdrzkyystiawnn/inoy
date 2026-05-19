"use client";
import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <section className="py-24 px-5 text-center bg-transparent relative overflow-hidden">

      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 opacity-20 pointer-events-none">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          <path d="M8 82 Q8 8 82 8" stroke="#8b3a3a" strokeWidth="0.5"/>
          <path d="M8 82 Q8 55 30 48" stroke="#8b3a3a" strokeWidth="0.5" opacity="0.4"/>
          <circle cx="8" cy="82" r="2" fill="#8b3a3a"/>
          <circle cx="82" cy="8" r="1.5" fill="#8b3a3a" opacity="0.5"/>
        </svg>
      </div>
      <div className="absolute top-8 right-8 opacity-20 pointer-events-none">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          <path d="M82 82 Q82 8 8 8" stroke="#8b3a3a" strokeWidth="0.5"/>
          <path d="M82 82 Q82 55 60 48" stroke="#8b3a3a" strokeWidth="0.5" opacity="0.4"/>
          <circle cx="82" cy="82" r="2" fill="#8b3a3a"/>
          <circle cx="8" cy="8" r="1.5" fill="#8b3a3a" opacity="0.5"/>
        </svg>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#5a1010] blur-[120px] opacity-10 pointer-events-none" />

      {/* Header */}
      <div className="mb-16 relative z-10">
        <p className="font-serif-vintage text-[10px] tracking-[0.45em] uppercase text-[#8b3a3a] mb-5 opacity-70">
          Archive No. 01
        </p>
        <h2 className="text-5xl md:text-6xl font-serif-vintage text-[#f0d4d4] italic leading-tight mb-6">
          The Unconventional<br />
          <span className="text-[#e8a0a0]">First Date</span>
        </h2>
        {/* Decorative rule */}
        <div className="flex items-center justify-center gap-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#8b3a3a] opacity-40" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#8b3a3a] opacity-50" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#8b3a3a] opacity-40" />
        </div>
      </div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="relative mx-auto w-full max-w-2xl"
        style={{ transform: "rotate(0.6deg)" }}
      >
        {/* Drop shadow layer */}
        <div className="absolute inset-0 translate-x-3 translate-y-4 bg-black/30 rounded-sm blur-sm" />

        <div className="relative bg-[#f5ede6] rounded-sm border border-white/5 overflow-hidden">

          {/* Paper grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.18] mix-blend-multiply z-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "160px",
            }}
          />

          {/* Red left margin line */}
          <div className="absolute top-0 bottom-0 left-10 w-px bg-[#c94040] opacity-15 z-10" />

          {/* Lined paper background */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 27px, rgba(180,140,130,0.12) 27px, rgba(180,140,130,0.12) 28px)",
            }}
          />

          {/* Inner padding */}
          <div className="relative z-10 p-8 md:p-10">

            {/* File header */}
            <div className="flex justify-between items-start mb-8 pb-5 border-b border-[#8b3a3a]/20">
              <div className="text-left">
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#8b3a3a]/50 font-sans mb-1">Location</p>
                <p className="font-serif-vintage italic text-[#5a2525] text-sm">Emergency Room, Hospital</p>
              </div>

              {/* Center stamp */}
              <div className="flex flex-col items-center gap-1 opacity-40">
                <div className="w-10 h-10 rounded-full border border-[#8b3a3a] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="#8b3a3a" strokeWidth="0.8">
                    <circle cx="12" cy="12" r="9"/>
                    <path d="M12 7v5l3 3"/>
                  </svg>
                </div>
                <p className="text-[7px] uppercase tracking-[0.15em] text-[#8b3a3a] font-sans">Certified</p>
              </div>

              <div className="text-right">
                <p className="text-[9px] uppercase tracking-[0.2em] text-[#8b3a3a]/50 font-sans mb-1">Date</p>
                <p className="font-serif-vintage italic text-[#5a2525] text-sm">The Day It All Began</p>
              </div>
            </div>

            {/* Film reel sprockets top */}
            <div className="flex justify-between mb-1 px-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-3 h-2 rounded-sm bg-[#1a1414] opacity-60" />
              ))}
            </div>

            {/* Video frame */}
            <div className="relative group border-[10px] border-[#1a1414] bg-black overflow-hidden">
              {/* Film aging overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/10 via-transparent to-transparent z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 z-10 pointer-events-none" />

              {/* Vignette */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%)",
                }}
              />

              <video
                controls
                className="w-full block opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                poster="/videos/vid.mp4"
              >
                <source src="/videos/vid.mp4" type="video/mp4" />
                Browser kamu nggak support video nih
              </video>
            </div>

            {/* Film reel sprockets bottom */}
            <div className="flex justify-between mt-1 px-1 mb-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-3 h-2 rounded-sm bg-[#1a1414] opacity-60" />
              ))}
            </div>

            {/* Caption */}
            <div className="px-2 md:px-6">
              {/* Opening quote mark */}
              <p className="font-serif-vintage text-[#c97070] text-6xl leading-none mb-[-16px] opacity-40">"</p>
              <p className="font-serif-vintage italic text-[#2a1212] text-lg md:text-xl leading-relaxed">
                Siapa sangka, di antara bau obat dan lorong rumah sakit yang dingin,
                aku justru menemukan kehangatan paling nyata di tangan kamu.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-6 border-t border-[#8b3a3a]/15 flex justify-between items-center">
              <div className="flex items-center gap-2 opacity-50">
                <div className="w-6 h-6 rounded-full border border-[#8b3a3a]/60 flex items-center justify-center">
                  <span className="text-[9px] text-[#8b3a3a]">✦</span>
                </div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#8b3a3a] font-sans">Memory Certified</p>
              </div>

              {/* Wax seal */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center opacity-80"
                style={{
                  background: "radial-gradient(circle at 38% 32%, #c94040, #7a1c1c)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,200,200,0.15)",
                }}
              >
                <span className="text-[10px] text-[rgba(255,210,200,0.8)] font-serif-vintage">❤</span>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Background ghost text */}
      <div className="absolute bottom-8 right-[8%] opacity-[0.03] select-none pointer-events-none overflow-hidden">
        <p className="text-[9rem] font-serif-vintage italic text-white leading-none">Healing</p>
      </div>

    </section>
  );
}