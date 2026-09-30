import React from 'react';
import { motion, Variants } from 'framer-motion';

interface KineticTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  staggerDuration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  className = '',
  wordClassName = '',
  delay = 0.1,
  staggerDuration = 0.04,
  as: Component = 'div',
}) => {
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: '105%',
      opacity: 0,
      rotateX: -40,
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <Component className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="inline-flex flex-wrap gap-x-[0.3em] gap-y-[0.1em]"
      >
        {words.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden pb-[0.08em]">
            <motion.span
              variants={wordVariants}
              className={`inline-block transform-gpu ${wordClassName}`}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
};
