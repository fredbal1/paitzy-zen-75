
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/motion/variants';

interface SectionProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Consistent section wrapper with title, description and optional action
 */
export function Section({ title, description, action, children, className = '' }: SectionProps) {
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className={`space-y-6 ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-heading text-text">{title}</h2>
          {description && (
            <p className="text-text-muted mt-1">{description}</p>
          )}
        </div>
        {action && (
          <div className="flex-shrink-0 ml-4">
            {action}
          </div>
        )}
      </div>
      {children}
    </motion.section>
  );
}
