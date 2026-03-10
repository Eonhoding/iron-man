# 🦾 IRON MAN - Component Library

Biblioteca de componentes React reutilizáveis com tema Iron Man.

## Componentes Disponíveis

### Card
Container estilizado com bordas e gradientes.

```jsx
import { Card } from './components';

<Card gradient>
  <h2>Título</h2>
  <p>Conteúdo</p>
</Card>
```

### Button
Botões com múltiplas variantes.

```jsx
import { Button } from './components';
import { Save } from 'lucide-react';

<Button variant="primary" icon={Save}>
  Salvar
</Button>

<Button variant="secondary">Cancelar</Button>
<Button variant="outline">Borda</Button>
<Button variant="ghost" size="sm">Fantasma</Button>
```

**Variantes:** `primary`, `secondary`, `outline`, `ghost`  
**Tamanhos:** `sm`, `md`, `lg`

### Input
Campos de formulário.

```jsx
import { Input } from './components';
import { Building2 } from 'lucide-react';

<Input
  label="Nome do Projeto"
  value={nome}
  onChange={(e) => setNome(e.target.value)}
  placeholder="Ex: Residencial Silva"
  icon={Building2}
  error={errors.nome}
/>
```

### Select
Dropdowns estilizados.

```jsx
import { Select } from './components';

<Select
  label="Tipo de Obra"
  value={tipoObra}
  onChange={(e) => setTipoObra(e.target.value)}
  options={[
    { value: 'residencial', label: 'Residencial' },
    { value: 'comercial', label: 'Comercial' },
    { value: 'industrial', label: 'Industrial' }
  ]}
/>
```

### StatCard
Cards de estatísticas para dashboards.

```jsx
import { StatCard } from './components';
import { DollarSign } from 'lucide-react';

<StatCard
  title="Total do Orçamento"
  value="R$ 450.000"
  icon={DollarSign}
  trend="up"
  trendValue="12% vs mês anterior"
  color="green"
/>
```

**Cores:** `red`, `yellow`, `blue`, `green`, `purple`

---

## Adicionando Novos Componentes

1. Crie o arquivo em `src/components/NomeComponente.jsx`
2. Exporte no `src/components/index.js`
3. Documente neste README

## Padrões de Design

- **Tema:** Dark mode com acentos em vermelho e dourado (Iron Man)
- **Bordas:** Sutis, com hover states
- **Gradientes:** Usar com moderação para destaque
- **Animações:** Transições suaves (200-300ms)
- **Acessibilidade:** Focus states visíveis
