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
    title: "Projet Client #1",
    category: "Site Vitrine",
    description: "Site vitrine professionnel avec design moderne et optimisation SEO. Interface responsive adaptée à tous les appareils.",
    technologies: ["React", "Tailwind CSS", "Node.js"],
    year: "2025",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23f8fafc'/%3E%3Crect x='50' y='50' width='400' height='200' fill='%234c82ee' opacity='0.1' rx='8'/%3E%3Ctext x='250' y='130' font-family='Arial' font-size='16' font-weight='bold' fill='%234c82ee' text-anchor='middle'%3ESite Vitrine%3C/text%3E%3Ctext x='250' y='170' font-family='Arial' font-size='14' fill='%236b7280' text-anchor='middle'%3EProjet disponible bientôt%3C/text%3E%3C/svg%3E",
    url: "#",
    status: "À venir"
  },
  {
    id: 2,
    title: "Projet Client #2",
    category: "Site Premium",
    description: "Site web premium avec fonctionnalités avancées, animations personnalisées et intégrations tierces.",
    technologies: ["React", "TypeScript", "API Integration"],
    year: "2025",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23f8fafc'/%3E%3Crect x='50' y='50' width='400' height='200' fill='%2316a34a' opacity='0.1' rx='8'/%3E%3Ctext x='250' y='130' font-family='Arial' font-size='16' font-weight='bold' fill='%2316a34a' text-anchor='middle'%3ESite Premium%3C/text%3E%3Ctext x='250' y='170' font-family='Arial' font-size='14' fill='%236b7280' text-anchor='middle'%3EProjet disponible bientôt%3C/text%3E%3C/svg%3E",
    url: "#",
    status: "À venir"
  },
  {
    id: 3,
    title: "Projet Client #3",
    category: "Sur-Mesure",
    description: "Solution sur-mesure complète avec architecture personnalisée et fonctionnalités spécifiques au secteur d'activité.",
    technologies: ["React", "Node.js", "Database"],
    year: "2025",
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300' viewBox='0 0 500 300'%3E%3Crect width='500' height='300' fill='%23f8fafc'/%3E%3Crect x='50' y='50' width='400' height='200' fill='%23dc2626' opacity='0.1' rx='8'/%3E%3Ctext x='250' y='130' font-family='Arial' font-size='16' font-weight='bold' fill='%23dc2626' text-anchor='middle'%3ESur-Mesure%3C/text%3E%3Ctext x='250' y='170' font-family='Arial' font-size='14' fill='%236b7280' text-anchor='middle'%3EProjet disponible bientôt%3C/text%3E%3C/svg%3E",
    url: "#",
    status: "À venir"
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

        {/* Info Card pour vrais projets */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-3 text-blue-900 dark:text-blue-100">
                Portfolio en construction
              </h3>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                Nos premiers projets clients seront bientôt disponibles ici. En attendant, vous pouvez découvrir notre approche et notre expertise à travers nos services.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="default">
                  <Link href="/offres" onClick={scrollToTop}>
                    Découvrir nos offres
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact" onClick={scrollToTop}>
                    Discuter de votre projet
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

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
            <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 opacity-60">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  width="500"
                  height="300"
                  className="w-full h-48 object-cover"
                />
                {project.status && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge className="bg-primary text-white px-4 py-2 text-sm font-semibold">
                      {project.status}
                    </Badge>
                  </div>
                )}
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
                
                <Button variant="outline" className="w-full" disabled>
                  Projet en préparation
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
