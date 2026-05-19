// src/components/HeroArtistic.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function HeroArtistic() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rot1 = useTransform(scrollYProgress, [0, 1], [-5, 15]);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden px-4 bg-[#1a0f0f]">
      {/* Latar Belakang Teks Besar (Opasitas Rendah) */}
      <h1 className="absolute text-[25vw] font-serif-art text-[#f0d4d4]/5 leading-none select-none tracking-tighter">
        SAYANG
      </h1>

      {/* Konten Utama */}
      <div className="text-center z-10 flex flex-col items-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-sans-clean uppercase tracking-[0.3em] text-[#9b6b6b] mb-4"
        >
          A Special Exhibition For
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-8xl md:text-9xl font-serif-art text-[#f0d4d4] leading-none drop-shadow-md italic"
        >
          Wulan Sayina
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-xl font-serif-art text-[#f0d4d4] leading-none drop-shadow-md italic"
        >Atau Inoy</motion.p>
        <div className="w-20 h-px bg-[#8b3a3a] mt-6"></div>
      </div>

      {/* Galeri Melayang (Experimental Layering) */}
      <motion.div style={{ y: y1, rotate: rot1 }} className="absolute top-20 right-[15%] w-48 h-64 bg-[#e8d4cc] shadow-2xl z-20 border-[6px] border-[#f5ede6] p-2">
        <Image src="/images/hero2.jpeg" alt="Gallery Image 1" width={768} height={1024} className="w-full h-full object-cover" />
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute bottom-10 left-[10%] w-60 h-40 bg-[#faf5ef]/70 backdrop-blur-sm z-0 shadow-lg p-2 border border-[#d4c4bc]">
        <Image src="/images/hero1.jpeg" alt="Gallery Image 2" width={960} height={640} className="w-full h-full object-cover opacity-80" />
      </motion.div>
      
      {/* Teks Kecil Menempel */}
      <div className="absolute bottom-10 right-10 text-xs font-serif-art text-[#9b6b6b]/60 max-w-xs text-right">
        A collective work celebrating the existence of Inoy on their special day.
      </div>
    </section>
  );
}