import React, { useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
  glareColor?: string;
  cursorText?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 10,
  glareOpacity = 0.15,
  glareColor = 'rgba(0, 240, 255, 0.4)',
  cursorText,
  onClick,
  style = {},
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth springs for rotation
  const springConfig = { damping: 22, stiffness: 260, mass: 0.5 };
  const mouseX = useSpring(0.5, springConfig);
  const mouseY = useSpring(0.5, springConfig);

  // Derive 3D rotation angles from normalized mouse position (0 to 1)
  const rotateX = useTransform(mouseY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseX, [0, 1], [-maxTilt, maxTilt]);

  // Derive light glare position
  const glareX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(Math.max(0, Math.min(1, x)));
      mouseY.set(Math.max(0, Math.min(1, y)));
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        data-cursor-text={cursorText}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
          ...style,
        }}
        className={`relative overflow-hidden will-change-transform transition-shadow duration-300 ${className}`}
      >
        {/* Child Content */}
        <div style={{ transform: 'translateZ(0px)' }} className="relative z-10 w-full h-full">
          {children}
        </div>

        {/* Dynamic Specular Sheen Glare */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: `radial-gradient(circle 280px at ${glareX.get()} ${glareY.get()}, ${glareColor}, transparent 70%)`,
          }}
        />
      </motion.div>
    </div>
  );
};
