'use client';

/**
 * Card Component - Container reutilizável com tema Iron Man
 */
export default function Card({ children, className = '', gradient = false }) {
  return (
    <div className={`
      rounded-2xl border transition-all duration-300
      ${gradient 
        ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-600 hover:border-red-500/50' 
        : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
      }
      ${className}
    `}>
      {children}
    </div>
  );
}
