# 🦾 IRON MAN - Como Usar

## 🚀 Quick Start

### 1. Instalar Dependências

```bash
cd /root/.openclaw/workspace/iron-man
npm install
```

### 2. Rodar em Desenvolvimento

```bash
npm run dev
```

Acesse: **http://localhost:3000**

### 3. Build para Produção

```bash
npm run build
npm run start
```

---

## 📱 Usando a Calculadora

### Passo 1: Criar Projeto

1. Preencha o **Nome do Projeto**
2. Informe a **Área Construída (m²)**
3. Informe a **Área Total (m²)** (opcional)

### Passo 2: Configurar

1. Selecione o **Tipo de Obra**:
   - 🏠 Residencial
   - 🏢 Comercial
   - 🏭 Industrial

2. Selecione o **Padrão**:
   - 💰 Econômico (R$ 1.200/m²)
   - ⚖️ Médio (R$ 1.800/m²)
   - 💎 Alto Padrão (R$ 3.000/m²)

### Passo 3: Calcular

Clique em **"Calcular Orçamento"**

### Resultado

Você verá:

- 💵 **Valor Total** da obra
- 📊 **Custo por m²**
- 🧱 **Materiais** (valor separado)
- 👷 **Mão de Obra** (valor separado)
- ⏱️ **Tempo Estimado** (dias)
- 📈 **Composição por Categoria** (gráfico)

---

## 💡 Exemplo Prático

**Projeto:** Casa Familiar  
**Área Construída:** 100 m²  
**Tipo:** Residencial  
**Padrão:** Médio

**Resultado Esperado:**

```
Total: R$ 205.000,00
Custo/m²: R$ 2.050,00
Materiais: R$ 180.000,00
Mão de Obra: R$ 25.000,00
Tempo: 10 dias

Composição:
- Fundação: 15% (R$ 27.000)
- Alvenaria: 20% (R$ 36.000)
- Cobertura: 12% (R$ 21.600)
- Acabamento: 30% (R$ 54.000)
- Elétrica: 8% (R$ 14.400)
- Hidráulica: 10% (R$ 18.000)
```

---

## 🛠️ Personalização

### Alterar Preços de Materiais

Edite: `src/lib/orcamento.js`

```javascript
const PRECOS_MATERIAIS = {
  'cimento_cp2': { 
    unidade: 'saco 50kg', 
    preco: 28.50,  // ← Altere aqui
    categoria: 'fundacao' 
  },
  // ... outros materiais
};
```

### Alterar Mão de Obra

```javascript
const MAO_DE_OBRA = {
  'pedreiro': { 
    diaria: 150.00,  // ← Altere aqui
    hora: 20.00 
  },
  // ... outros profissionais
};
```

### Adicionar Novos Materiais

```javascript
const PRECOS_MATERIAIS = {
  // ... materiais existentes
  'novo_material': { 
    unidade: 'unidade', 
    preco: 99.90, 
    categoria: 'acabamento' 
  },
};
```

---

## 📤 Exportação (Em desenvolvimento)

### Exportar para Excel

```javascript
// Em breve: botão "Exportar Excel"
// Gerará arquivo .xlsx com:
// - Lista completa de materiais
// - Quantidades
// - Preços unitários e totais
// - Resumo do orçamento
```

### Exportar para PDF

```javascript
// Em breve: botão "Exportar PDF"
// Gerará relatório profissional com:
// - Cabeçalho do projeto
// - Tabelas de custos
// - Gráficos de composição
// - Assinatura e data
```

---

## 🐛 Troubleshooting

### Erro: `npm install` falha

```bash
# Limpe o cache
npm cache clean --force

# Tente novamente
npm install
```

### Erro: Porta 3000 em uso

```bash
# Use outra porta
PORT=3001 npm run dev
```

### Erro: Dependências desatualizadas

```bash
# Atualize
npm update
```

---

## 📞 Suporte

**Projeto:** IRON MAN  
**Desenvolvedores:** Joelson Lameira & Aurora  
**Versão:** 1.0.0  
**Data:** 2026-03-10

**Issues:** Reportar no repositório  
**Feature Requests:** Enviar para equipe

---

*Documentação atualizada em: 2026-03-10*
