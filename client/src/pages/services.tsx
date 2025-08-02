import { Check } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import PricingCalculatorProgressive from '@/components/ui/pricing-calculator-progressive';
import Breadcrumbs from '@/components/ui/breadcrumbs';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};



const additionalServices = [
  {
    title: "Refonte de Site Web",
    description: "Modernisation complète de votre site existant avec amélioration des performances et du design.",
    price: "À partir de 490€"
  },
  {
    title: "Maintenance & Support",
    description: "Mises à jour régulières, sauvegardes, et support technique pour assurer la pérennité de votre site.",
    price: "39€/mois"
  },
  {
    title: "Audit SEO Complet",
    description: "Analyse approfondie de votre référencement avec plan d'action détaillé pour améliorer votre visibilité.",
    price: "249€"
  },
  {
    title: "Formation WordPress",
    description: "Session de formation personnalisée pour maîtriser l'administration de votre site web.",
    price: "120€/session"
  }
];

export default function Services() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // SEO optimisé pour page services
    document.title = "Tarifs & Devis Site Web | Offres Weblify Studio | Noah Delenclos";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "💰 Tarifs transparents sites web : Site Vitrine 690€, Premium 1290€, E-commerce 2190€. Devis gratuit, délai 7j, 100% satisfait. Calculateur en ligne.");
    }

    // Schema.org FAQPage pour SEO
    const existingScript = document.querySelector('script[data-faq-services]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.setAttribute('data-faq-services', 'true');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Combien coûte un site vitrine ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Notre site vitrine commence à 690€ et inclut design sur-mesure, responsive mobile, optimisation SEO, formulaire de contact et hébergement première année."
          }
        },
        {
          "@type": "Question", 
          "name": "Quel est le délai de réalisation ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "7 jours en moyenne pour un site vitrine standard, 14 jours pour un site premium, et sur devis pour les projets sur-mesure selon la complexité."
          }
        },
        {
          "@type": "Question",
          "name": "La maintenance est-elle incluse ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La maintenance est proposée à 39€/mois et inclut mises à jour sécurité, sauvegardes automatiques, support technique et optimisations performance."
          }
        }
      ]
    });
    document.head.appendChild(script);
  }, []);

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs />
        </div>

        {/* Header - Alignement perfectionné */}
        <div className="text-center mb-12 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Estimez votre <span className="text-primary">projet web</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Calculateur intelligent, devis instantané et tarifs transparents. 
            Découvrez votre estimation en quelques clics.
          </p>
        </div>

        {/* Calculateur de prix */}
        <PricingCalculatorProgressive />

        {/* Additional Services - Centrage amélioré */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-muted/50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-12 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Services Complémentaires</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Optimisez et maintenez votre présence web avec nos services additionnels
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
        </div>

        {/* Process Overview - Alignement optimal */}
        <div className="mt-20 text-center max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
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
