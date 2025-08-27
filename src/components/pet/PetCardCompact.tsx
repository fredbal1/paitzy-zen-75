
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, accordion, press } from '@/lib/motion/variants';
import { Calendar, Scale, Heart, MoreVertical, Plus } from 'lucide-react';
import { PetAvatar } from './PetAvatar';
import { Pet } from '@/lib/data/pets';

interface PetCardCompactProps {
  pet: Pet;
  onToggleExpand?: (petId: string) => void;
  isExpanded?: boolean;
  className?: string;
}

/**
 * Compact pet card with expandable details
 * Shows key info and status indicators
 */
export function PetCardCompact({ 
  pet, 
  onToggleExpand, 
  isExpanded = false,
  className = '' 
}: PetCardCompactProps) {
  const [showMenu, setShowMenu] = useState(false);

  // Calculate age from birthdate
  const age = pet.birthdate 
    ? Math.floor((Date.now() - new Date(pet.birthdate).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    : null;

  // Mock status for demonstration (would come from backend)
  const status = 'ok'; // 'ok' | 'watch' | 'late'
  const nextEvent = null; // Would come from upcoming events

  const statusConfig = {
    ok: { label: 'Tout va bien', class: 'status-pill--ok' },
    watch: { label: 'À surveiller', class: 'status-pill--watch' },
    late: { label: 'En retard', class: 'status-pill--late' }
  };

  return (
    <motion.div
      variants={fadeInUp}
      layout
      className={`neumo-card overflow-hidden ${className}`}
    >
      {/* Compact View */}
      <motion.div layout className="p-6">
        <div className="flex items-start gap-4">
          <PetAvatar
            src={pet.avatar_url}
            name={pet.name}
            size="lg"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-text text-lg truncate">
                  {pet.name}
                </h3>
                <p className="text-text-muted text-sm">
                  {pet.breed && `${pet.breed} • `}
                  {pet.sex && `${pet.sex === 'male' ? 'Mâle' : 'Femelle'}`}
                  {age && ` • ${age} an${age > 1 ? 's' : ''}`}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={press.tap}
                  onClick={() => setShowMenu(!showMenu)}
                  className="neumo-button w-10 h-10 p-0 text-text-muted"
                  aria-label="Options"
                >
                  <MoreVertical size={16} />
                </motion.button>
              </div>
            </div>

            {/* Status Pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className={`status-pill ${statusConfig[status].class}`}>
                <div className="w-2 h-2 rounded-full bg-current" />
                {statusConfig[status].label}
              </div>
              
              {nextEvent ? (
                <div className="neumo-chip">
                  <Calendar size={12} />
                  Dans 3 jours
                </div>
              ) : (
                <div className="neumo-chip text-text-soft">
                  <Calendar size={12} />
                  Aucun événement
                </div>
              )}
            </div>

            {/* Mini Metrics */}
            <div className="flex items-center gap-6 text-sm text-text-muted">
              <div className="flex items-center gap-1">
                <Scale size={14} />
                <span>--kg</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart size={14} />
                <span>--/100</span>
              </div>
            </div>

            {/* Expand Button */}
            {onToggleExpand && (
              <motion.button
                whileTap={press.tap}
                onClick={() => onToggleExpand(pet.id)}
                className="mt-4 text-brand text-sm font-medium hover:text-brand-600 transition-colors"
              >
                {isExpanded ? 'Réduire' : 'Voir le dossier ›'}
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Expanded View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            variants={accordion}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-surface-3">
              <div className="pt-6 space-y-4">
                <div>
                  <h4 className="font-medium text-text mb-3">Actions rapides</h4>
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={press.tap}
                      className="neumo-button text-sm flex items-center gap-2"
                    >
                      <Plus size={14} />
                      Ajouter poids
                    </motion.button>
                    <motion.button
                      whileTap={press.tap}
                      className="neumo-button text-sm flex items-center gap-2"
                    >
                      <Plus size={14} />
                      Créer RDV
                    </motion.button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-text mb-3">Informations</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Dernière visite</span>
                      <span className="text-text">Aucune donnée</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Dernier soin</span>
                      <span className="text-text">Aucune donnée</span>
                    </div>
                  </div>
                </div>

                {/* Notes/Allergies would go here when available */}
                <div className="pt-2">
                  <p className="text-xs text-text-soft">
                    Connectez Supabase pour accéder aux données complètes
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
