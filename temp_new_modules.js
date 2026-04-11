// ===== FUNÇÕES PARA INSERIR APÓS LINHA 2686 =====

function renderTerritoriosModule() {
  const territorios = state.data.territorios || [];
  const territoriosData = state.data.territoriosMunicipios || {};
  
  if (territorios.length === 0) {
    return `
      <div class="text-center py-12">
        <i class="fas fa-spinner fa-spin text-4xl text-teal-600 mb-4"></i>
        <p class="text-gray-600 text-lg">Carregando territórios...</p>
      </div>
    `;
  }
  
  return `
    <div>
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          <i class="fas fa-map-marked-alt mr-3 text-teal-600"></i>Territórios da Bahia
        </h1>
        <p class="text-gray-600">Gestão estratégica dos 27 territórios de identidade</p>
      </div>
      
      <!-- Cards de Resumo -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90 mb-1">Total de Territórios</p>
              <p class="text-4xl font-bold">${territorios.length}</p>
            </div>
            <i class="fas fa-map text-5xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90 mb-1">Municípios Totais</p>
              <p class="text-4xl font-bold">417</p>
            </div>
            <i class="fas fa-city text-5xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90 mb-1">Coordenadores</p>
              <p class="text-4xl font-bold">${state.data.coordenadores?.length || 0}</p>
            </div>
            <i class="fas fa-users-cog text-5xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90 mb-1">Lideranças</p>
              <p class="text-4xl font-bold">${state.data.liderancas?.length || 0}</p>
            </div>
            <i class="fas fa-star text-5xl opacity-50"></i>
          </div>
        </div>
      </div>
      
      <!-- Grid de Territórios -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${territorios.map(territorio => {
          const municipios = territoriosData[territorio.id] || [];
          return `
            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div class="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
                <h3 class="text-xl font-bold mb-2">${territorio.nome}</h3>
                <p class="text-sm opacity-90">ID: ${territorio.id}</p>
              </div>
              
              <div class="p-6">
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-city text-blue-600"></i>
                      <span class="text-sm font-medium text-gray-700">Municípios</span>
                    </div>
                    <span class="text-lg font-bold text-blue-600">${municipios.length}</span>
                  </div>
                  
                  <div class="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-users-cog text-purple-600"></i>
                      <span class="text-sm font-medium text-gray-700">Coordenadores</span>
                    </div>
                    <span class="text-lg font-bold text-purple-600">
                      ${(state.data.coordenadores?.filter(c => c.territorio_id === territorio.id).length || 0)}
                    </span>
                  </div>
                  
                  <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div class="flex items-center gap-2">
                      <i class="fas fa-star text-green-600"></i>
                      <span class="text-sm font-medium text-gray-700">Lideranças</span>
                    </div>
                    <span class="text-lg font-bold text-green-600">
                      ${(state.data.liderancas?.filter(l => l.territorio_id === territorio.id).length || 0)}
                    </span>
                  </div>
                  
                  ${municipios.length > 0 ? `
                    <div class="pt-4 border-t border-gray-200">
                      <p class="text-xs text-gray-500 mb-2">Principais municípios:</p>
                      <div class="flex flex-wrap gap-2">
                        ${municipios.slice(0, 5).map(m => `
                          <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                            ${m}
                          </span>
                        `).join('')}
                        ${municipios.length > 5 ? `
                          <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-600">
                            +${municipios.length - 5} mais
                          </span>
                        ` : ''}
                      </div>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderBIInvestimentoModule() {
  const biData = state.data.biDashboard || {};
  const prioritarios = biData.prioritarios || [];
  const investimentoPorTipo = biData.investimentoPorTipo || [];
  const evolucaoMensal = biData.evolucaoMensal || [];
  
  return `
    <div>
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          <i class="fas fa-chart-pie mr-3 text-indigo-600"></i>BI Investimento
        </h1>
        <p class="text-gray-600">Business Intelligence - Análise de investimentos e prioridades</p>
      </div>
      
      <!-- KPIs -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90 mb-1">Investimento Total</p>
              <p class="text-4xl font-bold">R$ ${(biData.investimentoTotal || 0).toLocaleString('pt-BR')}</p>
            </div>
            <i class="fas fa-dollar-sign text-5xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90 mb-1">Projetos Ativos</p>
              <p class="text-4xl font-bold">${biData.projetosAtivos || 0}</p>
            </div>
            <i class="fas fa-project-diagram text-5xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90 mb-1">ROI Médio</p>
              <p class="text-4xl font-bold">${(biData.roiMedio || 0).toFixed(1)}%</p>
            </div>
            <i class="fas fa-chart-line text-5xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90 mb-1">Territórios Priorizados</p>
              <p class="text-4xl font-bold">${prioritarios.length}</p>
            </div>
            <i class="fas fa-map-pin text-5xl opacity-50"></i>
          </div>
        </div>
      </div>
      
      <!-- Territórios Prioritários -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div class="p-6 border-b border-gray-200">
          <h3 class="font-semibold text-gray-800">
            <i class="fas fa-flag mr-2 text-red-500"></i>
            Territórios Prioritários para Investimento
          </h3>
        </div>
        
        ${prioritarios.length === 0 ? `
          <div class="p-12 text-center">
            <i class="fas fa-map-marked-alt text-6xl text-gray-300 mb-4"></i>
            <p class="text-gray-600 text-lg">Nenhum território priorizado ainda</p>
            <p class="text-gray-500 text-sm mt-2">Configure prioridades no módulo Territórios</p>
          </div>
        ` : `
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Território</th>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Investimento</th>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Eleitores</th>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">ROI</th>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Prioridade</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                ${prioritarios.map((t, index) => {
                  const prioridade = t.prioridade || 'Media';
                  const corPrioridade = prioridade === 'Alta' ? 'red' : prioridade === 'Media' ? 'yellow' : 'green';
                  return `
                    <tr class="hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4">
                        <div class="flex items-center gap-2">
                          <span class="text-2xl">${index + 1}°</span>
                          <div>
                            <p class="font-medium text-gray-900">${t.nome || 'N/A'}</p>
                            <p class="text-sm text-gray-500">${t.municipios || 0} municípios</p>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-center">
                        <p class="text-lg font-bold text-green-600">R$ ${(t.investimento || 0).toLocaleString('pt-BR')}</p>
                      </td>
                      <td class="px-6 py-4 text-center">
                        <p class="text-lg font-bold text-blue-600">${(t.eleitores || 0).toLocaleString('pt-BR')}</p>
                      </td>
                      <td class="px-6 py-4 text-center">
                        <span class="inline-flex px-3 py-1 text-sm font-semibold rounded-full ${t.roi >= 100 ? 'bg-green-100 text-green-800' : t.roi >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">
                          ${(t.roi || 0).toFixed(1)}%
                        </span>
                      </td>
                      <td class="px-6 py-4 text-center">
                        <span class="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-${corPrioridade}-100 text-${corPrioridade}-800">
                          ${prioridade}
                        </span>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
      
      <!-- Distribuição por Tipo -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="font-semibold text-gray-800 mb-4">
          <i class="fas fa-chart-pie mr-2 text-purple-500"></i>
          Distribuição de Investimento por Tipo
        </h3>
        
        ${investimentoPorTipo.length === 0 ? `
          <div class="text-center py-12">
            <i class="fas fa-chart-pie text-6xl text-gray-300 mb-4"></i>
            <p class="text-gray-600">Nenhum investimento registrado</p>
          </div>
        ` : `
          <div class="space-y-4">
            ${investimentoPorTipo.map(tipo => {
              const percent = tipo.percentual || 0;
              return `
                <div>
                  <div class="flex justify-between mb-2">
                    <span class="text-sm font-medium text-gray-700">${tipo.nome}</span>
                    <span class="text-sm font-bold text-gray-900">R$ ${(tipo.valor || 0).toLocaleString('pt-BR')} (${percent.toFixed(1)}%)</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-3">
                    <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all" style="width: ${percent}%"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}
