import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CGV() {
  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Conditions Générales de Vente
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Conditions Générales de Vente
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conditions contractuelles applicables aux services de création de sites web proposés par Weblify
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Article 1 */}
          <Card>
            <CardHeader>
              <CardTitle>Article 1 - Objet et champ d'application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Les présentes Conditions Générales de Vente (CGV) s'appliquent à tous les services de création, 
                développement et maintenance de sites internet proposés par Weblify, micro-entreprise représentée 
                par Noah Delenclos.
              </p>
              <p className="text-muted-foreground">
                Toute commande implique l'acceptation sans réserve des présentes conditions générales de vente.
              </p>
            </CardContent>
          </Card>

          {/* Article 2 */}
          <Card>
            <CardHeader>
              <CardTitle>Article 2 - Services proposés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Nos services comprennent :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li>Création de sites internet vitrine</li>
                  <li>Développement de sites premium avec fonctionnalités avancées</li>
                  <li>Développement sur-mesure selon cahier des charges</li>
                  <li>Refonte de sites existants</li>
                  <li>Maintenance et support technique</li>
                  <li>Formation à l'utilisation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Article 3 */}
          <Card>
            <CardHeader>
              <CardTitle>Article 3 - Devis et commandes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Tout projet fait l'objet d'un devis détaillé gratuit, valable 30 jours. 
                La commande devient ferme après signature du devis et versement de l'acompte.
              </p>
              <div>
                <h4 className="font-semibold mb-2">Le devis précise :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li>La nature et les spécifications techniques du site</li>
                  <li>Les délais de réalisation</li>
                  <li>Le prix total et les modalités de paiement</li>
                  <li>Les conditions de maintenance</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Article 4 */}
          <Card>
            <CardHeader>
              <CardTitle>Article 4 - Prix et modalités de paiement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Tarifs (TVA non applicable - Art. 293 B du CGI) :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li>Site vitrine : à partir de 690€</li>
                  <li>Site premium : à partir de 1290€</li>
                  <li>Développement sur-mesure : sur devis personnalisé</li>
                  <li>Maintenance mensuelle : à partir de 39€/mois</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Modalités de paiement :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li>Acompte de 50% à la commande</li>
                  <li>Solde à la livraison du site</li>
                  <li>Paiement par virement bancaire ou chèque</li>
                  <li>Délai de paiement : 30 jours net</li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                En cas de retard de paiement, des pénalités de 3 fois le taux d'intérêt légal 
                seront appliquées, ainsi qu'une indemnité forfaitaire de 40€ pour frais de recouvrement.
              </p>
            </CardContent>
          </Card>

          {/* Article 5 */}
          <Card>
            <CardHeader>
              <CardTitle>Article 5 - Délais et livraison</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Délais indicatifs :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li>Site vitrine : 3 à 7 jours ouvrés</li>
                  <li>Site premium : 7 à 14 jours ouvrés</li>
                  <li>Développement sur-mesure : selon cahier des charges</li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                Les délais courent à partir de la réception de l'acompte et de tous les éléments 
                nécessaires au projet (textes, images, accès, etc.). Tout retard dans la fourniture 
                de ces éléments prolonge d'autant les délais de livraison.
              </p>
              <p className="text-muted-foreground">
                La livraison s'effectue par mise en ligne du site et formation à son utilisation.
              </p>
            </CardContent>
          </Card>

          {/* Article 6 */}
          <Card>
            <CardHeader>
              <CardTitle>Article 6 - Obligations du client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Le client s'engage à :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li>Fournir tous les éléments nécessaires dans les délais convenus</li>
                  <li>Valider les étapes du projet dans les 48h</li>
                  <li>Respecter les droits d'auteur pour tous les contenus fournis</li>
                  <li>Effectuer les paiements aux échéances prévues</li>
                  <li>Communiquer rapidement tout changement de spécifications</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Article 7 */}
          <Card>
            <CardHeader>
              <CardTitle>Article 7 - Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Le client devient propriétaire du site web et de son contenu après paiement intégral. 
                Weblify conserve les droits sur les méthodes, savoir-faire et outils développés.
              </p>
              <p className="text-muted-foreground">
                Le client garantit être propriétaire ou avoir les droits d'usage de tous les éléments 
                fournis (textes, images, vidéos, etc.) et dégage Weblify de toute responsabilité 
                en cas de litige.
              </p>
              <p className="text-muted-foreground">
                Une mention "Site créé par Weblify" peut être intégrée discrètement en footer, 
                sauf demande contraire du client.
              </p>
            </CardContent>
          </Card>

          {/* Article 8 */}
          <Card>
            <CardHeader>
              <CardTitle>Article 8 - Garanties et maintenance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Garantie :</h4>
                <p className="text-muted-foreground">
                  Weblify garantit le bon fonctionnement du site pendant 30 jours après livraison. 
                  Cette garantie couvre les défauts de fonctionnement, pas les évolutions ou modifications.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Maintenance (optionnelle) :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li>Mises à jour de sécurité</li>
                  <li>Sauvegardes régulières</li>
                  <li>Support technique prioritaire</li>
                  <li>Monitoring de disponibilité</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Article 9 */}
          <Card>
            <CardHeader>
              <CardTitle>Article 9 - Responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                La responsabilité de Weblify est limitée au montant des prestations facturées. 
                Weblify ne peut être tenu responsable des dommages indirects, pertes d'exploitation 
                ou de chiffre d'affaires.
              </p>
              <p className="text-muted-foreground">
                Le client assume la responsabilité du contenu publié sur son site et s'engage 
                à respecter la législation en vigueur.
              </p>
            </CardContent>
          </Card>

          {/* Article 10 */}
          <Card>
            <CardHeader>
              <CardTitle>Article 10 - Droit de rétractation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Conformément aux articles L.221-18 et L.221-28 du Code de la consommation, 
                le client consommateur dispose d'un délai de 14 jours pour exercer son droit 
                de rétractation, sauf exceptions légales.
              </p>
              <div>
                <h4 className="font-semibold mb-2">Exceptions au droit de rétractation :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li>Prestations de services entièrement exécutées avec accord préalable exprès du client</li>
                  <li>Biens confectionnés selon les spécifications du client ou personnalisés</li>
                  <li>Services dont l'exécution a commencé avec l'accord du client</li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                Pour exercer ce droit, le client doit nous notifier sa décision par email 
                à contact@weblify.fr ou courrier recommandé.
              </p>
            </CardContent>
          </Card>

          {/* Article 11 */}
          <Card>
            <CardHeader>
              <CardTitle>Article 11 - Médiation et résolution des litiges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                En cas de litige, nous privilégions une résolution amiable. 
                Si aucune solution n'est trouvée, le client peut recourir gratuitement 
                à la médiation de la consommation.
              </p>
              <div>
                <h4 className="font-semibold mb-2">Médiateur compétent :</h4>
                <p className="text-muted-foreground">
                  <strong>Médiateur des Entreprises</strong><br />
                  Site web : www.economie.gouv.fr/mediation-entreprises<br />
                  Adresse : Médiateur des entreprises, 75634 Paris Cedex 13
                </p>
              </div>
              <p className="text-muted-foreground">
                À défaut de résolution par médiation, les tribunaux de Paris seront compétents. 
                Le droit français s'applique aux présentes conditions générales de vente.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pour toute question concernant ces conditions générales de vente :
              </p>
              <div className="mt-4 space-y-1 text-muted-foreground">
                <p><strong>Weblify</strong></p>
                <p><strong>Email :</strong> contact@weblify.fr</p>
                <p><strong>Téléphone :</strong> +33 (0)1 23 45 67 89</p>
                <p><strong>Adresse :</strong> Paris, France</p>
              </div>
            </CardContent>
          </Card>

          {/* Dernière mise à jour */}
          <div className="text-center text-sm text-muted-foreground pt-8">
            <p>Conditions générales de vente en vigueur au 1er janvier 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}