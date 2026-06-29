import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import AudioPlayer from "@/components/AudioPlayer";

// Loader Skeleton for Lazy Loaded Components
function SectionSkeleton() {
  return (
    <div className="w-full min-h-[400px] bg-black flex items-center justify-center relative">
      <div className="w-8 h-8 rounded-full border-2 border-neon-orange/20 border-t-neon-orange animate-spin" />
    </div>
  );
}

// Code Splitting and Dynamic Imports for Below-the-Fold components
const Trainers = dynamic(() => import("@/components/Trainers"), {
  loading: () => <SectionSkeleton />,
});

const WallOfFame = dynamic(() => import("@/components/WallOfFame"), {
  loading: () => <SectionSkeleton />,
});

const InstagramGrid = dynamic(() => import("@/components/InstagramGrid"), {
  loading: () => <SectionSkeleton />,
});

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Structural layout shell */}
      <Header />
      
      <main>
        {/* Above-the-fold content */}
        <Hero />
        
        <SocialProof />
        
        <Services />
        
        {/* Below-the-fold lazy-loaded elements */}
        <Trainers />
        
        <WallOfFame />
        
        <InstagramGrid />
      </main>

      <Footer />
      
      {/* Fixed page-wide floating action buttons */}
      <FloatingActions />
      <AudioPlayer />
    </div>
  );
}
