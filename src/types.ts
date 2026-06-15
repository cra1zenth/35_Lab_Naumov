export interface AIRating {
  interface: number;       // Інтерфейс
  convenience: number;     // Зручність
  functionality: number;   // Функціональність
  studentBenefit: number;  // Користь для студентів
  overall: number;         // Загальна оцінка
}

export interface AIInterfaceSpecialty {
  title: string;           // Фірмова фішка
  description: string;     // Опис інтерфейсного рішення
  studentBenefit: string;  // Чому це зручно студенту
}

export interface AIPromptTemplate {
  title: string;           // Назва шаблону
  prompt: string;          // Сам промпт
  tip: string;             // Порада щодо використання
}

export interface AINeuralNetwork {
  id: string;
  name: string;
  tagline: string;
  developer: string;
  logoColor: string;      // Tailwind classes (e.g., 'bg-blue-100 text-blue-600')
  badgeColor: string;     // Accent colors
  accentColor: string;    // Direct hex or tailwind name for visual highlights
  website: string;
  ratings: AIRating;
  pros: string[];
  cons: string[];
  interfaceSpecialty: AIInterfaceSpecialty;
  bestFor: string;
  mainUseCases: string[];
  promptTemplate: AIPromptTemplate;
  freeTierDetails: string;
  description: string;
  imageUrl?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    weights: { [key: string]: number }; // modelId: weight
  }[];
}

export interface StudyItem {
  id: string;
  title: string;
  subject: string;
  aiTool: string;
  promptCopied: string;
  notes: string;
  date: string;
}
