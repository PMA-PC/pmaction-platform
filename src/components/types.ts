export interface User {
  id: string;
  name: string;
  email: string;
}

export interface MoodEntry {
  id: number;
  date: string; // ISO string
  feeling: string; // Detailed feeling from wheel
  primaryEmotionColor: string; // Tailwind gradient class for the primary emotion
  rating: number; // 1-5 stars
  comment?: string;
}

export interface Habit {
  id: number;
  name: string;
  icon: string; // Emoji
  completed: boolean; // For today's completion
  streak: number;
  lastCompletionDate?: string; // ISO string
}

export interface ProgramActivity {
  id: number;
  type: 'meditation' | 'journal' | 'exercise';
  description: string;
  duration?: number; // in minutes
  target?: string;
}

export interface Program {
  id: number;
  title: string;
  icon: string; // Emoji
  duration: string; // e.g., "7 days", "3 weeks"
  activities: string[]; // List of daily activities/descriptions
  currentDay: number; // 0-indexed, or 0 if not started, activities.length if completed
}

export interface Topic {
  id: number;
  title: string;
  withPerson: string;
  urgency: 'Low' | 'Medium' | 'High';
  categories: string[];
  discussionDate?: string; // ISO string
  notes?: string;
  isCompleted: boolean;
  completedAt?: string; // ISO string
  date: string; // ISO string when created
}

// New type alias for Topic form data (editable fields)
export type TopicFormData = Omit<Topic, 'id' | 'date' | 'isCompleted' | 'completedAt'>;

export interface AppreciationEntry {
  id: number;
  timestamp: string;
  recipient: string;
  note: string;
}

export interface AccomplishmentEntry {
  id: number;
  timestamp: string;
  title: string;
  description: string;
}

export interface BoundaryEntry {
  id: number;
  timestamp: string;
  title: string;
  description: string;
}

export interface QuoteEntry {
  id: number;
  timestamp: string;
  text: string;
  author: string;
}

export interface GroundRule {
  id: number;
  text: string;
}

export interface Reminder {
  id: number;
  text: string;
}

export interface TimerState {
  totalSeconds: number;
  lastResetDate: string; // YYYY-MM-DD
  isRunning: boolean;
  remainingSeconds: number; // For the current discussion session
}

export interface TodoItem {
  id: number;
  text: string;
  createdAt: string; // ISO string
  dueBy?: string; // ISO string
  isCompleted: boolean;
  completedAt?: string; // ISO string
}

export interface ScreeningResult {
  id: number;
  title: string; // e.g., "Depression (PHQ-9)"
  score: number;
  level: string; // e.g., "Minimal", "Mild", "Moderate"
  date: string; // MM/DD/YYYY
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string; // e.g., "Oct 26, 2023"
  tags: string[];
}

// NEW: Product type for Wellness Shop
export interface Product {
  id: number;
  name: string;
  price: string;
  imageColor: string; // Tailwind gradient class
}

export interface UserData {
  userName: string;
  moodLog: MoodEntry[];
  habits: Habit[];
  programs: Program[];
  topics: Topic[];
  appreciations: AppreciationEntry[];
  accomplishments: AccomplishmentEntry[];
  boundaries: BoundaryEntry[];
  quotes: QuoteEntry[];
  groundRules: GroundRule[];
  communicationReminders: Reminder[];
  timerState: TimerState;
  todos: TodoItem[];
  screeningHistory: ScreeningResult[];
  starredPosts: Post[];
  // Add other user-specific data here as needed
}