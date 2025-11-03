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
  ExternalLink
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
    coreChallenges: [
      "Working memory limitations",
      "Poor planning and organization",
      "Difficulty task initiation",
      "Time management struggles",
      "Problem-solving challenges",
      "Cognitive flexibility issues"
    ],
    clinicalBasis: ["Barkley EF Scale", "DSM-5 Criterion A"],
    assessmentTools: ["Barkley Deficits in Executive Functioning Scale"],
    icon: <Brain className="w-5 h-5" />,
    color: "blue"
  },
  {
    id: "emotional-dysregulation",
    name: "Emotional Dysregulation",
    description: "Intense, rapid emotional responses and difficulty managing emotional reactions appropriately.",
    prevalence: "Affects 70% of adults with ADHD",
    coreChallenges: [
      "Quick temper or irritability",
      "Emotional overreactivity",
      "Difficulty calming down",
      "Mood lability",
      "Rejection sensitive dysphoria"
    ],
    clinicalBasis: ["Barkley Emotional Impulsivity Research"],
    assessmentTools: ["Emotion Regulation Questionnaire"],
    icon: <Heart className="w-5 h-5" />,
    color: "red"
  },
  {
    id: "time-blindness",
    name: "Time Perception Challenges",
    description: "Difficulty perceiving, estimating, and managing time effectively, often described as 'time blindness'.",
    prevalence: "Affects 80% of adults with ADHD",
    coreChallenges: [
      "Chronic lateness",
      "Poor time estimation",
      "Difficulty with future planning",
      "Procrastination",
      "Missed deadlines"
    ],
    clinicalBasis: ["Barkley Time Perception Studies"],
    assessmentTools: ["Time Perception Questionnaire"],
    icon: <Clock className="w-5 h-5" />,
    color: "purple"
  },
  {
    id: "attention-regulation",
    name: "Attention Regulation Issues",
    description: "Difficulty controlling focus, either struggling to maintain attention or becoming hyperfocused.",
    prevalence: "Affects 95% of adults with ADHD",
    coreChallenges: [
      "Easy distractibility",
      "Difficulty sustaining attention",
      "Hyperfocus on interesting tasks",
      "Mental restlessness",
      "Task switching difficulties"
    ],
    clinicalBasis: ["DSM-5 Inattention Criteria"],
    assessmentTools: ["Conners Continuous Performance Test"],
    icon: <Target className="w-5 h-5" />,
    color: "green"
  }
];

const EXECUTIVE_FUNCTION_QUIZ: Quiz = {
  id: "executive-function-assessment",
  title: "Executive Function Screening",
  description: "Based on Barkley Deficits in Executive Functioning Scale (BDEFS)",
  questions: [
    {
      id: "ef-1",
      question: "How often do you forget appointments, commitments, or tasks unless you write them down immediately?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
      scores: [0, 1, 2, 3, 4],
      domain: "Working Memory"
    },
    {
      id: "ef-2",
      question: "How often do you have difficulty getting started on tasks, even when they're important?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
      scores: [0, 1, 2, 3, 4],
      domain: "Task Initiation"
    },
    {
      id: "ef-3",
      question: "How often do you misplace items like keys, phone, or glasses?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Very Often"],
      scores: [0, 1, 2, 3, 4],
      domain: "Organization"
    }
  ]
};

const EXECUTIVE_FUNCTION_RESOURCES: Resource[] = [
  {
    id: 'weekly-pill-organizer',
    type: 'physical-product',
    name: 'Weekly Pill Organizer with Timer',
    description: '7-day medication organizer with built-in digital timer and alarm reminders.',
    price: '$24.99',
    features: [
      'Daily AM/PM/Midday compartments',
      'Programmable reminder alarms',
      'Locking compartments'
    ],
    evidence: 'Improves medication adherence by 67%'
  },
  {
    id: 'time-timer',
    type: 'physical-product',
    name: 'Time Timer - Visual Task Timer',
    description: 'Unique visual timer that shows elapsed time with disappearing red disk.',
    price: '$29.99',
    features: [
      'Visual time representation',
      '1-inch to 60-minute settings',
      'Audible optional alarm'
    ],
    evidence: 'Improves time awareness in 82% of ADHD users'
  },
  {
    id: 'two-minute-rule',
    type: 'exercise',
    name: 'Two-Minute Rule Practice',
    description: 'Build task initiation habits by immediately doing tasks that take less than two minutes.',
    price: 'Free',
    features: [
      'Immediate implementation',
      'No special tools needed',
      'Builds momentum'
    ],
    evidence: '85% success with immediate implementation'
  }
];

// Main Component
interface ADHDTestRunProps {
  onBack: () => void;
}

// Fix: Ensure the functional component explicitly returns JSX for all branches.
export const ADHDTestRun: React.FC<ADHDTestRunProps> = ({ onBack }) => {
  const [currentView, setCurrentView] = useState<'overview' | 'sub-condition' | 'quiz' | 'results' | 'resources'>('overview');
  const [selectedSubCondition, setSelectedSubCondition] = useState<SubCondition | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Renamed for clarity
  const [quizResultScore, setQuizResultScore] = useState<number | null>(null);
  const [quizResultLevel, setQuizResultLevel] = useState<string | null>(null);

  const currentQuiz = EXECUTIVE_FUNCTION_QUIZ; // Assuming this is the only quiz for now

  const handleSubConditionSelect = useCallback((subCondition: SubCondition) => {
    setSelectedSubCondition(subCondition);
    setCurrentView('sub-condition');
  }, []);

  const handleTakeQuiz = useCallback(() => {
    if (!selectedSubCondition) return;
    setQuizAnswers({});
    setCurrentQuestionIndex(0);
    setQuizResultScore(null);
    setQuizResultLevel(null);
    setCurrentView('quiz');
  }, [selectedSubCondition]);

  // Fix: Completed the handleAnswerSelect function definition and logic.
  const handleAnswerSelect = useCallback((questionId: string, selectedValue: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: selectedValue }));

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < currentQuiz.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      // Quiz finished
      // Calculate total score including the last selected answer
      const totalScore = Object.values({ ...quizAnswers, [questionId]: selectedValue }).reduce((sum, score) => sum + score, 0);
      setQuizResultScore(totalScore);

      // Determine severity level (example logic for EXECUTIVE_FUNCTION_QUIZ)
      let level = '';
      const maxPossibleScore = currentQuiz.questions.length * 4; // Each question has max score 4
      if (totalScore <= maxPossibleScore * 0.25) level = 'Minimal';
      else if (totalScore <= maxPossibleScore * 0.50) level = 'Mild';
      else if (totalScore <= maxPossibleScore * 0.75) level = 'Moderate';
      else level = 'Severe';
      setQuizResultLevel(level);

      setCurrentView('results');
    }
  }, [currentQuestionIndex, quizAnswers, currentQuiz.questions.length, currentQuiz.questions]);

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

  // --- Render Logic ---
  if (currentView === 'quiz' && selectedSubCondition) {
    const question = currentQuiz.questions[currentQuestionIndex];
    return (
      <div className="bg-bg-card rounded-xl p-6 shadow-card-light border border-border-light animate-fadeIn mb-4">
        <h2 className="text-2xl font-bold text-primary-brand mb-4">{currentQuiz.title}</h2>
        <div className="text-sm text-text-secondary mb-4">Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</div>
        <div className="w-full bg-charcoal-700 rounded-full h-2">
          <div className="bg-primary-brand h-2 rounded-full transition-all duration-300" style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%` }} />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-6">{question.question}</h3>
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
  } else if (currentView === 'results' && selectedSubCondition && quizResultScore !== null && quizResultLevel !== null) {
    const maxPossibleScore = currentQuiz.questions.length * 4;
    return (
      <div className="bg-bg-card rounded-xl p-6 shadow-card-light border border-border-light animate-fadeIn mb-4">
        <h2 className="text-2xl font-bold text-primary-brand mb-4">Quiz Results: {selectedSubCondition.name}</h2>
        <div className="bg-charcoal-700 p-4 rounded-lg mb-4 border border-charcoal-600">
          <p className="text-lg font-semibold text-text-primary">Your Score: <span className="text-primary-brand">{quizResultScore}</span> / {maxPossibleScore}</p>
          <p className="text-xl font-bold text-primary-brand">Severity Level: {quizResultLevel}</p>
          <p className="text-sm text-text-secondary mt-2">Based on {currentQuiz.title}</p>
        </div>
        <button
          onClick={handleViewResources}
          className="w-full btn btn-primary py-3 px-6 rounded-xl font-semibold text-base flex items-center justify-center gap-2 bg-primary