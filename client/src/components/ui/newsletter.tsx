import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface NewsletterProps {
  variant?: 'footer' | 'contact' | 'popup';
  className?: string;
}

export function Newsletter({ variant = 'footer', className = '' }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setStatus('error');
      setMessage('Adresse email invalide. Veuillez réessayer.');
      return;
    }

    setStatus('loading');
    
    // Simuler l'inscription (vous pourrez connecter à votre service)
    try {
      // TODO: Connecter à votre service de newsletter (Brevo, Mailchimp, etc.)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage('Merci ! Vous êtes inscrit(e) à notre newsletter.');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  if (variant === 'footer') {
    return (
      <div className={`${className}`}>
        <h3 className="text-lg font-semibold mb-4 text-white">Newsletter</h3>
        <p className="text-gray-300 dark:text-gray-400 mb-4 text-sm leading-relaxed">
          Recevez nos dernières actualités, conseils web et offres exclusives directement dans votre boîte mail.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="votre@email.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-primary"
              disabled={status === 'loading'}
            />
            <Button 
              type="submit" 
              disabled={status === 'loading'}
              className="bg-primary hover:bg-primary/90 text-white px-6"
            >
              {status === 'loading' ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  S'inscrire
                </>
              )}
            </Button>
          </div>
          {message && (
            <div className={`flex items-center text-sm ${
              status === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {status === 'success' ? (
                <CheckCircle className="w-4 h-4 mr-2" />
              ) : (
                <AlertCircle className="w-4 h-4 mr-2" />
              )}
              {message}
            </div>
          )}
        </form>
      </div>
    );
  }

  if (variant === 'contact') {
    return (
      <div className={`bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20 rounded-lg p-6 ${className}`}>
        <div className="flex items-start space-x-4">
          <div className="bg-primary/20 p-3 rounded-lg">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Restez informé</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Rejoignez notre newsletter pour recevoir nos derniers conseils et actualités web.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  disabled={status === 'loading'}
                />
                <Button 
                  type="submit" 
                  disabled={status === 'loading'}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  {status === 'loading' ? (
                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  ) : (
                    'Rejoindre'
                  )}
                </Button>
              </div>
              {message && (
                <div className={`flex items-center text-sm ${
                  status === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {status === 'success' ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <AlertCircle className="w-4 h-4 mr-2" />
                  )}
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Popup variant
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-sm mx-auto ${className}`}>
      <div className="text-center mb-4">
        <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Restez connecté !</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Recevez nos conseils exclusifs et actualités web directement par email.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="votre@email.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          disabled={status === 'loading'}
        />
        <Button 
          type="submit" 
          disabled={status === 'loading'}
          className="w-full bg-primary hover:bg-primary/90"
        >
          {status === 'loading' ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              Rejoindre la newsletter
            </>
          )}
        </Button>
        
        {message && (
          <div className={`flex items-center text-sm ${
            status === 'success' ? 'text-green-600' : 'text-red-600'
          }`}>
            {status === 'success' ? (
              <CheckCircle className="w-4 h-4 mr-2" />
            ) : (
              <AlertCircle className="w-4 h-4 mr-2" />
            )}
            {message}
          </div>
        )}
      </form>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        Pas de spam, désabonnement en un clic.
      </p>
    </div>
  );
}