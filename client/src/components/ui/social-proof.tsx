import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Award, Users, Zap } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '15+',
    label: 'Projets réalisés',
    description: 'Sites web créés avec succès'
  },
  {
    icon: Award,
    value: '100%',
    label: 'Projets livrés',
    description: 'Tous nos clients satisfaits'
  },
  {
    icon: Zap,
    value: '7j',
    label: 'Livraison moyenne',
    description: 'Délai de création optimisé'
  },
  {
    icon: Star,
    value: '2025',
    label: 'Année de création',
    description: 'Agence récente et dynamique'
  }
];

const certifications = [
  {
    name: 'Spécialiste Web',
    description: 'Expertise technique avancée',
    badge: '🏆'
  },
  {
    name: 'Expert SEO',
    description: 'Optimisation référencement naturel',
    badge: '🎯'
  },
  {
    name: 'Développeur Full-Stack',
    description: 'React, TypeScript, Node.js',
    badge: '💻'
  },
  {
    name: 'Designer UI/UX',
    description: 'Interface & Expérience utilisateur',
    badge: '🎨'
  }
];

// Partenaires technologiques en affichage statique
const techPartners = [
  "Vercel", "Cloudflare", "Google Cloud", "Stripe", "Mailchimp", 
  "React", "TypeScript", "Tailwind CSS", "Google Analytics", "Search Console"
];

export default function SocialProof() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Nos Expertises
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Des compétences reconnues et certifiées
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">{cert.badge}</div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {cert.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {cert.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partenaires Technologiques - Format statique normal */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Technologies Partenaires
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Nous travaillons avec les meilleures technologies du marché
          </p>
          
          {/* Badges statiques en grille */}
          <div className="flex flex-wrap justify-center items-center gap-3 max-w-4xl mx-auto">
            {techPartners.map((partner, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105"
              >
                {partner}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}