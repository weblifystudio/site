import { Badge } from '@/components/ui/badge';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Breadcrumbs from '@/components/ui/breadcrumbs';

export default function Legal() {
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
            Mentions Légales
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Mentions Légales
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Informations légales et conditions d'utilisation du site Weblify Studio
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Identification */}
          <Card>
            <CardHeader>
              <CardTitle>1. Identification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Éditeur du site :</h4>
                <p className="text-muted-foreground">
                  <strong>Weblify Studio</strong><br />
                  Micro-entreprise<br />
                  Représentée par Noah Delenclos<br />
                  Adresse : Paris, France<br />
                  Email : contact@weblify.fr<br />
                  Téléphone : +33 (0)1 23 45 67 89
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Statut juridique :</h4>
                <p className="text-muted-foreground">
                  Micro-entrepreneur (auto-entrepreneur)<br />
                  Numéro SIRET : [942 876 384 00010]<br />
                  Code APE : 6201Z (Programmation informatique)<br />
                  RCS : Non applicable (micro-entreprise)<br />
                  TVA non applicable - Art. 293 B du CGI
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Activité :</h4>
                <p className="text-muted-foreground">
                  Création et développement de sites internet, applications web, 
                  conseil en stratégie digitale
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hébergement */}
          <Card>
            <CardHeader>
              <CardTitle>2. Hébergement et Publication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Hébergeur :</h4>
                <p className="text-muted-foreground">
                  Le site weblify.fr est hébergé par des services d'hébergement professionnels 
                  respectant les normes de sécurité et de confidentialité européennes.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Directeur de publication :</h4>
                <p className="text-muted-foreground">
                  Noah Delenclos, en qualité de représentant légal de Weblify Studio
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Propriété intellectuelle */}
          <Card>
            <CardHeader>
              <CardTitle>3. Propriété Intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                L'ensemble de ce site relève de la législation française et internationale 
                sur le droit d'auteur et la propriété intellectuelle.
              </p>
              <p className="text-muted-foreground">
                Tous les éléments de ce site (textes, images, sons, vidéos, mise en page, 
                logiciels, etc.) sont la propriété exclusive de Weblify Studio, à l'exception 
                des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
              </p>
              <p className="text-muted-foreground">
                Toute reproduction, représentation, modification, publication, adaptation 
                de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, 
                est interdite, sauf autorisation écrite préalable de Weblify Studio.
              </p>
            </CardContent>
          </Card>

          {/* Protection des données */}
          <Card>
            <CardHeader>
              <CardTitle>4. Protection des Données Personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Responsable du traitement :</h4>
                <p className="text-muted-foreground">
                  Noah Delenclos, représentant de Weblify Studio
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Données collectées :</h4>
                <p className="text-muted-foreground">
                  Les données personnelles collectées sur ce site (nom, email, téléphone, message) 
                  le sont uniquement dans le cadre de la prise de contact et de la relation commerciale.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Finalité du traitement :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li>Répondre aux demandes de contact</li>
                  <li>Établir des devis personnalisés</li>
                  <li>Assurer le suivi commercial et la relation client</li>
                  <li>Améliorer nos services</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Conservation des données :</h4>
                <p className="text-muted-foreground">
                  Les données sont conservées pendant la durée nécessaire à la réalisation 
                  des finalités pour lesquelles elles ont été collectées, et au maximum 3 ans 
                  à compter du dernier contact.
                </p>
              </div>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">Vos droits :</h4>
                <p className="text-muted-foreground">
                  Conformément au RGPD, vous disposez des droits suivants sur vos données : 
                  droit d'accès, de rectification, de suppression, de limitation du traitement, 
                  de portabilité et d'opposition. Pour exercer ces droits, contactez-nous à : 
                  contact@weblify.fr
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle>5. Cookies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Ce site utilise des cookies techniques nécessaires à son bon fonctionnement 
                et des cookies de mesure d'audience pour améliorer l'expérience utilisateur.
              </p>
              <div>
                <h4 className="font-semibold mb-2">Types de cookies utilisés :</h4>
                <ul className="text-muted-foreground list-disc list-inside space-y-1">
                  <li>Cookies techniques : nécessaires au fonctionnement du site</li>
                  <li>Cookies de préférences : mémorisation de vos choix (thème sombre/clair)</li>
                  <li>Cookies de mesure d'audience : statistiques de visite anonymisées</li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                Vous pouvez à tout moment modifier vos préférences de cookies ou les supprimer 
                via les paramètres de votre navigateur.
              </p>
            </CardContent>
          </Card>

          {/* Responsabilité */}
          <Card>
            <CardHeader>
              <CardTitle>6. Limitation de Responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Weblify s'efforce de fournir sur le site des informations aussi précises que possible. 
                Toutefois, il ne pourra être tenu responsable des omissions, inexactitudes et carences 
                dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires 
                qui lui fournissent ces informations.
              </p>
              <p className="text-muted-foreground">
                Weblify ne pourra être tenu responsable des dommages directs et indirects causés 
                au matériel de l'utilisateur lors de l'accès au site, et résultant soit de 
                l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, 
                soit de l'apparition d'un bug ou d'une incompatibilité.
              </p>
            </CardContent>
          </Card>

          {/* Médiation */}
          <Card>
            <CardHeader>
              <CardTitle>7. Médiation de la Consommation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Conformément à l'article L.616-1 du Code de la consommation, en cas de litige, 
                vous pouvez recourir gratuitement à un médiateur de la consommation.
              </p>
              <div>
                <h4 className="font-semibold mb-2">Médiateur compétent :</h4>
                <p className="text-muted-foreground">
                  <strong>Médiateur des Entreprises</strong><br />
                  Site web : www.economie.gouv.fr/mediation-entreprises<br />
                  Par courrier : Médiateur des entreprises, 75634 Paris Cedex 13
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Droit applicable */}
          <Card>
            <CardHeader>
              <CardTitle>8. Droit Applicable et Juridiction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Tout litige en relation avec l'utilisation du site weblify.fr est soumis 
                au droit français. En cas d'échec de la médiation, il est fait attribution 
                exclusive de juridiction aux tribunaux compétents de Paris.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>9. Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pour toute question concernant ces mentions légales ou l'utilisation du site, 
                vous pouvez nous contacter :
              </p>
              <div className="mt-4 space-y-1 text-muted-foreground">
                <p><strong>Email :</strong> contact@weblify.fr</p>
                <p><strong>Téléphone :</strong> +33 (0)1 23 45 67 89</p>
                <p><strong>Adresse :</strong> Paris, France</p>
              </div>
            </CardContent>
          </Card>

          {/* Dernière mise à jour */}
          <div className="text-center text-sm text-muted-foreground pt-8">
            <p>Dernière mise à jour : Janvier 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
