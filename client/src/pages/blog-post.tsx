import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useParams } from 'wouter';
import Breadcrumbs from '@/components/ui/breadcrumbs';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const blogPosts = [
  {
    id: 1,
    title: "Les tendances web design 2025 : Minimalisme et performances",
    excerpt: "Découvrez les dernières tendances en matière de design web pour 2025",
    category: "Design",
    readTime: "5 min",
    publishDate: "2025-02-01",
    author: "Noah Delenclos",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234f46e5;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%237c3aed;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='%23f8fafc'/%3E%3Crect x='40' y='40' width='720' height='320' fill='url(%23grad1)' opacity='0.1' rx='20'/%3E%3Ccircle cx='200' cy='120' r='40' fill='%234f46e5' opacity='0.3'/%3E%3Ccircle cx='600' cy='280' r='50' fill='%237c3aed' opacity='0.2'/%3E%3Crect x='300' y='160' width='200' height='12' fill='%234f46e5' opacity='0.4' rx='6'/%3E%3Crect x='300' y='190' width='160' height='8' fill='%234f46e5' opacity='0.3' rx='4'/%3E%3Ctext x='400' y='250' font-family='Arial' font-size='24' font-weight='bold' fill='%234f46e5' text-anchor='middle'%3ETendances Design 2025%3C/text%3E%3C/svg%3E",
    content: `
      <p>Le monde du web design évolue constamment, et 2025 ne fait pas exception. Cette année marque un tournant vers des approches plus réfléchies et centrées sur l'utilisateur.</p>
      
      <h2>Le minimalisme intelligent</h2>
      <p>Le minimalisme en 2025 ne se contente plus d'être esthétique. Il devient "intelligent" en se concentrant sur l'essentiel tout en maintenant une expérience utilisateur riche. Chaque élément doit avoir une fonction précise.</p>
      
      <h2>Performance avant tout</h2>
      <p>Les Core Web Vitals de Google sont devenus incontournables. Un site qui ne charge pas en moins de 3 secondes perd 50% de ses visiteurs. L'optimisation devient donc une priorité absolue.</p>
      
      <h2>Micro-interactions sophistiquées</h2>
      <p>Les animations subtiles et les micro-interactions créent une expérience engageante sans surcharger l'interface. L'objectif est de guider l'utilisateur naturellement.</p>
      
      <h2>Accessibilité universelle</h2>
      <p>L'accessibilité n'est plus une option mais une obligation. Les designs 2025 intègrent nativement les bonnes pratiques d'accessibilité pour tous les utilisateurs.</p>
    `
  },
  {
    id: 2,
    title: "Comment optimiser le SEO de votre site web en 2025",
    excerpt: "Guide complet pour améliorer le référencement naturel de votre site web",
    category: "SEO",
    readTime: "8 min",
    publishDate: "2025-01-28",
    author: "Noah Delenclos",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2310b981;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23059669;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='%23f8fafc'/%3E%3Crect x='40' y='40' width='720' height='320' fill='url(%23grad2)' opacity='0.1' rx='20'/%3E%3Cpath d='M 120 200 L 200 180 L 280 160 L 360 140 L 440 130 L 520 120 L 600 110 L 680 100' stroke='%2310b981' stroke-width='6' fill='none' opacity='0.6'/%3E%3Ccircle cx='120' cy='200' r='8' fill='%2310b981'/%3E%3Ccircle cx='280' cy='160' r='8' fill='%2310b981'/%3E%3Ccircle cx='440' cy='130' r='8' fill='%2310b981'/%3E%3Ccircle cx='600' cy='110' r='8' fill='%2310b981'/%3E%3Ccircle cx='680' cy='100' r='8' fill='%2310b981'/%3E%3Ctext x='400' y='320' font-family='Arial' font-size='24' font-weight='bold' fill='%2310b981' text-anchor='middle'%3ESEO Optimization 2025%3C/text%3E%3C/svg%3E",
    content: `
      <p>Le SEO en 2025 devient de plus en plus sophistiqué. Google privilégie désormais l'expérience utilisateur et la qualité du contenu plus que jamais.</p>
      
      <h2>Core Web Vitals : les nouveaux critères</h2>
      <p>Les Core Web Vitals sont maintenant des facteurs de classement majeurs. Votre site doit exceller sur :</p>
      <ul>
        <li>LCP (Largest Contentful Paint) : moins de 2.5 secondes</li>
        <li>FID (First Input Delay) : moins de 100 millisecondes</li>
        <li>CLS (Cumulative Layout Shift) : moins de 0.1</li>
      </ul>
      
      <h2>Contenu de qualité et E-A-T</h2>
      <p>Google évalue votre contenu selon les critères E-A-T (Expertise, Autorité, Fiabilité). Créez du contenu expert dans votre domaine.</p>
      
      <h2>Optimisation mobile first</h2>
      <p>Avec l'indexation mobile-first, votre version mobile doit être parfaite. Testez régulièrement sur différents appareils.</p>
      
      <h2>Données structurées et rich snippets</h2>
      <p>Implémentez les données structurées Schema.org pour améliorer l'affichage de vos pages dans les résultats de recherche.</p>
    `
  },
  {
    id: 3,
    title: "L'importance de la vitesse de chargement pour votre business",
    excerpt: "Pourquoi la performance web est cruciale pour votre business",
    category: "Performance",
    readTime: "6 min",
    publishDate: "2025-01-25",
    author: "Noah Delenclos",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f59e0b;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23d97706;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='400' fill='%23f8fafc'/%3E%3Crect x='40' y='40' width='720' height='320' fill='url(%23grad3)' opacity='0.1' rx='20'/%3E%3Ccircle cx='400' cy='200' r='80' fill='none' stroke='%23f59e0b' stroke-width='8' opacity='0.4'/%3E%3Cpath d='M 400 120 L 400 200 L 460 240' stroke='%23f59e0b' stroke-width='6' opacity='0.6'/%3E%3Ccircle cx='400' cy='200' r='6' fill='%23f59e0b'/%3E%3Ctext x='400' y='320' font-family='Arial' font-size='24' font-weight='bold' fill='%23f59e0b' text-anchor='middle'%3EPerformance Web%3C/text%3E%3C/svg%3E",
    content: `
      <p>La vitesse de chargement de votre site web a un impact direct sur votre chiffre d'affaires. Chaque seconde compte pour vos utilisateurs et votre business.</p>
      
      <h2>L'impact sur les conversions</h2>
      <p>Les statistiques sont claires :</p>
      <ul>
        <li>1 seconde de délai = -7% de conversions</li>
        <li>3 secondes de chargement = 32% d'abandons</li>
        <li>5 secondes = 90% d'abandons</li>
      </ul>
      
      <h2>Optimisation des images</h2>
      <p>Les images représentent souvent 60% du poids d'une page. Utilisez :</p>
      <ul>
        <li>Formats modernes (WebP, AVIF)</li>
        <li>Lazy loading pour les images hors écran</li>
        <li>Compression intelligente sans perte de qualité</li>
      </ul>
      
      <h2>Mise en cache efficace</h2>
      <p>Implémentez une stratégie de cache à plusieurs niveaux :</p>
      <ul>
        <li>Cache navigateur pour les ressources statiques</li>
        <li>CDN pour la distribution mondiale</li>
        <li>Cache serveur pour les données dynamiques</li>
      </ul>
      
      <h2>Monitoring continu</h2>
      <p>Surveillez vos performances en continu avec des outils comme PageSpeed Insights, GTmetrix et WebPageTest.</p>
    `
  }
];

export default function BlogPost() {
  const params = useParams();
  const postId = parseInt(params?.slug || '1');
  const post = blogPosts.find(p => p.id === postId) || blogPosts[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <Breadcrumbs />
        </div>
      </div>

      {/* Article */}
      <article className="py-16">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back Button */}
            <Link href="/blog" onClick={scrollToTop}>
              <Button variant="ghost" className="mb-8 -ml-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au blog
              </Button>
            </Link>

            {/* Article Header */}
            <header className="mb-12">
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4">
                  {post.category}
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  {post.title}
                </h1>
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.publishDate).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 lg:h-96 object-cover"
                />
              </div>
            </header>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Article Footer */}
            <footer className="mt-16 pt-8 border-t border-border">
              <div className="flex justify-between items-center">
                <Link href="/blog" onClick={scrollToTop}>
                  <Button variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Tous les articles
                  </Button>
                </Link>
                <Link href="/contact" onClick={scrollToTop}>
                  <Button>
                    Parler de votre projet
                  </Button>
                </Link>
              </div>
            </footer>
          </motion.div>
        </div>
      </article>
    </div>
  );
}