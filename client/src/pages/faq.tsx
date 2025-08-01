import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from 'wouter';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const faqData = [
  {
    category: "Général",
    questions: [
      {
        question: "Combien coûte la création d'un site web ?",
        answer: "Nos tarifs démarrent à 800€ pour un site vitrine basique. Le prix varie selon vos besoins : site vitrine (800€+), site premium (1500€+), ou développement sur-mesure (sur devis). Chaque projet est unique et nous établissons un devis personnalisé après avoir analysé vos besoins spécifiques."
      },
      {
        question: "Combien de temps faut-il pour créer un site web ?",
        answer: "En moyenne, nous livrons les projets en 7 jours. Pour un site vitrine simple : 3-5 jours, un site premium : 7-10 jours, et un développement sur-mesure : 2-4 semaines selon la complexité. Nous vous fournissons un planning détaillé dès le début du projet."
      },
      {
        question: "Proposez-vous l'hébergement et le nom de domaine ?",
        answer: "Oui, nous nous occupons de tout ! L'hébergement première année est inclus dans nos offres, et nous pouvons gérer l'achat et la configuration de votre nom de domaine. Nous travaillons avec des hébergeurs fiables et performants pour garantir la disponibilité de votre site."
      },
      {
        question: "Les sites sont-ils optimisés pour mobile ?",
        answer: "Absolument ! Tous nos sites sont 100% responsive et optimisés pour tous les appareils (smartphones, tablettes, ordinateurs). Nous testons sur différents appareils et navigateurs pour garantir une expérience utilisateur parfaite partout."
      }
    ]
  },
  {
    category: "Processus",
    questions: [
      {
        question: "Comment se déroule un projet de création de site ?",
        answer: "Notre processus en 4 étapes : 1) Analyse de vos besoins et établissement du cahier des charges (1-2 jours), 2) Création des maquettes et validation du design (2-3 jours), 3) Développement et intégration (3-4 jours), 4) Tests, mise en ligne et formation (1 jour). Vous êtes impliqué à chaque étape."
      },
      {
        question: "Que dois-je fournir pour démarrer mon projet ?",
        answer: "Nous avons besoin de vos textes, images (logo, photos), informations de contact et une idée claire de vos objectifs. Si vous n'avez pas tout, pas d'inquiétude ! Nous vous accompagnons dans la création du contenu et pouvons vous orienter vers des banques d'images professionnelles."
      },
      {
        question: "Puis-je voir l'avancement de mon projet ?",
        answer: "Oui ! Nous vous tenons informé régulièrement et vous pouvez suivre l'avancement en temps réel. Vous recevez des aperçus à chaque étape importante et pouvez faire vos retours. La communication est transparente tout au long du projet."
      },
      {
        question: "Que se passe-t-il si je ne suis pas satisfait ?",
        answer: "Votre satisfaction est notre priorité. Nous incluons 2-3 révisions dans chaque projet et restons à l'écoute de vos retours. Si vous n'êtes pas satisfait, nous travaillons ensemble jusqu'à ce que le résultat vous convienne parfaitement."
      }
    ]
  },
  {
    category: "Technique",
    questions: [
      {
        question: "Quelles technologies utilisez-vous ?",
        answer: "Nous utilisons des technologies modernes et fiables : React, Vue.js, Next.js pour le front-end, Node.js, Python pour le back-end, et des CMS comme WordPress selon les besoins. Nous choisissons toujours la technologie la plus adaptée à votre projet."
      },
      {
        question: "Mon site sera-t-il rapide et bien référencé ?",
        answer: "Oui ! Nous optimisons chaque site pour la vitesse (temps de chargement < 3 secondes) et le SEO. Nous utilisons les meilleures pratiques : optimisation des images, code propre, structure SEO, balises meta, sitemap... Votre site sera prêt pour Google !"
      },
      {
        question: "Puis-je modifier mon site moi-même après livraison ?",
        answer: "Absolument ! Nous privilégions des solutions faciles à administrer. Selon votre projet, nous utilisons des CMS intuitifs ou créons des interfaces d'administration simples. Nous incluons toujours une formation pour vous rendre autonome."
      },
      {
        question: "Assurez-vous la sécurité de mon site ?",
        answer: "La sécurité est une priorité. Nous intégrons systématiquement : certificat SSL, protection contre les attaques, sauvegardes automatiques, mises à jour de sécurité. Pour les projets complexes, nous proposons des audits de sécurité complémentaires."
      }
    ]
  },
  {
    category: "Après-vente",
    questions: [
      {
        question: "Proposez-vous un support après la livraison ?",
        answer: "Oui ! Chaque projet inclut un support gratuit (30 à 90 jours selon l'offre) pour répondre à vos questions et résoudre d'éventuels problèmes. Nous proposons aussi des contrats de maintenance pour un suivi à long terme."
      },
      {
        question: "Que comprend votre service de maintenance ?",
        answer: "Notre maintenance inclut : mises à jour de sécurité, sauvegardes régulières, monitoring de disponibilité, optimisations de performance, support technique prioritaire. Tarif à partir de 50€/mois selon vos besoins."
      },
      {
        question: "Puis-je faire évoluer mon site plus tard ?",
        answer: "Bien sûr ! Nous concevons nos sites pour qu'ils puissent évoluer. Ajout de fonctionnalités, nouvelles pages, refonte partielle... Nous restons votre partenaire technique pour tous vos futurs besoins digitaux."
      },
      {
        question: "Gardez-vous une copie de mon site ?",
        answer: "Nous conservons une sauvegarde de votre site pendant 6 mois après livraison pour votre sécurité. Vous recevez aussi tous les fichiers sources et accès complets à votre site. Vous êtes propriétaire à 100% de votre site web."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            FAQ
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Questions Fréquentes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus courantes sur nos services, 
            notre processus de travail et nos tarifs.
          </p>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3">
                  {categoryIndex + 1}
                </span>
                {category.category}
              </h2>
              
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((item, questionIndex) => (
                  <AccordionItem 
                    key={questionIndex} 
                    value={`${categoryIndex}-${questionIndex}`}
                    className="border border-border rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-primary/10 to-blue-50 dark:from-primary/20 dark:to-blue-900/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Notre équipe est là pour répondre à toutes vos questions spécifiques. 
            N'hésitez pas à nous contacter pour un conseil personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact" onClick={scrollToTop}>Poser ma question</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/offres" onClick={scrollToTop}>Voir nos offres</Link>
            </Button>
          </div>
        </div>

        {/* Quick Help */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 border border-border rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Besoin d'un devis ?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Obtenez une estimation personnalisée en quelques minutes
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/contact" onClick={scrollToTop}>Demander un devis</Link>
            </Button>
          </div>

          <div className="text-center p-6 border border-border rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Questions techniques ?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Parlons de votre projet et des solutions adaptées
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/contact" onClick={scrollToTop}>Discuter technique</Link>
            </Button>
          </div>

          <div className="text-center p-6 border border-border rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Voir nos réalisations</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Découvrez nos derniers projets et inspirez-vous
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/realisations" onClick={scrollToTop}>Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
