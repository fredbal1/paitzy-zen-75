
import { motion } from 'framer-motion';
import { fadeInUp, press } from '@/lib/motion/variants';
import { Heart, TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import { WellbeingStats } from '@/lib/data/wellbeing';

interface WellbeingWidgetProps {
  stats: WellbeingStats;
  onReportGood: () => void;
  onReportIssue: () => void;
  className?: string;
}

/**
 * Simplified wellbeing widget with circular gauge and dark neumorphic styling
 * Focus on gauge, trend, and action CTAs - no complex 7-day graph
 */
export function WellbeingWidget({ 
  stats, 
  onReportGood, 
  onReportIssue, 
  className = '' 
}: WellbeingWidgetProps) {
  const score = stats.current_score || 0;
  const trend = stats.trend;
  const trendPercentage = stats.trend_percentage || 0;

  // Calculate circle properties for gauge (optimized size)
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-text-muted';

  return (
    <motion.div
      variants={fadeInUp}
      className={`neumo-card p-6 ${className}`}
      role="region"
      aria-labelledby="wellbeing-title"
    >
      <div className="text-center">
        <h3 id="wellbeing-title" className="font-semibold text-text mb-6">
          Bien-être général
        </h3>
        
        {/* Circular Gauge - Optimized size */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <svg
            className="w-20 h-20 transform -rotate-90"
            viewBox="0 0 80 80"
            role="img"
            aria-labelledby="gauge-title"
          >
            <title id="gauge-title">Score de bien-être: {score} sur 100</title>
            {/* Background circle */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="var(--surface-3)"
              strokeWidth="6"
            />
            {/* Progress circle */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="var(--brand)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          
          {/* Score in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-bold text-text">
                {score}
              </div>
              <div className="text-xs text-text-muted">
                /100
              </div>
            </div>
          </div>
        </div>

        {/* Trend Indicator */}
        {trend && (
          <motion.div
            variants={fadeInUp}
            className={`flex items-center justify-center gap-1 mb-4 ${trendColor}`}
            role="status"
            aria-label={`Tendance: ${trend === 'up' ? 'amélioration' : trend === 'down' ? 'dégradation' : 'stable'} de ${Math.abs(trendPercentage)}%`}
          >
            <TrendIcon size={14} aria-hidden="true" />
            <span className="text-sm font-medium">
              {trendPercentage > 0 && '+'}
              {trendPercentage}%
            </span>
            <span className="text-xs text-text-muted">
              vs dernière saisie
            </span>
          </motion.div>
        )}

        {/* Compact Stats */}
        <div className="space-y-2 mb-6 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">Dernière mise à jour</span>
            <span className="text-text">
              {stats.last_update ? new Date(stats.last_update).toLocaleDateString('fr-FR') : '—'}
            </span>
          </div>
          
          {stats.open_issues_count > 0 && (
            <div className="flex justify-between">
              <span className="text-text-muted">Anomalies ouvertes</span>
              <span className="text-warning font-medium">
                {stats.open_issues_count}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons - Optimized for mobile */}
        <div className="flex gap-2">
          <motion.button
            whileTap={press.tap}
            onClick={onReportGood}
            className="neumo-button neumo-button--brand flex-1 text-sm py-3 flex items-center justify-center gap-2 focus-ring"
            aria-label="Signaler que tout va bien"
          >
            <Heart size={16} aria-hidden="true" />
            <span>Tout va bien</span>
          </motion.button>
          
          <motion.button
            whileTap={press.tap}
            onClick={onReportIssue}
            className="neumo-button flex-1 text-sm py-3 flex items-center justify-center gap-2 text-warning focus-ring"
            aria-label="Signaler un problème"
          >
            <AlertTriangle size={16} aria-hidden="true" />
            <span>Signaler un souci</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
