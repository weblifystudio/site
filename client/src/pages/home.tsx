import { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RevealAnimation from '@/components/RevealAnimation';
import TypewriterText from '@/components/TypewriterText';
import Testimonials from '@/components/ui/testimonials';

import SocialProof from '@/components/ui/social-proof';
import { 
  Palette, 
  Rocket, 
  Search, 
  Headphones, 
  Zap, 
  Wand2, 
  TrendingUp, 
  Heart,
  RotateCcw,
  Settings,
  Shield,
  Layers,
  Eye,
  Gem,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const carouselSlides = [
  {
    icon: Palette,
    title: "Design Exceptionnel",
    description: "Chaque site est unique, conçu sur-mesure pour refléter votre identité et captiver vos visiteurs dès le premier regard."
  },
  {
    icon: Rocket,
    title: "Rapidité Garantie", 
    description: "Sites ultra-performants avec des temps de chargement optimisés pour une expérience utilisateur fluide et efficace."
  },
  {
    icon: Search,
    title: "SEO Optimisé",
    description: "Votre site sera visible sur Google avec notre expertise en référencement naturel et techniques SEO avancées."
  },
  {
    icon: Headphones,
    title: "Accompagnement Premium",
    description: "Support personnalisé et accompagnement continu pour assurer le succès de votre présence en ligne."
  }
];

const keyStrengths = [
  {
    icon: Zap,
    title: "Rapidité de Livraison",
    description: "Votre site prêt en 7 jours en moyenne. Processus optimisé pour des résultats rapides sans compromis sur la qualité.",
    highlight: "→ 7 jours max",
    color: "from-primary to-blue-600"
  },
  {
    icon: Wand2,
    title: "Design Esthétique",
    description: "Interfaces modernes et élégantes qui captivent vos visiteurs et renforcent votre image de marque professionnelle.",
    highlight: "→ 100% sur-mesure",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: TrendingUp,
    title: "SEO Optimisé",
    description: "Référencement naturel intégré dès la conception pour maximiser votre visibilité sur les moteurs de recherche.",
    highlight: "→ Top 3 Google",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Heart,
    title: "UX Fluide",
    description: "Expérience utilisateur pensée et optimisée pour convertir vos visiteurs en clients fidèles.",
    highlight: "→ +40% conversion",
    color: "from-orange-500 to-red-500"
  }
];

const additionalServices = [
  { 
    icon: RotateCcw, 
    title: "Refonte de Sites", 
    description: "Modernisation et optimisation de votre site existant",
    color: "bg-blue-100 dark:bg-blue-900/30 text-primary"
  },
  { 
    icon: Settings, 
    title: "Maintenance", 
    description: "Mises à jour et support technique continu",
    color: "bg-green-100 dark:bg-green-900/30 text-green-500"
  },
  { 
    icon: Shield, 
    title: "Cybersécurité", 
    description: "Tests de sécurité et débogage professionnel",
    color: "bg-red-100 dark:bg-red-900/30 text-red-500"
  },
  { 
    icon: Layers, 
    title: "Templates Premium", 
    description: "Modèles professionnels prêts à l'emploi",
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-500"
  }
];

const timelineSteps = [
  {
    step: 1,
    title: "Idée & Analyse",
    description: "Nous analysons vos besoins, votre secteur et définissons ensemble les objectifs de votre projet.",
    duration: "⏱ 1-2 jours"
  },
  {
    step: 2,
    title: "Maquette & Design",
    description: "Création des maquettes visuelles et validation du design avant le développement.",
    duration: "⏱ 2-3 jours"
  },
  {
    step: 3,
    title: "Développement",
    description: "Développement technique, intégration du contenu et optimisation des performances.",
    duration: "⏱ 3-4 jours"
  },
  {
    step: 4,
    title: "Mise en Ligne",
    description: "Tests finaux, mise en ligne et formation pour l'administration de votre site.",
    duration: "⏱ 1 jour"
  }
];

const commitments = [
  {
    icon: Eye,
    title: "Transparence",
    description: "Communication claire, devis détaillés et suivi en temps réel de votre projet."
  },
  {
    icon: Gem,
    title: "Qualité",
    description: "Code propre, design soigné et respect des meilleures pratiques du web."
  },
  {
    icon: Clock,
    title: "Rapidité",
    description: "Respect des délais et livraison dans les temps convenus, sans compromis."
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countersStarted, setCountersStarted] = useState(false);
  const [projectsCount, setProjectsCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0);
  const [delayCount, setDelayCount] = useState(0);
  const statsRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 7000); // Ralenti de 5s à 7s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted) {
            setCountersStarted(true);
            
            // Animation compteur projets (0 -> 15)
            let current = 0;
            const projectInterval = setInterval(() => {
              current += 1;
              setProjectsCount(current);
              if (current >= 15) clearInterval(projectInterval);
            }, 40);
            
            // Animation compteur satisfaction (0 -> 100)
            let currentSat = 0;
            const satInterval = setInterval(() => {
              currentSat += 2;
              setSatisfactionCount(currentSat);
              if (currentSat >= 100) clearInterval(satInterval);
            }, 40);
            
            // Animation compteur délai (0 -> 7)
            let currentDelay = 0;
            const delayInterval = setInterval(() => {
              currentDelay += 1;
              setDelayCount(currentDelay);
              if (currentDelay >= 7) clearInterval(delayInterval);
            }, 200);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [countersStarted]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="pb-16 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-primary">Agence Web Paris #1</span>{' '}
                <span className="block">Sites Internet Professionnels</span>
                <span className="block text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mt-2">
                  Par Noah Delenclos - Expert Développement Sur-Mesure
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                <strong>Weblify Studio Paris</strong> - Création sites internet professionnels, e-commerce et applications web sur-mesure. 
                SEO optimisé, délai 7 jours, 100% satisfait ou remboursé. <strong>Devis gratuit en 24h.</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="hover:bg-primary/90 transition-colors duration-300">
                  <Link href="/offres" onClick={scrollToTop}>Je veux mon devis</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="hover:bg-secondary transition-colors duration-300">
                  <Link href="/contact" onClick={scrollToTop}>Contactez-nous</Link>
                </Button>
              </div>
              
              <div ref={statsRef} className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{projectsCount}+</div>
                  <div className="text-sm text-muted-foreground">Projets réalisés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{satisfactionCount}%</div>
                  <div className="text-sm text-muted-foreground">Clients satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{delayCount}j</div>
                  <div className="text-sm text-muted-foreground">Délai moyen</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-float">
              <div className="relative w-full h-96 bg-gradient-to-br from-primary/10 to-blue-100 dark:from-primary/20 dark:to-blue-900/20 rounded-3xl p-8">
                
                {/* Éléments flottants indépendants - Positions harmonisées */}
                <div className="absolute top-8 left-8 w-12 h-12 bg-primary rounded-xl opacity-70 animate-float1"></div>
                <div className="absolute top-16 right-8 w-8 h-8 bg-blue-300 rounded-lg opacity-60 animate-float2"></div>
                <div className="absolute bottom-16 left-12 w-16 h-3 bg-primary/60 rounded-full animate-float3"></div>
                <div className="absolute bottom-8 right-12 w-6 h-6 bg-blue-400 rounded-full animate-float4"></div>
                
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-primary rounded-2xl mx-auto flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold">Design & Développement</h3>
                    <p className="text-muted-foreground">Solutions créatives et techniques</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Carousel */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-6">
          <RevealAnimation>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pourquoi choisir Weblify Studio ?</h2>
              <p className="text-muted-foreground">Découvrez ce qui fait notre différence</p>
            </div>
          </RevealAnimation>
          
          <Card className="relative overflow-hidden shadow-xl">
            <CardContent className="p-0">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {carouselSlides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0 p-12 text-center">
                    <div className="max-w-2xl mx-auto">
                      <div className="w-20 h-20 bg-primary rounded-3xl mx-auto mb-6 flex items-center justify-center">
                        <slide.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{slide.title}</h3>
                      <p className="text-muted-foreground text-lg">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-background hover:shadow-lg transition-all duration-200 z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-background hover:shadow-lg transition-all duration-200 z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              {/* Pagination Dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentSlide ? 'bg-primary w-8' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Strengths */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <RevealAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Nos 4 Points Forts</h2>
              <p className="text-xl text-muted-foreground">Ce qui fait l'excellence de Weblify Studio</p>
            </div>
          </RevealAnimation>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyStrengths.map((strength, index) => (
              <RevealAnimation key={index} delay={index * 200}>
                <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-slide-up cursor-pointer border-0 hover:border-primary/50 relative overflow-hidden">
                <CardContent className="p-8 relative">
                  {/* Effet de brillance au hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${strength.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl`}>
                    <strength.icon className="w-8 h-8 text-white group-hover:animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">{strength.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors duration-300">{strength.description}</p>
                  <Badge variant="secondary" className="font-semibold group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:scale-105">
                    {strength.highlight}
                  </Badge>
                </CardContent>
              </Card>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Services Complémentaires</h2>
            <p className="text-xl text-muted-foreground">Accompagnement complet pour votre réussite digitale</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-500 group cursor-pointer hover:-translate-y-2 hover:border-primary/50 relative overflow-hidden">
                <CardContent className="p-6 relative">
                  {/* Effet de brillance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps - Mobile-First Responsive */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Notre Processus de Création</h2>
            <p className="text-xl text-muted-foreground">De l'idée à la mise en ligne, en 4 étapes claires</p>
          </div>
          
          {/* Mobile Layout (Vertical) */}
          <div className="block lg:hidden space-y-8">
            {timelineSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <Card className="shadow-xl border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-lg font-bold">{step.step}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{step.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-primary font-semibold">
                            {step.duration}
                          </Badge>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30">
                            Étape {step.step}/4
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {index < timelineSteps.length - 1 && (
                  <div className="w-1 h-8 bg-gradient-to-b from-primary to-blue-600 mx-6 my-4"></div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Layout (Horizontal Timeline) */}
          <div className="hidden lg:block relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-primary to-blue-600"></div>
            
            <div className="space-y-16">
              {timelineSteps.map((step, index) => (
                <div key={step.step} className="flex items-center">
                  {index % 2 === 0 ? (
                    <>
                      <div className="w-1/2 pr-8 text-right">
                        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                          <CardContent className="p-8">
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-muted-foreground mb-4 leading-relaxed">{step.description}</p>
                            <div className="flex justify-end space-x-2">
                              <Badge variant="outline" className="text-primary font-semibold">
                                {step.duration}
                              </Badge>
                              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30">
                                Étape {step.step}/4
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full border-4 border-background shadow-xl z-10 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">{step.step}</span>
                      </div>
                      <div className="w-1/2 pl-8"></div>
                    </>
                  ) : (
                    <>
                      <div className="w-1/2 pr-8"></div>
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-full border-4 border-background shadow-xl z-10 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">{step.step}</span>
                      </div>
                      <div className="w-1/2 pl-8">
                        <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                          <CardContent className="p-8">
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-muted-foreground mb-4 leading-relaxed">{step.description}</p>
                            <div className="flex space-x-2">
                              <Badge variant="outline" className="text-primary font-semibold">
                                {step.duration}
                              </Badge>
                              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30">
                                Étape {step.step}/4
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-blue-50 dark:from-primary/20 dark:to-blue-900/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nos Engagements</h2>
            <p className="text-xl text-muted-foreground">Les valeurs qui guident notre travail</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {commitments.map((commitment, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-background rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <commitment.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{commitment.title}</h3>
                <p className="text-muted-foreground">{commitment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Testimonials */}
      <Testimonials />



      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Prêt à démarrer votre projet ?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Transformons votre vision en réalité digitale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="hover:bg-primary/90 transition-colors duration-300">
              <Link href="/offres" onClick={scrollToTop}>Calculer mon devis</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="hover:bg-secondary transition-colors duration-300">
              <Link href="/contact" onClick={scrollToTop}>Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
