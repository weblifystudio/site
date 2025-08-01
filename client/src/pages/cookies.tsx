import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useState, useEffect } from 'react';

export default function Cookies() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always true, cannot be disabled
    functional: false,
    analytics: false,
    marketing: false
  });

  // Load saved preferences on component mount
  useEffect(() => {
    const saved = localStorage.getItem('cookiePreferences');
    if (saved) {
      setCookiePreferences({ ...cookiePreferences, ...JSON.parse(saved) });
    }
  }, []);

  const handlePreferenceChange = (type: keyof typeof cookiePreferences, value: boolean) => {
    if (type === 'essential') return; // Cannot disable essential cookies
    
    const newPreferences = { ...cookiePreferences, [type]: value };
    setCookiePreferences(newPreferences);
  };

  const savePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    // Trigger custom event for cookie banner to listen to
    window.dispatchEvent(new CustomEvent('cookiePreferencesUpdated', { 
      detail: cookiePreferences 
    }));
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true
    };
    setCookiePreferences(allAccepted);
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    window.dispatchEvent(new CustomEvent('cookiePreferencesUpdated', { 
      detail: allAccepted 
    }));
  };

  const rejectOptional = () => {
    const essentialOnly = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false
    };
    setCookiePreferences(essentialOnly);
    localStorage.setItem('cookiePreferences', JSON.stringify(essentialOnly));
    window.dispatchEvent(new CustomEvent('cookiePreferencesUpdated', { 
      detail: essentialOnly 
    }));
  };

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Gestion des Cookies
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Gestion des Cookies
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Paramétrez vos préférences de cookies conformément au RGPD
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Cookie Preferences Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Vos Préférences de Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Essential Cookies */}
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <h4 className="font-semibold mb-1">Cookies Essentiels</h4>
                  <p className="text-sm text-muted-foreground">
                    Nécessaires au fonctionnement du site (navigation, sécurité, préférences de base)
                  </p>
                </div>
                <Switch 
                  checked={cookiePreferences.essential}
                  disabled={true}
                  aria-label="Cookies essentiels (obligatoires)"
                />
              </div>
              
              <Separator />
              
              {/* Functional Cookies */}
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <h4 className="font-semibold mb-1">Cookies Fonctionnels</h4>
                  <p className="text-sm text-muted-foreground">
                    Mémorisation de vos préférences (thème sombre/clair, langue, etc.)
                  </p>
                </div>
                <Switch 
                  checked={cookiePreferences.functional}
                  onCheckedChange={(checked) => handlePreferenceChange('functional', checked)}
                  aria-label="Cookies fonctionnels"
                />
              </div>
              
              <Separator />
              
              {/* Analytics Cookies */}
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <h4 className="font-semibold mb-1">Cookies d'Analyse</h4>
                  <p className="text-sm text-muted-foreground">
                    Statistiques de visite anonymisées pour améliorer notre site (Google Analytics)
                  </p>
                </div>
                <Switch 
                  checked={cookiePreferences.analytics}
                  onCheckedChange={(checked) => handlePreferenceChange('analytics', checked)}
                  aria-label="Cookies d'analyse"
                />
              </div>
              
              <Separator />
              
              {/* Marketing Cookies */}
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <h4 className="font-semibold mb-1">Cookies Marketing</h4>
                  <p className="text-sm text-muted-foreground">
                    Publicités personnalisées et suivi des conversions (actuellement non utilisés)
                  </p>
                </div>
                <Switch 
                  checked={cookiePreferences.marketing}
                  onCheckedChange={(checked) => handlePreferenceChange('marketing', checked)}
                  aria-label="Cookies marketing"
                />
              </div>
              
              <Separator />
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button onClick={savePreferences} className="flex-1">
                  Sauvegarder mes préférences
                </Button>
                <Button onClick={acceptAll} variant="outline" className="flex-1">
                  Tout accepter
                </Button>
                <Button onClick={rejectOptional} variant="outline" className="flex-1">
                  Essentiel uniquement
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Information about cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Qu'est-ce qu'un cookie ?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, 
                smartphone) lors de la visite d'un site web. Il permet de reconnaître votre navigateur 
                et de mémoriser certaines informations vous concernant.
              </p>
              <div>
                <h4 className="font-semibold mb-2">Types de cookies utilisés sur notre site :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li><strong>Cookies de session :</strong> supprimés à la fermeture du navigateur</li>
                  <li><strong>Cookies persistants :</strong> conservés pendant une durée déterminée</li>
                  <li><strong>Cookies internes :</strong> déposés directement par notre site</li>
                  <li><strong>Cookies tiers :</strong> déposés par nos partenaires (Google Analytics)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Detailed cookie list */}
          <Card>
            <CardHeader>
              <CardTitle>Liste Détaillée des Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Cookies Essentiels</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Nom</th>
                        <th className="text-left py-2">Finalité</th>
                        <th className="text-left py-2">Durée</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b">
                        <td className="py-2">weblify_session</td>
                        <td className="py-2">Identification de session utilisateur</td>
                        <td className="py-2">Session</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">csrf_token</td>
                        <td className="py-2">Protection contre les attaques CSRF</td>
                        <td className="py-2">Session</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-3">Cookies Fonctionnels</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Nom</th>
                        <th className="text-left py-2">Finalité</th>
                        <th className="text-left py-2">Durée</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b">
                        <td className="py-2">theme_preference</td>
                        <td className="py-2">Mémorisation du thème choisi (sombre/clair)</td>
                        <td className="py-2">1 an</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">cookiePreferences</td>
                        <td className="py-2">Vos choix de cookies</td>
                        <td className="py-2">1 an</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-3">Cookies d'Analyse (Google Analytics)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Nom</th>
                        <th className="text-left py-2">Finalité</th>
                        <th className="text-left py-2">Durée</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b">
                        <td className="py-2">_ga</td>
                        <td className="py-2">Distinction des utilisateurs</td>
                        <td className="py-2">2 ans</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">_ga_*</td>
                        <td className="py-2">Persistance de l'état de session</td>
                        <td className="py-2">2 ans</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to manage cookies */}
          <Card>
            <CardHeader>
              <CardTitle>Comment Gérer les Cookies dans Votre Navigateur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Vous pouvez également gérer les cookies directement dans votre navigateur :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Navigateurs de bureau :</h4>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li><strong>Chrome :</strong> Menu → Paramètres → Confidentialité et sécurité → Cookies</li>
                    <li><strong>Firefox :</strong> Menu → Paramètres → Vie privée et sécurité</li>
                    <li><strong>Safari :</strong> Préférences → Confidentialité</li>
                    <li><strong>Edge :</strong> Menu → Paramètres → Cookies et autorisations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Navigateurs mobiles :</h4>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li><strong>Chrome Mobile :</strong> Menu → Paramètres → Paramètres du site</li>
                    <li><strong>Safari iOS :</strong> Réglages → Safari → Bloquer tous les cookies</li>
                    <li><strong>Firefox Mobile :</strong> Menu → Paramètres → Protection contre le pistage</li>
                  </ul>
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <p className="text-amber-800 dark:text-amber-200 text-sm">
                  <strong>⚠️ Attention :</strong> La désactivation de certains cookies peut affecter 
                  le fonctionnement du site et votre expérience de navigation.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Questions sur les Cookies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pour toute question concernant notre politique de cookies :
              </p>
              <div className="mt-4 space-y-1 text-muted-foreground">
                <p><strong>Email :</strong> contact@weblify.fr</p>
                <p><strong>Téléphone :</strong> +33 (0)1 23 45 67 89</p>
              </div>
            </CardContent>
          </Card>

          {/* Dernière mise à jour */}
          <div className="text-center text-sm text-muted-foreground pt-8">
            <p>Politique de cookies mise à jour le 27 janvier 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}