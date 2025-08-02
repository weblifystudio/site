import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import InteractiveFAQ from '@/components/ui/interactive-faq';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { Link } from 'wouter';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function FAQ() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs />
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Questions <span className="text-primary">Fréquentes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur nos services, 
            notre processus de travail et nos tarifs.
          </p>
        </div>

        {/* Interactive FAQ */}
        <div className="max-w-6xl mx-auto">
          <InteractiveFAQ />
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-primary/10 to-blue-50 dark:from-primary/20 dark:to-blue-900/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Notre équipe est là pour répondre à toutes vos questions spécifiques. 
            N'hésitez pas à nous contacter pour un conseil personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact" onClick={scrollToTop}>Poser ma question</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/offres" onClick={scrollToTop}>Voir nos offres</Link>
            </Button>
          </div>
        </div>

        {/* Quick Help */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 border border-border rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Besoin d'un devis ?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Obtenez une estimation personnalisée en quelques minutes
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/contact" onClick={scrollToTop}>Demander un devis</Link>
            </Button>
          </div>

          <div className="text-center p-6 border border-border rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Questions techniques ?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Parlons de votre projet et des solutions adaptées
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/contact" onClick={scrollToTop}>Discuter technique</Link>
            </Button>
          </div>

          <div className="text-center p-6 border border-border rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Voir nos réalisations</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Découvrez nos derniers projets et inspirez-vous
            </p>
            <Button asChild variant="outline" size="sm">
              <Link href="/realisations" onClick={scrollToTop}>Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}