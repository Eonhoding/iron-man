import { Pencil, Copy, Trash2, Home, Building2, Factory } from 'lucide-react'

export default function ProjectCard({ project, onEdit, onDuplicate, onDelete }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatDate = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  }

  const getTypeIcon = () => {
    switch(project.tipo_obra) {
      case 'residencial': return <Home size={20} className="text-primary" />
      case 'comercial': return <Building2 size={20} className="text-primary" />
      case 'industrial': return <Factory size={20} className="text-primary" />
      default: return <Building2 size={20} className="text-primary" />
    }
  }

  return (
    <div className="bg-surface rounded-2xl p-4 shadow-soft border border-border hover:shadow-medium transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center flex-shrink-0">
            {getTypeIcon()}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-secondary truncate">{project.nome}</h3>
            <p className="text-sm text-gray-500">{project.area_m2} m² • {project.tipo_obra}</p>
          </div>
        </div>
        
        <div className="text-right flex-shrink-0">
          <div className="text-lg font-bold text-primary">{formatCurrency(project.valor_total || 0)}</div>
          <div className="text-xs text-gray-400">{formatDate(project.created_at)}</div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
          project.status === 'finalizado' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-amber-100 text-amber-700'
        }`}>
          {project.status === 'finalizado' ? '✓ Finalizado' : '📝 Rascunho'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t border-border">
        <button
          onClick={() => onEdit(project)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-colors text-sm"
        >
          <Pencil size={16} />
          Editar
        </button>
        <button
          onClick={() => onDuplicate(project)}
          className="px-4 py-2.5 bg-background hover:bg-gray-100 text-secondary rounded-xl transition-colors"
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
  )
}
