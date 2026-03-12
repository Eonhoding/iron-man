# Plano 3-04: Testes e Validação da Fase 3

**Fase:** 3 - Integração Frontend-DB  
**Tipo:** Testing + QA  
**Dependências:** 3-01, 3-02, 3-03 (todos)  
**Estimativa:** 15-20 minutos

---

## 🎯 Objetivo

Validar que toda a integração funciona corretamente antes de marcar Fase 3 como completa.

---

## 📋 Checklist de Testes

### 1. Testes de API (Backend)

**Ferramenta:** curl ou Insomnia/Postman

```bash
# 1.1 Listar projetos (deve retornar array vazio ou com dados)
curl http://localhost:3000/api/projects
# Expected: {"projects": []}

# 1.2 Criar projeto
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Casa Teste",
    "area_m2": 150,
    "tipo_obra": "residencial",
    "padrao": "medio",
    "cliente": "Joelson"
  }'
# Expected: {"project": {"id": 1, "nome": "Casa Teste", ...}}

# 1.3 Obter projeto específico
curl http://localhost:3000/api/projects/1
# Expected: {"id": 1, "nome": "Casa Teste", ...}

# 1.4 Atualizar projeto
curl -X PUT http://localhost:3000/api/projects/1 \
  -H "Content-Type: application/json" \
  -d '{"area_m2": 200}'
# Expected: {"project": {"id": 1, "area_m2": 200, ...}}

# 1.5 Duplicar projeto
curl -X POST http://localhost:3000/api/projects/1/duplicate
# Expected: {"duplicate": {"id": 2, "nome": "Cópia de Casa Teste", ...}}

# 1.6 Deletar projeto
curl -X DELETE http://localhost:3000/api/projects/2
# Expected: 204 No Content

# 1.7 Validar exclusão
curl http://localhost:3000/api/projects/2
# Expected: 404 {"error": {...}}
```

**Critérios de Aceite:**
- [ ] Todas as respostas têm status HTTP correto
- [ ] Estrutura de resposta consistente
- [ ] Validações retornam erros claros
- [ ] 404 para recursos não encontrados

---

### 2. Testes de UI (Frontend)

**Ferramenta:** Browser (Chrome/Firefox)

#### 2.1 Dashboard Load
- [ ] Abrir `http://localhost:3000/`
- [ ] Header IRON MAN visível
- [ ] Empty state aparece (se sem projetos)
- [ ] OU cards de projetos aparecem (se tem dados)

#### 2.2 Criar Projeto
- [ ] Click "Novo Projeto" → Modal abre
- [ ] Preencher todos os campos
- [ ] Preview atualiza em tempo real
- [ ] Click "Criar Projeto" → Modal fecha
- [ ] Novo card aparece no dashboard

#### 2.3 Editar Projeto
- [ ] Click "Editar" em um card → Modal abre com dados
- [ ] Alterar valor de área
- [ ] Aguardar 3s → Auto-save dispara
- [ ] Indicator "✅ Salvo" aparece
- [ ] Refresh → Dados persistem

#### 2.4 Duplicar Projeto
- [ ] Click ícone copiar no card
- [ ] Novo projeto aparece com "Cópia de..."
- [ ] Dados idênticos ao original

#### 2.5 Excluir Projeto
- [ ] Click ícone lixeira
- [ ] Confirm dialog aparece
- [ ] Click "OK" → Projeto some
- [ ] Refresh → Continua excluído

#### 2.6 Validações
- [ ] Nome < 3 caracteres → Erro inline
- [ ] Área < 10 → Erro inline
- [ ] Campos obrigatórios vazios → Botão disabled

#### 2.7 Responsivo
- [ ] Desktop (1920px) → Grid 3 colunas
- [ ] Tablet (768px) → Grid 2 colunas
- [ ] Mobile (375px) → Grid 1 coluna
- [ ] Modal ajusta na tela

---

### 3. Testes de Integração

#### 3.1 Fluxo Completo
```
1. Dashboard vazio
2. Criar projeto "Casa Praia" (150m², residencial, médio)
3. Ver card no dashboard
4. Editar → Mudar para 200m²
5. Auto-save salva
6. Duplicar → "Cópia de Casa Praia"
7. Excluir cópia
8. Dashboard mostra só original
```

**Critérios:**
- [ ] Fluxo funciona sem erros
- [ ] Dados persistem corretamente
- [ ] UI atualiza em tempo real

#### 3.2 Preview de Orçamento
```
1. Abrir modal novo projeto
2. Digitar área: 100
3. Selecionar tipo: residencial
4. Selecionar padrão: medio
5. Preview mostra valor correto
```

**Validação:**
- 100m² × R$ 1.500/m² (residencial médio) = R$ 150.000
- [ ] Preview mostra valor próximo (pode variar por configuração)

---

### 4. Testes de Error Handling

#### 4.1 API Errors
```bash
# Criar com nome curto
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"nome":"AB","area_m2":100,"tipo_obra":"residencial","padrao":"medio"}'
# Expected: 400 {"error": {"code": "VALIDATION_ERROR", ...}}

# Obter projeto inexistente
curl http://localhost:3000/api/projects/999
# Expected: 404 {"error": {"code": "NOT_FOUND", ...}}
```

#### 4.2 Frontend Errors
- [ ] Desligar servidor → Toast de erro aparece
- [ ] Retry button funciona (se implementado)
- [ ] Loading state não trava

---

### 5. Performance Tests

#### 5.1 Load Time
- [ ] Dashboard carrega em < 2s
- [ ] Skeleton aparece imediatamente
- [ ] Cards renderizam progressivamente

#### 5.2 Auto-save
- [ ] Debounce de 3s funciona (não salva a cada tecla)
- [ ] Múltiplas edições → Só último save
- [ ] Não bloqueia digitação

#### 5.3 Bundle Size
```bash
npm run build
# Verificar warnings de bundle size
```

---

## 🐛 Bugs Conhecidos (para reportar)

| Bug | Severidade | Workaround |
|-----|------------|------------|
| - | - | - |

*(Preencher durante testes)*

---

## 📊 Critérios de Aprovação da Fase 3

**Para marcar Fase 3 como completa:**

- [ ] 100% dos testes de API passam
- [ ] 100% dos testes de UI passam
- [ ] Fluxo completo funciona
- [ ] Nenhum bug crítico encontrado
- [ ] Performance aceitável
- [ ] Código sem errors no console

---

## 📝 Relatório de Testes

**Preencher após execução:**

```
Data: ___________
Tester: ___________

API Tests: ___ / ___ passed
UI Tests: ___ / ___ passed
Integration: ___ / ___ passed
Performance: OK / Issues

Bugs encontrados:
1. ...
2. ...

Status: ✅ APROVADO / ❌ REPROVADO
```

---

*Plano pronto para execução*
