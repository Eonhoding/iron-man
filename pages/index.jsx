'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Hammer, Plus, Building2, Home, Factory } from 'lucide-react'
import ProjectGrid from '../components/ProjectGrid'
import ProjectModal from '../components/ProjectModal'

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNewProject = () => {
    setSelectedProject(null)
    setModalOpen(true)
  }

  const handleEditProject = (project) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  const handleDuplicateProject = async (project) => {
    const res = await fetch(`/api/projects/${project.id}/duplicate`, { method: 'POST' })
    const data = await res.json()
    setProjects(prev => [data.duplicate, ...prev])
  }

  const handleDeleteProject = async (project) => {
    if (!confirm(`Excluir "${project.nome}"?`)) return
    await fetch(`/api/projects/${project.id}`, { method: 'DELETE' })
    setProjects(prev => prev.filter(p => p.id !== project.id))
  }

  const handleSaveProject = async (projectData) => {
    const url = projectData.id ? `/api/projects/${projectData.id}` : '/api/projects'
    const method = projectData.id ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    })
    const data = await res.json()
    if (projectData.id) {
      setProjects(prev => prev.map(p => p.id === projectData.id ? data.project : p))
    } else {
      setProjects(prev => [data.project, ...prev])
    }
    setModalOpen(false)
  }

  const totalValue = projects.reduce((sum, p) => sum + (p.valor_total || 0), 0)

  return (
    <>
      <Head>
        <title>IRON MAN - Orçamentos</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-background">
        {/* Header Limpo */}
        <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-lg border-b border-border">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Hammer className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-secondary">IRON MAN</h1>
                  <p className="text-xs text-gray-500">Orçamentos</p>
                </div>
              </div>
              
              <button
                onClick={handleNewProject}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-colors text-sm"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Novo Projeto</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-background rounded-xl p-3 border border-border">
                <div className="text-xs text-gray-500 mb-1">Projetos</div>
                <div className="text-2xl font-bold text-secondary">{projects.length}</div>
              </div>
              <div className="bg-background rounded-xl p-3 border border-border">
                <div className="text-xs text-gray-500 mb-1">Valor Total</div>
                <div className="text-lg font-bold text-primary">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalValue)}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="max-w-5xl mx-auto px-4 py-6">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-surface rounded-2xl p-4 shadow-soft animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <ProjectGrid
              projects={projects}
              onNew={handleNewProject}
              onEdit={handleEditProject}
              onDuplicate={handleDuplicateProject}
              onDelete={handleDeleteProject}
            />
          )}
        </main>

        {/* Modal */}
        <ProjectModal
          isOpen={modalOpen}
          project={selectedProject}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveProject}
        />
      </div>
    </>
  )
}
