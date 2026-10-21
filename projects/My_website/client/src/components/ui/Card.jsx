import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ className, children, hover = true, padding = 'p-6' }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : undefined}
      className={`bg-card/50 border border-white/10 rounded-xl transition-all duration-300 hover:border-accent/50 ${className} ${padding}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;