/**
 * IRON MAN - Database Utility
 * Gerencia conexões e operações com SQLite
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '../../data/iron-man.db');
const SCHEMA_PATH = path.join(__dirname, '../../data/schema.sql');

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

module.exports = {
  initDatabase,
  closeDatabase,
  runQuery,
  allQuery,
  getQuery,
  criarProjeto,
  getProjeto,
  listarProjetos,
  criarOrcamento,
  adicionarMaterial,
  getOrcamentoPorProjeto,
  listarMateriais
};
