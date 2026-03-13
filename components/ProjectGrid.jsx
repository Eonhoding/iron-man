import ProjectCard from './ProjectCard'
import { Plus, Building2, Sparkles } from 'lucide-react'

export default function ProjectGrid({ projects, onNew, onEdit, onDuplicate, onDelete }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        {/* Animated Icon */}
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-iron-red-500 to-iron-red-700 rounded-3xl flex items-center justify-center shadow-glow animate-float">
            <Building2 size={48} className="text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-iron-gold-400 rounded-xl flex items-center justify-center animate-pulse">
            <Sparkles size={20} className="text-iron-dark-900" />
          </div>
        </div>
        
        <h3 className="text-2xl font-display font-bold text-slate-800 mb-3">
          Vamos construir algo incrível!
        </h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
          Seu primeiro orçamento de obra está a um clique de distância. 
          Rápido, simples e profissional.
        </p>
        
        <button
          onClick={onNew}
          className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-iron-red-600 to-iron-red-500 hover:from-iron-red-500 hover:to-iron-red-400 text-white rounded-2xl font-bold text-lg transition-all shadow-glow hover:shadow-glow-lg transform hover:scale-105"
        >
          <Plus size={24} className="group-hover:rotate-90 transition-transform" />
          Criar Primeiro Projeto
        </button>

        {/* Feature Pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-600 shadow-card">⚡ 5 minutos</span>
          <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-600 shadow-card">📊 Exportável</span>
          <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-600 shadow-card">🎨 Profissional</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-bold text-slate-800">
          Meus Projetos
          <span className="ml-2 text-sm font-normal text-slate-500">({projects.length})</span>
        </h2>
        <button
          onClick={onNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-iron-red-600 to-iron-red-500 hover:from-iron-red-500 hover:to-iron-red-400 text-white rounded-xl font-semibold transition-all transform hover:scale-105 text-sm"
        >
          <Plus size={18} />
          Novo
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={onEdit}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
            index={i}
          />
        ))}
      </div>
    </div>
  )
}
