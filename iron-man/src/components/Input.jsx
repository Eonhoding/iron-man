'use client';

/**
 * Input Component - Campos de formulário com tema Iron Man
 */
export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full bg-slate-900/50 border rounded-lg px-4 py-2.5 text-white
            placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500
            transition-all duration-200
            ${Icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-500 focus:ring-red-500/50' 
              : 'border-slate-600 hover:border-slate-500'
            }
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
