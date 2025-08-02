import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'wouter';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const routeLabels: Record<string, string> = {
  '/': 'Accueil',
  '/offres': 'Services',
  '/realisations': 'Portfolio',
  '/blog': 'Blog',
  '/a-propos': 'À propos',
  '/faq': 'FAQ',
  '/contact': 'Contact',
  '/mentions-legales': 'Mentions légales',
  '/cgv': 'Conditions générales',
  '/politique-confidentialite': 'Politique de confidentialité',
  '/cookies': 'Gestion des cookies'
};

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const [location] = useLocation();
  
  // If custom items are provided, use them
  if (items) {
    return (
      <nav className={`flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 ${className}`}>
        <Link href="/" className="hover:text-primary transition-colors">
          <Home className="w-4 h-4" />
        </Link>
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4" />
            {item.href ? (
              <Link href={item.href} className="hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100 font-medium">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>
    );
  }

  // Auto-generate breadcrumbs from current route
  const pathSegments = location.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) {
    return null; // Don't show breadcrumbs on home page
  }

  const breadcrumbItems: BreadcrumbItem[] = [];
  let currentPath = '';

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    breadcrumbItems.push({
      label: routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1),
      href: isLast ? undefined : currentPath
    });
  });

  return (
    <nav className={`flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 ${className}`}>
      <Link href="/" className="hover:text-primary transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      {breadcrumbItems.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}