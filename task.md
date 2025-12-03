# Task List
- [x] Implement Email Sign Up in `pages/onboarding/signup.js`.
- [x] Verify Email Sign Up functionality.
- [x] Verify Google Sign Up functionality (regression test).
- [x] Enhance Journal with Legacy Features
- [x] Implement Reminders Feature
- [x] Implement Library Feature
- [x] Integrate YouTube Data
- [x] Frontend-to-Backend Verification
- [x] Restructure Dashboard & Implement Self-Care
    - [x] Create `lib/selfCareData.js` (Structure + Samples).
    - [x] Update `components/AddWinModal.js` to support Self-Care tab, filtering, and auto-journaling.
    - [x] Update `pages/dashboard.js` to replace Quick Actions with 3 Focus Cards.
    - [x] Update `pages/onboarding/goals.js` to include "Self-care".
    - [x] Verify new layout and Self-Care functionality.

## Phase 2: Engagement & Reporting
- [x] Notifications System
    - [x] Research & Plan Web Push vs. Email strategy.
    - [x] Implement Notification Settings UI.
- [x] Reporting & Analytics
    - [x] Implement Charts/Graphs for XP, Mood, Habits.
    - [x] Create "Print Report" functionality (PDF generation or print-friendly view).
- [x] Gamification UI
    - [x] Make Badges/Points/Levels cards bigger and easier to read.
    - [x] Redesign "Why Daily Use Matters" section (distinct style but consistent feel).

## Dashboard Refinement (Final Polish)
- [x] Optimize Top Layout (Fill the blank)
    - [x] Combine Recommendation Widget and Top Nav Buttons into a single row (4 columns).
    - [x] This utilizes the empty space next to the widget.
- [x] Enhance Button Styling (Make it pop)
    - [x] Add white borders/shadows to Top Nav buttons to make them look more like "cards".
- [x] Layout Reordering (Break up colors)
    - [x] Move "Today's Wins" between Top Nav and Stats.
- [x] Floating Action Button (FAB)
    - [x] Add global "Log Win" (+) button.

## Dashboard Logic & Flow (New Feedback)
- [x] "Daily Overview" Checklist (Replaces simple "Today's Wins")
    - [x] Display core daily goals: Daily Win, Mood Check-in, Self-Care/Mindfulness.
    - [x] Visuals: "Checked" (Completed) vs "Pending" (Empty Circle).
    - [x] Add "Free Form" text input for quick win logging.
- [x] Smart Rotating Focus Card (Replaces "Weekly Challenge")
    - [x] Logic: Rotates based on Time of Day (Morning/Midday/Evening).
    - [x] Content:
        - Morning: Small Wins (e.g., Make Bed).
        - Midday: Habit/Mindfulness/Self-Care.
        - Evening: Mood/Gratitude.
    - [x] "Completion Aware": If current task is done, show the next one.
- [ ] Small Wins Logic
    - [x] Add "Reason" field (Why it helps)
    - [x] Refine Small Wins (Multiple Entries, Benefit Messages)
    - [x] Expand Self-Care Features (Self-Care Hub)
        - [x] New Content Types (Quizzes, Blogs)
        - [x] Dynamic Activity Display (Time-based: 1, 3, 5, 10, 20+ min)
        - [x] Personalization Settings.
    - [x] Personalization Settings.
    - [ ] (Future) Dynamic difficulty/scoring.

## Phase 3: Engagement & Gamification (New!)
- [ ] Visual Badges System (Trophy Case)
    - [ ] Create `lib/badgesData.js` (Include "Momentum Maker", "Flow Master", etc.).
    - [ ] Implement `BadgeComponent` and `TrophyCase`.
    - [ ] Integrate Badge unlocking logic.
- [ ] Structured Challenge Tracks (Challenge Engine)
    - [x] Create `lib/challengesData.js` (Implement "Focus Flow Builder 2.0" - 30 Days).
    - [x] Build "Challenge Library" Page (Browse & Enroll).
    - [x] Implement "Active Challenge" Card in Dashboard (Daily Task view).
    - [ ] Implement "Challenge Progress" Logic (Unlock days, track points).
    - [x] Implement Content-Based Challenges (from Notebook Summary)
        - [x] Challenge 1: Physiology First (5 Days)
        - [x] Challenge 2: Crisis Control (5 Days)
        - [x] Challenge 3: Thought Detective (5 Days)
        - [x] Challenge 4: CEO Brain (5 Days)
        - [x] Challenge 5: Social Navigator (3 Days)
        - [x] Challenge 6: Authentic Self (5 Days)
        - [x] Challenge 7: ADHD Foundations (30 Days - Theory)
        - [x] Challenge 8: Emotional Mastery (30 Days - Theory)



