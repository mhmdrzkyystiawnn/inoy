import Hero from "@/components/Hero";
import Timeline from "@/components/TimeLine";
import MemoryGame from "@/components/MemoryGame";
import VideoSection from "@/components/VideoSection";
import ScratchCard from "@/components/ScratchCard";
import OpenWhen from "@/components/OpenWhen";
import MusicPlayer from "@/components/MusicPlayer";
import BirthdaySection from "@/components/BirthdaySection";
export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#1a0f0f]">
      {/* Background Orbs (Efek Glow Dengan Warna Maroon Subtle) */}
      <div className="fixed -top-25 -right-25 w-125 h-125 bg-[#8b3a3a]/5 blur-[120px] pointer-events-none" />
      <div className="fixed -bottom-25 -left-25 w-100 h-100 bg-[#5a1a1a]/5 blur-[100px] pointer-events-none" />

      <Hero />
      <Timeline />
      <BirthdaySection />
      <OpenWhen />
      <VideoSection />
      <ScratchCard />
      <MemoryGame />
      <MusicPlayer />

    </main>
  );
}