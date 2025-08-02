import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Checkbox } from './checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Mail, User, Users, AlertCircle } from 'lucide-react';

// Schema de validation pour la newsletter
const newsletterSchema = z.object({
  email: z.string().email('Email invalide').min(1, 'Email requis'),
  firstName: z.string().min(2, 'Prénom requis (min 2 caractères)').max(50),
  lastName: z.string().min(2, 'Nom requis (min 2 caractères)').max(50),
  interests: z.array(z.string()).optional().default([]),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter les conditions d\'utilisation'
  }),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const interestOptions = [
  { id: 'web-design', label: 'Design Web & UX/UI' },
  { id: 'development', label: 'Développement Web' },
  { id: 'seo', label: 'SEO & Référencement' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'mobile', label: 'Applications Mobiles' },
  { id: 'trends', label: 'Tendances & Actualités' },
];

interface NewsletterFormProps {
  variant?: 'default' | 'compact' | 'footer';
  title?: string;
  description?: string;
  className?: string;
}

export function NewsletterForm({ 
  variant = 'default', 
  title,
  description,
  className = '' 
}: NewsletterFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      interests: [],
      acceptTerms: false,
    }
  });

  const watchedInterests = watch('interests') || [];

  const newsletterMutation = useMutation({
    mutationFn: async (data: NewsletterFormData) => {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          interests: data.interests,
          source: 'website',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'inscription');
      }

      return response.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
    },
  });

  const onSubmit = (data: NewsletterFormData) => {
    newsletterMutation.mutate(data);
  };

  const handleInterestChange = (interestId: string, checked: boolean) => {
    const currentInterests = watchedInterests;
    if (checked) {
      setValue('interests', [...currentInterests, interestId]);
    } else {
      setValue('interests', currentInterests.filter(id => id !== interestId));
    }
  };

  if (isSuccess) {
    return (
      <Card className={`w-full max-w-md ${className}`}>
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            Inscription réussie !
          </h3>
          <p className="text-sm text-gray-600">
            Merci de votre inscription. Vous recevrez bientôt un email de confirmation 
            avec tous les détails de notre newsletter.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`w-full ${className}`}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <Input
              {...register('email')}
              type="email"
              placeholder="Votre adresse email"
              className="w-full"
              disabled={newsletterMutation.isPending}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          <Button 
            type="submit" 
            disabled={newsletterMutation.isPending}
            className="whitespace-nowrap"
          >
            {newsletterMutation.isPending ? 'Inscription...' : 'S\'abonner'}
          </Button>
        </form>
        
        {newsletterMutation.error && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {newsletterMutation.error.message}
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Mail className="w-5 h-5 text-blue-500" />
          <h4 className="font-semibold">Newsletter</h4>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Restez informé des dernières tendances et de nos actualités.
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input
            {...register('email')}
            type="email"
            placeholder="Votre email"
            disabled={newsletterMutation.isPending}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
          
          <div className="grid grid-cols-2 gap-2">
            <Input
              {...register('firstName')}
              placeholder="Prénom"
              disabled={newsletterMutation.isPending}
            />
            <Input
              {...register('lastName')}
              placeholder="Nom"
              disabled={newsletterMutation.isPending}
            />
          </div>
          {(errors.firstName || errors.lastName) && (
            <p className="text-red-500 text-xs">
              {errors.firstName?.message || errors.lastName?.message}
            </p>
          )}
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptTerms"
              {...register('acceptTerms')}
              disabled={newsletterMutation.isPending}
            />
            <Label htmlFor="acceptTerms" className="text-xs">
              J'accepte de recevoir la newsletter
            </Label>
          </div>
          {errors.acceptTerms && (
            <p className="text-red-500 text-xs">{errors.acceptTerms.message}</p>
          )}
          
          <Button 
            type="submit" 
            disabled={newsletterMutation.isPending}
            className="w-full"
            size="sm"
          >
            {newsletterMutation.isPending ? 'Inscription...' : 'S\'abonner'}
          </Button>
        </form>
        
        {newsletterMutation.error && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              {newsletterMutation.error.message}
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  }

  // Variant par défaut (formulaire complet)
  return (
    <Card className={`w-full max-w-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          {title || 'Rejoignez notre communauté'}
        </CardTitle>
        <CardDescription>
          {description || 'Recevez nos dernières actualités, conseils d\'experts et offres exclusives directement dans votre boîte mail.'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                {...register('firstName')}
                placeholder="John"
                disabled={newsletterMutation.isPending}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                {...register('lastName')}
                placeholder="Doe"
                disabled={newsletterMutation.isPending}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              {...register('email')}
              type="email"
              placeholder="john.doe@example.com"
              disabled={newsletterMutation.isPending}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <Label>Centres d'intérêt (optionnel)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {interestOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={watchedInterests.includes(option.id)}
                    onCheckedChange={(checked) => handleInterestChange(option.id, checked as boolean)}
                    disabled={newsletterMutation.isPending}
                  />
                  <Label htmlFor={option.id} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptTerms"
              {...register('acceptTerms')}
              disabled={newsletterMutation.isPending}
            />
            <Label htmlFor="acceptTerms" className="text-sm">
              J'accepte de recevoir la newsletter et les communications de Weblify Studio *
            </Label>
          </div>
          {errors.acceptTerms && (
            <p className="text-red-500 text-sm">{errors.acceptTerms.message}</p>
          )}
          
          <Button 
            type="submit" 
            disabled={newsletterMutation.isPending}
            className="w-full"
          >
            {newsletterMutation.isPending ? 'Inscription en cours...' : 'S\'abonner à la newsletter'}
          </Button>
        </form>
        
        {newsletterMutation.error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {newsletterMutation.error.message}
            </AlertDescription>
          </Alert>
        )}
        
        <p className="text-xs text-gray-500 mt-4">
          En vous abonnant, vous acceptez notre politique de confidentialité. 
          Vous pouvez vous désabonner à tout moment.
        </p>
      </CardContent>
    </Card>
  );
}