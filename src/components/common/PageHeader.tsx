
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/motion/variants';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: ReactNode;
  actions?: ReactNode;
}

/**
 * Consistent page header with title, description, breadcrumb and actions
 */
export function PageHeader({ title, description, breadcrumb, actions }: PageHeaderProps) {
  return (
    <motion.header
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className="mb-8"
    >
      {breadcrumb && (
        <div className="mb-2">
          {breadcrumb}
        </div>
      )}
      
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-display text-text">{title}</h1>
          {description && (
            <p className="text-lg text-text-muted mt-2 max-w-2xl">{description}</p>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center gap-3 ml-6">
            {actions}
          </div>
        )}
      </div>
    </motion.header>
  );
}
