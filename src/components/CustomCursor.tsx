import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  // References to prevent unnecessary React re-renders on mousemove
  const stateRef = useRef({ hovered: false, isPointer: false, cursorText: '', visible: false });

  const springConfig = { damping: 26, stiffness: 340, mass: 0.35 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const dotConfig = { damping: 40, stiffness: 750, mass: 0.06 };
  const dotX = useSpring(-100, dotConfig);
  const dotY = useSpring(-100, dotConfig);

  useEffect(() => {
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;

      // Magnetic snapping if element has data-magnetic="true"
      if (target) {
        const magneticEl = target.closest('[data-magnetic="true"]') as HTMLElement | null;
        if (magneticEl) {
          const rect = magneticEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          // Magnetic pull within radius
          targetX = centerX + (e.clientX - centerX) * 0.35;
          targetY = centerY + (e.clientY - centerY) * 0.35;
        }
      }

      cursorX.set(targetX);
      cursorY.set(targetY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      if (!stateRef.current.visible) {
        stateRef.current.visible = true;
        setVisible(true);
      }

      if (!ticking) {
        requestAnimationFrame(() => {
          if (target) {
            const interactive = target.closest('button, a, input, textarea, [data-cursor-interactive="true"]');
            const textElement = target.closest('[data-cursor-text]') as HTMLElement | null;

            const nextHovered = !!(textElement && textElement.dataset.cursorText);
            const nextCursorText = textElement?.dataset.cursorText || '';
            const nextIsPointer = !!interactive && !nextHovered;

            if (
              stateRef.current.hovered !== nextHovered ||
              stateRef.current.isPointer !== nextIsPointer ||
              stateRef.current.cursorText !== nextCursorText
            ) {
              stateRef.current = { ...stateRef.current, hovered: nextHovered, isPointer: nextIsPointer, cursorText: nextCursorText };
              setHovered(nextHovered);
              setIsPointer(nextIsPointer);
              setCursorText(nextCursorText);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseLeave = () => {
      stateRef.current.visible = false;
      setVisible(false);
    };

    const handleMouseEnter = () => {
      stateRef.current.visible = true;
      setVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  if (!visible) return null;

  return (
    <>
      {/* Precision inner center dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_#00F0FF]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: hovered ? 0 : 1,
        }}
      />

      {/* Trailing smooth magnetic aura & morphing pill */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full border border-cyan-400/40 backdrop-blur-[2px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? Math.max(90, cursorText.length * 10 + 24) : isPointer ? 48 : 28,
          height: hovered ? 38 : isPointer ? 48 : 28,
          borderRadius: hovered ? '9999px' : '50%',
          backgroundColor: hovered
            ? 'rgba(0, 240, 255, 0.22)'
            : isPointer
            ? 'rgba(138, 43, 226, 0.16)'
            : 'rgba(0, 240, 255, 0.04)',
          borderColor: hovered ? 'rgba(0, 240, 255, 0.9)' : isPointer ? 'rgba(168, 85, 247, 0.65)' : 'rgba(56, 189, 248, 0.35)',
          boxShadow: hovered
            ? '0 0 30px rgba(0, 240, 255, 0.45)'
            : isPointer
            ? '0 0 18px rgba(168, 85, 247, 0.35)'
            : '0 0 0px transparent',
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 320 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[10px] uppercase font-mono font-bold tracking-widest text-cyan-200 text-center px-2 select-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};

