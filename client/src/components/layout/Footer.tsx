import { Link } from 'wouter';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Newsletter } from '@/components/ui/newsletter';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <svg 
                viewBox="0 0 280 45" 
                className="h-8 sm:h-10 w-auto"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <style>{`
                    .footer-logo-text { 
                      font-family: 'Inter', 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                      font-weight: 700; 
                      font-size: 28px;
                      fill: white;
                      letter-spacing: -0.5px;
                    }
                  `}</style>
                  <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:"#4c82ee", stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"#2563eb", stopOpacity:1}} />
                  </linearGradient>
                </defs>
                
                <g>
                  <rect x="3" y="6" width="32" height="32" rx="6" fill="url(#footerLogoGradient)"/>
                  <path d="M 10 16 L 14 28 L 18 20 L 22 28 L 26 16" 
                        stroke="white" 
                        strokeWidth="2.5" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"/>
                  <circle cx="30" cy="14" r="2.5" fill="#4c82ee"/>
                </g>
                
                <text x="42" y="30" className="footer-logo-text">Weblify Studio</text>
              </svg>
            </div>
            <p className="text-gray-300 dark:text-gray-400 mb-6 leading-relaxed">
              Agence web parisienne spécialisée dans la création de sites internet modernes et performants.
              Transformons ensemble votre vision en réalité digitale.
            </p>
            <div className="flex space-x-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/noah-delenclos-b8952a377"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 dark:bg-gray-800 hover:bg-blue-600 text-gray-300 dark:text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="LinkedIn de Noah Delenclos"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Pinterest */}
              <a
                href="https://pin.it/5pd8oYiac"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 dark:bg-gray-800 hover:bg-red-600 text-gray-300 dark:text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="Pinterest Weblify"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.89 2.746.099.120.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="https://github.com/weblifystudio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 text-gray-300 dark:text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="GitHub Weblify Studio"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a
                href="https://x.com/weblifystudio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-700 dark:bg-gray-800 hover:bg-blue-500 text-gray-300 dark:text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="Twitter/X Weblify Studio"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" onClick={scrollToTop} className="footer-link text-gray-300 dark:text-gray-400 hover:text-white transition-colors duration-200">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/offres" onClick={scrollToTop} className="footer-link text-gray-300 dark:text-gray-400 hover:text-white transition-colors duration-200">
                  Offres
                </Link>
              </li>
              <li>
                <Link href="/realisations" onClick={scrollToTop} className="footer-link text-gray-300 dark:text-gray-400 hover:text-white transition-colors duration-200">
                  Réalisations
                </Link>
              </li>
              <li>
                <Link href="/a-propos" onClick={scrollToTop} className="footer-link text-gray-300 dark:text-gray-400 hover:text-white transition-colors duration-200">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/faq" onClick={scrollToTop} className="footer-link text-gray-300 dark:text-gray-400 hover:text-white transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={scrollToTop} className="footer-link text-gray-300 dark:text-gray-400 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-gray-300 dark:text-gray-400">Paris, France</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-gray-300 dark:text-gray-400">contact@weblifystudio.fr</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-gray-300 dark:text-gray-400">Sur demande par email</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <Newsletter variant="footer" />
        </div>

        <div className="border-t border-gray-700 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 dark:text-gray-400 text-sm">
            <p className="mb-2">© 2025 Weblify. Tous droits réservés.</p>
            <p className="footer-signature text-center md:text-left mb-1">
              Créé par <strong>Weblify Studio</strong> — Votre partenaire digital
              <span className="rocket ml-1">🚀</span>
            </p>
            <p className="text-center md:text-left text-xs text-gray-400 dark:text-gray-500">
              Web design & développement web performant, optimisé SEO.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link
              href="/mentions-legales"
              onClick={scrollToTop}
              className="footer-link text-gray-300 dark:text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Mentions légales
            </Link>
            <Link
              href="/cgv"
              onClick={scrollToTop}
              className="footer-link text-gray-300 dark:text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              CGV
            </Link>
            <Link
              href="/politique-confidentialite"
              onClick={scrollToTop}
              className="footer-link text-gray-300 dark:text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Confidentialité
            </Link>
            <Link
              href="/cookies"
              onClick={scrollToTop}
              className="footer-link text-gray-300 dark:text-gray-400 hover:text-white text-sm transition-colors duration-200"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
