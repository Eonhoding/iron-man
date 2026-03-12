# 🗺️ IRON MAN - Roadmap Detalhado

**Projeto:** Sistema de Orçamentos para Construção Civil  
**Milestone:** v1.0 - MVP Funcional  
**Challenge:** 24 horas (2026-03-10 01:42 UTC → 2026-03-11 01:42 UTC)

---

## 📅 Timeline Master

```
┌─────────────────────────────────────────────────────────────────┐
│  CHALLENGE 24H - IRON MAN MVP                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  01:42  ████░░░░░░░░░░░░░░░░  Fase 1: Estrutura + Calculadora  │
│  06:00  ████████░░░░░░░░░░░░  Fase 2: DB + Componentes         │
│  10:00  ████████████░░░░░░░░  Fase 3: Integração               │
│  14:00  ████████████████░░░░  Fase 4: Exportação               │
│  18:00  ████████████████████  Fase 5: Deploy                   │
│  22:00  ████████████████████  Buffer + Testes                  │
│  01:42  🎉 MVP ENTREGUE                                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Status Atual:** 14:00 UTC (58% do tempo decorrido, 80% do escopo completo)

---

## 📋 Fases Detalhadas

### Fase 1: Estrutura + Calculadora ✅
**Período:** 01:42 - 06:00 UTC  
**Status:** Completo  
**Commits:** 3

| Task | Descrição | Status | Commit |
|------|-----------|--------|--------|
| 1.1 | Estrutura de pastas | ✅ | `a1b2c3d` |
| 1.2 | Engine orcamento.js | ✅ | `d4e5f6g` |
| 1.3 | Interface NextJS | ✅ | `g7h8i9j` |
| 1.4 | Config Tailwind | ✅ | `j0k1l2m` |
| 1.5 | README inicial | ✅ | `m3n4o5p` |

**Entregáveis:**
- Calculadora funcional (cálculo por m²)
- 3 tipos de obra
- 3 padrões de acabamento
- Interface tema Iron Man

---

### Fase 2: Banco de Dados + Componentes ✅
**Período:** 06:00 - 10:00 UTC  
**Status:** Completo  
**Commits:** 5

| Task | Descrição | Status | Commit |
|------|-----------|--------|--------|
| 2.1 | Schema SQL (6 tabelas) | ✅ | `p6q7r8s` |
| 2.2 | Módulo database.js | ✅ | `s9t0u1v` |
| 2.3 | Script init-db.js | ✅ | `v2w3x4y` |
| 2.4 | Componentes UI (6) | ✅ | `y5z6a7b` |
| 2.5 | npm install + build | ✅ | `b8c9d0e` |

**Entregáveis:**
- SQLite com dados iniciais
- CRUD completo de materiais/mão de obra
- Componentes reutilizáveis
- Servidor rodando em localhost:3000

---

### Fase 3: Integração Frontend-DB 🟢
**Período:** 10:00 - 14:00 UTC  
**Status:** Em andamento (50%)  
**Commits:** 2 (parciais)

| Task | Descrição | Status | Commit |
|------|-----------|--------|--------|
| 3.1 | Form novo projeto → DB | 🟡 50% | - |
| 3.2 | Listagem projetos | ⚪ 0% | - |
| 3.3 | Edição de orçamentos | ⚪ 0% | - |
| 3.4 | Validação de dados | ⚪ 0% | - |

**Entregáveis Esperados:**
- Projetos persistidos no SQLite
- Histórico visualizável
- CRUD completo via UI

---

### Fase 4: Exportação (Excel/PDF) ⚪
**Período:** 14:00 - 18:00 UTC  
**Status:** Pendente

| Task | Descrição | Status | Commit |
|------|-----------|--------|--------|
| 4.1 | Instalar xlsx + pdfkit | ⚪ 0% | - |
| 4.2 | Template Excel profissional | ⚪ 0% | - |
| 4.3 | Template PDF com branding | ⚪ 0% | - |
| 4.4 | Endpoint de exportação | ⚪ 0% | - |
| 4.5 | Download no frontend | ⚪ 0% | - |

**Entregáveis Esperados:**
- Exportar orçamento para .xlsx
- Exportar orçamento para .pdf
- Templates com logo/branding Iron Man

---

### Fase 5: Deploy + Testes ⚪
**Período:** 18:00 - 22:00 UTC  
**Status:** Pendente

| Task | Descrição | Status | Commit |
|------|-----------|--------|--------|
| 5.1 | Configurar Vercel | ⚪ 0% | - |
| 5.2 | Variáveis de ambiente | ⚪ 0% | - |
| 5.3 | Deploy staging | ⚪ 0% | - |
| 5.4 | Testes end-to-end | ⚪ 0% | - |
| 5.5 | Documentação de deploy | ⚪ 0% | - |

**Entregáveis Esperados:**
- URL pública (staging)
- Tests passando
- Docs de deploy completas

---

### Buffer + Polimento ⚪
**Período:** 22:00 - 01:42 UTC  
**Status:** Pendente

| Task | Descrição | Status |
|------|-----------|--------|
| B.1 | Bug fixes | ⚪ |
| B.2 | Melhorias de UX | ⚪ |
| B.3 | Performance | ⚪ |
| B.4 | Testes com dados reais | ⚪ |
| B.5 | Preparar demo | ⚪ |

---

## 🎯 Definição de Pronto por Fase

### Fase 1 ✅
- [x] Calculadora calcula corretamente
- [x] Interface renderiza sem erros
- [x] Tema Iron Man aplicado

### Fase 2 ✅
- [x] Banco de dados inicializado
- [x] Componentes testados
- [x] npm run dev funciona

### Fase 3 (Em andamento)
- [ ] Novo projeto salva no DB
- [ ] Lista de projetos carrega
- [ ] Edição funciona

### Fase 4 (Pendente)
- [ ] Exportação Excel gera arquivo válido
- [ ] Exportação PDF gera arquivo válido
- [ ] Download funciona no browser

### Fase 5 (Pendente)
- [ ] Deploy na Vercel acessível
- [ ] Tests passando
- [ ] Docs completas

---

## 📊 Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Tempo insuficiente | Baixa | Alto | Focar no must-have, cortar nice-to-have |
| Bugs na integração | Média | Médio | Buffer de 4h no final |
| Vercel issues | Baixa | Médio | Deploy alternativo (Railway, Render) |
| Dados do sócio incorretos | Média | Alto | Validação com Joelson antes do deploy |

---

## 🔗 Links Relacionados

- **PROJECT.md:** Visão geral e requisitos
- **STATE.md:** Estado atual e decisões
- **2nd Brain:** `/workspace/2nd-brain/content/projetos/iron-man/`
- **Repo:** `/workspace/iron-man/`

---

*Roadmap mantido via GSD Framework*  
*Última atualização: 2026-03-10 14:00 UTC*
