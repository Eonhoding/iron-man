'use client';

import { useState } from 'react';
import { Building2, Calculator, Hammer, TrendingUp, Clock, DollarSign, Ruler, Percent } from 'lucide-react';
import { Card, Button, Input, Select, StatCard } from '../components';

export default function Home() {
  const [projeto, setProjeto] = useState({
    nome: '',
    areaConstruida: '',
    areaTotal: '',
    tipoObra: 'residencial',
    padrao: 'medio'
  });

  const [orcamento, setOrcamento] = useState(null);
  const [loading, setLoading] = useState(false);

  const calcular = async () => {
    setLoading(true);
    
    // Simulação de cálculo (em produção chamaria a API)
    setTimeout(() => {
      const area = parseFloat(projeto.areaConstruida) || 0;
      const padrao = projeto.padrao;
      
      const custosPorM2 = {
        'baixo': 1200,
        'medio': 1800,
        'alto': 3000
      };

      const custoMateriais = area * custosPorM2[padrao];
      const diasEstimados = Math.ceil(area / 10);
      const custoMaoDeObra = diasEstimados * 250;
      const total = custoMateriais + custoMaoDeObra;

      setOrcamento({
        total: total,
        materiais: custoMateriais,
        maoDeObra: custoMaoDeObra,
        diasEstimados: diasEstimados,
        custoPorM2: total / area,
        detalhes: [
          { categoria: 'Fundação', valor: custoMateriais * 0.15, percentual: 15 },
          { categoria: 'Alvenaria', valor: custoMateriais * 0.20, percentual: 20 },
          { categoria: 'Cobertura', valor: custoMateriais * 0.12, percentual: 12 },
          { categoria: 'Acabamento', valor: custoMateriais * 0.30, percentual: 30 },
          { categoria: 'Elétrica', valor: custoMateriais * 0.08, percentual: 8 },
          { categoria: 'Hidráulica', valor: custoMateriais * 0.10, percentual: 10 }
        ]
      });
      setLoading(false);
    }, 800);
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const tipoObraOptions = [
    { value: 'residencial', label: 'Residencial' },
    { value: 'comercial', label: 'Comercial' },
    { value: 'industrial', label: 'Industrial' }
  ];

  const padraoOptions = [
    { value: 'baixo', label: 'Econômico (R$ 1.200/m²)' },
    { value: 'medio', label: 'Médio (R$ 1.800/m²)' },
    { value: 'alto', label: 'Alto Padrão (R$ 3.000/m²)' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <Hammer className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">IRON MAN</h1>
                <p className="text-sm text-slate-400">Sistema Operacional de Construção Civil</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Parceria</p>
              <p className="text-white font-semibold">Joelson & Aurora</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-red-500" />
              Novo Projeto
            </h2>

            <div className="space-y-4">
              <Input
                label="Nome do Projeto"
                value={projeto.nome}
                onChange={(e) => setProjeto({ ...projeto, nome: e.target.value })}
                placeholder="Ex: Residencial Silva"
                icon={Building2}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Área Construída (m²)"
                  type="number"
                  value={projeto.areaConstruida}
                  onChange={(e) => setProjeto({ ...projeto, areaConstruida: e.target.value })}
                  placeholder="100"
                  icon={Ruler}
                />
                <Input
                  label="Área Total (m²)"
                  type="number"
                  value={projeto.areaTotal}
                  onChange={(e) => setProjeto({ ...projeto, areaTotal: e.target.value })}
                  placeholder="150"
                  icon={Ruler}
                />
              </div>

              <Select
                label="Tipo de Obra"
                value={projeto.tipoObra}
                onChange={(e) => setProjeto({ ...projeto, tipoObra: e.target.value })}
                options={tipoObraOptions}
              />

              <Select
                label="Padrão Construtivo"
                value={projeto.padrao}
                onChange={(e) => setProjeto({ ...projeto, padrao: e.target.value })}
                options={padraoOptions}
              />

              <Button 
                onClick={calcular} 
                disabled={loading || !projeto.areaConstruida}
                className="w-full mt-4"
                icon={Calculator}
              >
                {loading ? 'Calculando...' : 'Calcular Orçamento'}
              </Button>
            </div>
          </Card>

          {/* Resultados */}
          <div className="space-y-6">
            {orcamento ? (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <StatCard
                    title="Total"
                    value={formatarMoeda(orcamento.total)}
                    icon={DollarSign}
                    color="green"
                  />
                  <StatCard
                    title="Custo/m²"
                    value={formatarMoeda(orcamento.custoPorM2)}
                    icon={Ruler}
                    color="blue"
                  />
                </div>

                <Card className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-yellow-500" />
                    Detalhamento
                  </h3>

                  <div className="space-y-4">
                    {/* Materiais vs Mão de Obra */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <p className="text-sm text-slate-400 mb-1">Materiais</p>
                        <p className="text-xl font-bold text-white">{formatarMoeda(orcamento.materiais)}</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <p className="text-sm text-slate-400 mb-1">Mão de Obra</p>
                        <p className="text-xl font-bold text-white">{formatarMoeda(orcamento.maoDeObra)}</p>
                      </div>
                    </div>

                    {/* Categorias */}
                    <div className="space-y-3">
                      {orcamento.detalhes.map((detalhe) => (
                        <div key={detalhe.categoria} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Percent className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-300">{detalhe.categoria}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-white">{formatarMoeda(detalhe.valor)}</p>
                            <p className="text-xs text-slate-400">{detalhe.percentual}%</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tempo Estimado */}
                    <div className="border-t border-slate-700 pt-4 mt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-slate-400" />
                          <span className="text-sm text-slate-300">Tempo Estimado</span>
                        </div>
                        <p className="text-lg font-bold text-white">{orcamento.diasEstimados} dias</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card gradient className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">🎯 Próximo Passo</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Quer exportar este orçamento para Excel ou PDF?
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      📊 Exportar Excel
                    </Button>
                    <Button variant="outline" size="sm">
                      📄 Exportar PDF
                    </Button>
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-12 text-center">
                <Calculator className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Nenhum orçamento calculado</h3>
                <p className="text-slate-400">
                  Preencha os dados do projeto e clique em "Calcular Orçamento"
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
