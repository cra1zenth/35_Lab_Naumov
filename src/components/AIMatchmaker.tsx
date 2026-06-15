import React, { useState, useRef, useEffect } from "react";
import { QuizQuestion, AINeuralNetwork } from "../types";
import { MATCHMAKER_QUESTIONS, AI_NETWORKS } from "../data";
import { 
  Sparkles, 
  RotateCcw, 
  ChevronRight, 
  Cpu, 
  ArrowRight,
  Check,
  MessageSquare,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AIMatchmakerProps {
  onSelectAI: (aiId: string) => void;
}

interface BotMessage {
  sender: "user" | "bot";
  text: string;
  time: string;
  recommendedAIId?: string;
}

const KEYWORD_MAP: { [key: string]: { [modelId: string]: number } } = {
  // Chatgpt keywords
  "код": { chatgpt: 4, claude: 3, gemini: 1 },
  "програмуван": { chatgpt: 4, claude: 3, gemini: 1 },
  "написати код": { chatgpt: 5, claude: 4 },
  "python": { chatgpt: 4, claude: 3 },
  "js": { chatgpt: 4, claude: 3 },
  "css": { chatgpt: 4, claude: 2 },
  "sql": { chatgpt: 4, claude: 3 },
  "сайт": { chatgpt: 4, claude: 3 },
  "ідеї": { chatgpt: 4, gemini: 3 },
  "брейнштор": { chatgpt: 4, gemini: 3 },
  "гпт": { chatgpt: 4 },
  "gpt": { chatgpt: 4 },
  "лаборатор": { chatgpt: 4, claude: 3, notebooklm: 3 },
  "лабу": { chatgpt: 4, claude: 3 },

  // Claude keywords
  "академіч": { claude: 4, notebooklm: 3, perplexity: 3 },
  "диплом": { claude: 4, perplexity: 4, notebooklm: 3 },
  "курсов": { claude: 4, perplexity: 4, notebooklm: 3 },
  "реферат": { claude: 4, chatgpt: 2, gemini: 3 },
  "есе": { claude: 4, chatgpt: 2, gemini: 3 },
  "письмо": { claude: 4, chatgpt: 2 },
  "лоorder": { claude: 4, notebooklm: 3 },
  "аналіз": { claude: 4, notebooklm: 4, perplexity: 3 },
  "глибок": { claude: 4 },
  "pdf": { claude: 4, notebooklm: 4 },
  "пдф": { claude: 4, notebooklm: 4 },
  "статт": { claude: 4, perplexity: 4 },
  "філософ": { claude: 4, notebooklm: 3 },
  "книг": { claude: 3, notebooklm: 4, gemini: 3 },
  "артефакт": { claude: 5 },
  "artifacts": { claude: 5 },
  "схем": { claude: 4 },

  // Gemini keywords
  "ютуб": { gemini: 5 },
  "youtube": { gemini: 5 },
  "відео": { gemini: 4 },
  "лекці": { gemini: 4, notebooklm: 4 },
  "експорт": { gemini: 4 },
  "гугл": { gemini: 4 },
  "docs": { gemini: 4 },
  "google": { gemini: 4 },
  "документ": { gemini: 4, claude: 3 },
  "диск": { gemini: 4 },
  "лист": { gemini: 3 },
  "вебінар": { gemini: 4 },
  "презентац": { gemini: 4, chatgpt: 3 },

  // Perplexity keywords
  "пошук": { perplexity: 5, gemini: 3 },
  "актуальн": { perplexity: 4 },
  "джерел": { perplexity: 5 },
  "бібліограф": { perplexity: 5 },
  "літератур": { perplexity: 5 },
  "факти": { perplexity: 4, notebooklm: 3 },
  "посилання": { perplexity: 5 },
  "доказ": { perplexity: 4 },
  "перевір": { perplexity: 4 },
  "науков": { perplexity: 5, claude: 3 },
  "академічний пошук": { perplexity: 5 },

  // NotebookLM keywords
  "подкаст": { notebooklm: 5 },
  "аудіо": { notebooklm: 4 },
  "конспект у подкаст": { notebooklm: 5 },
  "audio": { notebooklm: 4 },
  "голос": { notebooklm: 3, chatgpt: 3 },
  "блокнот": { notebooklm: 5 },
  "нотатник": { notebooklm: 4 },
  "екзамен": { notebooklm: 4 },
  "залік": { notebooklm: 4 },
  "тест": { notebooklm: 4 },
  "кабінет": { notebooklm: 4 },
  "вчила": { notebooklm: 4 }
};

export default function AIMatchmaker({ onSelectAI }: AIMatchmakerProps) {
  // Navigation mode
  const [matchMode, setMatchMode] = useState<"quiz" | "chat">("quiz");

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]); // indexes of options selected
  const [quizResults, setQuizResults] = useState<{ id: string; score: number; percentage: number }[] | null>(null);

  const currentQuestion = MATCHMAKER_QUESTIONS[currentQuestionIndex];

  // Chatbot state
  const [messages, setMessages] = useState<BotMessage[]>([
    {
      sender: "bot",
      text: "Привіт! Я твій інтелектуальний ШІ-Консультант. 🎓\n\nНапиши мені своє навчальне завдання (наприклад, 'потрібно написати та пояснити код на Python', 'хочу завантажити пдф і вивчити білети', або 'шукаю книги та джерела з посиланнями'), й я миттєво порекомендую найкращую нейромережу!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(updated);

    // Proceed to next or compute results
    if (currentQuestionIndex < MATCHMAKER_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    } else {
      setTimeout(() => {
        calculateResults(updated);
      }, 300);
    }
  };

  const calculateResults = (answers: number[]) => {
    // Accumulate weights for each AI model ID
    const scores: { [key: string]: number } = {
      chatgpt: 0,
      claude: 0,
      gemini: 0,
      perplexity: 0,
      notebooklm: 0,
    };

    answers.forEach((optionIndex, qIndex) => {
      const question = MATCHMAKER_QUESTIONS[qIndex];
      const selectedOption = question.options[optionIndex];
      if (selectedOption && selectedOption.weights) {
        Object.entries(selectedOption.weights).forEach(([modelId, weight]) => {
          if (scores[modelId] !== undefined) {
            scores[modelId] += weight;
          }
        });
      }
    });

    // Find the maximum potential weight for scaling to percentage
    const totalPotentialScore = 16; // Maximum standard sum of weights

    const formattedResults = Object.entries(scores)
      .map(([id, score]) => {
        // Calculate a nice scaling score out of 100
        const percentage = Math.min(Math.round((score / totalPotentialScore) * 100), 100);
        return { id, score, percentage };
      })
      .sort((a, b) => b.percentage - a.percentage);

    setQuizResults(formattedResults);
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setQuizResults(null);
  };

  const getAIMetadata = (aiId: string): AINeuralNetwork | undefined => {
    return AI_NETWORKS.find((ai) => ai.id === aiId);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userText = chatInput.trim();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message to history
    setMessages(prev => [...prev, { sender: "user", text: userText, time: timeStr }]);
    setChatInput("");
    setIsTyping(true);

    const textLower = userText.toLowerCase();

    // Score computation based on keywords
    const scores: { [key: string]: number } = {
      chatgpt: 0,
      claude: 0,
      gemini: 0,
      perplexity: 0,
      notebooklm: 0,
    };

    Object.entries(KEYWORD_MAP).forEach(([keyword, modelScores]) => {
      if (textLower.includes(keyword)) {
        Object.entries(modelScores).forEach(([modelId, weight]) => {
          scores[modelId] += weight;
        });
      }
    });

    // Check if there's any score > 0. If not, fallback to default or general categorization
    let recommendedId = "chatgpt";
    let maxScore = 0;

    Object.entries(scores).forEach(([id, score]) => {
      if (score > maxScore) {
        maxScore = score;
        recommendedId = id;
      }
    });

    // Extra soft fallback checks for common variations
    if (maxScore === 0) {
      if (textLower.includes("код") || textLower.includes("програм") || textLower.includes("сайт") || textLower.includes("питон") || textLower.includes("python") || textLower.includes("лаба") || textLower.includes("лаборатор")) {
        recommendedId = "chatgpt";
      } else if (textLower.includes("диплом") || textLower.includes("стат") || textLower.includes("курсов") || textLower.includes("письм") || textLower.includes("есе") || textLower.includes("реферат") || textLower.includes("пдф") || textLower.includes("pdf")) {
        recommendedId = "claude";
      } else if (textLower.includes("відео") || textLower.includes("вебінар") || textLower.includes("ютуб") || textLower.includes("youtube") || textLower.includes("гугл") || textLower.includes("docs") || textLower.includes("презентац")) {
        recommendedId = "gemini";
      } else if (textLower.includes("пошук") || textLower.includes("джерел") || textLower.includes("літератур") || textLower.includes("факти") || textLower.includes("автор") || textLower.includes("ссилк") || textLower.includes("посилан")) {
        recommendedId = "perplexity";
      } else if (textLower.includes("аудіо") || textLower.includes("подкаст") || textLower.includes("екзамен") || textLower.includes("тест") || textLower.includes("звук") || textLower.includes("білет") || textLower.includes("нотат")) {
        recommendedId = "notebooklm";
      }
    }

    const matchedAI = AI_NETWORKS.find(ai => ai.id === recommendedId) || AI_NETWORKS[0];

    let responseText = "";
    if (matchedAI.id === "chatgpt") {
      responseText = `За твоїм запитом я рекомендую нейромережу **ChatGPT** від OpenAI!\n\nЦе універсальний помічник, який ідеально підходить для швидкого написання та налагодження коду (Python, JS, HTML/CSS), брейншторму ідей та вирішення практичних завдань у реальному часі.`;
    } else if (matchedAI.id === "claude") {
      responseText = `Для твого завдання найкраще підійде **Claude** від Anthropic!\n\nЦей ШІ перевершує опонентів у аналізі великих PDF-файлів, роботі зі складними науковими працями та ретельному написанні есе, дипломних або курсових робіт. Спеціальне розділене вікно Artifacts допоможе тобі зручно бачити результати на екрані.`;
    } else if (matchedAI.id === "gemini") {
      responseText = `Однозначно рекомендую **Google Gemini**!\n\nЦе ідеальний асистент для інтеграції з сервісами Google (Docs, Drive, Gmail). Він дозволяє безкоштовно аналізувати довгі відеолекції з YouTube та експортувати результати в гарно оформлені Google Документи за один клік.`;
    } else if (matchedAI.id === "perplexity") {
      responseText = `Для твого навчального дослідження потрібен **Perplexity AI**!\n\nЦей ШІ працює як розумна пошукова система. Кожне його твердження супроводжується реальними посиланнями на джерела (наукові статті Semantic Scholar та сайти), тому ти легко сформуєш список використаної літератури та уникнеш вигаданих фактів.`;
    } else if (matchedAI.id === "notebooklm") {
      responseText = `Твій ідеальний вибір — **NotebookLM** від Google!\n\nВін завантажує твої особисті файли або конспекти й працює суворо по них. Головна супер-опція — створення живого двоосібного аудіоподкасту, що озвучує твої нудні лекції, щоб слухати їх у дорозі або перед іспитом.`;
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        sender: "bot",
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedAIId: recommendedId
      }]);
    }, 1200);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm max-w-4xl mx-auto" id="quiz-workspace">
      <div className="border-b border-slate-100 pb-5 mb-6 text-center">
        <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold px-3 py-1 rounded-full text-xs">
          ШІ Підбір для Студентів
        </span>
        <h2 className="text-2xl font-display font-extrabold text-slate-900 mt-2">
          Підбір ідеального асистента
        </h2>
        
        {/* Toggle between Quiz & Smart Bot */}
        <div className="flex justify-center mt-5">
          <div className="bg-slate-100/80 p-1 rounded-xl flex gap-1">
            <button
              onClick={() => setMatchMode("quiz")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-display font-semibold text-xs transition-all cursor-pointer ${
                matchMode === "quiz" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-505 hover:text-slate-900"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Покроковий тест</span>
            </button>
            <button
              onClick={() => setMatchMode("chat")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-display font-semibold text-xs transition-all cursor-pointer ${
                matchMode === "chat" 
                  ? "bg-white text-slate-900 shadow-sm" 
                  : "text-slate-505 hover:text-slate-900"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Консультант-бот</span>
            </button>
          </div>
        </div>
      </div>

      {matchMode === "quiz" ? (
        <AnimatePresence mode="wait">
          {!quizResults ? (
            // Quiz steps screen
            <motion.div
              key="quiz-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              {/* Progress indicators */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-1">
                <span>Запитання {currentQuestionIndex + 1} з {MATCHMAKER_QUESTIONS.length}</span>
                <div className="flex gap-1">
                  {MATCHMAKER_QUESTIONS.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-8 h-1 rounded-full transition-all duration-300 ${
                        idx <= currentQuestionIndex ? "bg-indigo-600" : "bg-slate-100"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question card */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8">
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-indigo-600">
                  Крок {currentQuestionIndex + 1}
                </span>
                <h3 className="text-xl font-display font-semibold text-slate-800 mt-1">
                  {currentQuestion?.question}
                </h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion?.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                  return (
                    <motion.button
                      key={idx}
                      id={`btn-option-${currentQuestionIndex}-${idx}`}
                      whileHover={{ scale: 1.01, y: -1 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-4 cursor-pointer min-h-[90px] ${
                        isSelected
                          ? "bg-white border-indigo-600 shadow-md ring-1 ring-indigo-600/10"
                          : "bg-slate-50 hover:bg-white border-slate-100 hover:border-slate-200"
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0  mt-0.5 ${
                        isSelected ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-400"
                      }`}>
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : String.fromCharCode(65 + idx)}
                      </span>
                      <span className="font-medium text-slate-700 text-sm leading-relaxed">
                        {option.text}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Quiz Footer indicators */}
              <div className="flex justify-between items-center mt-2 px-1">
                <button
                  id="btn-quiz-back"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:hover:text-slate-400 font-display transition cursor-pointer"
                >
                  Назад
                </button>
                <span className="text-xs text-slate-400 font-display">
                  Проходження прискорює пошук асистента
                </span>
              </div>
            </motion.div>
          ) : (
            // Quiz Results screen
            <motion.div
              key="quiz-results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {(() => {
                const topMatch = quizResults[0];
                const aiData = getAIMetadata(topMatch.id);
                if (!aiData) return null;

                return (
                  <div className="bg-indigo-50/50 border border-indigo-100/80 rounded-3xl p-6 md:p-8 text-center flex flex-col items-center gap-4">
                    <div className="relative">
                      {aiData.imageUrl ? (
                        <img 
                          src={aiData.imageUrl} 
                          alt={aiData.name} 
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-md"
                        />
                      ) : (
                        <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center text-2xl font-black ${aiData.logoColor}`}>
                          {aiData.name.substring(0, 2)}
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1 rounded-full text-[10px] shadow">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-indigo-600">
                        Найкращий збіг
                      </span>
                      <h3 className="text-3xl font-display font-black text-slate-900 mt-1">
                        {aiData.name} ({topMatch.percentage}% збіг)
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">
                        {aiData.tagline}. Ця нейромережа найкраще відповідає твоїм звичкам у вивченні матеріалів, аналізі даних та підготовці до занять.
                      </p>
                    </div>

                    {/* Highlights container */}
                    <div className="w-full max-w-lg bg-white p-4 rounded-2xl border border-slate-100 text-left space-y-2 mt-2">
                      <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase block border-b border-slate-50 pb-1.5">
                        Головна фішка для тебе
                      </span>
                      <h5 className="font-display font-extrabold text-slate-800 text-sm">
                        {aiData.interfaceSpecialty.title}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {aiData.interfaceSpecialty.description}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 flex-col sm:flex-row w-full max-w-md justify-center mt-3">
                      <button
                        id="btn-quiz-view-details"
                        onClick={() => onSelectAI(topMatch.id)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-display font-semibold text-sm py-3.5 px-6 rounded-2xl transition shadow-md shadow-indigo-600/10 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Огляд {aiData.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        id="btn-quiz-reset"
                        onClick={handleReset}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-semibold text-sm py-3.5 px-6 rounded-2xl transition cursor-pointer flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Пройти знову</span>
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Other matches breakdown */}
              <div className="space-y-3 mt-4">
                <h4 className="text-sm font-display font-bold text-slate-500 uppercase tracking-wider">
                  Інші відповідні варіанти
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quizResults.slice(1).map((match) => {
                    const ai = getAIMetadata(match.id);
                    if (!ai) return null;

                    return (
                      <div
                        key={match.id}
                        className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          {ai.imageUrl ? (
                            <img 
                              src={ai.imageUrl} 
                              alt={ai.name} 
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-xl object-cover border border-slate-100"
                            />
                          ) : (
                            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-xs font-bold leading-none ${ai.logoColor}`}>
                              {ai.name.substring(0, 2)}
                            </div>
                          )}
                          <div>
                            <h5 className="font-display font-bold text-sm text-slate-800">{ai.name}</h5>
                            <span className="text-[10px] text-slate-400 font-medium">від {ai.developer}</span>
                          </div>
                        </div>

                        <div className="text-right flex items-center gap-4">
                          <div>
                            <span className="block font-display font-extrabold text-base text-slate-800">
                              {match.percentage}%
                            </span>
                            <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-bold">збіг</span>
                          </div>
                          <button
                            id={`btn-match-view-${match.id}`}
                            onClick={() => onSelectAI(match.id)}
                            className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 text-indigo-605 transition cursor-pointer"
                            title="Переглянути деталі"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        // Chatbot Screen
        <motion.div
          key="chat-advisor"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-4"
        >
          {/* Messages Log */}
          <div className="border border-slate-100 bg-slate-50/50 rounded-2xl p-4 min-h-[350px] max-h-[450px] overflow-y-auto flex flex-col gap-4 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div 
                key={idx}
                className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"}`}
              >
                <div className={`p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.sender === "user" 
                    ? "bg-indigo-600 text-white rounded-tr-none shadow-sm font-medium" 
                    : "bg-white border border-slate-200/85 text-slate-800 rounded-tl-none shadow-sm"
                }`}>
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">
                  {msg.time}
                </span>

                {/* Inline Recommended AI badge/card */}
                {msg.sender === "bot" && msg.recommendedAIId && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full mt-3 bg-white border border-indigo-100 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 max-w-md self-start text-left"
                  >
                    <div className="flex items-center gap-3">
                      {(() => {
                        const ai = getAIMetadata(msg.recommendedAIId!);
                        if (!ai) return null;
                        return (
                          <>
                            {ai.imageUrl ? (
                              <img 
                                src={ai.imageUrl} 
                                alt={ai.name} 
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 rounded-xl object-cover border border-slate-105"
                              />
                            ) : (
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${ai.logoColor}`}>
                                {ai.name.substring(0, 2)}
                              </div>
                            )}
                            <div>
                              <h4 className="font-display font-bold text-slate-800 text-sm">{ai.name}</h4>
                              <p className="text-[10px] text-slate-400">підходить найкраще</p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    <button
                      onClick={() => onSelectAI(msg.recommendedAIId!)}
                      className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-display font-semibold text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shrink-0 shadow-sm"
                    >
                      <span>Огляд ШІ</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="self-start flex items-center gap-1.5 bg-white border border-slate-100 p-3 px-4 rounded-2xl rounded-tl-none shadow-sm">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Form message input */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Опиши що потрібно зробити (напр. 'написати дипломну', 'програма на Python'...)"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:bg-white transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!chatInput.trim() || isTyping}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-150 disabled:text-slate-400 text-white shadow-md shadow-indigo-600/10 px-5 rounded-2xl transition font-display font-semibold text-sm cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <span>Порадити</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
