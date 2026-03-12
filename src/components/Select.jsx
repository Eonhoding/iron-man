'use client';

/**
 * Select Component - Dropdown com tema Iron Man
 */
export default function Select({
  label,
  value,
  onChange,
  options,
  placeholder = 'Selecione...',
  error,
  icon: Icon,
  className = ''
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
        <select
          value={value}
          onChange={onChange}
          className={`
            w-full bg-slate-900/50 border rounded-lg px-4 py-2.5 text-white
            appearance-none cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500
            transition-all duration-200
            ${Icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-500 focus:ring-red-500/50' 
              : 'border-slate-600 hover:border-slate-500'
            }
          `}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
