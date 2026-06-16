/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { ArrowUp, Play, BookOpen, Presentation, Milestone } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TheorySection from "./components/TheorySection";
import SituationSection from "./components/SituationSection";
import AnalysisSection from "./components/AnalysisSection";
import PolicySection from "./components/PolicySection";
import CreativeProductSection from "./components/CreativeProductSection";
import ConclusionSection from "./components/ConclusionSection";
import QASection from "./components/QASection";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll Progress indicator using motion v12
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Smooth Navigation Trigger
  const handleNavigate = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const offset = 80; // height of the fixed navbar
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setActiveSection(sectionId);
    }
  };

  // Intersection Observer / Scroll spy to update Navbar active indicator on scroll
  useEffect(() => {
    const sections = ["hero", "ly-thuyet", "tinh-huong", "phan-tich", "giai-phap", "san-pham", "qa"];
    
    const handleScrollSpy = () => {
      // Toggle back to top button visibility
      setShowBackToTop(window.scrollY > 500);

      const scrollPosition = window.scrollY + 120; // active padding offset

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  return (
    <div id="presentation-app" className="bg-slate-950 min-h-screen text-slate-100 selection:bg-blue-600/30 selection:text-blue-200 antialiased font-sans scroll-smooth">
      
      {/* Top Slide progress indicator */}
      <motion.div
        id="scroll-progress-indicator"
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-teal-400 to-purple-500 z-55 origin-left"
        style={{ scaleX }}
      />

      {/* FIXED GLASSY NAVBAR */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* CORE PRESENTATION SECTIONS */}
      <main id="presentation-content-wrapper">
        <Hero onNavigate={handleNavigate} />
        
        <TheorySection />
        
        <SituationSection />
        
        <AnalysisSection />
        
        <PolicySection />
        
        <CreativeProductSection />
        
        <ConclusionSection />
        
        <QASection />
      </main>

      {/* BACK TO TOP FLOATING BUTTON */}
      {showBackToTop && (
        <button
          id="btn-back-to-top"
          onClick={() => handleNavigate("hero")}
          title="Quay lại đầu trang"
          className="fixed bottom-6 right-6 z-40 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-xl hover:shadow-blue-500/20 shadow-blue-500/10 active:scale-95 border border-blue-400/25 cursor-pointer transition-all duration-300"
        >
          <ArrowUp className="w-5 h-5 animate-bounce" />
        </button>
      )}

    </div>
  );
}
