import React, { useState } from "react";
import { AI_NETWORKS } from "../data";
import { 
  Check, 
  X, 
  HelpCircle, 
  Search, 
  ExternalLink, 
  MessageSquare,
  Sparkles,
  AlertCircle
} from "lucide-react";

interface AIComparisonTableProps {
  onSelectAI: (id: string) => void;
}

export default function AIComparisonTable({ onSelectAI }: AIComparisonTableProps) {
  const [highlightedRow, setHighlightedRow] = useState<string | null>(null);

  const features = [
    {
      key: "focus",
      label: "Головна спеціалізація",
      tooltip: "Під які завдання оптимізовано рушій моделі",
      values: {
        chatgpt: "Універсальний чат і програмування",
        claude: "Академічний аналіз, написання текстів",
        gemini: "Робота з великими файлами, YouTube",
        perplexity: "Миттєвий науковий пошук фактів",
        notebooklm: "Робота з власними джерелами, подкасти"
      }
    },
    {
      key: "webSearch",
      label: "Вбудований пошук (інтернет)",
      tooltip: "Чи вміє ШІ самостійно шукати відповіді у реальному часі",
      isPremiumOnly: false,
      values: {
        chatgpt: "Є (базовий та повільніший)",
        claude: "Ні (знання обмежені датою)",
        gemini: "Так (миттєвий Google Пошук)",
        perplexity: "Так (вбудоване ядро пошуковика)",
        notebooklm: "Ні (тільки завантажені документи)"
      }
    },
    {
      key: "pdfLimit",
      label: "Аналіз великих PDF книг",
      tooltip: "Можливість завантажувати великі конспекти, підручники чи дисертації",
      values: {
        chatgpt: "Так (середні обсяги)",
        claude: "Так (файли до 30-40 МБ)",
        gemini: "Так (надвеликі файли, до 2 млн токенів)",
        perplexity: "Так (базовий аналіз до 5-10 файлів)",
        notebooklm: "Нішевий ТОП (до 50 файлів по 500k слів)"
      }
    },
    {
      key: "artifacts",
      label: "Інтерактивний екран (Artifacts)",
      tooltip: "Окремий розділений екран для відображення коду, схем та діаграм",
      values: {
        chatgpt: "Ні (все виводиться у чаті)",
        claude: "Так (фірмова зона Artifacts)",
        gemini: "Ні (стандартний markdown у чаті)",
        perplexity: "Кастомні Сторінки (інструмент Pages)",
        notebooklm: "Кабінет заміток та чату"
      }
    },
    {
      key: "exportDocs",
      label: "Експорт у Google Docs",
      tooltip: "Створення окремого файлу в хмарі Google Docs в 1 клік",
      values: {
        chatgpt: "Ні (тільки копіювання тексту)",
        claude: "Ні (лише копіювання в буфер)",
        gemini: "Так (пряма кнопка експорту)",
        perplexity: "Ні (колекції всередині акаунта)",
        notebooklm: "Так (копіювання в Google Документ)"
      }
    },
    {
      key: "audioPodcasts",
      label: "Аудіо-подкасти з конспектів",
      tooltip: "Чи вміє створювати звукові обговорення ваших матеріалів голосом",
      values: {
        chatgpt: "Ні (лише голосовий діалог)",
        claude: "Ні",
        gemini: "Ні",
        perplexity: "Ні",
        notebooklm: "Так (революційна опція Audio Overview)"
      }
    },
    {
      key: "freeTier",
      label: "Умови безкоштовної версії",
      tooltip: "Які обмеження чекають на студента без платної підписки",
      values: {
        chatgpt: "Необмежений чат GPT-4o-mini, ліміт на GPT-4o",
        claude: "Суворі ліміти на Sonnet, закривається кожні 3-5 год",
        gemini: "Повністю безкоштовні завантаження, м'які ліміти",
        perplexity: "Необмежений пошук, 5 Pro-запитів кожні 4 год",
        notebooklm: "Повністю безкоштовний проект (Labs Google)"
      }
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col gap-6" id="comparison-matrix">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-display font-semibold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Порівняльна матриця ШІ
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Наведіть курсор або натисніть на рядок, щоб детальніше дослідити конкретну можливість.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-xl px-3 py-1.5 self-start">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Усі дані актуальні на 2026 рік</span>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto border border-slate-100 rounded-2xl">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-4 text-xs font-display font-extrabold text-slate-700 uppercase tracking-wider w-[240px]">
                Можливість / Параметр
              </th>
              {AI_NETWORKS.map((ai) => (
                <th key={ai.id} className="p-4 text-xs font-display font-bold text-slate-800 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-extrabold text-sm text-slate-900 block">{ai.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">від {ai.developer}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {features.map((feature) => {
              const isHighlighted = highlightedRow === feature.key;
              return (
                <tr
                  key={feature.key}
                  id={`comparison-row-${feature.key}`}
                  onMouseEnter={() => setHighlightedRow(feature.key)}
                  onMouseLeave={() => setHighlightedRow(null)}
                  onClick={() => setHighlightedRow(isHighlighted ? null : feature.key)}
                  className={`transition-all ${
                    isHighlighted ? "bg-indigo-50/50" : "hover:bg-slate-50/40"
                  }`}
                >
                  <td className="p-4 font-semibold text-slate-700 min-w-[200px] border-r border-slate-50">
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-slate-800">{feature.label}</span>
                      <span className="text-[10px] text-slate-400 font-normal leading-normal mt-0.5 max-w-[220px]">
                        {feature.tooltip}
                      </span>
                    </div>
                  </td>
                  {AI_NETWORKS.map((ai) => {
                    const val = feature.values[ai.id as keyof typeof feature.values];
                    // Dynamic render helper for checks or specific colors
                    let textStyle = "text-slate-600";
                    let isYes = val.startsWith("Так") || val.startsWith("Є") || val.includes("ТОП");
                    let isNo = val.startsWith("Ні");

                    if (isYes) textStyle = "text-indigo-900 font-semibold";
                    if (isNo) textStyle = "text-slate-400";

                    return (
                      <td key={ai.id} className="p-4 text-center border-r border-slate-50 max-w-[170px]">
                        <div className="flex flex-col items-center justify-center gap-1.5">
                          {isYes && <Check className="w-4 h-4 text-emerald-500" />}
                          {isNo && <X className="w-4.5 h-4.5 text-slate-300" />}
                          <span className={`text-[11px] leading-relaxed block ${textStyle}`}>
                            {val}
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Row details breakdown under the table in mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mt-2">
        {AI_NETWORKS.map((ai) => (
          <button
            key={ai.id}
            id={`btn-table-goto-${ai.id}`}
            onClick={() => onSelectAI(ai.id)}
            className="p-3 text-center rounded-2xl bg-slate-50 hover:bg-white hover:border-indigo-500 border border-slate-200 transition text-[11px] font-display font-bold text-slate-700 cursor-pointer flex flex-col items-center gap-1"
          >
            <span>Огляд {ai.name}</span>
            <span className="text-[9px] text-slate-400 font-normal">повна картка →</span>
          </button>
        ))}
      </div>
    </div>
  );
}
