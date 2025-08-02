import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, MailOpen, Clock, User, Phone, Euro, MessageSquare, LogOut, Shield } from 'lucide-react';

interface Email {
  id: string;
  fromName: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setAuthenticated(true);
        fetchEmails();
      } else {
        localStorage.removeItem('adminToken');
        setLocation('/admin/login');
      }
    } catch (error) {
      localStorage.removeItem('adminToken');
      setLocation('/admin/login');
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    localStorage.removeItem('adminToken');
    setLocation('/admin/login');
  };

  const fetchEmails = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const response = await fetch('/api/admin/emails', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setEmails(data.emails || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (emailId: string) => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const response = await fetch(`/api/admin/emails/${emailId}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        setEmails(emails.map(email => 
          email.id === emailId ? { ...email, isRead: true } : email
        ));
      }
    } catch (error) {
      console.error('Erreur lors du marquage comme lu:', error);
    }
  };

  const parseEmailContent = (content: string) => {
    const lines = content.split('\n');
    const data: any = {};
    
    for (const line of lines) {
      if (line.includes('- Nom :')) data.name = line.split('- Nom :')[1]?.trim();
      if (line.includes('- Email :')) data.email = line.split('- Email :')[1]?.trim();
      if (line.includes('- Téléphone :')) data.phone = line.split('- Téléphone :')[1]?.trim();
      if (line.includes('- Budget :')) data.budget = line.split('- Budget :')[1]?.trim();
      if (line.includes('- Type de projet :')) data.projectType = line.split('- Type de projet :')[1]?.trim();
      if (line.includes('- Newsletter :')) data.newsletter = line.split('- Newsletter :')[1]?.trim();
    }
    
    const messageStart = content.indexOf('Message :');
    if (messageStart !== -1) {
      const messageEnd = content.indexOf('Date :');
      data.message = content.substring(messageStart + 9, messageEnd !== -1 ? messageEnd : content.length).trim();
    }
    
    return data;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!authenticated || loading) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">
              {!authenticated ? 'Vérification de l\'authentification...' : 'Chargement des emails...'}
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                Administration Sécurisée
              </h1>
              <p className="text-xl text-muted-foreground">
                Consultation des messages de contact - Session protégée
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => setLocation('/admin/compose')}
                className="flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Composer
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{emails.length}</div>
                <div className="text-sm text-muted-foreground">Total emails</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MailOpen className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{emails.filter(e => e.isRead).length}</div>
                <div className="text-sm text-muted-foreground">Emails lus</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold">{emails.filter(e => !e.isRead).length}</div>
                <div className="text-sm text-muted-foreground">Non lus</div>
              </CardContent>
            </Card>
          </div>

          {emails.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Mail className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Aucun email reçu</h3>
                <p className="text-muted-foreground">
                  Les messages de contact apparaîtront ici dès qu'un visiteur utilisera le formulaire.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Liste des emails */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Messages reçus</h2>
                {emails.map((email) => {
                  const parsedData = parseEmailContent(email.content);
                  return (
                    <Card 
                      key={email.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedEmail?.id === email.id ? 'ring-2 ring-primary' : ''
                      } ${!email.isRead ? 'border-primary' : ''}`}
                      onClick={() => setSelectedEmail(email)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {email.isRead ? (
                              <MailOpen className="w-5 h-5 text-green-500" />
                            ) : (
                              <Mail className="w-5 h-5 text-primary" />
                            )}
                            <span className="font-semibold">{email.fromName}</span>
                            {!email.isRead && <Badge variant="default">Nouveau</Badge>}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(email.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{email.fromEmail}</p>
                        {parsedData.budget && (
                          <p className="text-sm font-medium text-green-600">Budget: {parsedData.budget}</p>
                        )}
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                          {parsedData.message}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Détail de l'email sélectionné */}
              <div className="lg:sticky lg:top-32">
                {selectedEmail ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">{selectedEmail.subject}</h3>
                        {!selectedEmail.isRead && (
                          <Button 
                            size="sm"
                            onClick={() => markAsRead(selectedEmail.id)}
                          >
                            Marquer comme lu
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {(() => {
                        const data = parseEmailContent(selectedEmail.content);
                        return (
                          <>
                            <div className="grid grid-cols-1 gap-3">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4 text-primary" />
                                <span className="font-medium">{data.name}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-primary" />
                                <a href={`mailto:${data.email}`} className="text-primary hover:underline">
                                  {data.email}
                                </a>
                              </div>
                              {data.phone && data.phone !== 'Non renseigné' && (
                                <div className="flex items-center space-x-2">
                                  <Phone className="w-4 h-4 text-primary" />
                                  <a href={`tel:${data.phone}`} className="text-primary hover:underline">
                                    {data.phone}
                                  </a>
                                </div>
                              )}
                              {data.budget && data.budget !== 'Non spécifié' && (
                                <div className="flex items-center space-x-2">
                                  <Euro className="w-4 h-4 text-green-600" />
                                  <span className="font-medium text-green-600">{data.budget}</span>
                                </div>
                              )}
                              {data.projectType && data.projectType !== 'Non spécifié' && (
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline">{data.projectType}</Badge>
                                </div>
                              )}
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <div className="flex items-center space-x-2 mb-3">
                                <MessageSquare className="w-4 h-4 text-primary" />
                                <span className="font-medium">Message:</span>
                              </div>
                              <div className="bg-muted p-4 rounded-lg">
                                <p className="whitespace-pre-wrap">{data.message}</p>
                              </div>
                            </div>
                            
                            <div className="text-sm text-muted-foreground">
                              Reçu le {formatDate(selectedEmail.createdAt)}
                            </div>
                          </>
                        );
                      })()}
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Mail className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">Sélectionnez un email</h3>
                      <p className="text-muted-foreground">
                        Cliquez sur un message à gauche pour voir les détails complets.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}