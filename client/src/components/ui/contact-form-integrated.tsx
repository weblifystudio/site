import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { Send, CheckCircle, Mail, User, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { Checkbox } from '@/components/ui/checkbox';

const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  newsletter: z.boolean().default(false),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormIntegratedProps {
  selectedBase: string;
  selectedFeatures: string[];
  pages: number;
  timeline: number;
  totalPrice: number;
}

export default function ContactFormIntegrated({
  selectedBase,
  selectedFeatures,
  pages,
  timeline,
  totalPrice
}: ContactFormIntegratedProps) {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: `Bonjour,

Je suis intéressé(e) par votre offre ${selectedBase === 'vitrine' ? 'Site Vitrine' : selectedBase === 'premium' ? 'Site Premium' : 'E-commerce'} pour un montant estimé de ${totalPrice.toLocaleString()}€.

Détails de ma configuration :
- Type : ${selectedBase === 'vitrine' ? 'Site Vitrine' : selectedBase === 'premium' ? 'Site Premium' : 'E-commerce'}
- Nombre de pages : ${pages}
- Délai souhaité : ${timeline} jours
${selectedFeatures.length > 0 ? `- Options sélectionnées : ${selectedFeatures.join(', ')}` : ''}

Merci de me contacter pour finaliser ce projet.

Cordialement,`,
      newsletter: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      setSubmitted(true);
      trackEvent('quote_request_submitted', 'project_calculator');
      toast({
        title: "Demande envoyée !",
        description: "Nous vous recontacterons dans les 24h.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate({
      ...data,
      budget: `${totalPrice}€`,
      projectTypes: [selectedBase],
    });
  };

  if (submitted) {
    return (
      <section id="contact-form" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Demande envoyée avec succès !</h3>
              <p className="text-muted-foreground mb-6">
                Nous avons bien reçu votre demande pour un projet <strong>{selectedBase}</strong> 
                d'un montant estimé de <strong>{totalPrice.toLocaleString()}€</strong>.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <p className="text-sm">
                  <strong>Prochaines étapes :</strong><br/>
                  1. Nous analysons votre demande (2h)<br/>
                  2. Vous recevez un devis détaillé (24h)<br/>
                  3. Planification du projet si acceptation
                </p>
              </div>
              <Button onClick={() => setSubmitted(false)} variant="outline">
                Faire une nouvelle demande
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Finaliser votre commande
            </h2>
            <p className="text-muted-foreground">
              Votre configuration est prête. Remplissez vos coordonnées pour recevoir votre devis détaillé.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Résumé du projet */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Type de projet</span>
                    <Badge variant="outline">
                      {selectedBase === 'vitrine' ? 'Site Vitrine' : 
                       selectedBase === 'premium' ? 'Site Premium' : 'E-commerce'}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Nombre de pages</span>
                    <span className="font-medium">{pages}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Délai</span>
                    <span className="font-medium">{timeline} jours</span>
                  </div>
                  
                  {selectedFeatures.length > 0 && (
                    <div>
                      <span className="font-medium mb-2 block">Options sélectionnées :</span>
                      <div className="space-y-1">
                        {selectedFeatures.map(feature => (
                          <div key={feature} className="text-sm text-muted-foreground">
                            • {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total estimé</span>
                      <span className="text-primary">{totalPrice.toLocaleString()}€</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Prix final ajusté après étude détaillée
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Vos coordonnées
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Nom complet *
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Votre nom et prénom" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                Téléphone
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="06 12 34 56 78" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              Email *
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="votre@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              Message personnalisé
                            </FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Décrivez votre projet..."
                                rows={8}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
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
                              <FormLabel className="text-sm">
                                Recevoir notre newsletter (optionnel)
                              </FormLabel>
                              <p className="text-xs text-muted-foreground">
                                Conseils web, actualités et offres spéciales
                              </p>
                            </div>
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Envoyer ma demande de devis
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        En envoyant ce formulaire, vous acceptez d'être recontacté par email 
                        concernant votre projet web. Aucune utilisation commerciale.
                      </p>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}