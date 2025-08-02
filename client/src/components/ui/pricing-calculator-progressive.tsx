import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Calculator, ArrowRight, ArrowLeft, Zap, ChevronRight } from 'lucide-react';
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

export default function PricingCalculatorProgressive() {
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
  const goToStep = (step: number) => {
    // Toutes les étapes sont toujours accessibles
    setCurrentStep(step);
  };

  // Déterminer la dernière étape complétée
  const getMaxCompletedStep = () => {
    if (!selectedBase) return 1;
    if (selectedBase && !pages) return 2;
    if (selectedBase && pages) return 4; // Toutes les étapes accessibles une fois qu'on a une base
    return 1;
  };

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

  const stepTitles = [
    "Choisissez votre type de site",
    "Nombre de pages", 
    "Délai de livraison",
    "Fonctionnalités additionnelles"
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Indicateur d'étapes simplifié */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-3 md:space-x-8 overflow-x-auto px-4">
              {[1, 2, 3, 4].map((step, index) => {
                const isCompleted = step < currentStep;
                const isCurrent = step === currentStep;
                
                return (
                  <div key={step} className="flex items-center flex-shrink-0">
                    <div 
                      onClick={() => goToStep(step)}
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-colors duration-300 ${
                        isCurrent
                          ? 'bg-primary text-white shadow-lg' 
                          : isCompleted
                          ? 'bg-green-500 text-white shadow-lg cursor-pointer hover:bg-green-600'
                          : 'bg-primary/30 text-primary cursor-pointer hover:bg-primary/50'
                      }`}
                      title={
                        isCompleted ? `Étape ${step} complétée - Cliquer pour modifier` :
                        isCurrent ? `Étape ${step} en cours` :
                        `Aller à l'étape ${step}`
                      }
                    >
                      {isCompleted ? '✓' : step}
                    </div>
                    {index < 3 && (
                      <div className={`w-8 md:w-16 h-1 mx-2 md:mx-4 transition-all ${
                        step < currentStep ? 'bg-green-500' : step === currentStep ? 'bg-primary' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">
                {currentStep <= 4 ? stepTitles[currentStep - 1] : "Configuration terminée"}
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Configuration progressive */}
            <div className="lg:col-span-2">
              
              {/* Étape 1: Type de site */}
              {currentStep === 1 && (
                <Card className="animate-fade-in shadow-lg">
                  <CardHeader className="pb-6">
                    <p className="text-center text-gray-600 dark:text-gray-300 text-xl">
                      Sélectionnez l'option qui correspond le mieux à votre projet
                    </p>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-8">
                      {baseOptions.map((option) => (
                        <div
                          key={option.id}
                          onClick={() => handleBaseSelection(option.id)}
                          className="relative p-8 rounded-xl border-2 cursor-pointer transition-all hover:border-primary hover:shadow-xl hover:scale-105 group min-h-[200px] flex flex-col justify-between"
                        >
                          {option.popular && (
                            <Badge className="absolute -top-3 left-6 bg-primary text-white px-4 py-1">
                              Populaire
                            </Badge>
                          )}
                          <div className="flex-grow">
                            <h4 className="font-bold mb-4 text-2xl group-hover:text-primary transition-colors">
                              {option.name}
                            </h4>
                            <p className="text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                              {option.description}
                            </p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-primary mb-4">
                              À partir de {option.basePrice}€
                            </p>
                            <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-primary font-medium mr-2">Sélectionner</span>
                              <ChevronRight className="w-5 h-5 text-primary" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Étape 2: Nombre de pages */}
              {currentStep === 2 && baseOption && (
                <Card className="animate-fade-in">
                  <CardHeader>
                    <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
                      Votre {baseOption.name} inclut déjà 8 pages de base
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {pages[0]} page{pages[0] > 1 ? 's' : ''}
                      </div>
                      {pages[0] > 8 && (
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          +{(pages[0] - 8) * 65}€ pour {pages[0] - 8} page{pages[0] - 8 > 1 ? 's' : ''} supplémentaire{pages[0] - 8 > 1 ? 's' : ''}
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
                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={goToPreviousStep}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour
                      </Button>
                      <Button onClick={goToNextStep}>
                        Continuer
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Étape 3: Délai de livraison */}
              {currentStep === 3 && baseOption && (
                <Card className="animate-fade-in">
                  <CardHeader>
                    <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
                      Délai calculé automatiquement selon la complexité de votre projet
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Délai standard calculé automatiquement */}
                    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-lg">Livraison standard</h4>
                          <p className="text-gray-600 dark:text-gray-300">
                            {getDeliveryInfo().estimatedText}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Inclus
                        </Badge>
                      </div>
                    </div>

                    {/* Option livraison express */}
                    <div className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      expressDelivery 
                        ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setExpressDelivery(!expressDelivery)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Checkbox 
                            checked={expressDelivery}
                            onCheckedChange={(checked) => setExpressDelivery(checked === true)}
                          />
                          <div>
                            <h4 className="font-medium text-lg flex items-center gap-2">
                              <Zap className="w-5 h-5 text-orange-500" />
                              Livraison express
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300">
                              {getDeliveryInfo().expressText}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          +{calculateEstimatedDelivery() > 14 ? '40%' : '30%'}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 text-center">
                      * Délai calculé selon le nombre de pages et fonctionnalités sélectionnées
                    </p>

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={goToPreviousStep}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour
                      </Button>
                      <Button onClick={goToNextStep}>
                        Continuer
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Étape 4: Fonctionnalités additionnelles */}
              {currentStep === 4 && baseOption && (
                <Card className="animate-fade-in">
                  <CardHeader>
                    <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
                      Personnalisez votre {baseOption.name} avec des options supplémentaires
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-6">
                      {Object.entries(groupedFeatures).map(([category, features]) => (
                        <div key={category}>
                          <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200 text-lg">
                            {categoryLabels[category as keyof typeof categoryLabels]}
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {features.map((feature) => (
                              <div
                                key={feature.id}
                                className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border"
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

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={goToPreviousStep}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour
                      </Button>
                      <Button 
                        onClick={() => document.getElementById('configuration-summary')?.scrollIntoView({ behavior: 'smooth' })}
                        size="lg"
                      >
                        <Calculator className="w-4 h-4 mr-2" />
                        Voir mon récapitulatif
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}


            </div>

            {/* Panneau de prix collant */}
            {selectedBase && (
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
                        <span>Base ({baseOption?.name})</span>
                        <span className="font-medium">{baseOption?.basePrice}€</span>
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
                        const feature = additionalFeatures.find(f => f.id === featureId);
                        if (!feature) return null;
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

                    <div className="text-center">
                      <p className="text-xs text-gray-500">
                        Estimation basée sur vos sélections • Devis final après étude personnalisée
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          
          {/* Récapitulatif de Configuration */}
          {selectedBase && currentStep >= 4 && (
            <div id="configuration-summary" className="mt-16">
              <Card className="shadow-xl border-2 border-primary/20">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-blue-50 dark:from-primary/10 dark:to-gray-800">
                  <CardTitle className="text-center text-2xl text-primary">
                    Récapitulatif de votre configuration
                  </CardTitle>
                  <p className="text-center text-gray-600 dark:text-gray-300">
                    Voici le détail de votre projet personnalisé
                  </p>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Configuration détaillée */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-bold mb-2 text-primary">Type de site sélectionné</h4>
                        <p className="text-lg font-semibold">{baseOption?.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {baseOption?.description}
                        </p>
                        <p className="text-lg font-bold text-primary mt-2">
                          Base : {baseOption?.basePrice}€
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-bold mb-2 text-primary">Structure du site</h4>
                        <p className="text-lg font-semibold">{pages[0]} pages au total</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          8 pages incluses + {pages[0] > 8 ? pages[0] - 8 : 0} page{pages[0] > 8 && pages[0] - 8 > 1 ? 's' : ''} supplémentaire{pages[0] > 8 && pages[0] - 8 > 1 ? 's' : ''}
                        </p>
                        {pages[0] > 8 && (
                          <p className="text-lg font-bold text-primary mt-2">
                            +{(pages[0] - 8) * 65}€ pour les pages supplémentaires
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-bold mb-2 text-primary">Délai de livraison</h4>
                        <p className="text-lg font-semibold">
                          {expressDelivery ? getDeliveryInfo().expressText : getDeliveryInfo().estimatedText}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {expressDelivery ? "Livraison express sélectionnée" : "Délai standard calculé selon la complexité"}
                        </p>
                        {expressDelivery && (
                          <p className="text-lg font-bold text-orange-600 mt-2">
                            +{calculateEstimatedDelivery() > 14 ? '40%' : '30%'} du prix total
                          </p>
                        )}
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-bold mb-2 text-primary">Fonctionnalités additionnelles</h4>
                        {selectedFeatures.length > 0 ? (
                          <div className="space-y-2">
                            {selectedFeatures.map(featureId => {
                              const feature = additionalFeatures.find(f => f.id === featureId);
                              if (!feature) return null;
                              return (
                                <div key={featureId} className="flex justify-between items-center">
                                  <span className="text-sm font-medium">{feature.name}</span>
                                  <span className="font-bold text-primary">
                                    +{feature.price}€{feature.category === 'maintenance' ? '/mois' : ''}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-gray-600 dark:text-gray-300 italic">
                            Aucune fonctionnalité supplémentaire sélectionnée
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Prix total récapitulatif */}
                  <div className="border-t pt-6">
                    <div className="bg-gradient-to-r from-primary/10 to-blue-50 dark:from-primary/10 dark:to-gray-800 p-6 rounded-xl">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold">Total de votre projet</h3>
                        <div className="text-4xl font-bold text-primary">
                          {calculateTotal().toLocaleString()}€
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-center">
                        Prix estimé tout compris • Devis final après étude personnalisée
                      </p>
                    </div>
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Modifier ma configuration
                    </Button>
                    <Button 
                      onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                      size="lg"
                      className="flex-1"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Commander ce projet
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Formulaire de Contact Intégré */}
              <div className="mt-12">
                <ContactFormIntegrated 
                  selectedBase={selectedBase}
                  selectedFeatures={selectedFeatures}
                  pages={pages[0]}
                  timeline={expressDelivery ? getDeliveryInfo().express : getDeliveryInfo().estimated}
                  totalPrice={calculateTotal()}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}