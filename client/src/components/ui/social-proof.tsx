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
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Certifications & Expertises
          </Badge>
          <h3 className="text-2xl font-bold mb-4">
            Reconnu par les <span className="text-primary">leaders du digital</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Nos certifications et notre expertise technique garantissent la qualité et la performance de vos projets web.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-3xl mb-3">{cert.badge}</div>
                <h4 className="font-semibold mb-2">{cert.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {cert.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-sm font-medium">Partenaires technologiques :</div>
            <Badge variant="outline">Vercel</Badge>
            <Badge variant="outline">Cloudflare</Badge>
            <Badge variant="outline">Google Cloud</Badge>
            <Badge variant="outline">Stripe</Badge>
            <Badge variant="outline">Mailchimp</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}