import { motion } from 'framer-motion';

interface AnimatedHamburgerProps {
  isOpen: boolean;
  className?: string;
}

export default function AnimatedHamburger({ isOpen, className = "" }: AnimatedHamburgerProps) {
  return (
    <div className={`w-6 h-6 flex flex-col justify-center items-center ${className}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Première barre (haut) */}
        <motion.path
          d="M4 6H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{
            d: isOpen ? "M6 6L18 18" : "M4 6H20",
          }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
        
        {/* Deuxième barre (milieu) */}
        <motion.path
          d="M4 12H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{
            opacity: isOpen ? 0 : 1,
            x: isOpen ? 10 : 0,
          }}
          transition={{
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
        
        {/* Troisième barre (bas) */}
        <motion.path
          d="M4 18H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={false}
          animate={{
            d: isOpen ? "M6 18L18 6" : "M4 18H20",
          }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </svg>
    </div>
  );
}