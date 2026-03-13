'use client'

import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Hammer, Plus, TrendingUp, Building2 } from 'lucide-react'
import ProjectGrid from '../components/ProjectGrid'
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
    const method = data.id ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method, headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const json = await res.json()
    if (data.id) setProjects(p => p.map(x => x.id === data.id ? json.project : x))
    else setProjects(p => [json.project, ...p])
    setModalOpen(false)
  }

  const totalValue = projects.reduce((s, p) => s + (p.valor_total || 0), 0)
  const totalArea = projects.reduce((s, p) => s + (p.area_m2 || 0), 0)

  return (
    <>
      <Head>
        <title>IRON MAN - Orçamentos Inteligentes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmer { 0%{background-position:-1000px 0} 100%{background-position:1000px 0} }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .shimmer { animation: shimmer 2s infinite linear; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Hero Header com Gradiente Moderno */}
        <header className="relative overflow-hidden bg-gradient-to-br from-iron-dark-900 via-iron-dark-800 to-iron-red-800 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-iron-red-500 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
            <div className="absolute bottom-0 -right-4 w-72 h-72 bg-iron-gold-500 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay:'2s'}}></div>
          </div>

          {/* Content */}
          <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-16">
            <div className="flex items-center justify-between flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-iron-red-500 to-iron-red-700 rounded-2xl flex items-center justify-center shadow-glow transform hover:scale-105 transition-transform">
                  <Hammer className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight">
                    🦾 IRON MAN
                  </h1>
                  <p className="text-slate-300 mt-1 font-medium">Orçamentos Inteligentes</p>
                </div>
              </div>

              <button
                onClick={() => { setSelectedProject(null); setModalOpen(true) }}
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-iron-red-600 to-iron-red-500 hover:from-iron-red-500 hover:to-iron-red-400 text-white rounded-2xl font-bold transition-all shadow-glow hover:shadow-glow-lg transform hover:scale-105"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                <span>Novo Projeto</span>
              </button>
            </div>

            {/* Stats Cards com Glassmorphism */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-2 text-slate-300 text-sm mb-2">
                  <Building2 size={16} />
                  <span>Projetos</span>
                </div>
                <div className="text-3xl font-display font-bold">{projects.length}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-2 text-slate-300 text-sm mb-2">
                  <TrendingUp size={16} />
                  <span>Valor Total</span>
                </div>
                <div className="text-2xl font-display font-bold text-iron-gold-400">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(totalValue)}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hidden sm:block">
                <div className="text-slate-300 text-sm mb-2">Área Total</div>
                <div className="text-3xl font-display font-bold">{totalArea.toLocaleString('pt-BR')} m²</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hidden sm:block">
                <div className="text-slate-300 text-sm mb-2">Média por Projeto</div>
                <div className="text-2xl font-display font-bold text-iron-gold-400">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(projects.length ? totalValue / projects.length : 0)}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8 -mt-8">
          {loading ? (
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-3xl p-6 shadow-card animate-pulse">
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <ProjectGrid
              projects={projects}
              onNew={() => { setSelectedProject(null); setModalOpen(true) }}
              onEdit={setSelectedProject}
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
