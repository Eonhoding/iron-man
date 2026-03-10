# Skill: 2nd Brain Writer

## Descrição

Skill para criar e atualizar documentos no 2nd Brain (app NextJS em `/workspace/2nd-brain/memory/`).

## Quando Usar

- Após discussões importantes sobre conceitos
- Ao final de cada dia (diário automático)
- Quando Joelson pedir para "lembrar" algo
- Para documentar decisões, aprendizados, ou insights

## Tipos de Documentos

### Journal (Diário)
- `type: journal`
- Slug: `journal-YYYY-MM-DD`
- Tags: `['diário', 'journal', 'YYYY-MM-DD']`
- Conteúdo: resumo do dia, discussões, decisões, action items

### Concept (Conceito)
- `type: concept`
- Slug: slugify do nome do conceito
- Tags: `['conceito', 'concept', conceito-lowercase]`
- Conteúdo: descrição, pontos principais, aplicações

### Meeting (Reunião)
- `type: meeting`
- Slug: `meeting-YYYY-MM-DD-assunto`
- Tags: `['reunião', 'meeting', assunto]`
- Conteúdo: participantes, tópicos, decisões, action items

### Note (Nota)
- `type: note`
- Slug: slugify do título
- Tags: personalizadas
- Conteúdo: livre

## Formato do Arquivo

```markdown
---
title: Título do Documento
type: journal | concept | meeting | note
tags: [tag1, tag2, tag3]
created: ISO-8601 timestamp
---

Conteúdo em markdown...
```

## Exemplo de Uso

```typescript
import { createDocument, createDailyJournal, createConceptDocument } from './lib/documents';

// Criar diário
await createDailyJournal({
  date: '2026-03-09',
  discussions: ['Tópico 1', 'Tópico 2'],
  decisions: ['Decisão 1'],
  actionItems: ['Tarefa 1', 'Tarefa 2']
});

// Criar conceito
await createConceptDocument({
  concept: 'Machine Learning',
  description: '...',
  keyPoints: ['Ponto 1', 'Ponto 2'],
  applications: ['Uso 1', 'Uso 2']
});
```

## Localização

- Documentos: `/root/.openclaw/workspace/2nd-brain/memory/`
- Lib: `/root/.openclaw/workspace/2nd-brain/lib/documents.ts`
- App: `/root/.openclaw/workspace/2nd-brain/`

## Notas

- Sempre usar Português do Brasil nos documentos
- Manter documentos concisos mas informativos
- Incluir tags relevantes para busca futura
- Atualizar documentos existentes quando apropriado
