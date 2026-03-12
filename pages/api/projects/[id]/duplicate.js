import { initDatabase, getProjectById, createProject } from '../../../../../lib/database'

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
  
  if (req.method === 'POST') {
    try {
      const original = await getProjectById(id)
      if (!original) {
        return res.status(404).json({ 
          error: { code: 'NOT_FOUND', message: 'Projeto não encontrado' }
        })
      }
      
      const duplicate = await createProject({
        nome: `Cópia de ${original.nome}`,
        area_m2: original.area_m2,
        tipo_obra: original.tipo_obra,
        padrao: original.padrao,
        cliente: original.cliente,
        status: 'rascunho',
        valor_total: original.valor_total
      })
      
      return res.status(201).json({ duplicate })
    } catch (error) {
      console.error('Erro ao duplicar projeto:', error)
      return res.status(500).json({ 
        error: { code: 'INTERNAL_ERROR', message: 'Erro ao duplicar projeto' }
      })
    }
  }
  
  res.setHeader('Allow', ['POST'])
  return res.status(405).json({ error: { message: `Method ${req.method} not allowed` } })
}
