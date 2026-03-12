# 🦾 IRON MAN - Sistema de Orçamentos para Construção Civil

**Versão:** 1.0 (MVP)  
**Status:** 🟢 Em Desenvolvimento (80% completo)  
**Challenge:** 24 horas para MVP funcional  
**Início:** 2026-03-10 01:42 UTC  
**Término Previsto:** 2026-03-11 01:42 UTC

---

## 🎯 Visão do Projeto

Sistema completo de orçamentos para construção civil que codifica 20+ anos de experiência prática do sócio do Joelson em software automatizado.

**Proposta de Valor:**
- Orçamentos precisos em minutos, não horas
- Baseado em dados reais de obras brasileiras
- Exportável para Excel/PDF para clientes
- Diferencial competitivo: experiência real codificada

---

## 📋 Requisitos (v1.0 - MVP)

### Must Have (Fase 1)
- [x] Calculadora de orçamentos por m²
- [x] Tipos de obra (Residencial, Comercial, Industrial)
- [x] Padrões de acabamento (Econômico, Médio, Alto)
- [x] Banco de dados de materiais (20+ itens)
- [x] Banco de dados de mão de obra (5 tipos)
- [x] Interface web moderna (NextJS + Tailwind)
- [x] Tema Iron Man (cores metálicas, dourado, vermelho)
- [x] Persistência SQLite
- [ ] Exportação para Excel (XLSX)
- [ ] Exportação para PDF

### Should Have (Fase 2)
- [ ] Leitor de PDF de plantas
- [ ] Histórico de projetos salvos
- [ ] Landing page pública
- [ ] Deploy na Vercel

### Could Have (Fase 3)
- [ ] Automação Instagram
- [ ] Google Ads integration
- [ ] App mobile

### Won't Have (v1.0)
- [ ] Autenticação de usuários
- [ ] Multi-tenancy
- [ ] Pagamentos online

---

## 🗺️ Roadmap

| Fase | Descrição | Status | Progresso |
|------|-----------|--------|-----------|
| 1 | Estrutura + Calculadora | ✅ Completo | 100% |
| 2 | Banco de Dados + Componentes | ✅ Completo | 100% |
| 3 | Integração Frontend-DB | 🟢 Em andamento | 50% |
| 4 | Exportação (Excel/PDF) | ⚪ Pendente | 0% |
| 5 | Deploy + Testes | ⚪ Pendente | 0% |

**Progresso Geral:** 80%

---

## 🏗️ Arquitetura

```
iron-man/
├── src/
│   ├── lib/
│   │   ├── orcamento.js      # Engine de cálculos
│   │   ├── database.js       # Módulo SQLite
│   │   └── init-db.js        # Script inicialização
│   ├── components/           # Componentes UI
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── StatCard.jsx
│   │   └── index.js
│   └── pages/
│       └── index.jsx         # Dashboard principal
├── data/
│   ├── schema.sql            # Schema do banco
│   └── iron-man.db           # SQLite database
├── docs/
│   └── ARQUITETURA.md        # Documentação técnica
└── config/
    ├── next.config.js
    └── tailwind.config.js
```

**Stack:**
- Frontend: NextJS 15 + Tailwind CSS
- Backend: Node.js (serverless functions)
- Database: SQLite (MVP) → PostgreSQL (escala)
- Deploy: Vercel (free tier)

---

## 📊 Métricas Atuais

| Métrica | Valor |
|---------|-------|
| Tempo decorrido | ~12h |
| Tempo restante | ~12h |
| Linhas de código | ~1,100 |
| Arquivos criados | 16 |
| Dependências | 302 |
| Progresso | 80% |

---

## 🎯 Definição de Pronto (v1.0)

- [ ] MVP funcional e testável
- [ ] Dados reais do sócio inseridos
- [ ] Exportação Excel/PDF funcionando
- [ ] Deploy staging na Vercel
- [ ] Documentação completa
- [ ] Git history limpo e atômico

---

## 📝 Notas de Contexto

- **Cliente:** Construtoras pequenas e médias
- **Diferencial:** 20+ anos de experiência codificada
- **Preço alvo:** R$ 97-197/mês (SaaS)
- **Concorrência:** Planilhas Excel, software legado caro

---

*Documento criado via GSD Framework*  
*Última atualização: 2026-03-10 14:00 UTC*
