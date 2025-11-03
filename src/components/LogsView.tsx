import React, { useState, useMemo } from 'react';
import { UserData, MoodEntry, AppreciationEntry, AccomplishmentEntry, BoundaryEntry, QuoteEntry, TodoItem } from '../types';
import MoodLogCard from './MoodLogCard';
import LogEntryCard from './LogEntryCard';
import TodoItemCard from './TodoItemCard';
import { getEmoji } from '../utils/emoji';

interface LogsViewProps {
  userData: UserData;
  onOpenMoodLogModal: () => void;
  onAddLogEntry: (type: 'appreciation' | 'accomplishment' | 'boundary' | 'quote') => void;
  onOpenNewTodoModal: () => void;
  onToggleTodoComplete: (id: number) => void;
}

const LogsView: React.FC<LogsViewProps> = ({
  userData,
  onOpenMoodLogModal,
  onAddLogEntry,
  onOpenNewTodoModal,
  onToggleTodoComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'mood' | 'topics' | 'appreciations' | 'accomplishments' | 'boundaries' | 'quotes' | 'todos'>('mood');

  // Combine all log types into a single sorted array for the 'All' view (if implemented)
  // For now, we'll just render tabs, each showing its own type.

  const renderAddButton = () => {
    switch (activeTab) {
      case 'mood':
        return (
          <button
            className="btn btn-primary w-full justify-center py-3 px-6 rounded-xl font-semibold text-base flex items-center gap-2 bg-primary-brand text-white hover:bg-primary-dark-brand transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] mb-6"
            onClick={onOpenMoodLogModal}
            aria-label="Add new mood entry"
          >
            {getEmoji('Add')} Add Mood Entry
          </button>
        );
      case 'appreciations':
        return (
          <button
            className="btn btn-primary w-full justify-center py-3 px-6 rounded-xl font-semibold text-base flex items-center gap-2 bg-primary-brand text-white hover:bg-primary-dark-brand transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] mb-6"
            onClick={() => onAddLogEntry('appreciation')}
            aria-label="Add new appreciation"
          >
            {getEmoji('Add')} Add Appreciation
          </button>
        );
      case 'accomplishments':
        return (
          <button
            className="btn btn-primary w-full justify-center py-3 px-6 rounded-xl font-semibold text-base flex items-center gap-2 bg-primary-brand text-white hover:bg-primary-dark-brand transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] mb-6"
            onClick={() => onAddLogEntry('accomplishment')}
            aria-label="Add new accomplishment"
          >
            {getEmoji('Add')} Add Accomplishment
          </button>
        );
      case 'boundaries':
        return (
          <button
            className="btn btn-primary w-full justify-center py-3 px-6 rounded-xl font-semibold text-base flex items-center gap-2 bg-primary-brand text-white hover:bg-primary-dark-brand transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] mb-6"
            onClick={() => onAddLogEntry('boundary')}
            aria-label="Add new boundary"
          >
            {getEmoji('Add')} Add Boundary
          </button>
        );
      case 'quotes':
        return (
          <button
            className="btn btn-primary w-full justify-center py-3 px-6 rounded-xl font-semibold text-base flex items-center gap-2 bg-primary-brand text-white hover:bg-primary-dark-brand transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] mb-6"
            onClick={() => onAddLogEntry('quote')}
            aria-label="Add new quote"
          >
            {getEmoji('Add')} Add Quote
          </button>
        );
      case 'todos':
        return (
          <button
            className="btn btn-primary w-full justify-center py-3 px-6 rounded-xl font-semibold text-base flex items-center gap-2 bg-primary-brand text-white hover:bg-primary-dark-brand transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] mb-6"
            onClick={onOpenNewTodoModal}
            aria-label="Add new to-do"
          >
            {getEmoji('Add')} Add New To-Do
          </button>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'mood':
        const sortedMoods = [...userData.moodLog].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return (
          <div>
            {sortedMoods.length === 0 ? (
              <p className="text-text-secondary text-center py-8">No mood entries logged yet.</p>
            ) : (
              sortedMoods.map(entry => <MoodLogCard key={entry.id} entry={entry} />)
            )}
          </div>
        );
      case 'appreciations':
        const sortedAppreciations = [...userData.appreciations].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        return (
          <div>
            {sortedAppreciations.length === 0 ? (
              <p className="text-text-secondary text-center py-8">No appreciations logged yet.</p>
            ) : (
              sortedAppreciations.map(entry => <LogEntryCard key={entry.id} entry={entry} type="appreciation" />)
            )}
          </div>
        );
      case 'accomplishments':
        const sortedAccomplishments = [...userData.accomplishments].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        return (
          <div>
            {sortedAccomplishments.length === 0 ? (
              <p className="text-text-secondary text-center py-8">No accomplishments logged yet.</p>
            ) : (
              sortedAccomplishments.map(entry => <LogEntryCard key={entry.id} entry={entry} type="accomplishment" />)
            )}
          </div>
        );
      case 'boundaries':
        const sortedBoundaries = [...userData.boundaries].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        return (
          <div>
            {sortedBoundaries.length === 0 ? (
              <p className="text-text-secondary text-center py-8">No boundaries logged yet.</p>
            ) : (
              sortedBoundaries.map(entry => <LogEntryCard key={entry.id} entry={entry} type="boundary" />)
            )}
          </div>
        );
      case 'quotes':
        const sortedQuotes = [...userData.quotes].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        return (
          <div>
            {sortedQuotes.length === 0 ? (
              <p className="text-text-secondary text-center py-8">No quotes saved yet.</p>
            ) : (
              sortedQuotes.map(entry => <LogEntryCard key={entry.id} entry={entry} type="quote" />)
            )}
          </div>
        );
      case 'todos':
        const sortedTodos = [...userData.todos].sort((a, b) => {
          // Sort by completion status (incomplete first), then by due date, then by creation date
          if (a.isCompleted !== b.isCompleted) {
            return a.isCompleted ? 1 : -1; // Incomplete comes before completed
          }
          if (a.dueBy && b.dueBy) {
            return new Date(a.dueBy).getTime() - new Date(b.dueBy).getTime();
          }
          if (a.dueBy) return -1; // Todo with due date comes first
          if (b.dueBy) return 1;
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
        return (
          <div>
            {sortedTodos.length === 0 ? (
              <p className="text-text-secondary text-center py-8">No to-do items yet. Add one!</p>
            ) : (
              sortedTodos.map(todo => (
                <TodoItemCard key={todo.id} todo={todo} onToggleComplete={onToggleTodoComplete} />
              ))
            )}
          </div>
        );
      case 'topics':
          const sortedTopics = [...userData.topics].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          return (
            <div>
              {sortedTopics.length === 0 ? (
                <p className="text-text-secondary text-center py-8">No topics created yet.</p>
              ) : (
                // This is a simplified list without full TopicCard functionality
                // For full TopicCard, consider passing relevant handlers or navigate
                sortedTopics.map(topic => (
                  <div key={topic.id} className="bg-bg-card rounded-xl p-4 mb-3 border border-border-light shadow-card-light">
                    <h4 className={`font-semibold text-text-primary ${topic.isCompleted ? 'line-through text-text-secondary' : ''}`}>{topic.title}</h4>
                    <p className="text-sm text-text-secondary">With: {topic.withPerson} | Urgency: {topic.urgency}</p>
                    <p className="text-xs text-text-secondary">Created: {new Date(topic.date).toLocaleDateString()}</p>
                    {topic.isCompleted && topic.completedAt && (
                      <p className="text-xs text-sage-400">Completed: {new Date(topic.completedAt).toLocaleDateString()}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          );
      default:
        return <p className="text-text-secondary text-center py-8">Select a log type.</p>;
    }
  };

  return (
    <div className="px-4 pb-20 max-w-3xl mx-auto animate-fadeIn">
      <h2 className="text-2xl font-bold mt-6 mb-4 text-primary-brand">{getEmoji('Logs')} Your Logs</h2>

      {renderAddButton()}

      <div className="flex flex-wrap justify-center gap-2 mb-6 text-sm">
        <button
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'mood' ? 'bg-primary-brand text-white shadow-card-light' : 'bg-charcoal-700 text-text-primary border-2 border-charcoal-600 hover:bg-charcoal-600'}`}
          onClick={() => setActiveTab('mood')}
          aria-selected={activeTab === 'mood'}
          role="tab"
        >
          Mood
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'todos' ? 'bg-primary-brand text-white shadow-card-light' : 'bg-charcoal-700 text-text-primary border-2 border-charcoal-600 hover:bg-charcoal-600'}`}
          onClick={() => setActiveTab('todos')}
          aria-selected={activeTab === 'todos'}
          role="tab"
        >
          To-Dos
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'topics' ? 'bg-primary-brand text-white shadow-card-light' : 'bg-charcoal-700 text-text-primary border-2 border-charcoal-600 hover:bg-charcoal-600'}`}
          onClick={() => setActiveTab('topics')}
          aria-selected={activeTab === 'topics'}
          role="tab"
        >
          Topics
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'appreciations' ? 'bg-primary-brand text-white shadow-card-light' : 'bg-charcoal-700 text-text-primary border-2 border-charcoal-600 hover:bg-charcoal-600'}`}
          onClick={() => setActiveTab('appreciations')}
          aria-selected={activeTab === 'appreciations'}
          role="tab"
        >
          Appreciations
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'accomplishments' ? 'bg-primary-brand text-white shadow-card-light' : 'bg-charcoal-700 text-text-primary border-2 border-charcoal-600 hover:bg-charcoal-600'}`}
          onClick={() => setActiveTab('accomplishments')}
          aria-selected={activeTab === 'accomplishments'}
          role="tab"
        >
          Accomplishments
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'boundaries' ? 'bg-primary-brand text-white shadow-card-light' : 'bg-charcoal-700 text-text-primary border-2 border-charcoal-600 hover:bg-charcoal-600'}`}
          onClick={() => setActiveTab('boundaries')}
          aria-selected={activeTab === 'boundaries'}
          role="tab"
        >
          Boundaries
        </button>
        <button
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'quotes' ? 'bg-primary-brand text-white shadow-card-light' : 'bg-charcoal-700 text-text-primary border-2 border-charcoal-600 hover:bg-charcoal-600'}`}
          onClick={() => setActiveTab('quotes')}
          aria-selected={activeTab === 'quotes'}
          role="tab"
        >
          Quotes
        </button>
      </div>

      <div className="logs-content" role="tabpanel" aria-labelledby={`${activeTab}-tab`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default LogsView;