# Pesquisa de Implementação - Fase 3

**Fase:** 3 - Integração Frontend-DB  
**Projeto:** IRON MAN  
**Data:** 2026-03-10

---

## 1. Stack Research

### NextJS API Routes (já configurado)
**Padrão:** `pages/api/*.js`
```javascript
export default function handler(req, res) {
  if (req.method === 'POST') { /* criar */ }
  if (req.method === 'GET') { /* ler */ }
  if (req.method === 'PUT') { /* atualizar */ }
  if (req.method === 'DELETE') { /* deletar */ }
}
```

**Melhor prática:** Uma rota por recurso (`/api/projects/[id].js`)

### SQLite com Node.js (já temos)
**Módulo:** `src/lib/database.js`
- Já tem CRUD pronto
- Usa `sqlite3` npm package
- Path: `data/iron-man.db`

### React Hooks para Formulário
**Recomendado:** `useState` + `useEffect` para auto-save
```javascript
const [formData, setFormData] = useState(initial)
const [saveStatus, setSaveStatus] = useState('idle')

useEffect(() => {
  const timer = setTimeout(() => {
    saveProject(formData)
    setSaveStatus('saved')
  }, 3000)
  return () => clearTimeout(timer)
}, [formData])
```

---

## 2. UI/UX Patterns

### Dashboard Grid
**Tailwind:**
```html
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map(p => <ProjectCard key={p.id} project={p} />)}
</div>
```

### Modal (Dialog)
**Opção 1:** Headless UI `Dialog` (já instalado com @headlessui/react)
**Opção 2:** Modal customizado com backdrop

**Recomendado:** Headless UI - acessível, animações suaves

### Auto-save Indicator
**Padrão da indústria:**
- Notion: "Saved" discreto no topo
- Google Docs: Ícone de check + "Saved to Drive"
- Linear: Toast sutil no canto

**Nossa implementação:** Toast no canto inferior direito, fade out 2s

### Cards
**Informação hierárquica:**
```
┌─────────────────────────┐
│ 🏠 Casa Praia           │ ← Título bold
│ 150 m² • R$ 225.000     │ ← Meta info
│ Criado em 10/03/2026    │ ← Timestamp
│ [📝 Editar] [⋮ Mais]    │ ← Actions
└─────────────────────────┘
```

---

## 3. Data Flow

### Create Flow
```
User types → Form state updates → Preview recalculates
                                              ↓
                              (auto-save debounce 3s)
                                              ↓
                              POST /api/projects
                                              ↓
                              DB insert → return ID
                                              ↓
                              Dashboard refresh
```

### Update Flow
```
User clicks card → Modal opens with data
                              ↓
User edits → Form state updates
                              ↓
              (auto-save debounce 3s)
                              ↓
              PUT /api/projects/[id]
                              ↓
              DB update → return success
```

### List Flow
```
Dashboard mounts
        ↓
GET /api/projects
        ↓
DB query all projects
        ↓
Map to ProjectCard components
        ↓
Render grid
```

---

## 4. Error Handling

### API Errors
**Estrutura:**
```javascript
{
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Nome é obrigatório',
    field: 'nome'
  }
}
```

### Frontend Handling
- Validação inline previne erros de API
- Toast error se API falhar
- Retry button para operações críticas

### Database Errors
- Try/catch em todas as queries
- Log error para debugging
- Retornar 500 genérico para usuário

---

## 5. Performance Considerations

### Otimizações
1. **Debounce auto-save:** 3s previne writes excessivos
2. **Optimistic updates:** UI atualiza antes do DB confirmar
3. **Skeleton loading:** Melhor perceived performance
4. **Index DB:** `CREATE INDEX idx_projects_status ON projects(status)`

### Bundle Size
- Componentes lazy-loaded? Não necessário para MVP
- Code splitting? NextJS faz automático

### Query Performance
- `SELECT * FROM projects ORDER BY created_at DESC`
- Com < 1000 projetos: sem otimização necessária
- Futuro: paginação se > 100 projetos

---

## 6. Security

### Input Sanitization
- `nome`: strip HTML tags, trim whitespace
- `area_m2`: parseFloat, validar range
- Enums: validar contra whitelist

### SQL Injection
- Usar prepared statements (database.js já usa)
- Nunca concatenar strings em queries

### Rate Limiting
- MVP: sem rate limit (uso interno)
- Futuro: `express-rate-limit` se expor público

---

## 7. Testing Strategy

### Unit Tests (Jest)
- `orcamento.js` → cálculos corretos
- `database.js` → CRUD funciona

### Integration Tests
- API endpoints → respondem corretamente
- Auto-save → debounced corretamente

### Manual Testing
- Criar projeto → aparece no dashboard
- Editar → mudanças persistem
- Duplicar → cópia idêntica
- Excluir → some do dashboard

---

## 8. Dependencies

### Já Instaladas
- `next` ^14.1.0 ✅
- `react` ^18.2.0 ✅
- `sqlite3` ^5.1.7 ✅
- `tailwindcss` ^3.4.1 ✅

### Não Precisa Instalar Nada Novo! 🎉

---

## 9. Files to Create/Modify

### Criar:
```
src/pages/api/projects/[id].js    # GET, PUT, DELETE
src/pages/api/projects/index.js   # GET, POST
src/components/ProjectForm.jsx
src/components/ProjectCard.jsx
src/components/ProjectGrid.jsx
src/components/ProjectModal.jsx
src/components/AutoSaveIndicator.jsx
```

### Modificar:
```
src/pages/index.jsx               # Dashboard principal
```

---

## 10. Riscos Identificados

| Risco | Probabilidade | Mitigação |
|-------|---------------|-----------|
| Auto-save conflitar com edição manual | Baixa | Debounce 3s + optimistic update |
| Modal não fechar em mobile | Média | Testar responsivo |
| DB lock em writes simultâneos | Baixa | SQLite lida bem, MVP é single-user |
| Preview desatualizado | Baixa | Recalcular em cada change |

---

*Pesquisa completa. Pronto para planejamento.*
