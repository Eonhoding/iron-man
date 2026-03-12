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
  const [saveStatus, setSaveStatus] = useState('idle')

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
  }, [formData, saveStatus, project?.id])

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
      throw error
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
            ⏱️ {preview.tempoEstimado} • 👷 {preview.equipeEstimada}
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-sm font-medium">
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
