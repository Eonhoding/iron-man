import { initDatabase, getAllProjects, createProject } from '../../../lib/database'

// Garante que o banco está inicializado
let dbInitialized = false;
async function ensureDb() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

export default async function handler(req, res) {
  await ensureDb();
  
  if (req.method === 'GET') {
    try {
      const projects = await getAllProjects()
      return res.status(200).json({ projects })
    } catch (error) {
      console.error('Erro ao listar projetos:', error)
      return res.status(500).json({ 
        error: { code: 'INTERNAL_ERROR', message: 'Erro ao listar projetos' }
      })
    }
  }
  
  if (req.method === 'POST') {
    try {
      const { nome, area_m2, tipo_obra, padrao, cliente, status } = req.body
      
      // Validações
      if (!nome || nome.trim().length < 3) {
        return res.status(400).json({ 
          error: { code: 'VALIDATION_ERROR', message: 'Nome mínimo 3 caracteres', field: 'nome' }
        })
      }
      
      if (!area_m2 || area_m2 < 10) {
        return res.status(400).json({ 
          error: { code: 'VALIDATION_ERROR', message: 'Área mínima 10m²', field: 'area_m2' }
        })
      }
      
      const validTypes = ['residencial', 'comercial', 'industrial']
      if (!tipo_obra || !validTypes.includes(tipo_obra)) {
        return res.status(400).json({ 
          error: { code: 'VALIDATION_ERROR', message: 'Tipo de obra inválido', field: 'tipo_obra' }
        })
      }
      
      const validPadroes = ['economico', 'medio', 'alto']
      if (!padrao || !validPadroes.includes(padrao)) {
        return res.status(400).json({ 
          error: { code: 'VALIDATION_ERROR', message: 'Padrão inválido', field: 'padrao' }
        })
      }
      
      const project = await createProject({ 
        nome: nome.trim(), 
        area_m2: parseFloat(area_m2), 
        tipo_obra, 
        padrao,
        cliente: cliente?.trim() || null,
        status: status || 'rascunho'
      })
      
      return res.status(201).json({ project })
    } catch (error) {
      console.error('Erro ao criar projeto:', error)
      return res.status(500).json({ 
        error: { code: 'INTERNAL_ERROR', message: 'Erro ao criar projeto' }
      })
    }
  }
  
  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).json({ error: { message: `Method ${req.method} not allowed` } })
}
