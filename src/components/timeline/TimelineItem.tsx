
import { motion } from 'framer-motion';
import { press } from '@/lib/motion/variants';
import { Calendar, Clock, MoreVertical, Check } from 'lucide-react';
import { Event } from '@/lib/data/events';

interface TimelineItemProps {
  event: Event;
  onToggle: () => void;
  className?: string;
}

/**
 * Individual timeline item with completion toggle
 */
export function TimelineItem({ event, onToggle, className = '' }: TimelineItemProps) {
  const eventDate = new Date(event.at);
  const isToday = eventDate.toDateString() === new Date().toDateString();
  
  // Format time/date display
  const timeDisplay = isToday 
    ? eventDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : eventDate.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'short',
        hour: '2-digit', 
        minute: '2-digit' 
      });

  const typeConfig = {
    appointment: { label: 'RDV', class: 'neumo-chip--brand' },
    care: { label: 'Soin', class: 'neumo-chip--success' },
    watch: { label: 'Surveillance', class: 'neumo-chip--warning' }
  };

  return (
    <motion.div
      whileTap={press.tap}
      className={`flex items-center gap-4 p-4 hover:bg-surface/50 transition-colors ${className}`}
    >
      {/* Checkbox */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className={`
          w-5 h-5 rounded border-2 flex items-center justify-center transition-all
          ${event.done 
            ? 'bg-success border-success text-white' 
            : 'border-surface-3 hover:border-brand'
          }
        `}
        aria-label={event.done ? 'Marquer comme non terminé' : 'Marquer comme terminé'}
      >
        {event.done && <Check size={12} strokeWidth={2} />}
      </motion.button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h4 className={`font-medium ${event.done ? 'text-text-muted line-through' : 'text-text'}`}>
              {event.title}
            </h4>
            
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1 text-xs text-text-muted">
                {isToday ? <Clock size={12} /> : <Calendar size={12} />}
                {timeDisplay}
              </div>
              
              <div className={`neumo-chip text-xs ${typeConfig[event.type].class}`}>
                {typeConfig[event.type].label}
              </div>
            </div>
          </div>

          {/* Actions Menu */}
          <motion.button
            whileTap={press.tap}
            className="neumo-button w-8 h-8 p-0 text-text-muted ml-2"
            aria-label="Options"
          >
            <MoreVertical size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
