# Plano 3-01: API Routes para Projetos

**Fase:** 3 - Integração Frontend-DB  
**Tipo:** Backend API  
**Dependências:** Nenhuma  
**Estimativa:** 30-45 minutos

---

## 🎯 Objetivo

Criar endpoints REST para CRUD de projetos no formato NextJS API Routes.

---

## 📁 Arquivos a Criar

### 1. `src/pages/api/projects/index.js`

**Métodos:** GET (listar), POST (criar)

```javascript
import db from '../../../lib/database'

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Listar todos os projetos
    const projects = db.getAllProjects()
    return res.status(200).json({ projects })
  }
  
  if (req.method === 'POST') {
    // Criar novo projeto
    const { nome, area_m2, tipo_obra, padrao } = req.body
    
    // Validações
    if (!nome || nome.length < 3) {
      return res.status(400).json({ 
        error: { code: 'VALIDATION_ERROR', message: 'Nome mínimo 3 caracteres', field: 'nome' }
      })
    }
    
    if (!area_m2 || area_m2 < 10) {
      return res.status(400).json({ 
        error: { code: 'VALIDATION_ERROR', message: 'Área mínima 10m²', field: 'area_m2' }
      })
    }
    
    const project = db.createProject({ nome, area_m2, tipo_obra, padrao })
    return res.status(201).json({ project })
  }
  
  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).json({ error: { message: `Method ${req.method} not allowed` } })
}
```

---

### 2. `src/pages/api/projects/[id].js`

**Métodos:** GET (obter), PUT (atualizar), DELETE (excluir)

```javascript
import db from '../../../../lib/database'

export default function handler(req, res) {
  const { id } = req.query
  
  if (req.method === 'GET') {
    const project = db.getProjectById(id)
    if (!project) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Projeto não encontrado' } })
    }
    return res.status(200).json({ project })
  }
  
  if (req.method === 'PUT') {
    const updates = req.body
    const project = db.updateProject(id, updates)
    return res.status(200).json({ project })
  }
  
  if (req.method === 'DELETE') {
    db.deleteProject(id)
    return res.status(204).end()
  }
  
  res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
  return res.status(405).json({ error: { message: `Method ${req.method} not allowed` } })
}
```

---

### 3. `src/pages/api/projects/[id]/duplicate.js`

**Método:** POST (duplicar)

```javascript
import db from '../../../../../lib/database'

export default function handler(req, res) {
  const { id } = req.query
  
  if (req.method === 'POST') {
    const original = db.getProjectById(id)
    if (!original) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Projeto não encontrado' } })
    }
    
    const duplicate = db.createProject({
      ...original,
      nome: `Cópia de ${original.nome}`
    })
    
    return res.status(201).json({ duplicate })
  }
  
  res.setHeader('Allow', ['POST'])
  return res.status(405).json({ error: { message: `Method ${req.method} not allowed` } })
}
```

---

## ✅ Critérios de Aceite

- [ ] GET `/api/projects` retorna lista de projetos
- [ ] POST `/api/projects` cria projeto com validação
- [ ] GET `/api/projects/[id]` retorna projeto ou 404
- [ ] PUT `/api/projects/[id]` atualiza projeto
- [ ] DELETE `/api/projects/[id]` remove projeto
- [ ] POST `/api/projects/[id]/duplicate` cria cópia
- [ ] Erros retornam estrutura padronizada
- [ ] Validações retornam campo específico

---

## 🧪 Testes Manuais

```bash
# Listar
curl http://localhost:3000/api/projects

# Criar
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"nome":"Casa Teste","area_m2":100,"tipo_obra":"residencial","padrao":"medio"}'

# Obter
curl http://localhost:3000/api/projects/1

# Atualizar
curl -X PUT http://localhost:3000/api/projects/1 \
  -H "Content-Type: application/json" \
  -d '{"area_m2":150}'

# Duplicar
curl -X POST http://localhost:3000/api/projects/1/duplicate

# Deletar
curl -X DELETE http://localhost:3000/api/projects/1
```

---

## 📝 Notas

- Usar `database.js` existente (não criar queries do zero)
- Manter consistência com schema existente
- Logs de erro no console para debugging
- Sem autenticação no MVP (uso interno)

---

*Plano pronto para execução*
