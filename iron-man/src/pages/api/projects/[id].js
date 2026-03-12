import { initDatabase, getProjectById, updateProject, deleteProject } from '../../../../lib/database'

let dbInitialized = false;
async function ensureDb() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

export default async function handler(req, res) {
  await ensureDb();
  const { id } = req.query
  
  if (req.method === 'GET') {
    try {
      const project = await getProjectById(id)
      if (!project) {
        return res.status(404).json({ 
          error: { code: 'NOT_FOUND', message: 'Projeto não encontrado' }
        })
      }
      return res.status(200).json({ project })
    } catch (error) {
      console.error('Erro ao obter projeto:', error)
      return res.status(500).json({ 
        error: { code: 'INTERNAL_ERROR', message: 'Erro ao obter projeto' }
      })
    }
  }
  
  if (req.method === 'PUT') {
    try {
      const updates = req.body
      const project = await updateProject(id, updates)
      if (!project) {
        return res.status(404).json({ 
          error: { code: 'NOT_FOUND', message: 'Projeto não encontrado' }
        })
      }
      return res.status(200).json({ project })
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error)
      return res.status(500).json({ 
        error: { code: 'INTERNAL_ERROR', message: 'Erro ao atualizar projeto' }
      })
    }
  }
  
  if (req.method === 'DELETE') {
    try {
      await deleteProject(id)
      return res.status(204).end()
    } catch (error) {
      console.error('Erro ao excluir projeto:', error)
      return res.status(500).json({ 
        error: { code: 'INTERNAL_ERROR', message: 'Erro ao excluir projeto' }
      })
    }
  }
  
  res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
  return res.status(405).json({ error: { message: `Method ${req.method} not allowed` } })
}
