import { useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, User, Download, BookOpen } from 'lucide-react';
import Breadcrumbs from '@/components/ui/breadcrumbs';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Articles de blog (même données que dans blog.tsx)
const blogPosts = [
  {
    id: 1,
    title: "Pourquoi travailler avec une agence humaine ?",
    excerpt: "À l'ère de l'automatisation, découvrez pourquoi l'approche humaine fait toute la différence dans la création de votre site web.",
    content: `Dans un monde où les templates automatisés et les constructeurs de sites pullulent, choisir une agence humaine peut sembler contre-intuitif. Pourtant, c'est exactement cette approche personnalisée qui transforme un simple site web en véritable outil de croissance pour votre entreprise.

## L'humain au cœur de la création

Chez Weblify Studio, chaque projet commence par une conversation. Pas un formulaire automatisé, pas un chatbot, mais un vrai échange avec Noah, le fondateur. Cette approche nous permet de comprendre non seulement vos besoins techniques, mais aussi vos ambitions, votre personnalité et votre vision.

## Créativité vs Standardisation

Les outils automatisés vous proposent des templates prémâchés. Nous, nous créons votre identité numérique unique. Chaque couleur, chaque typographie, chaque interaction est pensée pour VOTRE marque, pas pour ressembler aux milliers d'autres sites générés par les mêmes outils.

## Support réactif et personnalisé

Quand vous avez une question à 23h un vendredi, vous n'avez pas envie de parler à un robot. Notre support humain comprend vos urgences, vos contraintes métier et peut prendre des décisions rapides pour débloquer vos situations.

## Évolution continue

Un site web n'est jamais "fini". Avec une agence humaine, vous avez un partenaire qui grandit avec votre entreprise, qui comprend votre évolution et peut anticiper vos besoins futurs.`,
    author: "Noah Delenclos",
    publishDate: "2025-01-15",
    readTime: "5 min",
    category: "Stratégie",
    slug: "pourquoi-agence-humaine",
    featured: true,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Les 5 erreurs les plus fréquentes sur un site vitrine",
    excerpt: "Évitez ces pièges classiques qui peuvent compromettre l'efficacité de votre présence en ligne et découvrez comment les corriger.",
    content: `Après avoir audité des centaines de sites vitrines, j'ai identifié 5 erreurs récurrentes qui nuisent gravement à leur performance. Ces erreurs sont souvent invisibles aux yeux des propriétaires, mais critiques pour les visiteurs et les moteurs de recherche.

## 1. Navigation confuse et menu surchargé

**Le problème :** Des menus avec 12 sections, des sous-menus à rallonge, des libellés flous comme "Nos solutions innovantes".

**La solution :** Maximum 7 éléments dans le menu principal. Utilisez des termes clairs : "Nos services" plutôt que "Notre expertise multiservices". Testez votre navigation avec de vrais utilisateurs.

## 2. Temps de chargement catastrophique

**Le problème :** Images non optimisées, plugins inutiles, hébergement bas de gamme. Résultat : 8 secondes de chargement.

**La solution :** Optimisation des images (WebP, compression), choix d'un hébergement performant, audit technique régulier. Objectif : moins de 3 secondes sur mobile.

## 3. Contenu générique et sans personnalité

**Le problème :** "Nous sommes une entreprise dynamique et innovante..." Stop. Tout le monde écrit ça.

**La solution :** Racontez VOTRE histoire. Pourquoi vous ? Quels résultats concrets pour vos clients ? Montrez votre différence avec des exemples précis.

## 4. Absence totale de Call-to-Action

**Le problème :** Votre visiteur lit votre site, trouve ça intéressant, et... repart. Aucun bouton, aucune incitation à l'action.

**La solution :** Un CTA clair sur chaque page. "Demander un devis", "Prendre rendez-vous", "Télécharger le guide". Guidez vos visiteurs vers l'action que vous souhaitez.

## 5. Site non-mobile ou mal adapté

**Le problème :** En 2025, 70% du trafic web est mobile. Si votre site bug sur smartphone, vous perdez 7 visiteurs sur 10.

**La solution :** Design mobile-first, tests sur vrais appareils, optimisation tactile. Votre site doit être parfait sur mobile AVANT d'être beau sur desktop.`,
    author: "Noah Delenclos", 
    publishDate: "2025-01-10",
    readTime: "7 min",
    category: "UX/UI",
    slug: "5-erreurs-site-vitrine",
    featured: true,
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&h=400&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Weblify Studio : notre vision de la création digitale",
    excerpt: "Plongez dans les coulisses de notre agence et découvrez notre philosophie : allier créativité, technique et stratégie humaine.",
    content: `Depuis la création de Weblify Studio en 2025, notre mission est claire : démocratiser l'accès à un web de qualité. Chaque projet est une opportunité de créer quelque chose d'unique, qui raconte votre histoire.

## Notre philosophie : l'excellence accessible

Trop souvent, les petites entreprises se retrouvent face à un choix impossible : soit un site générique à prix cassé, soit une solution sur-mesure hors budget. Chez Weblify Studio, nous refusons cette fausse alternative.

## Créativité sans compromis

Chaque client mérite un design unique. Pas un thème WordPress retouché, pas un template Wix personnalisé, mais une création 100% originale qui reflète son identité et ses valeurs.

## Technique moderne, approche humaine

Nous utilisons les dernières technologies (React, Node.js, optimisations performance) mais toujours avec une approche humaine. Pas de jargon technique incompréhensible, pas de sur-complexité inutile.

## Partenariat long terme

Un site web n'est pas un produit qu'on livre et qu'on oublie. C'est un outil vivant qui doit évoluer avec votre entreprise. Nous accompagnons nos clients dans leur croissance digitale sur le long terme.

## Résultats mesurables

Belle philosophie, mais concrètement ? Nos clients voient en moyenne 40% d'augmentation de leur trafic dans les 3 premiers mois, et 60% d'amélioration de leur taux de conversion.`,
    author: "Noah Delenclos",
    publishDate: "2025-01-05",
    readTime: "4 min",
    category: "Agence",
    slug: "vision-weblify-studio",
    featured: false,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Tendances web 2025 : ce qui va marquer l'année",
    excerpt: "Explorez les nouvelles tendances design et développement qui définiront l'expérience web cette année.",
    content: `L'année 2025 apporte son lot d'innovations dans le domaine du web design. Entre micro-interactions sophistiquées, IA intégrée et éco-conception, découvrez ce qui va transformer votre approche du digital.

## 1. Micro-interactions émotionnelles

Fini les animations gratuites ! En 2025, chaque micro-interaction doit avoir un sens. Boutons qui réagissent au survol, formulaires qui guident en temps réel, transitions qui racontent une histoire.

**Exemple concret :** Un bouton de validation qui se transforme en coche verte avec une légère vibration (sur mobile) créé une sensation de réussite immédiate.

## 2. Technologies avancées intégrées

Les technologies intelligentes ne sont plus un gadget, c'est un outil au service de l'expérience utilisateur. Chatbots dynamiques, personnalisation de contenu, optimisation automatique des performances.

**Notre approche :** Intégration discrète mais efficace. L'utilisateur bénéficie de ces technologies sans même s'en rendre compte.

## 3. Éco-conception obligatoire

Les sites éco-responsables ne sont plus un nice-to-have, c'est une nécessité. Optimisation énergétique, hébergement vert, code allégé.

**Impact réel :** Un site éco-conçu consomme 70% d'énergie en moins et se charge 50% plus vite. Bon pour la planète ET pour vos conversions.

## 4. Design inclusif par défaut

Accessibilité, contraste adapté, navigation au clavier, support des lecteurs d'écran. L'inclusivité n'est pas une option, c'est la base d'un web moderne.

## 5. Performance extrême

En 2025, la patience des utilisateurs tend vers zéro. Moins de 2 secondes de chargement, 90+ sur PageSpeed Insights, optimisation mobile parfaite.

**Résultat :** Chaque seconde gagnée = 7% de conversions en plus.`,
    author: "Noah Delenclos",
    publishDate: "2025-01-20",
    readTime: "6 min",
    category: "Tendances",
    slug: "tendances-web-2025",
    featured: false,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop&q=80"
  },
  {
    id: 5,
    title: "SEO en 2025 : optimiser sans compromis sur l'UX",
    excerpt: "Comment concilier référencement naturel et expérience utilisateur exceptionnelle dans vos projets web.",
    content: `Le SEO a énormément évolué. Fini le temps où l'on bourrait de mots-clés ! Aujourd'hui, Google privilégie l'expérience utilisateur. Découvrez nos techniques pour allier performance SEO et design élégant.

## La révolution Core Web Vitals

Google juge désormais votre site sur des critères UX concrets :
- **LCP (Largest Contentful Paint) :** moins de 2,5 secondes
- **FID (First Input Delay) :** moins de 100 millisecondes  
- **CLS (Cumulative Layout Shift) :** moins de 0,1

**Notre méthode :** Optimisation technique invisible pour l'utilisateur, maximale pour Google.

## Contenu de qualité vs bourrage de mots-clés

**Ancienne méthode :** "Agence web Paris, création site web Paris, développeur web Paris..." 50 fois sur la page.

**Nouvelle approche :** Contenu naturel, utile, qui répond aux vraies questions des utilisateurs. Google comprend désormais le contexte, pas besoin de répéter bêtement.

## SEO technique moderne

- **Schema.org :** Données structurées pour que Google comprenne votre contenu
- **Core Web Vitals :** Performance technique optimisée
- **Mobile-first :** Google indexe d'abord la version mobile
- **HTTPS :** Sécurité obligatoire

## L'importance des signaux UX

Google surveille maintenant :
- Temps passé sur la page
- Taux de rebond
- Interactions utilisateur
- Partages sociaux

**Conséquence :** Un site beau et fonctionnel rank mieux qu'un site optimisé mais mal conçu.

## SEO local pour les entreprises physiques

Si vous avez une adresse physique :
- Fiche Google Business optimisée
- Avis clients authentiques
- Citations locales cohérentes
- Contenu géolocalisé naturel

**Résultat :** Visibilité maximum dans votre zone de chalandise.`,
    author: "Noah Delenclos",
    publishDate: "2025-01-12",
    readTime: "8 min",
    category: "SEO",
    slug: "seo-2025-ux",
    featured: false,
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=400&fit=crop&q=80"
  },
  {
    id: 6,
    title: "Coulisses d'un projet : de l'idée à la mise en ligne",
    excerpt: "Suivez pas à pas la création d'un site e-commerce, avec ses défis, découvertes et solutions créatives.",
    content: `Retour d'expérience sur un projet e-commerce challengeant : comment nous avons transformé une boutique physique parisienne en success story digitale, avec tous les obstacles surmontés.

## Le contexte : une maroquinerie artisanale

Marie, artisane maroquinière dans le Marais, réalisait 90% de ses ventes en boutique. Problème : la crise a fermé son magasin 3 mois. Objectif : créer un e-commerce en 15 jours pour sauver son activité.

## Défi n°1 : La photographie produit

**Le problème :** 200 sacs uniques, tous différents, à photographier avec qualité professionnelle.

**La solution :** Studio photo mobile installé dans son atelier. 3 jours intensifs avec un photographe partenaire. Résultat : photos consistantes avec l'identité artisanale de la marque.

## Défi n°2 : Gestion des stocks uniques

**Le problème :** Chaque sac est unique (cuir différent, finitions personnalisées). Impossible d'utiliser un système de stock classique.

**La solution :** Développement d'un système sur-mesure. Chaque produit a son ID unique, avec photos et caractéristiques spécifiques. Intégration avec son processus de création artisanale.

## Défi n°3 : Raconter l'artisanat en ligne

**Le problème :** Comment transmettre la qualité du travail artisanal à travers un écran ?

**La solution :** 
- Vidéos courtes du processus de création
- Description détaillée de chaque étape
- Certificat d'authenticité numérique
- Histoire personnelle de chaque pièce

## Les résultats après 6 mois

- **Chiffre d'affaires :** +180% par rapport à avant la crise
- **Panier moyen :** 15% plus élevé qu'en boutique
- **Clientèle :** Élargie à toute la France
- **Production :** Carnet de commandes plein pour 3 mois

## Lessons learned

1. **L'urgence peut booster la créativité** : 15 jours nous ont forcés à l'essentiel
2. **L'authenticité vend** : Les clients online cherchent du vrai
3. **La technique au service de l'humain** : Le code ne doit jamais écraser l'artisanat`,
    author: "Noah Delenclos",
    publishDate: "2025-01-08",
    readTime: "10 min",
    category: "Cas d'étude",
    slug: "coulisses-projet-ecommerce",
    featured: false,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&q=80"
  }
];

// Fonction pour convertir le markdown basique en HTML
const parseMarkdown = (content: string) => {
  return content
    .replace(/## (.*)/g, '<h2 class="text-2xl font-bold mb-4 mt-8">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/- (.*)/g, '<li class="ml-4">$1</li>')
    .replace(/\n\n/g, '<p class="mb-4">')
    .replace(/\n/g, '<br/>');
};

export default function BlogPost() {
  const [match, params] = useRoute('/blog/:slug');
  
  const post = match && params?.slug ? blogPosts.find(p => p.slug === params.slug) : null;
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // SEO dynamique pour chaque article
    if (post) {
      document.title = `${post.title} | Blog Weblify Studio - Expert Web Paris`;
      
      // Meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `${post.excerpt} | Blog expert par Noah Delenclos - Weblify Studio Paris`);
      }
      
      // Meta keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', `${post.category.toLowerCase()}, développement web, ${post.slug.replace(/-/g, ' ')}, noah delenclos, weblify studio, blog expert web`);
      }
      
      // Schema.org pour l'article
      const existingScript = document.querySelector('script[data-blog-post]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.setAttribute('data-blog-post', 'true');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "datePublished": post.publishDate,
        "dateModified": post.publishDate,
        "author": {
          "@type": "Person",
          "name": post.author,
          "url": "https://weblify-studio.com/a-propos"
        },
        "publisher": {
          "@type": "Organization", 
          "name": "Weblify Studio",
          "logo": {
            "@type": "ImageObject",
            "url": "https://weblify-studio.com/Logo_entier.svg"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://weblify-studio.com/blog/${post.slug}`
        },
        "articleSection": post.category,
        "keywords": `${post.category}, développement web, ${post.slug.replace(/-/g, ', ')}, weblify studio`,
        "wordCount": post.content.split(' ').length,
        "timeRequired": post.readTime,
        "url": `https://weblify-studio.com/blog/${post.slug}`
      });
      document.head.appendChild(script);
    }
    
    return () => {
      // Nettoyage
      document.title = "Weblify Studio - Agence Web Paris | Sites Internet Sur-Mesure | Noah Delenclos";
      const blogScript = document.querySelector('script[data-blog-post]');
      if (blogScript) {
        blogScript.remove();
      }
    };
  }, [post]);

  if (!match || !params?.slug || !post) {
    return (
      <div className="pt-28 pb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
        <Link href="/blog" onClick={scrollToTop}>
          <Button>Retour au blog</Button>
        </Link>
      </div>
    );
  }

  // Articles similaires (même catégorie, différent article)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Fonction de téléchargement de l'article
  const downloadArticle = () => {
    const content = `${post.title}
    
${post.excerpt}

Auteur: ${post.author}
Date: ${new Date(post.publishDate).toLocaleDateString('fr-FR')}
Temps de lecture: ${post.readTime}
Catégorie: ${post.category}

---

${post.content}

---

© 2025 Weblify Studio - https://weblify-studio.com
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${post.slug}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-8" items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title }
        ]} />
        
        {/* Breadcrumb et retour */}
        <div className="mb-8">
          <Link href="/blog" onClick={scrollToTop}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Button>
          </Link>
        </div>

        {/* Header de l'article */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Badge variant="outline" className="text-primary border-primary mb-4">
              {post.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            
            {/* Métadonnées */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.publishDate).toLocaleDateString('fr-FR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime} de lecture</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Article détaillé</span>
              </div>
            </div>

            {/* Image principale */}
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-12">
              <img 
                src={post.image} 
                alt={post.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Contenu de l'article */}
          <article className="prose prose-lg max-w-none">
            <div 
              className="text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: parseMarkdown(post.content) 
              }}
            />
          </article>

          {/* Actions */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground mb-2">Télécharger cet article</p>
                <Button size="sm" variant="outline" onClick={downloadArticle}>
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
              </div>
              <Link href="/contact" onClick={scrollToTop}>
                <Button>
                  Discutons de votre projet
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Articles similaires */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Articles similaires</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge variant="outline" className="absolute top-4 left-4 bg-white/90 text-primary border-primary backdrop-blur-sm">
                      {relatedPost.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{new Date(relatedPost.publishDate).toLocaleDateString('fr-FR')}</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                    <Link href={`/blog/${relatedPost.slug}`} onClick={scrollToTop}>
                      <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary/10">
                        Lire l'article
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}