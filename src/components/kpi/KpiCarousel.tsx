
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { listStagger, scrollIndicator } from '@/lib/motion/variants';
import { KpiCard } from './KpiCard';
import { LucideIcon } from 'lucide-react';

interface KpiItem {
  title: string;
  count: number;
  subtitle?: string;
  icon: LucideIcon;
  href?: string;
}

interface KpiCarouselProps {
  items: KpiItem[];
  className?: string;
}

/**
 * Mobile-first KPI carousel with scroll snap and synchronized indicators
 * Automatically switches to grid layout on larger screens
 * Fully accessible with keyboard navigation and screen reader support
 */
export function KpiCarousel({ items, className = '' }: KpiCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Update active index based on scroll position with debouncing
  const updateActiveIndex = () => {
    if (!scrollRef.current) return;
    
    const scrollLeft = scrollRef.current.scrollLeft;
    const containerWidth = scrollRef.current.clientWidth;
    const cardWidth = containerWidth * 0.76; // Match min-w-[76%]
    const newIndex = Math.round(scrollLeft / cardWidth);
    
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < items.length) {
      setActiveIndex(newIndex);
    }
  };

  const handleScroll = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(updateActiveIndex, 50);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeIndex]);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    
    const containerWidth = scrollRef.current.clientWidth;
    const cardWidth = containerWidth * 0.76;
    const scrollPosition = cardWidth * index;
    
    scrollRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  return (
    <div className={className}>
      {/* Mobile Carousel */}
      <motion.div
        variants={listStagger}
        initial="hidden"
        animate="show"
        className="lg:hidden"
      >
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-snap-x hide-scrollbar pb-4"
          role="region"
          aria-roledescription="carrousel"
          aria-label="Indicateurs KPI"
        >
          {items.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="flex-shrink-0 min-w-[76%] scroll-snap-center"
            >
              <KpiCard {...item} />
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        {items.length > 1 && (
          <div 
            className="flex justify-center gap-2 mt-4"
            role="tablist"
            aria-label="Indicateurs de position du carrousel"
          >
            {items.map((_, index) => (
              <motion.button
                key={index}
                variants={scrollIndicator}
                animate={index === activeIndex ? 'active' : 'inactive'}
                onClick={() => scrollToIndex(index)}
                className="w-2 h-2 rounded-full transition-all focus-ring"
                style={{ minWidth: '8px', minHeight: '8px' }} // Ensure minimum tap target
                role="tab"
                aria-selected={index === activeIndex}
                aria-current={index === activeIndex ? 'true' : 'false'}
                aria-label={`Aller au slide ${index + 1} sur ${items.length}: ${items[index].title}`}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Desktop Grid */}
      <motion.div
        variants={listStagger}
        initial="hidden"
        animate="show"
        className="hidden lg:grid grid-cards grid-cards--4 gap-6"
        role="region"
        aria-label="Indicateurs KPI en grille"
      >
        {items.map((item, index) => (
          <KpiCard key={`${item.title}-${index}`} {...item} />
        ))}
      </motion.div>
    </div>
  );
}
