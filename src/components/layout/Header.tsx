
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Plus, 
  Bell, 
  User, 
  Menu, 
  X,
  Home,
  Heart,
  Calendar,
  Camera,
  Activity,
  Settings
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { headerShrink, slideInRight, press, overlay } from '@/lib/motion/variants';

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: Home },
  { label: 'Mes animaux', href: '/pets', icon: Heart },
  { label: 'Timeline', href: '/timeline', icon: Calendar },
  { label: 'Souvenirs', href: '/memories', icon: Camera },
  { label: 'Santé', href: '/health', icon: Activity },
  { label: 'Paramètres', href: '/settings', icon: Settings },
];

/**
 * Sticky header with mobile drawer navigation and scroll shrink
 * Implements accessibility best practices and responsive design
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll detection for header shrink
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActiveRoute = (href: string) => {
    if (href === '/dashboard' && location.pathname === '/') return true;
    return location.pathname === href;
  };

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="skip-link focus:not-sr-only"
      >
        Passer au contenu
      </a>

      {/* Header */}
      <motion.header
        variants={headerShrink}
        animate={isScrolled ? 'shrunk' : 'expanded'}
        className="sticky top-0 z-50 w-full safe-top bg-bg/95 backdrop-blur-sm border-b border-surface-3"
        role="banner"
      >
        <div className="section-wrapper">
          <div className="content-container flex items-center justify-between h-full">
            {/* Logo and Brand */}
            <div className="flex items-center gap-6">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 focus-ring rounded-neumo-md p-2"
                aria-label="Paitzy - Accueil"
              >
                <div className="w-8 h-8 neumo-inset rounded-full flex items-center justify-center">
                  <Heart size={18} className="text-brand" />
                </div>
                <span className="text-xl font-bold text-brand">Paitzy</span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex" role="navigation" aria-label="Navigation principale">
                <div className="neumo-inset rounded-neumo-lg p-1 flex">
                  {navigationItems.map((item) => {
                    const isActive = isActiveRoute(item.href);
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`
                          px-4 py-2 rounded-neumo-md text-sm font-medium transition-all focus-ring
                          ${isActive 
                            ? 'neumo-card text-text shadow-neumo bg-surface' 
                            : 'text-text-muted hover:text-text hover:bg-surface/30'
                          }
                        `}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </nav>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Add Button */}
              <motion.button
                whileTap={press.tap}
                className="neumo-button neumo-button--brand flex items-center gap-2 focus-ring"
                aria-label="Ajouter un élément"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Ajouter</span>
              </motion.button>

              {/* Notifications */}
              <motion.button
                whileTap={press.tap}
                className="neumo-button w-11 h-11 p-0 focus-ring"
                aria-label="Notifications"
              >
                <Bell size={16} />
              </motion.button>

              {/* Profile */}
              <motion.button
                whileTap={press.tap}
                className="neumo-button w-11 h-11 p-0 focus-ring"
                aria-label="Profil utilisateur"
              >
                <User size={16} />
              </motion.button>

              {/* Mobile Menu Trigger */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <motion.button
                    whileTap={press.tap}
                    className="lg:hidden neumo-button w-11 h-11 p-0 focus-ring"
                    aria-label="Menu de navigation"
                  >
                    <Menu size={16} />
                  </motion.button>
                </SheetTrigger>

                <SheetContent 
                  side="right" 
                  className="w-80 neumo-card border-surface-3 p-0"
                >
                  <SheetHeader className="p-6 border-b border-surface-3">
                    <SheetTitle className="text-left text-xl font-bold text-brand">
                      Navigation
                    </SheetTitle>
                    <SheetDescription className="text-left text-text-muted">
                      Accédez aux différentes sections de l'application
                    </SheetDescription>
                  </SheetHeader>

                  <nav 
                    className="flex flex-col p-4" 
                    role="navigation" 
                    aria-label="Navigation mobile"
                  >
                    {navigationItems.map((item) => {
                      const isActive = isActiveRoute(item.href);
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          className={`
                            flex items-center gap-3 px-4 py-3 rounded-neumo-lg transition-all focus-ring
                            ${isActive 
                              ? 'neumo-card text-text bg-surface shadow-neumo' 
                              : 'text-text-muted hover:text-text hover:bg-surface/30'
                            }
                          `}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <item.icon size={20} />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      );
                    })}

                    {/* Mobile Actions */}
                    <div className="mt-6 pt-6 border-t border-surface-3 space-y-3">
                      <motion.button
                        whileTap={press.tap}
                        className="w-full neumo-button neumo-button--brand flex items-center justify-center gap-2 focus-ring"
                      >
                        <Plus size={16} />
                        Ajouter un élément
                      </motion.button>
                      
                      <div className="flex gap-3">
                        <motion.button
                          whileTap={press.tap}
                          className="flex-1 neumo-button flex items-center justify-center gap-2 focus-ring"
                        >
                          <Bell size={16} />
                          Notifications
                        </motion.button>
                        <motion.button
                          whileTap={press.tap}
                          className="flex-1 neumo-button flex items-center justify-center gap-2 focus-ring"
                        >
                          <User size={16} />
                          Profile
                        </motion.button>
                      </div>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
