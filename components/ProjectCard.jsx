import Card from './Card'
import { Pencil, Copy, Trash2 } from 'lucide-react'

export default function ProjectCard({ project, onEdit, onDuplicate, onDelete }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('pt-BR')
  }

  return (
    <Card className="group relative overflow-hidden rounded-2xl border-2 border-transparent bg-gradient-to-br from-white to-gray-50 hover:border-iron-red-light hover:shadow-iron-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-iron-red/10 to-iron-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative p-6">
        {/* Header with animated icon */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-iron-red to-iron-red-dark flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
            {project.tipo_obra === 'residencial' && '🏠'}
            {project.tipo_obra === 'comercial' && '🏢'}
            {project.tipo_obra === 'industrial' && '🏭'}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 truncate group-hover:text-iron-red transition-colors">
              {project.nome}
            </h3>
            <p className="text-sm text-gray-500">{project.area_m2} m²</p>
          </div>
        </div>

        {/* Value with highlight */}
        <div className="mb-4 p-3 bg-gradient-to-r from-iron-gold/10 to-iron-gold/5 rounded-lg border border-iron-gold/20">
          <div className="text-xs text-gray-500 mb-1 font-medium">Valor Total</div>
          <div className="text-xl font-black text-iron-red">
            {formatCurrency(project.valor_total || 0)}
          </div>
        </div>

        {/* Status badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold ${
            project.status === 'finalizado' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-amber-100 text-amber-800'
          }`}>
            {project.status === 'finalizado' ? '✅' : '📝'}
            {project.status === 'finalizado' ? 'Finalizado' : 'Rascunho'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-200">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(project) }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-iron-red to-iron-red-dark text-white rounded-lg hover:shadow-lg transition-all text-sm font-bold transform hover:scale-105"
          >
            <Pencil size={16} /> Editar
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDuplicate(project) }}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            title="Duplicar"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(project) }}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            title="Excluir"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </Card>
  )
}
