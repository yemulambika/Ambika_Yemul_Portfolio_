import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({ className, variant = 'primary', loading, disabled, asChild = false, ...props }, ref) => {
  const variants = {
    primary: 'bg-accent text-white hover:bg-accentHover shadow-[0_0_20px_rgba(99,102,241,0.4)]',
    outline: 'border border-white/20 text-white hover:bg-white/10 hover:border-white/30',
    ghost: 'text-white/70 hover:text-white hover:bg-white/5',
    secondary: 'bg-white/10 text-white hover:bg-white/20',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 hover:border-red-500',
  };

  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none';

  return (
    <button
      ref={ref}
      className={baseClasses + ' ' + variants[variant] + ' ' + (className || '')}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {props.children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;