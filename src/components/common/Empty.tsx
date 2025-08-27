
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/motion/variants';
import { LucideIcon } from 'lucide-react';

interface EmptyProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

/**
 * Reusable empty state component with consistent styling
 */
export function Empty({ icon: Icon, title, description, action, className = '' }: EmptyProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className={`empty-state ${className}`}
    >
      <div className="empty-state__icon">
        <Icon size={64} strokeWidth={1.5} />
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__description">{description}</p>
      
      {action && (
        <motion.button
          variants={fadeInUp}
          onClick={action.onClick}
          className="neumo-button neumo-button--brand mt-6"
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  );
}
