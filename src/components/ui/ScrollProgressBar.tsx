import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 origin-left z-[100] pointer-events-none shadow-[0_0_10px_rgba(99,102,241,0.5)]"
    />
  );
};

export default ScrollProgressBar;
