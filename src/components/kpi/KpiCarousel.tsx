
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
 * Mobile-first KPI carousel with scroll snap and indicators
 * Automatically switches to grid layout on larger screens
 */
export function KpiCarousel({ items, className = '' }: KpiCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update active index based on scroll position
  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.scrollWidth / items.length;
    const newIndex = Math.round(scrollLeft / cardWidth);
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

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
          aria-roledescription="carousel"
          aria-label="Indicateurs KPI"
        >
          {items.map((item, index) => (
            <div
              key={item.title}
              className="flex-shrink-0 w-72 scroll-snap-start"
            >
              <KpiCard {...item} />
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        {items.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {items.map((_, index) => (
              <motion.button
                key={index}
                variants={scrollIndicator}
                animate={index === activeIndex ? 'active' : 'inactive'}
                onClick={() => {
                  if (scrollRef.current) {
                    const cardWidth = scrollRef.current.scrollWidth / items.length;
                    scrollRef.current.scrollTo({
                      left: cardWidth * index,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="w-2 h-2 rounded-full bg-text-soft transition-all"
                aria-label={`Aller au slide ${index + 1}`}
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
      >
        {items.map((item) => (
          <KpiCard key={item.title} {...item} />
        ))}
      </motion.div>
    </div>
  );
}
