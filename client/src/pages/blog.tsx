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
    title: "Site web professionnel : 7 erreurs fatales qui tuent votre business en 2025",
    excerpt: "Découvrez les 7 erreurs critiques que font 90% des entreprises avec leur site web et qui leur coûtent des milliers d'euros en ventes perdues. Guide complet avec solutions concrètes.",
    category: "Business",
    readTime: "12 min",
    publishDate: "2025-02-02",
    author: "Noah Delenclos",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23dc2626;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23b91c1c;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='%23fef2f2'/%3E%3Crect x='20' y='20' width='360' height='210' fill='url(%23grad1)' opacity='0.1' rx='12'/%3E%3Cpath d='M 200 50 L 180 90 L 220 90 Z' fill='%23dc2626' opacity='0.8'/%3E%3Ctext x='200' y='105' font-family='Arial' font-size='24' font-weight='bold' fill='%23dc2626' text-anchor='middle'%3E!%3C/text%3E%3Crect x='50' y='130' width='60' height='8' fill='%23dc2626' opacity='0.3' rx='4'/%3E%3Crect x='130' y='130' width='80' height='8' fill='%23dc2626' opacity='0.3' rx='4'/%3E%3Crect x='230' y='130' width='70' height='8' fill='%23dc2626' opacity='0.3' rx='4'/%3E%3Crect x='320' y='130' width='50' height='8' fill='%23dc2626' opacity='0.3' rx='4'/%3E%3Ctext x='200' y='200' font-family='Arial' font-size='14' font-weight='bold' fill='%23dc2626' text-anchor='middle'%3E7 Erreurs Fatales%3C/text%3E%3C/svg%3E",
    tags: ["Business", "Conversion", "Erreurs communes", "ROI"]
  },
  {
    id: 2,
    title: "SEO local Paris : Comment dominer Google Maps et attirer 300% de clients en plus",
    excerpt: "Stratégie complète de référencement local pour les entreprises parisiennes. Méthodes exclusives testées sur 50+ entreprises avec résultats chiffrés et études de cas.",
    category: "SEO Local",
    readTime: "15 min",
    publishDate: "2025-01-30",
    author: "Noah Delenclos",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2310b981;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23059669;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='%23f0fdf4'/%3E%3Crect x='20' y='20' width='360' height='210' fill='url(%23grad2)' opacity='0.1' rx='12'/%3E%3Ccircle cx='200' cy='90' r='25' fill='%2310b981' opacity='0.3'/%3E%3Cpath d='M 200 65 L 190 95 L 210 95 Z' fill='%2310b981' opacity='0.8'/%3E%3Cpath d='M 120 120 L 160 130 L 200 125 L 240 135 L 280 140' stroke='%2310b981' stroke-width='4' fill='none' opacity='0.7'/%3E%3Ccircle cx='120' cy='120' r='3' fill='%2310b981'/%3E%3Ccircle cx='200' cy='125' r='3' fill='%2310b981'/%3E%3Ccircle cx='280' cy='140' r='3' fill='%2310b981'/%3E%3Ctext x='200' y='200' font-family='Arial' font-size='14' font-weight='bold' fill='%2310b981' text-anchor='middle'%3ESEO Local Paris%3C/text%3E%3C/svg%3E",
    tags: ["SEO Local", "Google Maps", "Paris", "Clients locaux"]
  },
  {
    id: 3,
    title: "Site e-commerce rentable : La méthode complète pour vendre 10 000€/mois en ligne",
    excerpt: "Blueprint complet pour créer un e-commerce profitable. De l'étude de marché au premier 10K€ de CA : stratégies, outils, coûts réels et plan d'action détaillé.",
    category: "E-commerce",
    readTime: "18 min",
    publishDate: "2025-01-25",
    author: "Noah Delenclos",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f59e0b;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23d97706;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='%23fffbeb'/%3E%3Crect x='20' y='20' width='360' height='210' fill='url(%23grad3)' opacity='0.1' rx='12'/%3E%3Crect x='80' y='60' width='40' height='50' fill='%23f59e0b' opacity='0.4' rx='4'/%3E%3Crect x='140' y='70' width='40' height='40' fill='%23f59e0b' opacity='0.5' rx='4'/%3E%3Crect x='200' y='50' width='40' height='60' fill='%23f59e0b' opacity='0.6' rx='4'/%3E%3Crect x='260' y='65' width='40' height='45' fill='%23f59e0b' opacity='0.5' rx='4'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='18' font-weight='bold' fill='%23f59e0b' text-anchor='middle'%3E10 000€%3C/text%3E%3Ctext x='200' y='170' font-family='Arial' font-size='12' fill='%23d97706' text-anchor='middle'%3E/mois%3C/text%3E%3Ctext x='200' y='200' font-family='Arial' font-size='14' font-weight='bold' fill='%23f59e0b' text-anchor='middle'%3EE-commerce Rentable%3C/text%3E%3C/svg%3E",
    tags: ["E-commerce", "Vente en ligne", "CA", "Stratégie business"]
  },
  {
    id: 4,
    title: "WordPress vs React : Quel choix pour votre entreprise en 2025 ? (Comparatif détaillé)",
    excerpt: "Analyse technique et business complète : coûts, performances, maintenance, évolutivité. Guide de décision avec 15 critères d'évaluation et recommandations par secteur.",
    category: "Technique",
    readTime: "10 min",
    publishDate: "2025-01-20",
    author: "Noah Delenclos",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234f46e5;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%237c3aed;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='%23faf5ff'/%3E%3Crect x='20' y='20' width='360' height='210' fill='url(%23grad4)' opacity='0.1' rx='12'/%3E%3Crect x='80' y='80' width='60' height='60' fill='%23206bc4' opacity='0.6' rx='8'/%3E%3Ctext x='110' y='115' font-family='Arial' font-size='14' font-weight='bold' fill='white' text-anchor='middle'%3EWP%3C/text%3E%3Ctext x='200' y='125' font-family='Arial' font-size='20' font-weight='bold' fill='%234f46e5' text-anchor='middle'%3EVS%3C/text%3E%3Ccircle cx='290' cy='110' r='30' fill='%2361dafb' opacity='0.6'/%3E%3Ctext x='290' y='117' font-family='Arial' font-size='12' font-weight='bold' fill='%23282c34' text-anchor='middle'%3EReact%3C/text%3E%3Ctext x='200' y='200' font-family='Arial' font-size='14' font-weight='bold' fill='%234f46e5' text-anchor='middle'%3EWordPress vs React%3C/text%3E%3C/svg%3E",
    tags: ["WordPress", "React", "Comparatif", "Choix technique"]
  },
  {
    id: 5,
    title: "RGPD et sites web : Guide complet 2025 pour éviter les amendes (jusqu'à 20M€)",
    excerpt: "Conformité RGPD complète pour votre site web : cookies, mentions légales, politique de confidentialité, formulaires. Checklist pratique et templates inclus.",
    category: "Juridique",
    readTime: "8 min",
    publishDate: "2025-01-15",
    author: "Noah Delenclos",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='grad5' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%236366f1;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%234338ca;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='%23f0f4ff'/%3E%3Crect x='20' y='20' width='360' height='210' fill='url(%23grad5)' opacity='0.1' rx='12'/%3E%3Crect x='160' y='60' width='80' height='100' fill='%236366f1' opacity='0.3' rx='8'/%3E%3Ccircle cx='200' cy='90' r='15' fill='%236366f1' opacity='0.8'/%3E%3Cpath d='M 195 85 L 198 90 L 205 83' stroke='white' stroke-width='2' fill='none'/%3E%3Crect x='180' y='120' width='40' height='4' fill='%236366f1' opacity='0.6' rx='2'/%3E%3Crect x='180' y='130' width='30' height='4' fill='%236366f1' opacity='0.5' rx='2'/%3E%3Crect x='180' y='140' width='35' height='4' fill='%236366f1' opacity='0.4' rx='2'/%3E%3Ctext x='200' y='200' font-family='Arial' font-size='14' font-weight='bold' fill='%236366f1' text-anchor='middle'%3ERGPD Conformité%3C/text%3E%3C/svg%3E",
    tags: ["RGPD", "Conformité", "Juridique", "Cookies"]
  },
  {
    id: 6,
    title: "Conversion web : 23 techniques prouvées pour doubler vos ventes en ligne",
    excerpt: "Méthodes de conversion testées sur 200+ sites. Optimisation des formulaires, boutons CTA, tunnel d'achat, psychologie utilisateur. ROI moyen : +127% de conversions.",
    category: "Conversion",
    readTime: "14 min",
    publishDate: "2025-01-10",
    author: "Noah Delenclos",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Cdefs%3E%3ClinearGradient id='grad6' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2316a34a;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23059669;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='250' fill='%23f0fdf4'/%3E%3Crect x='20' y='20' width='360' height='210' fill='url(%23grad6)' opacity='0.1' rx='12'/%3E%3Cpath d='M 120 150 L 150 140 L 180 120 L 210 100 L 240 90 L 270 70 L 300 50' stroke='%2316a34a' stroke-width='4' fill='none' opacity='0.8'/%3E%3Ccircle cx='120' cy='150' r='4' fill='%2316a34a'/%3E%3Ccircle cx='180' cy='120' r='4' fill='%2316a34a'/%3E%3Ccircle cx='240' cy='90' r='4' fill='%2316a34a'/%3E%3Ccircle cx='300' cy='50' r='4' fill='%2316a34a'/%3E%3Ctext x='200' y='180' font-family='Arial' font-size='16' font-weight='bold' fill='%2316a34a' text-anchor='middle'%3E+127%25%3C/text%3E%3Ctext x='200' y='200' font-family='Arial' font-size='14' font-weight='bold' fill='%2316a34a' text-anchor='middle'%3EConversions%3C/text%3E%3C/svg%3E",
    tags: ["Conversion", "CRO", "Ventes", "UX"]
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
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              Blog <span className="text-primary">Weblify Studio</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-8">
              <strong>Stratégies web exclusives</strong> pour faire exploser votre business en ligne
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Guides pratiques, études de cas réels et méthodes éprouvées par Noah Delenclos. 
              Plus de <strong>500 entreprises</strong> ont déjà appliqué ces stratégies avec succès.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid gap-12 lg:gap-16">
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
                        
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                          {post.title}
                        </h2>
                        
                        <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                          {post.excerpt}
                        </p>
                        
                        {post.tags && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
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