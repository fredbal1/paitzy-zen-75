
import { motion } from 'framer-motion';
import { fadeInUp, press } from '@/lib/motion/variants';
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
 * KPI card component with neumorphic design
 * Shows key metrics with optional navigation
 */
export function KpiCard({ title, count, subtitle, icon: Icon, href, className = '' }: KpiCardProps) {
  const cardContent = (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-text-muted text-sm uppercase tracking-wide">
          {title}
        </h3>
        <div className="neumo-inset w-10 h-10 rounded-neumo-md flex items-center justify-center">
          <Icon size={18} className="text-brand" strokeWidth={1.5} />
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

  return (
    <motion.div
      variants={fadeInUp}
      whileTap={href ? press.tap : undefined}
      className={className}
    >
      {href ? (
        <Link
          to={href}
          className="neumo-card p-6 block transition-all duration-150 neumo-pressable cursor-pointer focus-ring"
        >
          {cardContent}
        </Link>
      ) : (
        <div className="neumo-card p-6 block transition-all duration-150">
          {cardContent}
        </div>
      )}
    </motion.div>
  );
}
