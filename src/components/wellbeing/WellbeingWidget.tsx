
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
 * Wellbeing widget with circular gauge and trend indicators
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

  // Calculate circle properties for gauge
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-text-muted';

  return (
    <motion.div
      variants={fadeInUp}
      className={`neumo-card p-6 ${className}`}
    >
      <div className="text-center">
        <h3 className="font-semibold text-text mb-6">Bien-être général</h3>
        
        {/* Circular Gauge */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <svg
            className="w-24 h-24 transform -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="var(--surface-3)"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="var(--brand)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500 ease-out"
            />
          </svg>
          
          {/* Score in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-text">
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
          >
            <TrendIcon size={16} />
            <span className="text-sm font-medium">
              {trendPercentage > 0 && '+'}
              {trendPercentage}%
            </span>
            <span className="text-xs text-text-muted">
              vs dernière saisie
            </span>
          </motion.div>
        )}

        {/* Stats */}
        <div className="space-y-2 mb-6 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">Dernière mise à jour</span>
            <span className="text-text">
              {stats.last_update ? new Date(stats.last_update).toLocaleDateString() : 'Jamais'}
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

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileTap={press.tap}
            onClick={onReportGood}
            className="neumo-button neumo-button--brand flex-1 text-sm py-3 flex items-center justify-center gap-2"
          >
            <Heart size={16} />
            Tout va bien
          </motion.button>
          
          <motion.button
            whileTap={press.tap}
            onClick={onReportIssue}
            className="neumo-button flex-1 text-sm py-3 flex items-center justify-center gap-2 text-warning"
          >
            <AlertTriangle size={16} />
            Signaler un souci
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
