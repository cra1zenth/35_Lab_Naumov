/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import AIShowcase from "./components/AIShowcase";
import AIMatchmaker from "./components/AIMatchmaker";
import AIComparisonTable from "./components/AIComparisonTable";
import { 
  Sparkles, 
  GraduationCap, 
  Layers, 
  Award, 
  Terminal, 
  Shuffle, 
  BookOpen, 
  ArrowRight,
  BookmarkCheck,
  CheckCircle,
  HelpCircle,
  TrendingDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type TabType = "showcase" | "quiz" | "matrix";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("showcase");
  const [selectedAIId, setSelectedAIId] = useState<string>("chatgpt");

  const handleSelectAFromQuiz = (toolId: string) => {
    setSelectedAIId(toolId);
    setActiveTab("showcase");
    
    // Smooth scroll back to visual cards helper
    setTimeout(() => {
      window.scrollTo({ top: 380, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 pb-16 font-sans">
      {/* Visual Header / Premium Academic Brand Info bar */}
      <header className="border-b border-slate-200/60 bg-white/75 backdrop-blur-md sticky top-0 z-50 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm font-extrabold text-sm font-display">
              🎓
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-slate-900 tracking-tight text-sm uppercase">Академічний ШІ</span>
              <span className="text-[10px] text-indigo-600 font-bold tracking-widest font-mono uppercase">Гід для студентів</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse block"></span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold">Оновлено: Червень 2026</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-20" id="hero-banner">
        {/* Subtle grid decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40 -z-10" />
        
        {/* Colorful gradient light glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-indigo-700 text-xs font-semibold shadow-sm mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Інтерактивний навігатор нейромережами</span>
          </motion.div>

          {/* Core Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight max-w-3xl leading-tight sm:leading-none"
          >
            Топ-5 ШІ для навчання: <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600">
              аналіз інтерфейсів та зручності
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mt-6 leading-relaxed"
          >
            Детальний гід-порівняння найкращих нейромереж для студентів. З акцентом на фірмові фішки, 
            зручність інтерфейсу, приховані обмеження та реальну користь при написанні робіт, коду чи підготовки до сесії.
          </motion.p>

          {/* Quick Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 w-full max-w-3xl"
          >
            <div className="bg-white/80 border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
              <span className="block text-2xl font-black font-display text-indigo-600">5 з 5</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">
                Нейромереж обрано
              </span>
            </div>
            <div className="bg-white/80 border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
              <span className="block text-2xl font-black font-display text-slate-800">100%</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">
                Фокус на студентів
              </span>
            </div>
            <div className="bg-white/80 border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
              <span className="block text-2xl font-black font-display text-slate-800">4 детальні</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">
                Метрики оцінювання
              </span>
            </div>
            <div className="bg-white/80 border border-slate-200 rounded-2xl p-4 shadow-sm text-center">
              <span className="block text-2xl font-black font-display text-emerald-600">Безкоштовні</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">
                Тарифи присутні
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Sub-Menu Tab Bar (Sticky on large screens, beautifully spaced) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10" id="main-navigation-menu">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl max-w-lg sm:max-w-2xl mx-auto gap-1 shadow-inner">
          {/* Btn 1 Showcase */}
          <button
            id="tab-btn-showcase"
            onClick={() => setActiveTab("showcase")}
            className={`flex-1 py-3 px-1 text-center font-display font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "showcase"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/30"
            }`}
          >
            <Award className="w-3.5 h-3.5 hidden sm:inline" />
            <span>Рейтинг Топ-5</span>
          </button>

          {/* Btn 2 Quiz Matchmaker */}
          <button
            id="tab-btn-quiz"
            onClick={() => setActiveTab("quiz")}
            className={`flex-1 py-3 px-1 text-center font-display font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "quiz"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/30"
            }`}
          >
            <Shuffle className="w-3.5 h-3.5 hidden sm:inline" />
            <span>ШІ Навігатор (Тест)</span>
          </button>

          {/* Btn 3 Comparison Matrix */}
          <button
            id="tab-btn-matrix"
            onClick={() => setActiveTab("matrix")}
            className={`flex-1 py-3 px-1 text-center font-display font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "matrix"
                ? "bg-white text-indigo-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/30"
            }`}
          >
            <Layers className="w-3.5 h-3.5 hidden sm:inline" />
            <span>Матриця порівняння</span>
          </button>
        </div>
      </section>

      {/* Main Tab Render Space */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "showcase" && (
              <AIShowcase selectedAIId={selectedAIId} onSelectAIId={setSelectedAIId} />
            )}

            {activeTab === "quiz" && (
              <AIMatchmaker onSelectAI={handleSelectAFromQuiz} />
            )}

            {activeTab === "matrix" && (
              <AIComparisonTable onSelectAI={handleSelectAFromQuiz} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Educational Advisor Section underneath */}
      <section className="max-w-3xl mx-auto mt-16 px-4 sm:px-6 text-center" id="quick-academic-disclaimer">
        <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-6 lg:p-8">
          <h4 className="text-sm font-display font-bold text-amber-900 flex items-center justify-center gap-2">
            <GraduationCap className="w-4.5 h-4.5 text-indigo-600" />
            Поради академічної доброчесності для сучасного студента
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed mt-3 text-left">
            Нейромережі — це фантастичні інструменти для структурування та брейнштормінгу знань, але вони не замінять 
            твоє власне критичне мислення. Використовуй ШІ для складання планів робіт, перевірки помилок у коді, написання 
            тестових запитань та перекладу складних статей. Проте, завжди пиши есе у власному стилі й перевіряй знайдені 
            двічі джерела на предмет галюцинацій штучного інтелекту. Успіхів у твоїх наукових звершеннях!
          </p>
        </div>
      </section>

      {/* Footer credits bar */}
      <footer className="text-center text-[10px] text-slate-400 font-mono tracking-wider mt-16 border-t border-slate-200/40 pt-6">
        <span>© 2026 AI Study Guide. Created with Antigravity Agent inside Google AI Studio. All rights reserved.</span>
      </footer>
    </div>
  );
}
