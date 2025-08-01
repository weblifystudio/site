import { motion } from 'framer-motion';

interface AnimatedHamburgerProps {
  isOpen: boolean;
  className?: string;
}

export default function AnimatedHamburger({ isOpen, className = "" }: AnimatedHamburgerProps) {
  return (
    <div className={`w-6 h-6 flex flex-col justify-center items-center ${className}`}>
      <div className="w-6 h-6 relative flex flex-col justify-center items-center">
        {/* Première barre (haut) - se transforme en partie haute de la croix */}
        <motion.div
          className="w-5 h-0.5 bg-current absolute rounded-full origin-center"
          initial={false}
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -6,
            scaleX: isOpen ? 1.1 : 1,
          }}
          transition={{
            duration: 0.5,
            ease: [0.175, 0.885, 0.32, 1.275],
            delay: isOpen ? 0 : 0.1,
          }}
        />
        
        {/* Deuxième barre (milieu) - disparaît progressivement */}
        <motion.div
          className="w-5 h-0.5 bg-current absolute rounded-full origin-center"
          initial={false}
          animate={{
            opacity: isOpen ? 0 : 1,
            scaleX: isOpen ? 0 : 1,
            rotate: isOpen ? 90 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.175, 0.885, 0.32, 1.275],
            delay: isOpen ? 0 : 0.2,
          }}
        />
        
        {/* Troisième barre (bas) - se transforme en partie basse de la croix */}
        <motion.div
          className="w-5 h-0.5 bg-current absolute rounded-full origin-center"
          initial={false}
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 6,
            scaleX: isOpen ? 1.1 : 1,
          }}
          transition={{
            duration: 0.5,
            ease: [0.175, 0.885, 0.32, 1.275],
            delay: isOpen ? 0.05 : 0,
          }}
        />
      </div>
    </div>
  );
}