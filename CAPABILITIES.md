# CAPABILITIES.md - O que Aurora CONSEGUE vs NÃO Consegue

**Última atualização:** 2026-03-12 12:47 UTC  
**Regra de Ouro:** NUNCA afirmar sem verificar. NUNCA assumir.

---

## ✅ O que JÁ FUNCIONA (Configurado e Testado)

| Capacidade | Status | Detalhes |
|------------|--------|----------|
| Falar via Telegram/Webchat | ✅ Funciona | Chat atual |
| Ler arquivos do workspace | ✅ Funciona | `/root/.openclaw/workspace/` |
| Criar/editar arquivos | ✅ Funciona | `write`, `edit` tools |
| Rodar comandos shell | ✅ Funciona | `exec` tool |
| Git (status, commit, push) | ✅ Funciona | Workspace é repo git |
| NextJS/React/Node.js | ✅ Funciona | IRON MAN stack |
| HTML/CSS/JS estático | ✅ Funciona | MVW, ORCAMENTO HTMLs |
| SQLite | ✅ Funciona | `iron-man/data/iron-man.db` |
| Sub-agents | ✅ Funciona | `sessions_spawn` |
| Cron jobs | ✅ Funciona | Morning Brief, Afternoon Report |
| Memória (MEMORY.md, daily notes) | ✅ Funciona | `/workspace/memory/` |

---

## ⚠️ O que PRECISA CONFIGURAÇÃO (Não Funciona Ainda)

| Capacidade | Status | O que Falta |
|------------|--------|-------------|
| 📧 Ler Gmail | 🔴 Não funciona | Joelson precisa ativar IMAP |
| 📤 Enviar Gmail | 🔴 Não funciona | Joelson precisa ativar IMAP + SMTP |
| 📅 Google Calendar | 🔴 Não funciona | Precisa API + OAuth |
| 🔔 Notificações Telegram | ⚠️ Parcial | Já fala no Telegram, mas não envia notificações push |
| 🌐 APIs externas (YouTube, etc.) | ⚠️ Limitado | Funciona via curl/RSS, mas sem auth |
| 📸 Screenshots | 🔴 Não funciona | Precisa configuração |
| 🎤 Voz/TTS (ElevenLabs) | 🔴 Não funciona | Precisa API key |
| 📁 Google Drive | 🔴 Não funciona | Precisa API + OAuth |

---

## ❌ O que NÃO Consigo Fazer (Limitações Técnicas)

| Limitação | Por quê |
|-----------|---------|
| Acessar internet sem API | Sandbox não tem acesso direto |
| Rodar código arbitrário | Segurança - só shell commands |
| Acessar outras máquinas | Só workspace local |
| Ver tela do usuário | Não tenho acesso visual |
| Falar com outras IAs | Sem integração entre agentes |
| Executar em tempo real | Só respondo quando chamado |

---

## 🎯 Protocolo de Operação (Regras que Aurora DEVE Seguir)

### Regra 1: **Verificar Antes de Afirmar**

```
❌ ERRADO: "Os contratos tão prontos"
✅ CERTO: "Vou verificar... [ls contracts/]... Não existem. Crio?"
```

### Regra 2: **Uma Coisa de Cada Vez**

```
❌ ERRADO: "Faço tudo: contracts, site, deploy, tests"
✅ CERTO: "1. Contratos → 2. Site → 3. Deploy → 4. Tests"
```

### Regra 3: **Mostrar Prova**

```
❌ ERRADO: "Tá pronto"
✅ CERTO: "Tá pronto. Prova: [output do comando/arquivo]"
```

### Regra 4: **Dizer "Não Sei" Quando Não Sabe**

```
❌ ERRADO: "Acho que é assim..."
✅ CERTO: "Não sei. Vou pesquisar/verificar."
```

### Regra 5: **Estimar Tempo Realista**

```
❌ ERRADO: "5 minutos" (quando leva 1 hora)
✅ CERTO: "30-60 minutos, dependendo de X e Y"
```

---

## 📊 IRON MAN - Status REAL (Verificado)

**Última verificação:** 2026-03-12 12:47 UTC

| Fase | Status | Prova |
|------|--------|-------|
| Fase 1: Calculadora | ✅ Pronto | `IRON_MAN_*.html` existem |
| Fase 2: DB + Componentes | ✅ Pronto | `src/components/*.jsx` existem |
| Fase 3: Integração | 🟡 Em andamento | Planos criados, execução pendente |
| Fase 4: Exportação | ⚪ Não iniciado | Nenhum arquivo de exportação |
| Fase 5: Deploy | ⚪ Não iniciado | Nenhum config de deploy |

**Arquivos modificados (não commitados):** 111 arquivos  
**Último commit:** `04a2620 docs: atualiza daily journal - IRON MAN 80% e testável!`

---

## 📧 Gmail - Status REAL

| Configuração | Status |
|--------------|--------|
| Email configurado | ✅ `joelsonlameira07@gmail.com` |
| Senha de app | ✅ `bzem quxq gvex hrfg` (salva em `.env.gmail`) |
| IMAP ativado | 🔴 **NÃO VERIFICADO** - Joelson precisa ativar |
| Conexão testada | 🔴 Falhou - `AUTHENTICATIONFAILED` |

**Ação necessária:** Joelson deve ativar IMAP em https://mail.google.com → Configurações → Encaminhamento e POP/IMAP

---

## 🔄 Como Atualizar Este Arquivo

Quando algo mudar (configurar Gmail, deploy, etc.):

1. Testar e verificar funcionamento
2. Atualizar tabela acima
3. Commitar mudança
4. **Só depois** falar "tá pronto"

---

*Mantido por Aurora. Atualizar SEMPRE que algo mudar. NUNCA assumir.*
