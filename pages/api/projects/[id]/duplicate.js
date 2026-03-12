import { initDatabase, getProjectById, createProject } from '../../../../lib/database'

let dbInitialized = false;
async function ensureDb() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

export default async function handler(req, res) {
  await ensureDb();
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed' } })
  }

  try {
    const { id } = req.query
    const original = await getProjectById(parseInt(id))
    
    if (!original) {
      return res.status(404).json({ error: { message: 'Project not found' } })
    }

    const duplicate = await createProject({
      nome: `${original.nome} (Cópia)`,
      area_m2: original.area_m2,
      tipo_obra: original.tipo_obra,
      padrao: original.padrao,
      cliente: original.cliente,
      status: 'rascunho'
    })

    return res.status(201).json({ duplicate })
  } catch (error) {
    console.error('Erro ao duplicar:', error)
    return res.status(500).json({ error: { message: 'Erro ao duplicar projeto' } })
  }
}
