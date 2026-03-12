'use client';

/**
 * Button Component - Botões com tema Iron Man
 */
export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  icon: Icon
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900';
  
  const variants = {
    primary: 'bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-500 hover:to-yellow-500 text-white shadow-lg shadow-red-500/25 focus:ring-red-500',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 focus:ring-slate-500',
    outline: 'bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500/10 focus:ring-red-500',
    ghost: 'bg-transparent hover:bg-slate-700 text-slate-300 hover:text-white focus:ring-slate-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}
