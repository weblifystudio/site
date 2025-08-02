import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, ArrowRight, ArrowLeft, Zap, ChevronRight, User, Mail, Phone, Building } from 'lucide-react';
import { QuoteGenerator } from '@/components/ui/quote-generator';

// Fonction pour formater le numéro de téléphone français automatiquement
const formatPhoneNumber = (value: string) => {
  // Enlever tous les caractères non-numériques sauf le +
  const cleaned = value.replace(/[^\d+]/g, '');
  
  // Si commence par +33, remplacer par 0
  let formatted = cleaned.replace(/^\+33/, '0');
  
  // Prendre seulement les 10 premiers chiffres
  formatted = formatted.substring(0, 10);
  
  // Formatage automatique dès le 3ème chiffre : XX XX XX XX XX
  if (formatted.length >= 3) {
    const parts = [];
    for (let i = 0; i < formatted.length; i += 2) {
      if (i === 0) {
        parts.push(formatted.substring(i, i + 2)); // 2 premiers chiffres
      } else {
        parts.push(formatted.substring(i, i + 2)); // Groupes de 2
      }
    }
    formatted = parts.filter(part => part.length > 0).join(' ');
  }
  
  return formatted;
};

// Fonctions de validation
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string) => {
  if (!phone) return true; // Optionnel
  const phoneRegex = /^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/;
  const cleanPhone = phone.replace(/\s/g, '');
  return phoneRegex.test(cleanPhone);
};

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
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: ''
  });
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
    setCurrentStep(step);
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
    selectedFeatures.forEach(featureId => {
      const feature = additionalFeatures.find(f => f.id === featureId);
      if (feature) {
        switch (feature.category) {
          case 'fonctionnalite': baseDays += 2; break;
          case 'design': baseDays += 1; break;
          case 'seo': baseDays += 1; break;
        }
      }
    });
    
    return baseDays;
  };

  const getDeliveryInfo = () => {
    const estimatedDays = calculateEstimatedDelivery();
    
    return {
      estimated: estimatedDays,
      estimatedText: `${estimatedDays} jour${estimatedDays > 1 ? 's' : ''}`,
      express: Math.max(3, Math.ceil(estimatedDays * 0.6)),
      expressText: `${Math.max(3, Math.ceil(estimatedDays * 0.6))} jour${Math.max(3, Math.ceil(estimatedDays * 0.6)) > 1 ? 's' : ''}`
    };
  };

  const calculateTotal = () => {
    if (!baseOption) return 0;
    
    let total = baseOption.basePrice;
    
    // Pages supplémentaires
    if (pages[0] > 8) {
      total += (pages[0] - 8) * 65;
    }
    
    // Fonctionnalités additionnelles
    selectedFeatures.forEach(featureId => {
      const feature = additionalFeatures.find(f => f.id === featureId);
      if (feature && feature.category !== 'maintenance') {
        total += feature.price;
      }
    });
    
    // Livraison express (majorant le prix)
    if (expressDelivery) {
      const multiplier = calculateEstimatedDelivery() > 14 ? 1.4 : 1.3;
      total = Math.round(total * multiplier);
    }
    
    return total;
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
    "Vos coordonnées",
    "Type de site + Pages", 
    "Délai et fonctionnalités",
    "Récapitulatif"
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 max-w-7xl">
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
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-colors duration-300 cursor-pointer ${
                        isCurrent
                          ? 'bg-primary text-white shadow-lg' 
                          : isCompleted
                          ? 'bg-green-500 text-white shadow-lg hover:bg-green-600'
                          : 'bg-primary/30 text-primary hover:bg-primary/50'
                      }`}
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

          {/* Container principal centré */}
          <div className="max-w-4xl mx-auto px-4">
            {/* Configuration progressive */}
            <div className="w-full">
              
              {/* Étape 1: Coordonnées */}
              {currentStep === 1 && (
                <Card className="animate-fade-in shadow-lg w-full">
                  <CardHeader className="pb-6">
                    <p className="text-center text-gray-600 dark:text-gray-300 text-xl">
                      Pour commencer, nous avons besoin de quelques informations
                    </p>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Prénom *
                        </Label>
                        <Input
                          id="firstName"
                          value={contactInfo.firstName}
                          onChange={(e) => setContactInfo({...contactInfo, firstName: e.target.value})}
                          placeholder="Votre prénom"
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Nom *
                        </Label>
                        <Input
                          id="lastName"
                          value={contactInfo.lastName}
                          onChange={(e) => setContactInfo({...contactInfo, lastName: e.target.value})}
                          placeholder="Votre nom"
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                          placeholder="votre.email@exemple.com"
                          className={`h-12 ${contactInfo.email && !isValidEmail(contactInfo.email) ? 'border-red-500' : ''}`}
                        />
                        {contactInfo.email && !isValidEmail(contactInfo.email) && (
                          <p className="text-sm text-red-500">Adresse email invalide</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Téléphone *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={contactInfo.phone}
                          onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            setContactInfo({...contactInfo, phone: formatted});
                          }}
                          placeholder="06 12 34 56 78"
                          className={`h-12 ${contactInfo.phone && !isValidPhone(contactInfo.phone) ? 'border-red-500' : ''}`}
                          maxLength={14}
                        />
                        {contactInfo.phone && !isValidPhone(contactInfo.phone) && (
                          <p className="text-sm text-red-500">Numéro de téléphone français invalide</p>
                        )}
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="company" className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          Entreprise (optionnel)
                        </Label>
                        <Input
                          id="company"
                          value={contactInfo.company}
                          onChange={(e) => setContactInfo({...contactInfo, company: e.target.value})}
                          placeholder="Nom de votre entreprise"
                          className="h-12"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end pt-6">
                      <Button 
                        onClick={goToNextStep}
                        disabled={
                          !contactInfo.firstName || 
                          !contactInfo.lastName || 
                          !contactInfo.email || 
                          !isValidEmail(contactInfo.email) ||
                          !contactInfo.phone ||
                          !isValidPhone(contactInfo.phone)
                        }
                        size="lg"
                      >
                        Continuer
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Étape 2: Type de site + Pages */}
              {currentStep === 2 && (
                <Card className="animate-fade-in shadow-lg w-full">
                  <CardHeader className="pb-6">
                    <p className="text-center text-gray-600 dark:text-gray-300 text-xl">
                      Sélectionnez l'option qui correspond le mieux à votre projet
                    </p>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    {/* Type de site */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-center">1. Choisissez votre type de site</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        {baseOptions.map((option) => (
                          <div
                            key={option.id}
                            onClick={() => setSelectedBase(option.id)}
                            className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all hover:border-primary hover:shadow-xl group min-h-[160px] flex flex-col justify-between ${
                              selectedBase === option.id ? 'border-primary bg-primary/5' : 'border-gray-200'
                            }`}
                          >
                            {option.popular && (
                              <Badge className="absolute -top-2 left-4 bg-primary text-white px-3 py-1">
                                Populaire
                              </Badge>
                            )}
                            <div className="flex-grow">
                              <h4 className="font-bold mb-3 text-xl group-hover:text-primary transition-colors">
                                {option.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                {option.description}
                              </p>
                            </div>
                            <div>
                              <p className="text-xl font-bold text-primary">
                                À partir de {option.basePrice}€
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Nombre de pages */}
                    {selectedBase && (
                      <div className="animate-fade-in">
                        <h3 className="text-lg font-semibold mb-4 text-center">2. Combien de pages voulez-vous ?</h3>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                          <div className="text-center mb-6">
                            <div className="text-4xl font-bold text-primary mb-2">
                              {pages[0]} page{pages[0] > 1 ? 's' : ''}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                              8 pages incluses dans votre {baseOptions.find(opt => opt.id === selectedBase)?.name}
                            </p>
                            {pages[0] > 8 && (
                              <Badge variant="outline" className="text-orange-600 border-orange-600 mt-2">
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
                            className="w-full mb-4"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>5 pages</span>
                            <span>20 pages</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={goToPreviousStep}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour
                      </Button>
                      {selectedBase && (
                        <Button onClick={goToNextStep} size="lg">
                          Continuer
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Étape 3: Délai et fonctionnalités */}
              {currentStep === 3 && baseOption && (
                <Card className="animate-fade-in w-full">
                  <CardHeader>
                    <p className="text-center text-gray-600 dark:text-gray-300 text-xl">
                      Délai de livraison et options supplémentaires
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Délai de livraison */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-center">1. Délai de livraison</h3>
                      <div className="space-y-4">
                        {/* Délai standard */}
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

                        {/* Option express */}
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
                                onCheckedChange={(checked) => setExpressDelivery(checked === true)}
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
                      </div>
                    </div>

                    {/* Fonctionnalités additionnelles */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-center">2. Fonctionnalités additionnelles (optionnel)</h3>
                      <div className="space-y-6">
                        {Object.entries(groupedFeatures).map(([category, features]) => (
                          <div key={category}>
                            <h4 className="font-medium mb-3 text-gray-800 dark:text-gray-200">
                              {categoryLabels[category as keyof typeof categoryLabels]}
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3">
                              {features.map((feature) => (
                                <div
                                  key={feature.id}
                                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border"
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
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={goToPreviousStep}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour
                      </Button>
                      <Button 
                        onClick={() => {
                          setCurrentStep(4);
                          setTimeout(() => {
                            document.getElementById('configuration-summary')?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
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

              {/* Étape 4: Récapitulatif */}
              {currentStep === 4 && baseOption && (
                <Card className="animate-fade-in w-full" id="configuration-summary">
                  <CardHeader>
                    <h3 className="text-2xl font-bold text-center">Récapitulatif de votre projet</h3>
                    <p className="text-center text-gray-600 dark:text-gray-300">
                      Vérifiez votre configuration avant envoi
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Informations de contact */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Vos informations</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div><strong>Nom :</strong> {contactInfo.firstName} {contactInfo.lastName}</div>
                        <div><strong>Email :</strong> {contactInfo.email}</div>
                        <div><strong>Téléphone :</strong> {contactInfo.phone}</div>
                        {contactInfo.company && <div><strong>Entreprise :</strong> {contactInfo.company}</div>}
                      </div>
                    </div>

                    {/* Configuration du projet */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-3">Configuration de votre site</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span><strong>Type de site :</strong> {baseOption.name}</span>
                          <span className="font-bold text-primary">{baseOption.basePrice}€</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span><strong>Nombre de pages :</strong> {pages[0]} pages</span>
                          {pages[0] > 8 && (
                            <span className="font-bold text-orange-600">+{(pages[0] - 8) * 65}€</span>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <span><strong>Délai :</strong> {expressDelivery ? getDeliveryInfo().expressText : getDeliveryInfo().estimatedText}</span>
                          {expressDelivery && (
                            <span className="font-bold text-orange-600">+{calculateEstimatedDelivery() > 14 ? '40%' : '30%'}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Fonctionnalités sélectionnées */}
                    {selectedFeatures.length > 0 && (
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-3">Fonctionnalités additionnelles</h4>
                        <div className="space-y-2">
                          {selectedFeatures.map(featureId => {
                            const feature = additionalFeatures.find(f => f.id === featureId);
                            return feature ? (
                              <div key={feature.id} className="flex justify-between items-center text-sm">
                                <span>{feature.name}</span>
                                <span className="font-bold text-primary">
                                  +{feature.price}€{feature.category === 'maintenance' ? '/mois' : ''}
                                </span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    {/* Total */}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          Total : {calculateTotal()}€
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          Délai estimé : {expressDelivery ? getDeliveryInfo().expressText : getDeliveryInfo().estimatedText}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 pt-6">
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={goToPreviousStep}>
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Modifier ma configuration
                        </Button>
                      </div>
                      
                      <div className="text-center">
                        <QuoteGenerator
                          calculatorData={{
                            name: `${contactInfo.firstName} ${contactInfo.lastName}`,
                            email: contactInfo.email,
                            phone: contactInfo.phone,
                            company: contactInfo.company,
                            websiteType: baseOption.id,
                            pages: pages[0],
                            features: selectedFeatures.map(id => 
                              additionalFeatures.find(f => f.id === id)?.name || ''
                            ).filter(Boolean),
                            timeline: expressDelivery ? getDeliveryInfo().expressText : getDeliveryInfo().estimatedText,
                            budget: `${calculateTotal()}€`
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}