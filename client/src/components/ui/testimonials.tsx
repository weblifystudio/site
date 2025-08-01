import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  project: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "M. Dubois",
    company: "Bloom Café",
    role: "Propriétaire",
    content: "Très satisfait du site réalisé pour mon café. L'interface est moderne et les clients trouvent facilement nos informations. Le processus de création a été fluide.",
    rating: 5,
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%234c82ee'/%3E%3Ctext x='50' y='57' font-family='Arial' font-size='35' font-weight='bold' fill='white' text-anchor='middle'%3EMD%3C/text%3E%3C/svg%3E",
    project: "Site vitrine restaurant",
    location: "Paris 11ème"
  },
  {
    id: 2,
    name: "T. Martin",
    company: "TechConseil",
    role: "Directeur",
    content: "Le site répond parfaitement à nos attentes professionnelles. La navigation est claire et le référencement fonctionne bien. Nous avons gagné en visibilité.",
    rating: 5,
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2316a34a'/%3E%3Ctext x='50' y='57' font-family='Arial' font-size='35' font-weight='bold' fill='white' text-anchor='middle'%3ETM%3C/text%3E%3C/svg%3E",
    project: "Site corporate",
    location: "Paris 8ème"
  },
  {
    id: 3,
    name: "S. Chen",
    company: "Artisan Bijoux",
    role: "Artisan",
    content: "L'e-commerce met bien en valeur mes créations. Les photos ressortent bien et le processus de commande est simple. J'ai eu plus de ventes depuis la mise en ligne.",
    rating: 5,
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23dc2626'/%3E%3Ctext x='50' y='57' font-family='Arial' font-size='35' font-weight='bold' fill='white' text-anchor='middle'%3ESC%3C/text%3E%3C/svg%3E",
    project: "E-commerce bijouterie",
    location: "Paris 4ème"
  },
  {
    id: 4,
    name: "A. Durand",
    company: "Cabinet Avocat",
    role: "Avocat associé",
    content: "Site conforme à nos besoins juridiques. La présentation est professionnelle et les informations sont bien organisées. Nos clients apprécient la clarté.",
    rating: 5,
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23b45309'/%3E%3Ctext x='50' y='57' font-family='Arial' font-size='35' font-weight='bold' fill='white' text-anchor='middle'%3EAD%3C/text%3E%3C/svg%3E",
    project: "Site cabinet juridique",
    location: "Paris 1er"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Témoignages clients
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nos clients <span className="text-primary">témoignent</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Découvrez pourquoi plus de 50 entreprises parisiennes nous font confiance pour leur présence digitale.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                {/* Avatar et infos client */}
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="relative mb-4">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto md:mx-0 ring-4 ring-primary/20"
                    />
                    <Quote className="absolute -top-2 -right-2 h-8 w-8 text-primary bg-white dark:bg-gray-800 rounded-full p-1" />
                  </div>
                  <h4 className="font-semibold text-lg">{currentTestimonial.name}</h4>
                  <p className="text-primary font-medium">{currentTestimonial.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{currentTestimonial.company}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{currentTestimonial.location}</p>
                  
                  <div className="flex justify-center md:justify-start space-x-1 mt-3">
                    {renderStars(currentTestimonial.rating)}
                  </div>
                </div>

                {/* Contenu témoignage */}
                <div className="flex-1">
                  <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed italic mb-4">
                    "{currentTestimonial.content}"
                  </blockquote>
                  <Badge variant="secondary" className="text-xs">
                    {currentTestimonial.project}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Indicateurs */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}