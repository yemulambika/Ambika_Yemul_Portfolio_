import React from 'react';

const Badge = ({ variant = 'default', className, children }) => {
  const variants = {
    default: 'bg-white/10 text-white border border-white/10',
    accent: 'bg-accent/10 text-accent border border-accent/20',
    success: 'bg-green-500/10 text-green-400 border border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    featured: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider ${variants[variant]} ${className || ''}`}
    >
      {children}
    </span>
  );
};

export default Badge;