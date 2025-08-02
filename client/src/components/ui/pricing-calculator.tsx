import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Calculator, ArrowRight, Zap } from 'lucide-react';
import ContactFormIntegrated from '@/components/ui/contact-form-integrated';

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
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBase, setSelectedBase] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [pages, setPages] = useState([8]);
  const [expressDelivery, setExpressDelivery] = useState(false);
  
  const baseOption = baseOptions.find(opt => opt.id === selectedBase);

  const handleBaseSelection = (baseId: string) => {
    setSelectedBase(baseId);
    setCurrentStep(2);
  };

  const goToNextStep = () => setCurrentStep(prev => prev + 1);
  const goToPreviousStep = () => setCurrentStep(prev => Math.max(1, prev - 1));
  
  // Calcul automatique du délai de livraison basé sur la complexité
  const calculateEstimatedDelivery = () => {
    let baseDays = 0;
    
    // Délai de base selon le type de site
    switch (selectedBase) {
      case 'vitrine': baseDays = 7; break;
      case 'premium': baseDays = 14; break;
      case 'ecommerce': baseDays = 21; break;
    }
    
    // Ajout de temps pour les pages supplémentaires (1 jour par 2 pages)
    if (pages[0] > 8) {
      baseDays += Math.ceil((pages[0] - 8) / 2);
    }
    
    // Ajout de temps pour les fonctionnalités complexes
    const complexFeatures = ['booking', 'crm', 'multilingue'];
    const complexCount = selectedFeatures.filter(id => complexFeatures.includes(id)).length;
    baseDays += complexCount * 3;
    
    // Autres fonctionnalités (+1 jour par 2 fonctionnalités)
    const otherFeatures = selectedFeatures.filter(id => !complexFeatures.includes(id)).length;
    baseDays += Math.ceil(otherFeatures / 2);
    
    return baseDays;
  };

  const calculateTotal = () => {
    if (!baseOption) return 0;
    let total = baseOption.basePrice;
    
    // Pages supplémentaires (au-delà de 8 pages de base)
    if (pages[0] > 8) {
      total += (pages[0] - 8) * 65;
    }
    
    // Livraison express (proportionnelle à la complexité)
    if (expressDelivery) {
      const complexity = calculateEstimatedDelivery();
      const expressRate = complexity > 14 ? 0.4 : 0.3; // 40% si très complexe, 30% sinon
      total += total * expressRate;
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

  const getDeliveryInfo = () => {
    const estimatedDays = calculateEstimatedDelivery();
    const expressDays = Math.max(Math.ceil(estimatedDays / 2), 5); // Express = moitié du temps, min 5 jours
    
    return {
      estimated: estimatedDays,
      express: expressDays,
      estimatedText: `${estimatedDays} jours ouvrés`,
      expressText: `${expressDays} jours ouvrés (Express)`
    };
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
        <div className="max-w-6xl mx-auto">
          
          {/* Indicateur d'étapes */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-8">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    step <= currentStep 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step}
                  </div>
                  {step < 5 && (
                    <div className={`w-16 h-1 mx-2 transition-all ${
                      step < currentStep ? 'bg-primary' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {currentStep === 1 && "Choisissez votre type de site"}
                {currentStep === 2 && "Nombre de pages"}
                {currentStep === 3 && "Délai de livraison"}
                {currentStep === 4 && "Fonctionnalités additionnelles"}
                {currentStep === 5 && "Récapitulatif et commande"}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Configuration progressive */}
            <div className="lg:col-span-2">
              
              {/* Étape 1: Type de site */}
              {currentStep === 1 && (
                <Card className="animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-center text-2xl">Quel type de site voulez-vous ?</CardTitle>
                    <p className="text-center text-gray-600 dark:text-gray-300">
                      Sélectionnez l'option qui correspond le mieux à votre projet
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {baseOptions.map((option) => (
                        <div
                          key={option.id}
                          onClick={() => handleBaseSelection(option.id)}
                          className="relative p-6 rounded-lg border-2 cursor-pointer transition-all hover:border-primary hover:shadow-lg hover:scale-105 group"
                        >
                          {option.popular && (
                            <Badge className="absolute -top-2 left-4 bg-primary">
                              Populaire
                            </Badge>
                          )}
                          <h4 className="font-semibold mb-3 text-lg group-hover:text-primary transition-colors">
                            {option.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            {option.description}
                          </p>
                          <p className="text-xl font-bold text-primary">
                            À partir de {option.basePrice}€
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

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

            {/* Délai de livraison intelligent */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Livraison estimée
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Délai standard calculé automatiquement */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Livraison standard</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {getDeliveryInfo().estimatedText}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Inclus
                      </Badge>
                    </div>
                  </div>

                  {/* Option livraison express */}
                  <div className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    expressDelivery 
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setExpressDelivery(!expressDelivery)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          checked={expressDelivery}
                          onChange={() => setExpressDelivery(!expressDelivery)}
                        />
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                            <Zap className="w-4 h-4 text-orange-500" />
                            Livraison express
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {getDeliveryInfo().expressText}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        +{calculateEstimatedDelivery() > 14 ? '40%' : '30%'}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">
                    * Délai calculé automatiquement selon la complexité de votre projet
                  </p>
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
                  
                  {expressDelivery && (
                    <div className="flex justify-between">
                      <span>Livraison express</span>
                      <span className="font-medium text-orange-600">+{calculateEstimatedDelivery() > 14 ? '40%' : '30%'}</span>
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

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Commander ce projet
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Estimation basée sur vos sélections • Devis final après étude personnalisée
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Formulaire de Contact Intégré */}
        <ContactFormIntegrated 
          selectedBase={selectedBase}
          selectedFeatures={selectedFeatures}
          pages={pages[0]}
          timeline={expressDelivery ? getDeliveryInfo().express : getDeliveryInfo().estimated}
          totalPrice={calculateTotal()}
        />
      </div>
    </section>
  );
}