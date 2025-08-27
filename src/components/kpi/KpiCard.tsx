
import { motion } from 'framer-motion';
import { fadeInUp, press, lift } from '@/lib/motion/variants';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface KpiCardProps {
  title: string;
  count: number;
  subtitle?: string;
  icon: LucideIcon;
  href?: string;
  className?: string;
}

/**
 * KPI card component with dark neumorphic design
 * Shows key metrics with optional navigation
 * Fully accessible with proper ARIA labels and keyboard support
 */
export function KpiCard({ 
  title, 
  count, 
  subtitle, 
  icon: Icon, 
  href, 
  className = '' 
}: KpiCardProps) {
  const cardContent = (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-text-muted text-sm uppercase tracking-wide">
          {title}
        </h3>
        <div className="neumo-inset w-12 h-12 rounded-full flex items-center justify-center">
          <Icon size={20} className="text-brand" strokeWidth={1.5} />
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="text-3xl font-bold text-text">
          {count}
        </div>
        {subtitle && (
          <p className="text-sm text-text-muted">
            {subtitle}
          </p>
        )}
      </div>
    </>
  );

  const baseClasses = "neumo-card p-6 block transition-all duration-150 focus-ring";

  return (
    <motion.div
      variants={fadeInUp}
      whileTap={href ? press.tap : undefined}
      whileHover={href ? lift.hover : undefined}
      className={className}
    >
      {href ? (
        <Link
          to={href}
          className={`${baseClasses} neumo-pressable cursor-pointer`}
          aria-label={`${title}: ${count} ${subtitle || ''}`}
        >
          {cardContent}
        </Link>
      ) : (
        <div 
          className={baseClasses}
          role="region"
          aria-label={`${title}: ${count} ${subtitle || ''}`}
        >
          {cardContent}
        </div>
      )}
    </motion.div>
  );
}
