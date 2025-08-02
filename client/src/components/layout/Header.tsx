import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
// import { ThemeToggle } from '@/components/ui/theme-toggle';
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
        <div className={`container mx-auto px-4 lg:px-6 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
        <nav className="flex items-center justify-between min-h-[60px]">
          
          {/* Logo - Alignement parfait à gauche */}
          <div className="flex-shrink-0 min-w-0">
            <Link href="/" className="flex items-center group" onClick={scrollToTop}>
              <svg 
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-9 sm:h-10 lg:h-11' : 'h-10 sm:h-11 lg:h-12'
                }`}
                viewBox="0 0 180 44" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <style>{`
                    .header-logo-text { 
                      font-family: 'Inter', sans-serif; 
                      font-weight: 700; 
                      font-size: 20px;
                      letter-spacing: -0.5px;
                    }
                    .header-logo-bg { fill: #4c82ee; }
                    .header-logo-lines { fill: #ffffff; }
                    .header-logo-text { fill: #1f2937; }
                    .dark .header-logo-bg { fill: #60a5fa; }
                    .dark .header-logo-text { fill: #ffffff; }
                  `}</style>
                </defs>
                
                <g>
                  <rect className="header-logo-bg" x="2" y="8" width="28" height="28" rx="8"/>
                  <g className="header-logo-lines">
                    <rect x="8" y="16" width="16" height="3" rx="1"/>
                    <rect x="8" y="21" width="12" height="3" rx="1"/>
                    <rect x="8" y="26" width="8" height="3" rx="1"/>
                  </g>
                </g>
                
                <text x="38" y="28" className="header-logo-text">Weblify Studio</text>
              </svg>
            </Link>
          </div>

          {/* Navigation Desktop - Centrage absolu parfait */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-8">
            <nav className="flex items-center justify-center space-x-6 lg:space-x-8 xl:space-x-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={scrollToTop}
                  className={`header-link text-sm font-medium transition-all duration-200 px-2 py-1 rounded-md ${
                    location === item.href
                      ? 'text-primary font-semibold bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Actions Desktop - Alignement parfait à droite */}
          <div className="hidden md:flex items-center justify-end flex-shrink-0">
            {/* ThemeToggle temporairement désactivé */}
          </div>

          {/* Actions Mobile - Compact et aligné */}
          <div className="md:hidden flex items-center space-x-3">
            {/* ThemeToggle temporairement désactivé */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-9 w-9 relative"
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
