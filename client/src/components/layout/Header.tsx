import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import MegaMenu from '@/components/ui/mega-menu';
import AnimatedHamburger from '@/components/ui/animated-hamburger';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Offres', href: '/offres' },
    { name: 'Réalisations', href: '/realisations' },
    { name: 'Blog', href: '/blog' },
    { name: 'À propos', href: '/a-propos' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Overlay pour le menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <header className={`fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border z-40 transition-all duration-300 ${isScrolled ? 'header-compact' : ''}`}>
        <div className={`container mx-auto px-6 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group" onClick={scrollToTop}>
            {/* Symbole bleu avec proportions ajustées */}
            <svg 
              width="130" 
              height="130" 
              viewBox="0 0 130 130"
              className={`transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'h-7 w-7 sm:h-8 sm:w-8' : 'h-8 w-8 sm:h-10 sm:w-10'
              }`}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Forme principale du carré bleu avec arrondis équilibrés */}
              <rect x="15" y="15" width="100" height="100" rx="12" ry="12" fill="#4c82ee" stroke="none"/>
              
              {/* Éléments intérieurs stylisés du logo */}
              <rect x="25" y="25" width="80" height="80" rx="8" ry="8" fill="none" stroke="#ffffff" strokeWidth="2"/>
              
              {/* Lignes horizontales intérieures */}
              <rect x="35" y="40" width="30" height="4" rx="2" fill="#ffffff"/>
              <rect x="35" y="55" width="50" height="4" rx="2" fill="#ffffff"/>
              <rect x="35" y="70" width="45" height="4" rx="2" fill="#ffffff"/>
              
              {/* Extension arrondie à droite pour équilibrer */}
              <circle cx="120" cy="65" r="8" fill="#4c82ee"/>
            </svg>
            
            {/* Texte "Weblify Studio" avec police Inter uniforme */}
            <div className="flex flex-col">
              <span className={`font-inter font-bold text-black dark:text-white transition-colors duration-300 tracking-tight ${
                isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
              }`}>
                Weblify
              </span>
              <span className={`font-inter font-bold text-black dark:text-white transition-colors duration-300 tracking-tight ${
                isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
              }`}>
                Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={scrollToTop}
                className={`header-link transition-colors duration-200 ${
                  location === item.href
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-10 w-10 relative"
            >
              <AnimatedHamburger isOpen={isMobileMenuOpen} />
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden border-t border-border overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <motion.div
                className="flex flex-col space-y-3 pt-4 pb-4"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.1,
                }}
              >
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: index * 0.08,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        scrollToTop();
                      }}
                      className={`header-link py-2 block transition-colors duration-200 ${
                        location === item.href
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </header>
    </>
  );
}
