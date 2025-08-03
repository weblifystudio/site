import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Calculator, CheckCircle } from 'lucide-react';

const quoteSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().optional(),
  company: z.string().optional(),
  websiteType: z.string().min(1, 'Veuillez sélectionner un type de site'),
  pages: z.number().min(1, 'Au moins 1 page').max(50, 'Maximum 50 pages'),
  features: z.array(z.string()).default([]),
  timeline: z.string().min(1, 'Veuillez sélectionner un délai'),
  budget: z.string().optional(),
  additionalInfo: z.string().optional(),
  newsletter: z.boolean().default(false),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const websiteTypes = [
  { value: 'vitrine', label: 'Site Vitrine', basePrice: 690 },
  { value: 'premium', label: 'Site Premium', basePrice: 1290 },
  { value: 'ecommerce', label: 'E-commerce', basePrice: 2190 },
];

const availableFeatures = [
  { id: 'animations', name: 'Animations avancées', price: 170 },
  { id: 'custom-icons', name: 'Iconographie sur-mesure', price: 120 },
  { id: 'blog', name: 'Blog intégré', price: 210 },
  { id: 'multilingue', name: 'Site multilingue', price: 340 },
  { id: 'booking', name: 'Système de réservation', price: 420 },
  { id: 'seo-advanced', name: 'SEO Premium', price: 249 },
  { id: 'analytics', name: 'Analytics avancés', price: 120 },
  { id: 'newsletter-auto', name: 'Newsletter automatisée', price: 160 },
];

const timelines = [
  { value: '1-2-semaines', label: '1-2 semaines' },
  { value: '3-4-semaines', label: '3-4 semaines' },
  { value: '1-2-mois', label: '1-2 mois' },
  { value: 'plus-2-mois', label: 'Plus de 2 mois' },
];

export default function QuoteFormSimple() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      websiteType: '',
      pages: 5,
      features: [],
      timeline: '',
      budget: '',
      additionalInfo: '',
      newsletter: false,
    },
  });

  const watchedValues = form.watch();
  const selectedWebsiteType = websiteTypes.find(type => type.value === watchedValues.websiteType);
  const selectedFeatures = availableFeatures.filter(feature => 
    watchedValues.features.includes(feature.id)
  );

  // Calcul du prix estimé
  const calculateEstimatedPrice = () => {
    if (!selectedWebsiteType) return 0;
    
    const basePrice = selectedWebsiteType.basePrice;
    const featuresPrice = selectedFeatures.reduce((sum, feature) => sum + feature.price, 0);
    const pagesMultiplier = Math.max(1, Math.floor(watchedValues.pages / 5));
    
    return basePrice + featuresPrice + (pagesMultiplier - 1) * 150;
  };

  const estimatedPrice = calculateEstimatedPrice();

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    
    try {
      const quoteData = {
        ...data,
        totalPrice: estimatedPrice,
        selectedFeatures: selectedFeatures.map(f => f.name),
        websiteTypeLabel: selectedWebsiteType?.label,
      };

      const response = await fetch('/api/generate-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert('Erreur lors de l\'envoi de la demande. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Demande de devis envoyée !
              </h3>
              <p className="text-green-700 mb-4">
                Nous étudions votre projet et vous enverrons un devis personnalisé par email dans les 24h.
              </p>
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }}
                variant="outline"
              >
                Nouvelle demande
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">
          <Calculator className="inline-block mr-2 h-8 w-8" />
          Calculateur de Devis
        </h2>
        <p className="text-gray-600">
          Remplissez ce formulaire pour recevoir un devis personnalisé par email
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Formulaire */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations du projet</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Informations personnelles */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet *</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="votre@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone</FormLabel>
                          <FormControl>
                            <Input placeholder="06 12 34 56 78" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Entreprise</FormLabel>
                          <FormControl>
                            <Input placeholder="Nom de votre entreprise" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Type de site */}
                  <FormField
                    control={form.control}
                    name="websiteType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de site web *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez le type de site" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {websiteTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label} - À partir de {type.basePrice}€
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Nombre de pages */}
                  <FormField
                    control={form.control}
                    name="pages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de pages estimé: {field.value}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1" 
                            max="50"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Fonctionnalités */}
                  <FormField
                    control={form.control}
                    name="features"
                    render={() => (
                      <FormItem>
                        <FormLabel>Fonctionnalités additionnelles</FormLabel>
                        <div className="grid md:grid-cols-2 gap-3 mt-2">
                          {availableFeatures.map((feature) => (
                            <FormField
                              key={feature.id}
                              control={form.control}
                              name="features"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(feature.id)}
                                      onCheckedChange={(checked) => {
                                        const updatedFeatures = checked
                                          ? [...(field.value || []), feature.id]
                                          : (field.value || []).filter((value) => value !== feature.id);
                                        field.onChange(updatedFeatures);
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-normal">
                                      {feature.name}
                                    </FormLabel>
                                    <Badge variant="secondary" className="text-xs">
                                      +{feature.price}€
                                    </Badge>
                                  </div>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Délai */}
                  <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Délai souhaité *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un délai" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timelines.map((timeline) => (
                              <SelectItem key={timeline.value} value={timeline.value}>
                                {timeline.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Budget */}
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget prévu</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 2000€" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Informations supplémentaires */}
                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Informations supplémentaires</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Décrivez votre projet, vos besoins spécifiques..."
                            className="h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Newsletter */}
                  <FormField
                    control={form.control}
                    name="newsletter"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            S'abonner à notre newsletter
                          </FormLabel>
                          <p className="text-sm text-muted-foreground">
                            Recevez nos actualités et conseils web
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande de devis'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Récapitulatif */}
        <div className="md:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Estimation du projet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedWebsiteType && (
                  <div className="flex justify-between">
                    <span>{selectedWebsiteType.label}</span>
                    <span>{selectedWebsiteType.basePrice}€</span>
                  </div>
                )}

                {watchedValues.pages > 5 && (
                  <div className="flex justify-between text-sm">
                    <span>Pages supplémentaires</span>
                    <span>+{(Math.floor(watchedValues.pages / 5) - 1) * 150}€</span>
                  </div>
                )}

                {selectedFeatures.map((feature) => (
                  <div key={feature.id} className="flex justify-between text-sm">
                    <span>{feature.name}</span>
                    <span>+{feature.price}€</span>
                  </div>
                ))}

                {estimatedPrice > 0 && (
                  <>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Estimation totale</span>
                      <span>{estimatedPrice}€</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Prix indicatif. Le devis final sera personnalisé selon vos besoins.
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}