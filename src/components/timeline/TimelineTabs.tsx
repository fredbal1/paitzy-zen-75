
import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, press } from '@/lib/motion/variants';
import { TimelineItem } from './TimelineItem';
import { Event, EventRange } from '@/lib/data/events';

interface TimelineTabsProps {
  events: Event[];
  onToggleEvent: (eventId: string) => void;
  className?: string;
}

/**
 * Timeline with tabbed views for different event ranges
 */
export function TimelineTabs({ events, onToggleEvent, className = '' }: TimelineTabsProps) {
  const [activeTab, setActiveTab] = useState<EventRange>('today');

  const tabs = [
    { key: 'today' as EventRange, label: 'Aujourd\'hui', count: 0 },
    { key: 'upcoming' as EventRange, label: 'Prochainement', count: 0 },
    { key: 'completed' as EventRange, label: 'Terminés', count: 0 }
  ];

  // Filter events by active tab (in real app, this would be handled by the backend)
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.at);
    const today = new Date();
    const isToday = eventDate.toDateString() === today.toDateString();
    
    switch (activeTab) {
      case 'today':
        return isToday && !event.done;
      case 'upcoming':
        return eventDate > today && !event.done;
      case 'completed':
        return event.done;
      default:
        return false;
    }
  });

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className={`space-y-6 ${className}`}
    >
      {/* Tab Navigation */}
      <div className="flex">
        <div className="neumo-inset rounded-neumo-lg p-1 flex">
          {tabs.map((tab) => (
            <motion.button
              key={tab.key}
              whileTap={press.tap}
              onClick={() => setActiveTab(tab.key)}
              className={`
                px-4 py-2 rounded-neumo-md text-sm font-medium transition-all
                ${activeTab === tab.key 
                  ? 'neumo-card text-text shadow-neumo' 
                  : 'text-text-muted hover:text-text'
                }
              `}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 neumo-chip text-xs px-2 py-0">
                  {tab.count}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Timeline Content */}
      <div className="neumo-card">
        {filteredEvents.length > 0 ? (
          <div className="divide-y divide-surface-3">
            {filteredEvents.map((event) => (
              <TimelineItem
                key={event.id}
                event={event}
                onToggle={() => onToggleEvent(event.id)}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="text-text-soft mb-2">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-medium text-text mb-1">
              {activeTab === 'today' && 'Aucun événement aujourd\'hui'}
              {activeTab === 'upcoming' && 'Aucun événement à venir'}
              {activeTab === 'completed' && 'Aucun événement terminé'}
            </h3>
            <p className="text-sm text-text-muted">
              {activeTab !== 'completed' && 'Connectez Supabase pour créer des événements'}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
