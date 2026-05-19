"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  emoji: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Makanan favorit aku apa?",
    options: ["Nasgor Goreng", "Rendang", "Sushi", "Burger"],
    correct: 0,
    emoji: "🍛",
  },
  {
    id: 2,
    question: "Warna favorit aku apa?",
    options: ["Biru", "Merah", "Hijau Sage", "Kuning"],
    correct: 2,
    emoji: "🎨",
  },
  {
    id: 3,
    question: "Aku sedang apa?",
    options: ["Jajan", "Makan", "Memikirkan kamu", "Diem"],
    correct: 2,
    emoji: "🏔️",
  },
  {
    id: 4,
    question: "Di kamus Aku, Kata imut Diganti sama kata?",
    options: ["Inoy", "Sejarah", "Musik", "Menulis"],
    correct: 0,
    emoji: "📸",
  },
  {
    id: 5,
    question: "Tanggal Yang Aku Suka",
    options: ["20-08-2017", "07-02-2023", "31-03-1975", "12-12-2012"],
    correct: 2,
    emoji: "📅",
  },
];

const Firework = ({ delay }: { delay: number }) => {
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400 - 100,
        opacity: 0,
        scale: 0,
      }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
      className="fixed pointer-events-none z-50"
      style={{ left: "50%", top: "50%", width: "8px", height: "8px" }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          backgroundColor: ["#8b3a3a", "#c94040", "#f0d4d4", "#7a3535"][Math.floor(Math.random() * 4)],
        }}
      />
    </motion.div>
  );
};

export default function MemoryGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = QUIZ_QUESTIONS[currentQuestion];

  const handleAnswerClick = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);

    if (index === question.correct) {
      setShowFireworks(true);
      setScore(score + 1);
      setTimeout(() => setShowFireworks(false), 1500);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const isCorrect = selectedAnswer === question.correct;

  // Tampilan Akhir (Result Screen)
  if (isFinished) {
    return (
      <div className="py-20 px-5 min-h-[80vh] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#1a0f0f] border border-[#8b3a3a]/30 p-12 rounded-sm shadow-2xl text-center max-w-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10 pointer-events-none" />
          <p className="font-serif-vintage text-[10px] tracking-[0.4em] uppercase text-[#8b3a3a] mb-6">Quiz Selesai</p>
          <h2 className="text-6xl font-serif-vintage text-[#f0d4d4] italic mb-4">{score}/{QUIZ_QUESTIONS.length}</h2>
          <p className="text-xl font-serif-vintage text-[#9b6b6b] leading-relaxed italic px-6">
            {score === QUIZ_QUESTIONS.length 
              ? "Sempurna! Kamu benar-benar care sama aku. Aku senang banget punya kamu ✨" 
              : score >= 3 
                ? "Hebat! Kamu tau banyak hal tentang aku. Makasih ya udah perhatiin hal-hal kecil ❤️" 
                : "Nggak apa-apa, mungkin kamu perlu lebih sering jajan bareng aku lagi nih! 🤗"}
          </p>
          <button 
            onClick={() => { setIsFinished(false); setCurrentQuestion(0); setScore(0); setAnswered(false); }}
            className="mt-10 text-[10px] uppercase tracking-[0.3em] text-[#8b3a3a] border border-[#8b3a3a]/30 px-8 py-3 hover:bg-[#8b3a3a]/10 transition-all"
          >
            Coba Lagi
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-20 px-5 min-h-screen text-center relative overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
        <p className="font-serif-vintage text-[11px] tracking-[0.35em] uppercase text-[#8b3a3a] mb-4 tracking-tighter">How Well Do You Know Me</p>
        <h2 className="text-5xl font-serif-vintage text-[#f0d4d4] italic mb-2">Seberapa Kenal Kamu Sama Aku</h2>
        <div className="w-16 h-px bg-[#8b3a3a] mx-auto opacity-40" />
      </motion.div>

      {/* Progress & Score */}
      <div className="mb-12 max-w-md mx-auto flex justify-between items-end">
        <div className="text-left text-[10px] uppercase tracking-widest text-[#9b6b6b]">
          Q. {currentQuestion + 1} / {QUIZ_QUESTIONS.length}
        </div>
        <div className="text-right text-[10px] uppercase tracking-widest text-[#8b3a3a]">
          Skor: <span className="text-[#f0d4d4]">{score}</span>
        </div>
      </div>

      {/* Card */}
      <motion.div key={currentQuestion} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <div className="bg-[#1a0f0f]/40 border border-[#8b3a3a]/20 p-12 shadow-2xl backdrop-blur-sm relative">
          <h3 className="text-2xl font-serif-vintage text-[#f0d4d4] mb-12 italic leading-relaxed">
            "{question.question}"
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, index) => {
              const isOptionCorrect = index === question.correct;
              const isOptionSelected = selectedAnswer === index;

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={answered}
                  whileHover={!answered ? { backgroundColor: "rgba(139, 58, 58, 0.1)" } : {}}
                  className={`p-4 border font-serif-vintage text-sm transition-all duration-500 rounded-none tracking-wide ${
                    answered
                      ? isOptionCorrect
                        ? "bg-[#8b3a3a]/40 border-[#8b3a3a] text-[#f0d4d4]" // Jawaban Benar
                        : isOptionSelected
                          ? "bg-[#5a1a1a]/40 border-[#5a1a1a] text-[#9b6b6b]" // Jawaban Salah
                          : "border-[#8b3a3a]/10 text-[#9b6b6b] opacity-40"   // Tidak Dipilih
                      : "border-[#8b3a3a]/20 text-[#9b6b6b] hover:border-[#8b3a3a]/50"
                  }`}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-xs font-serif-vintage italic text-[#8b3a3a]">
                {isCorrect ? "✦ Jawabanmu tepat sekali." : "✦ Ah, sedikit meleset."}
              </motion.div>
            )}
          </AnimatePresence>

          {answered && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNextQuestion}
              className="mt-10 w-full border border-[#8b3a3a] py-3 text-[10px] uppercase tracking-[0.3em] text-[#f0d4d4] hover:bg-[#8b3a3a] transition-all"
            >
              Lanjutkan ➔
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Fireworks */}
      <AnimatePresence>
        {showFireworks && Array.from({ length: 25 }).map((_, i) => <Firework key={i} delay={i * 0.04} />)}
      </AnimatePresence>
    </div>
  );
}