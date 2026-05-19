"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const milestones = [
  {
    year: '2024',
    label: 'I',
    event: 'Pertama kali kita chatan?',
    desc: 'Momen ketika aku pertama kali ngechat kamu, minta link manga mtp. siapa sangka kalo itu semua bakal membekas di kepala kita. anime yang membuat seluruh kejadian hari ini terjadi.',
    icon: '✦',
    accent: '#8b3a3a',
  },
  {
    year: '2026',
    label: 'II',
    event: 'Langkah Awal',
    desc: 'Momen ketika aku ngechat kamu nanya soal project pak iyan, walaupun sekarang pak iyan udah keluar, tapi pak iyan juga berperan di hubungan kita, kalo ga ada dia kayanya aku bakal bingung harus pake alasan apa buat aku ngechat kamu.',
    icon: '☁',
    accent: '#7a2323',
  },
  {
    year: '2026',
    label: 'III',
    event: 'Saling menyapa',
    desc: 'Ya kamu tau sendiri momen apa ini...',
    icon: '♡',
    accent: '#6b1c1c',
  },
];

function MilestoneCard({ m, i }: { m: typeof milestones[0]; i: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.6], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className="relative grid grid-cols-[80px_1px_1fr] gap-x-8 items-start"
    >
      {/* Year column */}
      <div className="flex flex-col items-end pt-1 gap-1">
        <span className="font-serif-vintage text-[10px] tracking-[0.4em] uppercase text-[#8b3a3a]/60">
          {m.label}
        </span>
        <span className="font-serif-vintage text-4xl font-light text-[#f0d4d4]/80 leading-none">
          {m.year}
        </span>
      </div>

      {/* Timeline spine + node */}
      <div className="relative flex flex-col items-center">
        {/* Node dot */}
        <div className="relative z-10 mt-2 w-3 h-3 rounded-full bg-[#8b3a3a] shadow-[0_0_12px_rgba(139,58,58,0.6)]">
          <div className="absolute inset-0 rounded-full bg-[#8b3a3a] animate-ping opacity-30" />
        </div>
        {/* Line down */}
        {i < milestones.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 0, minHeight: '120px' }}
            className="w-px flex-1 mt-2 bg-linear-to-b from-[#8b3a3a]/60 via-[#8b3a3a]/20 to-transparent"
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-24">
        {/* Envelope-style card */}
        <div className="relative bg-linear-to-br from-[#faf5ef] via-[#f5ede0] to-[#ede0cc] shadow-[0_16px_48px_rgba(0,0,0,0.45),0_0_0_1px_rgba(139,58,58,0.15)] overflow-hidden">
          {/* Ruled lines */}
          {[...Array(4)].map((_, j) => (
            <div key={j} className="absolute left-0 right-0 border-b border-[#c9a88a]/10" style={{ top: `${36 + j * 22}px` }} />
          ))}
          {/* Left margin */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-red-800/15" />
          {/* Top fold */}
          <svg className="absolute top-0 left-0 w-full opacity-10" viewBox="0 0 400 28" preserveAspectRatio="none">
            <polyline points="0,0 200,28 400,0" fill="none" stroke="#8b3a3a" strokeWidth="1" />
          </svg>

          {/* Postmark */}
          <div className="absolute top-3 right-4 w-12 h-12 border border-[#8b3a3a]/20 rounded-full flex items-center justify-center rotate-12 opacity-50">
            <div className="text-center">
              <p className="text-[5px] text-[#8b3a3a]/60 font-serif-vintage uppercase tracking-wider leading-tight">Our</p>
              <p className="text-[5px] text-[#8b3a3a]/60 font-serif-vintage uppercase tracking-wider leading-tight">Story</p>
              <p className="text-[5px] text-[#8b3a3a]/60 font-serif-vintage leading-tight">{m.year}</p>
            </div>
          </div>

          {/* Card content */}
          <div className="relative px-8 pt-7 pb-6 pl-12">
            <p className="text-[9px] uppercase tracking-[0.45em] text-[#8b3a3a]/60 font-serif-vintage mb-2">
              Babak {m.label}
            </p>
            <h3 className="text-2xl font-serif-vintage italic text-[#3a1010] leading-tight mb-3">
              {m.event}
            </h3>
            <p className="font-serif-vintage text-sm text-[#5a2a2a]/80 leading-[1.85] max-w-md">
              {m.desc}
            </p>

            {/* Signature area */}
            <div className="flex items-end justify-between mt-5 pt-4 border-t border-[#8b3a3a]/10">
              <span className="font-serif-vintage italic text-[#8b3a3a]/50 text-lg">{m.year}</span>
              {/* Wax seal */}
              <div className="relative">
                <div className="w-9 h-9 bg-linear-to-br from-[#c94040] via-[#a02828] to-[#7a1c1c] rounded-full shadow-[0_3px_12px_rgba(139,58,58,0.45)] flex items-center justify-center border border-[#e86060]/15">
                  <span className="text-[#f0d4d4] text-xs">{m.icon}</span>
                </div>
                <div className="absolute inset-0 rounded-full border border-[#c94040]/25 scale-125" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TimelineAbstract() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="relative py-32 px-5 overflow-hidden">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-[#8b3a3a]/5 blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-[#c94040]/4 blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-10 bg-linear-to-r from-transparent to-[#8b3a3a]/60" />
            <p className="font-serif-vintage text-[10px] tracking-[0.5em] uppercase text-[#8b3a3a]">
              perjalanan kita
            </p>
          </div>
          <h2 className="text-7xl md:text-8xl font-serif-vintage text-[#f0d4d4] italic leading-none">
            Our
          </h2>
          <h2 className="text-7xl md:text-8xl font-serif-vintage text-[#8b3a3a] italic leading-none -mt-2">
            Story
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="flex flex-col">
          {milestones.map((m, i) => (
            <MilestoneCard key={i} m={m} i={i} />
          ))}
        </div>

        {/* End ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex items-center gap-4 mt-4 ml-22"
        >
          <div className="h-px flex-1 max-w-xs bg-linear-to-r from-[#8b3a3a]/40 to-transparent" />
          <span className="font-serif-vintage text-[#8b3a3a]/50 text-sm italic">& masih berlanjut...</span>
        </motion.div>
      </div>
    </section>
  );
}