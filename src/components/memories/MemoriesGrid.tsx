
import { motion } from 'framer-motion';
import { listStagger, fadeInUp } from '@/lib/motion/variants';
import { Camera, Upload, Plus } from 'lucide-react';
import { Memory } from '@/lib/data/memories';

interface MemoriesGridProps {
  memories: Memory[];
  onUpload?: () => void;
  className?: string;
}

/**
 * Grid display for pet memories with upload placeholder
 */
export function MemoriesGrid({ memories, onUpload, className = '' }: MemoriesGridProps) {
  // Fill empty slots to show grid structure
  const slots = Array.from({ length: 4 }, (_, i) => memories[i] || null);

  return (
    <motion.div
      variants={listStagger}
      initial="hidden"
      animate="show"
      className={`grid grid-cols-2 gap-4 ${className}`}
    >
      {slots.map((memory, index) => (
        <motion.div
          key={memory?.id || `slot-${index}`}
          variants={fadeInUp}
          className="aspect-square relative"
        >
          {memory ? (
            /* Memory Item */
            <div className="neumo-card h-full overflow-hidden group cursor-pointer">
              <img
                src={memory.image_url}
                alt={memory.caption || 'Souvenir'}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              {memory.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <p className="text-white text-sm truncate">
                    {memory.caption}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Empty Slot */
            <div className="neumo-inset h-full flex flex-col items-center justify-center text-text-soft">
              <Camera size={24} className="mb-2" strokeWidth={1.5} />
              {index === 0 ? (
                <div className="text-center">
                  <p className="text-xs mb-2">Aucun souvenir</p>
                  {onUpload ? (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={onUpload}
                      className="neumo-button text-xs px-3 py-1 flex items-center gap-1"
                      disabled
                    >
                      <Plus size={12} />
                      Ajouter
                    </motion.button>
                  ) : null}
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full bg-surface-3" />
              )}
            </div>
          )}
        </motion.div>
      ))}
      
      {/* Upload Disabled Callout */}
      {memories.length === 0 && (
        <motion.div
          variants={fadeInUp}
          className="col-span-2 mt-4 p-3 bg-warning-soft border border-warning/20 rounded-neumo-lg"
        >
          <div className="flex items-start gap-2">
            <Upload size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-warning font-medium mb-1">
                Upload désactivé
              </p>
              <p className="text-xs text-warning/80">
                Connectez Supabase Storage pour activer l'upload de photos
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
