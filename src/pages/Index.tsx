
import { motion } from 'framer-motion';
import { fadeInUp, listStagger } from '@/lib/motion/variants';
import { Heart, Shield, Calendar, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Landing page for Paitzy - welcoming and informative
 */
const Index = () => {
  const features = [
    {
      icon: Heart,
      title: 'Suivi du bien-être',
      description: 'Gardez un œil sur la santé et le bonheur de vos compagnons avec des outils de suivi intuitifs.'
    },
    {
      icon: Calendar,
      title: 'Agenda intelligent',
      description: 'Ne manquez plus jamais un rendez-vous vétérinaire ou un soin important grâce à notre système de rappels.'
    },
    {
      icon: Camera,
      title: 'Souvenirs précieux',
      description: 'Capturez et organisez les moments spéciaux avec vos animaux dans une galerie sécurisée.'
    },
    {
      icon: Shield,
      title: 'Données sécurisées',
      description: 'Vos informations et celles de vos compagnons sont protégées avec les plus hauts standards de sécurité.'
    }
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="section-wrapper py-20 safe-top"
      >
        <div className="content-container text-center">
          <motion.div
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-display mb-6">
              Prenez soin de vos{' '}
              <span className="text-brand">compagnons</span>
              <br />
              avec Paitzy
            </h1>
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto leading-relaxed">
              L'application complète pour suivre la santé, organiser les soins et 
              conserver les précieux souvenirs de vos animaux de compagnie.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="neumo-button neumo-button--brand text-lg px-8 py-4"
                >
                  Commencer gratuitement
                </motion.button>
              </Link>
              
              <Link to="/auth/sign-in">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="neumo-button text-lg px-8 py-4"
                >
                  Se connecter
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        variants={listStagger}
        initial="hidden"
        animate="show"
        className="section-wrapper py-16"
      >
        <div className="content-container">
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-heading mb-4">
              Tout ce dont vous avez besoin pour vos compagnons
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Paitzy vous accompagne dans tous les aspects du bien-être de vos animaux
            </p>
          </motion.div>

          <div className="grid-cards grid-cards--2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="neumo-card p-8 text-center lg:text-left lg:flex lg:items-start lg:gap-6"
              >
                <div className="neumo-inset w-16 h-16 rounded-neumo-lg mx-auto lg:mx-0 flex items-center justify-center mb-4 lg:mb-0 flex-shrink-0">
                  <feature.icon size={24} className="text-brand" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-subheading mb-3">{feature.title}</h3>
                  <p className="text-text-muted leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="section-wrapper py-16"
      >
        <div className="content-container">
          <div className="neumo-card p-12 text-center">
            <h2 className="text-heading mb-4">
              Prêt à mieux prendre soin de vos compagnons ?
            </h2>
            <p className="text-lg text-text-muted mb-8 max-w-xl mx-auto">
              Rejoignez les propriétaires d'animaux qui font confiance à Paitzy 
              pour le suivi de leurs compagnons.
            </p>
            
            <Link to="/dashboard">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="neumo-button neumo-button--brand text-lg px-8 py-4"
              >
                Découvrir Paitzy
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="section-wrapper py-8 border-t border-surface-3">
        <div className="content-container">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-brand" />
              <span>Fait avec ❤️ pour nos compagnons</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-text transition-colors">
                Confidentialité
              </a>
              <a href="#" className="hover:text-text transition-colors">
                Conditions
              </a>
              <a href="#" className="hover:text-text transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
