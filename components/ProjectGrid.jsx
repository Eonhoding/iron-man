import ProjectCard from './ProjectCard'
import { Plus } from 'lucide-react'

export default function ProjectGrid({ projects, onEdit, onDuplicate, onDelete, onNew }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏗️</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">
          Nenhum projeto ainda
        </h3>
        <p className="text-gray-500 mb-6">
          Crie seu primeiro orçamento de obra!
        </p>
        <button
          onClick={onNew}
          className="inline-flex items-center gap-2 px-6 py-3 bg-iron-red text-white rounded-lg hover:bg-iron-red-dark transition-colors font-semibold shadow-lg"
        >
          <Plus size={20} /> Criar Primeiro Projeto
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Header com botão novo */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Meus Projetos</h2>
        <button
          onClick={onNew}
          className="flex items-center gap-2 px-4 py-2 bg-iron-red text-white rounded-lg hover:bg-iron-red-dark transition-colors font-medium shadow"
        >
          <Plus size={18} /> Novo Projeto
        </button>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  )
}
