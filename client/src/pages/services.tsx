import { Check, Star } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const services = [
  {
    name: "Site Vitrine",
    price: "À partir de 800€",
    description: "Parfait pour présenter votre activité et attirer de nouveaux clients",
    features: [
      "Design moderne et responsive",
      "5 pages maximum",
      "Optimisation SEO de base",
      "Formulaire de contact",
      "Hébergement 1 an inclus",
      "Formation à l'administration",
      "Support 30 jours"
    ],
    popular: false,
    color: "border-primary"
  },
  {
    name: "Site Premium",  
    price: "À partir de 1 500€",
    description: "Solution complète pour une présence web professionnelle et efficace",
    features: [
      "Design sur-mesure premium",
      "10 pages maximum",
      "SEO avancé + audit",
      "Blog intégré",
      "Animations personnalisées",
      "Certificat SSL",
      "Analytics et suivi",
      "Formation approfondie",
      "Support 60 jours"
    ],
    popular: true,
    color: "border-primary ring-2 ring-primary"
  },
  {
    name: "Développement Sur-Mesure",
    price: "Sur devis",
    description: "Solution entièrement personnalisée selon vos besoins spécifiques",
    features: [
      "Cahier des charges personnalisé",
      "Nombre de pages illimité",
      "Fonctionnalités avancées",
      "Base de données sur-mesure",
      "API et intégrations",
      "Tests de performance",
      "Formation complète équipe",
      "Support prioritaire 90 jours",
      "Maintenance évolutive"
    ],
    popular: false,
    color: "border-primary"
  }
];

const additionalServices = [
  {
    title: "Refonte de Site Web",
    description: "Modernisation complète de votre site existant avec amélioration des performances et du design.",
    price: "À partir de 600€"
  },
  {
    title: "Maintenance & Support",
    description: "Mises à jour régulières, sauvegardes, et support technique pour assurer la pérennité de votre site.",
    price: "50€/mois"
  },
  {
    title: "Audit SEO Complet",
    description: "Analyse approfondie de votre référencement avec plan d'action détaillé pour améliorer votre visibilité.",
    price: "300€"
  },
  {
    title: "Formation WordPress",
    description: "Session de formation personnalisée pour maîtriser l'administration de votre site web.",
    price: "150€/session"
  }
];

export default function Services() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Nos Offres
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Choisissez la solution qui vous correspond
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des offres transparentes et adaptées à tous les budgets, 
            du site vitrine simple au développement sur-mesure.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <Card key={index} className={`relative ${service.color} ${service.popular ? 'scale-105' : ''} transition-all duration-300 hover:shadow-xl`}>
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    Plus populaire
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{service.name}</CardTitle>
                <div className="text-3xl font-bold text-primary mt-2">{service.price}</div>
                <p className="text-muted-foreground mt-2">{service.description}</p>
              </CardHeader>
              
              <CardContent className="pt-4">
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button asChild className="w-full" variant={service.popular ? "default" : "outline"}>
                  <Link href="/contact" onClick={scrollToTop}>
                    {service.name === "Développement Sur-Mesure" ? "Demander un devis" : "Choisir cette offre"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Services Complémentaires</h2>
            <p className="text-muted-foreground">
              Optimisez et maintenez votre présence web avec nos services additionnels
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                    <Badge variant="outline" className="text-primary font-semibold">
                      {service.price}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Process Overview */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-8">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Prenez contact avec nous pour discuter de votre projet
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold">Devis</h3>
              <p className="text-sm text-muted-foreground">
                Nous établissons un devis personnalisé selon vos besoins
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold">Création</h3>
              <p className="text-sm text-muted-foreground">
                Développement de votre site avec suivi en temps réel
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold">Livraison</h3>
              <p className="text-sm text-muted-foreground">
                Mise en ligne et formation pour l'utilisation de votre site
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center bg-gradient-to-r from-primary/10 to-blue-50 dark:from-primary/20 dark:to-blue-900/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Une question sur nos offres ?</h2>
          <p className="text-muted-foreground mb-8">
            Notre équipe est là pour vous conseiller et vous accompagner dans le choix de la solution la plus adaptée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact" onClick={scrollToTop}>Demander un devis gratuit</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/faq" onClick={scrollToTop}>Consulter la FAQ</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
