# Plano 3-02: Componentes UI para Projetos

**Fase:** 3 - Integração Frontend-DB  
**Tipo:** Frontend Components  
**Dependências:** Nenhuma (paralelo com 3-01)  
**Estimativa:** 45-60 minutos

---

## 🎯 Objetivo

Criar componentes React reutilizáveis para o dashboard de projetos.

---

## 📁 Arquivos a Criar

### 1. `src/components/ProjectCard.jsx`

```jsx
import Card from './Card'
import { Pencil, Copy, Trash2 } from 'lucide-react'

export default function ProjectCard({ project, onEdit, onDuplicate, onDelete }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR')
  }

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <div onClick={() => onEdit(project)}>
        {/* Header com ícone do tipo */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">
            {project.tipo_obra === 'residencial' && '🏠'}
            {project.tipo_obra === 'comercial' && '🏢'}
            {project.tipo_obra === 'industrial' && '🏭'}
          </span>
          <h3 className="font-bold text-lg truncate">{project.nome}</h3>
        </div>

        {/* Meta info */}
        <div className="text-sm text-gray-600 mb-3">
          <div className="flex justify-between">
            <span>{project.area_m2} m²</span>
            <span className="font-semibold text-iron-gold">
              {formatCurrency(project.valor_total)}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Criado em {formatDate(project.created_at)}
          </div>
        </div>

        {/* Badge de status */}
        <div className="mb-3">
          <span className={`px-2 py-1 rounded-full text-xs ${
            project.status === 'finalizado' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {project.status === 'finalizado' ? '✅ Finalizado' : '📝 Rascunho'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t border-gray-200">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(project) }}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-iron-red text-white rounded hover:bg-iron-red-dark transition-colors text-sm"
        >
          <Pencil size={14} /> Editar
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDuplicate(project) }}
          className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          title="Duplicar"
        >
          <Copy size={14} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(project) }}
          className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
          title="Excluir"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </Card>
  )
}
```

---

### 2. `src/components/ProjectGrid.jsx`

```jsx
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
          className="inline-flex items-center gap-2 px-6 py-3 bg-iron-red text-white rounded-lg hover:bg-iron-red-dark transition-colors font-semibold"
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
        <h2 className="text-2xl font-bold">Meus Projetos</h2>
        <button
          onClick={onNew}
          className="flex items-center gap-2 px-4 py-2 bg-iron-red text-white rounded-lg hover:bg-iron-red-dark transition-colors"
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
```

---

### 3. `src/components/ProjectForm.jsx`

```jsx
import { useState, useEffect } from 'react'
import Input from './Input'
import Select from './Select'
import Button from './Button'
import Card from './Card'
import { calculateOrcamento } from '../lib/orcamento'

export default function ProjectForm({ project, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    nome: project?.nome || '',
    area_m2: project?.area_m2 || '',
    tipo_obra: project?.tipo_obra || 'residencial',
    padrao: project?.padrao || 'medio',
    cliente: project?.cliente || '',
    status: project?.status || 'rascunho'
  })

  const [preview, setPreview] = useState(null)
  const [saveStatus, setSaveStatus] = useState('idle') // idle, saving, saved, error

  // Calcular preview em tempo real
  useEffect(() => {
    if (formData.area_m2 && formData.tipo_obra && formData.padrao) {
      const calculo = calculateOrcamento(
        parseFloat(formData.area_m2),
        formData.tipo_obra,
        formData.padrao
      )
      setPreview(calculo)
    }
  }, [formData.area_m2, formData.tipo_obra, formData.padrao])

  // Auto-save
  useEffect(() => {
    if (saveStatus === 'idle' && project?.id) {
      const timer = setTimeout(() => {
        handleSave()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [formData])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setSaveStatus('idle')
  }

  const handleSave = async () => {
    setSaveStatus('saving')
    try {
      await onSave({ ...formData, id: project?.id })
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (error) {
      setSaveStatus('error')
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* Campos principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nome do Projeto *"
          value={formData.nome}
          onChange={(v) => handleChange('nome', v)}
          placeholder="Ex: Casa de Praia"
          required
        />
        <Input
          label="Cliente"
          value={formData.cliente}
          onChange={(v) => handleChange('cliente', v)}
          placeholder="Ex: João Silva"
        />
        <Input
          label="Área (m²) *"
          type="number"
          value={formData.area_m2}
          onChange={(v) => handleChange('area_m2', parseFloat(v))}
          placeholder="Ex: 150"
          min="10"
          max="10000"
          required
        />
        <Select
          label="Tipo de Obra *"
          value={formData.tipo_obra}
          onChange={(v) => handleChange('tipo_obra', v)}
          options={[
            { value: 'residencial', label: '🏠 Residencial' },
            { value: 'comercial', label: '🏢 Comercial' },
            { value: 'industrial', label: '🏭 Industrial' }
          ]}
          required
        />
        <Select
          label="Padrão de Acabamento *"
          value={formData.padrao}
          onChange={(v) => handleChange('padrao', v)}
          options={[
            { value: 'economico', label: '💰 Econômico' },
            { value: 'medio', label: '⭐ Médio' },
            { value: 'alto', label: '💎 Alto' }
          ]}
          required
        />
        <Select
          label="Status"
          value={formData.status}
          onChange={(v) => handleChange('status', v)}
          options={[
            { value: 'rascunho', label: '📝 Rascunho' },
            { value: 'finalizado', label: '✅ Finalizado' }
          ]}
        />
      </div>

      {/* Preview em tempo real */}
      {preview && (
        <Card className="bg-gradient-to-r from-iron-dark to-iron-red p-6 text-white">
          <h3 className="text-lg font-bold mb-4">🔮 Preview do Orçamento</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm opacity-80">Valor Total</div>
              <div className="text-2xl font-bold">{formatCurrency(preview.valorTotal)}</div>
            </div>
            <div>
              <div className="text-sm opacity-80">Mão de Obra</div>
              <div className="text-xl">{formatCurrency(preview.maoDeObraTotal)}</div>
            </div>
            <div>
              <div className="text-sm opacity-80">Materiais</div>
              <div className="text-xl">{formatCurrency(preview.materiaisTotal)}</div>
            </div>
          </div>
          <div className="text-sm opacity-60 mt-4">
            {preview.tempoEstimado} • {preview.equipeEstimada}
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-sm">
          {saveStatus === 'saving' && <span className="text-yellow-600">💾 Salvando...</span>}
          {saveStatus === 'saved' && <span className="text-green-600">✅ Salvo</span>}
          {saveStatus === 'error' && <span className="text-red-600">❌ Erro ao salvar</span>}
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            {project?.id ? 'Salvar Alterações' : 'Criar Projeto'}
          </Button>
        </div>
      </div>
    </div>
  )
}
```

---

### 4. `src/components/ProjectModal.jsx`

```jsx
import { useEffect } from 'react'
import { X } from 'lucide-react'
import ProjectForm from './ProjectForm'

export default function ProjectModal({ isOpen, project, onClose, onSave }) {
  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-xl font-bold">
            {project?.id ? 'Editar Projeto' : 'Novo Projeto'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <ProjectForm
            project={project}
            onSave={onSave}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  )
}
```

---

### 5. `src/components/AutoSaveIndicator.jsx`

```jsx
export default function AutoSaveIndicator({ status }) {
  if (status === 'idle') return null

  return (
    <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition-all ${
      status === 'saving' && 'bg-yellow-100 text-yellow-800',
      status === 'saved' && 'bg-green-100 text-green-800',
      status === 'error' && 'bg-red-100 text-red-800'
    }`}>
      {status === 'saving' && '💾 Salvando...'}
      {status === 'saved' && '✅ Salvo'}
      {status === 'error' && '❌ Erro ao salvar'}
    </div>
  )
}
```

---

## ✅ Critérios de Aceite

- [ ] ProjectCard renderiza informações corretamente
- [ ] ProjectGrid mostra empty state quando vazio
- [ ] ProjectForm calcula preview em tempo real
- [ ] Auto-save dispara após 3s de inatividade
- [ ] Modal fecha com ESC e click no backdrop
- [ ] Todos componentes responsivos (mobile/desktop)
- [ ] Icons lucide-react importados corretamente

---

## 📝 Notas

- Usar componentes existentes (Button, Input, Select, Card)
- Manter tema Iron Man (cores: vermelho, dourado, metálico)
- lucide-react já está nas dependências
- Testar em mobile (grid responsivo)

---

*Plano pronto para execução*
