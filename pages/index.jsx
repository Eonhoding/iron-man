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

  // Carregar projetos ao montar
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
      const res = await fetch(`/api/projects/${project.id}/duplicate`, {
        method: 'POST'
      })
      const data = await res.json()
      setProjects(prev => [data.duplicate, ...prev])
    } catch (error) {
      console.error('Erro ao duplicar:', error)
    }
  }

  const handleDeleteProject = async (project) => {
    if (!confirm(`Tem certeza que deseja excluir "${project.nome}"?`)) {
      return
    }
    try {
      await fetch(`/api/projects/${project.id}`, {
        method: 'DELETE'
      })
      setProjects(prev => prev.filter(p => p.id !== project.id))
    } catch (error) {
      console.error('Erro ao excluir:', error)
    }
  }

  const handleSaveProject = async (projectData) => {
    setSaveStatus('saving')
    try {
      const url = projectData.id 
        ? `/api/projects/${projectData.id}` 
        : '/api/projects'
      const method = projectData.id ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      })

      const data = await res.json()
      
      if (projectData.id) {
        // Update existing
        setProjects(prev => prev.map(p => 
          p.id === projectData.id ? data.project : p
        ))
      } else {
        // Create new
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
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="bg-gradient-to-r from-iron-dark to-iron-red text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Hammer className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">🦾 IRON MAN</h1>
                  <p className="text-sm opacity-80 mt-1">
                    Sistema de Orçamentos para Construção Civil
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm opacity-80">Bem-vindo</div>
                <div className="font-semibold">Joelson Lameira</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {loading ? (
            // Skeleton loading
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl p-6 shadow animate-pulse">
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

        {/* Footer */}
        <footer className="mt-12 py-6 text-center text-sm text-gray-500">
          <p>IRON MAN v1.0 • Desenvolvido com 🤖 por Aurora</p>
        </footer>
      </div>
    </>
  )
}
