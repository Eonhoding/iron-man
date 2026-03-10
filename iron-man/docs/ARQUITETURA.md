# 🦾 IRON MAN - Arquitetura do Sistema

## Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                    IRON MAN PLATFORM                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Frontend   │  │    Backend   │  │   Database   │       │
│  │   NextJS 14  │◄─┤   Node.js    │◄─┤   SQLite/    │       │
│  │   Tailwind   │  │   Express    │  │   Supabase   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│         │                  │                  │              │
│         ▼                  ▼                  ▼              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Plantas    │  │  Orçamentos  │  │  Automação   │       │
│  │   (Fabric)   │  │   (Engine)   │  │   (Social)   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Módulos Principais

### 1. 📐 Módulo de Plantas
**Status:** Em desenvolvimento

**Funcionalidades:**
- Leitura de PDF/DWG
- Extração de medidas
- Geração de plantas básicas
- Exportação em múltiplos formatos

**Tecnologias:**
- Fabric.js (renderização canvas)
- PDF.js (leitura de PDFs)
- dxf-parser (leitura de DXF)

### 2. 💰 Módulo de Orçamentos
**Status:** ✅ Funcional (v1.0)

**Funcionalidades:**
- Cálculo por m²
- Lista de materiais automática
- Mão de obra estimada
- Orçamento interativo

**Tecnologias:**
- Node.js (lógica de cálculo)
- XLSX (exportação Excel)
- Banco de dados de preços

### 3. 📊 Dashboard
**Status:** ✅ Funcional (v1.0)

**Funcionalidades:**
- Visão geral de projetos
- Gráficos de custos
- Timeline da obra
- Alertas e notificações

### 4. 🤖 Módulo de IA
**Status:** Planejado

**Funcionalidades:**
- Otimização de layouts
- Sugestão de materiais
- Detecção de erros em plantas
- Previsão de atrasos

### 5. 📱 Automação Social
**Status:** Planejado

**Funcionalidades:**
- Posts automáticos
- Gestão de campanhas
- Google Ads integration
- Relatórios de performance

## Banco de Dados

### Schema Inicial

```sql
-- Projetos
CREATE TABLE projetos (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  cliente TEXT,
  area_construida REAL,
  area_total REAL,
  tipo_obra TEXT,
  padrao TEXT,
  status TEXT DEFAULT 'planejamento',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Orçamentos
CREATE TABLE orcamentos (
  id INTEGER PRIMARY KEY,
  projeto_id INTEGER,
  total REAL,
  materiais REAL,
  mao_de_obra REAL,
  dias_estimados INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);

-- Materiais
CREATE TABLE materiais (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  categoria TEXT,
  unidade TEXT,
  preco REAL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Itens do Orçamento
CREATE TABLE orcamento_itens (
  id INTEGER PRIMARY KEY,
  orcamento_id INTEGER,
  material_id INTEGER,
  quantidade REAL,
  preco_unitario REAL,
  total REAL,
  FOREIGN KEY (orcamento_id) REFERENCES orcamentos(id),
  FOREIGN KEY (material_id) REFERENCES materiais(id)
);
```

## API Endpoints (Planejado)

```
POST   /api/projetos           - Criar projeto
GET    /api/projetos           - Listar projetos
GET    /api/projetos/:id       - Detalhes do projeto
PUT    /api/projetos/:id       - Atualizar projeto
DELETE /api/projetos/:id       - Deletar projeto

POST   /api/orcamentos         - Criar orçamento
GET    /api/orcamentos/:id     - Detalhes do orçamento
GET    /api/orcamentos/:id/pdf - Exportar PDF

POST   /api/plantas/upload     - Upload de planta
GET    /api/plantas/:id        - Processar planta

POST   /api/social/post        - Criar post
POST   /api/ads/campaign       - Criar campanha
```

## Deploy

### Vercel (Recomendado)

```bash
# Instalar dependências
npm install

# Build
npm run build

# Deploy
vercel --prod
```

### Docker (Alternativo)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Próximos Passos

1. ✅ MVP Calculadora de Orçamentos
2. ⚪ Dashboard com múltiplos projetos
3. ⚪ Leitor de plantas (PDF)
4. ⚪ Gerador de plantas básicas
5. ⚪ Exportação para Excel/PDF
6. ⚪ Automação de redes sociais
7. ⚪ Integração Google Ads

---

*Documentação atualizada em: 2026-03-10*  
*Versão: 1.0.0*
