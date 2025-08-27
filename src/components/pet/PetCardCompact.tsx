
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, accordion, press } from '@/lib/motion/variants';
import { Calendar, Scale, Heart, MoreVertical, Plus, Clock } from 'lucide-react';
import { PetAvatar } from './PetAvatar';
import { Pet } from '@/lib/data/pets';

interface PetCardCompactProps {
  pet: Pet;
  onToggleExpand?: (petId: string) => void;
  isExpanded?: boolean;
  className?: string;
}

/**
 * Compact pet card with expandable details and dark neumorphic styling
 * Shows key info and status indicators with smooth accordion animation
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

  // Format sex display
  const sexDisplay = pet.sex === 'male' ? 'Mâle' : pet.sex === 'female' ? 'Femelle' : null;

  // Build metadata string
  const metadata = [pet.breed, sexDisplay, age && `${age} an${age > 1 ? 's' : ''}`]
    .filter(Boolean)
    .join(' • ');

  return (
    <motion.article
      variants={fadeInUp}
      layout
      className={`neumo-card overflow-hidden ${className}`}
      role="article"
      aria-labelledby={`pet-${pet.id}-name`}
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
              <div className="min-w-0 flex-1">
                <h3 
                  id={`pet-${pet.id}-name`}
                  className="font-semibold text-text text-lg truncate"
                >
                  {pet.name}
                </h3>
                {metadata && (
                  <p className="text-text-muted text-sm">
                    {metadata}
                  </p>
                )}
              </div>
              
              <motion.button
                whileTap={press.tap}
                onClick={() => setShowMenu(!showMenu)}
                className="neumo-button w-10 h-10 p-0 text-text-muted focus-ring"
                aria-label={`Options pour ${pet.name}`}
                aria-expanded={showMenu}
                aria-haspopup="true"
              >
                <MoreVertical size={16} />
              </motion.button>
            </div>

            {/* Status Pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div 
                className={`status-pill ${statusConfig[status].class}`}
                role="status"
                aria-label={`État de ${pet.name}: ${statusConfig[status].label}`}
              >
                <div className="w-2 h-2 rounded-full bg-current" />
                <span>{statusConfig[status].label}</span>
              </div>
              
              {nextEvent ? (
                <div className="neumo-chip">
                  <Calendar size={12} />
                  <span>Dans 3 jours</span>
                </div>
              ) : (
                <div className="neumo-chip text-text-soft">
                  <Clock size={12} />
                  <span>Aucun événement</span>
                </div>
              )}
            </div>

            {/* Mini Metrics */}
            <div className="flex items-center gap-6 text-sm text-text-muted mb-4">
              <div className="flex items-center gap-1" title="Poids">
                <Scale size={14} />
                <span>--kg</span>
              </div>
              <div className="flex items-center gap-1" title="Score de bien-être">
                <Heart size={14} />
                <span>--/100</span>
              </div>
            </div>

            {/* Expand Button */}
            {onToggleExpand && (
              <motion.button
                whileTap={press.tap}
                onClick={() => onToggleExpand(pet.id)}
                className="text-brand text-sm font-medium hover:text-brand-600 transition-colors focus-ring rounded px-2 py-1"
                aria-expanded={isExpanded}
                aria-controls={`pet-${pet.id}-details`}
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
            id={`pet-${pet.id}-details`}
            variants={accordion}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            className="overflow-hidden"
            role="region"
            aria-labelledby={`pet-${pet.id}-name`}
          >
            <div className="px-6 pb-6 border-t border-surface-3">
              <div className="pt-6 space-y-6">
                {/* Quick Actions */}
                <section>
                  <h4 className="font-medium text-text mb-3">Actions rapides</h4>
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      whileTap={press.tap}
                      className="neumo-chip neumo-pressable text-sm flex items-center gap-2 focus-ring"
                      aria-label={`Ajouter le poids de ${pet.name}`}
                    >
                      <Plus size={14} />
                      <span>Ajouter poids</span>
                    </motion.button>
                    <motion.button
                      whileTap={press.tap}
                      className="neumo-chip neumo-pressable text-sm flex items-center gap-2 focus-ring"
                      aria-label={`Créer un rendez-vous pour ${pet.name}`}
                    >
                      <Plus size={14} />
                      <span>Créer RDV</span>
                    </motion.button>
                    <motion.button
                      whileTap={press.tap}
                      className="neumo-chip neumo-pressable text-sm flex items-center gap-2 focus-ring"
                      aria-label={`Ajouter un soin pour ${pet.name}`}
                    >
                      <Plus size={14} />
                      <span>Ajouter soin</span>
                    </motion.button>
                  </div>
                </section>

                {/* Information Summary */}
                <section>
                  <h4 className="font-medium text-text mb-3">Informations récentes</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Dernière visite</span>
                      <span className="text-text-soft">Aucune donnée</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Dernier soin</span>
                      <span className="text-text-soft">Aucune donnée</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Dernière pesée</span>
                      <span className="text-text-soft">Aucune donnée</span>
                    </div>
                  </div>
                </section>

                {/* Connection Status */}
                <div className="pt-2 border-t border-surface-3">
                  <div className="flex items-start gap-2 p-3 bg-warning-soft border border-warning/20 rounded-neumo-lg">
                    <div className="w-4 h-4 rounded-full bg-warning mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-warning/90">
                        <strong>Données limitées</strong>
                      </p>
                      <p className="text-xs text-warning/75 mt-1">
                        Connectez Supabase pour accéder aux données complètes et activer les fonctionnalités
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
