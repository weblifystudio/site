import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  MessageSquare,
  CheckCircle,
  Palette,
  ShoppingCart,
  Rocket,
  Wrench
} from 'lucide-react';

// Schémas de validation pour chaque étape
const step1Schema = z.object({
  projectType: z.string().min(1, 'Veuillez sélectionner un type de projet'),
  budget: z.string().min(1, 'Veuillez indiquer votre budget'),
});

const step2Schema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().optional(),
  company: z.string().optional(),
});

const step3Schema = z.object({
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  features: z.array(z.string()).optional(),
  timeline: z.string().min(1, 'Veuillez sélectionner un délai'),
  newsletter: z.boolean().default(false),
});

const projectTypes = [
  {
    id: 'vitrine',
    name: 'Site Vitrine',
    description: 'Présentation de votre activité (5-8 pages)',
    icon: Palette,
    basePrice: '800€',
    popular: true
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Boutique en ligne avec paiement sécurisé',
    icon: ShoppingCart,
    basePrice: '2500€',
    popular: false
  },
  {
    id: 'premium',
    name: 'Site Premium',
    description: 'Site avancé avec fonctionnalités sur-mesure',
    icon: Rocket,
    basePrice: '1500€',
    popular: false
  },
  {
    id: 'refonte',
    name: 'Refonte',
    description: 'Modernisation de votre site existant',
    icon: Wrench,
    basePrice: 'Sur devis',
    popular: false
  }
];

const budgets = [
  { value: '800-1500', label: '800€ - 1 500€' },
  { value: '1500-3000', label: '1 500€ - 3 000€' },
  { value: '3000-5000', label: '3 000€ - 5 000€' },
  { value: '5000+', label: 'Plus de 5 000€' },
  { value: 'non-defini', label: 'Budget non défini' }
];

const timelines = [
  { value: 'urgent', label: 'Urgent (1-2 semaines)' },
  { value: 'normal', label: 'Normal (2-4 semaines)' },
  { value: 'flexible', label: 'Flexible (1-2 mois)' },
  { value: 'planifie', label: 'Planifié (3+ mois)' }
];

const features = [
  { id: 'blog', name: 'Blog intégré', description: 'Système de publication d\'articles' },
  { id: 'multilingue', name: 'Site multilingue', description: 'Version en plusieurs langues' },
  { id: 'booking', name: 'Système de réservation', description: 'Prise de rendez-vous en ligne' },
  { id: 'animations', name: 'Animations avancées', description: 'Effets visuels et micro-interactions' },
  { id: 'seo', name: 'SEO Premium', description: 'Optimisation référencement poussée' },
  { id: 'analytics', name: 'Tableau de bord', description: 'Statistiques et analytics détaillés' }
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const form1 = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: formData
  });

  const form2 = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: formData
  });

  const form3 = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: formData
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = async () => {
    let isValid = false;
    let stepData = {};

    if (currentStep === 1) {
      isValid = await form1.trigger();
      if (isValid) {
        stepData = form1.getValues();
      }
    } else if (currentStep === 2) {
      isValid = await form2.trigger();
      if (isValid) {
        stepData = form2.getValues();
      }
    }

    if (isValid) {
      setFormData(prev => ({ ...prev, ...stepData }));
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const submitForm = async (data: any) => {
    const finalData = { ...formData, ...data };
    console.log('Données du formulaire:', finalData);
    
    // Ici vous pourriez envoyer les données à votre API
    // await apiRequest('/api/contact', { method: 'POST', data: finalData });
    
    // Simuler un envoi réussi
    alert('Merci ! Votre demande a été envoyée. Nous vous recontacterons sous 24h.');
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return Briefcase;
      case 2: return User;
      case 3: return MessageSquare;
      default: return CheckCircle;
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Votre Projet';
      case 2: return 'Vos Informations';
      case 3: return 'Détails & Envoi';
      default: return 'Terminé';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Demande de devis personnalisé</h2>
          <Badge variant="outline">
            Étape {currentStep} sur {totalSteps}
          </Badge>
        </div>
        
        <Progress value={progress} className="h-2 mb-4" />
        
        {/* Step Indicators */}
        <div className="flex justify-between">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
            const Icon = getStepIcon(step);
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            
            return (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isCompleted 
                    ? 'bg-primary border-primary text-white' 
                    : isCurrent 
                    ? 'border-primary text-primary' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <p className={`text-sm mt-2 font-medium ${
                  isCurrent ? 'text-primary' : isCompleted ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500'
                }`}>
                  {getStepTitle(step)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <Card>
        <CardContent className="p-8">
          {/* Étape 1: Type de projet */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Quel type de projet souhaitez-vous réaliser ?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {projectTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => form1.setValue('projectType', type.id)}
                      className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all ${
                        form1.watch('projectType') === type.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {type.popular && (
                        <Badge className="absolute -top-2 left-4 bg-primary">
                          Populaire
                        </Badge>
                      )}
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <type.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{type.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            {type.description}
                          </p>
                          <p className="text-lg font-bold text-primary">
                            À partir de {type.basePrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {form1.formState.errors.projectType && (
                  <p className="text-red-500 text-sm mt-2">{form1.formState.errors.projectType.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="budget" className="text-lg font-medium mb-4 block">
                  Quel est votre budget prévisionnel ?
                </Label>
                <Select onValueChange={(value) => form1.setValue('budget', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre budget" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgets.map((budget) => (
                      <SelectItem key={budget.value} value={budget.value}>
                        {budget.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form1.formState.errors.budget && (
                  <p className="text-red-500 text-sm mt-2">{form1.formState.errors.budget.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Étape 2: Informations personnelles */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Parlez-nous de vous</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input
                    id="name"
                    {...form2.register('name')}
                    placeholder="Jean Dupont"
                  />
                  {form2.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">{form2.formState.errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form2.register('email')}
                    placeholder="jean@exemple.fr"
                  />
                  {form2.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{form2.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    {...form2.register('phone')}
                    placeholder="06 12 34 56 78"
                  />
                </div>

                <div>
                  <Label htmlFor="company">Entreprise</Label>
                  <Input
                    id="company"
                    {...form2.register('company')}
                    placeholder="Nom de votre entreprise"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Étape 3: Détails et envoi */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Finalisons votre demande</h3>
              
              <div>
                <Label htmlFor="message">Décrivez votre projet *</Label>
                <Textarea
                  id="message"
                  {...form3.register('message')}
                  placeholder="Décrivez vos besoins, vos objectifs, votre secteur d'activité..."
                  rows={5}
                />
                {form3.formState.errors.message && (
                  <p className="text-red-500 text-sm mt-1">{form3.formState.errors.message.message}</p>
                )}
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">
                  Fonctionnalités souhaitées (optionnel)
                </Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {features.map((feature) => (
                    <div key={feature.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={feature.id}
                        onCheckedChange={(checked) => {
                          const currentFeatures = form3.getValues('features') || [];
                          if (checked) {
                            form3.setValue('features', [...currentFeatures, feature.id]);
                          } else {
                            form3.setValue('features', currentFeatures.filter(f => f !== feature.id));
                          }
                        }}
                      />
                      <div>
                        <label htmlFor={feature.id} className="text-sm font-medium cursor-pointer">
                          {feature.name}
                        </label>
                        <p className="text-xs text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="timeline">Délai souhaité *</Label>
                <Select onValueChange={(value) => form3.setValue('timeline', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Quand souhaitez-vous lancer votre site ?" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelines.map((timeline) => (
                      <SelectItem key={timeline.value} value={timeline.value}>
                        {timeline.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form3.formState.errors.timeline && (
                  <p className="text-red-500 text-sm mt-1">{form3.formState.errors.timeline.message}</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  {...form3.register('newsletter')}
                />
                <label htmlFor="newsletter" className="text-sm">
                  Je souhaite recevoir des conseils et actualités par email
                </label>
              </div>
            </div>
          )}
        </CardContent>

        {/* Navigation */}
        <div className="flex justify-between items-center p-6 border-t">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Précédent</span>
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={nextStep} className="flex items-center space-x-2">
              <span>Suivant</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={form3.handleSubmit(submitForm)} className="flex items-center space-x-2">
              <span>Envoyer ma demande</span>
              <CheckCircle className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}