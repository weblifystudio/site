import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Award, Users, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

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

// Badges par groupes pour le défilement
const techPartnerGroups = [
  {
    label: "Cloud & Infrastructure",
    badges: ["Vercel", "Cloudflare", "Google Cloud"]
  },
  {
    label: "Paiements & Marketing", 
    badges: ["Stripe", "Mailchimp", "Email API"]
  },
  {
    label: "Développement & Design",
    badges: ["React", "TypeScript", "Tailwind CSS"]
  },
  {
    label: "SEO & Analytics",
    badges: ["Google Analytics", "Search Console", "Lighthouse"]
  }
];

export default function SocialProof() {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotation du défilement
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentGroupIndex((prev) => (prev + 1) % techPartnerGroups.length);
    }, 4000); // Change toutes les 4 secondes
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentGroupIndex((prev) => (prev + 1) % techPartnerGroups.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const goToPrevious = () => {
    setCurrentGroupIndex((prev) => (prev - 1 + techPartnerGroups.length) % techPartnerGroups.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };
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

        {/* Trust indicators - Défilement avec navigation */}
        <div className="mt-16">
          <div className="text-center mb-6">
            <div className="text-sm font-medium text-muted-foreground mb-4">
              {techPartnerGroups[currentGroupIndex].label}
            </div>
          </div>
          
          {/* Container avec navigation */}
          <div className="relative max-w-2xl mx-auto">
            {/* Badges avec transition */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentGroupIndex * 100}%)` }}
              >
                {techPartnerGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="w-full flex-shrink-0 flex justify-center items-center gap-4 py-4">
                    {group.badges.map((badge, badgeIndex) => (
                      <Badge 
                        key={badgeIndex} 
                        variant="outline" 
                        className="transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Indicateurs (petits ronds) */}
              <div className="flex space-x-2">
                {techPartnerGroups.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentGroupIndex(index);
                      setIsAutoPlaying(false);
                      setTimeout(() => setIsAutoPlaying(true), 8000);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentGroupIndex
                        ? 'bg-primary scale-125'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}