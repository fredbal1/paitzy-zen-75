
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface PetAvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Pet avatar component with fallback to initials
 */
export function PetAvatar({ src, name, size = 'lg', className = '' }: PetAvatarProps) {
  const sizeClasses = {
    sm: 'avatar-sm text-xs',
    md: 'avatar-md text-sm',
    lg: 'avatar-lg text-base',
    xl: 'avatar-xl text-lg'
  };

  // Get initials from name
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`
        ${sizeClasses[size]} 
        neumo-inset flex items-center justify-center font-semibold
        overflow-hidden bg-brand-soft text-brand-700 flex-shrink-0
        ${className}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={`Photo de ${name}`}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="select-none">
          {initials || <User size={size === 'sm' ? 12 : size === 'md' ? 16 : 20} />}
        </span>
      )}
    </motion.div>
  );
}
