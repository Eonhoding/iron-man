'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Hammer, Plus } from 'lucide-react'
import ProjectGrid from '../components/ProjectGrid'
import ProjectModal from '../components/ProjectModal'
import AutoSaveIndicator from '../components/AutoSaveIndicator'

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [saveStatus, setSaveStatus] = useState('idle')

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Erro ao carregar projetos:', error)
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
    try {
      const res = await fetch(`/api/projects/${project.id}/duplicate`, { method: 'POST' })
      const data = await res.json()
      setProjects(prev => [data.duplicate, ...prev])
    } catch (error) {
      console.error('Erro ao duplicar:', error)
    }
  }

  const handleDeleteProject = async (project) => {
    if (!confirm(`Tem certeza que deseja excluir "${project.nome}"?`)) return
    try {
      await fetch(`/api/projects/${project.id}`, { method: 'DELETE' })
      setProjects(prev => prev.filter(p => p.id !== project.id))
    } catch (error) {
      console.error('Erro ao excluir:', error)
    }
  }

  const handleSaveProject = async (projectData) => {
    setSaveStatus('saving')
    try {
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
      setSaveStatus('saved')
      setModalOpen(false)
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (error) {
      console.error('Erro ao salvar:', error)
      setSaveStatus('error')
      throw error
    }
  }

  return (
    <>
      <Head>
        <title>IRON MAN - Orçamentos</title>
        <meta name="description" content="Sistema de Orçamentos para Construção Civil" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes staggerFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        .animate-stagger { animation: staggerFadeIn 0.4s ease-out 0.2s forwards; opacity: 0; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col">
        {/* Header Melhorado */}
        <header className="relative overflow-hidden bg-gradient-to-r from-iron-slate via-iron-slate-dark to-iron-red text-white shadow-2xl animate-fade-in">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-iron-gold to-iron-gold-dark rounded-2xl flex items-center justify-center shadow-iron-lg transform hover:scale-105 transition-transform duration-300">
                  <Hammer className="w-10 h-10 text-iron-slate" />
                </div>
                <div>
                  <h1 className="text-4xl font-display font-black tracking-tight drop-shadow-lg">
                    🦾 IRON MAN
                  </h1>
                  <p className="text-sm opacity-90 mt-1 font-medium">
                    Sistema de Orçamentos para Construção Civil
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm opacity-80">Bem-vindo</div>
                <div className="font-bold text-xl drop-shadow">Joelson Lameira</div>
                <div className="flex gap-3 mt-2 text-sm">
                  <span className="bg-white/20 backdrop-blur px-3 py-1.5 rounded-full font-medium">
                    📊 {projects.length} {projects.length === 1 ? 'Projeto' : 'Projetos'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full animate-stagger">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
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

        {/* Auto-save Indicator */}
        <AutoSaveIndicator status={saveStatus} />

        {/* Footer Melhorado */}
        <footer className="mt-auto py-8 bg-gradient-to-r from-iron-slate to-iron-slate-dark text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">🦾</span>
              <span className="font-bold text-lg">IRON MAN</span>
            </div>
            <p className="text-sm opacity-80 mb-2">
              Sistema de Orçamentos para Construção Civil
            </p>
            <p className="text-xs opacity-60">
              Desenvolvido com 🤖 por Aurora • v1.0
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs opacity-50">
              <span>⚡ Next.js</span>
              <span>🎨 Tailwind</span>
              <span>💾 SQLite</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
