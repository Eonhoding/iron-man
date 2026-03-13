import { Plus, Building2, Sparkles, Home, Building, Factory } from 'lucide-react'

export default function ProjectList({ projects, onNew, onEdit, onDuplicate, onDelete }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Building2 size={40} className="text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">Nenhum projeto</h3>
        <p className="text-text-secondary mb-6 max-w-xs mx-auto">
          Crie seu primeiro orçamento em minutos
        </p>
        <button
          onClick={onNew}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold active:scale-95 transition-transform"
        >
          <Plus size={20} />
          Criar Projeto
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">
          Meus Projetos
          <span className="ml-2 text-sm font-normal text-text-secondary">({projects.length})</span>
        </h2>
      </div>

      {projects.map(project => (
        <div
          key={project.id}
          onClick={() => onEdit(project)}
          className="bg-surface rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              {project.tipo_obra === 'residencial' && <Home size={24} className="text-primary" />}
              {project.tipo_obra === 'comercial' && <Building size={24} className="text-primary" />}
              {project.tipo_obra === 'industrial' && <Factory size={24} className="text-primary" />}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold truncate">{project.nome}</h3>
              <div className="text-sm text-text-secondary mt-0.5">
                {project.area_m2} m² • {project.tipo_obra}
              </div>
              <div className="text-xs text-text-tertiary mt-1">
                {new Date(project.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
              </div>
            </div>

            {/* Value */}
            <div className="text-right flex-shrink-0">
              <div className="text-lg font-bold text-primary">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(project.valor_total || 0)}
              </div>
              <div className="mt-2">
                <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                  project.status === 'finalizado' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                }`}>
                  {project.status === 'finalizado' ? '✓' : '…'} {project.status === 'finalizado' ? 'Feito' : 'Rascunho'}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-border">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(project) }}
              className="flex-1 py-2 bg-primary text-white rounded-lg font-medium text-sm active:scale-95 transition-transform"
            >
              Editar
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDuplicate(project) }}
              className="px-4 py-2 bg-background rounded-lg active:scale-95 transition-transform"
            >
              Duplicar
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(project) }}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg active:scale-95 transition-transform"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
