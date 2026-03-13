import ProjectCard from './ProjectCard'
import { Plus, Building2 } from 'lucide-react'

export default function ProjectGrid({ projects, onNew, onEdit, onDuplicate, onDelete }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-background rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Building2 size={40} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-secondary mb-2">
          Nenhum projeto ainda
        </h3>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          Crie seu primeiro orçamento de obra em minutos
        </p>
        <button
          onClick={onNew}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-colors"
        >
          <Plus size={20} />
          Criar Primeiro Projeto
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
