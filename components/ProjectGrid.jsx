import ProjectCard from './ProjectCard'
import { Plus } from 'lucide-react'

export default function ProjectGrid({ projects, onNew, onEdit, onDuplicate, onDelete }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        {/* Animated illustration */}
        <div className="relative mb-6">
          <div className="text-8xl mb-4 animate-bounce">🏗️</div>
          <div className="absolute -top-4 -right-4 text-4xl animate-pulse">✨</div>
          <div className="absolute -bottom-2 -left-4 text-3xl animate-pulse">🚀</div>
        </div>
        
        <h3 className="text-2xl font-black text-gray-800 mb-3">
          Vamos construir algo incrível!
        </h3>
        <p className="text-gray-600 mb-2 max-w-md mx-auto">
          Seu primeiro orçamento de obra está a um clique de distância
        </p>
        <p className="text-sm text-gray-500 mb-8">
          💡 Dica: Comece com uma obra residencial simples
        </p>
        
        <button
          onClick={onNew}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-iron-red to-iron-red-dark text-white rounded-xl hover:shadow-iron-lg transition-all font-bold text-lg transform hover:scale-105"
        >
          <Plus size={24} className="group-hover:rotate-90 transition-transform" />
          Criar Primeiro Projeto
        </button>
        
        {/* Quick stats teaser */}
        <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="text-2xl font-bold text-iron-red">~5min</div>
            <div className="text-xs text-gray-500 mt-1">Tempo médio</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="text-2xl font-bold text-iron-gold">100%</div>
            <div className="text-xs text-gray-500 mt-1">Personalizável</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="text-2xl font-bold text-iron-blue">PDF</div>
            <div className="text-xs text-gray-500 mt-1">Exportação</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header com botão novo */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-black text-gray-800">Meus Projetos</h2>
        <button
          onClick={onNew}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-iron-red to-iron-red-dark text-white rounded-xl hover:shadow-iron-lg transition-all font-bold transform hover:scale-105"
        >
          <Plus size={20} /> Novo Projeto
        </button>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="animate-stagger"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProjectCard
              project={project}
              onEdit={onEdit}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
