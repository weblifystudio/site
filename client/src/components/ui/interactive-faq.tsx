import { useState, useMemo } from 'react';
import { MessageSquare, Clock, Settings, Euro } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'technique' | 'prix' | 'delais' | 'maintenance';
  tags: string[];
  popular?: boolean;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'Combien coûte un site web professionnel ?',
    answer: 'Nos tarifs démarrent à 800€ pour un site vitrine (5-8 pages), 1500€ pour un site premium avec fonctionnalités avancées, et à partir de 2500€ pour un e-commerce. Le prix final dépend de vos besoins spécifiques : nombre de pages, fonctionnalités, délais, etc. Utilisez notre calculateur en ligne pour une estimation personnalisée.',
    category: 'prix',
    tags: ['tarif', 'coût', 'budget', 'prix'],
    popular: true
  },
  {
    id: '2',
    question: 'Combien de temps pour créer mon site ?',
    answer: 'En moyenne, nous livrons un site vitrine en 7 jours, un site premium en 10-14 jours, et un e-commerce en 14-21 jours. Ces délais peuvent être réduits avec notre option "livraison express" (supplément de 30%). Nous respectons toujours les délais convenus.',
    category: 'delais',
    tags: ['délai', 'livraison', 'durée', 'temps'],
    popular: true
  },
  {
    id: '3',
    question: 'Mon site sera-t-il optimisé pour mobile ?',
    answer: 'Absolument ! Tous nos sites sont développés en "mobile-first", garantissant une expérience parfaite sur smartphone, tablette et ordinateur. Nous testons sur tous les appareils populaires avant livraison.',
    category: 'technique',
    tags: ['mobile', 'responsive', 'smartphone', 'tablette'],
    popular: true
  },
  {
    id: '4',
    question: 'Qu\'est-ce qui est inclus dans vos prestations ?',
    answer: 'Chaque prestation inclut : design sur-mesure, développement responsive, optimisation SEO de base, formulaire de contact, hébergement 1 an, nom de domaine .fr/.com, formation à la gestion du contenu, et 1 mois de support gratuit après livraison.',
    category: 'general',
    tags: ['inclus', 'prestation', 'service', 'package'],
    popular: true
  },
  {
    id: '5',
    question: 'Puis-je modifier mon site après livraison ?',
    answer: 'Oui ! Nous vous formons à la gestion de votre contenu via une interface simple. Pour des modifications de design ou nouvelles fonctionnalités, nous proposons un service de maintenance avec tarifs préférentiels.',
    category: 'maintenance',
    tags: ['modification', 'gestion', 'contenu', 'formation']
  },
  {
    id: '6',
    question: 'Mon site sera-t-il bien référencé sur Google ?',
    answer: 'Nous intégrons les bonnes pratiques SEO dès la conception : structure optimisée, méta-descriptions, sitemap, temps de chargement rapide. Pour un référencement poussé, nous proposons des prestations SEO dédiées.',
    category: 'technique',
    tags: ['SEO', 'référencement', 'Google', 'visibilité']
  },
  {
    id: '7',
    question: 'Proposez-vous des forfaits de maintenance ?',
    answer: 'Oui, nous proposons plusieurs forfaits : maintenance de base (30€/mois) incluant mises à jour et sauvegardes, maintenance premium (80€/mois) avec modifications illimitées et support prioritaire.',
    category: 'maintenance',
    tags: ['maintenance', 'forfait', 'support', 'mise à jour']
  },
  {
    id: '8',
    question: 'Que se passe-t-il si je ne suis pas satisfait ?',
    answer: 'Nous offrons jusqu\'à 3 révisions gratuites du design. Si vous n\'êtes toujours pas satisfait, nous remboursons 50% de l\'acompte versé. Notre objectif est votre satisfaction totale.',
    category: 'general',
    tags: ['satisfaction', 'révision', 'remboursement', 'garantie']
  },
  {
    id: '9',
    question: 'Pouvez-vous refaire mon site existant ?',
    answer: 'Oui, nous proposons des prestations de refonte complète. Nous analysons votre site actuel, récupérons le contenu pertinent et créons une version moderne, rapide et optimisée.',
    category: 'general',
    tags: ['refonte', 'redesign', 'modernisation', 'amélioration']
  },
  {
    id: '10',
    question: 'Travaillez-vous avec tous les secteurs d\'activité ?',
    answer: 'Nous travaillons avec tous les secteurs : restaurants, cabinets médicaux, artisans, e-commerce, startups, associations, etc. Chaque projet est adapté aux spécificités de votre métier.',
    category: 'general',
    tags: ['secteur', 'activité', 'métier', 'spécialisation']
  },
  {
    id: '11',
    question: 'Mon site sera-t-il sécurisé et conforme RGPD ?',
    answer: 'Oui, nous intégrons systématiquement : certificat SSL gratuit, protection contre les attaques, sauvegardes automatiques, cookies conformes RGPD, politique de confidentialité, et mentions légales adaptées à votre activité.',
    category: 'technique',
    tags: ['sécurité', 'RGPD', 'SSL', 'protection', 'conformité'],
    popular: true
  },
  {
    id: '12',
    question: 'Comment se déroule concrètement un projet ?',
    answer: 'Étape 1 : Briefing détaillé et devis (24h). Étape 2 : Validation et acompte de 50%. Étape 3 : Création avec points réguliers. Étape 4 : Révisions et ajustements. Étape 5 : Livraison et formation. Communication via email, WhatsApp ou visio selon vos préférences.',
    category: 'general',
    tags: ['process', 'étapes', 'déroulement', 'communication'],
    popular: true
  },
  {
    id: '13',
    question: 'Quand et comment dois-je payer ?',
    answer: 'Acompte de 50% à la validation du devis, solde à la livraison. Paiement par virement, chèque ou PayPal. Aucun paiement avant d\'avoir validé votre maquette. Facture avec TVA fournie.',
    category: 'prix',
    tags: ['paiement', 'facturation', 'acompte', 'TVA'],
    popular: true
  },
  {
    id: '14',
    question: 'Quelles technologies utilisez-vous ?',
    answer: 'Nous utilisons les technologies modernes : React/TypeScript pour les applications web, WordPress pour les sites simples, bases de données PostgreSQL, hébergement cloud sécurisé, et outils d\'optimisation performance (Lighthouse 90+).',
    category: 'technique',
    tags: ['technologie', 'React', 'WordPress', 'moderne', 'performance']
  },
  {
    id: '15',
    question: 'Que se passe-t-il en cas de panne de mon site ?',
    answer: 'Support d\'urgence 7j/7 pour les pannes critiques. Surveillance automatique, sauvegardes quotidiennes, restauration en moins de 4h. Pendant le 1er mois : intervention gratuite. Ensuite : forfait maintenance recommandé.',
    category: 'maintenance',
    tags: ['panne', 'urgence', 'support', 'surveillance', 'restauration']
  },
  {
    id: '16',
    question: 'Puis-je avoir accès aux statistiques de mon site ?',
    answer: 'Oui ! Nous installons Google Analytics 4, Search Console, et un tableau de bord simple. Vous recevez un rapport mensuel avec : visiteurs, pages populaires, sources de trafic, et conseils d\'amélioration.',
    category: 'technique',
    tags: ['statistiques', 'analytics', 'rapport', 'données', 'suivi']
  },
  {
    id: '17',
    question: 'Pour un e-commerce, comment ça marche pour les paiements ?',
    answer: 'Nous intégrons Stripe (leader mondial) : cartes bancaires, PayPal, Apple Pay. Frais : 1,4% + 0,25€ par transaction (standard Stripe). Paiements sécurisés, conformes PCI-DSS. Virements automatiques sur votre compte.',
    category: 'technique',
    tags: ['e-commerce', 'paiement', 'Stripe', 'commissions', 'sécurité']
  },
  {
    id: '18',
    question: 'Qui possède le code source et les droits de mon site ?',
    answer: 'Vous êtes propriétaire à 100% : code source, design, contenu, nom de domaine. Pas de dépendance, pas d\'abonnement forcé. Nous vous fournissons tous les accès et fichiers sources à la livraison.',
    category: 'general',
    tags: ['propriété', 'code source', 'droits', 'accès', 'indépendance']
  }
];

const categoryLabels = {
  general: 'Général',
  technique: 'Technique',
  prix: 'Tarifs',
  delais: 'Délais',
  maintenance: 'Maintenance'
};

const categoryIcons = {
  general: MessageSquare,
  technique: Settings,
  prix: Euro,
  delais: Clock,
  maintenance: Settings
};

export default function InteractiveFAQ() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFAQs = useMemo(() => {
    let filtered = faqData;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Sort popular items first
    return filtered.sort((a, b) => {
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return 0;
    });
  }, [selectedCategory]);

  const categories = Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>;

  return (
    <div className="space-y-8">
      {/* Category Filters */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Toutes les questions
          </button>
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            const count = faqData.filter(faq => faq.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center space-x-2 ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{categoryLabels[category]}</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>



      {/* Results Count */}
      {selectedCategory !== 'all' && (
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {filteredFAQs.length} question{filteredFAQs.length > 1 ? 's' : ''} trouvée{filteredFAQs.length > 1 ? 's' : ''}
          {selectedCategory !== 'all' && ` dans la catégorie "${categoryLabels[selectedCategory as keyof typeof categoryLabels]}"`}
        </div>
      )}

      {/* FAQ Accordion */}
      <Accordion type="single" collapsible className="space-y-4">
        {filteredFAQs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            id={`faq-${faq.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
          >
            <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
              <div className="flex items-start justify-between w-full">
                <div className="flex-1 pr-4">
                  <h4 className="font-medium text-base mb-2">{faq.question}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {categoryLabels[faq.category]}
                    </Badge>
                    {faq.popular && (
                      <Badge className="text-xs bg-primary">
                        Populaire
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </div>
              <div className="flex flex-wrap gap-1 mt-4">
                {faq.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* No Results */}
      {filteredFAQs.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
            Aucune question trouvée
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Consultez toutes les questions ou changez de catégorie.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
            }}
            className="text-primary hover:underline font-medium"
          >
            Voir toutes les questions
          </button>
        </div>
      )}
    </div>
  );
}