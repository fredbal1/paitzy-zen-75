
/**
 * Framer Motion animation variants for consistent micro-interactions
 * Fully respects prefers-reduced-motion user preference
 */

// Check if user prefers reduced motion
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Base easing curves
export const easing = {
  ease: [0.4, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.6, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
} as const;

// Spring configurations
export const springConfig = {
  gentle: { type: "spring" as const, stiffness: 150, damping: 26 },
  snappy: { type: "spring" as const, stiffness: 220, damping: 24 },
  accordion: { type: "spring" as const, stiffness: 220, damping: 24 }
};

/**
 * List animations with stagger
 */
export const listStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: prefersReducedMotion() ? 0 : 0.04,
      delayChildren: prefersReducedMotion() ? 0 : 0.02
    }
  }
};

/**
 * Fade in from bottom - Primary entrance animation
 */
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion() ? 0 : 8
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.26,
      ease: easing.easeOut
    }
  }
};

/**
 * Scale and fade in - For emphasis
 */
export const pop = {
  hidden: {
    opacity: 0,
    scale: prefersReducedMotion() ? 1 : 0.98
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.18,
      ease: easing.easeOut
    }
  }
};

/**
 * Button press interaction - Subtle tactile feedback
 */
export const press = {
  tap: {
    scale: prefersReducedMotion() ? 1 : 0.98,
    transition: { duration: 0.06 }
  }
};

/**
 * Card hover lift - Gentle elevation change
 */
export const lift = {
  hover: {
    y: prefersReducedMotion() ? 0 : -2,
    transition: {
      duration: 0.15,
      ease: easing.easeOut
    }
  }
};

/**
 * Slide in from right - For mobile sheets/drawers
 */
export const slideInRight = {
  hidden: {
    x: prefersReducedMotion() ? 0 : "100%",
    opacity: prefersReducedMotion() ? 1 : 0
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.3,
      ease: easing.easeOut
    }
  },
  exit: {
    x: prefersReducedMotion() ? 0 : "100%",
    opacity: prefersReducedMotion() ? 1 : 0,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.25,
      ease: easing.easeIn
    }
  }
};

/**
 * Accordion expand/collapse - Spring-based smooth height animation
 */
export const accordion = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: prefersReducedMotion() 
      ? { duration: 0.01 }
      : springConfig.accordion
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: prefersReducedMotion() 
      ? { duration: 0.01 }
      : springConfig.accordion
  }
};

/**
 * Modal/Dialog animations - Centered scale with fade
 */
export const modal = {
  hidden: {
    opacity: 0,
    scale: prefersReducedMotion() ? 1 : 0.96,
    y: prefersReducedMotion() ? 0 : 8
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.2,
      ease: easing.easeOut
    }
  },
  exit: {
    opacity: 0,
    scale: prefersReducedMotion() ? 1 : 0.96,
    y: prefersReducedMotion() ? 0 : 8,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.15,
      ease: easing.easeIn
    }
  }
};

/**
 * Progress/loading animations - Gentle pulsing
 */
export const pulse = {
  animate: prefersReducedMotion() ? {} : {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easing.easeInOut
    }
  }
};

/**
 * Toast/notification slide in - From top with spring
 */
export const toast = {
  hidden: {
    y: prefersReducedMotion() ? 0 : -100,
    opacity: 0,
    scale: prefersReducedMotion() ? 1 : 0.95
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: prefersReducedMotion() 
      ? { duration: 0.01 }
      : springConfig.snappy
  },
  exit: {
    y: prefersReducedMotion() ? 0 : -100,
    opacity: 0,
    scale: prefersReducedMotion() ? 1 : 0.95,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.2,
      ease: easing.easeIn
    }
  }
};

/**
 * Carousel/scroll snap indicators - Active state animation
 */
export const scrollIndicator = {
  inactive: {
    scale: prefersReducedMotion() ? 1 : 0.8,
    opacity: 0.4,
    backgroundColor: "var(--text-soft)"
  },
  active: {
    scale: 1,
    opacity: 1,
    backgroundColor: "var(--brand)",
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.15,
      ease: easing.easeOut
    }
  }
};

/**
 * Drawer overlay - Backdrop fade
 */
export const overlay = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.15
    }
  }
};

/**
 * Header shrink on scroll - Smooth height transition
 */
export const headerShrink = {
  expanded: {
    height: 72,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.2,
      ease: easing.easeOut
    }
  },
  shrunk: {
    height: 60,
    transition: {
      duration: prefersReducedMotion() ? 0.01 : 0.2,
      ease: easing.easeOut
    }
  }
};

/**
 * Utility function to disable all animations if reduced motion is preferred
 */
export const withReducedMotion = (variants: any) => {
  if (prefersReducedMotion()) {
    return Object.keys(variants).reduce((acc, key) => {
      acc[key] = {
        transition: { duration: 0.01 }
      };
      return acc;
    }, {} as any);
  }
  return variants;
};

/**
 * Re-export spring config for direct use
 */
export { springConfig as spring };
