/**
 * IRON MAN - Calculadora de Orçamentos de Construção Civil
 * Baseado em 20+ anos de experiência de campo
 */

// Banco de dados de preços médios (Brasil - 2026)
// Atualizável via API ou manualmente
const PRECOS_MATERIAIS = {
  // Fundações
  'cimento_cp2': { unidade: 'saco 50kg', preco: 28.50, categoria: 'fundacao' },
  'areia_media': { unidade: 'm³', preco: 120.00, categoria: 'fundacao' },
  'brita_1': { unidade: 'm³', preco: 140.00, categoria: 'fundacao' },
  'ferro_8mm': { unidade: 'barra 12m', preco: 45.00, categoria: 'fundacao' },
  
  // Alvenaria
  'tijolo_8furos': { unidade: 'milheiro', preco: 450.00, categoria: 'alvenaria' },
  'bloco_concreto': { unidade: 'unidade', preco: 3.50, categoria: 'alvenaria' },
  'argamassa': { unidade: 'saco 20kg', preco: 18.00, categoria: 'alvenaria' },
  
  // Cobertura
  'telha_ceramica': { unidade: 'milheiro', preco: 850.00, categoria: 'cobertura' },
  'telha_fibrocimento': { unidade: 'm²', preco: 25.00, categoria: 'cobertura' },
  'madeira_telhado': { unidade: 'm³', preco: 1200.00, categoria: 'cobertura' },
  
  // Acabamentos
  'porcelanato': { unidade: 'm²', preco: 85.00, categoria: 'acabamento' },
  'ceramica_piso': { unidade: 'm²', preco: 45.00, categoria: 'acabamento' },
  'rejunte': { unidade: 'kg', preco: 22.00, categoria: 'acabamento' },
  'tinta_acrilica': { unidade: 'galão 18L', preco: 280.00, categoria: 'acabamento' },
  
  // Elétrica
  'fio_2_5mm': { unidade: 'metro', preco: 2.50, categoria: 'eletrica' },
  'disjuntor': { unidade: 'unidade', preco: 15.00, categoria: 'eletrica' },
  'tomada': { unidade: 'unidade', preco: 8.00, categoria: 'eletrica' },
  
  // Hidráulica
  'tubo_pvc_100mm': { unidade: 'barra 6m', preco: 45.00, categoria: 'hidraulica' },
  'tubo_pvc_25mm': { unidade: 'barra 6m', preco: 18.00, categoria: 'hidraulica' },
  'registro': { unidade: 'unidade', preco: 25.00, categoria: 'hidraulica' },
};

// Mão de obra média (Brasil - 2026)
const MAO_DE_OBRA = {
  'pedreiro': { diaria: 150.00, hora: 20.00 },
  'servente': { diaria: 100.00, hora: 12.00 },
  'eletricista': { diaria: 200.00, hora: 25.00 },
  'encanador': { diaria: 180.00, hora: 22.00 },
  'pintor': { diaria: 140.00, hora: 18.00 },
};

/**
 * Calcula orçamento baseado em áreas e especificações
 */
function calcularOrcamento(projeto) {
  const {
    areaConstruida = 0,
    areaTotal = 0,
    tipoObra = 'residencial',
    padrao = 'medio',
    customizacoes = {}
  } = projeto;

  let totalMateriais = 0;
  let totalMaoDeObra = 0;
  let detalhes = [];

  // Estimativa por m² (baseado no tipo e padrão)
  const custosPorM2 = getCustoPorM2(tipoObra, padrao);

  // Materiais
  const custoMateriais = areaConstruida * custosPorM2.materiais;
  totalMateriais = custoMateriais;

  // Mão de obra (estimativa de dias)
  const diasEstimados = areaConstruida / 10; // 10m² por dia (equipe)
  const custoMaoDeObra = diasEstimados * (MAO_DE_OBRA.pedreiro.diaria + MAO_DE_OBRA.servente.diaria);
  totalMaoDeObra = custoMaoDeObra;

  // Detalhamento por categoria
  const categorias = ['fundacao', 'alvenaria', 'cobertura', 'acabamento', 'eletrica', 'hidraulica'];
  categorias.forEach(cat => {
    const percentual = getPercentualCategoria(cat, tipoObra);
    const valor = custoMateriais * percentual;
    detalhes.push({
      categoria: cat,
      valor: valor,
      percentual: percentual * 100
    });
  });

  return {
    total: totalMateriais + totalMaoDeObra,
    materiais: totalMateriais,
    maoDeObra: totalMaoDeObra,
    diasEstimados: Math.ceil(diasEstimados),
    detalhes,
    custoPorM2: (totalMateriais + totalMaoDeObra) / areaConstruida,
    timestamp: new Date().toISOString()
  };
}

function getCustoPorM2(tipo, padrao) {
  const base = {
    'residencial': { 'baixo': 1200, 'medio': 1800, 'alto': 3000 },
    'comercial': { 'baixo': 1500, 'medio': 2200, 'alto': 3500 },
    'industrial': { 'baixo': 1000, 'medio': 1600, 'alto': 2500 }
  };

  return {
    materiais: base[tipo]?.[padrao] || 1800,
    maoDeObra: base[tipo]?.[padrao] * 0.4 || 720
  };
}

function getPercentualCategoria(categoria, tipo) {
  const percentuais = {
    'residencial': {
      'fundacao': 0.15,
      'alvenaria': 0.20,
      'cobertura': 0.12,
      'acabamento': 0.30,
      'eletrica': 0.08,
      'hidraulica': 0.10
    },
    'comercial': {
      'fundacao': 0.12,
      'alvenaria': 0.18,
      'cobertura': 0.10,
      'acabamento': 0.35,
      'eletrica': 0.12,
      'hidraulica': 0.08
    }
  };

  return percentuais[tipo]?.[categoria] || 0.15;
}

/**
 * Gera lista de materiais baseada na área
 */
function gerarListaMateriais(area, tipo) {
  const lista = [];
  
  // Cimento (1 saco para cada 2m² de área construída)
  lista.push({
    item: 'Cimento CP-II',
    quantidade: Math.ceil(area / 2),
    unidade: 'sacos 50kg',
    precoUnit: PRECOS_MATERIAIS.cimento_cp2.preco,
    total: Math.ceil(area / 2) * PRECOS_MATERIAIS.cimento_cp2.preco
  });

  // Areia (0.05m³ por m²)
  const areiaQtd = area * 0.05;
  lista.push({
    item: 'Areia Média',
    quantidade: areiaQtd.toFixed(2),
    unidade: 'm³',
    precoUnit: PRECOS_MATERIAIS.areia_media.preco,
    total: areiaQtd * PRECOS_MATERIAIS.areia_media.preco
  });

  // Brita (0.04m³ por m²)
  const britaQtd = area * 0.04;
  lista.push({
    item: 'Brita 1',
    quantidade: britaQtd.toFixed(2),
    unidade: 'm³',
    precoUnit: PRECOS_MATERIAIS.brita_1.preco,
    total: britaQtd * PRECOS_MATERIAIS.brita_1.preco
  });

  // Tijolos (25 por m² de parede)
  const paredes = area * 2.5; // Estimativa de área de paredes
  const tijolosQtd = Math.ceil(paredes * 25 / 1000); // Em milheiros
  lista.push({
    item: 'Tijolo 8 Furos',
    quantidade: tijolosQtd,
    unidade: 'milheiros',
    precoUnit: PRECOS_MATERIAIS.tijolo_8furos.preco,
    total: tijolosQtd * PRECOS_MATERIAIS.tijolo_8furos.preco
  });

  return {
    materiais: lista,
    total: lista.reduce((sum, item) => sum + item.total, 0)
  };
}

module.exports = {
  calcularOrcamento,
  gerarListaMateriais,
  PRECOS_MATERIAIS,
  MAO_DE_OBRA
};
