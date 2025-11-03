import { TimerState } from '../types';

export const getInitialTimerState = (): TimerState => ({
  totalSeconds: 0,
  lastResetDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
  isRunning: false,
  remainingSeconds: 15 * 60 // 15 minutes by default
});

export const checkResetTimerState = (currentTimerState: TimerState): TimerState => {
  const today = new Date().toISOString().split('T')[0];
  if (currentTimerState.lastResetDate !== today) {
    // If the last reset was not today, reset for the new day
    return {
      ...getInitialTimerState(),
      lastResetDate: today,
    };
  }
  return currentTimerState;
};

export const playTimerAlert = () => {
  // Assuming a sound file 'ding.mp3' exists in the public/audio directory
  // In a production environment, ensure the audio file path is correct and consider preloading.
  const audio = new Audio('/audio/ding.mp3');
  audio.play().catch(e => console.error("Error playing timer alert sound:", e));
};