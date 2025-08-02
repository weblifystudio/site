import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Mail, 
  Send, 
  Eye,
  Download,
  UserX,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  interests: string[];
  isActive: boolean;
  subscribedAt: string;
  source: string;
}

interface NewsletterStats {
  totalSubscribers: number;
  activeSubscribers: number;
  recentSubscriptions: number;
  unsubscribeRate: number;
}

export default function NewsletterManagement() {
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const queryClient = useQueryClient();

  // Récupération des statistiques
  const { data: stats, isLoading: statsLoading } = useQuery<NewsletterStats>({
    queryKey: ['/api/newsletter/stats'],
    refetchInterval: 30000,
  });

  // Récupération des abonnés (simulation)
  const { data: subscribers, isLoading: subscribersLoading } = useQuery<Subscriber[]>({
    queryKey: ['/api/newsletter/subscribers'],
    queryFn: async () => {
      // En réalité, ceci appellerait votre API
      // Pour la démo, je simule des données
      return [
        {
          id: '1',
          email: 'active.user@example.com',
          firstName: 'Active',
          lastName: 'User',
          interests: ['web-design', 'development', 'seo'],
          isActive: true,
          subscribedAt: '2025-08-02T20:12:28.000Z',
          source: 'website'
        },
        {
          id: '2',
          email: 'test.newsletter@example.com',
          firstName: 'Test',
          lastName: 'Newsletter',
          interests: ['web-design', 'seo'],
          isActive: false,
          subscribedAt: '2025-08-02T20:12:07.000Z',
          source: 'website'
        }
      ];
    }
  });

  // Mutation pour envoyer la newsletter
  const sendNewsletterMutation = useMutation({
    mutationFn: async (data: { subject: string; content: string; targetSegment?: string }) => {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/newsletter/stats'] });
      setEmailSubject('');
      setEmailContent('');
    },
  });

  const handleSendNewsletter = () => {
    if (!emailSubject.trim() || !emailContent.trim()) {
      return;
    }

    sendNewsletterMutation.mutate({
      subject: emailSubject,
      content: emailContent,
    });
  };

  const exportSubscribers = () => {
    if (!subscribers) return;

    const csvContent = [
      'Email,Prénom,Nom,Centres d\'intérêt,Statut,Date d\'inscription,Source',
      ...subscribers.map(sub => 
        `${sub.email},${sub.firstName},${sub.lastName},"${sub.interests.join(', ')}",${sub.isActive ? 'Actif' : 'Inactif'},${new Date(sub.subscribedAt).toLocaleDateString('fr-FR')},${sub.source}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getInterestBadgeColor = (interest: string) => {
    const colors: Record<string, string> = {
      'web-design': 'bg-purple-100 text-purple-800',
      'development': 'bg-blue-100 text-blue-800',
      'seo': 'bg-green-100 text-green-800',
      'ecommerce': 'bg-orange-100 text-orange-800',
      'mobile': 'bg-pink-100 text-pink-800',
      'trends': 'bg-yellow-100 text-yellow-800',
    };
    return colors[interest] || 'bg-gray-100 text-gray-800';
  };

  if (statsLoading || subscribersLoading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Clock className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Mail className="w-8 h-8 text-blue-500" />
          Gestion Newsletter Weblify Studio
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Envoyez des newsletters et gérez vos abonnés
        </p>
      </div>

      {/* Stats rapides */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats?.activeSubscribers || 0}</p>
                <p className="text-sm text-gray-600">Abonnés actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Mail className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-sm text-gray-600">Envois ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">0%</p>
                <p className="text-sm text-gray-600">Taux d'ouverture</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <UserX className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{stats?.unsubscribeRate || 0}%</p>
                <p className="text-sm text-gray-600">Désabonnements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compose" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compose">
            <Send className="w-4 h-4 mr-2" />
            Composer
          </TabsTrigger>
          <TabsTrigger value="subscribers">
            <Users className="w-4 h-4 mr-2" />
            Abonnés ({subscribers?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="w-4 h-4 mr-2" />
            Historique
          </TabsTrigger>
        </TabsList>

        {/* Composer une newsletter */}
        <TabsContent value="compose">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Formulaire de composition */}
            <Card>
              <CardHeader>
                <CardTitle>Nouvelle Newsletter</CardTitle>
                <CardDescription>
                  Rédigez votre newsletter pour les {stats?.activeSubscribers || 0} abonnés actifs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="subject">Sujet de l'email</Label>
                  <Input
                    id="subject"
                    placeholder="Ex: Nouvelles tendances web - Janvier 2025"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Contenu de la newsletter</Label>
                  <Textarea
                    id="content"
                    placeholder="Bonjour [PRENOM],

Voici les dernières actualités de Weblify Studio...

📈 Tendances du mois
- ...

💡 Conseil d'expert
- ...

🎯 Nos derniers projets
- ...

À bientôt,
L'équipe Weblify Studio"
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    rows={12}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => setPreviewMode(!previewMode)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    {previewMode ? 'Éditer' : 'Aperçu'}
                  </Button>

                  <Button
                    onClick={handleSendNewsletter}
                    disabled={!emailSubject.trim() || !emailContent.trim() || sendNewsletterMutation.isPending}
                    className="flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {sendNewsletterMutation.isPending ? 'Envoi...' : `Envoyer à ${stats?.activeSubscribers || 0} abonnés`}
                  </Button>
                </div>

                {sendNewsletterMutation.error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Erreur lors de l'envoi de la newsletter
                    </AlertDescription>
                  </Alert>
                )}

                {sendNewsletterMutation.isSuccess && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Newsletter envoyée avec succès !
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Aperçu */}
            <Card>
              <CardHeader>
                <CardTitle>Aperçu de l'email</CardTitle>
                <CardDescription>
                  Voici comment vos abonnés verront la newsletter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                  <div className="mb-4 pb-4 border-b">
                    <h3 className="font-semibold">De: Weblify Studio &lt;newsletter@weblifystudio.fr&gt;</h3>
                    <h3 className="font-semibold">Sujet: {emailSubject || 'Sujet de votre newsletter'}</h3>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                      {emailContent || 'Votre contenu apparaîtra ici...'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Liste des abonnés */}
        <TabsContent value="subscribers">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Liste des Abonnés</CardTitle>
                  <CardDescription>
                    Gérez vos {subscribers?.length || 0} abonnés
                  </CardDescription>
                </div>
                <Button onClick={exportSubscribers} variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Exporter CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subscribers?.map((subscriber) => (
                  <div key={subscriber.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">
                          {subscriber.firstName} {subscriber.lastName}
                        </h4>
                        <Badge variant={subscriber.isActive ? "default" : "secondary"}>
                          {subscriber.isActive ? "Actif" : "Inactif"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{subscriber.email}</p>
                      <div className="flex gap-2 flex-wrap">
                        {subscriber.interests.map((interest) => (
                          <span
                            key={interest}
                            className={`px-2 py-1 rounded-full text-xs ${getInterestBadgeColor(interest)}`}
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Inscrit le {new Date(subscriber.subscribedAt).toLocaleDateString('fr-FR')} via {subscriber.source}
                      </p>
                    </div>
                  </div>
                ))}

                {(!subscribers || subscribers.length === 0) && (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucun abonné pour le moment</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Historique des envois */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historique des Newsletters</CardTitle>
              <CardDescription>
                Consultez l'historique de vos envois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Aucune newsletter envoyée pour le moment</p>
                <p className="text-sm text-gray-500 mt-2">
                  Les newsletters que vous enverrez apparaîtront ici avec leurs statistiques
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}