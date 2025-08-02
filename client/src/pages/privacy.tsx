import { Badge } from '@/components/ui/badge';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Breadcrumbs from '@/components/ui/breadcrumbs';

export default function Privacy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-8" />
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Politique de Confidentialité
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Politique de Confidentialité
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Protection des données personnelles conforme au RGPD
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Article 1 */}
          <Card>
            <CardHeader>
              <CardTitle>1. Responsable du traitement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Le responsable du traitement des données personnelles collectées sur le site weblify.fr est :
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>Weblify</strong><br />
                  Représentée par Noah Delenclos<br />
                  Micro-entrepreneur<br />
                  Adresse : Paris, France<br />
                  Email : <a href="mailto:contact@weblify.fr" className="text-primary hover:underline transition-colors duration-200">contact@weblify.fr</a><br />
                  Téléphone : +33 (0)1 23 45 67 89
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Article 2 */}
          <Card>
            <CardHeader>
              <CardTitle>2. Données collectées et finalités</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Données collectées via le formulaire de contact :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li><strong>Nom et prénom :</strong> identification et personnalisation des échanges</li>
                  <li><strong>Adresse email :</strong> réponse à votre demande</li>
                  <li><strong>Numéro de téléphone :</strong> contact direct si nécessaire</li>
                  <li><strong>Nom de l'entreprise :</strong> contexte professionnel de la demande</li>
                  <li><strong>Message :</strong> compréhension de votre besoin</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Données collectées automatiquement :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li><strong>Cookies techniques :</strong> fonctionnement du site (préférences de thème)</li>
                  <li><strong>Données de navigation :</strong> amélioration de l'expérience utilisateur</li>
                  <li><strong>Adresse IP :</strong> sécurité et statistiques anonymisées</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Article 3 */}
          <Card>
            <CardHeader>
              <CardTitle>3. Base légale des traitements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Bases légales selon le RGPD :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li><strong>Article 6.1.b (exécution du contrat) :</strong> traitement des demandes commerciales</li>
                  <li><strong>Article 6.1.f (intérêt légitime) :</strong> amélioration des services, sécurité du site</li>
                  <li><strong>Article 6.1.a (consentement) :</strong> cookies non essentiels et analytics</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Article 4 */}
          <Card>
            <CardHeader>
              <CardTitle>4. Durée de conservation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Durées de conservation des données :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li><strong>Données de contact :</strong> 3 ans à partir du dernier contact</li>
                  <li><strong>Données clients :</strong> 5 ans après la fin de la relation commerciale</li>
                  <li><strong>Cookies techniques :</strong> 13 mois maximum</li>
                  <li><strong>Logs de connexion :</strong> 12 mois (sécurité)</li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                À l'expiration de ces délais, vos données sont automatiquement supprimées 
                ou anonymisées de façon irréversible.
              </p>
            </CardContent>
          </Card>

          {/* Article 5 */}
          <Card>
            <CardHeader>
              <CardTitle>5. Destinataires des données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Vos données personnelles sont uniquement accessibles à :
              </p>
              <ul className="text-muted-foreground list-disc list-inside space-y-1">
                <li><strong>Noah Delenclos :</strong> traitement des demandes commerciales</li>
                <li><strong>Prestataires techniques :</strong> hébergement et maintenance (sous contrat)</li>
                <li><strong>Autorités compétentes :</strong> uniquement sur réquisition judiciaire</li>
              </ul>
              <p className="text-muted-foreground">
                <strong>Aucune cession ou location</strong> de vos données à des tiers commerciaux.
              </p>
            </CardContent>
          </Card>

          {/* Article 6 */}
          <Card>
            <CardHeader>
              <CardTitle>6. Transferts hors Union Européenne</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                En principe, vos données sont traitées exclusivement dans l'Union Européenne. 
                Si un transfert hors UE était nécessaire, il serait effectué uniquement vers 
                des pays disposant d'une décision d'adéquation ou avec des garanties appropriées 
                (clauses contractuelles types, certification).
              </p>
            </CardContent>
          </Card>

          {/* Article 7 */}
          <Card>
            <CardHeader>
              <CardTitle>7. Vos droits RGPD</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Droits d'accès et de portabilité :</h4>
                  <ul className="text-muted-foreground list-disc list-inside space-y-1">
                    <li>Droit d'accès (Art. 15)</li>
                    <li>Droit de rectification (Art. 16)</li>
                    <li>Droit à la portabilité (Art. 20)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Droits d'opposition et d'effacement :</h4>
                  <ul className="text-muted-foreground list-disc list-inside space-y-1">
                    <li>Droit d'effacement (Art. 17)</li>
                    <li>Droit d'opposition (Art. 21)</li>
                    <li>Droit à la limitation (Art. 18)</li>
                  </ul>
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Comment exercer vos droits :</h4>
                <p className="text-muted-foreground">
                  Pour exercer vos droits, contactez-nous à : <strong><a href="mailto:contact@weblify.fr" className="text-primary hover:underline transition-colors duration-200">contact@weblify.fr</a></strong>
                  <br />
                  Nous nous engageons à répondre dans un délai de <strong>1 mois maximum</strong>.
                  <br />
                  Une pièce d'identité pourra être demandée pour vérifier votre identité.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Article 8 */}
          <Card>
            <CardHeader>
              <CardTitle>8. Cookies et traceurs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Types de cookies utilisés :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li><strong>Cookies techniques :</strong> fonctionnement du site (exemption RGPD)</li>
                  <li><strong>Cookies de préférences :</strong> mémorisation du thème choisi</li>
                  <li><strong>Cookies analytics :</strong> statistiques de fréquentation (avec consentement)</li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                Vous pouvez configurer votre navigateur pour refuser les cookies ou être alerté 
                de leur dépôt. La désactivation des cookies techniques peut affecter le 
                fonctionnement du site.
              </p>
            </CardContent>
          </Card>

          {/* Article 9 */}
          <Card>
            <CardHeader>
              <CardTitle>9. Sécurité des données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Mesures de sécurité mises en place :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li><strong>Chiffrement :</strong> transmission sécurisée par HTTPS/TLS</li>
                  <li><strong>Accès restreint :</strong> authentification pour l'administration</li>
                  <li><strong>Sauvegarde :</strong> copies de sécurité régulières</li>
                  <li><strong>Mise à jour :</strong> correctifs de sécurité appliqués</li>
                  <li><strong>Surveillance :</strong> monitoring des accès et tentatives d'intrusion</li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                En cas de violation de données personnelles susceptible d'engendrer un risque élevé 
                pour vos droits et libertés, nous vous en informerons dans les meilleurs délais.
              </p>
            </CardContent>
          </Card>

          {/* Article 10 */}
          <Card>
            <CardHeader>
              <CardTitle>10. Droit de réclamation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Si vous estimez que le traitement de vos données personnelles ne respecte pas 
                le RGPD, vous avez le droit d'introduire une réclamation auprès de l'autorité 
                de contrôle compétente :
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>Commission Nationale de l'Informatique et des Libertés (CNIL)</strong><br />
                  3 Place de Fontenoy - TSA 80715<br />
                  75334 Paris Cedex 07<br />
                  Téléphone : +33 (0)1 53 73 22 22<br />
                  Site web : www.cnil.fr
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Article 11 */}
          <Card>
            <CardHeader>
              <CardTitle>11. Modifications de la politique</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cette politique de confidentialité peut être modifiée à tout moment pour 
                s'adapter aux évolutions légales ou techniques. Toute modification substantielle 
                vous sera notifiée par email ou via un bandeau d'information sur le site.
                <br /><br />
                Nous vous recommandons de consulter régulièrement cette page pour prendre 
                connaissance des éventuelles modifications.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact - Délégué à la Protection des Données</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pour toute question relative à cette politique de confidentialité ou 
                à l'exercice de vos droits RGPD :
              </p>
              <div className="mt-4 space-y-1 text-muted-foreground">
                <p><strong>Email :</strong> contact@weblify.fr (objet : "RGPD - Protection des données")</p>
                <p><strong>Téléphone :</strong> +33 (0)1 23 45 67 89</p>
                <p><strong>Courrier :</strong> Weblify - Service RGPD, Paris, France</p>
              </div>
            </CardContent>
          </Card>

          {/* Dernière mise à jour */}
          <div className="text-center text-sm text-muted-foreground pt-8">
            <p>Politique de confidentialité mise à jour le 27 janvier 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}