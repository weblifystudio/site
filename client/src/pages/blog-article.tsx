import { useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User, ArrowLeft, Share, BookOpen } from 'lucide-react';
import Breadcrumbs from '@/components/ui/breadcrumbs';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

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
  }
];

export default function BlogArticle() {
  const params = useParams();
  const slug = params.slug;
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
          <p className="text-muted-foreground mb-8">Cet article n'existe pas ou a été supprimé.</p>
          <Link href="/blog" onClick={scrollToTop}>
            <Button>Retour au blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-primary">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-semibold mb-4">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.trim() === '') {
        return <div key={index} className="mb-4"></div>;
      }
      return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-8" items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title }
        ]} />
        
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/blog" onClick={scrollToTop}>
            <Button variant="ghost" className="mb-4 hover:bg-primary/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article className="space-y-8">
          <header className="space-y-6">
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="border-primary text-primary">
                {post.category}
              </Badge>
              {post.featured && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-600">
                  À la une
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between py-4 border-t border-b">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.publishDate).toLocaleDateString('fr-FR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Partager
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 overflow-hidden rounded-2xl">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="space-y-4 text-lg leading-relaxed">
              {formatContent(post.content)}
            </div>
          </div>

          {/* Article Footer */}
          <footer className="pt-8 border-t space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-sm text-muted-foreground">Fondateur de Weblify Studio</p>
                </div>
              </div>
              <Button variant="outline">
                <Share className="w-4 h-4 mr-2" />
                Partager cet article
              </Button>
            </div>

            <Card className="bg-gradient-to-r from-primary/5 to-blue-600/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Vous avez aimé cet article ?</h3>
                <p className="text-muted-foreground mb-4">
                  Découvrez nos autres conseils et retours d'expérience sur le blog
                </p>
                <Link href="/blog" onClick={scrollToTop}>
                  <Button>
                    Voir tous les articles
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </footer>
        </article>
      </div>
    </div>
  );
}