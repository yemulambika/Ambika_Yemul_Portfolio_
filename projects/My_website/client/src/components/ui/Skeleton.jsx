import React from 'react';

const Skeleton = ({ className = 'h-8 rounded', animate = true }) => {
  return (
    <div
      className={`bg-fg/5 rounded animate-pulse ${animate ? 'animate-pulse' : ''} ${className}`}
    />
  );
};

export default Skeleton;