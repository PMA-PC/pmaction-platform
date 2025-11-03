import { UserData } from '../types';

export const exportFullJournal = (userData: UserData) => {
  const timestamp = new Date().toISOString().split('T')[0];
  let content = '==================================================\n';
  content += 'PMACTION & SHARED SPACE - WELLNESS & COMMUNICATION JOURNAL\n';
  content += '==================================================\n\n';
  content += `User: ${userData.userName}\n`;
  content += `Generated: ${new Date().toLocaleString()}\n\n`;

  // PMAction Data
  content += '\n=== MOOD LOG ===\n\n'; // Renamed section
  if (userData.moodLog.length === 0) content += 'No mood entries recorded.\n\n';
  userData.moodLog.forEach(m => {
    const date = new Date(m.date);
    content += `Date: ${date.toLocaleString()}\n`;
    content += `Feeling: ${m.feeling}\n`;
    content += `Rating: ${m.rating} stars\n`;
    if (m.comment) content += `Comment: ${m.comment}\n`;
    content += '\n---\n\n';
  });

  content += '\n=== DAILY HABITS ===\n\n';
  if (userData.habits.length === 0) content += 'No habits defined.\n\n';
  userData.habits.forEach(h => {
    content += `Habit: ${h.icon} ${h.name}\n`;
    content += `Current Streak: ${h.streak} days\n`;
    content += `Last Completion: ${h.lastCompletionDate ? new Date(h.lastCompletionDate).toLocaleDateString() : 'N/A'}\n`;
    content += '\n---\n\n';
  });

  content += '\n=== TRAINING PROGRAMS ===\n\n';
  if (userData.programs.length === 0) content += 'No programs started.\n\n';
  userData.programs.forEach(p => {
    content += `Program: ${p.icon} ${p.title}\n`;
    content += `Duration: ${p.duration}\n`;
    content += `Progress: Day ${p.currentDay} / ${p.activities.length}\n`;
    if (p.currentDay > 0 && p.currentDay < p.activities.length) {
      content += `Current Activity: ${p.activities[p.currentDay]}\n`;
    } else if (p.currentDay >= p.activities.length) {
      content += `Status: Completed!\n`;
    } else {
      content += `Status: Not started.\n`;
    }
    content += '\n---\n\n';
  });

  // NEW: To-Dos
  content += '\n=== TO-DO LIST ===\n\n';
  if (userData.todos.length === 0) content += 'No to-do items recorded.\n\n';
  userData.todos.forEach(t => {
    const createdAt = new Date(t.createdAt);
    content += `To-Do: ${t.text}\n`;
    content += `Created At: ${createdAt.toLocaleString()}\n`;
    if (t.dueBy) content += `Due By: ${new Date(t.dueBy).toLocaleDateString()}\n`;
    content += `Status: ${t.isCompleted ? 'Completed' : 'Pending'}\n`;
    if (t.isCompleted && t.completedAt) content += `Completed At: ${new Date(t.completedAt).toLocaleString()}\n`;
    content += '\n---\n\n';
  });

  // Shared Space Data
  content += '\n=== DISCUSSION TOPICS ===\n\n';
  if (userData.topics.length === 0) content += 'No topics created.\n\n';
  userData.topics.forEach(t => {
    const date = new Date(t.date);
    content += `Title: ${t.title}\n`;
    content += `With: ${t.withPerson}\n`;
    content += `Urgency: ${t.urgency}\n`;
    content += `Categories: ${t.categories.join(', ')}\n`;
    if (t.discussionDate) content += `Discussion Date: ${new Date(t.discussionDate).toLocaleDateString()}\n`;
    if (t.notes) content += `Notes: ${t.notes}\n`;
    content += `Status: ${t.isCompleted ? 'Completed' : 'Pending'}\n`; // NEW
    if (t.isCompleted && t.completedAt) content += `Completed At: ${new Date(t.completedAt).toLocaleString()}\n`; // NEW
    content += `Created: ${date.toLocaleString()}\n`;
    content += '\n---\n\n';
  });

  content += '\n=== APPRECIATIONS ===\n\n';
  if (userData.appreciations.length === 0) content += 'No appreciations logged.\n\n';
  userData.appreciations.forEach(a => {
    const date = new Date(a.timestamp);
    content += `Date: ${date.toLocaleString()}\n`;
    content += `Recipient: ${a.recipient}\n`;
    content += `Note: ${a.note}\n`;
    content += '\n---\n\n';
  });

  content += '\n=== ACCOMPLISHMENTS ===\n\n';
  if (userData.accomplishments.length === 0) content += 'No accomplishments logged.\n\n';
  userData.accomplishments.forEach(a => {
    const date = new Date(a.timestamp);
    content += `Date: ${date.toLocaleString()}\n`;
    content += `Title: ${a.title}\n`;
    content += `Description: ${a.description}\n`;
    content += '\n---\n\n';
  });

  content += '\n=== BOUNDARIES ===\n\n';
  if (userData.boundaries.length === 0) content += 'No boundaries set.\n\n';
  userData.boundaries.forEach(b => {
    const date = new Date(b.timestamp);
    content += `Date: ${date.toLocaleString()}\n`;
    content += `Title: ${b.title}\n`;
    content += `Description: ${b.description}\n`;
    content += '\n---\n\n';
  });

  content += '\n=== QUOTES ===\n\n';
  if (userData.quotes.length === 0) content += 'No quotes saved.\n\n';
  userData.quotes.forEach(q => {
    const date = new Date(q.timestamp);
    content += `Date: ${date.toLocaleString()}\n`;
    content += `"${q.text}"\n`;
    content += `  - ${q.author}\n`;
    content += '\n---\n\n';
  });

  content += '\n=== DISCUSSION TIMER SUMMARY ===\n\n';
  content += `Total discussion time recorded today (${new Date(userData.timerState.lastResetDate).toLocaleDateString()}): ${Math.floor(userData.timerState.totalSeconds / 60)} minutes and ${userData.timerState.totalSeconds % 60} seconds.\n\n`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `combined-journal-${timestamp}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  alert('✓ Full journal exported!');
};

export const downloadPlaceholderFile = (filename: string, content: string, type: string = 'text/plain') => {
  const blob = new Blob([content], { type: type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  alert(`✓ ${filename} downloaded!`);
};

export const printDashboard = () => {
  window.print();
};