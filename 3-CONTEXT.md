# Contexto de Implementação - Fase 3

**Fase:** 3 - Integração Frontend-DB  
**Projeto:** IRON MAN  
**Data:** 2026-03-10  
**Decisões por:** Aurora (CEO Mode)

---

## 1. Formulário de Novo Projeto

**Decisão:** Formulário único com preview em tempo real

**Detalhes:**
- Layout: Uma página, todos os campos visíveis
- Campos obrigatórios: `nome`, `area_m2`, `tipo_obra`, `padrao`
- Preview lateral: Atualiza valor total enquanto digita
- Validação: Inline, mostra erros imediatamente
- Submit: Botão "Criar Orçamento" habilita quando válido

**Racional:** Menos fricção que wizard, usuário vê tudo de uma vez, preview em tempo real dá confiança.

---

## 2. Listagem de Projetos

**Decisão:** Dashboard com cards

**Detalhes:**
- Local: Página principal (`/`)
- Layout: Grid de cards (3 colunas, responsivo)
- Card mostra:
  - Nome do projeto (bold)
  - Área (m²)
  - Valor total (formatado R$)
  - Data de criação (DD/MM/YYYY)
  - Badge de status (Rascunho/Finalizado)
- Click no card → abre modal de edição
- Botão flutuante "+ Novo Projeto"

**Racional:** Visual estilo Linear, escaneável, ação rápida.

---

## 3. Edição de Orçamentos

**Decisão:** Editar tudo + duplicar

**Detalhes:**
- Modal de edição abre ao clicar no card
- Todos os campos editáveis
- Auto-save habilitado
- Botões no modal:
  - "Duplicar" → cria cópia com nome "Cópia de..."
  - "Exportar" → Excel/PDF (Fase 4)
  - "Excluir" → com confirmação
- Sem histórico de versões (MVP)

**Racional:** Flexibilidade máxima, duplicar acelera criação de variações.

---

## 4. Persistência

**Decisão:** Auto-save a cada 3 segundos

**Detalhes:**
- Trigger: Mudança em qualquer campo
- Debounce: 3 segundos após última digitação
- Feedback: Toast discreto "Salvo" (fade out 2s)
- Estado: Mostra "Salvando..." durante write
- Erro: Toast vermelho "Erro ao salvar" + retry button

**Racional:** UX superior, usuário nunca perde dados, não precisa pensar em salvar.

---

## 5. Estrutura de Dados

**Tabelas usadas:**
- `projects` → Metadados do projeto (nome, cliente, área, tipo, padrão, status)
- `budgets` → Versões do orçamento (histórico simples, só valor total e timestamp)
- `budget_items` → Itens do orçamento (materiais + mão de obra calculados)

**Fluxo:**
1. Usuário preenche formulário
2. Engine `orcamento.js` calcula itens
3. Auto-save grava `projects` + `budget_items`
4. Dashboard lê e renderiza cards

---

## 6. Componentes Necessários

**Novos:**
- `ProjectForm.jsx` - Formulário de novo/editar projeto
- `ProjectCard.jsx` - Card individual de projeto
- `ProjectGrid.jsx` - Grid de cards
- `AutoSaveIndicator.jsx` - Indicator de save status
- `ProjectModal.jsx` - Modal de edição

**Reutilizar:**
- `Button.jsx`, `Input.jsx`, `Select.jsx`, `Card.jsx`, `StatCard.jsx`

---

## 7. APIs/Endpoints

**REST (NextJS API Routes):**
- `POST /api/projects` → Criar projeto
- `GET /api/projects` → Listar todos
- `GET /api/projects/[id]` → Obter um + itens
- `PUT /api/projects/[id]` → Atualizar
- `DELETE /api/projects/[id]` → Excluir
- `POST /api/projects/[id]/duplicate` → Duplicar

**Payload exemplo:**
```json
{
  "nome": "Casa Praia",
  "area_m2": 150,
  "tipo_obra": "residencial",
  "padrao": "medio",
  "valor_total": 225000,
  "status": "rascunho"
}
```

---

## 8. Validações

**Frontend:**
- `nome`: 3-100 caracteres
- `area_m2`: 10-10000 (número)
- `tipo_obra`: enum (residencial, comercial, industrial)
- `padrao`: enum (economico, medio, alto)

**Backend:**
- Mesmas validações + sanitização
- Retornar erros estruturados

---

## 9. Estados de UI

**Dashboard:**
- `loading` → Skeleton cards
- `empty` → "Nenhum projeto. Crie o primeiro!"
- `error` → Mensagem de erro + retry
- `success` → Grid de cards

**Formulário:**
- `idle` → Campos vazios
- `typing` → Preview atualiza
- `saving` → Auto-save em progresso
- `saved` → Toast "Salvo"
- `error` → Toast erro

---

## 10. Critérios de Aceite

- [ ] Dashboard carrega em < 1s
- [ ] Novo projeto salva em < 500ms
- [ ] Auto-save não bloqueia digitação
- [ ] Cards renderizam responsivos (mobile/desktop)
- [ ] Edição abre em modal suave
- [ ] Duplicar cria cópia exata
- [ ] Validação inline previne submit inválido

---

*Contexto aprovado para planejamento*
