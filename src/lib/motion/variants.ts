
/**
 * Framer Motion animation variants for consistent micro-interactions
 * Respects prefers-reduced-motion user preference
 */

// Check if user prefers reduced motion
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

// Base easing curves
export const easing = {
  ease: [0.4, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.6, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  spring: { type: "spring", stiffness: 220, damping: 24 },
  springGentle: { type: "spring", stiffness: 150, damping: 26 }
} as const;

// List animations with stagger
export const listStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: prefersReducedMotion ? 0 : 0.04,
      delayChildren: prefersReducedMotion ? 0 : 0.02
    }
  }
};

// Fade in from bottom
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: prefersReducedMotion ? 0 : 8
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.28,
      ease: easing.easeOut
    }
  }
};

// Scale and fade in
export const pop = {
  hidden: {
    opacity: 0,
    scale: prefersReducedMotion ? 1 : 0.98
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.18,
      ease: easing.easeOut
    }
  }
};

// Button press interaction
export const press = {
  tap: {
    scale: prefersReducedMotion ? 1 : 0.98,
    transition: { duration: 0.06 }
  }
};

// Card hover lift
export const lift = {
  hover: {
    y: prefersReducedMotion ? 0 : -2,
    transition: {
      duration: 0.15,
      ease: easing.easeOut
    }
  }
};

// Slide in from right (for mobile sheets)
export const slideInRight = {
  hidden: {
    x: prefersReducedMotion ? 0 : "100%",
    opacity: prefersReducedMotion ? 1 : 0
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.3,
      ease: easing.easeOut
    }
  },
  exit: {
    x: prefersReducedMotion ? 0 : "100%",
    opacity: prefersReducedMotion ? 1 : 0,
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.25,
      ease: easing.easeIn
    }
  }
};

// Accordion expand/collapse
export const accordion = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.2,
      ease: easing.easeInOut
    }
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.25,
      ease: easing.easeOut
    }
  }
};

// Modal/Dialog animations
export const modal = {
  hidden: {
    opacity: 0,
    scale: prefersReducedMotion ? 1 : 0.96,
    y: prefersReducedMotion ? 0 : 8
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.2,
      ease: easing.easeOut
    }
  },
  exit: {
    opacity: 0,
    scale: prefersReducedMotion ? 1 : 0.96,
    y: prefersReducedMotion ? 0 : 8,
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.15,
      ease: easing.easeIn
    }
  }
};

// Progress/loading animations
export const pulse = {
  animate: prefersReducedMotion ? {} : {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easing.easeInOut
    }
  }
};

// Toast/notification slide in
export const toast = {
  hidden: {
    y: prefersReducedMotion ? 0 : -100,
    opacity: 0,
    scale: prefersReducedMotion ? 1 : 0.95
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.3,
      ease: easing.spring
    }
  },
  exit: {
    y: prefersReducedMotion ? 0 : -100,
    opacity: 0,
    scale: prefersReducedMotion ? 1 : 0.95,
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.2,
      ease: easing.easeIn
    }
  }
};

// Carousel/scroll snap indicators
export const scrollIndicator = {
  inactive: {
    scale: prefersReducedMotion ? 1 : 0.8,
    opacity: 0.4
  },
  active: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.15,
      ease: easing.easeOut
    }
  }
};
