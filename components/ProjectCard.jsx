import { Pencil, Copy, Trash2, Home, Building2, Factory, Calendar } from 'lucide-react'

export default function ProjectCard({ project, onEdit, onDuplicate, onDelete, index }) {
  const formatCurrency = (v) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v)
  const formatDate = (d) => d ? new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }) : ''

  const Icon = project.tipo_obra === 'residencial' ? Home : project.tipo_obra === 'comercial' ? Building2 : Factory

  return (
    <div 
      className="group bg-white rounded-3xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 border border-slate-100 hover:border-iron-red-200 transform hover:-translate-y-1"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start gap-4">
        {/* Icon with Gradient */}
        <div className="w-14 h-14 bg-gradient-to-br from-iron-red-500 to-iron-red-700 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
          <Icon size={28} className="text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-slate-800 truncate group-hover:text-iron-red-600 transition-colors">
                {project.nome}
              </h3>
              <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                <span className="font-medium">{project.area_m2} m²</span>
                <span>•</span>
                <span className="capitalize">{project.tipo_obra}</span>
              </div>
            </div>
            
            <div className="text-right flex-shrink-0">
              <div className="text-2xl font-display font-bold bg-gradient-to-r from-iron-red-600 to-iron-red-400 bg-clip-text text-transparent">
                {formatCurrency(project.valor_total || 0)}
              </div>
              <div className="flex items-center justify-end gap-1 text-xs text-slate-400 mt-1">
                <Calendar size={12} />
                {formatDate(project.created_at)}
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
              project.status === 'finalizado' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-amber-100 text-amber-700'
            }`}>
              {project.status === 'finalizado' ? '✓' : '📝'}
              {project.status === 'finalizado' ? 'Finalizado' : 'Rascunho'}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-slate-100">
            <button
              onClick={() => onEdit(project)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-iron-red-600 to-iron-red-500 hover:from-iron-red-500 hover:to-iron-red-400 text-white rounded-xl font-semibold transition-all transform hover:scale-105 text-sm"
            >
              <Pencil size={16} />
              Editar
            </button>
            <button
              onClick={() => onDuplicate(project)}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
              title="Duplicar"
            >
              <Copy size={18} />
            </button>
            <button
              onClick={() => onDelete(project)}
              className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
              title="Excluir"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
