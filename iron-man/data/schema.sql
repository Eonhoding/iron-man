-- IRON MAN - Database Schema
-- SQLite database para persistência de dados

-- Projetos de construção
CREATE TABLE IF NOT EXISTS projetos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  cliente TEXT,
  endereco TEXT,
  areaConstruida REAL NOT NULL,
  areaTotal REAL,
  tipoObra TEXT DEFAULT 'residencial', -- residencial, comercial, industrial
  padrao TEXT DEFAULT 'medio', -- baixo, medio, alto
  status TEXT DEFAULT 'em_andamento', -- em_andamento, concluido, pausado, cancelado
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Orçamentos
CREATE TABLE IF NOT EXISTS orcamentos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  projeto_id INTEGER NOT NULL,
  total REAL NOT NULL,
  materiais REAL NOT NULL,
  maoDeObra REAL NOT NULL,
  diasEstimados INTEGER,
  custoPorM2 REAL,
  detalhes TEXT, -- JSON com detalhamento por categoria
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);

-- Lista de materiais
CREATE TABLE IF NOT EXISTS materiais_lista (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  orcamento_id INTEGER NOT NULL,
  item TEXT NOT NULL,
  quantidade REAL NOT NULL,
  unidade TEXT NOT NULL,
  precoUnit REAL NOT NULL,
  total REAL NOT NULL,
  categoria TEXT, -- fundacao, alvenaria, cobertura, acabamento, eletrica, hidraulica
  FOREIGN KEY (orcamento_id) REFERENCES orcamentos(id)
);

-- Banco de preços de materiais (atualizável)
CREATE TABLE IF NOT EXISTS precos_materiais (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo TEXT UNIQUE NOT NULL, -- ex: cimento_cp2
  nome TEXT NOT NULL,
  unidade TEXT NOT NULL,
  preco REAL NOT NULL,
  categoria TEXT NOT NULL,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Mão de obra
CREATE TABLE IF NOT EXISTS precos_mao_obra (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profissao TEXT UNIQUE NOT NULL,
  diaria REAL NOT NULL,
  hora REAL NOT NULL,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Histórico de versões de orçamento
CREATE TABLE IF NOT EXISTS orcamento_historico (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  orcamento_id INTEGER NOT NULL,
  versao INTEGER NOT NULL,
  total REAL NOT NULL,
  alteracoes TEXT, -- JSON descrevendo o que mudou
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (orcamento_id) REFERENCES orcamentos(id)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_projetos_status ON projetos(status);
CREATE INDEX IF NOT EXISTS idx_orcamentos_projeto ON orcamentos(projeto_id);
CREATE INDEX IF NOT EXISTS idx_materiais_orcamento ON materiais_lista(orcamento_id);
CREATE INDEX IF NOT EXISTS idx_precos_categoria ON precos_materiais(categoria);

-- Dados iniciais - Mão de obra
INSERT OR IGNORE INTO precos_mao_obra (profissao, diaria, hora) VALUES
  ('pedreiro', 150.00, 20.00),
  ('servente', 100.00, 12.00),
  ('eletricista', 200.00, 25.00),
  ('encanador', 180.00, 22.00),
  ('pintor', 140.00, 18.00);

-- Dados iniciais - Materiais (exemplos)
INSERT OR IGNORE INTO precos_materiais (codigo, nome, unidade, preco, categoria) VALUES
  ('cimento_cp2', 'Cimento CP-II', 'saco 50kg', 28.50, 'fundacao'),
  ('areia_media', 'Areia Média', 'm³', 120.00, 'fundacao'),
  ('brita_1', 'Brita 1', 'm³', 140.00, 'fundacao'),
  ('ferro_8mm', 'Ferro 8mm', 'barra 12m', 45.00, 'fundacao'),
  ('tijolo_8furos', 'Tijolo 8 Furos', 'milheiro', 450.00, 'alvenaria'),
  ('bloco_concreto', 'Bloco de Concreto', 'unidade', 3.50, 'alvenaria'),
  ('argamassa', 'Argamassa', 'saco 20kg', 18.00, 'alvenaria'),
  ('telha_ceramica', 'Telha Cerâmica', 'milheiro', 850.00, 'cobertura'),
  ('telha_fibrocimento', 'Telha Fibrocimento', 'm²', 25.00, 'cobertura'),
  ('madeira_telhado', 'Madeira para Telhado', 'm³', 1200.00, 'cobertura'),
  ('porcelanato', 'Porcelanato', 'm²', 85.00, 'acabamento'),
  ('ceramica_piso', 'Cerâmica para Piso', 'm²', 45.00, 'acabamento'),
  ('rejunte', 'Rejunte', 'kg', 22.00, 'acabamento'),
  ('tinta_acrilica', 'Tinta Acrílica', 'galão 18L', 280.00, 'acabamento'),
  ('fio_2_5mm', 'Fio 2.5mm', 'metro', 2.50, 'eletrica'),
  ('disjuntor', 'Disjuntor', 'unidade', 15.00, 'eletrica'),
  ('tomada', 'Tomada', 'unidade', 8.00, 'eletrica'),
  ('tubo_pvc_100mm', 'Tubo PVC 100mm', 'barra 6m', 45.00, 'hidraulica'),
  ('tubo_pvc_25mm', 'Tubo PVC 25mm', 'barra 6m', 18.00, 'hidraulica'),
  ('registro', 'Registro', 'unidade', 25.00, 'hidraulica');
