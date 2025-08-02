import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import Breadcrumbs from '@/components/ui/breadcrumbs';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const blogPosts = [
  {
    id: 1,
    title: "Les tendances web design 2025 : Minimalisme et performances",
    excerpt: "Découvrez les dernières tendances en matière de design web pour 2025, avec un focus sur le minimalisme, les performances et l'expérience utilisateur.",
    category: "Design",
    readTime: "5 min",
    publishDate: "2025-02-01",
    author: "Noah Delenclos",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234f46e5;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%237c3aed;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='%23f8fafc'/%3E%3Crect x='20' y='20' width='360' height='210' fill='url(%23grad1)' opacity='0.1' rx='12'/%3E%3Ccircle cx='100' cy='80' r='20' fill='%234f46e5' opacity='0.3'/%3E%3Ccircle cx='300' cy='150' r='25' fill='%237c3aed' opacity='0.2'/%3E%3Crect x='150' y='90' width='100' height='6' fill='%234f46e5' opacity='0.4' rx='3'/%3E%3Crect x='150' y='110' width='80' height='4' fill='%234f46e5' opacity='0.3' rx='2'/%3E%3Ctext x='200' y='180' font-family='Arial' font-size='16' font-weight='bold' fill='%234f46e5' text-anchor='middle'%3ETendances 2025%3C/text%3E%3C/svg%3E"
  },
  {
    id: 2,
    title: "Comment optimiser le SEO de votre site web en 2025",
    excerpt: "Guide complet pour améliorer le référencement naturel de votre site web avec les dernières techniques SEO approuvées par Google.",
    category: "SEO",
    readTime: "8 min",
    publishDate: "2025-01-28",
    author: "Noah Delenclos",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2310b981;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23059669;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='%23f8fafc'/%3E%3Crect x='20' y='20' width='360' height='210' fill='url(%23grad2)' opacity='0.1' rx='12'/%3E%3Cpath d='M 80 60 L 120 80 L 160 70 L 200 90 L 240 75 L 280 95 L 320 85' stroke='%2310b981' stroke-width='3' fill='none' opacity='0.6'/%3E%3Ccircle cx='80' cy='60' r='4' fill='%2310b981'/%3E%3Ccircle cx='160' cy='70' r='4' fill='%2310b981'/%3E%3Ccircle cx='240' cy='75' r='4' fill='%2310b981'/%3E%3Ccircle cx='320' cy='85' r='4' fill='%2310b981'/%3E%3Ctext x='200' y='180' font-family='Arial' font-size='16' font-weight='bold' fill='%2310b981' text-anchor='middle'%3ESEO 2025%3C/text%3E%3C/svg%3E"
  },
  {
    id: 3,
    title: "L'importance de la vitesse de chargement pour votre business",
    excerpt: "Pourquoi la performance web est cruciale pour votre business et comment améliorer la vitesse de chargement de votre site.",
    category: "Performance",
    readTime: "6 min",
    publishDate: "2025-01-25",
    author: "Noah Delenclos",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f59e0b;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23d97706;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='%23f8fafc'/%3E%3Crect x='20' y='20' width='360' height='210' fill='url(%23grad3)' opacity='0.1' rx='12'/%3E%3Ccircle cx='200' cy='125' r='40' fill='none' stroke='%23f59e0b' stroke-width='4' opacity='0.4'/%3E%3Cpath d='M 200 85 L 200 125 L 230 140' stroke='%23f59e0b' stroke-width='3' opacity='0.6'/%3E%3Ccircle cx='200' cy='125' r='3' fill='%23f59e0b'/%3E%3Ctext x='200' y='200' font-family='Arial' font-size='16' font-weight='bold' fill='%23f59e0b' text-anchor='middle'%3EPerformance Web%3C/text%3E%3C/svg%3E"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <Breadcrumbs />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Blog <span className="text-primary">Weblify</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Conseils, tutoriels et actualités sur le développement web, le design et le marketing digital.
              Restez à jour avec les dernières tendances du secteur.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid gap-8 md:gap-12">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishDate).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                        </div>
                        
                        <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                      
                      <Link href={`/blog/${post.id}`} onClick={scrollToTop}>
                        <Button variant="outline" className="group/btn">
                          Lire l'article
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}