// ============= MÓDULO: TERRITÓRIOS =============

function renderTerritoriosModule() {
  const territorios = state.data.territorios;
  
  if (!territorios || territorios.length === 0) {
    return `
      <div class="text-center py-12">
        <i class="fas fa-spinner fa-spin text-4xl text-green-500 mb-4"></i>
        <p class="text-gray-600">Carregando territórios...</p>
      </div>
    `;
  }
  
  return `
    <div>
      <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <i class="fas fa-map-marked-alt text-green-600"></i>
        <span>Territórios de Identidade - Bahia</span>
      </h1>
      
      <!-- Cards de Estatísticas Rápidas -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-green-100 text-sm font-medium">Total de Territórios</p>
              <p class="text-3xl font-bold mt-1">${territorios.length}</p>
            </div>
            <i class="fas fa-map text-4xl opacity-20"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-blue-100 text-sm font-medium">Total de Municípios</p>
              <p class="text-3xl font-bold mt-1">${territorios.reduce((sum, t) => sum + (t.total_municipios || 0), 0)}</p>
            </div>
            <i class="fas fa-city text-4xl opacity-20"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-purple-100 text-sm font-medium">Total de Eleitores</p>
              <p class="text-3xl font-bold mt-1">${formatNumber(territorios.reduce((sum, t) => sum + (t.populacao_estimada || 0), 0))}</p>
            </div>
            <i class="fas fa-users text-4xl opacity-20"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-yellow-100 text-sm font-medium">Cobertura de Dados</p>
              <p class="text-3xl font-bold mt-1">${Math.round((territorios.filter(t => t.populacao_estimada > 0).length / territorios.length) * 100)}%</p>
            </div>
            <i class="fas fa-chart-pie text-4xl opacity-20"></i>
          </div>
        </div>
      </div>
      
      <!-- Filtros e Busca -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              <i class="fas fa-search mr-2"></i>Buscar Território
            </label>
            <input 
              type="text" 
              id="busca-territorio"
              placeholder="Digite o nome do território..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onkeyup="filtrarTerritorios()"
            />
          </div>
          
          <div class="md:w-64">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              <i class="fas fa-filter mr-2"></i>Filtrar por
            </label>
            <select 
              id="filtro-territorio"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onchange="filtrarTerritorios()"
            >
              <option value="todos">Todos os territórios</option>
              <option value="com-dados">Com dados de eleitores</option>
              <option value="sem-dados">Sem dados de eleitores</option>
              <option value="grandes">Grandes (>100k eleitores)</option>
              <option value="medios">Médios (50k-100k)</option>
              <option value="pequenos">Pequenos (<50k)</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Lista de Territórios -->
      <div id="lista-territorios" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${territorios.map(territorio => renderTerritorioCard(territorio)).join('')}
      </div>
    </div>
  `;
}

function renderTerritorioCard(territorio) {
  const eleitores = territorio.populacao_estimada || 0;
  const temDados = eleitores > 0;
  
  let tamanhoClass = 'border-gray-300';
  let tamanhoLabel = 'Sem dados';
  
  if (temDados) {
    if (eleitores > 100000) {
      tamanhoClass = 'border-purple-500 bg-purple-50';
      tamanhoLabel = 'Grande';
    } else if (eleitores > 50000) {
      tamanhoClass = 'border-blue-500 bg-blue-50';
      tamanhoLabel = 'Médio';
    } else {
      tamanhoClass = 'border-green-500 bg-green-50';
      tamanhoLabel = 'Pequeno';
    }
  }
  
  return `
    <div class="territorio-card bg-white rounded-xl shadow-lg border-2 ${tamanhoClass} p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
         data-territorio-nome="${territorio.nome.toLowerCase()}"
         data-territorio-eleitores="${eleitores}"
         data-territorio-tamanho="${tamanhoLabel.toLowerCase()}">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h3 class="text-xl font-bold text-gray-800 mb-1">${territorio.nome}</h3>
          <p class="text-sm text-gray-500">
            <i class="fas fa-map-pin mr-1"></i>Código: ${territorio.codigo}
          </p>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-bold ${temDados ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}">
          ${tamanhoLabel}
        </span>
      </div>
      
      <div class="space-y-3 mb-4">
        <div class="flex items-center justify-between py-2 border-b border-gray-200">
          <span class="text-sm text-gray-600">
            <i class="fas fa-city mr-2 text-blue-500"></i>Municípios
          </span>
          <span class="font-bold text-gray-800">${territorio.total_municipios || 0}</span>
        </div>
        
        <div class="flex items-center justify-between py-2 border-b border-gray-200">
          <span class="text-sm text-gray-600">
            <i class="fas fa-users mr-2 text-purple-500"></i>Eleitores
          </span>
          <span class="font-bold text-gray-800">${temDados ? formatNumber(eleitores) : 'Sem dados'}</span>
        </div>
        
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-gray-600">
            <i class="fas fa-chart-line mr-2 text-green-500"></i>Cobertura
          </span>
          <span class="font-bold text-gray-800">0%</span>
        </div>
      </div>
      
      <button 
        onclick="verDetalhesTerritorio(${territorio.id})"
        class="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 shadow-md"
      >
        <i class="fas fa-eye mr-2"></i>Ver Detalhes
      </button>
    </div>
  `;
}

function filtrarTerritorios() {
  const busca = document.getElementById('busca-territorio').value.toLowerCase();
  const filtro = document.getElementById('filtro-territorio').value;
  const cards = document.querySelectorAll('.territorio-card');
  
  cards.forEach(card => {
    const nome = card.getAttribute('data-territorio-nome');
    const eleitores = parseInt(card.getAttribute('data-territorio-eleitores'));
    const tamanho = card.getAttribute('data-territorio-tamanho');
    
    let mostrar = true;
    
    // Filtro de busca
    if (busca && !nome.includes(busca)) {
      mostrar = false;
    }
    
    // Filtro de categoria
    if (filtro !== 'todos') {
      if (filtro === 'com-dados' && eleitores === 0) mostrar = false;
      if (filtro === 'sem-dados' && eleitores > 0) mostrar = false;
      if (filtro === 'grandes' && tamanho !== 'grande') mostrar = false;
      if (filtro === 'medios' && tamanho !== 'médio') mostrar = false;
      if (filtro === 'pequenos' && tamanho !== 'pequeno') mostrar = false;
    }
    
    card.style.display = mostrar ? 'block' : 'none';
  });
}

async function verDetalhesTerritorio(territorioId) {
  try {
    // Buscar detalhes do território
    const response = await axios.get(`/api/territorios/${territorioId}`);
    const territorio = response.data;
    
    // Buscar municípios
    const responseMunicipios = await axios.get(`/api/territorios/${territorioId}/municipios`);
    const municipios = responseMunicipios.data;
    
    state.data.territorioSelecionado = territorio;
    state.data.municipiosTerritori = municipios;
    
    // Renderizar modal de detalhes
    renderModalDetalhesTerritorio(territorio, municipios);
    
  } catch (error) {
    console.error('Erro ao carregar detalhes do território:', error);
    alert('Erro ao carregar detalhes do território');
  }
}

function renderModalDetalhesTerritorio(territorio, municipios) {
  const totalEleitores = municipios.reduce((sum, m) => sum + (m.populacao || 0), 0);
  const municipiosComDados = municipios.filter(m => m.populacao > 0).length;
  
  const modal = `
    <div id="modal-territorio" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="fecharModalTerritorio(event)">
      <div class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        <!-- Header -->
        <div class="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-3xl font-bold mb-2">${territorio.nome}</h2>
              <p class="text-green-100">
                <i class="fas fa-map-pin mr-2"></i>Código: ${territorio.codigo}
              </p>
            </div>
            <button onclick="fecharModalTerritorio()" class="text-white hover:text-gray-200 transition-colors">
              <i class="fas fa-times text-3xl"></i>
            </button>
          </div>
        </div>
        
        <!-- Conteúdo -->
        <div class="p-6">
          <!-- Estatísticas Rápidas -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <p class="text-sm text-blue-600 font-medium mb-1">Total de Municípios</p>
              <p class="text-3xl font-bold text-blue-900">${territorio.total_municipios}</p>
            </div>
            
            <div class="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
              <p class="text-sm text-purple-600 font-medium mb-1">Total de Eleitores</p>
              <p class="text-3xl font-bold text-purple-900">${formatNumber(totalEleitores)}</p>
            </div>
            
            <div class="bg-green-50 rounded-lg p-4 border-2 border-green-200">
              <p class="text-sm text-green-600 font-medium mb-1">Com Dados</p>
              <p class="text-3xl font-bold text-green-900">${municipiosComDados}/${territorio.total_municipios}</p>
            </div>
            
            <div class="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
              <p class="text-sm text-yellow-600 font-medium mb-1">Cobertura</p>
              <p class="text-3xl font-bold text-yellow-900">${Math.round((municipiosComDados / territorio.total_municipios) * 100)}%</p>
            </div>
          </div>
          
          <!-- Lista de Municípios -->
          <div class="mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-city text-blue-500"></i>
              Municípios (${municipios.length})
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
              ${municipios.map(m => `
                <div class="bg-gray-50 rounded-lg p-3 border border-gray-200 hover:bg-gray-100 transition-colors">
                  <p class="font-semibold text-gray-800">${m.nome_municipio}</p>
                  <p class="text-sm text-gray-600 mt-1">
                    <i class="fas fa-users mr-1 text-purple-500"></i>
                    ${m.populacao > 0 ? formatNumber(m.populacao) + ' eleitores' : 'Sem dados'}
                  </p>
                </div>
              `).join('')}
            </div>
          </div>
          
          <!-- Botões de Ação -->
          <div class="flex gap-4 mt-6">
            <button 
              onclick="exportarTerritorioCSV(${territorio.id})"
              class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all"
            >
              <i class="fas fa-download mr-2"></i>Exportar CSV
            </button>
            
            <button 
              onclick="verAnaliseBI(${territorio.id})"
              class="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all"
            >
              <i class="fas fa-chart-pie mr-2"></i>Ver Análise BI
            </button>
            
            <button 
              onclick="fecharModalTerritorio()"
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

function fecharModalTerritorio(event) {
  if (!event || event.target.id === 'modal-territorio') {
    const modal = document.getElementById('modal-territorio');
    if (modal) modal.remove();
  }
}

async function carregarTerritorios() {
  // Se já carregou, não carrega novamente (cache)
  if (state.data.territorios && state.data.territorios.length > 0) {
    console.log('✅ Territórios já carregados (cache) - ' + state.data.territorios.length + ' territórios');
    return;
  }
  
  try {
    const startTime = performance.now();
    console.log('📊 Carregando territórios...');
    
    const response = await axios.get('/api/territorios');
    state.data.territorios = response.data;
    
    const endTime = performance.now();
    const loadTime = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log(`✅ ${response.data.length} territórios carregados em ${loadTime}s`);
    
    // Não renderizar automaticamente - deixar o módulo fazer isso
    if (state.currentModule === 'territorios') {
      render();
    }
  } catch (error) {
    console.error('❌ Erro ao carregar territórios:', error);
    showErrorMessage('Erro ao carregar territórios: ' + (error.response?.data?.error || error.message));
  }
}

function verAnaliseBI(territorioId) {
  fecharModalTerritorio();
  state.currentModule = 'bi-investimento';
  state.data.territorioSelecionado = territorioId;
  changeModule('bi-investimento');
}

async function exportarTerritorioCSV(territorioId) {
  try {
    const response = await axios.get(`/api/territorios/${territorioId}/municipios`);
    const municipios = response.data;
    
    // Criar CSV
    let csv = 'Município,População\n';
    municipios.forEach(m => {
      csv += `"${m.nome_municipio}",${m.populacao || 0}\n`;
    });
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `territorio_${territorioId}_municipios.csv`;
    a.click();
    
  } catch (error) {
    console.error('Erro ao exportar CSV:', error);
    alert('Erro ao exportar dados');
  }
}
