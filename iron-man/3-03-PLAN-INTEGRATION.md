# Plano 3-03: Integração Dashboard + API

**Fase:** 3 - Integração Frontend-DB  
**Tipo:** Full-stack Integration  
**Dependências:** 3-01 (API), 3-02 (Componentes)  
**Estimativa:** 30-45 minutos

---

## 🎯 Objetivo

Integrar componentes com API e atualizar dashboard principal para listar/criar/editar projetos.

---

## 📁 Arquivos a Modificar

### 1. `src/pages/index.jsx` (Dashboard Principal)

**Substituir conteúdo atual por:**

```jsx
import { useState, useEffect } from 'react'
import Head from 'next/head'
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
              <div>
                <h1 className="text-3xl font-bold">🦾 IRON MAN</h1>
                <p className="text-sm opacity-80 mt-1">
                  Sistema de Orçamentos para Construção Civil
                </p>
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
```

---

## 🔧 Ajustes Necessários

### 1. Atualizar `src/lib/database.js`

**Adicionar funções faltantes:**

```javascript
// Se não existir, adicionar:
function getAllProjects() {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM projects ORDER BY created_at DESC')
  return stmt.all()
}

function getProjectById(id) {
  const db = getDatabase()
  const stmt = db.prepare('SELECT * FROM projects WHERE id = ?')
  return stmt.get(id)
}

function createProject(data) {
  const db = getDatabase()
  const stmt = db.prepare(`
    INSERT INTO projects (nome, area_m2, tipo_obra, padrao, cliente, status, valor_total)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
  const result = stmt.run(
    data.nome,
    data.area_m2,
    data.tipo_obra,
    data.padrao,
    data.cliente || null,
    data.status || 'rascunho',
    data.valor_total || 0
  )
  return getProjectById(result.lastInsertRowid)
}

function updateProject(id, data) {
  const db = getDatabase()
  const fields = []
  const values = []
  
  Object.keys(data).forEach(key => {
    fields.push(`${key} = ?`)
    values.push(data[key])
  })
  
  values.push(id)
  
  const stmt = db.prepare(`
    UPDATE projects SET ${fields.join(', ')} WHERE id = ?
  `)
  stmt.run(...values)
  
  return getProjectById(id)
}

function deleteProject(id) {
  const db = getDatabase()
  const stmt = db.prepare('DELETE FROM projects WHERE id = ?')
  stmt.run(id)
}

// Exportar todas as funções
module.exports = {
  // ... existing exports
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
}
```

---

### 2. Verificar `src/lib/orcamento.js`

**Garantir que exporta `calculateOrcamento`:**

```javascript
// Se não existir, criar:
function calculateOrcamento(area_m2, tipo_obra, padrao) {
  // Usar lógica existente de cálculo
  const precoPorM2 = obterPrecoPorM2(tipo_obra, padrao)
  const valorTotal = area_m2 * precoPorM2
  
  // Calcular divisão materiais vs mão de obra (60/40 típico)
  const materiaisTotal = valorTotal * 0.6
  const maoDeObraTotal = valorTotal * 0.4
  
  // Estimar tempo e equipe
  const tempoEstimado = estimarTempo(area_m2, tipo_obra)
  const equipeEstimada = estimarEquipe(area_m2)
  
  return {
    valorTotal,
    materiaisTotal,
    maoDeObraTotal,
    tempoEstimado,
    equipeEstimada,
    area_m2,
    tipo_obra,
    padrao
  }
}

module.exports = {
  // ... existing exports
  calculateOrcamento
}
```

---

## ✅ Critérios de Aceite

- [ ] Dashboard carrega lista de projetos ao abrir
- [ ] Botão "Novo Projeto" abre modal
- [ ] Formulário salva via API
- [ ] Editar projeto atualiza dados
- [ ] Duplicar cria cópia idêntica
- [ ] Excluir remove do dashboard
- [ ] Auto-save indicator mostra status
- [ ] Loading skeleton aparece durante fetch
- [ ] Empty state mostra quando sem projetos

---

## 🧪 Testes Manuais

1. **Abrir dashboard** → `/` → Ver lista de projetos
2. **Criar novo** → Click "Novo Projeto" → Preencher → Salvar
3. **Editar** → Click "Editar" no card → Mudar valor → Auto-save
4. **Duplicar** → Click ícone copiar → Ver nova cópia
5. **Excluir** → Click lixeira → Confirmar → Some da lista
6. **Refresh** → F5 → Dados persistem

---

## 📝 Notas

- Manter consistência com tema Iron Man
- Testar em mobile (responsivo)
- Logs no console para debugging
- Sem autenticação no MVP

---

*Plano pronto para execução*
