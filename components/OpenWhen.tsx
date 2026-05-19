"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const letters = [
  {
    trigger: "Lagi Sedih",
    detail: "dan butuh pelukan",
    content:
      "Hey, jangan sedih ya. Aku di sini — selalu di sini. Kalau dunia terasa terlalu berat hari ini, istirahat dulu. Kamu tidak harus kuat setiap saat. Aku sayang kamu, persis seperti ini.",
    icon: "☁",
    rotation: "-rotate-1",
  },
  {
    trigger: "Lagi Kangen",
    detail: "dan hati terasa jauh",
    content:
      "Coba cek galeri foto kita nomor 42... Ingat hari itu? Aku juga kangen. Jarak itu nyata, tapi rasa ini lebih nyata. Kamu selalu bersamaku — di setiap sudut hari-hariku.",
    icon: "✦",
    rotation: "rotate-1",
  },
  {
    trigger: "Marah Sama Aku",
    detail: "dan belum mau bicara",
    content:
      "Maafin aku ya. Sini, peluk dulu lewat surat ini. Aku mungkin salah, dan kamu berhak marah. Tapi tolong tahu: aku tidak pernah berhenti menyayangimu, bahkan di momen ini.",
    icon: "♡",
    rotation: "-rotate-2",
  },
];

export default function OpenWhen() {
  const [selected, setSelected] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selected !== null) {
      setTimeout(() => setIsOpen(true), 100);
    } else {
      setIsOpen(false);
    }
  }, [selected]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setSelected(null), 500);
  };

  return (
    <section className="relative py-32 px-5 text-center overflow-hidden">
      {/* Ambient Background Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-[#8b3a3a]/8 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#c94040]/6 blur-[120px]" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20"
      >
        <div className="flex items-center justify-center gap-4 mb-5">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#8b3a3a]/60" />
          <p className="font-serif-vintage text-[10px] tracking-[0.5em] uppercase text-[#8b3a3a]">
            untuk mu, dari ku
          </p>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#8b3a3a]/60" />
        </div>
        <h2 className="text-7xl md:text-8xl font-serif-vintage text-[#f0d4d4] italic leading-none">
          Buka Saat
          <span className="block text-[#8b3a3a] text-5xl md:text-6xl not-italic tracking-widest font-light mt-1">
            ···
          </span>
        </h2>
      </motion.div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
        {letters.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(i)}
            className={`relative w-68 h-52 cursor-pointer group ${l.rotation}`}
            style={{ width: "272px" }}
          >
            {/* Card envelope body */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f7ede2] via-[#f2e4d5] to-[#e8d5c0] rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(139,58,58,0.15)] overflow-hidden transition-shadow duration-500 group-hover:shadow-[0_30px_80px_rgba(139,58,58,0.25),0_0_0_1px_rgba(139,58,58,0.3)]">
              {/* Paper texture lines */}
              {[...Array(8)].map((_, j) => (
                <div
                  key={j}
                  className="absolute left-0 right-0 border-b border-[#c9a88a]/15"
                  style={{ top: `${28 + j * 20}px` }}
                />
              ))}

              {/* Left margin line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-red-800/20" />

              {/* Envelope flap fold at top */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8b3a3a]/20 to-transparent" />

              {/* Diagonal fold lines (envelope aesthetic) */}
              <svg className="absolute top-0 left-0 w-full h-16 opacity-10" viewBox="0 0 272 64">
                <line x1="0" y1="0" x2="136" y2="64" stroke="#8b3a3a" strokeWidth="0.5" />
                <line x1="272" y1="0" x2="136" y2="64" stroke="#8b3a3a" strokeWidth="0.5" />
              </svg>

              {/* Postmark circle (top right) */}
              <div className="absolute top-4 right-4 w-14 h-14 border border-[#8b3a3a]/25 rounded-full flex items-center justify-center rotate-12">
                <div className="text-center">
                  <p className="text-[5px] text-[#8b3a3a]/50 font-serif-vintage uppercase tracking-wider leading-tight">Special</p>
                  <p className="text-[5px] text-[#8b3a3a]/50 font-serif-vintage uppercase tracking-wider leading-tight">Delivery</p>
                  <p className="text-[5px] text-[#8b3a3a]/50 font-serif-vintage leading-tight">2026</p>
                </div>
                {/* Horizontal lines through postmark */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#8b3a3a]/20" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#8b3a3a]/20 translate-y-1" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#8b3a3a]/20 -translate-y-1" />
              </div>

              {/* Icon watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-[#8b3a3a]/5 font-serif-vintage select-none">
                {l.icon}
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 pl-10 flex flex-col justify-end items-start text-left">
                <span className="text-[9px] uppercase tracking-[0.35em] text-[#8b3a3a]/70 mb-1 font-serif-vintage">
                  Buka Saat
                </span>
                <span className="text-2xl font-serif-vintage italic text-[#4a1c1c] leading-tight">
                  {l.trigger}
                </span>
                <span className="text-[10px] text-[#7a4040]/60 font-serif-vintage italic mt-0.5">
                  {l.detail}
                </span>
              </div>

              {/* Wax seal */}
              <div className="absolute bottom-5 right-5 w-11 h-11 transition-transform duration-300 group-hover:scale-110">
                <div className="w-full h-full bg-gradient-to-br from-[#c94040] via-[#a02828] to-[#7a1c1c] rounded-full shadow-[0_4px_12px_rgba(139,58,58,0.5)] flex items-center justify-center border border-[#e86060]/20">
                  <span className="text-[#f0d4d4] text-sm">{l.icon}</span>
                </div>
                {/* Seal ring */}
                <div className="absolute inset-0 rounded-full border border-[#c94040]/30 scale-110" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{ backgroundColor: "rgba(8,4,4,0.92)", backdropFilter: "blur(16px)" }}
            onClick={handleClose}
          >
            {/* Envelope opening animation wrapper */}
            <motion.div
              initial={{ y: 60, scale: 0.85, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative max-w-md w-full ${letters[selected]?.rotation}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Letter paper */}
              <div className="relative bg-gradient-to-br from-[#faf5ef] via-[#f5ede0] to-[#f0e4d0] shadow-[0_40px_100px_rgba(0,0,0,0.6),0_0_0_1px_rgba(139,58,58,0.2)] overflow-hidden">
                {/* Top envelope flap fold mark */}
                <div className="absolute top-0 left-0 right-0">
                  <svg viewBox="0 0 448 40" className="w-full opacity-15">
                    <polyline points="0,0 224,40 448,0" fill="none" stroke="#8b3a3a" strokeWidth="1" />
                  </svg>
                </div>

                {/* Ruled lines */}
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 right-0 border-b border-[#c9a88a]/12"
                    style={{ top: `${80 + i * 28}px` }}
                  />
                ))}

                {/* Left margin */}
                <div className="absolute left-12 top-0 bottom-0 w-px bg-red-800/15" />

                {/* Content */}
                <div className="relative px-10 pt-10 pb-8 pl-16">
                  {/* Date & stamp area */}
                  <div className="flex justify-between items-start mb-8">
                    <p className="text-[9px] tracking-[0.35em] text-[#8b3a3a]/50 uppercase font-serif-vintage">
                      {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                    <div className="w-14 h-14 border border-[#8b3a3a]/20 rounded-full flex items-center justify-center rotate-12">
                      <div className="text-center">
                        <p className="text-[5px] text-[#8b3a3a]/40 font-serif-vintage uppercase tracking-wider leading-none">With</p>
                        <p className="text-[5px] text-[#8b3a3a]/40 font-serif-vintage uppercase tracking-wider leading-none">Love</p>
                      </div>
                    </div>
                  </div>

                  {/* Subject line */}
                  <div className="mb-6 pb-3 border-b border-[#8b3a3a]/10">
                    <p className="text-[9px] uppercase tracking-[0.4em] text-[#8b3a3a]/50 font-serif-vintage mb-1">Buka Saat</p>
                    <p className="text-2xl font-serif-vintage italic text-[#4a1c1c]">
                      {letters[selected]?.trigger}
                    </p>
                  </div>

                  {/* Salutation */}
                  <p className="text-xl italic text-[#5a2525] mb-5 font-serif-vintage">
                    Sayangku,
                  </p>

                  {/* Body */}
                  <p className="text-base leading-[1.9] text-[#2a1010] font-serif-vintage italic mb-8">
                    {letters[selected]?.content}
                  </p>

                  {/* Signature area */}
                  <div className="flex items-end justify-between mt-6 pt-4 border-t border-[#8b3a3a]/10">
                    <div>
                      <p className="text-[#7a2525] text-3xl font-serif-vintage italic">— Aku</p>
                      <p className="text-[8px] tracking-widest text-[#8b3a3a]/40 uppercase font-serif-vintage mt-1">
                        selalu, selamanya
                      </p>
                    </div>
                    {/* Wax seal on letter */}
                    <div className="relative w-14 h-14">
                      <div className="w-full h-full bg-gradient-to-br from-[#c94040] via-[#a02828] to-[#7a1c1c] rounded-full shadow-[0_4px_16px_rgba(139,58,58,0.4)] flex items-center justify-center border border-[#e86060]/20">
                        <span className="text-[#f0d4d4] text-lg">{letters[selected]?.icon}</span>
                      </div>
                      <div className="absolute inset-0 rounded-full border border-[#c94040]/25 scale-125" />
                    </div>
                  </div>
                </div>

                {/* Bottom fold */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#8b3a3a]/15 to-transparent" />

                {/* Close */}
                <div className="px-10 py-5 bg-[#f0e4d0]/50 flex justify-center">
                  <button
                    onClick={handleClose}
                    className="text-[9px] uppercase tracking-[0.4em] text-[#8b3a3a]/70 border border-[#8b3a3a]/25 px-8 py-2.5 hover:bg-[#8b3a3a]/8 hover:text-[#8b3a3a] transition-all duration-300 font-serif-vintage"
                  >
                    Tutup Surat
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}