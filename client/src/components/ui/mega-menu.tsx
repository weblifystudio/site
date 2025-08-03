import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  Palette, 
  Rocket, 
  ShoppingCart,
  Star,
  Users,
  Award,
  ArrowRight
} from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  {
    id: 'vitrine',
    name: 'Site Vitrine',
    price: 'À partir de 690€',
    description: 'Site professionnel avec 5-8 pages pour présenter votre activité',
    icon: Palette,
    features: ['Design sur-mesure', 'Responsive', 'SEO optimisé', 'Formulaire contact'],
    popular: true
  },
  {
    id: 'premium',
    name: 'Site Premium',
    price: 'À partir de 1290€',
    description: 'Site avancé avec fonctionnalités personnalisées et animations',
    icon: Rocket,
    features: ['Animations avancées', 'CMS intégré', 'Blog', 'Multi-langues'],
    popular: false
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    price: 'À partir de 2190€',
    description: 'Boutique en ligne complète avec gestion des commandes',
    icon: ShoppingCart,
    features: ['Catalogue produits', 'Paiement sécurisé', 'Gestion stock', 'Tableau de bord'],
    popular: false
  }
];

const portfolioItems = [
  {
    name: 'Bloom Café',
    category: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop&q=80',
    type: 'Site Vitrine'
  },
  {
    name: 'TechConseil',
    category: 'Consulting',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop&q=80',
    type: 'Site Corporate'
  },
  {
    name: 'Artisan Bijoux',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop&q=80',
    type: 'Boutique en ligne'
  }
];

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClose();
  };

  return (
    <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-2xl border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Rocket className="w-5 h-5 mr-2 text-primary" />
              Nos Services
            </h3>
            <div className="grid gap-4">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-md transition-shadow group cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{service.name}</h4>
                          {service.popular && (
                            <Badge className="bg-primary text-xs">Populaire</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {service.description}
                        </p>
                        <p className="text-primary font-semibold text-sm mb-3">
                          {service.price}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {service.features.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6">
              <Button asChild className="w-full">
                <Link href="/contact" onClick={scrollToTop}>
                  Demander un devis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Portfolio Récent */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2 text-primary" />
              Réalisations Récentes
            </h3>
            <div className="space-y-4">
              {portfolioItems.map((item, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <Badge className="absolute bottom-2 left-2 text-xs">
                      {item.type}
                    </Badge>
                  </div>
                  <h5 className="font-medium text-sm">{item.name}</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.category}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" asChild className="w-full">
                <Link href="/realisations" onClick={scrollToTop}>
                  Voir le portfolio
                </Link>
              </Button>
            </div>
          </div>

          {/* Contact Rapide */}
          <div>
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              Contact Express
            </h3>
            <Card className="bg-gradient-to-br from-primary/5 to-blue-50 dark:from-primary/10 dark:to-gray-800">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                    <Star className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Démarrage Express</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Votre site en 7 jours seulement. Consultation gratuite.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Button asChild className="w-full">
                      <Link href="/contact" onClick={scrollToTop}>
                        Obtenir un devis
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/faq" onClick={scrollToTop}>
                        Questions fréquentes
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}