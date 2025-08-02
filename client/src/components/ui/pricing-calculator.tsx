import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Calculator, ArrowRight, Zap } from 'lucide-react';

interface PricingOption {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  popular?: boolean;
}

interface Feature {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'design' | 'fonctionnalite' | 'seo' | 'maintenance';
}

const baseOptions: PricingOption[] = [
  {
    id: 'vitrine',
    name: 'Site Vitrine',
    basePrice: 690,
    description: 'Site professionnel avec 5-8 pages',
    popular: true
  },
  {
    id: 'premium',
    name: 'Site Premium',
    basePrice: 1290,
    description: 'Site avancé avec fonctionnalités personnalisées'
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    basePrice: 2190,
    description: 'Boutique en ligne complète'
  }
];

const additionalFeatures: Feature[] = [
  // Design
  { id: 'animations', name: 'Animations avancées', price: 170, description: 'Micro-interactions et transitions fluides', category: 'design' },
  { id: 'custom-icons', name: 'Iconographie sur-mesure', price: 120, description: 'Création d\'icônes personnalisées', category: 'design' },
  { id: 'illustrations', name: 'Illustrations personnalisées', price: 250, description: 'Créations graphiques uniques', category: 'design' },
  
  // Fonctionnalités
  { id: 'blog', name: 'Blog intégré', price: 210, description: 'Système de blog avec CMS', category: 'fonctionnalite' },
  { id: 'multilingue', name: 'Site multilingue', price: 340, description: 'Gestion de plusieurs langues', category: 'fonctionnalite' },
  { id: 'booking', name: 'Système de réservation', price: 420, description: 'Calendrier et prise de RDV', category: 'fonctionnalite' },
  { id: 'crm', name: 'CRM intégré', price: 490, description: 'Gestion de la relation client', category: 'fonctionnalite' },
  
  // SEO & Marketing
  { id: 'seo-advanced', name: 'SEO Premium', price: 249, description: 'Optimisation SEO poussée', category: 'seo' },
  { id: 'analytics', name: 'Analytics avancés', price: 120, description: 'Tracking et rapports détaillés', category: 'seo' },
  { id: 'newsletter', name: 'Newsletter automatisée', price: 160, description: 'Campagnes email marketing', category: 'seo' },
  
  // Maintenance
  { id: 'maintenance-premium', name: 'Maintenance Premium', price: 39, description: 'Support prioritaire (par mois)', category: 'maintenance' },
  { id: 'hosting-premium', name: 'Hébergement Premium', price: 25, description: 'Serveur dédié haute performance (par mois)', category: 'maintenance' }
];

export default function PricingCalculator() {
  const [selectedBase, setSelectedBase] = useState<string>('vitrine');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [pages, setPages] = useState([8]);
  const [timeline, setTimeline] = useState([14]);
  
  const baseOption = baseOptions.find(opt => opt.id === selectedBase)!;
  
  const calculateTotal = () => {
    let total = baseOption.basePrice;
    
    // Pages supplémentaires (au-delà de 8 pages de base)
    if (pages[0] > 8) {
      total += (pages[0] - 8) * 65;
    }
    
    // Délai urgent (moins de 14 jours)
    if (timeline[0] < 14) {
      total += total * 0.3; // 30% de supplément
    }
    
    // Fonctionnalités additionnelles
    selectedFeatures.forEach(featureId => {
      const feature = additionalFeatures.find(f => f.id === featureId);
      if (feature) {
        total += feature.price;
      }
    });
    
    return Math.round(total);
  };

  const getDeliveryText = () => {
    if (timeline[0] <= 7) return 'Express (7 jours)';
    if (timeline[0] <= 14) return 'Standard (14 jours)';
    return 'Économique (21+ jours)';
  };

  const groupedFeatures = additionalFeatures.reduce((acc, feature) => {
    if (!acc[feature.category]) acc[feature.category] = [];
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  const categoryLabels = {
    design: 'Design & Créatif',
    fonctionnalite: 'Fonctionnalités',
    seo: 'SEO & Marketing',
    maintenance: 'Maintenance & Hébergement'
  };

  return (
    <section className="py-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Estimez votre <span className="text-primary">projet web</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Configurez votre projet selon vos besoins et obtenez une estimation instantanée.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Configuration */}
          <div className="lg:col-span-2 space-y-8">
            {/* Type de site */}
            <Card>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {baseOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => setSelectedBase(option.id)}
                      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedBase === option.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option.popular && (
                        <Badge className="absolute -top-2 left-4 bg-primary">
                          Populaire
                        </Badge>
                      )}
                      <h4 className="font-semibold mb-2">{option.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {option.description}
                      </p>
                      <p className="text-lg font-bold text-primary">
                        À partir de {option.basePrice}€
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Nombre de pages */}
            <Card>
              <CardHeader>
                <CardTitle>Nombre de pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {pages[0]} page{pages[0] > 1 ? 's' : ''}
                    </span>
                    {pages[0] > 8 && (
                      <Badge variant="outline">
                        +{(pages[0] - 8) * 80}€ pour {pages[0] - 8} page{pages[0] - 8 > 1 ? 's' : ''} supplémentaire{pages[0] - 8 > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                  <Slider
                    value={pages}
                    onValueChange={setPages}
                    max={20}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>5 pages</span>
                    <span>20 pages</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Délai de livraison */}
            <Card>
              <CardHeader>
                <CardTitle>Délai de livraison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {getDeliveryText()}
                    </span>
                    {timeline[0] < 14 && (
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        +30% (livraison urgente)
                      </Badge>
                    )}
                  </div>
                  <Slider
                    value={timeline}
                    onValueChange={setTimeline}
                    max={30}
                    min={7}
                    step={7}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>7 jours</span>
                    <span>30+ jours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fonctionnalités additionnelles */}
            <Card>
              <CardHeader>
                <CardTitle>Fonctionnalités additionnelles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(groupedFeatures).map(([category, features]) => (
                    <div key={category}>
                      <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {features.map((feature) => (
                          <div
                            key={feature.id}
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                          >
                            <Checkbox
                              id={feature.id}
                              checked={selectedFeatures.includes(feature.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedFeatures([...selectedFeatures, feature.id]);
                                } else {
                                  setSelectedFeatures(selectedFeatures.filter(id => id !== feature.id));
                                }
                              }}
                            />
                            <div className="flex-1">
                              <label
                                htmlFor={feature.id}
                                className="text-sm font-medium cursor-pointer"
                              >
                                {feature.name}
                                <span className="text-primary font-semibold ml-2">
                                  +{feature.price}€{feature.category === 'maintenance' ? '/mois' : ''}
                                </span>
                              </label>
                              <p className="text-xs text-gray-500 mt-1">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Résumé et total */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-gray-800">
              <CardHeader>
                <CardTitle className="text-center">Estimation de votre projet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {calculateTotal().toLocaleString()}€
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Prix estimé tout compris
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Base ({baseOption.name})</span>
                    <span className="font-medium">{baseOption.basePrice}€</span>
                  </div>
                  
                  {pages[0] > 8 && (
                    <div className="flex justify-between">
                      <span>Pages supplémentaires</span>
                      <span className="font-medium">+{(pages[0] - 8) * 65}€</span>
                    </div>
                  )}
                  
                  {timeline[0] < 14 && (
                    <div className="flex justify-between">
                      <span>Livraison urgente</span>
                      <span className="font-medium text-orange-600">+30%</span>
                    </div>
                  )}
                  
                  {selectedFeatures.map(featureId => {
                    const feature = additionalFeatures.find(f => f.id === featureId)!;
                    return (
                      <div key={featureId} className="flex justify-between">
                        <span className="text-xs">{feature.name}</span>
                        <span className="font-medium text-xs">+{feature.price}€</span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-base font-semibold">
                    <span>Total estimé</span>
                    <span className="text-primary">{calculateTotal().toLocaleString()}€</span>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Demander un devis détaillé
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-xs text-center text-gray-500">
                  * Estimation indicative. Le prix final sera ajusté selon vos besoins exacts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}