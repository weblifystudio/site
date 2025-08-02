import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp, 
  Mail, 
  Calendar,
  Activity,
  BarChart3,
  Download,
  RefreshCw
} from 'lucide-react';

interface NewsletterStats {
  totalSubscribers: number;
  activeSubscribers: number;
  recentSubscriptions: number;
  unsubscribeRate: number;
}

export default function NewsletterAdmin() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data: stats, isLoading, error, refetch } = useQuery<NewsletterStats>({
    queryKey: ['/api/newsletter/stats'],
    refetchInterval: 30000, // Actualise toutes les 30 secondes
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleExportSubscribers = () => {
    // En production, ceci ferait un appel API pour exporter les données
    console.log('Export des abonnés en cours...');
    // Simulation d'export
    const csvContent = `Email,Prénom,Nom,Date d'inscription,Statut,Centres d'intérêt
test@example.com,Test,User,2025-01-01,Actif,"Design, SEO"`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600">Chargement des statistiques...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-12">
        <Alert variant="destructive">
          <AlertDescription>
            Erreur lors du chargement des statistiques de la newsletter. Veuillez réessayer.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Mail className="w-8 h-8 text-blue-500" />
              Administration Newsletter
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Tableau de bord et statistiques des abonnés à la newsletter
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Actualiser
            </Button>
            <Button 
              onClick={handleExportSubscribers}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exporter CSV
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Total Abonnés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats?.totalSubscribers || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Tous les abonnés enregistrés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-green-600" />
              Abonnés Actifs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats?.activeSubscribers || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Abonnements actifs actuels
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Nouveaux (30j)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {stats?.recentSubscriptions || 0}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Inscriptions des 30 derniers jours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <UserX className="w-4 h-4 text-red-600" />
              Taux Désabonnement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats?.unsubscribeRate || 0}%
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Pourcentage de désabonnements
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analysis */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              Analyse de Performance
            </CardTitle>
            <CardDescription>
              Évaluation de la santé de votre newsletter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Taux de rétention</span>
              <Badge variant={stats && stats.unsubscribeRate < 10 ? "default" : "destructive"}>
                {stats ? (100 - stats.unsubscribeRate).toFixed(1) : 0}%
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Croissance mensuelle</span>
              <Badge variant="secondary">
                {stats?.recentSubscriptions || 0} nouveaux
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Base d'abonnés</span>
              <Badge variant={stats && stats.activeSubscribers > 50 ? "default" : "outline"}>
                {stats && stats.activeSubscribers > 50 ? "Solide" : "En développement"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Actions Recommandées
            </CardTitle>
            <CardDescription>
              Conseils pour optimiser votre newsletter
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats && stats.unsubscribeRate > 15 && (
              <Alert>
                <AlertDescription className="text-sm">
                  ⚠️ Taux de désabonnement élevé - Réviser le contenu et la fréquence d'envoi
                </AlertDescription>
              </Alert>
            )}
            
            {stats && stats.recentSubscriptions < 5 && (
              <Alert>
                <AlertDescription className="text-sm">
                  📈 Faible croissance - Ajouter des call-to-action sur le site
                </AlertDescription>
              </Alert>
            )}
            
            {stats && stats.activeSubscribers > 100 && (
              <Alert>
                <AlertDescription className="text-sm">
                  🎉 Excellente base d'abonnés - Envisager la segmentation
                </AlertDescription>
              </Alert>
            )}
            
            <div className="pt-3">
              <h4 className="font-semibold text-sm mb-2">Bonnes pratiques :</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Envoyer régulièrement (1-2 fois/mois)</li>
                <li>• Personnaliser le contenu par centres d'intérêt</li>
                <li>• Surveiller les métriques d'engagement</li>
                <li>• Offrir de la valeur dans chaque email</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            Activité Récente
          </CardTitle>
          <CardDescription>
            Dernières interactions avec la newsletter
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <UserCheck className="w-4 h-4 text-green-600" />
              <span>Nouvel abonné : jean.dupont@example.com</span>
              <Badge variant="outline" className="ml-auto">Aujourd'hui</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <UserX className="w-4 h-4 text-red-600" />
              <span>Désabonnement : jean.dupont@example.com</span>
              <Badge variant="outline" className="ml-auto">Aujourd'hui</Badge>
            </div>
            
            <div className="text-center py-6 text-gray-500">
              <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Autres activités apparaîtront ici...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}