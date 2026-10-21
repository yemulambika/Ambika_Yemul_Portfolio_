import React from 'react';

const Avatar = ({ src, alt = 'Avatar', className, size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  return (
    <div
      className={`flex-shrink-0 rounded-full flex items-center justify-center bg-accent/20 border border-accent/30 ${sizes[size]} ${className || ''}`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" />
      ) : (
        <span className="text-accent font-semibold">{getInitials(alt)}</span>
      )}
    </div>
  );
};

const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export default Avatar;