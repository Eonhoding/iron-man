import Card from './Card'
import { Pencil, Copy, Trash2, FileSpreadsheet, FileText } from 'lucide-react'

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

  const handleExportExcel = async (e) => {
    e.stopPropagation()
    try {
      const res = await fetch(`/api/export/excel?projectId=${project.id}`)
      if (!res.ok) throw new Error('Erro ao exportar')
      
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `IronMan_${project.nome.replace(/[^a-z0-9]/gi, '_')}.xlsx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erro ao exportar Excel:', error)
      alert('Erro ao exportar para Excel. Tente novamente.')
    }
  }

  const handleExportPDF = async (e) => {
    e.stopPropagation()
    try {
      const res = await fetch(`/api/export/pdf?projectId=${project.id}`)
      if (!res.ok) throw new Error('Erro ao exportar')
      
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `IronMan_${project.nome.replace(/[^a-z0-9]/gi, '_')}.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      // Instruir usuário a imprimir como PDF
      setTimeout(() => {
        alert('Arquivo HTML baixado! Abra o arquivo e use Ctrl+P (ou Cmd+P) para salvar como PDF.')
      }, 500)
    } catch (error) {
      console.error('Erro ao exportar PDF:', error)
      alert('Erro ao exportar para PDF. Tente novamente.')
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <div onClick={() => onEdit(project)}>
        {/* Header com ícone do tipo */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">
            {project.tipo_obra === 'residencial' && '🏠'}
            {project.tipo_obra === 'comercial' && '🏢'}
            {project.tipo_obra === 'industrial' && '🏭'}
          </span>
          <h3 className="font-bold text-lg truncate flex-1">{project.nome}</h3>
        </div>

        {/* Meta info */}
        <div className="text-sm text-gray-600 mb-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">{project.area_m2} m²</span>
            <span className="font-semibold text-iron-gold">
              {formatCurrency(project.valor_total || 0)}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Criado em {formatDate(project.created_at)}
          </div>
        </div>

        {/* Badge de status */}
        <div className="mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            project.status === 'finalizado' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {project.status === 'finalizado' ? '✅ Finalizado' : '📝 Rascunho'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t border-gray-200">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(project) }}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-iron-red text-white rounded hover:bg-iron-red-dark transition-colors text-sm font-medium"
        >
          <Pencil size={14} /> Editar
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDuplicate(project) }}
          className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          title="Duplicar"
        >
          <Copy size={14} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(project) }}
          className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
          title="Excluir"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </Card>
  )
}
