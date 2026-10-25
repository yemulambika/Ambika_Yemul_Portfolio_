import React from 'react';

const Input = ({ label, type = 'text', error, helperText, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="label">{label}</label>}
      <input
        type={type}
        className={`w-full px-4 py-3 rounded-lg bg-fg/5 border text-fg placeholder-fg/40 focus:outline-none focus:ring-1 transition-all duration-300 ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-fg/10 focus:border-accent focus:ring-accent'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      {helperText && <p className="mt-1 text-xs text-fg/50">{helperText}</p>}
    </div>
  );
};

export default Input;