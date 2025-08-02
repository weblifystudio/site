import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Send, CheckCircle, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { trackEvent } from '@/lib/analytics';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Breadcrumbs from '@/components/ui/breadcrumbs';

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide. Veuillez réessayer.'),
  phone: z.string().optional().refine((val) => {
    if (!val) return true; // Optional field
    // Regex qui accepte tous les numéros français y compris DOM-TOM (05)
    const phoneRegex = /^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/;
    const cleanPhone = val.replace(/\s/g, '');
    return phoneRegex.test(cleanPhone);
  }, 'Numéro de téléphone français invalide (ex: 06 12 34 56 78, 05 94 12 34 56)'),
  budget: z.string().optional(),
  projectTypes: z.array(z.string()).optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  privacy: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter l\'utilisation de vos données pour continuer'
  }),
  newsletter: z.boolean().default(false),
});

type ContactFormData = z.infer<typeof contactSchema>;

const budgetOptions = [
  { value: '800-1500', label: '800€ - 1 500€' },
  { value: '1500-3000', label: '1 500€ - 3 000€' },
  { value: '3000-5000', label: '3 000€ - 5 000€' },
  { value: '5000+', label: 'Plus de 5 000€' },
];

const projectTypeOptions = [
  { value: 'vitrine', label: 'Site vitrine' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'refonte', label: 'Refonte' },
  { value: 'maintenance', label: 'Maintenance' },
];

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

export default function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      budget: '',
      projectTypes: [],
      message: '',
      privacy: false,
      newsletter: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      // Track successful submission
      trackEvent('form_success', 'contact', 'contact_form_success');
      toast({
        title: 'Message envoyé !',
        description: 'Nous vous recontacterons dans les plus brefs délais.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'envoi du message.',
        variant: 'destructive',
      });
    },
  });

  const watchedFields = form.watch();
  const requiredFields = ['name', 'email', 'message'];
  const filledRequiredFields = requiredFields.filter(field => {
    const value = watchedFields[field as keyof ContactFormData];
    return value && value.toString().trim() !== '';
  });
  const progressPercentage = Math.round((filledRequiredFields.length / requiredFields.length) * 100);

  const onSubmit = (data: ContactFormData) => {
    // Track form submission event
    trackEvent('form_submit', 'contact', 'contact_form');
    mutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">Message envoyé avec succès !</h1>
              <p className="text-muted-foreground mb-8">
                Merci pour votre message. Nous vous recontacterons dans les 24 heures pour discuter de votre projet.
              </p>
              <Button onClick={() => {
                setIsSubmitted(false);
                form.reset();
              }}>
                Envoyer un nouveau message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs />
        </div>

        {/* Header - Centrage optimal */}
        <div className="text-center mb-16 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Concrétisons votre projet ensemble
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Réponse sous 24h garantie. Devis gratuit et conseils personnalisés 
            pour transformer votre vision en succès digital.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Informations de Contact</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Localisation</h3>
                    <p className="text-muted-foreground">Paris, France</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Interventions dans toute la France
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground break-words">contact@weblifystudio.fr</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Réponse sous 24h garantie
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Contact</h3>
                    <p className="text-muted-foreground">Privilégier l'email</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Échange par téléphone sur demande
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Délais</h3>
                    <p className="text-muted-foreground">7 jours en moyenne</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Livraison rapide garantie
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-primary/10 to-blue-50 dark:from-primary/20 dark:to-blue-900/20 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">Devis gratuit en 24h</h3>
                <p className="text-sm text-muted-foreground">
                  Recevez une estimation personnalisée de votre projet sans engagement.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-2xl">
              <CardContent className="p-8 lg:p-12">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Progression</span>
                        <span className="text-sm font-medium text-primary">{progressPercentage}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet *</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre nom complet" {...field} />
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

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input 
                                type="tel" 
                                placeholder="06 12 34 56 78" 
                                {...field}
                                onChange={(e) => {
                                  const formatted = formatPhoneNumber(e.target.value);
                                  field.onChange(formatted);
                                }}
                                maxLength={14}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget estimé</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez votre budget" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {budgetOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="projectTypes"
                      render={() => (
                        <FormItem>
                          <FormLabel>Type de projet</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {projectTypeOptions.map((item) => (
                              <FormField
                                key={item.value}
                                control={form.control}
                                name="projectTypes"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.value}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item.value)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...(field.value || []), item.value])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item.value
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Décrivez votre projet *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Parlez-nous de votre projet, vos objectifs, votre audience cible..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-3">
                      <FormField
                        control={form.control}
                        name="privacy"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                id="privacy"
                                required
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel htmlFor="privacy" className="text-sm font-normal text-muted-foreground cursor-pointer">
                                J'accepte que mes données soient utilisées pour me recontacter concernant ma demande *
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />

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
                              <FormLabel className="text-sm font-normal text-muted-foreground cursor-pointer">
                                Je souhaite recevoir la newsletter Weblify Studio avec les dernières actualités et conseils web
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        'Envoi en cours...'
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Envoyer ma demande
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
