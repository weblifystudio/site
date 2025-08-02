import { ExternalLink, Calendar, Tag } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import Breadcrumbs from '@/components/ui/breadcrumbs';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const projects = [
  {
    id: 1,
    title: "Restaurant Le Bernardin",
    category: "Site Vitrine",
    description: "Site vitrine élégant pour un restaurant gastronomique avec menu interactif, réservations en ligne et galerie photos. Design moderne mettant en valeur l'art culinaire.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Stripe"],
    year: "2025",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234c82ee;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%232563eb;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='500' height='300' fill='%23f8fafc'/%3E%3Crect x='20' y='20' width='460' height='260' fill='url(%23grad1)' opacity='0.1' rx='12'/%3E%3Ccircle cx='100' cy='80' r='25' fill='%234c82ee' opacity='0.3'/%3E%3Ccircle cx='400' cy='220' r='30' fill='%232563eb' opacity='0.2'/%3E%3Crect x='150' y='100' width='200' height='8' fill='%234c82ee' opacity='0.4' rx='4'/%3E%3Crect x='150' y='130' width='250' height='6' fill='%234c82ee' opacity='0.3' rx='3'/%3E%3Crect x='150' y='160' width='180' height='6' fill='%234c82ee' opacity='0.3' rx='3'/%3E%3Ctext x='250' y='220' font-family='Arial' font-size='18' font-weight='bold' fill='%234c82ee' text-anchor='middle'%3ERestaurant Vitrine%3C/text%3E%3Ctext x='250' y='245' font-family='Arial' font-size='12' fill='%236b7280' text-anchor='middle'%3EDesign moderne • Menu interactif • Réservations%3C/text%3E%3C/svg%3E",
    url: "https://restaurant-demo.weblify.fr",
    status: "En ligne",
    client: "Secteur Restauration",
    metrics: {
      performance: "95/100",
      seo: "98/100", 
      accessibility: "94/100"
    }
  },
  {
    id: 2,
    title: "Cabinet d'Avocats Juridis",
    category: "Site Premium",
    description: "Site web professionnel pour cabinet d'avocats avec espace client sécurisé, prise de rendez-vous automatisée, blog juridique et formulaires de contact personnalisés.",
    technologies: ["React", "TypeScript", "Stripe", "Calendly API", "SSL"],
    year: "2025",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2316a34a;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2315803d;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='500' height='300' fill='%23f8fafc'/%3E%3Crect x='20' y='20' width='460' height='260' fill='url(%23grad2)' opacity='0.1' rx='12'/%3E%3Crect x='60' y='60' width='40' height='60' fill='%2316a34a' opacity='0.3' rx='4'/%3E%3Crect x='120' y='70' width='40' height='50' fill='%2316a34a' opacity='0.25' rx='4'/%3E%3Crect x='180' y='50' width='40' height='70' fill='%2316a34a' opacity='0.35' rx='4'/%3E%3Crect x='240' y='65' width='40' height='55' fill='%2316a34a' opacity='0.3' rx='4'/%3E%3Cpath d='M 350 60 L 380 60 L 365 90 Z' fill='%2316a34a' opacity='0.4'/%3E%3Ccircle cx='420' cy='75' r='15' fill='%2315803d' opacity='0.3'/%3E%3Ctext x='250' y='180' font-family='Arial' font-size='18' font-weight='bold' fill='%2316a34a' text-anchor='middle'%3ECabinet Juridique%3C/text%3E%3Ctext x='250' y='205' font-family='Arial' font-size='12' fill='%236b7280' text-anchor='middle'%3EEspace client • Rendez-vous • Blog juridique%3C/text%3E%3C/svg%3E",
    url: "https://juridis-demo.weblify.fr",
    status: "En ligne",
    client: "Secteur Juridique",
    metrics: {
      performance: "97/100",
      seo: "96/100",
      accessibility: "98/100"
    }
  },
  {
    id: 3,
    title: "E-commerce Boutique Mode",
    category: "Sur-Mesure",
    description: "Plateforme e-commerce complète avec gestion des stocks, paiements sécurisés, système de fidélité, notifications push et tableau de bord analytique avancé.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis", "PWA"],
    year: "2025",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23dc2626;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23b91c1c;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='500' height='300' fill='%23f8fafc'/%3E%3Crect x='20' y='20' width='460' height='260' fill='url(%23grad3)' opacity='0.1' rx='12'/%3E%3Crect x='80' y='60' width='60' height='80' fill='%23dc2626' opacity='0.2' rx='6'/%3E%3Crect x='160' y='70' width='60' height='70' fill='%23dc2626' opacity='0.25' rx='6'/%3E%3Crect x='240' y='65' width='60' height='75' fill='%23dc2626' opacity='0.3' rx='6'/%3E%3Crect x='320' y='55' width='60' height='85' fill='%23dc2626' opacity='0.2' rx='6'/%3E%3Ccircle cx='110' cy='180' r='8' fill='%23dc2626' opacity='0.6'/%3E%3Ccircle cx='140' cy='185' r='6' fill='%23dc2626' opacity='0.5'/%3E%3Ccircle cx='170' cy='175' r='10' fill='%23dc2626' opacity='0.7'/%3E%3Cpath d='M 350 170 L 380 160 L 380 180 L 370 185 Z' fill='%23dc2626' opacity='0.4'/%3E%3Ctext x='250' y='220' font-family='Arial' font-size='18' font-weight='bold' fill='%23dc2626' text-anchor='middle'%3EBoutique E-commerce%3C/text%3E%3Ctext x='250' y='245' font-family='Arial' font-size='12' fill='%236b7280' text-anchor='middle'%3EPaiements • Stocks • Analytics • PWA%3C/text%3E%3C/svg%3E",
    url: "https://boutique-demo.weblify.fr",
    status: "En ligne",
    client: "Secteur Mode",
    metrics: {
      performance: "93/100",
      seo: "95/100",
      accessibility: "96/100"
    }
  }
];

const categories = ["Tous", "Site Vitrine", "Site Premium", "Sur-Mesure"];

export default function Portfolio() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-8" />
        
        {/* Header - Alignement parfait */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Portfolio en construction
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Agence récente fondée en 2025, nos premiers projets clients 
            seront bientôt présentés ici. Découvrez notre expertise dès maintenant.
          </p>
        </div>

        {/* Info Card pour vrais projets - Centrage optimal */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
            <CardContent className="p-8 text-center">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-xl font-bold mb-4 text-blue-900 dark:text-blue-100">
                  Portfolio en construction
                </h3>
                <p className="text-blue-700 dark:text-blue-300 mb-6 leading-relaxed">
                  Nos premiers projets clients seront bientôt disponibles ici. En attendant, vous pouvez découvrir notre approche et notre expertise à travers nos services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button asChild size="lg" variant="default">
                    <Link href="/offres" onClick={scrollToTop}>
                      Découvrir nos offres
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/contact" onClick={scrollToTop}>
                      Discuter de votre projet
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "Tous" ? "default" : "outline"}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border-0 hover:border-primary/50 relative">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  width="500"
                  height="300"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay gradient au hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {project.status && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-white px-4 py-2 text-sm font-semibold group-hover:bg-white group-hover:text-primary transition-all duration-300">
                      {project.status}
                    </Badge>
                  </div>
                )}
                
                {/* Métriques de performance en overlay */}
                {project.metrics && (
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex space-x-2">
                      <Badge className="bg-green-500 text-white text-xs">
                        Perf: {project.metrics.performance}
                      </Badge>
                      <Badge className="bg-blue-500 text-white text-xs">
                        SEO: {project.metrics.seo}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6 relative">
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="group-hover:bg-primary group-hover:text-white transition-all duration-300">{project.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.year}
                  </div>
                </div>
                
                {project.client && (
                  <p className="text-xs text-muted-foreground mb-2 font-medium">{project.client}</p>
                )}
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs group-hover:scale-105 transition-transform duration-300">
                      <Tag className="w-3 h-3 mr-1" />
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-white group-hover:scale-105 transition-all duration-300" 
                  disabled={project.status === 'À venir'}
                >
                  {project.status === 'À venir' ? 'Projet en préparation' : 'Voir le projet'}
                  {project.status !== 'À venir' && <ExternalLink className="ml-2 w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-50 dark:from-primary/20 dark:to-blue-900/20 rounded-2xl p-12 mb-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Projets réalisés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Projets livrés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">7j</div>
              <div className="text-muted-foreground">Délai moyen</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">2025</div>
              <div className="text-muted-foreground">Année de création</div>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Technologies que nous maîtrisons</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['React', 'Vue.js', 'Next.js', 'WordPress', 'Node.js', 'Python', 'PHP', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'GSAP', 'Firebase'].map((tech) => (
              <Card key={tech} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <div className="font-semibold text-sm">{tech}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Votre projet sera le prochain ?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Chaque projet est une nouvelle aventure. Parlons de votre vision et créons ensemble 
            quelque chose d'extraordinaire qui vous ressemble.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact" onClick={scrollToTop}>Démarrer mon projet</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/offres" onClick={scrollToTop}>Voir nos offres</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
