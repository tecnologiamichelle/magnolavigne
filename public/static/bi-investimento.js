// ============= MÓDULO: BI INVESTIMENTO =============

function renderBIInvestimentoModule() {
  const biData = state.data.biDashboard;
  
  if (!biData) {
    return `
      <div class="text-center py-12">
        <i class="fas fa-spinner fa-spin text-4xl text-green-500 mb-4"></i>
        <p class="text-gray-600">Carregando dashboard executivo...</p>
      </div>
    `;
  }
  
  const stats = biData.estatisticas_gerais || {};
  const prioridades = biData.distribuicao_prioridades || [];
  const oportunidades = biData.maiores_oportunidades || [];
  
  return `
    <div>
      <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <i class="fas fa-chart-pie text-purple-600"></i>
        <span>BI - Análise de Investimento Estratégico</span>
      </h1>
      
      <p class="text-gray-600 mb-8">
        <i class="fas fa-info-circle mr-2"></i>
        Análise estratégica para identificar onde investir recursos e esforços para maximizar cobertura eleitoral
      </p>
      
      <!-- Estatísticas Gerais -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm font-medium">Total de Territórios</p>
              <p class="text-3xl font-bold mt-1">${stats.total_territorios || 0}</p>
            </div>
            <i class="fas fa-map text-4xl opacity-20"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm font-medium">Eleitores Total</p>
              <p class="text-2xl font-bold mt-1">${formatNumber(stats.total_eleitores_bahia || 0)}</p>
            </div>
            <i class="fas fa-users text-4xl opacity-20"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm font-medium">Mobilizados</p>
              <p class="text-2xl font-bold mt-1">${formatNumber(stats.total_mobilizados || 0)}</p>
            </div>
            <i class="fas fa-hands-helping text-4xl opacity-20"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-yellow-100 text-sm font-medium">Cobertura Geral</p>
              <p class="text-3xl font-bold mt-1">${(stats.percentual_cobertura_geral || 0).toFixed(1)}%</p>
            </div>
            <i class="fas fa-chart-line text-4xl opacity-20"></i>
          </div>
        </div>
      </div>
      
      <!-- Distribuição por Prioridade e Maiores Oportunidades -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Gráfico de Prioridades -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-chart-bar text-purple-500"></i>
            Distribuição por Prioridade
          </h3>
          
          <div class="space-y-4">
            ${prioridades.map(p => {
              const cores = {
                'ALTÍSSIMA PRIORIDADE': { bg: 'bg-red-500', text: 'text-red-500' },
                'ALTA PRIORIDADE': { bg: 'bg-orange-500', text: 'text-orange-500' },
                'MÉDIA PRIORIDADE': { bg: 'bg-yellow-500', text: 'text-yellow-500' },
                'BAIXA PRIORIDADE': { bg: 'bg-green-500', text: 'text-green-500' }
              };
              const cor = cores[p.prioridade_investimento] || cores['BAIXA PRIORIDADE'];
              
              return `
                <div class="border-l-4 border-${cor.bg} pl-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-semibold ${cor.text}">${p.prioridade_investimento}</span>
                    <span class="text-gray-600 font-bold">${p.quantidade_territorios} territórios</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-600">Eleitores:</span>
                    <span class="font-bold text-gray-800">${formatNumber(p.total_eleitores)}</span>
                  </div>
                  <div class="flex items-center gap-3 mt-1">
                    <span class="text-sm text-gray-600">Potencial:</span>
                    <span class="font-bold text-purple-600">${formatNumber(p.potencial_crescimento)}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
        
        <!-- Top 5 Maiores Oportunidades -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-trophy text-yellow-500"></i>
            Top 5 Maiores Oportunidades
          </h3>
          
          <div class="space-y-3">
            ${oportunidades.slice(0, 5).map((t, index) => `
              <div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border-l-4 ${index === 0 ? 'border-yellow-500' : 'border-gray-300'}">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-2">
                    ${index === 0 ? '<i class="fas fa-crown text-yellow-500"></i>' : `<span class="text-gray-400 font-bold">#${index + 1}</span>`}
                    <span class="font-semibold text-gray-800">${t.territorio_nome}</span>
                  </div>
                  <span class="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-bold">
                    ${t.prioridade_investimento}
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span class="text-gray-600">Eleitores:</span>
                    <span class="font-bold text-gray-800 ml-2">${formatNumber(t.total_eleitores)}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Potencial:</span>
                    <span class="font-bold text-purple-600 ml-2">${t.percentual_potencial_crescimento}%</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      
      <!-- Tabela Completa de Territórios -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
            <i class="fas fa-table text-blue-500"></i>
            Análise Completa por Território
          </h3>
          
          <button 
            onclick="exportarBICSV()"
            class="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-all"
          >
            <i class="fas fa-download mr-2"></i>Exportar CSV
          </button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Território</th>
                <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Eleitores</th>
                <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Mobilizados</th>
                <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Cobertura</th>
                <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Potencial</th>
                <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Prioridade</th>
                <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody id="tabela-bi-territorios">
              <!-- Será preenchido dinamicamente -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

async function carregarBIDashboard() {
  try {
    const response = await axios.get('/api/bi/dashboard-executivo');
    state.data.biDashboard = response.data;
    
    // Carregar também a tabela completa
    const responseInvestimento = await axios.get('/api/bi/investimento-territorios');
    state.data.biInvestimento = responseInvestimento.data;
    
    // Re-renderizar
    const moduleContent = document.getElementById('module-content');
    if (moduleContent && state.currentModule === 'bi-investimento') {
      moduleContent.innerHTML = renderModuleContent();
      preencherTabelaBI();
    }
    
  } catch (error) {
    console.error('Erro ao carregar BI Dashboard:', error);
  }
}

function preencherTabelaBI() {
  const tbody = document.getElementById('tabela-bi-territorios');
  if (!tbody) return;
  
  const territorios = state.data.biInvestimento || [];
  
  tbody.innerHTML = territorios.map(t => {
    const prioridadeCores = {
      'ALTÍSSIMA PRIORIDADE': 'bg-red-100 text-red-800',
      'ALTA PRIORIDADE': 'bg-orange-100 text-orange-800',
      'MÉDIA PRIORIDADE': 'bg-yellow-100 text-yellow-800',
      'BAIXA PRIORIDADE': 'bg-green-100 text-green-800'
    };
    const corClass = prioridadeCores[t.prioridade_investimento] || 'bg-gray-100 text-gray-800';
    
    return `
      <tr class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
        <td class="px-4 py-3">
          <span class="font-semibold text-gray-800">${t.territorio_nome}</span>
        </td>
        <td class="px-4 py-3 text-center font-bold text-gray-700">
          ${formatNumber(t.total_eleitores || 0)}
        </td>
        <td class="px-4 py-3 text-center font-bold text-green-600">
          ${formatNumber(t.eleitores_mobilizados_atuais || 0)}
        </td>
        <td class="px-4 py-3 text-center">
          <span class="font-bold ${(t.percentual_cobertura_atual || 0) > 5 ? 'text-green-600' : 'text-red-600'}">
            ${(t.percentual_cobertura_atual || 0).toFixed(1)}%
          </span>
        </td>
        <td class="px-4 py-3 text-center">
          <span class="font-bold text-purple-600">
            ${(t.percentual_potencial_crescimento || 0).toFixed(1)}%
          </span>
        </td>
        <td class="px-4 py-3 text-center">
          <span class="px-3 py-1 rounded-full text-xs font-bold ${corClass}">
            ${t.prioridade_investimento}
          </span>
        </td>
        <td class="px-4 py-3 text-center">
          <button 
            onclick="verDetalhesTerritorioBI(${t.territorio_id})"
            class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold transition-all"
          >
            <i class="fas fa-eye mr-1"></i>Ver
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

async function verDetalhesTerritorioBI(territorioId) {
  try {
    const response = await axios.get(`/api/bi/investimento-territorio/${territorioId}`);
    const territorio = response.data;
    
    renderModalDetalhesBITerritorio(territorio);
    
  } catch (error) {
    console.error('Erro ao carregar detalhes BI do território:', error);
    alert('Erro ao carregar análise do território');
  }
}

function renderModalDetalhesBITerritorio(t) {
  const prioridadeCores = {
    'ALTÍSSIMA PRIORIDADE': { bg: 'bg-red-500', border: 'border-red-500' },
    'ALTA PRIORIDADE': { bg: 'bg-orange-500', border: 'border-orange-500' },
    'MÉDIA PRIORIDADE': { bg: 'bg-yellow-500', border: 'border-yellow-500' },
    'BAIXA PRIORIDADE': { bg: 'bg-green-500', border: 'border-green-500' }
  };
  const cores = prioridadeCores[t.prioridade_investimento] || prioridadeCores['BAIXA PRIORIDADE'];
  
  const modal = `
    <div id="modal-bi-territorio" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="fecharModalBITerritorio(event)">
      <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        <!-- Header -->
        <div class="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-3xl font-bold mb-2">${t.territorio_nome}</h2>
              <p class="text-purple-100">
                <i class="fas fa-chart-pie mr-2"></i>Análise Estratégica de Investimento
              </p>
            </div>
            <button onclick="fecharModalBITerritorio()" class="text-white hover:text-gray-200 transition-colors">
              <i class="fas fa-times text-3xl"></i>
            </button>
          </div>
        </div>
        
        <!-- Conteúdo -->
        <div class="p-6">
          <!-- Prioridade Destacada -->
          <div class="mb-6 p-6 rounded-xl ${cores.bg} text-white text-center border-4 ${cores.border}">
            <p class="text-sm font-medium mb-2">CLASSIFICAÇÃO DE PRIORIDADE</p>
            <p class="text-4xl font-bold">${t.prioridade_investimento}</p>
          </div>
          
          <!-- Métricas Principais -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <p class="text-sm text-blue-600 font-medium mb-1">Total Eleitores</p>
              <p class="text-2xl font-bold text-blue-900">${formatNumber(t.total_eleitores || 0)}</p>
            </div>
            
            <div class="bg-green-50 rounded-lg p-4 border-2 border-green-200">
              <p class="text-sm text-green-600 font-medium mb-1">Mobilizados</p>
              <p class="text-2xl font-bold text-green-900">${formatNumber(t.eleitores_mobilizados_atuais || 0)}</p>
            </div>
            
            <div class="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
              <p class="text-sm text-purple-600 font-medium mb-1">Potencial</p>
              <p class="text-2xl font-bold text-purple-900">${formatNumber(t.potencial_crescimento_eleitores || 0)}</p>
            </div>
            
            <div class="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
              <p class="text-sm text-yellow-600 font-medium mb-1">Cobertura</p>
              <p class="text-2xl font-bold text-yellow-900">${(t.percentual_cobertura_atual || 0).toFixed(1)}%</p>
            </div>
          </div>
          
          <!-- Análise Detalhada -->
          <div class="space-y-6 mb-6">
            <div>
              <h3 class="text-lg font-bold text-gray-800 mb-3">
                <i class="fas fa-chart-line text-purple-500 mr-2"></i>
                Análise de Crescimento
              </h3>
              <div class="bg-gray-50 rounded-lg p-4 space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">Lideranças Atuais:</span>
                  <span class="font-bold">${t.liderancas_atuais || 0}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Municípios Cobertos:</span>
                  <span class="font-bold">${t.municipios_cobertos || 0} de ${t.total_municipios}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">% Crescimento Possível:</span>
                  <span class="font-bold text-purple-600">${(t.percentual_potencial_crescimento || 0).toFixed(1)}%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-bold text-gray-800 mb-3">
                <i class="fas fa-bullseye text-red-500 mr-2"></i>
                Recomendações Estratégicas
              </h3>
              <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 space-y-2">
                ${gerarRecomendacoes(t)}
              </div>
            </div>
          </div>
          
          <!-- Botões de Ação -->
          <div class="flex gap-4">
            <button 
              onclick="exportarBITerritorioCSV(${t.territorio_id})"
              class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all"
            >
              <i class="fas fa-download mr-2"></i>Exportar Dados
            </button>
            
            <button 
              onclick="verTerritorioCompleto(${t.territorio_id})"
              class="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all"
            >
              <i class="fas fa-map mr-2"></i>Ver Território
            </button>
            
            <button 
              onclick="fecharModalBITerritorio()"
              class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-all"
            >
              <i class="fas fa-times mr-2"></i>Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modal);
}

function gerarRecomendacoes(t) {
  const recomendacoes = [];
  
  if (t.prioridade_investimento === 'ALTÍSSIMA PRIORIDADE') {
    recomendacoes.push(`
      <p class="flex items-start gap-2">
        <i class="fas fa-exclamation-triangle text-red-600 mt-1"></i>
        <span><strong>URGENTE:</strong> Este território tem alto potencial e baixa cobertura. Priorize ações imediatas!</span>
      </p>
    `);
  }
  
  if ((t.percentual_cobertura_atual || 0) < 5) {
    recomendacoes.push(`
      <p class="flex items-start gap-2">
        <i class="fas fa-users text-blue-600 mt-1"></i>
        <span>Cobertura muito baixa. Recomenda-se recrutamento intensivo de lideranças.</span>
      </p>
    `);
  }
  
  if ((t.liderancas_atuais || 0) === 0) {
    recomendacoes.push(`
      <p class="flex items-start gap-2">
        <i class="fas fa-user-plus text-green-600 mt-1"></i>
        <span>Nenhuma liderança cadastrada. Estabeleça presença no território.</span>
      </p>
    `);
  }
  
  if ((t.total_eleitores || 0) > 100000) {
    recomendacoes.push(`
      <p class="flex items-start gap-2">
        <i class="fas fa-trophy text-yellow-600 mt-1"></i>
        <span>Território de grande porte. Investimento aqui gera alto retorno eleitoral.</span>
      </p>
    `);
  }
  
  return recomendacoes.join('') || '<p class="text-gray-600">Mantenha as estratégias atuais.</p>';
}

function fecharModalBITerritorio(event) {
  if (!event || event.target.id === 'modal-bi-territorio') {
    const modal = document.getElementById('modal-bi-territorio');
    if (modal) modal.remove();
  }
}

function verTerritorioCompleto(territorioId) {
  fecharModalBITerritorio();
  state.currentModule = 'territorios';
  changeModule('territorios');
  setTimeout(() => verDetalhesTerritorio(territorioId), 300);
}

async function exportarBICSV() {
  try {
    const territorios = state.data.biInvestimento || [];
    
    let csv = 'Território,Eleitores,Mobilizados,Cobertura %,Potencial %,Prioridade\n';
    territorios.forEach(t => {
      csv += `"${t.territorio_nome}",${t.total_eleitores},${t.eleitores_mobilizados_atuais || 0},${(t.percentual_cobertura_atual || 0).toFixed(2)},${(t.percentual_potencial_crescimento || 0).toFixed(2)},"${t.prioridade_investimento}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bi_investimento_territorios.csv';
    a.click();
    
  } catch (error) {
    console.error('Erro ao exportar CSV:', error);
    alert('Erro ao exportar dados');
  }
}

async function exportarBITerritorioCSV(territorioId) {
  try {
    const response = await axios.get(`/api/bi/investimento-territorio/${territorioId}`);
    const t = response.data;
    
    let csv = 'Campo,Valor\n';
    csv += `Território,"${t.territorio_nome}"\n`;
    csv += `Total Eleitores,${t.total_eleitores}\n`;
    csv += `Eleitores Mobilizados,${t.eleitores_mobilizados_atuais || 0}\n`;
    csv += `Potencial de Crescimento,${t.potencial_crescimento_eleitores}\n`;
    csv += `Cobertura Atual %,${(t.percentual_cobertura_atual || 0).toFixed(2)}\n`;
    csv += `Potencial de Crescimento %,${(t.percentual_potencial_crescimento || 0).toFixed(2)}\n`;
    csv += `Prioridade de Investimento,"${t.prioridade_investimento}"\n`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bi_territorio_${territorioId}.csv`;
    a.click();
    
  } catch (error) {
    console.error('Erro ao exportar CSV:', error);
    alert('Erro ao exportar dados');
  }
}

// Função auxiliar para formatar números
function formatNumber(num) {
  if (!num) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
