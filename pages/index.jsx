'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Plus, TrendingUp, Building2, Hammer } from 'lucide-react'
import ProjectList from '../components/ProjectList'
import ProjectModal from '../components/ProjectModal'

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => { loadProjects() }, [])

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleSave = async (data) => {
    const url = data.id ? `/api/projects/${data.id}` : '/api/projects'
    const res = await fetch(url, {
      method: data.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const json = await res.json()
    if (data.id) setProjects(p => p.map(x => x.id === data.id ? json.project : x))
    else setProjects(p => [json.project, ...p])
    setModalOpen(false)
  }

  const totalValue = projects.reduce((s, p) => s + (p.valor_total || 0), 0)

  return (
    <>
      <Head>
        <title>IRON MAN</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-background">
        {/* Header Fixo */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Hammer className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">IRON MAN</h1>
                  <p className="text-xs text-text-secondary">Orçamentos</p>
                </div>
              </div>
              
              <button
                onClick={() => { setSelectedProject(null); setModalOpen(true) }}
                className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center active:scale-95 transition-transform"
              >
                <Plus size={20} className="text-white" />
              </button>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-text-secondary text-sm mb-2">
                <Building2 size={16} />
                <span>Projetos</span>
              </div>
              <div className="text-3xl font-bold">{projects.length}</div>
            </div>
            <div className="bg-surface rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 text-text-secondary text-sm mb-2">
                <TrendingUp size={16} />
                <span>Valor Total</span>
              </div>
              <div className="text-xl font-bold text-primary">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalValue)}
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Projetos */}
        <main className="max-w-3xl mx-auto px-4 pb-8">
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="bg-surface rounded-2xl p-4 animate-pulse">
                  <div className="h-5 bg-border rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-border rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-border rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <ProjectList
              projects={projects}
              onEdit={(p) => { setSelectedProject(p); setModalOpen(true) }}
              onDuplicate={async (p) => {
                const res = await fetch(`/api/projects/${p.id}/duplicate`, { method: 'POST' })
                const d = await res.json()
                setProjects(prev => [d.duplicate, ...prev])
              }}
              onDelete={async (p) => {
                if (!confirm(`Excluir "${p.nome}"?`)) return
                await fetch(`/api/projects/${p.id}`, { method: 'DELETE' })
                setProjects(prev => prev.filter(x => x.id !== p.id))
              }}
              onNew={() => { setSelectedProject(null); setModalOpen(true) }}
            />
          )}
        </main>

        <ProjectModal
          isOpen={modalOpen}
          project={selectedProject}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      </div>
    </>
  )
}
