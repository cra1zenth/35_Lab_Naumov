import React, { useState } from "react";
import { AINeuralNetwork } from "../types";
import { AI_NETWORKS } from "../data";
import { 
  ExternalLink, 
  Award, 
  TrendingUp, 
  Cpu, 
  Layout, 
  PlusCircle, 
  X, 
  CheckCircle2, 
  XCircle, 
  GraduationCap,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AIShowcaseProps {
  selectedAIId?: string;
  onSelectAIId?: (id: string) => void;
}

export default function AIShowcase({ selectedAIId, onSelectAIId }: AIShowcaseProps = {}) {
  const [internalSelectedAI, setInternalSelectedAI] = useState<AINeuralNetwork>(AI_NETWORKS[0]);

  const selectedAI = selectedAIId 
    ? (AI_NETWORKS.find(ai => ai.id === selectedAIId) || AI_NETWORKS[0])
    : internalSelectedAI;

  const handleSelectAI = (ai: AINeuralNetwork) => {
    if (onSelectAIId) {
      onSelectAIId(ai.id);
    } else {
      setInternalSelectedAI(ai);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="ai-showcase-container">
      {/* Left Column: AI Cards Quick Selector (cols 5) */}
      <div className="lg:col-span-5 flex flex-col gap-4" id="ai-selector-list">
        <h3 className="text-xl font-display font-semibold text-slate-800 flex items-center gap-2 mb-2">
          <GraduationCap className="w-5 h-5 text-indigo-600" />
          Рейтинг Топ-5 нейромереж
        </h3>
        
        <div className="space-y-3">
          {AI_NETWORKS.map((ai, index) => {
            const isSelected = ai.id === selectedAI.id;
            return (
              <motion.button
                key={ai.id}
                id={`btn-select-${ai.id}`}
                onClick={() => handleSelectAI(ai)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                  isSelected 
                    ? "bg-white border-indigo-600 shadow-md ring-1 ring-indigo-600/10" 
                    : "bg-slate-50 hover:bg-white border-slate-200 shadow-sm"
                }`}
              >
                {/* AI Brand Image with Number Badge Overlay */}
                <div className="relative flex-shrink-0">
                  {ai.imageUrl ? (
                    <img 
                      src={ai.imageUrl} 
                      alt={`${ai.name} Logo`} 
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-sm"
                    />
                  ) : (
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-black text-xs ${ai.logoColor}`}>
                      {ai.name.substring(0, 2)}
                    </div>
                  )}
                  <span className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full flex items-center justify-center font-display font-bold text-[9px] shadow-sm ${
                    isSelected ? "bg-indigo-600 text-white" : "bg-slate-600 text-white"
                  }`}>
                    {index + 1}
                  </span>
                </div>

                {/* Info summary */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-bold text-slate-800 text-base">
                      {ai.name}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      від {ai.developer}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {ai.tagline}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${ai.badgeColor}`}>
                      {ai.ratings.overall.toFixed(1)} / 10
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-400">
                      {ai.id === "perplexity" ? "Пошук знань" : ai.id === "notebooklm" ? "Смарт-нотатник" : "Генеративний чат"}
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Right Column: AI Deep Detail Panel (cols 7) */}
      <div className="lg:col-span-7" id="ai-detail-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAI.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col gap-6"
            id={`ai-detail-card-${selectedAI.id}`}
          >
            {/* Header section with brand colors */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-4">
                {selectedAI.imageUrl ? (
                  <img 
                    src={selectedAI.imageUrl} 
                    alt={`${selectedAI.name} Graphic`} 
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200/60 shadow-md"
                  />
                ) : (
                  <div className={`p-4 rounded-2xl border text-xl font-black ${selectedAI.logoColor}`}>
                    {selectedAI.name.substring(0, 2)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-display font-bold text-slate-900">
                      {selectedAI.name}
                    </h2>
                    <a 
                      href={selectedAI.website} 
                      target="_blank" 
                      referrerPolicy="no-referrer"
                      className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
                      title="Відвідати офіційний сайт"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-sm text-indigo-600 font-medium mt-0.5">
                    Розробник: {selectedAI.developer}
                  </p>
                </div>
              </div>

              {/* General rating indicator */}
              <div className="flex flex-col items-center bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 self-start sm:self-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Загальний бал</span>
                <span className="text-3xl font-display font-black text-slate-800">
                  {selectedAI.ratings.overall.toFixed(1)}
                  <span className="text-sm text-slate-400 font-normal">/10</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed text-sm">
              {selectedAI.description}
            </p>

            {/* Rating break down progress bars */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Аналіз за параметрами для студентів
              </h4>
              <div className="space-y-2">
                {/* 1. Interface */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Layout className="w-3.5 h-3.5 text-slate-400" />
                      Інтерфейс (Зрозумілість, Швидкість)
                    </span>
                    <span className="font-bold">{selectedAI.ratings.interface.toFixed(1)}/10</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-1.5 rounded-full" 
                      style={{ width: `${selectedAI.ratings.interface * 10}%` }}
                    />
                  </div>
                </div>

                {/* 2. Convenience */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-slate-400" />
                      Зручність використання у навчанні
                    </span>
                    <span className="font-bold">{selectedAI.ratings.convenience.toFixed(1)}/10</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-1.5 rounded-full" 
                      style={{ width: `${selectedAI.ratings.convenience * 10}%` }}
                    />
                  </div>
                </div>

                {/* 3. Functionality */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                      Функціональність
                    </span>
                    <span className="font-bold">{selectedAI.ratings.functionality.toFixed(1)}/10</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-1.5 rounded-full" 
                      style={{ width: `${selectedAI.ratings.functionality * 10}%` }}
                    />
                  </div>
                </div>

                {/* 4. Student Benefit */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-slate-400" />
                      Користь для студентів
                    </span>
                    <span className="font-bold">{selectedAI.ratings.studentBenefit.toFixed(1)}/10</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-1.5 rounded-full" 
                      style={{ width: `${selectedAI.ratings.studentBenefit * 10}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pros & Cons side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pros */}
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4">
                <h4 className="text-sm font-display font-bold text-emerald-800 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Плюси
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {selectedAI.pros.map((pro, index) => (
                    <li key={index} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-500 font-bold block mt-0.5">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4">
                <h4 className="text-sm font-display font-bold text-rose-800 flex items-center gap-2 mb-3">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  Мінуси
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  {selectedAI.cons.map((con, index) => (
                    <li key={index} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-rose-500 font-bold block mt-0.5">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interface spotlight */}
            <div className="border border-slate-100 rounded-2xl p-5 bg-indigo-50/10">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-1">
                Фокус на інтерфейс
              </span>
              <h4 className="font-display font-bold text-slate-800 text-base mb-2">
                {selectedAI.interfaceSpecialty.title}
              </h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                {selectedAI.interfaceSpecialty.description}
              </p>
              <div className="bg-white/80 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 flex items-start gap-2">
                <Info className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Перевага для студента: </span>
                  {selectedAI.interfaceSpecialty.studentBenefit}
                </div>
              </div>
            </div>

            {/* Best for & free tier */}
            <div className="divide-y divide-slate-100 border-y border-slate-100 py-3 text-xs">
              <div className="py-2 flex items-start justify-between gap-4">
                <span className="font-semibold text-slate-400 min-w-[120px]">Найкраще для:</span>
                <span className="text-slate-800 text-right font-medium">{selectedAI.bestFor}</span>
              </div>
              <div className="py-2 flex items-start justify-between gap-4">
                <span className="font-semibold text-slate-400 min-w-[120px]">Безкоштовний тариф:</span>
                <span className="text-slate-800 text-right leading-relaxed">{selectedAI.freeTierDetails}</span>
              </div>
            </div>



          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
