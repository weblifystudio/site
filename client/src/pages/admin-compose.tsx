import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Send, Paperclip, FileText, Euro, Mail } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'devis' | 'suivi' | 'custom';
}

const emailTemplates: EmailTemplate[] = [
  {
    id: 'devis-vitrine',
    name: 'Devis Site Vitrine',
    subject: 'Devis pour votre projet de site vitrine - Weblify Studio',
    content: `Bonjour {{name}},

Suite à votre demande de contact, je vous propose le devis suivant pour votre projet de site vitrine :

**SITE VITRINE PROFESSIONNEL**
• Design sur-mesure et responsive
• 5-7 pages optimisées SEO
• Formulaire de contact
• Intégration Google Analytics
• Hébergement et nom de domaine inclus (1 an)
• Formation à la gestion du contenu

**Tarif : 690€ HT**
Délai de réalisation : 2-3 semaines

Ce devis est valable 30 jours. N'hésitez pas à me contacter pour toute question.

Cordialement,
Noah Delenclos
Weblify Studio
📧 noah.delenclos@gmail.com
📱 06 XX XX XX XX`,
    type: 'devis'
  },
  {
    id: 'devis-ecommerce',
    name: 'Devis E-commerce',
    subject: 'Devis pour votre boutique en ligne - Weblify Studio',
    content: `Bonjour {{name}},

Voici votre devis personnalisé pour votre projet e-commerce :

**BOUTIQUE EN LIGNE COMPLÈTE**
• Design professionnel et mobile-first
• Gestion produits et stocks
• Système de paiement sécurisé (Stripe/PayPal)
• Espace client et commandes
• SEO et analytics avancés
• Formation complète incluse

**Tarif : 2190€ HT**
Délai : 4-6 semaines

Options disponibles :
- Intégration ERP/CRM : +500€
- Multi-langues : +300€
- Marketplace : +800€

Valable 45 jours. Contact pour ajustements.

Cordialement,
Noah Delenclos`,
    type: 'devis'
  },
  {
    id: 'suivi-projet',
    name: 'Suivi de Projet',
    subject: 'Point d\'avancement de votre projet - Weblify Studio',
    content: `Bonjour {{name}},

Je vous écris pour faire le point sur l'avancement de votre projet :

**État d'avancement :**
✓ Maquettes validées
✓ Développement frontend (80%)
🔄 Intégration du contenu en cours
⏳ Tests et optimisations (prochaine étape)

**Planning :**
- Livraison de la version test : {{date_test}}
- Mise en ligne finale : {{date_finale}}

Tout se déroule selon le planning prévu. Je reste disponible pour toute question.

Cordialement,
Noah Delenclos`,
    type: 'suivi'
  }
];

export default function AdminCompose() {
  const [, setLocation] = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    content: '',
    template: ''
  });

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLocation('/admin/login');
      return;
    }

    try {
      const response = await fetch('/api/admin/status', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setAuthenticated(true);
      } else {
        localStorage.removeItem('adminToken');
        setLocation('/admin/login');
      }
    } catch (error) {
      localStorage.removeItem('adminToken');
      setLocation('/admin/login');
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      setFormData(prev => ({
        ...prev,
        template: templateId,
        subject: template.subject,
        content: template.content
      }));
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Email envoyé avec succès !');
        setFormData({ to: '', subject: '', content: '', template: '' });
      } else {
        alert('Erreur lors de l\'envoi : ' + result.message);
      }
    } catch (error) {
      alert('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold">Vérification de l'authentification...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => setLocation('/admin/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            <div>
              <h1 className="text-4xl font-bold">Composer un Email</h1>
              <p className="text-muted-foreground">
                Envoyez des devis, suivis de projet ou emails personnalisés
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Templates */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Modèles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {emailTemplates.map(template => (
                    <Button
                      key={template.id}
                      variant={formData.template === template.id ? "default" : "outline"}
                      className="w-full justify-start h-auto p-3"
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="text-left">
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {template.type === 'devis' && <Badge variant="secondary"><Euro className="w-3 h-3 mr-1" />Devis</Badge>}
                          {template.type === 'suivi' && <Badge variant="outline">Suivi</Badge>}
                        </div>
                      </div>
                    </Button>
                  ))}
                  
                  <Button
                    variant={formData.template === '' ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setFormData(prev => ({ ...prev, template: '', subject: '', content: '' }))}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email personnalisé
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Nouveau Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSend} className="space-y-4">
                    
                    {/* Destinataire */}
                    <div>
                      <Label htmlFor="to">Destinataire</Label>
                      <Input
                        id="to"
                        type="email"
                        value={formData.to}
                        onChange={(e) => setFormData(prev => ({ ...prev, to: e.target.value }))}
                        placeholder="client@example.com"
                        required
                      />
                    </div>

                    {/* Sujet */}
                    <div>
                      <Label htmlFor="subject">Sujet</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Sujet de votre email"
                        required
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <Label htmlFor="content">Message</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Votre message..."
                        rows={12}
                        required
                      />
                      {formData.template && (
                        <p className="text-sm text-muted-foreground mt-1">
                          💡 Variables disponibles : {'{name}, {date_test}, {date_finale}'}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button type="submit" disabled={loading} className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        {loading ? 'Envoi...' : 'Envoyer'}
                      </Button>
                      
                      <Button type="button" variant="outline" className="flex items-center gap-2">
                        <Paperclip className="w-4 h-4" />
                        Joindre fichier
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Info */}
              <Card className="mt-6">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Types de contenus supportés :</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div>• Documents PDF (devis, contrats)</div>
                    <div>• Images (maquettes, logos)</div>
                    <div>• Archives ZIP (livrables)</div>
                    <div>• Documents Office (Word, Excel)</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Taille max : 25MB par fichier
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}