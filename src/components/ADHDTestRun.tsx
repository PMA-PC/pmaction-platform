import React, { useState, useCallback } from 'react';
import {
  Brain,
  Heart,
  Clock,
  Target,
  Activity,
  HelpCircle,
  ShoppingBag,
  X,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
// Types
interface SubCondition {
  id: string;
  name: string;
  description: string;
  prevalence: string;
  coreChallenges: string[];
  clinicalBasis: string[];
  assessmentTools: string[];
  icon: React.ReactNode;
  color: string;
}
interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  scores: number[];
  domain: string;
}
interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}
interface Resource {
  id: string;
  type: 'physical-product' | 'digital-tool' | 'exercise';
  name: string;
  description: string;
  price: string;
  features: string[];
  evidence: string;
}
// Mock Data
const ADHD_SUB_CONDITIONS: SubCondition[] = [
  {
    id: "executive-function",
    name: "Executive Function Challenges",
    description: "Difficulties with cognitive processes that help manage thoughts, actions, and emotions to achieve goals.",
    prevalence: "Affects 89% of adults with ADHD",
    coreChallenges: ["Working memory limitations", "Difficulty prioritizing", "Trouble initiating tasks"],
    clinicalBasis: ["Neuropsychological testing", "DSM-5 criteria"],
    assessmentTools: ["BRIEF-A", "D-KEFS"],
    icon: <Brain className="w-5 h-5" />,
    color: "#865DFF",
  },
  {
    id: "emotional-regulation",
    name: "Emotional Regulation Difficulties",
    description: "Struggles managing emotional responses and maintaining mood stability.",
    prevalence: "Affects 60-80% of ADHD population",
    coreChallenges: ["Impulsivity", "Low frustration tolerance", "Mood swings"],
    clinicalBasis: ["Self-report scales", "Clinical interview"],
    assessmentTools: ["Affective Lability Scale", "Conners Adult ADHD Rating Scale"],
    icon: <Heart className="w-5 h-5" />,
    color: "#FF6A5B",
  },
  {
    id: "processing-speed",
    name: "Processing Speed Issues",
    description: "Slower mental processing and response times affecting productivity.",
    prevalence: "Common in inattentive ADHD subtype",
    coreChallenges: ["Slow reading", "Slow task completion"],
    clinicalBasis: ["Clinical observation", "WISC-V Processing Speed Index"],
    assessmentTools: ["WAIS-IV", "WISC-V"],
    icon: <Clock className="w-5 h-5" />,
    color: "#3EC495",
  },
  {
    id: "attention-regulation",
    name: "Attention Regulation Challenges",
    description: "Struggles sustaining, shifting, or dividing attention as needed.",
    prevalence: "Core symptom of ADHD",
    coreChallenges: ["Distractibility", "Daydreaming", "Difficulty focusing"],
    clinicalBasis: ["Continuous Performance Test", "Clinical interview"],
    assessmentTools: ["CPT", "TOVA"],
    icon: <Target className="w-5 h-5" />,
    color: "#FFD700",
  },
];

// ADHDTestRun Component
export interface ADHDTestRunProps {
  onBack?: () => void;
}
export const ADHDTestRun: React.FC<ADHDTestRunProps> = ({ onBack }) => {
  // State
  const [currentView, setCurrentView] = useState<'overview' | 'sub-condition' | 'quiz' | 'results' | 'resources'>('overview');
  const [selectedSubCondition, setSelectedSubCondition] = useState<SubCondition | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [quizResultScore, setQuizResultScore] = useState<number | null>(null);
  const [quizResultLevel, setQuizResultLevel] = useState<string | null>(null);

  // Handlers
  const handleAnswerSelect = useCallback((questionId: string, score: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: score }));
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    // Add logic to calculate score, show results, etc.
  }, []);

  const handleViewResources = useCallback(() => {
    setCurrentView('resources');
  }, []);

  const handleResetExplorer = useCallback(() => {
    setCurrentView('overview');
    setSelectedSubCondition(null);
    setQuizAnswers({});
    setCurrentQuestionIndex(0);
    setQuizResultScore(null);
    setQuizResultLevel(null);
  }, []);

  // Render logic (simplified)
  if (currentView === 'quiz' && selectedSubCondition) {
    // Mock question object
    const question = {
      id: 'q1',
      question: 'How often do you struggle to focus on a single task?',
      options: ['Never', 'Sometimes', 'Often', 'Almost always'],
      scores: [0, 1, 2, 3],
      domain: 'attention',
    };
    return (
      <div className="bg-bg-card rounded-xl p-6 shadow-card-light border border-border-light animate-fadeIn mb-4">
        <h2 className="text-2xl font-bold text-primary-brand mb-4">
          {selectedSubCondition.name}
        </h2>
        <div className="text-sm text-text-secondary mb-4">
          Question {currentQuestionIndex + 1} of 1
        </div>
        <div className="w-full bg-charcoal-700 rounded-full h-2">
          <div
            className="bg-primary-brand h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / 1) * 100}%` }}
          />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-6">
          {question.question}
        </h3>
        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswerSelect(question.id, question.scores[idx])}
              className="w-full text-left p-4 border-2 border-charcoal-600 rounded-lg text-text-primary hover:border-primary-brand hover:bg-charcoal-700 transition-colors duration-200"
            >
              {option}
            </button>
          ))}
        </div>
        <button
          className="btn btn-secondary py-2 px-4 rounded-xl font-semibold text-sm flex items-center gap-1 bg-charcoal-700 text-text-primary border-2 border-charcoal-600 hover:bg-charcoal-600 transition-all duration-300 mt-6"
          onClick={handleResetExplorer}
        >
          <ArrowLeft className="w-4 h-4" /> Cancel Quiz
        </button>
      </div>
    );
  }
  // Minimal overview - just list sub-conditions
  return (
    <div className="bg-bg-card rounded-xl p-6 shadow-card-light border border-border-light animate-fadeIn mb-4">
      <h2 className="text-2xl font-bold text-primary-brand mb-4">ADHD Explorer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ADHD_SUB_CONDITIONS.map((condition) => (
          <div
            key={condition.id}
            className="border rounded-lg p-4 flex flex-col gap-2 cursor-pointer"
            style={{ borderColor: condition.color }}
            onClick={() => {
              setSelectedSubCondition(condition);
              setCurrentView('quiz');
            }}
          >
            <div>{condition.icon}</div>
            <div className="font-bold" style={{ color: condition.color }}>{condition.name}</div>
            <div className="text-xs text-text-secondary">{condition.description}</div>
          </div>
        ))}
      </div>
      {onBack && (
        <button
          className="btn btn-secondary mt-8"
          onClick={onBack}
        >
          <ArrowLeft className="inline-block mr-2 w-4 h-4" /> Back
        </button>
      )}
    </div>
  );
};
