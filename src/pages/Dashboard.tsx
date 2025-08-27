
import { useState } from 'react';
import { motion } from 'framer-motion';
import { listStagger, fadeInUp } from '@/lib/motion/variants';
import { 
  Calendar, 
  Heart, 
  AlertTriangle, 
  CheckCircle, 
  Plus,
  Bell,
  User
} from 'lucide-react';

// Components
import { PageHeader } from '@/components/common/PageHeader';
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

/**
 * Main Dashboard page with KPIs, pets, wellbeing, memories and timeline
 */
const Dashboard = () => {
  const [expandedPetId, setExpandedPetId] = useState<string | null>(null);
  
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
    // In real app, this would open a dialog or directly log wellbeing
    console.log('Report good wellbeing');
  };

  const handleReportIssue = () => {
    // In real app, this would open the report issue dialog
    console.log('Open report issue dialog');
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="section-wrapper py-6 safe-top border-b border-surface-3">
        <div className="content-container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold text-brand">Paitzy</h1>
              
              {/* Navigation Tabs */}
              <nav className="hidden md:flex">
                <div className="neumo-inset rounded-neumo-lg p-1 flex">
                  {[
                    'Dashboard',
                    'Mes animaux', 
                    'Timeline',
                    'Souvenirs',
                    'Santé',
                    'Paramètres'
                  ].map((tab, index) => (
                    <button
                      key={tab}
                      className={`
                        px-4 py-2 rounded-neumo-md text-sm font-medium transition-all
                        ${index === 0 
                          ? 'neumo-card text-text shadow-neumo' 
                          : 'text-text-muted hover:text-text'
                        }
                      `}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="neumo-button neumo-button--brand flex items-center gap-2"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Ajouter</span>
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="neumo-button w-10 h-10 p-0"
              >
                <Bell size={16} />
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="neumo-button w-10 h-10 p-0"
              >
                <User size={16} />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <main className="section-wrapper py-8">
        <div className="content-container">
          <motion.div
            variants={listStagger}
            initial="hidden"
            animate="show"
            className="space-y-12"
          >
            {/* KPI Section - Always first on mobile */}
            <Section title="Aujourd'hui" className="order-1">
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
                    <div className="space-y-4">
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
                      description="Ajoutez votre premier compagnon pour commencer le suivi 🐾"
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
                    <div className="neumo-card p-6">
                      <div className="skeleton w-24 h-24 rounded-full mx-auto mb-4" />
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
