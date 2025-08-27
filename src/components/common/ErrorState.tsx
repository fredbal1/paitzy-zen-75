
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/motion/variants';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { NotConnectedError } from '@/lib/data/NotConnectedError';

interface ErrorStateProps {
  error: Error;
  onRetry?: () => void;
  className?: string;
}

/**
 * Error state component with specific handling for NotConnectedError
 */
export function ErrorState({ error, onRetry, className = '' }: ErrorStateProps) {
  const isNotConnected = error instanceof NotConnectedError;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className={`empty-state ${className}`}
    >
      <div className="empty-state__icon">
        <AlertTriangle size={64} strokeWidth={1.5} className="text-warning" />
      </div>
      
      <h3 className="empty-state__title">
        {isNotConnected ? 'Supabase non connecté' : 'Une erreur est survenue'}
      </h3>
      
      <p className="empty-state__description">
        {isNotConnected 
          ? 'Connectez votre projet à Supabase pour activer cette fonctionnalité.'
          : error.message || 'Veuillez réessayer dans quelques instants.'
        }
      </p>
      
      {!isNotConnected && onRetry && (
        <motion.button
          variants={fadeInUp}
          onClick={onRetry}
          className="neumo-button mt-6 flex items-center gap-2"
        >
          <RefreshCw size={16} />
          Réessayer
        </motion.button>
      )}
      
      {isNotConnected && (
        <motion.div
          variants={fadeInUp}
          className="mt-6 p-4 bg-warning-soft border border-warning/20 rounded-neumo-lg"
        >
          <p className="text-sm text-warning font-medium">
            Cliquez sur le bouton Supabase en haut à droite pour connecter votre base de données.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
