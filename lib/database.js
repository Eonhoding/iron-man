/**
 * IRON MAN - Database Utility
 * Gerencia conexões e operações com SQLite
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Caminho absoluto fixo para funcionar no NextJS
const DB_PATH = '/root/.openclaw/workspace/iron-man/data/iron-man.db';
const SCHEMA_PATH = '/root/.openclaw/workspace/iron-man/data/schema.sql';

let db = null;

/**
 * Inicializa o banco de dados
 */
function initDatabase() {
  return new Promise((resolve, reject) => {
    // Garante que a pasta data existe
    const dataDir = path.dirname(DB_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('✅ Banco de dados conectado:', DB_PATH);
      
      // Carrega o schema
      loadSchema().then(resolve).catch(reject);
    });
  });
}

/**
 * Carrega o schema SQL
 */
function loadSchema() {
  return new Promise((resolve, reject) => {
    fs.readFile(SCHEMA_PATH, 'utf8', (err, sql) => {
      if (err) {
        reject(err);
        return;
      }
      
      db.exec(sql, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('✅ Schema carregado com sucesso');
          resolve();
        }
      });
    });
  });
}

/**
 * Executa uma query
 */
function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          lastID: this.lastID,
          changes: this.changes
        });
      }
    });
  });
}

/**
 * Busca registros
 */
function allQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

/**
 * Busca um único registro
 */
function getQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

/**
 * Cria um novo projeto
 */
async function criarProjeto(data) {
  const {
    nome,
    cliente,
    endereco,
    areaConstruida,
    areaTotal,
    tipoObra = 'residencial',
    padrao = 'medio'
  } = data;

  const result = await runQuery(
    `INSERT INTO projetos (nome, cliente, endereco, areaConstruida, areaTotal, tipoObra, padrao)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nome, cliente, endereco, areaConstruida, areaTotal, tipoObra, padrao]
  );

  return getProjeto(result.lastID);
}

/**
 * Busca um projeto por ID
 */
async function getProjeto(id) {
  return await getQuery('SELECT * FROM projetos WHERE id = ?', [id]);
}

/**
 * Lista todos os projetos
 */
async function listarProjetos(status = null) {
  if (status) {
    return await allQuery('SELECT * FROM projetos WHERE status = ? ORDER BY createdAt DESC', [status]);
  }
  return await allQuery('SELECT * FROM projetos ORDER BY createdAt DESC');
}

/**
 * Cria um orçamento
 */
async function criarOrcamento(projetoId, orcamentoData) {
  const {
    total,
    materiais,
    maoDeObra,
    diasEstimados,
    custoPorM2,
    detalhes
  } = orcamentoData;

  const result = await runQuery(
    `INSERT INTO orcamentos (projeto_id, total, materiais, maoDeObra, diasEstimados, custoPorM2, detalhes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [projetoId, total, materiais, maoDeObra, diasEstimados, custoPorM2, JSON.stringify(detalhes)]
  );

  return result.lastID;
}

/**
 * Adiciona item à lista de materiais
 */
async function adicionarMaterial(orcamentoId, materialData) {
  const {
    item,
    quantidade,
    unidade,
    precoUnit,
    total,
    categoria
  } = materialData;

  await runQuery(
    `INSERT INTO materiais_lista (orcamento_id, item, quantidade, unidade, precoUnit, total, categoria)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [orcamentoId, item, quantidade, unidade, precoUnit, total, categoria]
  );
}

/**
 * Busca orçamento por projeto
 */
async function getOrcamentoPorProjeto(projetoId) {
  return await getQuery(
    'SELECT * FROM orcamentos WHERE projeto_id = ? ORDER BY createdAt DESC LIMIT 1',
    [projetoId]
  );
}

/**
 * Lista materiais de um orçamento
 */
async function listarMateriais(orcamentoId) {
  return await allQuery(
    'SELECT * FROM materiais_lista WHERE orcamento_id = ? ORDER BY categoria, item',
    [orcamentoId]
  );
}

/**
 * Fecha a conexão com o banco
 */
function closeDatabase() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('✅ Banco de dados fechado');
        resolve();
      }
    });
  });
}

// ============================================
// Funções CRUD para Projetos (Fase 3)
// ============================================

/**
 * Cria um novo projeto (adaptado para Fase 3)
 */
async function createProject(data) {
  const {
    nome,
    area_m2,
    tipo_obra,
    padrao,
    cliente,
    status
  } = data;

  // Mapear campos do novo schema para o schema existente
  const result = await runQuery(
    `INSERT INTO projetos (nome, cliente, areaConstruida, tipoObra, padrao, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nome, cliente || null, area_m2, tipo_obra, padrao, status || 'em_andamento']
  );

  return await getProjectById(result.lastID);
}

/**
 * Busca um projeto por ID (adaptado para Fase 3)
 */
async function getProjectById(id) {
  const projeto = await getProjeto(id);
  if (!projeto) return null;
  
  // Mapear para o formato esperado pela API
  return {
    id: projeto.id,
    nome: projeto.nome,
    area_m2: projeto.areaConstruida,
    tipo_obra: projeto.tipoObra,
    padrao: projeto.padrao,
    cliente: projeto.cliente,
    status: projeto.status === 'concluido' ? 'finalizado' : 'rascunho',
    valor_total: projeto.valor_total || 0,
    created_at: projeto.createdAt
  };
}

/**
 * Lista todos os projetos (adaptado para Fase 3)
 */
async function getAllProjects() {
  const projetos = await listarProjetos();
  // Mapear para o formato esperado pela API
  return projetos.map(projeto => ({
    id: projeto.id,
    nome: projeto.nome,
    area_m2: projeto.areaConstruida,
    tipo_obra: projeto.tipoObra,
    padrao: projeto.padrao,
    cliente: projeto.cliente,
    status: projeto.status === 'concluido' ? 'finalizado' : 'rascunho',
    valor_total: projeto.valor_total || 0,
    created_at: projeto.createdAt
  }));
}

/**
 * Atualiza um projeto (adaptado para Fase 3)
 */
async function updateProject(id, updates) {
  const fields = [];
  const values = [];
  
  // Mapear campos do novo formato para o schema existente
  const fieldMap = {
    area_m2: 'areaConstruida',
    tipo_obra: 'tipoObra'
  };
  
  Object.keys(updates).forEach(key => {
    const dbField = fieldMap[key] || key;
    // Ignorar campos calculados
    if (dbField !== 'valor_total' && dbField !== 'created_at') {
      fields.push(`${dbField} = ?`);
      values.push(updates[key]);
    }
  });
  
  if (fields.length === 0) {
    return await getProjectById(id);
  }
  
  values.push(id);
  
  await runQuery(
    `UPDATE projetos SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  
  return await getProjectById(id);
}

/**
 * Exclui um projeto
 */
async function deleteProject(id) {
  // Primeiro exclui orcamentos e materiais relacionados
  await runQuery('DELETE FROM materiais_lista WHERE orcamento_id IN (SELECT id FROM orcamentos WHERE projeto_id = ?)', [id]);
  await runQuery('DELETE FROM orcamentos WHERE projeto_id = ?', [id]);
  // Depois exclui o projeto
  await runQuery('DELETE FROM projetos WHERE id = ?', [id]);
}

module.exports = {
  initDatabase,
  closeDatabase,
  runQuery,
  allQuery,
  getQuery,
  // Funções originais (português)
  criarProjeto,
  getProjeto,
  listarProjetos,
  criarOrcamento,
  adicionarMaterial,
  getOrcamentoPorProjeto,
  listarMateriais,
  // Funções novas (inglês - Fase 3)
  createProject,
  getProjectById,
  getAllProjects,
  updateProject,
  deleteProject
};
