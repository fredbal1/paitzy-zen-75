
import { useState } from 'react';
import { motion } from 'framer-motion';
import { listStagger } from '@/lib/motion/variants';
import { 
  Calendar, 
  Heart, 
  AlertTriangle, 
  CheckCircle
} from 'lucide-react';

// Components
import { Header } from '@/components/layout/Header';
import { Section } from '@/components/common/Section';
import { KpiCarousel } from '@/components/kpi/KpiCarousel';
import { PetCardCompact } from '@/components/pet/PetCardCompact';
import { WellbeingWidget } from '@/components/wellbeing/WellbeingWidget';
import { MemoriesGrid } from '@/components/memories/MemoriesGrid';
import { TimelineTabs } from '@/components/timeline/TimelineTabs';
import { Empty } from '@/components/common/Empty';
import { ErrorState } from '@/components/common/ErrorState';
import { SkeletonCard } from '@/components/common/Skeleton';

// Hooks
import { usePets } from '@/lib/hooks/usePets';
import { useEvents } from '@/lib/hooks/useEvents';
import { useOverallWellbeing } from '@/lib/hooks/useWellbeing';

// Error handling
import { NotConnectedError } from '@/lib/data/NotConnectedError';

/**
 * Main Dashboard page with dark neumorphic design
 * Responsive layout with KPIs, pets, wellbeing, memories and timeline
 */
const Dashboard = () => {
  const [expandedPetId, setExpandedPetId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Data fetching
  const { data: pets = [], isLoading: petsLoading, error: petsError } = usePets();
  const { data: events = [], isLoading: eventsLoading, error: eventsError } = useEvents();
  const { data: wellbeingStats, isLoading: wellbeingLoading } = useOverallWellbeing();

  // KPI data (calculated from events in real app)
  const kpiData = [
    {
      title: 'Rendez-vous',
      count: 0,
      subtitle: 'À venir',
      icon: Calendar,
      href: '/timeline?filter=appointments'
    },
    {
      title: 'Soins',
      count: 0,
      subtitle: 'Planifiés',
      icon: Heart,
      href: '/timeline?filter=care'
    },
    {
      title: 'À surveiller',
      count: 0,
      subtitle: 'Éléments',
      icon: AlertTriangle,
      href: '/timeline?filter=watch'
    },
    {
      title: 'Terminés',
      count: 0,
      subtitle: 'Aujourd\'hui',
      icon: CheckCircle,
      href: '/timeline?filter=completed'
    }
  ];

  const handleTogglePetExpansion = (petId: string) => {
    setExpandedPetId(expandedPetId === petId ? null : petId);
  };

  const handleToggleEvent = (eventId: string) => {
    // In real app, this would call the mutation
    console.log('Toggle event:', eventId);
  };

  const handleReportGood = () => {
    try {
      // This will throw NotConnectedError
      throw new NotConnectedError('Impossible de signaler le bien-être - connexion Supabase requise');
    } catch (err) {
      if (err instanceof NotConnectedError) {
        setError(err.message);
        setTimeout(() => setError(null), 5000);
      }
    }
  };

  const handleReportIssue = () => {
    try {
      // This will throw NotConnectedError
      throw new NotConnectedError('Impossible de signaler un problème - connexion Supabase requise');
    } catch (err) {
      if (err instanceof NotConnectedError) {
        setError(err.message);
        setTimeout(() => setError(null), 5000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <Header />

      {/* Error Toast */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 neumo-card p-4 bg-warning-soft border border-warning/20 max-w-md"
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-warning font-medium">
                Connexion requise
              </p>
              <p className="text-xs text-warning/80 mt-1">
                {error}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <main 
        id="main-content" 
        className="section-wrapper py-8"
        role="main"
      >
        <div className="content-container">
          <motion.div
            variants={listStagger}
            initial="hidden"
            animate="show"
            className="space-y-12"
          >
            {/* KPI Section - Always first on mobile */}
            <Section 
              title="Aujourd'hui" 
              className="order-1"
              description="Aperçu de l'activité quotidienne"
            >
              <KpiCarousel items={kpiData} />
            </Section>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left Column - Pets (main focus) */}
              <div className="lg:col-span-8 space-y-8 order-2 lg:order-1">
                <Section 
                  title="Mes compagnons"
                  description="Suivez la santé et le bien-être de vos animaux"
                >
                  {petsLoading ? (
                    <div className="space-y-4" role="status" aria-label="Chargement des compagnons">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <SkeletonCard key={i} />
                      ))}
                    </div>
                  ) : petsError ? (
                    <ErrorState error={petsError} />
                  ) : pets.length === 0 ? (
                    <Empty
                      icon={Heart}
                      title="Aucun compagnon"
                      description="Ajoute ton premier compagnon pour démarrer 🐾"
                      action={{
                        label: 'Ajouter un compagnon',
                        onClick: () => console.log('Add pet')
                      }}
                    />
                  ) : (
                    <motion.div variants={listStagger} className="space-y-4">
                      {pets.map((pet) => (
                        <PetCardCompact
                          key={pet.id}
                          pet={pet}
                          onToggleExpand={handleTogglePetExpansion}
                          isExpanded={expandedPetId === pet.id}
                        />
                      ))}
                    </motion.div>
                  )}
                </Section>

                {/* Timeline Section - Below pets on mobile, at bottom on desktop */}
                <Section 
                  title="Agenda"
                  description="Gérez les rendez-vous et soins de vos compagnons"
                  className="order-4 lg:order-2"
                >
                  <TimelineTabs 
                    events={events}
                    onToggleEvent={handleToggleEvent}
                  />
                </Section>
              </div>

              {/* Right Column - Wellbeing & Memories */}
              <div className="lg:col-span-4 space-y-8 order-3 lg:order-2">
                {/* Wellbeing Widget */}
                <Section title="Bien-être">
                  {wellbeingLoading ? (
                    <div className="neumo-card p-6" role="status" aria-label="Chargement du bien-être">
                      <div className="skeleton w-20 h-20 rounded-full mx-auto mb-4" />
                      <div className="space-y-2">
                        <div className="skeleton h-4 w-32 mx-auto" />
                        <div className="skeleton h-3 w-24 mx-auto" />
                      </div>
                    </div>
                  ) : (
                    <WellbeingWidget
                      stats={wellbeingStats || { open_issues_count: 0 }}
                      onReportGood={handleReportGood}
                      onReportIssue={handleReportIssue}
                    />
                  )}
                </Section>

                {/* Memories Section */}
                <Section title="Souvenirs">
                  <MemoriesGrid 
                    memories={[]} 
                    onUpload={() => console.log('Upload memory')}
                  />
                </Section>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
