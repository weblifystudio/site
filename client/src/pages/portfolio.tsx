import { ExternalLink, Calendar, Tag } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const projects = [
  {
    id: 1,
    title: "Restaurant Le Petit Bistrot",
    category: "Site Vitrine",
    description: "Site vitrine élégant pour un restaurant parisien avec système de réservation intégré et galerie photos.",
    technologies: ["React", "Node.js", "Tailwind CSS"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
    url: "#"
  },
  {
    id: 2,
    title: "Cabinet d'Avocat Dubois",
    category: "Site Premium",
    description: "Site web professionnel avec système de prise de rendez-vous et blog juridique intégré.",
    technologies: ["WordPress", "PHP", "JavaScript"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&h=300&fit=crop",
    url: "#"
  },
  {
    id: 3,
    title: "E-commerce Mode Éthique",
    category: "Sur-Mesure",
    description: "Boutique en ligne complète avec système de paiement sécurisé et gestion des stocks avancée.",
    technologies: ["Next.js", "Stripe", "MongoDB"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
    url: "#"
  },
  {
    id: 4,
    title: "Startup Tech Innovation",
    category: "Site Premium",
    description: "Site vitrine dynamique pour une startup avec animations personnalisées et formulaires avancés.",
    technologies: ["Vue.js", "GSAP", "Firebase"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop",
    url: "#"
  },
  {
    id: 5,
    title: "Clinique Dentaire Moderne",
    category: "Site Vitrine",
    description: "Site médical professionnel avec prise de rendez-vous en ligne et présentation des services.",
    technologies: ["React", "Sanity CMS", "CSS3"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&h=300&fit=crop",
    url: "#"
  },
  {
    id: 6,
    title: "Agence Immobilière Premium",
    category: "Sur-Mesure",
    description: "Plateforme immobilière avec recherche avancée, visite virtuelle et gestion de portefeuille.",
    technologies: ["React", "Node.js", "PostgreSQL"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop",
    url: "#"
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
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Nos Réalisations
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Découvrez nos derniers projets
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Chaque projet est unique et reflète l'identité de nos clients. 
            Explorez notre portfolio et laissez-vous inspirer.
          </p>
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
            <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  width="500"
                  height="300"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="sm" className="bg-white text-primary hover:bg-white/90">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Voir le projet
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{project.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.year}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-50 dark:from-primary/20 dark:to-blue-900/20 rounded-2xl p-12 mb-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Projets réalisés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">7j</div>
              <div className="text-muted-foreground">Délai moyen</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support disponible</div>
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
