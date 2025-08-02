import { MapPin, Mail, Phone, Linkedin, Github, Twitter, Instagram, Code, Palette, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import Breadcrumbs from '@/components/ui/breadcrumbs';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function About() {
  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-8" />
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Noah Delenclos, Fondateur de Weblify Studio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Développeur full-stack passionné, basé à Paris depuis 2025, 
            je transforme vos idées en expériences web exceptionnelles.
          </p>
        </div>

        {/* Profile Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="relative w-full h-96 bg-gradient-to-br from-primary/20 to-blue-100 dark:from-primary/30 dark:to-blue-900/30 rounded-3xl p-8 animate-float">
              
              {/* Éléments flottants indépendants - Positions ajustées pour correspondre à l'accueil */}
              <div className="absolute top-8 left-8 w-12 h-12 bg-primary rounded-xl opacity-70 animate-float1"></div>
              <div className="absolute top-16 right-8 w-8 h-8 bg-blue-300 rounded-lg opacity-60 animate-float2"></div>
              <div className="absolute bottom-16 left-12 w-16 h-3 bg-primary/60 rounded-full animate-float3"></div>
              <div className="absolute bottom-8 right-12 w-6 h-6 bg-blue-400 rounded-full animate-float4"></div>
              
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-32 h-32 bg-primary rounded-3xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">ND</span>
                  </div>
                  <div className="text-lg font-semibold">Noah Delenclos</div>
                  <div className="text-muted-foreground">Full-Stack Developer</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Mon Histoire</h2>
            <div className="prose prose-lg text-muted-foreground">
              <p className="mb-4">
                Fondé en 2025, Weblify Studio est né de ma passion pour le développement web et mon désir 
                d'aider les entreprises à créer leur présence digitale avec excellence.
              </p>
              <p className="mb-4">
                Avec plusieurs années d'expérience en développement full-stack, j'ai acquis une 
                expertise approfondie dans les technologies modernes du web. Mon approche combine 
                créativité, technique et stratégie pour livrer des solutions qui dépassent les attentes.
              </p>
              <p>
                Basé à Paris, je travaille avec des clients de toute la France et de l'international, 
                offrant un service personnalisé et un accompagnement de qualité à chaque étape du projet.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/contact" onClick={scrollToTop}>Travaillons ensemble</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/realisations" onClick={scrollToTop}>Voir mes réalisations</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Mes Compétences</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Développement</h3>
                <p className="text-muted-foreground mb-6">
                  Maîtrise complète des technologies front-end et back-end modernes pour créer des applications robustes et performantes.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Python</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Design UX/UI</h3>
                <p className="text-muted-foreground mb-6">
                  Création d'interfaces utilisateur intuitives et esthétiques, centrées sur l'expérience utilisateur et la conversion.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Figma</Badge>
                  <Badge variant="secondary">Adobe XD</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">Animation</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Performance & SEO</h3>
                <p className="text-muted-foreground mb-6">
                  Optimisation des performances web et du référencement naturel pour maximiser la visibilité et l'efficacité.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">SEO</Badge>
                  <Badge variant="secondary">Analytics</Badge>
                  <Badge variant="secondary">Lighthouse</Badge>
                  <Badge variant="secondary">Core Web Vitals</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-50 dark:from-primary/20 dark:to-blue-900/20 rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Mes Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence Technique</h3>
              <p className="text-muted-foreground">
                Code propre, architectures solides et respect des meilleures pratiques du développement web moderne.
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Écoute Client</h3>
              <p className="text-muted-foreground">
                Comprendre vos besoins, vos objectifs et votre vision pour créer la solution parfaitement adaptée.
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation Continue</h3>
              <p className="text-muted-foreground">
                Veille technologique constante pour proposer les solutions les plus modernes et efficaces.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-8">Restons en Contact</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Localisation</div>
                  <div className="text-muted-foreground">Paris, France</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">Email</div>
                  <div className="text-muted-foreground break-words">contact@weblifystudio.fr</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Contact</div>
                  <div className="text-muted-foreground">Sur demande par email</div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/noah-delenclos-b8952a377" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary hover:bg-primary/80 rounded-lg flex items-center justify-center transition-colors"
                aria-label="LinkedIn de Noah Delenclos"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://github.com/weblifystudio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary hover:bg-primary/80 rounded-lg flex items-center justify-center transition-colors"
                aria-label="GitHub Weblify Studio"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://x.com/weblifystudio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary hover:bg-primary/80 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Twitter/X Weblify Studio"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://www.instagram.com/weblifystudio/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary hover:bg-primary/80 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram Weblify Studio"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
          
          <Card className="h-fit">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-4">Prêt à démarrer ?</h3>
              <p className="text-muted-foreground mb-6">
                Discutons de votre projet et voyons comment je peux vous aider à atteindre vos objectifs digitaux.
              </p>
              <Button asChild className="w-full">
                <Link href="/contact" onClick={scrollToTop}>Contactez-moi</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
