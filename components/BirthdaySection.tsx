"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const VERSES = [
  {
    tag: "I.",
    text: "Hari ini, Burung terbang perlahan di langit rendah, berkicau dengan alunan yang merdu. Bulan memperlambat laju revolusinya untuk memperhatikan rupamu yang tampak sangat sumringah saat membaca ini (hwhw, i think kamu sedang senyum-senyum sendiri...). Semoga di hari yang spesial ini, kamu selalu diberikan rasa sabar dan ikhlas untuk menjalani hidupmu ya, i always proud of you for how far you have come, and i know the best is yet to come. Aku sayang kamu, selalu.",
  },
  {
    tag: "II.",
    text: "Di saat duniaku monokrom dan biru, kau datang mematahkan cahaya, membuat monokrom berubah menjadi pelangi yang ku kagumi setiap harinya. Kau selalu menjadi alasan duniaku berputar kembali, setelah sekian lama menetap dan hanya diam tak bergerak, bagaikan bunga layu yang tak ingin dipetik oleh siapapun.",
  },
  {
    tag: "III.",
    text: "Mungkin kita memang masih segar dalam hubungan ini, tapi aku ingin kita terus selalu bersama. Walau nanti di depan sana ada badai yang menghampiri, aku ingin kita tetap teguh dengan komitmen kita. Pada akhirnya kita akan selalu menguatkan dan saling menumbuhkan, i promise to always be there for you, in every season of life, in every chapter of our story.",
  },
  {
    tag: "IV.",
    text: "u're my sunshine, my only sunshine, you make me happy when skies are gray. Aku berharap aku bisa menjadi sunshine untukmu juga, menerangi hari-harimu dengan kehangatan dan cinta yang tulus, bahkan di saat-saat sulit sekalipun.",
  },
  {
    tag: "V.",
    text: "Doa terbaik untukmu ya, semoga hal-hal yang membuatku jatuh, dapat membuatmu belajar dan tumbuh lebih tinggi, menjadi seperti pohon yang dahannya bercabang seperti pikiranmu yang bercabang dan indah. jangan pernah berpikir jika dirimu itu aneh atau bodoh, di mata aku dirimu sangat amat pintar dan berwawasan, pikiranmu luas, unik, dan tentunya indah. semoga dirimu bisa bangga pada dirimu sendiri. love yourself 'cause i love you.",
  },
  {
    tag: "VI.",
    text: "I'm sorry kalo aku kadang mood swing atau berubah, tapi satu hal yang harus kamu tau: perasaan aku gapernah berubah. aku selalu mencintai kamu, dengan segala kelebihan dan kekuranganmu (tapi di mata aku kamu tidak pernah kurang kok). noy, i very-very lucky to have you.",
  },
  {
    tag: "VII.",
    text: "Kita sudah saling menyapa hehe, semoga kamu tidak merasa risih dengan tindakkan aku yang kadang kelewat batas, jika kamu risih, tolong ungkapkan kepadaku ini ya. janji ya, sayang, marahpun kamu harus ungkapkan itu, kalo kamu kesel sama aku, tonjok aja gapapa, mau cubit juga gapapa, aku selalu menerima keluh kesah, kesal, marah, dan senang kamu.",
  },
  {
    tag: "Penutup.",
    text: "Selamat ulang tahun. Terimakasih telah datang ke hidup aku. Terimakasih telah menjadi diri sendiri yang aku cintai.",
  },
];

function Particle({ style }: { style: React.CSSProperties }) {
  return <div className="absolute pointer-events-none rounded-full" style={style} />;
}

function VerseBlock({ verse, index }: { verse: typeof VERSES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
      className="relative flex gap-6 group"
    >
      <div className="shrink-0 w-12 text-right pt-0.5">
        <span
          className="font-serif-vintage italic text-[11px] tracking-widest opacity-30 select-none"
          style={{ color: "#8b3a3a" }}
        >
          {verse.tag}
        </span>
      </div>

      <div className="flex-1 relative">
        {/* Left margin accent */}
        <div
          className="absolute -left-3 top-1 bottom-1 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: "#8b3a3a" }}
        />
        <p
          className="font-serif-vintage italic leading-[1.85] text-[1.05rem] md:text-[1.15rem]"
          style={{ color: "#2a1212" }}
        >
          {verse.text}
        </p>
      </div>
    </motion.div>
  );
}

export default function BirthdaySection() {
  const [revealed, setRevealed] = useState(false);
  const [particles, setParticles] = useState<React.CSSProperties[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list: React.CSSProperties[] = Array.from({ length: 28 }, (_, i) => ({
      width: `${2 + Math.random() * 3}px`,
      height: `${2 + Math.random() * 3}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      background: i % 3 === 0 ? "#c94040" : i % 3 === 1 ? "#e8a0a0" : "#f5e0e0",
      opacity: 0.08 + Math.random() * 0.12,
    }));
    setParticles(list);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-5 overflow-hidden bg-transparent"
    >
      {/* Ambient orbs */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-125 h-125 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(140,40,40,0.09) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(100,20,20,0.07) 0%, transparent 70%)" }}
      />

      {/* Floating dust particles */}
      {particles.map((s, i) => (
        <Particle key={i} style={s} />
      ))}

      {/* Corner ornaments */}
      <svg
        className="absolute top-6 left-6 opacity-15 pointer-events-none"
        width="80" height="80" viewBox="0 0 80 80" fill="none"
      >
        <path d="M6 74 Q6 6 74 6" stroke="#8b3a3a" strokeWidth="0.5" />
        <path d="M6 74 Q6 44 28 38" stroke="#8b3a3a" strokeWidth="0.5" opacity="0.5" />
        <circle cx="6" cy="74" r="2" fill="#8b3a3a" />
        <circle cx="74" cy="6" r="1.5" fill="#8b3a3a" opacity="0.5" />
      </svg>
      <svg
        className="absolute top-6 right-6 opacity-15 pointer-events-none"
        width="80" height="80" viewBox="0 0 80 80" fill="none"
      >
        <path d="M74 74 Q74 6 6 6" stroke="#8b3a3a" strokeWidth="0.5" />
        <path d="M74 74 Q74 44 52 38" stroke="#8b3a3a" strokeWidth="0.5" opacity="0.5" />
        <circle cx="74" cy="74" r="2" fill="#8b3a3a" />
        <circle cx="6" cy="6" r="1.5" fill="#8b3a3a" opacity="0.5" />
      </svg>

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* ── SEALED STATE ── */}
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="sealed"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, y: -20 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center text-center py-16"
            >
              {/* Decorative eye */}
              <div className="relative mb-10">
                <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
                  <path
                    d="M10 30 Q60 -10 110 30 Q60 70 10 30Z"
                    stroke="#8b3a3a" strokeWidth="0.6" fill="rgba(180,60,60,0.04)"
                  />
                  <circle cx="60" cy="30" r="14" stroke="#8b3a3a" strokeWidth="0.5" fill="rgba(180,60,60,0.06)" />
                  <circle cx="60" cy="30" r="6" fill="#8b3a3a" opacity="0.3" />
                  <circle cx="63" cy="27" r="2" fill="#c94040" opacity="0.5" />
                </svg>
                {/* Radiating lines */}
                {[0,45,90,135,180,225,270,315].map((deg) => (
                  <div
                    key={deg}
                    className="absolute top-1/2 left-1/2 origin-left"
                    style={{
                      width: "28px",
                      height: "0.5px",
                      background: "rgba(139,58,58,0.2)",
                      transform: `rotate(${deg}deg) translateY(-50%)`,
                      marginLeft: "0",
                    }}
                  />
                ))}
              </div>

              <p
                className="font-serif-vintage text-[10px] tracking-[0.45em] uppercase mb-5 opacity-50"
                style={{ color: "#8b3a3a" }}
              >
                Sebuah surat kecil
              </p>

              <h2
                className="font-serif-vintage italic text-4xl md:text-5xl leading-tight mb-4"
                style={{ color: "#f0d4d4" }}
              >
                Untuk kamu,<br />
                <span style={{ color: "#e8a0a0" }}>di hari yang paling berharga.</span>
              </h2>

              <div className="flex items-center gap-4 my-6 opacity-30">
                <div className="w-12 h-px" style={{ background: "#8b3a3a" }} />
                <div className="w-1.5 h-1.5 rotate-45" style={{ background: "#8b3a3a" }} />
                <div className="w-12 h-px" style={{ background: "#8b3a3a" }} />
              </div>

              <p
                className="font-serif-vintage italic text-sm leading-relaxed max-w-xs opacity-60 mb-12"
                style={{ color: "#c97070" }}
              >
                Ada beberapa kata yang ingin aku sampaikan — yang terlalu banyak untuk diucapkan, jadi aku tuliskan saja.
              </p>

              {/* Open button */}
              <motion.button
                onClick={() => setRevealed(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative group font-serif-vintage italic text-sm tracking-widest px-10 py-4 rounded-none border transition-all duration-500"
                style={{
                  color: "#f0d4d4",
                  borderColor: "rgba(139,58,58,0.5)",
                  background: "rgba(139,58,58,0.06)",
                }}
              >
                <span className="relative z-10">Buka Surat</span>
                {/* Hover fill */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "rgba(139,58,58,0.1)" }}
                />
                {/* Corner ticks */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: "#8b3a3a" }} />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: "#8b3a3a" }} />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l" style={{ borderColor: "#8b3a3a" }} />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: "#8b3a3a" }} />
              </motion.button>
            </motion.div>
          ) : (

            /* ── REVEALED STATE ── */
            <motion.div
              key="letter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Paper card */}
              <div
                className="relative rounded-none overflow-hidden"
                style={{
                  background: "#faf5ef",
                  boxShadow: "4px 6px 40px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(180,120,100,0.1)",
                  transform: "rotate(-0.3deg)",
                }}
              >
                {/* Paper grain */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-multiply z-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: "160px",
                  }}
                />
                {/* Lined paper */}
                <div
                  className="absolute inset-0 pointer-events-none z-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(180,140,130,0.1) 31px, rgba(180,140,130,0.1) 32px)",
                  }}
                />
                {/* Red margin */}
                <div
                  className="absolute top-0 bottom-0 pointer-events-none z-10"
                  style={{ left: "72px", width: "1px", background: "rgba(200,80,80,0.15)" }}
                />

                <div className="relative z-10 px-8 md:px-14 py-12">

                  {/* Letter heading */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="mb-10 pb-8 border-b"
                    style={{ borderColor: "rgba(139,58,58,0.15)" }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p
                          className="font-serif-vintage text-[9px] uppercase tracking-[0.3em] mb-1.5 opacity-40"
                          style={{ color: "#8b3a3a" }}
                        >
                          Dari hati ku
                        </p>
                        <p
                          className="font-serif-vintage italic text-[13px]"
                          style={{ color: "#5a2525" }}
                        >
                          untuk kamu yang paling aku sayangi
                        </p>
                      </div>

                      {/* Wax seal */}
                      <div
                        className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center"
                        style={{
                          background: "radial-gradient(circle at 38% 32%, #c94040, #7a1c1c)",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,200,200,0.15)",
                        }}
                      >
                        <span
                          className="font-serif-vintage"
                          style={{ fontSize: "14px", color: "rgba(255,210,200,0.75)" }}
                        >
                          ✦
                        </span>
                      </div>
                    </div>

                    {/* Big title */}
                    <h2
                      className="font-serif-vintage italic text-3xl md:text-4xl mt-6 leading-tight"
                      style={{ color: "#2a1212" }}
                    >
                      Selamat Ulang Tahun
                    </h2>
                  </motion.div>

                  {/* Verses */}
                  <div className="space-y-9">
                    {VERSES.map((verse, i) => (
                      <VerseBlock key={i} verse={verse} index={i} />
                    ))}
                  </div>

                  {/* Closing */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 1 }}
                    className="mt-16 pt-10 border-t"
                    style={{ borderColor: "rgba(139,58,58,0.15)" }}
                  >
                    <div className="flex justify-between items-end">
                      <div>
                        <p
                          className="font-serif-vintage italic text-sm mb-1"
                          style={{ color: "rgba(90,37,37,0.5)" }}
                        >
                          dengan cinta yang tidak bisa diukur,
                        </p>
                        <p
                          className="font-serif-vintage italic text-3xl"
                          style={{ color: "#7a2525", letterSpacing: "-0.02em" }}
                        >
                          aku ❤
                        </p>
                      </div>

                      <div className="text-right opacity-30">
                        <p
                          className="font-serif-vintage text-[9px] uppercase tracking-[0.25em]"
                          style={{ color: "#8b3a3a" }}
                        >
                          Memory Certified
                        </p>
                        <div
                          className="mt-1 h-px w-16 ml-auto opacity-50"
                          style={{ background: "#8b3a3a" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Close / back */}
              <motion.button
                onClick={() => setRevealed(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 mx-auto block font-serif-vintage italic text-xs tracking-widest opacity-30 hover:opacity-60 transition-opacity"
                style={{ color: "#f0d4d4" }}
              >
                ← kembali
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ghost background text */}
      <div className="absolute bottom-6 right-[6%] opacity-[0.025] select-none pointer-events-none overflow-hidden">
        <p
          className="font-serif-vintage italic leading-none"
          style={{ fontSize: "clamp(60px, 12vw, 110px)", color: "white" }}
        >
          Happy Birthday
        </p>
      </div>
    </section>
  );
}