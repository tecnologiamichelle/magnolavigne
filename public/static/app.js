// Estado global da aplicação
const state = {
  candidato: null,
  currentModule: 'dashboard',
  filtroSolicitacoes: 'pendente',
  tseTab: 'importar',
  analiseTab: 'municipios', // Aba ativa da Análise Eleitoral
  liderancaFormMode: false,
  liderancaFormData: {},
  liderancaEditando: null, // Liderança sendo editada
  relatorioAtivo: null,
  relatorioData: null,
  // Estados dos modais
  modalAtivo: null, // 'coordenador', 'profissional', 'agenda', 'eleitor'
  modalData: {},
  modalEditId: null,
  data: {
    dashboard: null,
    solicitacoes: [],
    solicitacoesPendentes: 0,
    tseStats: null,
    tseCandidatos: [],
    dadosEleitorais: [],
    liderancas: [],
    coordenadores: [],
    profissionais: [],
    ajudaEleitoral: [],
    agenda: [],
    relatorios: [],
    analiseEleitoral: null, // Dados da análise eleitoral
    usuarios: [], // Lista de usuários
    territorios: [], // Lista de territórios
    territorioSelecionado: null, // Território sendo visualizado
    municipiosTerritori: [], // Municípios do território selecionado
    biDashboard: null, // Dashboard executivo BI
    biInvestimento: [], // Análise de investimento por território
    biPrioritarios: [], // Territórios prioritários
    eleitores: [], // Lista de eleitores
    hierarquia: null // Relatório de hierarquia
  }
};

// Configurar Axios
axios.defaults.baseURL = '';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// ============= FUNÇÕES DE RENDERIZAÇÃO =============

function render() {
  const app = document.getElementById('app');
  
  if (!state.candidato) {
    app.innerHTML = renderLogin();
    attachLoginEvents();
  } else {
    app.innerHTML = renderDashboard();
    attachDashboardEvents();
  }
}

function renderLogin() {
  return `
    <div class="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <!-- Background animado com gradiente -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
        <div class="absolute inset-0 opacity-30">
          <div class="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div class="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>
      
      <!-- Container principal -->
      <div class="relative z-10 w-full max-w-md">
        <!-- Card de Login -->
        <div class="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
          <!-- Header -->
          <div class="text-center mb-8 animate-fadeIn">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg transform hover:rotate-6 transition-transform duration-300">
              <i class="fas fa-chart-network text-4xl text-white"></i>
            </div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              MeuPolitico.Digital
            </h1>
            <p class="text-gray-600 font-medium">Plataforma Inteligente de Gestão de Campanha</p>
            <div class="mt-3 inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full">
              <i class="fas fa-shield-check text-blue-600 text-sm"></i>
              <p class="text-sm text-blue-700 font-semibold">Sistema Seguro e Profissional</p>
            </div>
          </div>
          
          <!-- Mensagens de erro/sucesso -->
          <div id="login-error" class="hidden mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-green-700 rounded-xl shadow-sm animate-slideDown">
            <div class="flex items-center gap-2">
              <i class="fas fa-exclamation-circle"></i>
              <span id="login-error-message" class="font-medium"></span>
            </div>
          </div>
          
          <div id="login-success" class="hidden mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-xl shadow-sm animate-slideDown">
            <div class="flex items-center gap-2">
              <i class="fas fa-check-circle"></i>
              <span id="login-success-message" class="font-medium"></span>
            </div>
          </div>
          
          <!-- Formulário -->
          <form id="login-form" class="space-y-5">
            <div class="space-y-2 animate-fadeIn animation-delay-200">
              <label class="block text-sm font-bold text-gray-700">
                <i class="fas fa-envelope text-green-600 mr-2"></i>E-mail
              </label>
              <div class="relative">
                <input 
                  type="email" 
                  id="email" 
                  required
                  class="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                  placeholder="seu@email.com"
                />
                <div class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <i class="fas fa-at"></i>
                </div>
              </div>
            </div>
            
            <div class="space-y-2 animate-fadeIn animation-delay-400">
              <div class="flex justify-between items-center">
                <label class="block text-sm font-bold text-gray-700">
                  <i class="fas fa-lock text-green-600 mr-2"></i>Senha
                </label>
                <a href="#" class="text-xs text-green-600 hover:text-green-700 font-semibold transition-colors" onclick="showForgotPassword(); return false;">
                  Esqueceu?
                </a>
              </div>
              <div class="relative">
                <input 
                  type="password" 
                  id="senha" 
                  required
                  class="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                  placeholder="••••••••"
                />
                <button type="button" onclick="togglePasswordVisibility()" class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  <i class="fas fa-eye" id="toggle-password-icon"></i>
                </button>
              </div>
            </div>
            
            <button 
              type="submit"
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 animate-fadeIn animation-delay-600"
            >
              <i class="fas fa-sign-in-alt"></i>
              <span>Entrar no Sistema</span>
            </button>
          </form>
          
          <!-- Divisor -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-white text-gray-500">ou</span>
            </div>
          </div>
          
          <!-- Botão Criar Conta -->
          <button 
            onclick="showRegisterForm(); return false;"
            class="w-full bg-white border-2 border-blue-200 text-blue-700 py-4 rounded-xl font-bold hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <i class="fas fa-user-plus"></i>
            <span>Criar Nova Conta</span>
          </button>
          
          <!-- Footer -->
          <div class="mt-6 text-center space-y-3">
            <p class="text-xs text-gray-400 flex items-center justify-center gap-2">
              <i class="fas fa-shield-alt text-green-500"></i>
              <span>Conexão segura e criptografada</span>
            </p>
          </div>
        </div>
        
        <!-- Créditos -->
        <div class="text-center mt-6 animate-fadeIn animation-delay-800">
          <p class="text-white/80 text-sm">
            <div class="flex items-center justify-between text-xs">
              <span>© 2026 MeuPolitico.Digital</span>
              <div class="flex items-center gap-2">
                <i class="fas fa-shield-check text-blue-400"></i>
                <span class="text-blue-300">Plataforma Profissional</span>
              </div>
            </div>
            <p class="text-xs text-blue-300 mt-1">Tecnologia para campanhas vencedoras</p>
          </p>
        </div>
      </div>
    </div>
    
    <style>
      @keyframes blob {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .animate-blob {
        animation: blob 7s infinite;
      }
      
      .animate-fadeIn {
        animation: fadeIn 0.6s ease-out forwards;
      }
      
      .animate-slideDown {
        animation: slideDown 0.3s ease-out forwards;
      }
      
      .animation-delay-200 {
        animation-delay: 0.2s;
      }
      
      .animation-delay-400 {
        animation-delay: 0.4s;
      }
      
      .animation-delay-600 {
        animation-delay: 0.6s;
      }
      
      .animation-delay-800 {
        animation-delay: 0.8s;
      }
      
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      
      .animation-delay-4000 {
        animation-delay: 4s;
      }
    </style>
  `;
}

function renderDashboard() {
  return `
    <div class="flex flex-col md:flex-row min-h-screen">
      <!-- Sidebar - Tema Verde PV + REDE Sustentabilidade -->
      <div class="sidebar bg-gradient-to-b from-blue-700 to-indigo-900 text-white w-full md:w-64 p-6 shadow-2xl flex flex-col min-h-screen">
        <div class="mb-8">
          <h2 class="text-2xl font-bold flex items-center">
            <i class="fas fa-chart-network text-blue-300 mr-3 text-3xl"></i>
            <div>
              <span class="text-2xl font-bold">MeuPolitico</span>
              <span class="text-xs block text-blue-300 -mt-1">.Digital</span>
            </div>
            <span>${state.candidato.nome || 'Usuário'}</span>
          </h2>
          <p class="text-green-200 text-sm mt-1 flex items-center gap-2">
            <i class="fas fa-seedling text-xs"></i>
            PV + REDE
          </p>
        </div>
        
        <div class="mb-6 p-4 bg-green-800 bg-opacity-50 rounded-lg border border-green-600">
          <p class="text-sm text-green-200">Conectado como:</p>
          <p class="font-semibold truncate">${state.candidato.nome}</p>
          <p class="text-xs text-green-200 truncate">${state.candidato.email}</p>
        </div>
        
        <nav class="space-y-2 flex-1 overflow-y-auto">
          ${renderMenuItem('dashboard', 'fa-seedling', 'Dashboard')}
          ${renderMenuItem('aprovacoes', 'fa-user-check', 'Aprovações', state.data.solicitacoesPendentes || 0)}
          ${renderMenuItem('dados-eleitorais', 'fa-globe-americas', 'Dados Eleitorais')}
          ${renderMenuItem('liderancas', 'fa-tree', 'Lideranças')}
          ${renderMenuItem('coordenadores', 'fa-project-diagram', 'Coordenadores')}
          ${renderMenuItem('eleitores', 'fa-users', 'Eleitores')}
          ${renderMenuItem('hierarquia', 'fa-sitemap', 'Hierarquia')}
          ${renderMenuItem('profissionais', 'fa-briefcase', 'Profissionais')}
          ${renderMenuItem('agenda', 'fa-sun', 'Agenda')}
          <div class="border-t border-green-600 my-2"></div>
          ${renderMenuItem('territorios', 'fa-map-marked-alt', 'Territórios')}
          ${renderMenuItem('bi-investimento', 'fa-chart-pie', 'BI Investimento')}
          <div class="border-t border-green-600 my-2"></div>
          ${renderMenuItem('relatorios', 'fa-chart-line', 'Relatórios', 0, true)}
          ${state.candidato.tipo === 'admin' ? renderMenuItem('usuarios', 'fa-users-cog', 'Usuários') : ''}
          ${state.candidato.tipo === 'admin' ? `<div class="border-t border-green-600 my-2"></div>` : ''}
          ${state.candidato.tipo === 'admin' ? renderMenuItem('configuracoes', 'fa-recycle', 'Configurações') : ''}
        </nav>
        
        <div class="mt-auto pt-4">
          <button 
            onclick="logout()"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            <i class="fas fa-sign-out-alt mr-2"></i>Sair
          </button>
        </div>
      </div>
      
      <!-- Conteúdo Principal -->
      <div class="flex-1 p-6 overflow-y-auto bg-gray-50">
        <div id="module-content" class="max-w-7xl mx-auto">
          ${renderModuleContent()}
        </div>
      </div>
    </div>
  `;
}

function renderMenuItem(module, icon, label, badge = 0, disabled = false) {
  const isActive = state.currentModule === module;
  const activeClass = isActive ? 'bg-yellow-500 text-gray-900 font-bold shadow-lg' : 'hover:bg-green-600 hover:bg-opacity-50';
  
  if (disabled) {
    return `
      <div class="w-full text-left px-4 py-3 rounded-lg opacity-50 cursor-not-allowed flex items-center justify-between">
        <span>
          <i class="fas ${icon} mr-3 w-5"></i>${label}
        </span>
        <span class="text-xs text-green-300">(Em breve)</span>
      </div>
    `;
  }
  
  return `
    <button 
      onclick="changeModule('${module}')"
      class="w-full text-left px-4 py-3 rounded-lg transition-all ${activeClass} flex items-center justify-between"
    >
      <span>
        <i class="fas ${icon} mr-3 w-5"></i>${label}
      </span>
      ${badge > 0 ? `<span class="bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-1 rounded-full animate-pulse">${badge}</span>` : ''}
    </button>
  `;
}

function renderModuleContent() {
  switch (state.currentModule) {
    case 'dashboard': return renderDashboardModule();
    case 'aprovacoes': return renderAprovacoesModule();
    case 'dados-eleitorais': return renderDadosEleitoraisModule();
    case 'liderancas': return renderLiderancasModule();
    case 'coordenadores': return renderCoordenadoresModule();
    case 'eleitores': return renderEleitoresModule();
    case 'hierarquia': return renderHierarquiaModule();
    case 'profissionais': return renderProfissionaisModule();
    case 'agenda': return renderAgendaModule();
    case 'territorios': return renderTerritoriosModule();
    case 'bi-investimento': return renderBIInvestimentoModule();
    case 'usuarios': return renderUsuariosModule();
    case 'relatorios': return renderRelatoriosModule();
    case 'configuracoes': return renderConfiguracoesModule();
    default: return '<p>Módulo não encontrado</p>';
  }
}

// ============= MÓDULO: DASHBOARD =============

function renderDashboardModule() {
  const stats = state.data.dashboard;
  
  if (!stats) {
    return `
      <div class="text-center py-12">
        <i class="fas fa-spinner fa-spin text-4xl text-green-600 mb-4"></i>
        <p class="text-gray-600 text-lg">Carregando dashboard...</p>
      </div>
    `;
  }
  
  return `
    <div>
      <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <i class="fas fa-seedling text-green-600 animate-grow-pv"></i>
        <span>Dashboard - Crescimento Sustentável</span>
      </h1>
      
      <!-- Cards de Estatísticas - Tema Verde PV -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        ${renderStatCard('Lideranças', stats.totalLiderancas, 'fa-tree', 'from-blue-500 to-blue-600')}
        ${renderStatCard('Coordenadores', stats.totalCoordenadores, 'fa-project-diagram', 'from-indigo-500 to-indigo-600')}
        ${renderStatCard('Profissionais', stats.totalProfissionais, 'fa-briefcase', 'from-purple-500 to-purple-600')}
        ${renderStatCard('Solicitações', stats.solicitacoesPendentes, 'fa-clipboard-list', 'from-cyan-500 to-cyan-600')}
      </div>
      
      <!-- Próximos Eventos -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800">
            <i class="fas fa-calendar-check mr-2 text-green-600"></i>Próximos Compromissos
          </h3>
          <button onclick="changeModule('agenda')" class="text-green-600 hover:text-purple-800 text-sm font-semibold">
            Ver todos <i class="fas fa-arrow-right ml-1"></i>
          </button>
        </div>
        ${renderProximosCompromissos(stats.proximosEventos)}
      </div>
      
      <!-- Alertas -->
      ${stats.alertas && stats.alertas.length > 0 ? `
        <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 class="text-lg font-semibold text-yellow-800 mb-4">
            <i class="fas fa-exclamation-triangle mr-2"></i>Alertas
          </h3>
          <div class="space-y-2">
            ${stats.alertas.map(alerta => `
              <div class="flex items-center text-yellow-700">
                <i class="fas fa-info-circle mr-2"></i>
                <span>${alerta}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function renderStatCard(title, value, icon, color) {
  return `
    <div class="card bg-gradient-to-br ${color} text-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-white text-sm opacity-90">${title}</p>
          <p class="text-4xl font-bold mt-2">${value || 0}</p>
        </div>
        <div class="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center">
          <i class="fas ${icon} text-white text-2xl"></i>
        </div>
      </div>
    </div>
  `;
}

function renderCoordList(data) {
  if (!data || data.length === 0) {
    return '<p class="text-gray-500 text-sm">Nenhum dado disponível</p>';
  }
  
  const tipos = { regional: 'Regional', territorial: 'Territorial', municipal: 'Municipal' };
  
  return `
    <div class="space-y-3">
      ${data.map(item => `
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span class="font-medium text-gray-700">${tipos[item.tipo] || item.tipo}</span>
          <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">${item.total}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderProfList(data) {
  if (!data || data.length === 0) {
    return '<p class="text-gray-500 text-sm">Nenhum dado disponível</p>';
  }
  
  return `
    <div class="space-y-3">
      ${data.map(item => `
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span class="font-medium text-gray-700 capitalize">${item.profissao}</span>
          <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">${item.total}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderProximosCompromissos(eventos) {
  const agenda = eventos || state.data.proximosEventos || [];
  
  if (agenda.length === 0) {
    return `
      <div class="text-center py-8">
        <i class="fas fa-calendar-times text-4xl text-gray-300 mb-3"></i>
        <p class="text-gray-500 text-sm">Nenhum compromisso pendente</p>
        <button onclick="changeModule('agenda')" class="mt-3 text-green-600 hover:text-purple-800 text-sm font-semibold">
          + Adicionar compromisso
        </button>
      </div>
    `;
  }
  
  const tipoIcons = {
    reuniao: { icon: 'fa-users', color: 'text-blue-600 bg-blue-100' },
    visita: { icon: 'fa-map-marker-alt', color: 'text-green-600 bg-green-100' },
    evento: { icon: 'fa-calendar-star', color: 'text-green-600 bg-purple-100' },
    tarefa: { icon: 'fa-tasks', color: 'text-orange-600 bg-orange-100' },
    ligacao: { icon: 'fa-phone', color: 'text-green-600 bg-indigo-100' }
  };
  
  return `
    <div class="space-y-3 max-h-80 overflow-y-auto">
      ${agenda.map(item => {
        const tipo = tipoIcons[item.tipo] || tipoIcons.tarefa;
        const data = new Date(item.data_inicio);
        const dataFormatada = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        const horaFormatada = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        return `
          <div class="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" onclick="changeModule('agenda')">
            <div class="flex items-start gap-3">
              <div class="${tipo.color} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas ${tipo.icon}"></i>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-gray-800 text-sm truncate">${item.titulo}</h4>
                <p class="text-xs text-gray-600 mt-1">
                  <i class="fas fa-clock mr-1"></i>${dataFormatada} às ${horaFormatada}
                </p>
                ${item.local ? `<p class="text-xs text-gray-500 mt-1"><i class="fas fa-map-marker-alt mr-1"></i>${item.local}</p>` : ''}
              </div>
              ${item.prioridade === 'alta' ? '<span class="flex-shrink-0"><i class="fas fa-exclamation-circle text-red-500"></i></span>' : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ============= MÓDULO: APROVAÇÕES =============

function renderAprovacoesModule() {
  const solicitacoes = state.data.solicitacoes || [];
  
  return `
    <div>
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          <i class="fas fa-user-check mr-3"></i>Aprovações de Cadastro
        </h1>
        <div class="flex gap-2">
          <button 
            onclick="filterSolicitacoes('pendente')"
            class="px-4 py-2 rounded-lg ${!state.filtroSolicitacoes || state.filtroSolicitacoes === 'pendente' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'} hover:opacity-80 transition-all"
          >
            <i class="fas fa-clock mr-2"></i>Pendentes
          </button>
          <button 
            onclick="filterSolicitacoes('aprovado')"
            class="px-4 py-2 rounded-lg ${state.filtroSolicitacoes === 'aprovado' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'} hover:opacity-80 transition-all"
          >
            <i class="fas fa-check mr-2"></i>Aprovados
          </button>
          <button 
            onclick="filterSolicitacoes('rejeitado')"
            class="px-4 py-2 rounded-lg ${state.filtroSolicitacoes === 'rejeitado' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'} hover:opacity-80 transition-all"
          >
            <i class="fas fa-times mr-2"></i>Rejeitados
          </button>
        </div>
      </div>
      
      ${solicitacoes.length === 0 ? `
        <div class="text-center py-12">
          <i class="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
          <p class="text-gray-500 text-lg">Nenhuma solicitação encontrada</p>
        </div>
      ` : `
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          ${solicitacoes.map(sol => `
            <div class="card bg-white rounded-xl shadow-md p-6 border-l-4 ${
              sol.status === 'pendente' ? 'border-yellow-500' : 
              sol.status === 'aprovado' ? 'border-green-500' : 'border-red-500'
            }">
              <!-- Header do Card -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center ${
                    sol.tipo === 'admin' ? 'bg-pink-100 text-pink-600' :
                    sol.tipo === 'coordenador' ? 'bg-purple-100 text-green-600' :
                    'bg-blue-100 text-blue-600'
                  }">
                    <i class="fas ${
                      sol.tipo === 'admin' ? 'fa-crown' :
                      sol.tipo === 'coordenador' ? 'fa-user-tie' :
                      'fa-users'
                    } text-xl"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-800">${sol.nome}</h3>
                    <span class="text-xs px-2 py-1 rounded-full ${
                      sol.tipo === 'admin' ? 'bg-pink-100 text-pink-700' :
                      sol.tipo === 'coordenador' ? 'bg-purple-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }">
                      ${sol.tipo === 'admin' ? 'Admin' : sol.tipo === 'coordenador' ? 'Coordenador' : 'Liderança'}
                    </span>
                  </div>
                </div>
                <span class="text-xs px-3 py-1 rounded-full font-semibold ${
                  sol.status === 'pendente' ? 'bg-yellow-100 text-yellow-700' :
                  sol.status === 'aprovado' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-green-700'
                }">
                  ${sol.status === 'pendente' ? 'Pendente' : sol.status === 'aprovado' ? 'Aprovado' : 'Rejeitado'}
                </span>
              </div>
              
              <!-- Informações -->
              <div class="space-y-2 mb-4">
                <div class="flex items-center text-sm text-gray-600">
                  <i class="fas fa-envelope w-5 mr-2 text-gray-400"></i>
                  <span class="truncate">${sol.email}</span>
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <i class="fas fa-phone w-5 mr-2 text-gray-400"></i>
                  <span>${sol.telefone || 'Não informado'}</span>
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <i class="fas fa-map-marker-alt w-5 mr-2 text-gray-400"></i>
                  <span>${sol.municipio} - ${sol.estado}</span>
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <i class="fas fa-calendar w-5 mr-2 text-gray-400"></i>
                  <span>${new Date(sol.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              
              <!-- Ações -->
              ${sol.status === 'pendente' ? `
                <div class="flex gap-2">
                  <button 
                    onclick="aprovarSolicitacao(${sol.id})"
                    class="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors font-semibold"
                  >
                    <i class="fas fa-check mr-2"></i>Aprovar
                  </button>
                  <button 
                    onclick="rejeitarSolicitacao(${sol.id})"
                    class="flex-1 bg-red-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors font-semibold"
                  >
                    <i class="fas fa-times mr-2"></i>Rejeitar
                  </button>
                </div>
              ` : sol.status === 'rejeitado' && sol.motivo_rejeicao ? `
                <div class="mt-3 p-3 bg-red-50 border-l-4 border-red-500 rounded">
                  <p class="text-sm text-green-700">
                    <strong>Motivo:</strong> ${sol.motivo_rejeicao}
                  </p>
                </div>
              ` : `
                <div class="flex items-center justify-center text-green-600 py-2">
                  <i class="fas fa-check-circle mr-2"></i>
                  <span class="font-semibold">Aprovado</span>
                </div>
              `}
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

// ============= MÓDULO: DADOS TSE =============

function renderDadosTSEModule() {
  const stats = state.data.tseStats || null;
  
  return `
    <div>
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          <i class="fas fa-vote-yea mr-3 text-green-600"></i>Dados do TSE
        </h1>
        <p class="text-gray-600">Importação e análise de dados eleitorais oficiais</p>
      </div>
      
      <!-- Cards de Status -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between mb-2">
            <i class="fas fa-users text-3xl opacity-80"></i>
            <span class="text-2xl font-bold">${stats?.candidatos || 0}</span>
          </div>
          <p class="text-sm opacity-90">Candidatos</p>
        </div>
        
        <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between mb-2">
            <i class="fas fa-map-marked-alt text-3xl opacity-80"></i>
            <span class="text-2xl font-bold">${stats?.municipios || 0}</span>
          </div>
          <p class="text-sm opacity-90">Municípios</p>
        </div>
        
        <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between mb-2">
            <i class="fas fa-chart-bar text-3xl opacity-80"></i>
            <span class="text-2xl font-bold">${stats?.votos || 0}</span>
          </div>
          <p class="text-sm opacity-90">Total de Votos</p>
        </div>
        
        <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between mb-2">
            <i class="fas fa-users-cog text-3xl opacity-80"></i>
            <span class="text-2xl font-bold">${stats?.eleitores || 0}</span>
          </div>
          <p class="text-sm opacity-90">Eleitores</p>
        </div>
      </div>
      
      <!-- Tabs -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="border-b border-gray-200">
          <nav class="flex">
            <button 
              onclick="changeTSETab('importar')"
              class="flex-1 px-6 py-4 text-center font-semibold transition-all ${state.tseTab === 'importar' || !state.tseTab ? 'text-green-600 border-b-2 border-green-600 bg-purple-50' : 'text-gray-600 hover:bg-gray-50'}"
            >
              <i class="fas fa-upload mr-2"></i>Importar Dados
            </button>
            <button 
              onclick="changeTSETab('candidatos')"
              class="flex-1 px-6 py-4 text-center font-semibold transition-all ${state.tseTab === 'candidatos' ? 'text-green-600 border-b-2 border-green-600 bg-purple-50' : 'text-gray-600 hover:bg-gray-50'}"
            >
              <i class="fas fa-users mr-2"></i>Candidatos
            </button>
            <button 
              onclick="changeTSETab('analise')"
              class="flex-1 px-6 py-4 text-center font-semibold transition-all ${state.tseTab === 'analise' ? 'text-green-600 border-b-2 border-green-600 bg-purple-50' : 'text-gray-600 hover:bg-gray-50'}"
            >
              <i class="fas fa-chart-pie mr-2"></i>Análise
            </button>
          </nav>
        </div>
        
        <div class="p-6">
          ${renderTSETabContent()}
        </div>
      </div>
    </div>
  `;
}

function renderTSETabContent() {
  const tab = state.tseTab || 'importar';
  
  switch (tab) {
    case 'importar': return renderTSEImportarTab();
    case 'candidatos': return renderTSECandidatosTab();
    case 'analise': return renderTSEAnaliseTab();
    default: return '';
  }
}

function renderTSEImportarTab() {
  return `
    <div class="space-y-6">
      <!-- Instruções -->
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <div class="flex items-start gap-3">
          <i class="fas fa-info-circle text-blue-500 text-xl mt-1"></i>
          <div>
            <h3 class="font-bold text-blue-900 mb-2">Como Importar Dados do TSE</h3>
            <ol class="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Baixe os arquivos CSV do TSE usando os links abaixo</li>
              <li>Extraia os arquivos da Bahia (terminam com _BA.csv)</li>
              <li>Faça upload dos arquivos usando os botões correspondentes</li>
              <li>Aguarde o processamento (pode levar alguns minutos)</li>
            </ol>
          </div>
        </div>
      </div>
      
      <!-- Links para Download TSE -->
      <div class="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-download text-green-600"></i>
          Download de Dados do TSE (Eleições 2022)
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Candidatos -->
          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h4 class="font-bold text-gray-800">📋 Candidatos</h4>
                <p class="text-xs text-gray-500 mt-1">Lista completa de candidatos</p>
              </div>
              <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">~4 MB</span>
            </div>
            <a 
              href="https://cdn.tse.jus.br/estatistica/sead/odsele/consulta_cand/consulta_cand_2022.zip"
              target="_blank"
              class="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg transition-all text-sm font-semibold"
            >
              <i class="fas fa-external-link-alt mr-2"></i>Baixar ZIP
            </a>
          </div>
          
          <!-- Votação -->
          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h4 class="font-bold text-gray-800">📊 Votação por Município</h4>
                <p class="text-xs text-gray-500 mt-1">Votos por candidato/município</p>
              </div>
              <span class="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">~200 MB</span>
            </div>
            <a 
              href="https://cdn.tse.jus.br/estatistica/sead/odsele/votacao_candidato_munzona/votacao_candidato_munzona_2022.zip"
              target="_blank"
              class="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg transition-all text-sm font-semibold"
            >
              <i class="fas fa-external-link-alt mr-2"></i>Baixar ZIP
            </a>
          </div>
          
          <!-- Perfil Eleitorado -->
          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h4 class="font-bold text-gray-800">👥 Perfil do Eleitorado</h4>
                <p class="text-xs text-gray-500 mt-1">Distribuição demográfica</p>
              </div>
              <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">~100 MB</span>
            </div>
            <a 
              href="https://cdn.tse.jus.br/estatistica/sead/odsele/perfil_eleitorado/perfil_eleitorado_2022.zip"
              target="_blank"
              class="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg transition-all text-sm font-semibold"
            >
              <i class="fas fa-external-link-alt mr-2"></i>Baixar ZIP
            </a>
          </div>
          
          <!-- Bens -->
          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h4 class="font-bold text-gray-800">💰 Bens de Candidatos</h4>
                <p class="text-xs text-gray-500 mt-1">Declaração de bens</p>
              </div>
              <span class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">~20 MB</span>
            </div>
            <a 
              href="https://cdn.tse.jus.br/estatistica/sead/odsele/bem_candidato/bem_candidato_2022.zip"
              target="_blank"
              class="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg transition-all text-sm font-semibold"
            >
              <i class="fas fa-external-link-alt mr-2"></i>Baixar ZIP
            </a>
          </div>
        </div>
        
        <div class="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
          <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
          <strong>Dica:</strong> Após baixar, extraia os arquivos e procure pelos que terminam com <code class="bg-gray-200 px-1 rounded">_BA.csv</code>
        </div>
      </div>
      
      <!-- Upload de Arquivos -->
      <div class="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-cloud-upload-alt text-green-600"></i>
          Upload de Arquivos CSV
        </h3>
        
        <div class="space-y-4">
          ${renderUploadCard('Candidatos', 'candidatos', 'consulta_cand_2022_BA.csv', 'Lista de todos os candidatos')}
          ${renderUploadCard('Votação', 'votacao', 'votacao_candidato_munzona_2022_BA.csv', 'Votos por município')}
          ${renderUploadCard('Perfil Eleitorado', 'perfil', 'perfil_eleitorado_2022_BA.csv', 'Distribuição demográfica')}
          ${renderUploadCard('Bens', 'bens', 'bem_candidato_2022_BA.csv', 'Declaração de bens')}
        </div>
      </div>
      
      <!-- Progresso -->
      <div id="upload-progress" class="hidden bg-white border-2 border-blue-500 rounded-xl p-6">
        <div class="flex items-center gap-4">
          <i class="fas fa-spinner fa-spin text-3xl text-blue-600"></i>
          <div class="flex-1">
            <h4 class="font-bold text-gray-800 mb-2">Processando arquivo...</h4>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div id="progress-bar" class="bg-blue-600 h-3 rounded-full transition-all" style="width: 0%"></div>
            </div>
            <p id="progress-text" class="text-sm text-gray-600 mt-2">Iniciando...</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderUploadCard(titulo, tipo, nomeArquivo, descricao) {
  return `
    <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
      <div class="flex items-center justify-between mb-3">
        <div>
          <h4 class="font-bold text-gray-800">${titulo}</h4>
          <p class="text-xs text-gray-500 mt-1">${descricao}</p>
          <p class="text-xs text-gray-400 mt-1">
            <i class="fas fa-file-csv mr-1"></i>${nomeArquivo}
          </p>
        </div>
        <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded" id="status-${tipo}">
          Aguardando
        </span>
      </div>
      
      <div class="flex gap-2">
        <input 
          type="file" 
          id="file-${tipo}" 
          accept=".csv"
          class="hidden"
          onchange="handleFileSelect('${tipo}')"
        />
        <label 
          for="file-${tipo}"
          class="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg transition-all cursor-pointer text-sm font-semibold"
        >
          <i class="fas fa-folder-open mr-2"></i>Selecionar Arquivo
        </label>
        <button 
          id="btn-upload-${tipo}"
          onclick="uploadTSEFile('${tipo}')"
          disabled
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
        >
          <i class="fas fa-upload mr-2"></i>Enviar
        </button>
      </div>
    </div>
  `;
}

function renderTSECandidatosTab() {
  const candidatos = state.data.tseCandidatos || [];
  
  if (candidatos.length === 0) {
    return `
      <div class="text-center py-12">
        <i class="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
        <p class="text-gray-500 text-lg mb-2">Nenhum candidato importado</p>
        <p class="text-gray-400 text-sm">Faça upload dos dados do TSE na aba "Importar Dados"</p>
      </div>
    `;
  }
  
  return `
    <div class="space-y-4">
      <div class="flex justify-between items-center mb-4">
        <p class="text-gray-600">${candidatos.length} candidatos encontrados</p>
        <input 
          type="text" 
          placeholder="Buscar candidato..."
          class="px-4 py-2 border border-gray-300 rounded-lg"
          onkeyup="filterTSECandidatos(this.value)"
        />
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="tse-candidatos-list">
        ${candidatos.slice(0, 50).map(c => `
          <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
            <div class="flex items-start gap-3 mb-3">
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-green-600 font-bold text-lg">
                ${c.numero_candidato}
              </div>
              <div class="flex-1">
                <h4 class="font-bold text-gray-800 text-sm">${c.nome_urna}</h4>
                <p class="text-xs text-gray-500">${c.sigla_partido} - ${c.nome_cargo}</p>
              </div>
            </div>
            <div class="text-xs text-gray-600 space-y-1">
              <p><i class="fas fa-map-marker-alt w-4"></i> ${c.municipio_nascimento || 'N/A'}</p>
              <p><i class="fas fa-briefcase w-4"></i> ${c.ocupacao || 'N/A'}</p>
              <p><i class="fas fa-check-circle w-4 ${c.situacao_eleicao === 'ELEITO' ? 'text-green-600' : 'text-gray-400'}"></i> ${c.situacao_eleicao}</p>
            </div>
          </div>
        `).join('')}
      </div>
      
      ${candidatos.length > 50 ? `
        <p class="text-center text-gray-500 text-sm mt-4">
          Mostrando 50 de ${candidatos.length} candidatos
        </p>
      ` : ''}
    </div>
  `;
}

function renderTSEAnaliseTab() {
  return `
    <div class="text-center py-12">
      <i class="fas fa-chart-pie text-6xl text-gray-300 mb-4"></i>
      <p class="text-gray-500 text-lg mb-2">Análise em Desenvolvimento</p>
      <p class="text-gray-400 text-sm">Em breve: Análise de cobertura, cruzamento com lideranças e relatórios</p>
    </div>
  `;
}

// ============= MÓDULO: GERENCIAR TSE =============

function renderGerenciarTSEModule() {
  return `
    <div>
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <i class="fas fa-database text-green-600"></i>
          Gerenciar Dados TSE
        </h1>
        <p class="text-gray-600">Importe e gerencie dados eleitorais por Estado</p>
      </div>
      
      <!-- Alert Info -->
      <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6 rounded-lg">
        <div class="flex items-start gap-3">
          <i class="fas fa-info-circle text-blue-500 text-2xl"></i>
          <div>
            <h3 class="font-bold text-blue-900 mb-2">Como funciona</h3>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• <strong>Modular:</strong> Carregue apenas dados do seu estado (BA, PE, SP, etc)</li>
              <li>• <strong>Flexível:</strong> Troque de estado a qualquer momento</li>
              <li>• <strong>Limpo:</strong> Remova dados antigos antes de importar novos</li>
              <li>• <strong>Rápido:</strong> Importação via script Python (2-5 minutos)</li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Estado Atual -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-map-marker-alt text-green-600"></i>
          Estado Atual Carregado
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-2 border-green-200">
            <p class="text-sm text-gray-600 mb-1">Estado</p>
            <p class="text-2xl font-bold text-green-700" id="estado-atual">BA - Bahia</p>
          </div>
          
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-2 border-blue-200">
            <p class="text-sm text-gray-600 mb-1">Ano</p>
            <p class="text-2xl font-bold text-blue-700" id="ano-atual">2022</p>
          </div>
          
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-2 border-purple-200">
            <p class="text-sm text-gray-600 mb-1">Registros</p>
            <p class="text-2xl font-bold text-green-700" id="total-registros">0</p>
          </div>
        </div>
        
        <button 
          onclick="limparDadosTSE()"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-lg"
        >
          <i class="fas fa-trash-alt"></i>
          Limpar Dados do Estado Atual
        </button>
      </div>
      
      <!-- Instruções de Importação -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-terminal text-green-600"></i>
          Como Importar Dados
        </h2>
        
        <div class="bg-gray-50 rounded-lg p-6 mb-4">
          <h3 class="font-bold text-gray-800 mb-3">📋 Passo a Passo</h3>
          
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
              <div>
                <p class="font-semibold text-gray-800">Baixar dados do TSE</p>
                <p class="text-sm text-gray-600">Acesse: <a href="https://dadosabertos.tse.jus.br/" target="_blank" class="text-blue-600 hover:underline">dadosabertos.tse.jus.br</a></p>
                <p class="text-sm text-gray-600">Baixe: <strong>Perfil do Eleitorado 2022</strong> → Arquivo da sua UF</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
              <div>
                <p class="font-semibold text-gray-800">Configurar ambiente</p>
                <div class="bg-gray-800 text-green-400 p-3 rounded mt-2 text-sm font-mono overflow-x-auto">
                  export CLOUDFLARE_ACCOUNT_ID="b32418e83b60a56ba30a2b4b3fea951e"<br>
                  export CLOUDFLARE_API_TOKEN="seu-token-aqui"
                </div>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
              <div>
                <p class="font-semibold text-gray-800">Executar importação</p>
                <div class="bg-gray-800 text-green-400 p-3 rounded mt-2 text-sm font-mono overflow-x-auto">
                  cd /home/user/webapp/scripts<br>
                  python3 importar_tse.py --tipo perfil --uf BA --ano 2022 \\<br>
                  &nbsp;&nbsp;--arquivo /caminho/perfil_eleitorado_2022_BA.csv --stats
                </div>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold flex-shrink-0">✓</div>
              <div>
                <p class="font-semibold text-gray-800">Pronto!</p>
                <p class="text-sm text-gray-600">Os dados estarão disponíveis em <strong>Relatórios</strong></p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Links Úteis -->
        <div class="border-t pt-4">
          <h3 class="font-bold text-gray-800 mb-3">📚 Documentação</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a 
              href="/scripts/README_IMPORTACAO.md" 
              target="_blank"
              class="flex items-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <i class="fas fa-book text-blue-600"></i>
              <span class="text-blue-800 font-semibold">Guia Completo de Importação</span>
            </a>
            
            <a 
              href="https://dadosabertos.tse.jus.br/" 
              target="_blank"
              class="flex items-center gap-2 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <i class="fas fa-external-link-alt text-green-600"></i>
              <span class="text-purple-800 font-semibold">Portal de Dados TSE</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============= MÓDULO: ANÁLISE ELEITORAL =============

function renderAnaliseEleitoralModule() {
  const dados = state.data.analiseEleitoral || null;
  
  return `
    <div>
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <i class="fas fa-chart-pie text-green-600"></i>
          Análise Eleitoral - Mapeamento do Estado
        </h1>
        <p class="text-gray-600">Perfil completo do eleitorado com filtros e visualizações</p>
      </div>
      
      <!-- Filtros -->
      <div class="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div class="flex items-center gap-4 flex-wrap">
          <div>
            <label class="text-sm font-semibold text-gray-700 mb-1 block">Estado (UF)</label>
            <select id="filtro-uf" onchange="aplicarFiltrosAnalise()" class="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 outline-none">
              <option value="BA">BA - Bahia</option>
              <option value="PE">PE - Pernambuco</option>
              <option value="SP">SP - São Paulo</option>
            </select>
          </div>
          
          <div>
            <label class="text-sm font-semibold text-gray-700 mb-1 block">Ano</label>
            <select id="filtro-ano" onchange="aplicarFiltrosAnalise()" class="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 outline-none">
              <option value="2022">2022</option>
              <option value="2020">2020</option>
              <option value="2018">2018</option>
            </select>
          </div>
          
          <button 
            onclick="carregarAnaliseEleitoral()"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 mt-6"
          >
            <i class="fas fa-sync-alt"></i>
            Atualizar Dados
          </button>
        </div>
      </div>
      
      ${!dados ? `
        <div class="text-center py-12 bg-white rounded-xl shadow-lg">
          <i class="fas fa-chart-line text-6xl text-gray-300 mb-4"></i>
          <p class="text-gray-600 mb-4">Nenhum dado carregado</p>
          <button 
            onclick="carregarAnaliseEleitoral()"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Carregar Análise
          </button>
        </div>
      ` : `
        <!-- Cards de Resumo -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <i class="fas fa-users text-3xl opacity-80"></i>
            </div>
            <p class="text-3xl font-bold">${(dados.resumo?.total_eleitores || 0).toLocaleString('pt-BR')}</p>
            <p class="text-sm opacity-90">Total de Eleitores</p>
          </div>
          
          <div class="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <i class="fas fa-city text-3xl opacity-80"></i>
            </div>
            <p class="text-3xl font-bold">${dados.resumo?.total_municipios || 0}</p>
            <p class="text-sm opacity-90">Municípios</p>
          </div>
          
          <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <i class="fas fa-map-marker-alt text-3xl opacity-80"></i>
            </div>
            <p class="text-3xl font-bold">${dados.resumo?.total_zonas || 0}</p>
            <p class="text-sm opacity-90">Zonas Eleitorais</p>
          </div>
          
          <div class="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
            <div class="flex items-center justify-between mb-2">
              <i class="fas fa-trophy text-3xl opacity-80"></i>
            </div>
            <p class="text-lg font-bold truncate">${dados.resumo?.maior_municipio?.nome || '-'}</p>
            <p class="text-sm opacity-90">Maior Município</p>
          </div>
        </div>
        
        <!-- Tabs de Análise -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div class="flex border-b">
            <button 
              onclick="changeAnaliseTab('municipios')"
              class="${state.analiseTab === 'municipios' ? 'bg-purple-50 text-green-700 border-b-2 border-green-600' : 'text-gray-600 hover:bg-gray-50'} px-6 py-3 font-semibold transition-colors"
            >
              <i class="fas fa-city mr-2"></i>Municípios
            </button>
            <button 
              onclick="changeAnaliseTab('demografico')"
              class="${state.analiseTab === 'demografico' ? 'bg-purple-50 text-green-700 border-b-2 border-green-600' : 'text-gray-600 hover:bg-gray-50'} px-6 py-3 font-semibold transition-colors"
            >
              <i class="fas fa-users mr-2"></i>Perfil Demográfico
            </button>
            <button 
              onclick="changeAnaliseTab('zonas')"
              class="${state.analiseTab === 'zonas' ? 'bg-purple-50 text-green-700 border-b-2 border-green-600' : 'text-gray-600 hover:bg-gray-50'} px-6 py-3 font-semibold transition-colors"
            >
              <i class="fas fa-map-marked-alt mr-2"></i>Zonas Eleitorais
            </button>
          </div>
          
          <div class="p-6">
            ${renderAnaliseTabContent(dados)}
          </div>
        </div>
      `}
    </div>
  `;
}

function renderAnaliseTabContent(dados) {
  switch(state.analiseTab) {
    case 'municipios':
      return renderAnaliseMunicipios(dados);
    case 'demografico':
      return renderAnaliseDemografico(dados);
    case 'zonas':
      return renderAnaliseZonas(dados);
    default:
      return renderAnaliseMunicipios(dados);
  }
}

function renderAnaliseMunicipios(dados) {
  const municipios = dados.municipios?.municipios || [];
  
  return `
    <div>
      <h3 class="text-xl font-bold text-gray-800 mb-4">Ranking de Municípios por Total de Eleitores</h3>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">#</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Município</th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Eleitores</th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Zonas</th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">% do Total</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Participação</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            ${municipios.slice(0, 20).map((m, idx) => `
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-4 py-3 font-bold text-gray-600">${idx + 1}º</td>
                <td class="px-4 py-3 font-semibold text-gray-800">${m.municipio}</td>
                <td class="px-4 py-3 text-right font-semibold text-blue-600">${(m.total_eleitores || 0).toLocaleString('pt-BR')}</td>
                <td class="px-4 py-3 text-right text-gray-600">${m.zonas || 0}</td>
                <td class="px-4 py-3 text-right font-semibold text-green-600">${m.percentual}%</td>
                <td class="px-4 py-3">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-600 h-2 rounded-full" style="width: ${m.percentual}%"></div>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      ${municipios.length > 20 ? `
        <div class="text-center mt-4">
          <p class="text-gray-600 text-sm">Mostrando top 20 de ${municipios.length} municípios</p>
        </div>
      ` : ''}
    </div>
  `;
}

function renderAnaliseDemografico(dados) {
  return `
    <div>
      <h3 class="text-xl font-bold text-gray-800 mb-6">Perfil Demográfico do Eleitorado</h3>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Gênero -->
        <div class="bg-gray-50 rounded-lg p-6">
          <h4 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-venus-mars text-blue-600"></i>
            Por Gênero
          </h4>
          <div id="chart-genero" class="h-64"></div>
          <div class="mt-4 space-y-2">
            ${(dados.genero?.distribuicao || []).map(g => `
              <div class="flex justify-between items-center">
                <span class="text-sm font-semibold text-gray-700">${g.genero}</span>
                <span class="text-sm text-gray-600">${(g.total || 0).toLocaleString('pt-BR')} (${g.percentual}%)</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Faixa Etária -->
        <div class="bg-gray-50 rounded-lg p-6">
          <h4 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-birthday-cake text-green-600"></i>
            Por Faixa Etária
          </h4>
          <div id="chart-idade" class="h-64"></div>
          <div class="mt-4 space-y-1 max-h-48 overflow-y-auto">
            ${(dados.idade?.distribuicao || []).map(i => `
              <div class="flex justify-between items-center text-xs">
                <span class="font-semibold text-gray-700">${i.faixa_etaria}</span>
                <span class="text-gray-600">${i.percentual}%</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Escolaridade -->
        <div class="bg-gray-50 rounded-lg p-6">
          <h4 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-graduation-cap text-green-600"></i>
            Por Escolaridade
          </h4>
          <div id="chart-escolaridade" class="h-64"></div>
          <div class="mt-4 space-y-1 max-h-48 overflow-y-auto">
            ${(dados.escolaridade?.distribuicao || []).map(e => `
              <div class="flex justify-between items-center text-xs">
                <span class="font-semibold text-gray-700">${e.escolaridade}</span>
                <span class="text-gray-600">${e.percentual}%</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAnaliseZonas(dados) {
  const zonas = dados.zonas?.zonas || [];
  
  return `
    <div>
      <h3 class="text-xl font-bold text-gray-800 mb-4">Distribuição por Zona Eleitoral</h3>
      
      <div class="mb-4">
        <label class="text-sm font-semibold text-gray-700 mb-2 block">Filtrar por Município</label>
        <select id="filtro-municipio-zona" onchange="carregarZonasEleitorais()" class="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 outline-none">
          <option value="">Todos os Municípios</option>
          ${(dados.municipios?.municipios || []).slice(0, 50).map(m => `
            <option value="${m.municipio}">${m.municipio}</option>
          `).join('')}
        </select>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Zona</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Município</th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Eleitores</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            ${zonas.map(z => `
              <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-4 py-3 font-semibold text-green-600">${z.zona_eleitoral}ª Zona</td>
                <td class="px-4 py-3 text-gray-800">${z.municipio}</td>
                <td class="px-4 py-3 text-right font-semibold text-blue-600">${(z.total_eleitores || 0).toLocaleString('pt-BR')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ============= MÓDULO: DADOS ELEITORAIS =============

function renderDadosEleitoraisModule() {
  return `
    <div>
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          <i class="fas fa-chart-bar mr-3"></i>Dados Eleitorais
        </h1>
        <button 
          onclick="abrirModal('eleitor')"
          class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all"
        >
          <i class="fas fa-plus mr-2"></i>Adicionar Dados
        </button>
      </div>
      
      <div id="dados-list" class="grid grid-cols-1 gap-4">
        ${state.data.dadosEleitorais.length === 0 ? 
          '<div class="bg-white rounded-xl shadow-lg p-8 text-center"><p class="text-gray-500">Nenhum dado eleitoral cadastrado</p></div>' :
          state.data.dadosEleitorais.map(renderDadosEleitoraisCard).join('')
        }
      </div>
    </div>
  `;
}

function renderDadosEleitoraisCard(dado) {
  return `
    <div class="card bg-white rounded-xl shadow-lg p-6">
      <div class="flex flex-col md:flex-row justify-between">
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-gray-800 mb-3">${dado.municipio || 'Sem município'}</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div><span class="text-gray-600">Território:</span> <span class="font-medium">${dado.territorio || '-'}</span></div>
            <div><span class="text-gray-600">Colégio:</span> <span class="font-medium">${dado.colegio_eleitoral || '-'}</span></div>
            <div><span class="text-gray-600">Gênero:</span> <span class="font-medium">${dado.genero || '-'}</span></div>
            <div><span class="text-gray-600">Base:</span> <span class="font-medium">${dado.base_eleitoral || '-'}</span></div>
            <div class="md:col-span-2">
              <span class="text-gray-600">Total de Eleitores:</span> 
              <span class="font-bold text-lg text-green-600">${dado.total_eleitores || 0}</span>
            </div>
          </div>
          ${dado.observacoes ? `<p class="mt-3 text-sm text-gray-600"><i class="fas fa-comment mr-2"></i>${dado.observacoes}</p>` : ''}
        </div>
        <div class="flex md:flex-col gap-2 mt-4 md:mt-0 md:ml-4">
          <button 
            onclick='abrirModal("eleitor", ${JSON.stringify(dado)})'
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            title="Editar"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button 
            onclick="deleteDadosEleitorais(${dado.id})"
            class="bg-red-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            title="Deletar"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ============= MÓDULO: LIDERANÇAS =============

function renderLiderancasModule() {
  // Se está no modo de cadastro, renderizar formulário
  if (state.liderancaFormMode) {
    return renderLiderancaFormPage();
  }
  
  return `
    <div>
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          <i class="fas fa-users mr-3"></i>Lideranças
        </h1>
        <button 
          onclick="openLiderancaForm()"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <i class="fas fa-plus mr-2"></i>Nova Liderança
        </button>
      </div>
      
      <div id="liderancas-list" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${state.data.liderancas.length === 0 ? 
          '<div class="bg-white rounded-xl shadow-lg p-8 text-center md:col-span-2"><p class="text-gray-500">Nenhuma liderança cadastrada</p></div>' :
          state.data.liderancas.map(renderLiderancaCard).join('')
        }
      </div>
    </div>
  `;
}

function renderLiderancaCard(lideranca) {
  return `
    <div class="card bg-white rounded-xl shadow-lg p-6">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="text-xl font-semibold text-gray-800">${lideranca.nome}</h3>
          <p class="text-sm text-gray-600">${lideranca.cpf || 'CPF não informado'}</p>
        </div>
        <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">Ativo</span>
      </div>
      
      <div class="space-y-2 text-sm">
        ${lideranca.celular ? `<p><i class="fas fa-mobile-alt w-5 text-gray-500"></i> ${lideranca.celular}</p>` : ''}
        ${lideranca.email ? `<p><i class="fas fa-envelope w-5 text-gray-500"></i> ${lideranca.email}</p>` : ''}
        ${lideranca.cidade && lideranca.estado ? `<p><i class="fas fa-map-marker-alt w-5 text-gray-500"></i> ${lideranca.cidade} - ${lideranca.estado}</p>` : ''}
        ${lideranca.zona_eleitoral ? `<p><i class="fas fa-vote-yea w-5 text-gray-500"></i> Zona ${lideranca.zona_eleitoral}</p>` : ''}
        ${lideranca.influencia_votos ? `<p><i class="fas fa-chart-line w-5 text-gray-500"></i> Influência: ${lideranca.influencia_votos} votos</p>` : ''}
      </div>
      
      <div class="mt-4 pt-4 border-t border-gray-200 flex gap-2">
        <button 
          onclick="editarLideranca(${lideranca.id})"
          class="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <i class="fas fa-edit mr-2"></i>Editar
        </button>
        <button 
          onclick="deleteLideranca(${lideranca.id})"
          class="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <i class="fas fa-trash mr-2"></i>Deletar
        </button>
      </div>
    </div>
  `;
}

function renderLiderancaFormPage() {
  return `
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <button 
          onclick="closeLiderancaForm()"
          class="text-gray-600 hover:text-gray-800 mb-4 flex items-center gap-2 transition-colors"
        >
          <i class="fas fa-arrow-left"></i>
          <span>Voltar para Lideranças</span>
        </button>
        
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          <i class="fas fa-user-plus mr-3 text-green-600"></i>Cadastrar Nova Liderança
        </h1>
        <p class="text-gray-600">Preencha as informações abaixo. Os campos com * são obrigatórios.</p>
      </div>
      
      <!-- Informações -->
      <div class="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-xl mb-6">
        <div class="flex items-start gap-3">
          <i class="fas fa-info-circle text-blue-500 text-2xl mt-0.5"></i>
          <div>
            <p class="text-base text-blue-900 font-semibold mb-2">
              📱 Como funciona este cadastro:
            </p>
            <ul class="space-y-2 text-sm text-blue-800">
              <li class="flex items-start gap-2">
                <i class="fas fa-check text-blue-600 mt-0.5"></i>
                <span>Você pode preencher aos poucos e <strong>voltar depois</strong></span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fas fa-check text-blue-600 mt-0.5"></i>
                <span>Seus dados são salvos <strong>automaticamente</strong> enquanto você digita</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fas fa-check text-blue-600 mt-0.5"></i>
                <span>Se tiver dúvida em algum campo, pode <strong>deixar em branco</strong> (exceto os que têm *)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <form id="lideranca-form" class="space-y-6">
        <!-- Seção: Dados Pessoais -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-user text-green-600"></i>
            Seus Dados
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Nome -->
            <div class="md:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-signature text-green-600 mr-2"></i>Nome Completo *
              </label>
              <input 
                type="text" 
                id="form-nome" 
                required
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none"
                placeholder="Digite seu nome completo"
                onchange="autoSaveLideranca()"
              />
              <p class="text-sm text-gray-600 mt-2 flex items-center gap-2">
                <i class="fas fa-lightbulb text-yellow-500"></i>
                <span>Exemplo: <strong>João da Silva Santos</strong></span>
              </p>
            </div>
            
            <!-- CPF -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-id-card text-green-600 mr-2"></i>CPF *
              </label>
              <input 
                type="text" 
                id="form-cpf" 
                required
                maxlength="14"
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none"
                placeholder="000.000.000-00"
                onchange="autoSaveLideranca()"
              />
            </div>
            
            <!-- RG -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-id-badge text-gray-400 mr-2"></i>RG (opcional)
              </label>
              <input 
                type="text" 
                id="form-rg"
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none"
                placeholder="00.000.000-0"
                onchange="autoSaveLideranca()"
              />
            </div>
            
            <!-- Data Nascimento -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-calendar text-green-600 mr-2"></i>Data de Nascimento *
              </label>
              <input 
                type="date" 
                id="form-nascimento" 
                required
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none"
                onchange="autoSaveLideranca()"
              />
            </div>
            
            <!-- Gênero -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-venus-mars text-green-600 mr-2"></i>Gênero *
              </label>
              <select 
                id="form-genero" 
                required
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none"
                onchange="autoSaveLideranca()"
              >
                <option value="">Selecione...</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Seção: Contato -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-phone text-green-600"></i>
            Como te Encontrar
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Celular -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-mobile-alt text-green-600 mr-2"></i>Celular com WhatsApp *
              </label>
              <input 
                type="tel" 
                id="form-celular" 
                required
                maxlength="15"
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none"
                placeholder="(00) 00000-0000"
                onchange="autoSaveLideranca()"
              />
              <p class="text-sm text-green-700 mt-2 flex items-center gap-2">
                <i class="fas fa-whatsapp"></i>
                <span>Vamos entrar em contato por <strong>WhatsApp</strong></span>
              </p>
            </div>
            
            <!-- Telefone Fixo -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-phone text-gray-400 mr-2"></i>Outro Telefone (opcional)
              </label>
              <input 
                type="tel" 
                id="form-telefone"
                maxlength="14"
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none"
                placeholder="(00) 0000-0000"
                onchange="autoSaveLideranca()"
              />
            </div>
            
            <!-- Email -->
            <div class="md:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-envelope text-gray-400 mr-2"></i>Email (opcional)
              </label>
              <input 
                type="email" 
                id="form-email"
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none"
                placeholder="seuemail@exemplo.com"
                onchange="autoSaveLideranca()"
              />
            </div>
          </div>
        </div>
        
        <!-- Seção: Endereço -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-home text-blue-600"></i>
            Onde Você Mora
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- CEP -->
            <div class="md:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-map-pin text-blue-600 mr-2"></i>CEP *
              </label>
              <input 
                type="text" 
                id="form-cep" 
                required
                maxlength="9"
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                placeholder="00000-000"
                onblur="buscarCEP()"
                onchange="autoSaveLideranca()"
              />
              <p class="text-sm text-blue-700 mt-2 flex items-center gap-2 font-semibold">
                <i class="fas fa-magic"></i>
                <span>Digite o CEP e a rua aparece sozinha! ✨</span>
              </p>
            </div>
            
            <!-- Logradouro -->
            <div class="md:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-road text-blue-600 mr-2"></i>Rua *
              </label>
              <input 
                type="text" 
                id="form-logradouro" 
                required
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                placeholder="Nome da rua"
                onchange="autoSaveLideranca()"
              />
            </div>
            
            <!-- Número -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-hashtag text-blue-600 mr-2"></i>Número *
              </label>
              <input 
                type="text" 
                id="form-numero" 
                required
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                placeholder="123"
                onchange="autoSaveLideranca()"
              />
            </div>
            
            <!-- Complemento -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-building text-gray-400 mr-2"></i>Complemento (opcional)
              </label>
              <input 
                type="text" 
                id="form-complemento"
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                placeholder="Apto, bloco, etc"
                onchange="autoSaveLideranca()"
              />
            </div>
            
            <!-- Bairro -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-map-marked-alt text-blue-600 mr-2"></i>Bairro *
              </label>
              <input 
                type="text" 
                id="form-bairro" 
                required
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                placeholder="Nome do bairro"
                onchange="autoSaveLideranca()"
              />
            </div>
            
            <!-- Cidade -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-city text-blue-600 mr-2"></i>Cidade *
              </label>
              <input 
                type="text" 
                id="form-cidade" 
                required
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                placeholder="Nome da cidade"
                onchange="autoSaveLideranca()"
              />
            </div>
            
            <!-- Estado -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-map text-blue-600 mr-2"></i>Estado *
              </label>
              <select 
                id="form-estado" 
                required
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                onchange="autoSaveLideranca()"
              >
                <option value="">Selecione...</option>
                <option value="BA" selected>Bahia</option>
                <option value="AL">Alagoas</option>
                <option value="CE">Ceará</option>
                <option value="MA">Maranhão</option>
                <option value="PB">Paraíba</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="SE">Sergipe</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Seção: Dados Eleitorais -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-vote-yea text-orange-600"></i>
            Seus Dados Eleitorais (opcional)
          </h2>
          
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-4">
            <p class="text-base text-yellow-900 font-semibold mb-2">
              <i class="fas fa-info-circle mr-2"></i>
              Não obrigatório!
            </p>
            <p class="text-sm text-yellow-800">
              Se você não souber esses dados agora, pode <strong>deixar em branco</strong> e preencher depois.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Título -->
            <div class="md:col-span-3">
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-id-card-alt text-orange-600 mr-2"></i>Título de Eleitor
              </label>
              <input 
                type="text" 
                id="form-titulo"
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
                placeholder="0000 0000 0000"
                onchange="autoSaveLideranca()"
              />
            </div>
            
            <!-- Zona -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-map-marker-alt text-orange-600 mr-2"></i>Zona (onde vota)
              </label>
              <input 
                type="number" 
                id="form-zona"
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
                placeholder="Ex: 10"
                onchange="autoSaveLideranca()"
              />
            </div>
            
            <!-- Seção -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">
                <i class="fas fa-list-ol text-orange-600 mr-2"></i>Seção
              </label>
              <input 
                type="number" 
                id="form-secao"
                class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none"
                placeholder="Ex: 123"
                onchange="autoSaveLideranca()"
              />
            </div>
          </div>
        </div>
        
        <!-- Seção: Influência -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i class="fas fa-chart-line text-green-600"></i>
            Sua Influência
          </h2>
          
          <div class="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-lg mb-4">
            <p class="text-base text-purple-900 font-semibold mb-2">
              <i class="fas fa-lightbulb mr-2"></i>
              Quantas pessoas ouvem você?
            </p>
            <p class="text-sm text-purple-800 leading-relaxed">
              Pense nas pessoas que <strong>confiam em você</strong>:<br>
              • Sua família (pais, filhos, irmãos, primos...)<br>
              • Amigos e vizinhos<br>
              • Pessoas do trabalho, igreja, clube...<br>
              • Conhecidos das redes sociais
            </p>
          </div>
          
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-3">
              <i class="fas fa-users text-green-600 mr-2"></i>Quantidade de pessoas que você pode influenciar
            </label>
            <input 
              type="range" 
              id="form-influencia" 
              min="10" 
              max="500" 
              step="10"
              value="50"
              class="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              oninput="updateInfluenciaValue(this.value)"
              onchange="autoSaveLideranca()"
            />
            <div class="flex justify-between text-sm text-gray-600 mt-2">
              <span>10</span>
              <span id="influencia-value" class="font-bold text-2xl text-green-600">50</span>
              <span>500+</span>
            </div>
            <p class="text-center text-sm text-gray-500 mt-2">
              Arraste para ajustar o número
            </p>
          </div>
          
          <!-- Quantidade de Eleitores -->
          <div class="mt-6">
            <label class="block text-sm font-bold text-gray-700 mb-3">
              <i class="fas fa-vote-yea text-blue-600 mr-2"></i>Quantidade de Eleitores (opcional)
            </label>
            <p class="text-sm text-gray-600 mb-3">
              Quantos eleitores você representa ou mobiliza em sua região?
            </p>
            <input 
              type="number" 
              id="form-qtd-eleitores" 
              min="0" 
              step="100"
              placeholder="Ex: 2000"
              class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
              onchange="autoSaveLideranca()"
            />
            <p class="text-sm text-blue-600 mt-2 flex items-center gap-2">
              <i class="fas fa-info-circle"></i>
              <span>Informe a quantidade total de eleitores (sem limite)</span>
            </p>
          </div>
          
          <!-- Observações -->
          <div class="mt-4">
            <label class="block text-sm font-bold text-gray-700 mb-2">
              <i class="fas fa-comment text-gray-400 mr-2"></i>Observações (opcional)
            </label>
            <textarea 
              id="form-observacoes"
              rows="3"
              class="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 transition-all outline-none resize-none"
              placeholder="Algo mais que você queira nos contar..."
              onchange="autoSaveLideranca()"
            ></textarea>
          </div>
        </div>
        
        <!-- Indicador de salvamento -->
        <div id="save-indicator" class="hidden bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
          <p class="text-sm text-green-800 flex items-center gap-2">
            <i class="fas fa-check-circle"></i>
            <span id="save-text">Salvo automaticamente há poucos segundos</span>
          </p>
        </div>
        
        <!-- Botões de ação -->
        <div class="flex flex-col md:flex-row gap-4 pt-4">
          <button 
            type="button"
            onclick="closeLiderancaForm()"
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 rounded-xl font-bold transition-all text-lg"
          >
            <i class="fas fa-times mr-2"></i>Cancelar
          </button>
          
          <button 
            type="submit"
            class="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
          >
            <i class="fas fa-save mr-2"></i>Salvar Cadastro
          </button>
        </div>
      </form>
    </div>
  `;
}

// ============= MÓDULO: COORDENADORES =============

function renderCoordenadoresModule() {
  const tiposFiltrados = {
    todos: state.data.coordenadores,
    regional: state.data.coordenadores.filter(c => c.tipo === 'regional'),
    territorial: state.data.coordenadores.filter(c => c.tipo === 'territorial'),
    municipal: state.data.coordenadores.filter(c => c.tipo === 'municipal')
  };
  
  return `
    <div>
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          <i class="fas fa-user-tie mr-3"></i>Coordenadores
        </h1>
        <button 
          onclick="abrirModal('coordenador')"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all"
        >
          <i class="fas fa-plus mr-2"></i>Novo Coordenador
        </button>
      </div>
      
      <!-- Filtros por Tipo -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button onclick="filterCoord('todos')" class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium">
          Todos (${tiposFiltrados.todos.length})
        </button>
        <button onclick="filterCoord('regional')" class="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-sm font-medium">
          Regional (${tiposFiltrados.regional.length})
        </button>
        <button onclick="filterCoord('territorial')" class="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg text-sm font-medium">
          Territorial (${tiposFiltrados.territorial.length})
        </button>
        <button onclick="filterCoord('municipal')" class="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg text-sm font-medium">
          Municipal (${tiposFiltrados.municipal.length})
        </button>
      </div>
      
      <div id="coordenadores-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${state.data.coordenadores.length === 0 ? 
          '<div class="bg-white rounded-xl shadow-lg p-8 text-center lg:col-span-3"><p class="text-gray-500">Nenhum coordenador cadastrado</p></div>' :
          state.data.coordenadores.map(renderCoordenadorCard).join('')
        }
      </div>
    </div>
  `;
}

function renderCoordenadorCard(coord) {
  const tipoColors = {
    regional: 'bg-blue-100 text-blue-800',
    territorial: 'bg-green-100 text-green-800',
    municipal: 'bg-purple-100 text-purple-800'
  };
  
  return `
    <div class="card bg-white rounded-xl shadow-lg p-6" data-tipo="${coord.tipo}">
      <div class="flex items-start justify-between mb-4">
        <div>
          <span class="${tipoColors[coord.tipo] || 'bg-gray-100 text-gray-800'} px-3 py-1 rounded-full text-xs font-semibold uppercase">
            ${coord.tipo}
          </span>
          <h3 class="text-lg font-semibold text-gray-800 mt-2">${coord.nome}</h3>
        </div>
      </div>
      
      <div class="space-y-2 text-sm">
        ${coord.municipio ? `<p><i class="fas fa-map-marker-alt w-5 text-gray-500"></i> ${coord.municipio}</p>` : ''}
        ${coord.celular ? `<p><i class="fas fa-mobile-alt w-5 text-gray-500"></i> ${coord.celular}</p>` : ''}
        ${coord.email ? `<p><i class="fas fa-envelope w-5 text-gray-500"></i> ${coord.email}</p>` : ''}
        <p><i class="fas fa-users w-5 text-gray-500"></i> ${coord.liderancas_vinculadas || 0} lideranças</p>
      </div>
      
      <div class="mt-4 pt-4 border-t border-gray-200 flex gap-2">
        <button 
          onclick='abrirModal("coordenador", ${JSON.stringify(coord)})'
          class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <i class="fas fa-edit mr-2"></i>Editar
        </button>
        <button 
          onclick="deleteCoordenador(${coord.id})"
          class="flex-1 bg-red-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <i class="fas fa-trash mr-2"></i>Deletar
        </button>
      </div>
    </div>
  `;
}

// ============= MÓDULO: ELEITORES =============

function renderEleitoresModule() {
  const eleitores = state.data.eleitores || [];
  const liderancas = state.data.liderancas || [];
  const coordenadores = state.data.coordenadores || [];
  
  // Filtros
  const filtroLideranca = state.filtroEleitorLideranca || 'todos';
  const filtroStatus = state.filtroEleitorStatus || 'todos';
  const filtroMunicipio = state.filtroEleitorMunicipio || 'todos';
  
  // Aplicar filtros
  let eleitoresFiltrados = [...eleitores];
  
  if (filtroLideranca !== 'todos') {
    eleitoresFiltrados = eleitoresFiltrados.filter(e => e.lideranca_id == filtroLideranca);
  }
  
  if (filtroStatus !== 'todos') {
    eleitoresFiltrados = eleitoresFiltrados.filter(e => e.status_apoio === filtroStatus);
  }
  
  if (filtroMunicipio !== 'todos') {
    eleitoresFiltrados = eleitoresFiltrados.filter(e => e.municipio === filtroMunicipio);
  }
  
  // Estatísticas
  const totalEleitores = eleitores.length;
  const totalConfirmados = eleitores.filter(e => e.confirmado === 1).length;
  const totalApoiadores = eleitores.filter(e => e.status_apoio === 'apoiador').length;
  const totalMilitantes = eleitores.filter(e => e.status_apoio === 'militante').length;
  
  // Municípios únicos
  const municipios = [...new Set(eleitores.map(e => e.municipio))].sort();
  
  return `
    <div>
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            <i class="fas fa-users mr-3 text-blue-600"></i>Eleitores
          </h1>
          <p class="text-gray-600">Gestão da base de apoio captada pelas lideranças</p>
        </div>
        <button 
          onclick="abrirModalEleitor()"
          class="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
        >
          <i class="fas fa-plus mr-2"></i>Cadastrar Eleitor
        </button>
      </div>
      
      <!-- Estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90 mb-1">Total Eleitores</p>
              <p class="text-3xl font-bold">${totalEleitores}</p>
            </div>
            <i class="fas fa-users text-4xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90 mb-1">Confirmados</p>
              <p class="text-3xl font-bold">${totalConfirmados}</p>
              <p class="text-xs opacity-75">${totalEleitores > 0 ? Math.round(totalConfirmados/totalEleitores*100) : 0}% do total</p>
            </div>
            <i class="fas fa-check-circle text-4xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90 mb-1">Apoiadores</p>
              <p class="text-3xl font-bold">${totalApoiadores}</p>
            </div>
            <i class="fas fa-handshake text-4xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90 mb-1">Militantes</p>
              <p class="text-3xl font-bold">${totalMilitantes}</p>
            </div>
            <i class="fas fa-star text-4xl opacity-50"></i>
          </div>
        </div>
      </div>
      
      <!-- Filtros -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 class="font-semibold text-gray-800 mb-4">
          <i class="fas fa-filter mr-2"></i>Filtros
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Liderança</label>
            <select 
              id="filtro-eleitor-lideranca"
              onchange="aplicarFiltrosEleitores()"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todas as lideranças</option>
              ${liderancas.map(l => `
                <option value="${l.id}" ${filtroLideranca == l.id ? 'selected' : ''}>
                  ${l.nome}
                </option>
              `).join('')}
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status de Apoio</label>
            <select 
              id="filtro-eleitor-status"
              onchange="aplicarFiltrosEleitores()"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos os status</option>
              <option value="simpatizante" ${filtroStatus === 'simpatizante' ? 'selected' : ''}>Simpatizante</option>
              <option value="apoiador" ${filtroStatus === 'apoiador' ? 'selected' : ''}>Apoiador</option>
              <option value="militante" ${filtroStatus === 'militante' ? 'selected' : ''}>Militante</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Município</label>
            <select 
              id="filtro-eleitor-municipio"
              onchange="aplicarFiltrosEleitores()"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos os municípios</option>
              ${municipios.map(m => `
                <option value="${m}" ${filtroMunicipio === m ? 'selected' : ''}>
                  ${m}
                </option>
              `).join('')}
            </select>
          </div>
        </div>
        
        ${(filtroLideranca !== 'todos' || filtroStatus !== 'todos' || filtroMunicipio !== 'todos') ? `
          <div class="mt-4">
            <button 
              onclick="limparFiltrosEleitores()"
              class="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              <i class="fas fa-times mr-1"></i>Limpar filtros
            </button>
          </div>
        ` : ''}
      </div>
      
      <!-- Lista de Eleitores -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-gray-800">
              <i class="fas fa-list mr-2"></i>
              ${eleitoresFiltrados.length} eleitor${eleitoresFiltrados.length !== 1 ? 'es' : ''} encontrado${eleitoresFiltrados.length !== 1 ? 's' : ''}
            </h3>
          </div>
        </div>
        
        ${eleitoresFiltrados.length === 0 ? `
          <div class="p-12 text-center">
            <i class="fas fa-users text-6xl text-gray-300 mb-4"></i>
            <p class="text-gray-600 text-lg">Nenhum eleitor encontrado</p>
            <p class="text-gray-500 text-sm mt-2">
              ${totalEleitores === 0 ? 'Cadastre o primeiro eleitor clicando no botão acima' : 'Ajuste os filtros ou limpe-os para ver mais resultados'}
            </p>
          </div>
        ` : `
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nome</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Liderança</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Município</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Telefone</th>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Confirmado</th>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                ${eleitoresFiltrados.map(eleitor => `
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4">
                      <div>
                        <p class="font-medium text-gray-900">${eleitor.nome}</p>
                        ${eleitor.email ? `<p class="text-sm text-gray-500">${eleitor.email}</p>` : ''}
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <p class="text-sm text-gray-900">${eleitor.lideranca_nome || 'N/A'}</p>
                      ${eleitor.coordenador_nome ? `<p class="text-xs text-gray-500">Coord: ${eleitor.coordenador_nome}</p>` : ''}
                    </td>
                    <td class="px-6 py-4">
                      <p class="text-sm text-gray-900">${eleitor.municipio}</p>
                      ${eleitor.bairro ? `<p class="text-xs text-gray-500">${eleitor.bairro}</p>` : ''}
                    </td>
                    <td class="px-6 py-4">
                      <p class="text-sm text-gray-900">${eleitor.telefone || 'N/A'}</p>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full
                        ${eleitor.status_apoio === 'militante' ? 'bg-orange-100 text-orange-800' : 
                          eleitor.status_apoio === 'apoiador' ? 'bg-purple-100 text-purple-800' : 
                          'bg-blue-100 text-blue-800'}">
                        ${eleitor.status_apoio === 'militante' ? '⭐ Militante' : 
                          eleitor.status_apoio === 'apoiador' ? '🤝 Apoiador' : 
                          '👋 Simpatizante'}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      ${eleitor.confirmado === 1 ? 
                        '<span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"><i class="fas fa-check mr-1"></i>Sim</span>' : 
                        '<span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Não</span>'}
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-center gap-2">
                        <button 
                          onclick="visualizarEleitor(${eleitor.id})"
                          class="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Visualizar"
                        >
                          <i class="fas fa-eye"></i>
                        </button>
                        <button 
                          onclick="editarEleitor(${eleitor.id})"
                          class="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                        <button 
                          onclick="deletarEleitor(${eleitor.id}, '${eleitor.nome}')"
                          class="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Deletar"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
  `;
}

// ============= MÓDULO: HIERARQUIA =============

function renderHierarquiaModule() {
  const hierarquia = state.data.hierarquia;
  
  if (!hierarquia) {
    return `
      <div class="text-center py-12">
        <i class="fas fa-spinner fa-spin text-4xl text-purple-600 mb-4"></i>
        <p class="text-gray-600 text-lg">Carregando relatório de hierarquia...</p>
      </div>
    `;
  }
  
  const resumo = hierarquia.resumo || {};
  const coordenadores = hierarquia.coordenadores || [];
  const topLiderancas = hierarquia.topLiderancas || [];
  
  return `
    <div>
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          <i class="fas fa-sitemap mr-3 text-purple-600"></i>Hierarquia Organizacional
        </h1>
        <p class="text-gray-600">Visão completa da estrutura de mobilização e performance</p>
      </div>
      
      <!-- Resumo Geral -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90 mb-1">Coordenadores</p>
              <p class="text-4xl font-bold">${resumo.total_coordenadores || 0}</p>
            </div>
            <i class="fas fa-project-diagram text-5xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90 mb-1">Lideranças</p>
              <p class="text-4xl font-bold">${resumo.total_liderancas || 0}</p>
            </div>
            <i class="fas fa-tree text-5xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90 mb-1">Eleitores</p>
              <p class="text-4xl font-bold">${resumo.total_eleitores || 0}</p>
            </div>
            <i class="fas fa-users text-5xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90 mb-1">Total Captações</p>
              <p class="text-4xl font-bold">${resumo.total_captacoes || 0}</p>
            </div>
            <i class="fas fa-chart-line text-5xl opacity-50"></i>
          </div>
        </div>
      </div>
      
      <!-- Performance por Coordenador -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div class="p-6 border-b border-gray-200">
          <h3 class="font-semibold text-gray-800">
            <i class="fas fa-medal mr-2 text-yellow-500"></i>
            Performance por Coordenador
          </h3>
        </div>
        
        ${coordenadores.length === 0 ? `
          <div class="p-12 text-center">
            <i class="fas fa-project-diagram text-6xl text-gray-300 mb-4"></i>
            <p class="text-gray-600 text-lg">Nenhum coordenador cadastrado ainda</p>
          </div>
        ` : `
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Coordenador</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contato</th>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Lideranças</th>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Meta Lideranças</th>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Eleitores</th>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Meta Eleitores</th>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Confirmados</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                ${coordenadores.map(coord => {
                  const percLiderancas = coord.percentual_meta_liderancas || 0;
                  const percEleitores = coord.percentual_meta_eleitores || 0;
                  return `
                    <tr class="hover:bg-gray-50 transition-colors">
                      <td class="px-6 py-4">
                        <p class="font-medium text-gray-900">${coord.nome}</p>
                        <p class="text-sm text-gray-500">${coord.municipio || 'N/A'}</p>
                      </td>
                      <td class="px-6 py-4">
                        <p class="text-sm text-gray-900">${coord.telefone || 'N/A'}</p>
                        <p class="text-xs text-gray-500">${coord.email || 'N/A'}</p>
                      </td>
                      <td class="px-6 py-4 text-center">
                        <div class="flex flex-col items-center">
                          <p class="text-lg font-bold text-gray-900">${coord.qtd_liderancas || 0}</p>
                          <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div class="bg-blue-600 h-2 rounded-full" style="width: ${Math.min(percLiderancas, 100)}%"></div>
                          </div>
                          <p class="text-xs text-gray-500 mt-1">${percLiderancas.toFixed(0)}%</p>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-center">
                        <p class="text-sm font-medium text-gray-900">${coord.meta_liderancas || 0}</p>
                      </td>
                      <td class="px-6 py-4 text-center">
                        <div class="flex flex-col items-center">
                          <p class="text-lg font-bold text-gray-900">${coord.qtd_eleitores_captados || 0}</p>
                          <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div class="bg-green-600 h-2 rounded-full" style="width: ${Math.min(percEleitores, 100)}%"></div>
                          </div>
                          <p class="text-xs text-gray-500 mt-1">${percEleitores.toFixed(0)}%</p>
                        </div>
                      </td>
                      <td class="px-6 py-4 text-center">
                        <p class="text-sm font-medium text-gray-900">${coord.meta_eleitores || 0}</p>
                      </td>
                      <td class="px-6 py-4 text-center">
                        <span class="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                          ${coord.eleitores_confirmados || 0}
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
      
      <!-- Top 10 Lideranças -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-6 border-b border-gray-200">
          <h3 class="font-semibold text-gray-800">
            <i class="fas fa-trophy mr-2 text-yellow-500"></i>
            Top 10 Lideranças
          </h3>
        </div>
        
        ${topLiderancas.length === 0 ? `
          <div class="p-12 text-center">
            <i class="fas fa-tree text-6xl text-gray-300 mb-4"></i>
            <p class="text-gray-600 text-lg">Nenhuma liderança cadastrada ainda</p>
          </div>
        ` : `
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">#</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Liderança</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Coordenador</th>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Eleitores</th>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Confirmados</th>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Meta</th>
                  <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">% Meta</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                ${topLiderancas.map((lid, index) => {
                  const percMeta = lid.percentual_meta || 0;
                  const posicao = index + 1;
                  return `
                    <tr class="hover:bg-gray-50 transition-colors ${posicao <= 3 ? 'bg-yellow-50' : ''}">
                      <td class="px-6 py-4 text-center">
                        ${posicao === 1 ? '<span class="text-2xl">🥇</span>' : 
                          posicao === 2 ? '<span class="text-2xl">🥈</span>' : 
                          posicao === 3 ? '<span class="text-2xl">🥉</span>' : 
                          `<span class="font-semibold text-gray-600">${posicao}</span>`}
                      </td>
                      <td class="px-6 py-4">
                        <p class="font-medium text-gray-900">${lid.nome}</p>
                        <p class="text-sm text-gray-500">${lid.municipio || 'N/A'}</p>
                        <p class="text-xs text-gray-500">${lid.telefone || 'N/A'}</p>
                      </td>
                      <td class="px-6 py-4">
                        <p class="text-sm text-gray-900">${lid.coordenador_nome || 'N/A'}</p>
                      </td>
                      <td class="px-6 py-4 text-center">
                        <p class="text-xl font-bold text-blue-600">${lid.qtd_eleitores || 0}</p>
                      </td>
                      <td class="px-6 py-4 text-center">
                        <span class="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                          ${lid.qtd_eleitores_confirmados || 0}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-center">
                        <p class="text-sm font-medium text-gray-900">${lid.meta_eleitores || 0}</p>
                      </td>
                      <td class="px-6 py-4 text-center">
                        <div class="flex flex-col items-center">
                          <div class="w-full bg-gray-200 rounded-full h-3 mb-1">
                            <div class="h-3 rounded-full ${percMeta >= 100 ? 'bg-green-600' : percMeta >= 75 ? 'bg-blue-600' : percMeta >= 50 ? 'bg-yellow-500' : 'bg-red-500'}" 
                                 style="width: ${Math.min(percMeta, 100)}%"></div>
                          </div>
                          <p class="text-sm font-bold ${percMeta >= 100 ? 'text-green-600' : percMeta >= 75 ? 'text-blue-600' : percMeta >= 50 ? 'text-yellow-600' : 'text-red-600'}">
                            ${percMeta.toFixed(0)}%
                          </p>
                        </div>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>
    </div>
  `;
}

// ============= MÓDULO: PROFISSIONAIS =============

function renderProfissionaisModule() {
  return `
    <div>
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          <i class="fas fa-briefcase mr-3"></i>Profissionais
        </h1>
        <button 
          onclick="abrirModal('profissional')"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all"
        >
          <i class="fas fa-plus mr-2"></i>Novo Profissional
        </button>
      </div>
      
      <div id="profissionais-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${state.data.profissionais.length === 0 ? 
          '<div class="bg-white rounded-xl shadow-lg p-8 text-center lg:col-span-3"><p class="text-gray-500">Nenhum profissional cadastrado</p></div>' :
          state.data.profissionais.map(renderProfissionalCard).join('')
        }
      </div>
    </div>
  `;
}

function renderProfissionalCard(prof) {
  const profIcons = {
    advogado: 'fa-gavel',
    contador: 'fa-calculator',
    motorista: 'fa-car',
    medico: 'fa-user-md',
    engenheiro: 'fa-hard-hat'
  };
  
  return `
    <div class="card bg-white rounded-xl shadow-lg p-6">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center">
          <div class="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mr-3">
            <i class="fas ${profIcons[prof.profissao.toLowerCase()] || 'fa-briefcase'} text-green-600 text-xl"></i>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-800">${prof.nome}</h3>
            <p class="text-sm text-green-600 font-medium capitalize">${prof.profissao}</p>
          </div>
        </div>
      </div>
      
      <div class="space-y-2 text-sm">
        ${prof.registro_profissional ? `<p><i class="fas fa-id-card w-5 text-gray-500"></i> ${prof.registro_profissional}</p>` : ''}
        ${prof.celular ? `<p><i class="fas fa-mobile-alt w-5 text-gray-500"></i> ${prof.celular}</p>` : ''}
        ${prof.email ? `<p><i class="fas fa-envelope w-5 text-gray-500"></i> ${prof.email}</p>` : ''}
        ${prof.cidade && prof.estado ? `<p><i class="fas fa-map-marker-alt w-5 text-gray-500"></i> ${prof.cidade} - ${prof.estado}</p>` : ''}
      </div>
      
      <div class="mt-4 pt-4 border-t border-gray-200 flex gap-2">
        <button 
          onclick='abrirModal("profissional", ${JSON.stringify(prof)})'
          class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <i class="fas fa-edit mr-2"></i>Editar
        </button>
        <button 
          onclick="deleteProfissional(${prof.id})"
          class="flex-1 bg-red-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <i class="fas fa-trash mr-2"></i>Deletar
        </button>
      </div>
    </div>
  `;
}

// ============= MÓDULO: AGENDA =============

function renderAgendaModule() {
  const eventos = state.data.agenda || [];
  const filtro = state.agendaFiltro || 'todos';
  
  // Agrupar por status
  const pendentes = eventos.filter(e => e.status === 'pendente');
  const concluidos = eventos.filter(e => e.status === 'concluido');
  const cancelados = eventos.filter(e => e.status === 'cancelado');
  
  // Filtrar eventos
  let eventosFiltrados = eventos;
  if (filtro !== 'todos') {
    eventosFiltrados = eventos.filter(e => e.status === filtro);
  }
  
  // Ordenar por data (mais recentes primeiro)
  eventosFiltrados.sort((a, b) => new Date(b.data_inicio) - new Date(a.data_inicio));
  
  return `
    <div>
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            <i class="fas fa-calendar-alt text-green-600 mr-3"></i>Agenda e Atividades
          </h1>
          <p class="text-gray-600 flex items-center gap-2">
            <i class="fas fa-clock text-sm"></i>
            ${eventos.length} evento${eventos.length !== 1 ? 's' : ''} cadastrado${eventos.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button 
          onclick="abrirModal('agenda')"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform flex items-center gap-2"
        >
          <i class="fas fa-plus"></i>
          <span>Novo Evento</span>
        </button>
      </div>
      
      <!-- Estatísticas Rápidas -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-gradient-to-br from-gray-500 to-gray-600 text-white p-4 rounded-xl cursor-pointer hover:shadow-lg transition-shadow" onclick="filterAgenda('todos')">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Todos</p>
              <p class="text-3xl font-bold">${eventos.length}</p>
            </div>
            <i class="fas fa-calendar text-3xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-4 rounded-xl cursor-pointer hover:shadow-lg transition-shadow" onclick="filterAgenda('pendente')">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Pendentes</p>
              <p class="text-3xl font-bold">${pendentes.length}</p>
            </div>
            <i class="fas fa-clock text-3xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl cursor-pointer hover:shadow-lg transition-shadow" onclick="filterAgenda('concluido')">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Concluídos</p>
              <p class="text-3xl font-bold">${concluidos.length}</p>
            </div>
            <i class="fas fa-check-circle text-3xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-red-500 to-red-600 text-white p-4 rounded-xl cursor-pointer hover:shadow-lg transition-shadow" onclick="filterAgenda('cancelado')">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Cancelados</p>
              <p class="text-3xl font-bold">${cancelados.length}</p>
            </div>
            <i class="fas fa-times-circle text-3xl opacity-50"></i>
          </div>
        </div>
      </div>
      
      <!-- Tabela de Eventos (Para muitos registros) -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        ${eventos.length === 0 ? 
          '<div class="p-8 text-center"><p class="text-gray-500"><i class="fas fa-calendar-times text-4xl mb-3 block"></i>Nenhum evento cadastrado</p></div>' :
          `<div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-green-600 text-white">
                <tr>
                  <th class="text-left p-4 font-semibold">Data/Hora</th>
                  <th class="text-left p-4 font-semibold">Título</th>
                  <th class="text-left p-4 font-semibold">Tipo</th>
                  <th class="text-left p-4 font-semibold">Status</th>
                  <th class="text-left p-4 font-semibold">Prioridade</th>
                  <th class="text-center p-4 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                ${eventosFiltrados.map(renderAgendaRow).join('')}
              </tbody>
            </table>
          </div>`
        }
      </div>
    </div>
  `;
}

function renderAgendaRow(evento) {
  const statusColors = {
    pendente: 'bg-yellow-100 text-yellow-800',
    concluido: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800'
  };
  
  const prioridadeColors = {
    alta: 'bg-red-500',
    media: 'bg-yellow-500',
    baixa: 'bg-green-500'
  };
  
  const prioridadeIcons = {
    alta: 'fa-exclamation-circle',
    media: 'fa-exclamation-triangle',
    baixa: 'fa-info-circle'
  };
  
  const tipoLabels = {
    reuniao: 'Reunião',
    visita: 'Visita',
    evento: 'Evento',
    tarefa: 'Tarefa',
    ligacao: 'Ligação'
  };
  
  const tipoIcons = {
    reuniao: 'fa-handshake',
    visita: 'fa-map-marker-alt',
    evento: 'fa-calendar-check',
    tarefa: 'fa-tasks',
    ligacao: 'fa-phone'
  };
  
  const dataInicio = new Date(evento.data_inicio);
  const dataFormatada = dataInicio.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric'
  });
  
  const horaFormatada = dataInicio.toLocaleTimeString('pt-BR', { 
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return `
    <tr class="hover:bg-gray-50 transition-colors cursor-pointer" onclick='abrirModal("agenda", ${JSON.stringify(evento)})'>
      <td class="p-4">
        <div class="text-sm">
          <div class="font-semibold text-gray-900">${dataFormatada}</div>
          <div class="text-gray-600">${horaFormatada}</div>
        </div>
      </td>
      <td class="p-4">
        <div class="text-sm">
          <div class="font-semibold text-gray-900 mb-1">${evento.titulo}</div>
          ${evento.local ? `<div class="text-gray-600 text-xs"><i class="fas fa-map-marker-alt mr-1"></i>${evento.local}</div>` : ''}
        </div>
      </td>
      <td class="p-4">
        <span class="inline-flex items-center gap-2 text-sm text-gray-700">
          <i class="fas ${tipoIcons[evento.tipo]} text-green-600"></i>
          ${tipoLabels[evento.tipo] || evento.tipo}
        </span>
      </td>
      <td class="p-4">
        <span class="${statusColors[evento.status]} px-3 py-1 rounded-full text-xs font-semibold uppercase">
          ${evento.status}
        </span>
      </td>
      <td class="p-4">
        <span class="inline-flex items-center gap-1">
          <div class="${prioridadeColors[evento.prioridade]} w-2 h-2 rounded-full"></div>
          <span class="text-sm capitalize">${evento.prioridade}</span>
        </span>
      </td>
      <td class="p-4">
        <div class="flex items-center justify-center gap-2" onclick="event.stopPropagation()">
          ${evento.status === 'pendente' ? `
            <button 
              onclick="updateAgendaStatus(${evento.id}, 'concluido')"
              class="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-xs transition-colors"
              title="Marcar como concluído"
            >
              <i class="fas fa-check"></i>
            </button>
          ` : ''}
          <button 
            onclick='abrirModal("agenda", ${JSON.stringify(evento)})'
            class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-xs transition-colors"
            title="Editar"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button 
            onclick="deleteAgenda(${evento.id})"
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-xs transition-colors"
            title="Excluir"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `;
}

function renderAgendaCard(evento) {
  const statusColors = {
    pendente: 'bg-yellow-100 text-yellow-800',
    concluido: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800'
  };
  
  const prioridadeColors = {
    alta: 'bg-red-500',
    media: 'bg-yellow-500',
    baixa: 'bg-green-500'
  };
  
  const tipoIcons = {
    reuniao: 'fa-handshake',
    visita: 'fa-map-marker-alt',
    evento: 'fa-calendar-check',
    tarefa: 'fa-tasks',
    ligacao: 'fa-phone'
  };
  
  const dataInicio = new Date(evento.data_inicio);
  const dataFormatada = dataInicio.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return `
    <div class="card bg-white rounded-xl shadow-lg p-6" data-status="${evento.status}">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-start flex-1">
          <div class="${prioridadeColors[evento.prioridade]} w-1 h-full absolute left-0 top-0 bottom-0 rounded-l-xl"></div>
          <div class="ml-4">
            <div class="flex items-center gap-3 mb-2">
              <i class="fas ${tipoIcons[evento.tipo] || 'fa-calendar'} text-green-600 text-xl"></i>
              <h3 class="text-xl font-semibold text-gray-800">${evento.titulo}</h3>
            </div>
            <span class="${statusColors[evento.status]} px-3 py-1 rounded-full text-xs font-semibold uppercase">
              ${evento.status}
            </span>
          </div>
        </div>
        <div class="flex gap-2">
          <button 
            onclick='abrirModal("agenda", ${JSON.stringify(evento)})'
            class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button 
            onclick="deleteAgenda(${evento.id})"
            class="bg-red-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      
      <div class="ml-4 space-y-2 text-sm">
        ${evento.descricao ? `<p class="text-gray-600">${evento.descricao}</p>` : ''}
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
          <p><i class="fas fa-clock w-5 text-gray-500"></i> ${dataFormatada}</p>
          ${evento.local ? `<p><i class="fas fa-map-marker-alt w-5 text-gray-500"></i> ${evento.local}</p>` : ''}
          ${evento.participantes ? `<p><i class="fas fa-users w-5 text-gray-500"></i> ${evento.participantes}</p>` : ''}
          <p><i class="fas fa-flag w-5 text-gray-500"></i> Prioridade: <span class="font-medium capitalize">${evento.prioridade}</span></p>
        </div>
        
        ${evento.observacoes ? `<p class="mt-3 text-gray-600 italic"><i class="fas fa-comment mr-2"></i>${evento.observacoes}</p>` : ''}
      </div>
      
      ${evento.status === 'pendente' ? `
        <div class="mt-4 pt-4 border-t border-gray-200 flex gap-2">
          <button 
            onclick="updateAgendaStatus(${evento.id}, 'concluido')"
            class="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <i class="fas fa-check mr-2"></i>Marcar como Concluído
          </button>
          <button 
            onclick="updateAgendaStatus(${evento.id}, 'cancelado')"
            class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <i class="fas fa-times mr-2"></i>Cancelar
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

// ============= MÓDULO: USUÁRIOS =============

function renderUsuariosModule() {
  // Buscar usuários (candidatos)
  const usuarios = state.data.usuarios || [];
  
  return `
    <div>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <i class="fas fa-users-cog text-green-600"></i>
          Gerenciamento de Usuários
        </h1>
        <button 
          onclick="abrirModalUsuario()"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg flex items-center gap-2"
        >
          <i class="fas fa-user-plus"></i>
          Novo Usuário
        </button>
      </div>
      
      <!-- Estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Total de Usuários</p>
              <p class="text-3xl font-bold mt-1">${usuarios.length}</p>
            </div>
            <i class="fas fa-users text-4xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Ativos</p>
              <p class="text-3xl font-bold mt-1">${usuarios.filter(u => u.status === 'ativo').length}</p>
            </div>
            <i class="fas fa-check-circle text-4xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-4 rounded-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Candidatos</p>
              <p class="text-3xl font-bold mt-1">${usuarios.filter(u => u.cargo).length}</p>
            </div>
            <i class="fas fa-id-badge text-4xl opacity-50"></i>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm opacity-90">Admins</p>
              <p class="text-3xl font-bold mt-1">${usuarios.length}</p>
            </div>
            <i class="fas fa-user-shield text-4xl opacity-50"></i>
          </div>
        </div>
      </div>
      
      <!-- Lista de Usuários -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Usuário</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Cargo/Tipo</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Município</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              ${usuarios.length === 0 ? `
                <tr>
                  <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                    <i class="fas fa-users text-4xl mb-3 text-gray-300"></i>
                    <p>Nenhum usuário cadastrado</p>
                  </td>
                </tr>
              ` : usuarios.map(usuario => `
                <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <i class="fas fa-user text-green-600"></i>
                      </div>
                      <div>
                        <p class="font-semibold text-gray-800">${usuario.nome}</p>
                        ${usuario.cpf ? `<p class="text-xs text-gray-500">CPF: ${usuario.cpf}</p>` : ''}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-gray-700">${usuario.email}</td>
                  <td class="px-6 py-4">
                    ${usuario.cargo ? `
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-green-700">
                        <i class="fas fa-id-badge mr-1"></i>${usuario.cargo}
                      </span>
                    ` : `
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                        <i class="fas fa-user-shield mr-1"></i>Admin
                      </span>
                    `}
                  </td>
                  <td class="px-6 py-4 text-gray-700">${usuario.municipio || '-'} / ${usuario.estado || '-'}</td>
                  <td class="px-6 py-4">
                    ${usuario.status === 'ativo' ? `
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        <i class="fas fa-check-circle mr-1"></i>Ativo
                      </span>
                    ` : `
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-green-700">
                        <i class="fas fa-times-circle mr-1"></i>Inativo
                      </span>
                    `}
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                      <button 
                        onclick="editarUsuario(${usuario.id})"
                        class="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Editar"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button 
                        onclick="toggleStatusUsuario(${usuario.id}, '${usuario.status}')"
                        class="text-yellow-600 hover:text-yellow-800 transition-colors"
                        title="${usuario.status === 'ativo' ? 'Desativar' : 'Ativar'}"
                      >
                        <i class="fas fa-${usuario.status === 'ativo' ? 'ban' : 'check'}"></i>
                      </button>
                      <button 
                        onclick="resetarSenhaUsuario(${usuario.id})"
                        class="text-green-600 hover:text-purple-800 transition-colors"
                        title="Resetar Senha"
                      >
                        <i class="fas fa-key"></i>
                      </button>
                      <button 
                        onclick="deleteUsuario(${usuario.id})"
                        class="text-green-600 hover:text-green-800 transition-colors"
                        title="Deletar"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ============= MÓDULO: CONFIGURAÇÕES =============

function renderConfiguracoesModule() {
  return `
    <div>
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <i class="fas fa-cog text-green-600"></i>
          Configurações do Sistema
        </h1>
        <p class="text-gray-600 flex items-center gap-2">
          <i class="fas fa-leaf text-green-500 text-sm"></i>
          Gestão de informações da campanha e preferências
        </p>
      </div>
      
      <!-- Informações da Campanha -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-user-tie text-green-600"></i>
          Informações da Campanha
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Candidato
            </label>
            <input 
              type="text" 
              value="${state.candidato?.nome || ''}"
              disabled
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Cargo
            </label>
            <input 
              type="text" 
              value="${state.candidato?.cargo || 'Deputado Federal'}"
              disabled
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input 
              type="text" 
              value="${state.candidato?.email || ''}"
              disabled
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Município
            </label>
            <input 
              type="text" 
              value="${state.candidato?.municipio || 'Salvador'}"
              disabled
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </div>
      
      <!-- Estatísticas do Sistema -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-chart-bar text-green-600"></i>
          Estatísticas do Sistema
        </h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-4 bg-green-50 rounded-lg">
            <p class="text-3xl font-bold text-green-600">${state.data.liderancas?.length || 0}</p>
            <p class="text-sm text-gray-600 mt-1">Lideranças</p>
          </div>
          
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <p class="text-3xl font-bold text-blue-600">${state.data.coordenadores?.length || 0}</p>
            <p class="text-sm text-gray-600 mt-1">Coordenadores</p>
          </div>
          
          <div class="text-center p-4 bg-purple-50 rounded-lg">
            <p class="text-3xl font-bold text-purple-600">${state.data.profissionais?.length || 0}</p>
            <p class="text-sm text-gray-600 mt-1">Profissionais</p>
          </div>
          
          <div class="text-center p-4 bg-yellow-50 rounded-lg">
            <p class="text-3xl font-bold text-yellow-600">${state.data.agenda?.length || 0}</p>
            <p class="text-sm text-gray-600 mt-1">Eventos</p>
          </div>
        </div>
      </div>
      
      <!-- Preferências do Sistema -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-sliders-h text-green-600"></i>
          Preferências
        </h2>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-semibold text-gray-800">Notificações por Email</p>
              <p class="text-sm text-gray-600">Receber alertas de novas solicitações</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer" checked>
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
          
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-semibold text-gray-800">Modo Escuro</p>
              <p class="text-sm text-gray-600">Tema escuro para interface</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      <!-- Informações do Sistema -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-info-circle text-green-600"></i>
          Informações do Sistema
        </h2>
        
        <div class="space-y-3">
          <div class="flex justify-between py-2 border-b border-gray-200">
            <span class="text-gray-600">Versão do Sistema</span>
            <span class="font-semibold text-green-700 flex items-center gap-2">
              <i class="fas fa-leaf text-sm"></i>
              V8.3.6 - Magno Lavigne
            </span>
          </div>
          
          <div class="flex justify-between py-2 border-b border-gray-200">
            <span class="text-gray-600">Estado da Campanha</span>
            <span class="font-semibold text-gray-800">Bahia (BA)</span>
          </div>
          
          <div class="flex justify-between py-2 border-b border-gray-200">
            <span class="text-gray-600">Candidato</span>
            <span class="font-semibold text-gray-800">${state.candidato.nome}</span>
          </div>
          
          <div class="flex justify-between py-2 border-b border-gray-200">
            <span class="text-gray-600">Cargo</span>
            <span class="font-semibold text-gray-800">${state.candidato.cargo || 'Não informado'}</span>
          </div>
          
          <div class="flex justify-between py-2">
            <span class="text-gray-600">Município</span>
            <span class="font-semibold text-gray-800">${state.candidato.municipio || 'Não informado'}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============= MÓDULO: RELATÓRIOS =============

function renderRelatoriosModule() {
  // Verificar se há sub-módulo ativo
  if (state.relatorioAtivo) {
    return renderRelatorioDetalhado(state.relatorioAtivo);
  }
  
  return `
    <div>
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          <i class="fas fa-chart-bar mr-3 text-green-600"></i>Relatórios TSE
        </h1>
        <button 
          onclick="calcularMetricas()"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
        >
          <i class="fas fa-sync-alt mr-2"></i>Atualizar Métricas
        </button>
      </div>
      
      <!-- Cards de Relatórios -->
      <div class="mb-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-leaf text-green-600"></i>
          Análises Estratégicas - Bahia
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <!-- A1: Perfil Eleitorado -->
          <button 
            onclick="abrirRelatorio('perfil-eleitorado')"
            class="card bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
          >
            <i class="fas fa-users text-4xl mb-3"></i>
            <h3 class="text-lg font-bold mb-2">🌱 Perfil do Eleitorado</h3>
            <p class="text-sm opacity-90">Demografia completa da Bahia</p>
          </button>
          
          <!-- A2: Municípios Prioritários -->
          <button 
            onclick="abrirRelatorio('municipios-prioritarios')"
            class="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
          >
            <i class="fas fa-star text-4xl mb-3"></i>
            <h3 class="text-lg font-bold mb-2">🎯 Municípios Prioritários</h3>
            <p class="text-sm opacity-90">Score 0-100 por potencial</p>
          </button>
          
          <!-- D1: Perfil vs Cobertura -->
          <button 
            onclick="abrirRelatorio('perfil-vs-cobertura')"
            class="card bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
          >
            <i class="fas fa-balance-scale text-4xl mb-3"></i>
            <h3 class="text-lg font-bold mb-2">🔗 Perfil vs Cobertura</h3>
            <p class="text-sm opacity-90">Gaps e oportunidades</p>
          </button>
        </div>
      </div>
      
      <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <i class="fas fa-chart-line text-gray-600"></i>
        Relatórios Operacionais
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <!-- Cobertura Eleitoral -->
        <button 
          onclick="abrirRelatorio('cobertura')"
          class="card bg-gradient-to-br from-gray-400 to-gray-500 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
        >
          <i class="fas fa-map-marked-alt text-4xl mb-3"></i>
          <h3 class="text-lg font-bold mb-2">Cobertura Eleitoral</h3>
          <p class="text-sm opacity-90">Municípios, zonas e alcance</p>
        </button>
        
        <!-- Top Municípios -->
        <button 
          onclick="abrirRelatorio('top-municipios')"
          class="card bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
        >
          <i class="fas fa-trophy text-4xl mb-3"></i>
          <h3 class="text-lg font-bold mb-2">Top Municípios</h3>
          <p class="text-sm opacity-90">Melhor cobertura</p>
        </button>
        
        <!-- Municípios Críticos -->
        <button 
          onclick="abrirRelatorio('criticos')"
          class="card bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
        >
          <i class="fas fa-exclamation-triangle text-4xl mb-3"></i>
          <h3 class="text-lg font-bold mb-2">Municípios Críticos</h3>
          <p class="text-sm opacity-90">Sem cobertura</p>
        </button>
        
        <!-- Análise de Zonas -->
        <button 
          onclick="abrirRelatorio('zonas')"
          class="card bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
        >
          <i class="fas fa-layer-group text-4xl mb-3"></i>
          <h3 class="text-lg font-bold mb-2">Zonas Eleitorais</h3>
          <p class="text-sm opacity-90">Análise por zona</p>
        </button>
        
        <!-- Alertas e Oportunidades -->
        <button 
          onclick="abrirRelatorio('alertas')"
          class="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-left"
        >
          <i class="fas fa-bell text-4xl mb-3"></i>
          <h3 class="text-lg font-bold mb-2">Alertas e Oportunidades</h3>
          <p class="text-sm opacity-90">Notificações inteligentes sobre municípios críticos</p>
        </button>
      </div>
      
      <!-- Resumo Geral -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-chart-pie text-green-600"></i>
          Resumo Geral da Campanha
        </h2>
        <div id="resumo-geral" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="text-center p-4 bg-blue-50 rounded-lg">
            <i class="fas fa-spinner fa-spin text-2xl text-blue-600 mb-2"></i>
            <p class="text-sm text-gray-600">Carregando...</p>
          </div>
        </div>
      </div>
      
      <!-- Histórico de Relatórios -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          <i class="fas fa-history mr-2"></i>Histórico de Relatórios
        </h2>
        
        <div class="space-y-3">
          ${(state.data.relatorios || []).length === 0 ? 
            '<p class="text-gray-500 text-center py-8">Nenhum relatório gerado ainda. Clique em um dos botões acima para gerar.</p>' :
            (state.data.relatorios || []).map(renderRelatorioCard).join('')
          }
        </div>
      </div>
    </div>
  `;
}

function renderRelatorioCard(relatorio) {
  const data = new Date(relatorio.gerado_em);
  const dataFormatada = data.toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const tipoIcons = {
    geral: 'fa-chart-pie',
    liderancas: 'fa-users',
    coordenadores: 'fa-user-tie',
    agenda: 'fa-calendar-alt'
  };
  
  const tipoColors = {
    geral: 'bg-blue-100 text-blue-800',
    liderancas: 'bg-green-100 text-green-800',
    coordenadores: 'bg-purple-100 text-purple-800',
    agenda: 'bg-orange-100 text-orange-800'
  };
  
  return `
    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div class="flex items-center gap-4 flex-1">
        <div class="${tipoColors[relatorio.tipo]} w-12 h-12 rounded-lg flex items-center justify-center">
          <i class="fas ${tipoIcons[relatorio.tipo]} text-xl"></i>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-gray-800">${relatorio.titulo}</h3>
          <p class="text-sm text-gray-600">${relatorio.descricao}</p>
          <p class="text-xs text-gray-500 mt-1">
            <i class="fas fa-clock mr-1"></i>Gerado em ${dataFormatada}
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <button 
          onclick="visualizarRelatorio(${relatorio.id})"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          title="Visualizar"
        >
          <i class="fas fa-eye"></i>
        </button>
        <button 
          onclick="deleteRelatorio(${relatorio.id})"
          class="bg-red-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
          title="Deletar"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `;
}

// ============= MÓDULO: AJUDA ELEITORAL =============

function renderRelatorioDetalhado(tipo) {
  const data = state.relatorioData || {};
  
  let conteudo = '';
  
  switch(tipo) {
    case 'cobertura':
      conteudo = renderRelatorioCobertura(data);
      break;
    case 'top-municipios':
      conteudo = renderRelatorioTopMunicipios(data);
      break;
    case 'criticos':
      conteudo = renderRelatorioCriticos(data);
      break;

    case 'zonas':
      conteudo = renderRelatorioZonas(data);
      break;
    case 'alertas':
      conteudo = renderRelatorioAlertas(data);
      break;

    case 'perfil-eleitorado':
      conteudo = renderRelatorioPerfilEleitorado(data);
      break;
    case 'municipios-prioritarios':
      conteudo = renderRelatorioMunicipiosPrioritarios(data);
      break;
    case 'perfil-vs-cobertura':
      conteudo = renderRelatorioPerfilVsCobertura(data);
      break;
    default:
      conteudo = '<p class="text-gray-500">Relatório não encontrado</p>';
  }
  
  return `
    <div>
      <button 
        onclick="fecharRelatorio()"
        class="text-gray-600 hover:text-gray-800 mb-4 flex items-center gap-2 transition-colors"
      >
        <i class="fas fa-arrow-left"></i>
        <span>Voltar para Relatórios</span>
      </button>
      
      ${conteudo}
    </div>
  `;
}

function renderRelatorioCobertura(data) {
  const municipios = data.municipios || [];
  
  return `
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
      <i class="fas fa-map-marked-alt mr-3 text-blue-600"></i>Cobertura Eleitoral por Município
    </h1>
    
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="text-center p-4 bg-blue-50 rounded-lg">
          <div class="text-3xl font-bold text-blue-600">${municipios.length}</div>
          <p class="text-sm text-gray-600">Municípios Analisados</p>
        </div>
        <div class="text-center p-4 bg-green-50 rounded-lg">
          <div class="text-3xl font-bold text-green-600">${municipios.filter(m => m.cobertura_nivel !== 'nula').length}</div>
          <p class="text-sm text-gray-600">Com Cobertura</p>
        </div>
        <div class="text-center p-4 bg-red-50 rounded-lg">
          <div class="text-3xl font-bold text-green-600">${municipios.filter(m => m.cobertura_nivel === 'nula').length}</div>
          <p class="text-sm text-gray-600">Sem Cobertura</p>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Município</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Lideranças</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Eleitores</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Cobertura</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Nível</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            ${municipios.length === 0 ? 
              '<tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">Nenhum dado disponível. Cadastre lideranças para ver a cobertura.</td></tr>' :
              municipios.map(m => `
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm font-medium text-gray-900">${m.municipio || 'N/A'}</td>
                  <td class="px-4 py-3 text-center text-sm text-gray-600">${m.total_liderancas || 0}</td>
                  <td class="px-4 py-3 text-center text-sm text-gray-600">${(m.total_eleitores || 0).toLocaleString()}</td>
                  <td class="px-4 py-3 text-center text-sm font-semibold text-blue-600">${m.cobertura_percentual || 0}%</td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold ${
                      m.cobertura_nivel === 'alta' ? 'bg-green-100 text-green-800' :
                      m.cobertura_nivel === 'media' ? 'bg-yellow-100 text-yellow-800' :
                      m.cobertura_nivel === 'baixa' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-green-800'
                    }">
                      ${m.cobertura_nivel || 'nula'}
                    </span>
                  </td>
                </tr>
              `).join('')
            }
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderRelatorioTopMunicipios(data) {
  const municipios = data.municipios || [];
  
  return `
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
      <i class="fas fa-trophy mr-3 text-green-600"></i>Top Municípios (Melhor Cobertura)
    </h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      ${municipios.length === 0 ?
        '<div class="col-span-full bg-white rounded-xl shadow-lg p-8 text-center text-gray-500">Nenhum município com cobertura ainda</div>' :
        municipios.map((m, index) => `
          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 ${
            index === 0 ? 'border-yellow-500' :
            index === 1 ? 'border-gray-400' :
            index === 2 ? 'border-orange-500' :
            'border-blue-500'
          }">
            <div class="flex items-start justify-between mb-4">
              <h3 class="text-lg font-bold text-gray-800">${m.municipio}</h3>
              ${index < 3 ? `
                <i class="fas fa-medal text-2xl ${
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-gray-400' :
                  'text-orange-500'
                }"></i>
              ` : ''}
            </div>
            
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Lideranças:</span>
                <span class="font-bold text-green-600">${m.total_liderancas}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Eleitores:</span>
                <span class="font-bold text-blue-600">${(m.total_eleitores || 0).toLocaleString()}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Cobertura:</span>
                <span class="font-bold text-green-600">${m.cobertura_percentual}%</span>
              </div>
            </div>
            
            <div class="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div class="bg-green-500 h-full" style="width: ${m.cobertura_percentual}%"></div>
            </div>
          </div>
        `).join('')
      }
    </div>
  `;
}

function renderRelatorioCriticos(data) {
  const municipios = data.municipios || [];
  
  return `
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
      <i class="fas fa-exclamation-triangle mr-3 text-green-600"></i>Municípios Críticos (Sem Cobertura)
    </h1>
    
    <div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
      <p class="text-green-800 font-semibold">
        <i class="fas fa-info-circle mr-2"></i>
        Estes municípios não possuem lideranças cadastradas e representam oportunidades importantes!
      </p>
    </div>
    
    <div class="bg-white rounded-xl shadow-lg p-6">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Município</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Total de Eleitores</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Prioridade</th>
              <th class="px-4 py-3 text-center text-sm font-semibold text-gray-700">Ação</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            ${municipios.length === 0 ?
              '<tr><td colspan="4" class="px-4 py-8 text-center text-green-600 font-semibold">🎉 Parabéns! Você tem cobertura em todos os municípios!</td></tr>' :
              municipios.slice(0, 20).map(m => `
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm font-medium text-gray-900">${m.municipio}</td>
                  <td class="px-4 py-3 text-center text-sm text-gray-600">${(m.total_eleitores || 0).toLocaleString()}</td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold ${
                      (m.total_eleitores || 0) > 50000 ? 'bg-red-100 text-green-800' :
                      (m.total_eleitores || 0) > 20000 ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }">
                      ${(m.total_eleitores || 0) > 50000 ? 'ALTA' : (m.total_eleitores || 0) > 20000 ? 'MÉDIA' : 'BAIXA'}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-center">
                    <button class="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                      <i class="fas fa-plus-circle mr-1"></i>Cadastrar Liderança
                    </button>
                  </td>
                </tr>
              `).join('')
            }
          </tbody>
        </table>
      </div>
      
      ${municipios.length > 20 ? `
        <div class="mt-4 text-center text-gray-500 text-sm">
          Mostrando os 20 municípios mais prioritários de ${municipios.length} total
        </div>
      ` : ''}
    </div>
  `;
}

function renderRelatorioMetas(data) {
  return `
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
      <i class="fas fa-bullseye mr-3 text-green-600"></i>Metas e Objetivos
    </h1>
    
    <div class="bg-white rounded-xl shadow-lg p-6">
      <p class="text-gray-600 text-center py-8">
        <i class="fas fa-chart-line text-4xl text-gray-400 mb-4"></i><br>
        Sistema de metas em desenvolvimento.<br>
        Em breve você poderá definir e acompanhar metas por município.
      </p>
    </div>
  `;
}

function renderRelatorioZonas(data) {
  return `
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
      <i class="fas fa-layer-group mr-3 text-green-600"></i>Análise de Zonas Eleitorais
    </h1>
    
    <div class="bg-white rounded-xl shadow-lg p-6">
      <p class="text-gray-600 text-center py-8">
        <i class="fas fa-map text-4xl text-gray-400 mb-4"></i><br>
        Análise de zonas eleitorais em desenvolvimento.<br>
        Em breve você terá dados detalhados por zona e seção.
      </p>
    </div>
  `;
}

function renderRelatorioComparativo(data) {
  return `
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
      <i class="fas fa-chart-line mr-3 text-orange-600"></i>Comparativo com Concorrentes
    </h1>
    
    <div class="bg-white rounded-xl shadow-lg p-6">
      <p class="text-gray-600 text-center py-8">
        <i class="fas fa-balance-scale text-4xl text-gray-400 mb-4"></i><br>
        Comparativo com concorrentes em desenvolvimento.<br>
        Em breve você poderá comparar seu desempenho com outros candidatos.
      </p>
    </div>
  `;
}

function renderRelatorioAlertas(data) {
  const alertas = data.alertas || [];
  
  return `
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
      <i class="fas fa-bell mr-3 text-yellow-600"></i>Alertas e Oportunidades
    </h1>
    
    <div class="space-y-4">
      ${alertas.length === 0 ?
        '<div class="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500"><i class="fas fa-check-circle text-4xl text-green-500 mb-4"></i><br>Nenhum alerta no momento!</div>' :
        alertas.map(a => `
          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 ${
            a.severidade === 'alta' ? 'border-red-500' :
            a.severidade === 'media' ? 'border-yellow-500' :
            'border-blue-500'
          }">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-800 mb-2">
                  <i class="fas fa-exclamation-circle mr-2 ${
                    a.severidade === 'alta' ? 'text-green-600' :
                    a.severidade === 'media' ? 'text-yellow-600' :
                    'text-blue-600'
                  }"></i>
                  ${a.titulo}
                </h3>
                <p class="text-gray-600 mb-2">${a.descricao}</p>
                ${a.municipio ? `<p class="text-sm text-gray-500"><i class="fas fa-map-marker-alt mr-1"></i>${a.municipio}</p>` : ''}
              </div>
              <span class="px-3 py-1 rounded-full text-xs font-semibold ${
                a.severidade === 'alta' ? 'bg-red-100 text-green-800' :
                a.severidade === 'media' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }">
                ${a.severidade.toUpperCase()}
              </span>
            </div>
          </div>
        `).join('')
      }
    </div>
  `;
}

function renderRelatorioHistorico(data) {
  return `
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
      <i class="fas fa-history mr-3 text-teal-600"></i>Histórico de Evolução
    </h1>
    
    <div class="bg-white rounded-xl shadow-lg p-6">
      <p class="text-gray-600 text-center py-8">
        <i class="fas fa-chart-area text-4xl text-gray-400 mb-4"></i><br>
        Histórico de evolução em desenvolvimento.<br>
        Em breve você verá gráficos de evolução temporal das suas métricas.
      </p>
    </div>
  `;
}

// ============= NOVOS RELATÓRIOS ANALÍTICOS =============

function renderRelatorioPerfilEleitorado(data) {
  const demografico = data.demografico || {};
  const genero = demografico.genero || [];
  const faixaEtaria = demografico.faixa_etaria || [];
  const escolaridade = demografico.escolaridade || [];
  const topMunicipios = data.top_municipios || [];
  
  return `
    <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
      <i class="fas fa-users text-green-600"></i>
      🌱 Perfil do Eleitorado - Bahia
    </h1>
    
    <!-- Cards de Resumo -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
        <i class="fas fa-users text-4xl mb-3 opacity-80"></i>
        <p class="text-3xl font-bold">${(data.total_eleitores || 0).toLocaleString('pt-BR')}</p>
        <p class="text-sm opacity-90">Total de Eleitores</p>
      </div>
      
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
        <i class="fas fa-venus-mars text-4xl mb-3 opacity-80"></i>
        <p class="text-3xl font-bold">${genero.length}</p>
        <p class="text-sm opacity-90">Categorias de Gênero</p>
      </div>
      
      <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl">
        <i class="fas fa-birthday-cake text-4xl mb-3 opacity-80"></i>
        <p class="text-3xl font-bold">${faixaEtaria.length}</p>
        <p class="text-sm opacity-90">Faixas Etárias</p>
      </div>
    </div>
    
    <!-- Gráficos -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Distribuição por Gênero -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-venus-mars text-blue-600"></i>
          Distribuição por Gênero
        </h3>
        <div class="space-y-3">
          ${genero.map(g => {
            const total = data.total_eleitores || 1;
            const percentual = ((g.total / total) * 100).toFixed(1);
            return `
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-semibold text-gray-700">${g.genero}</span>
                  <span class="text-sm text-gray-600">${g.total.toLocaleString('pt-BR')} (${percentual}%)</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div class="bg-blue-600 h-3 rounded-full" style="width: ${percentual}%"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
      
      <!-- Distribuição por Faixa Etária -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-chart-bar text-green-600"></i>
          Distribuição por Faixa Etária
        </h3>
        <div class="space-y-3">
          ${faixaEtaria.map(f => {
            const total = data.total_eleitores || 1;
            const percentual = ((f.total / total) * 100).toFixed(1);
            return `
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-semibold text-gray-700">${f.faixa_etaria}</span>
                  <span class="text-sm text-gray-600">${f.total.toLocaleString('pt-BR')} (${percentual}%)</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div class="bg-green-600 h-3 rounded-full" style="width: ${percentual}%"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
    
    <!-- Escolaridade -->
    <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <i class="fas fa-graduation-cap text-purple-600"></i>
        Distribuição por Escolaridade
      </h3>
      <div class="space-y-3">
        ${escolaridade.map(e => {
          const total = data.total_eleitores || 1;
          const percentual = ((e.total / total) * 100).toFixed(1);
          return `
            <div>
              <div class="flex justify-between mb-1">
                <span class="text-sm font-semibold text-gray-700">${e.grau_instrucao}</span>
                <span class="text-sm text-gray-600">${e.total.toLocaleString('pt-BR')} (${percentual}%)</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-purple-600 h-3 rounded-full" style="width: ${percentual}%"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
    
    ${topMunicipios.length > 0 ? `
      <!-- Top 10 Municípios -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="fas fa-trophy text-yellow-600"></i>
          Top 10 Municípios por População
        </h3>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b-2">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">Posição</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">Município</th>
                <th class="px-4 py-3 text-right text-xs font-semibold text-gray-600">Eleitores</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              ${topMunicipios.map((m, idx) => `
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center justify-center w-8 h-8 rounded-full ${idx < 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'} font-bold text-sm">
                      ${idx + 1}
                    </span>
                  </td>
                  <td class="px-4 py-3 font-semibold text-gray-800">${m.nome}</td>
                  <td class="px-4 py-3 text-right text-gray-700">${m.total_eleitores.toLocaleString('pt-BR')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    ` : ''}
  `;
}

function renderRelatorioMunicipiosPrioritarios(data) {
  const municipios = data.municipios || [];
  
  return `
    <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
      <i class="fas fa-star text-yellow-600"></i>
      🎯 Municípios Prioritários - Score de Oportunidade
    </h1>
    
    <!-- Explicação do Score -->
    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
      <div class="flex items-start">
        <i class="fas fa-info-circle text-yellow-600 text-xl mr-3 mt-1"></i>
        <div>
          <p class="font-semibold text-yellow-800 mb-1">Como o Score é calculado?</p>
          <p class="text-sm text-yellow-700">
            <strong>Score 0-100:</strong> Tamanho do município (30%) + Baixa cobertura atual (40%) + Potencial eleitoral (30%)
            <br><strong>Score alto</strong> = Grande oportunidade de investimento
          </p>
        </div>
      </div>
    </div>
    
    <!-- Cards de Resumo -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
        <i class="fas fa-city text-4xl mb-3 opacity-80"></i>
        <p class="text-3xl font-bold">${data.total_municipios || 0}</p>
        <p class="text-sm opacity-90">Municípios Analisados</p>
      </div>
      
      <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl">
        <i class="fas fa-trophy text-4xl mb-3 opacity-80"></i>
        <p class="text-3xl font-bold">${municipios.length}</p>
        <p class="text-sm opacity-90">Top Prioridades</p>
      </div>
      
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
        <i class="fas fa-chart-line text-4xl mb-3 opacity-80"></i>
        <p class="text-3xl font-bold">${municipios[0]?.score || 0}</p>
        <p class="text-sm opacity-90">Maior Score</p>
      </div>
    </div>
    
    <!-- Ranking -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <i class="fas fa-list-ol text-green-600"></i>
        Ranking Top 20 - Municípios Prioritários
      </h3>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b-2">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">Rank</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">Município</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600">Score</th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-gray-600">Eleitores</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600">Lideranças</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600">Coorden.</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            ${municipios.map((m, idx) => {
              const scoreColor = m.score >= 80 ? 'bg-green-500' : m.score >= 60 ? 'bg-yellow-500' : 'bg-orange-500';
              return `
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center justify-center w-8 h-8 rounded-full ${idx < 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'} font-bold text-sm">
                      ${idx + 1}
                    </span>
                  </td>
                  <td class="px-4 py-3 font-semibold text-gray-800">${m.nome}</td>
                  <td class="px-4 py-3 text-center">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-white ${scoreColor} font-bold">
                      ${m.score}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-right text-gray-700">${m.total_eleitores.toLocaleString('pt-BR')}</td>
                  <td class="px-4 py-3 text-center text-gray-700">${m.total_liderancas || 0}</td>
                  <td class="px-4 py-3 text-center text-gray-700">${m.total_coordenadores || 0}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Insights -->
    <div class="bg-green-50 border-l-4 border-green-500 p-4 mt-6">
      <div class="flex items-start">
        <i class="fas fa-lightbulb text-green-600 text-xl mr-3 mt-1"></i>
        <div>
          <p class="font-semibold text-green-800 mb-1">💡 Ação Recomendada</p>
          <p class="text-sm text-green-700">
            Focar esforços nos <strong>Top 10 municípios</strong> com maior score. 
            Estes têm alto potencial eleitoral e baixa cobertura atual, representando as melhores oportunidades de crescimento.
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderRelatorioPerfilVsCobertura(data) {
  const gaps = data.gaps || [];
  
  return `
    <h1 class="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
      <i class="fas fa-balance-scale text-blue-600"></i>
      🔗 Perfil do Eleitorado vs Cobertura de Lideranças
    </h1>
    
    <!-- Explicação -->
    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
      <div class="flex items-start">
        <i class="fas fa-info-circle text-blue-600 text-xl mr-3 mt-1"></i>
        <div>
          <p class="font-semibold text-blue-800 mb-1">O que este relatório mostra?</p>
          <p class="text-sm text-blue-700">
            Compara o <strong>perfil demográfico do eleitorado</strong> com o <strong>perfil das lideranças cadastradas</strong>.
            <br><strong>Gap positivo</strong> = precisamos recrutar mais lideranças daquele perfil
            <br><strong>Gap negativo</strong> = temos lideranças acima do necessário
          </p>
        </div>
      </div>
    </div>
    
    <!-- Cards de Resumo -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
        <i class="fas fa-users text-4xl mb-3 opacity-80"></i>
        <p class="text-3xl font-bold">${(data.total_eleitores || 0).toLocaleString('pt-BR')}</p>
        <p class="text-sm opacity-90">Total de Eleitores</p>
      </div>
      
      <div class="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
        <i class="fas fa-user-friends text-4xl mb-3 opacity-80"></i>
        <p class="text-3xl font-bold">${data.total_liderancas || 0}</p>
        <p class="text-sm opacity-90">Total de Lideranças</p>
      </div>
      
      <div class="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
        <i class="fas fa-exclamation-triangle text-4xl mb-3 opacity-80"></i>
        <p class="text-3xl font-bold">${gaps.filter(g => g.prioridade === 'ALTA').length}</p>
        <p class="text-sm opacity-90">Gaps de Alta Prioridade</p>
      </div>
    </div>
    
    <!-- Tabela de Gaps -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <i class="fas fa-table text-purple-600"></i>
        Análise Detalhada por Faixa Etária
      </h3>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b-2">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600">Faixa Etária</th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-gray-600">Eleitores</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600">% Eleitorado</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600">Lideranças<br>Esperadas</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600">Lideranças<br>Atuais</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600">Gap</th>
              <th class="px-4 py-3 text-center text-xs font-semibold text-gray-600">Prioridade</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            ${gaps.map(g => {
              const gapColor = g.gap > 0 ? 'text-red-600' : 'text-green-600';
              const prioridadeColor = g.prioridade === 'ALTA' ? 'bg-red-100 text-red-800' : 
                                       g.prioridade === 'MÉDIA' ? 'bg-yellow-100 text-yellow-800' : 
                                       'bg-green-100 text-green-800';
              return `
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-3 font-semibold text-gray-800">${g.faixa_etaria}</td>
                  <td class="px-4 py-3 text-right text-gray-700">${g.eleitores.toLocaleString('pt-BR')}</td>
                  <td class="px-4 py-3 text-center text-gray-700">${g.percentual_eleitorado}%</td>
                  <td class="px-4 py-3 text-center text-gray-700">${g.liderancas_esperadas}</td>
                  <td class="px-4 py-3 text-center font-semibold text-gray-800">${g.liderancas_atuais}</td>
                  <td class="px-4 py-3 text-center font-bold ${gapColor}">
                    ${g.gap > 0 ? '+' : ''}${g.gap}
                  </td>
                  <td class="px-4 py-3 text-center">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold ${prioridadeColor}">
                      ${g.prioridade}
                    </span>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Ações Recomendadas -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      ${gaps.filter(g => g.prioridade === 'ALTA').length > 0 ? `
        <div class="bg-red-50 border-l-4 border-red-500 p-4">
          <div class="flex items-start">
            <i class="fas fa-exclamation-triangle text-red-600 text-xl mr-3 mt-1"></i>
            <div>
              <p class="font-semibold text-red-800 mb-1">⚠️ Gaps Críticos</p>
              <p class="text-sm text-red-700">
                <strong>Recrutar urgentemente:</strong>
                ${gaps.filter(g => g.prioridade === 'ALTA').map(g => g.faixa_etaria).join(', ')}
              </p>
            </div>
          </div>
        </div>
      ` : ''}
      
      <div class="bg-green-50 border-l-4 border-green-500 p-4">
        <div class="flex items-start">
          <i class="fas fa-check-circle text-green-600 text-xl mr-3 mt-1"></i>
          <div>
            <p class="font-semibold text-green-800 mb-1">✅ Cobertura Equilibrada</p>
            <p class="text-sm text-green-700">
              <strong>Manter foco em:</strong>
              ${gaps.filter(g => g.prioridade === 'BAIXA').map(g => g.faixa_etaria).slice(0, 3).join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAjudaModule() {
  const categorias = {
    legislacao: { icon: 'fa-gavel', name: 'Legislação' },
    convencoes: { icon: 'fa-handshake', name: 'Convenções' },
    titulos: { icon: 'fa-id-card', name: 'Títulos Eleitorais' },
    registro_candidatura: { icon: 'fa-clipboard-check', name: 'Registro de Candidatura' }
  };
  
  const agrupadoPorCategoria = {};
  state.data.ajudaEleitoral.forEach(item => {
    if (!agrupadoPorCategoria[item.categoria]) {
      agrupadoPorCategoria[item.categoria] = [];
    }
    agrupadoPorCategoria[item.categoria].push(item);
  });
  
  return `
    <div>
      <h1 class="text-3xl font-bold text-gray-800 mb-6">
        <i class="fas fa-question-circle mr-3"></i>Ajuda Eleitoral
      </h1>
      
      <div class="space-y-6">
        ${Object.keys(categorias).map(cat => {
          const items = agrupadoPorCategoria[cat] || [];
          const info = categorias[cat];
          
          return `
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-4">
                <i class="fas ${info.icon} mr-3"></i>${info.name}
              </h2>
              
              ${items.length === 0 ? 
                '<p class="text-gray-500">Nenhum conteúdo disponível nesta categoria</p>' :
                `<div class="space-y-4">
                  ${items.map(item => `
                    <div class="border-l-4 border-purple-500 pl-4 py-2">
                      <h3 class="font-semibold text-gray-800 mb-2">${item.titulo}</h3>
                      <p class="text-gray-600 text-sm">${item.conteudo}</p>
                    </div>
                  `).join('')}
                </div>`
              }
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// ============= SISTEMA DE MODAIS UNIFICADO =============

/**
 * Abre um modal de formulário
 * @param {string} tipo - 'coordenador', 'profissional', 'agenda', 'eleitor'
 * @param {object} data - Dados para edição (opcional)
 */
function abrirModal(tipo, data = null) {
  state.modalAtivo = tipo;
  state.modalData = data ? {...data} : {};
  state.modalEditId = data?.id || null;
  
  // Renderizar modal
  renderModal();
  
  // Aplicar máscaras após renderização
  setTimeout(() => {
    aplicarMascarasModal();
    anexarEventosModal();
    if (data) carregarDadosModal(data);
  }, 100);
}

function fecharModal() {
  const hasChanges = Object.keys(state.modalData).length > 0;
  
  if (hasChanges && !state.modalEditId) {
    if (!confirm('Você tem dados não salvos. Deseja realmente sair?')) {
      return;
    }
  }
  
  state.modalAtivo = null;
  state.modalData = {};
  state.modalEditId = null;
  
  // Remover modal do DOM
  const modal = document.getElementById('modal-container');
  if (modal) modal.remove();
}

function renderModal() {
  const modalContainer = document.createElement('div');
  modalContainer.id = 'modal-container';
  modalContainer.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
  modalContainer.onclick = (e) => {
    if (e.target === modalContainer) fecharModal();
  };
  
  let conteudo = '';
  
  switch(state.modalAtivo) {
    case 'coordenador':
      conteudo = renderModalCoordenador();
      break;
    case 'profissional':
      conteudo = renderModalProfissional();
      break;
    case 'agenda':
      conteudo = renderModalAgenda();
      break;
    case 'eleitor':
      conteudo = renderModalEleitor();
      break;
  }
  
  modalContainer.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
      ${conteudo}
    </div>
  `;
  
  document.body.appendChild(modalContainer);
}

function renderModalCoordenador() {
  const titulo = state.modalEditId ? 'Editar Coordenador' : 'Novo Coordenador';
  const botaoTexto = state.modalEditId ? 'Salvar Alterações' : 'Cadastrar Coordenador';
  
  return `
    <form id="form-modal" onsubmit="salvarModal(event)" class="p-6">
      <!-- Cabeçalho -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <i class="fas fa-user-tie text-green-600"></i>
          ${titulo}
        </h2>
        <button type="button" onclick="fecharModal()" class="text-gray-400 hover:text-gray-600 text-2xl">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <!-- Seção 1: Dados Pessoais -->
      <div class="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
          <i class="fas fa-user"></i>
          Dados Pessoais
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo <span class="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="modal-nome"
              placeholder="Digite o nome completo"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              CPF <span class="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="modal-cpf"
              placeholder="000.000.000-00"
              maxlength="14"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Coordenador <span class="text-red-500">*</span>
            </label>
            <select 
              id="modal-tipo"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
              required
            >
              <option value="">Selecione...</option>
              <option value="regional">Regional</option>
              <option value="territorial">Territorial</option>
              <option value="municipal">Municipal</option>
            </select>
          </div>
        </div>
      </div>
      
      <!-- Seção 2: Área de Atuação -->
      <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <i class="fas fa-map-marked-alt"></i>
          Área de Atuação
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Região</label>
            <input 
              type="text" 
              id="modal-regiao"
              placeholder="Ex: Nordeste"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Território</label>
            <input 
              type="text" 
              id="modal-territorio"
              placeholder="Ex: Recôncavo"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Município</label>
            <input 
              type="text" 
              id="modal-municipio"
              placeholder="Ex: Salvador"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
            >
          </div>
        </div>
      </div>
      
      <!-- Seção 3: Contato -->
      <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
          <i class="fas fa-phone"></i>
          Contato
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Celular <span class="text-red-500">*</span>
            </label>
            <input 
              type="tel" 
              id="modal-celular"
              placeholder="(00) 00000-0000"
              maxlength="15"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
            <input 
              type="tel" 
              id="modal-whatsapp"
              placeholder="(00) 00000-0000"
              maxlength="15"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
            <input 
              type="email" 
              id="modal-email"
              placeholder="email@exemplo.com"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
            >
          </div>
        </div>
      </div>
      
      <!-- Seção 4: Estatísticas -->
      <div class="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
          <i class="fas fa-chart-line"></i>
          Estatísticas
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Lideranças Vinculadas
            </label>
            <input 
              type="number" 
              id="modal-liderancas-vinculadas"
              placeholder="0"
              min="0"
              value="0"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Observações</label>
            <textarea 
              id="modal-observacoes"
              placeholder="Informações adicionais..."
              rows="3"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
            ></textarea>
          </div>
        </div>
      </div>
      
      <!-- Botões de Ação -->
      <div class="flex gap-4 justify-end">
        <button 
          type="button" 
          onclick="fecharModal()"
          class="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg"
        >
          <i class="fas fa-save mr-2"></i>${botaoTexto}
        </button>
      </div>
    </form>
  `;
}

function renderModalProfissional() {
  const titulo = state.modalEditId ? 'Editar Profissional' : 'Novo Profissional';
  const botaoTexto = state.modalEditId ? 'Salvar Alterações' : 'Cadastrar Profissional';
  
  return `
    <form id="form-modal" onsubmit="salvarModal(event)" class="p-6">
      <!-- Cabeçalho -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <i class="fas fa-user-md text-blue-600"></i>
          ${titulo}
        </h2>
        <button type="button" onclick="fecharModal()" class="text-gray-400 hover:text-gray-600 text-2xl">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <!-- Seção 1: Dados Pessoais -->
      <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <i class="fas fa-user"></i>
          Dados Pessoais
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo <span class="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="modal-nome"
              placeholder="Digite o nome completo"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              CPF <span class="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="modal-cpf"
              placeholder="000.000.000-00"
              maxlength="14"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Registro Profissional <span class="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="modal-registro"
              placeholder="Ex: CRM 12345"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
              required
            >
          </div>
        </div>
      </div>
      
      <!-- Seção 2: Dados Profissionais -->
      <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
          <i class="fas fa-briefcase"></i>
          Dados Profissionais
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Profissão <span class="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="modal-profissao"
              placeholder="Ex: Médico, Advogado, Contador"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Especialidade <span class="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="modal-especialidade"
              placeholder="Ex: Cardiologia"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
              required
            >
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Disponibilidade
            </label>
            <input 
              type="text" 
              id="modal-disponibilidade"
              placeholder="Ex: Segunda a Sexta, 8h-17h"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
            >
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
            <input 
              type="text" 
              id="modal-endereco"
              placeholder="Rua, Número, Bairro"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
            <input 
              type="text" 
              id="modal-cidade"
              placeholder="Digite a cidade"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select 
              id="modal-estado"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
            >
              <option value="">Selecione o estado</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
          
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Observações</label>
            <textarea 
              id="modal-observacoes"
              rows="3"
              placeholder="Informações adicionais sobre o profissional"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg resize-none"
            ></textarea>
          </div>
        </div>
      </div>
      
      <!-- Seção 3: Contato -->
      <div class="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
          <i class="fas fa-phone"></i>
          Contato
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Celular <span class="text-red-500">*</span>
            </label>
            <input 
              type="tel" 
              id="modal-celular"
              placeholder="(00) 00000-0000"
              maxlength="15"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
            <input 
              type="tel" 
              id="modal-whatsapp"
              placeholder="(00) 00000-0000"
              maxlength="15"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
            <input 
              type="email" 
              id="modal-email"
              placeholder="email@exemplo.com"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
            >
          </div>
        </div>
      </div>
      
      <!-- Botões de Ação -->
      <div class="flex gap-4 justify-end">
        <button 
          type="button" 
          onclick="fecharModal()"
          class="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg"
        >
          <i class="fas fa-save mr-2"></i>${botaoTexto}
        </button>
      </div>
    </form>
  `;
}

function renderModalAgenda() {
  const titulo = state.modalEditId ? 'Editar Atividade' : 'Nova Atividade';
  const botaoTexto = state.modalEditId ? 'Salvar Alterações' : 'Adicionar Atividade';
  
  return `
    <form id="form-modal" onsubmit="salvarModal(event)" class="p-6">
      <!-- Cabeçalho -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <i class="fas fa-calendar-alt text-green-600"></i>
          ${titulo}
        </h2>
        <button type="button" onclick="fecharModal()" class="text-gray-400 hover:text-gray-600 text-2xl">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <!-- Seção 1: Informações Básicas -->
      <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
          <i class="fas fa-info-circle"></i>
          Informações Básicas
        </h3>
        
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Título da Atividade <span class="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="modal-titulo"
              placeholder="Ex: Reunião com Coordenadores"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
            <textarea 
              id="modal-descricao"
              placeholder="Descreva a atividade..."
              rows="3"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
            ></textarea>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Tipo <span class="text-red-500">*</span>
              </label>
              <select 
                id="modal-tipo"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
                required
              >
                <option value="">Selecione...</option>
                <option value="reuniao">Reunião</option>
                <option value="evento">Evento</option>
                <option value="visita">Visita</option>
                <option value="ligacao">Ligação</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Prioridade
              </label>
              <select 
                id="modal-prioridade"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
              >
                <option value="baixa">Baixa</option>
                <option value="media" selected>Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Seção 2: Data e Hora -->
      <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <i class="fas fa-clock"></i>
          Data e Hora
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Data/Hora Início <span class="text-red-500">*</span>
            </label>
            <input 
              type="datetime-local" 
              id="modal-data-inicio"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Data/Hora Fim
            </label>
            <input 
              type="datetime-local" 
              id="modal-data-fim"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
            >
          </div>
        </div>
      </div>
      
      <!-- Seção 3: Local e Participantes -->
      <div class="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
          <i class="fas fa-map-marker-alt"></i>
          Local e Participantes
        </h3>
        
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Local</label>
            <input 
              type="text" 
              id="modal-local"
              placeholder="Ex: Sede do Partido"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Participantes</label>
            <input 
              type="text" 
              id="modal-participantes"
              placeholder="Ex: Coordenadores, Lideranças"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
            >
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select 
                id="modal-status"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
              >
                <option value="pendente" selected>Pendente</option>
                <option value="confirmado">Confirmado</option>
                <option value="cancelado">Cancelado</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Observações</label>
            <textarea 
              id="modal-observacoes"
              placeholder="Informações adicionais..."
              rows="3"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
            ></textarea>
          </div>
        </div>
      </div>
      
      <!-- Botões de Ação -->
      <div class="flex gap-4 justify-end">
        <button 
          type="button" 
          onclick="fecharModal()"
          class="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg"
        >
          <i class="fas fa-save mr-2"></i>${botaoTexto}
        </button>
      </div>
    </form>
  `;
}

function renderModalEleitor() {
  const titulo = state.modalEditId ? 'Editar Dados Eleitorais' : 'Novos Dados Eleitorais';
  const botaoTexto = state.modalEditId ? 'Salvar Alterações' : 'Cadastrar Dados';
  
  return `
    <form id="form-modal" onsubmit="salvarModal(event)" class="p-6">
      <!-- Cabeçalho -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <i class="fas fa-vote-yea text-orange-600"></i>
          ${titulo}
        </h2>
        <button type="button" onclick="fecharModal()" class="text-gray-400 hover:text-gray-600 text-2xl">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <!-- Seção 1: Localização -->
      <div class="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
          <i class="fas fa-map-marked-alt"></i>
          Localização
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="md:col-span-3">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Município <span class="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="modal-municipio"
              placeholder="Ex: Salvador"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Zona Eleitoral
            </label>
            <input 
              type="text" 
              id="modal-zona"
              placeholder="Ex: 001"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Seção Eleitoral
            </label>
            <input 
              type="text" 
              id="modal-secao"
              placeholder="Ex: 0001"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
            >
          </div>
        </div>
      </div>
      
      <!-- Seção 2: Dados Eleitorais -->
      <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-blue-800 mb-4 flex items-center gap-2">
          <i class="fas fa-chart-bar"></i>
          Dados Eleitorais
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Total de Eleitores
            </label>
            <input 
              type="number" 
              id="modal-total-eleitores"
              placeholder="0"
              min="0"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Eleitores de Apoio
            </label>
            <input 
              type="number" 
              id="modal-eleitores-apoio"
              placeholder="0"
              min="0"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Percentual de Apoio (%)
            </label>
            <input 
              type="number" 
              id="modal-percentual-apoio"
              placeholder="0.0"
              min="0"
              max="100"
              step="0.01"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
            >
          </div>
        </div>
      </div>
      
      <!-- Seção 3: Observações -->
      <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
          <i class="fas fa-sticky-note"></i>
          Observações
        </h3>
        
        <div>
          <textarea 
            id="modal-observacoes"
            placeholder="Informações adicionais sobre esta região eleitoral..."
            rows="4"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
          ></textarea>
        </div>
      </div>
      
      <!-- Botões de Ação -->
      <div class="flex gap-4 justify-end">
        <button 
          type="button" 
          onclick="fecharModal()"
          class="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          class="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold shadow-lg"
        >
          <i class="fas fa-save mr-2"></i>${botaoTexto}
        </button>
      </div>
    </form>
  `;
}

function aplicarMascarasModal() {
  const cpfInput = document.getElementById('modal-cpf');
  const celularInput = document.getElementById('modal-celular');
  const whatsappInput = document.getElementById('modal-whatsapp');
  
  if (cpfInput) {
    cpfInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      }
      e.target.value = value;
    });
  }
  
  [celularInput, whatsappInput].forEach(input => {
    if (input) {
      input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
          value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
          value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        e.target.value = value;
      });
    }
  });
}

function anexarEventosModal() {
  // Auto-preencher WhatsApp com o valor do Celular
  const celularInput = document.getElementById('modal-celular');
  const whatsappInput = document.getElementById('modal-whatsapp');
  
  if (celularInput && whatsappInput) {
    celularInput.addEventListener('blur', () => {
      if (celularInput.value && !whatsappInput.value) {
        whatsappInput.value = celularInput.value;
      }
    });
  }
}

function carregarDadosModal(data) {
  // Preencher campos com dados existentes
  Object.keys(data).forEach(key => {
    const input = document.getElementById(`modal-${key.replace(/_/g, '-')}`);
    if (input) {
      if (input.type === 'checkbox') {
        input.checked = !!data[key];
      } else {
        input.value = data[key] || '';
      }
    }
  });
}

async function salvarModal(e) {
  e.preventDefault();
  
  showLoadingMessage('Salvando...');
  
  try {
    let endpoint = '';
    let dados = { candidato_id: state.candidato.id };
    
    switch(state.modalAtivo) {
      case 'coordenador':
        endpoint = state.modalEditId ? `/api/coordenadores/${state.modalEditId}` : '/api/coordenadores';
        dados = {
          ...dados,
          nome: document.getElementById('modal-nome')?.value || '',
          telefone: document.getElementById('modal-telefone')?.value?.replace(/\D/g, '') || 
                    document.getElementById('modal-celular')?.value?.replace(/\D/g, '') || '',
          email: document.getElementById('modal-email')?.value || '',
          municipio: document.getElementById('modal-municipio')?.value || '',
          area_atuacao: document.getElementById('modal-area-atuacao')?.value || 
                        document.getElementById('modal-tipo')?.value || ''
        };
        break;
        
      case 'profissional':
        endpoint = state.modalEditId ? `/api/profissionais/${state.modalEditId}` : '/api/profissionais';
        dados = {
          ...dados,
          nome: document.getElementById('modal-nome')?.value || '',
          profissao: document.getElementById('modal-profissao')?.value || '',
          telefone: document.getElementById('modal-telefone')?.value?.replace(/\D/g, '') || 
                    document.getElementById('modal-celular')?.value?.replace(/\D/g, '') || '',
          email: document.getElementById('modal-email')?.value || '',
          municipio: document.getElementById('modal-municipio')?.value || 
                     document.getElementById('modal-cidade')?.value || '',
          area_especialidade: document.getElementById('modal-especialidade')?.value || 
                             document.getElementById('modal-area-especialidade')?.value || ''
        };
        break;
        
      case 'agenda':
        endpoint = state.modalEditId ? `/api/agenda/${state.modalEditId}` : '/api/agenda';
        const dataHora = document.getElementById('modal-data-hora')?.value || 
                        document.getElementById('modal-data-inicio')?.value || '';
        dados = {
          ...dados,
          titulo: document.getElementById('modal-titulo')?.value || '',
          descricao: document.getElementById('modal-descricao')?.value || '',
          tipo: document.getElementById('modal-tipo')?.value || 'reuniao',
          data_hora: dataHora ? dataHora.replace('T', ' ') + ':00' : null,
          local: document.getElementById('modal-local')?.value || '',
          municipio: document.getElementById('modal-municipio')?.value || '',
          prioridade: document.getElementById('modal-prioridade')?.value || 'media',
          status: document.getElementById('modal-status')?.value || 'pendente'
        };
        break;
        
      case 'eleitor':
        endpoint = state.modalEditId ? `/api/dados-eleitorais/${state.modalEditId}` : '/api/dados-eleitorais';
        dados = {
          ...dados,
          municipio: document.getElementById('modal-municipio').value,
          zona: document.getElementById('modal-zona')?.value || null,
          secao: document.getElementById('modal-secao')?.value || null,
          total_eleitores: parseInt(document.getElementById('modal-total-eleitores')?.value || '0') || 0,
          eleitores_apoio: parseInt(document.getElementById('modal-eleitores-apoio')?.value || '0') || 0,
          percentual_apoio: parseFloat(document.getElementById('modal-percentual-apoio')?.value || '0') || 0,
          observacoes: document.getElementById('modal-observacoes')?.value || ''
        };
        break;
    }
    
    const method = state.modalEditId ? 'PUT' : 'POST';
    const response = await axios({ method, url: endpoint, data: dados });
    
    hideLoadingMessage();
    
    // Backend retorna { id, ...data }, não { success: true }
    if (response.data && (response.data.id || response.data.success)) {
      showSuccessMessage('✅ Salvo com sucesso!');
      fecharModal();
      await loadAllData();
      render();
    } else {
      showErrorMessage('Erro ao salvar: resposta inválida do servidor');
    }
  } catch (error) {
    hideLoadingMessage();
    console.error('Erro ao salvar modal:', error);
    
    // Tentar extrair mensagem de erro detalhada
    let errorMessage = 'Erro ao salvar dados';
    
    if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    } else if (error.response?.data?.details) {
      errorMessage = `Erro: ${error.response.data.details}`;
    } else if (error.message) {
      errorMessage = `Erro: ${error.message}`;
    }
    
    // Identificar campos faltantes
    const camposObrigatorios = {
      'coordenador': ['nome', 'cpf', 'tipo', 'celular'],
      'profissional': ['nome', 'cpf', 'profissao', 'registro_profissional', 'especialidade', 'celular'],
      'agenda': ['titulo', 'tipo', 'data_inicio'],
      'eleitor': ['municipio', 'zona_eleitoral', 'secao_eleitoral']
    };
    
    const campos = camposObrigatorios[state.modalAtivo] || [];
    const camposFaltando = [];
    
    campos.forEach(campo => {
      const fieldId = `modal-${campo.replace(/_/g, '-')}`;
      const field = document.getElementById(fieldId);
      if (field && !field.value) {
        const label = field.closest('div').querySelector('label')?.textContent.replace(' *', '') || campo;
        camposFaltando.push(label);
      }
    });
    
    if (camposFaltando.length > 0) {
      errorMessage = `<strong>Campos obrigatórios não preenchidos:</strong><br><br>` +
        camposFaltando.map(c => `• ${c}`).join('<br>');
    }
    
    showErrorMessage(errorMessage);
  }
}

// ============= FUNÇÕES DE AÇÃO =============

async function login(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const errorDiv = document.getElementById('login-error');
  const errorMessage = document.getElementById('login-error-message');
  const submitBtn = e.target.querySelector('button[type="submit"]');
  
  console.log('🔐 Tentando login com:', email);
  
  // Desabilitar botão e mostrar loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Entrando...';
  
  try {
    const response = await axios.post('/api/login', { email, senha });
    console.log('✅ Resposta da API:', response.data);
    
    if (response.data && response.data.candidato) {
      state.candidato = response.data.candidato;
      console.log('✅ Candidato carregado:', state.candidato);
      
      // Mostrar loading no lugar do form
      document.getElementById('app').innerHTML = `
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-yellow-50">
          <div class="text-center">
            <i class="fas fa-spinner fa-spin text-6xl text-green-600 mb-4"></i>
            <p class="text-xl text-gray-700 font-semibold">Carregando dados...</p>
            <p class="text-sm text-gray-500 mt-2">Aguarde enquanto preparamos tudo para você</p>
          </div>
        </div>
      `;
      
      // Carregar dados
      try {
        await loadAllData();
        console.log('✅ Dados carregados com sucesso');
        
        // Renderizar dashboard
        render();
      } catch (loadError) {
        console.error('❌ Erro ao carregar dados:', loadError);
        // Renderizar mesmo assim com dados vazios
        render();
      }
    } else {
      console.error('❌ Resposta sem candidato:', response.data);
      errorMessage.textContent = 'Erro ao fazer login - resposta inválida';
      errorDiv.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Entrar';
    }
  } catch (error) {
    console.error('❌ Erro no login:', error);
    console.error('❌ Detalhes:', error.response?.data);
    errorMessage.textContent = error.response?.data?.error || 'Erro ao fazer login';
    errorDiv.classList.remove('hidden');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Entrar';
    setTimeout(() => errorDiv.classList.add('hidden'), 5000);
  }
}

function logout() {
  state.candidato = null;
  state.currentModule = 'dashboard';
  state.data = {
    dashboard: null,
    dadosEleitorais: [],
    liderancas: [],
    coordenadores: [],
    profissionais: [],
    ajudaEleitoral: []
  };
  render();
}

function changeModule(module) {
  state.currentModule = module;
  
  // Carregar dados específicos do módulo
  if (module === 'territorios' && (!state.data.territorios || state.data.territorios.length === 0)) {
    carregarTerritorios();
  } else if (module === 'bi-investimento' && !state.data.biDashboard) {
    carregarBIDashboard();
  }
  
  render();
}

async function loadAllData() {
  const candidatoId = state.candidato.id;
  
  // Inicializar com valores padrão para evitar undefined
  state.data = {
    dashboard: null,
    solicitacoes: [],
    solicitacoesPendentes: 0,
    tseStats: null,
    tseCandidatos: [],
    dadosEleitorais: [],
    liderancas: [],
    coordenadores: [],
    profissionais: [],
    ajudaEleitoral: [],
    agenda: [],
    relatorios: [],
    analiseEleitoral: null,
    usuarios: [],
    territorios: [],
    territorioSelecionado: null,
    municipiosTerritori: [],
    biDashboard: null,
    biInvestimento: [],
    biPrioritarios: []
  };
  
  try {
    console.log('📊 Carregando dashboard...');
    // Carregar dashboard
    const dashResponse = await axios.get(`/api/dashboard/${candidatoId}`);
    state.data.dashboard = dashResponse.data;
    console.log('✅ Dashboard carregado:', state.data.dashboard);
    
    console.log('📋 Carregando solicitações...');
    // Carregar solicitações (apenas para admins)
    await loadSolicitacoes();
    
    console.log('🗳️ Carregando dados TSE...');
    // Carregar dados TSE
    await loadTSEStats();
    if (state.currentModule === 'dados-tse' && state.tseTab === 'candidatos') {
      await loadTSECandidatos();
    }
    
    console.log('📊 Carregando dados eleitorais...');
    // Carregar dados eleitorais
    const dadosResponse = await axios.get(`/api/dados-eleitorais/${candidatoId}`);
    state.data.dadosEleitorais = dadosResponse.data || [];
    
    console.log('👥 Carregando lideranças...');
    // Carregar lideranças
    const liderancasResponse = await axios.get(`/api/liderancas/${candidatoId}`);
    state.data.liderancas = liderancasResponse.data || [];
    console.log('✅ Lideranças carregadas:', state.data.liderancas.length);
    
    console.log('👔 Carregando coordenadores...');
    // Carregar coordenadores
    const coordResponse = await axios.get(`/api/coordenadores/${candidatoId}`);
    state.data.coordenadores = coordResponse.data || [];
    
    console.log('💼 Carregando profissionais...');
    // Carregar profissionais
    const profResponse = await axios.get(`/api/profissionais/${candidatoId}`);
    state.data.profissionais = profResponse.data || [];
    
    console.log('🤝 Carregando ajuda eleitoral...');
    // Carregar ajuda eleitoral
    const ajudaResponse = await axios.get('/api/ajuda-eleitoral');
    state.data.ajudaEleitoral = ajudaResponse.data || [];
    
    console.log('📅 Carregando agenda...');
    // Carregar agenda
    const agendaResponse = await axios.get(`/api/agenda/${candidatoId}`);
    state.data.agenda = agendaResponse.data || [];
    
    console.log('👥 Carregando eleitores...');
    // Carregar eleitores
    const eleitoresResponse = await axios.get('/api/eleitores', {
      headers: { 'X-Candidato-Id': candidatoId }
    });
    state.data.eleitores = eleitoresResponse.data || [];
    console.log('✅ Eleitores carregados:', state.data.eleitores.length);
    
    console.log('📊 Carregando hierarquia...');
    // Carregar hierarquia
    const hierarquiaResponse = await axios.get('/api/relatorios/hierarquia', {
      headers: { 'X-Candidato-Id': candidatoId }
    });
    state.data.hierarquia = hierarquiaResponse.data || {};
    console.log('✅ Hierarquia carregada');
    
    console.log('📄 Carregando relatórios...');
    // Carregar relatórios
    const relatoriosResponse = await axios.get(`/api/relatorios/${candidatoId}`);
    state.data.relatorios = relatoriosResponse.data || [];
    
    console.log('👤 Carregando usuários...');
    // Carregar usuários (todos os candidatos do sistema)
    const usuariosResponse = await axios.get('/api/usuarios');
    state.data.usuarios = usuariosResponse.data || [];
    
    console.log('✅ Todos os dados carregados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao carregar dados:', error);
    console.error('❌ Detalhes:', error.response?.data);
    throw error; // Re-lançar para o login handler capturar
  }
}

async function loadSolicitacoes(status = 'pendente') {
  try {
    const response = await axios.get(`/api/solicitacoes?status=${status}`);
    state.data.solicitacoes = response.data.solicitacoes || [];
    
    // Contar pendentes para o badge
    if (status === 'pendente') {
      state.data.solicitacoesPendentes = state.data.solicitacoes.length;
    }
  } catch (error) {
    console.error('Erro ao carregar solicitações:', error);
    state.data.solicitacoes = [];
  }
}

function filterSolicitacoes(status) {
  state.filtroSolicitacoes = status;
  loadSolicitacoes(status).then(() => render());
}

async function aprovarSolicitacao(id) {
  if (!confirm('Deseja realmente aprovar esta solicitação?')) return;
  
  try {
    const response = await axios.post(`/api/admin/solicitacoes/${id}/aprovar`, {
      candidatoId: state.candidato.id
    });
    
    if (response.data.success) {
      showSuccessMessage('✅ Solicitação aprovada com sucesso!');
      await loadAllData(); // Recarregar todos os dados para pegar a nova liderança/coordenador/profissional
      await loadSolicitacoes(state.filtroSolicitacoes || 'pendente');
      render();
    }
  } catch (error) {
    console.error('Erro ao aprovar:', error);
    showErrorMessage('Erro ao aprovar solicitação: ' + (error.response?.data?.error || error.message));
  }
}

async function rejeitarSolicitacao(id) {
  const motivo = prompt('Digite o motivo da rejeição:');
  if (!motivo) return;
  
  try {
    const response = await axios.post(`/api/admin/solicitacoes/${id}/rejeitar`, {
      candidatoId: state.candidato.id,
      motivo: motivo
    });
    
    if (response.data.success) {
      showSuccessMessage('Solicitação rejeitada');
      await loadSolicitacoes(state.filtroSolicitacoes || 'pendente');
      render();
    }
  } catch (error) {
    console.error('Erro ao rejeitar:', error);
    alert('❌ Erro ao rejeitar solicitação');
  }
}

// Funções de formulário simplificadas (para demonstração)
function showAddDadosEleitoraisForm() {
  const municipio = prompt('Município:');
  const territorio = prompt('Território:');
  const totalEleitores = parseInt(prompt('Total de Eleitores:') || '0');
  
  if (municipio) {
    addDadosEleitorais({ municipio, territorio, total_eleitores: totalEleitores });
  }
}

// ===== FUNÇÕES DO FORMULÁRIO DE LIDERANÇA =====

function openLiderancaForm() {
  state.liderancaFormMode = true;
  state.liderancaFormData = {}; // Resetar dados
  render();
  
  // Aplicar máscaras após renderizar
  setTimeout(() => {
    applyFormMasks();
    attachFormEvents();
    loadSavedFormData();
  }, 100);
}

function closeLiderancaForm() {
  const hasDraft = localStorage.getItem('lideranca_draft');
  
  if (hasDraft) {
    // Criar modal de confirmação amigável
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
        <div class="text-center">
          <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-question-circle text-yellow-600 text-3xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-800 mb-3">Quer mesmo sair?</h3>
          <p class="text-base text-gray-700 mb-6 leading-relaxed">
            Seus dados estão salvos! Você pode <strong>voltar depois</strong> e continuar de onde parou.
          </p>
          <div class="flex gap-3">
            <button 
              onclick="this.closest('.fixed').remove();"
              class="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-bold transition-all"
            >
              Continuar Preenchendo
            </button>
            <button 
              onclick="confirmClose();"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-xl font-bold transition-all"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  } else {
    state.liderancaFormMode = false;
    state.liderancaFormData = {};
    state.liderancaEditando = null;
    render();
  }
}

function confirmClose() {
  document.querySelector('.fixed')?.remove();
  state.liderancaFormMode = false;
  state.liderancaFormData = {};
  state.liderancaEditando = null;
  render();
}

function applyFormMasks() {
  // Máscara CPF
  const cpfInput = document.getElementById('form-cpf');
  if (cpfInput) {
    cpfInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      e.target.value = value;
    });
  }
  
  // Máscara Celular
  const celularInput = document.getElementById('form-celular');
  if (celularInput) {
    celularInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/^(\d{2})(\d)/, '($1) $2');
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
      e.target.value = value;
    });
  }
  
  // Máscara Telefone Fixo
  const telefoneInput = document.getElementById('form-telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/^(\d{2})(\d)/, '($1) $2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
      e.target.value = value;
    });
  }
  
  // Máscara CEP
  const cepInput = document.getElementById('form-cep');
  if (cepInput) {
    cepInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
      e.target.value = value;
    });
  }
}

function attachFormEvents() {
  const form = document.getElementById('lideranca-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await submitLiderancaForm();
    });
  }
  
  // Validação em tempo real para CPF
  const cpfInput = document.getElementById('form-cpf');
  if (cpfInput) {
    cpfInput.addEventListener('blur', () => {
      const cpf = cpfInput.value.replace(/\D/g, '');
      if (cpf.length > 0 && cpf.length !== 11) {
        showFieldError(cpfInput, 'O CPF precisa ter 11 números');
      } else {
        clearFieldError(cpfInput);
      }
    });
  }
  
  // Validação em tempo real para celular
  const celularInput = document.getElementById('form-celular');
  if (celularInput) {
    celularInput.addEventListener('blur', () => {
      const celular = celularInput.value.replace(/\D/g, '');
      if (celular.length > 0 && celular.length < 10) {
        showFieldError(celularInput, 'O celular precisa ter pelo menos 10 números');
      } else {
        clearFieldError(celularInput);
      }
    });
  }
  
  // Validação em tempo real para CEP
  const cepInput = document.getElementById('form-cep');
  if (cepInput) {
    cepInput.addEventListener('blur', () => {
      const cep = cepInput.value.replace(/\D/g, '');
      if (cep.length > 0 && cep.length !== 8) {
        showFieldError(cepInput, 'O CEP precisa ter 8 números');
      } else {
        clearFieldError(cepInput);
      }
    });
  }
}

function showFieldError(input, message) {
  // Remove erro anterior
  clearFieldError(input);
  
  // Adiciona borda vermelha
  input.classList.add('border-red-500', 'border-2');
  input.classList.remove('border-gray-300');
  
  // Cria mensagem de erro
  const errorMsg = document.createElement('p');
  errorMsg.className = 'text-green-600 text-sm mt-2 flex items-center gap-2 font-semibold field-error';
  errorMsg.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
  input.parentElement.appendChild(errorMsg);
}

function clearFieldError(input) {
  // Remove borda vermelha
  input.classList.remove('border-red-500', 'border-2');
  input.classList.add('border-gray-300');
  
  // Remove mensagem de erro
  const errorMsg = input.parentElement.querySelector('.field-error');
  if (errorMsg) {
    errorMsg.remove();
  }
}

function updateInfluenciaValue(value) {
  const display = document.getElementById('influencia-value');
  if (display) {
    display.textContent = value;
  }
}

let autoSaveTimeout;
function autoSaveLideranca() {
  clearTimeout(autoSaveTimeout);
  autoSaveTimeout = setTimeout(() => {
    const formData = collectFormData();
    localStorage.setItem('lideranca_draft', JSON.stringify(formData));
    showSaveIndicator();
  }, 1000);
}

function showSaveIndicator() {
  const indicator = document.getElementById('save-indicator');
  if (indicator) {
    indicator.classList.remove('hidden');
    setTimeout(() => {
      indicator.classList.add('hidden');
    }, 3000);
  }
}

function loadSavedFormData() {
  const saved = localStorage.getItem('lideranca_draft');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      
      // Preencher campos
      Object.keys(data).forEach(key => {
        const input = document.getElementById(`form-${key}`);
        if (input && data[key]) {
          input.value = data[key];
        }
      });
      
      // Atualizar display de influência
      if (data.influencia) {
        updateInfluenciaValue(data.influencia);
      }
    } catch (e) {
      console.error('Erro ao carregar rascunho:', e);
    }
  }
}

function collectFormData() {
  // Mapear campos do formulário para a estrutura da tabela
  const nome = document.getElementById('form-nome')?.value || '';
  const telefone = document.getElementById('form-celular')?.value.replace(/\D/g, '') || 
                   document.getElementById('form-telefone')?.value.replace(/\D/g, '') || '';
  const email = document.getElementById('form-email')?.value || '';
  const municipio = document.getElementById('form-cidade')?.value || '';
  const bairro = document.getElementById('form-bairro')?.value || '';
  const zona_eleitoral = document.getElementById('form-zona')?.value || '';
  const nivel_influencia = document.getElementById('form-nivel-influencia')?.value || 'media';
  const qtd_influenciados = parseInt(document.getElementById('form-influencia')?.value || '0') || 0;
  const qtd_eleitores = parseInt(document.getElementById('form-qtd-eleitores')?.value || '0') || 0;
  const territorio_id = parseInt(document.getElementById('form-territorio')?.value) || null;
  const observacoes = document.getElementById('form-observacoes')?.value || '';
  
  return {
    nome,
    telefone,
    email,
    municipio,
    bairro,
    zona_eleitoral,
    nivel_influencia,
    qtd_influenciados,
    qtd_eleitores,
    territorio_id,
    observacoes
  };
}

async function buscarCEP() {
  const cepInput = document.getElementById('form-cep');
  const cep = cepInput?.value.replace(/\D/g, '');
  
  if (!cep || cep.length !== 8) return;
  
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    
    if (!data.erro) {
      document.getElementById('form-logradouro').value = data.logradouro || '';
      document.getElementById('form-bairro').value = data.bairro || '';
      document.getElementById('form-cidade').value = data.localidade || '';
      document.getElementById('form-estado').value = data.uf || '';
      
      // Focar no número
      document.getElementById('form-numero')?.focus();
      
      autoSaveLideranca();
    }
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
  }
}

async function submitLiderancaForm() {
  const formData = collectFormData();
  
  // Validações básicas - apenas campos obrigatórios
  if (!formData.nome || formData.nome.trim().length < 3) {
    showValidationError('Por favor, informe o nome da liderança (mínimo 3 caracteres).', 'form-nome');
    return;
  }
  
  if (!formData.municipio || formData.municipio.trim().length < 3) {
    showValidationError('Por favor, informe o município.', 'form-cidade');
    return;
  }
  
  try {
    // Mostrar loading
    showLoadingMessage('Salvando liderança...');
    
    await addLideranca(formData);
    
    // Limpar rascunho
    localStorage.removeItem('lideranca_draft');
    
    // Fechar formulário
    state.liderancaFormMode = false;
    
    hideLoadingMessage();
    showSuccessMessage('✅ Liderança salva com sucesso!');
    
    setTimeout(() => {
      render();
    }, 1500);
  } catch (error) {
    console.error('Erro ao salvar:', error);
    hideLoadingMessage();
    showErrorMessage('❌ Erro ao salvar liderança. Tente novamente.');
  }
}

function showValidationError(message, fieldId) {
  // Criar modal de erro amigável
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
  modal.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
      <div class="text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-exclamation-circle text-green-600 text-3xl"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-3">Atenção!</h3>
        <p class="text-base text-gray-700 mb-6 leading-relaxed">${message}</p>
        <button 
          onclick="this.closest('.fixed').remove(); document.getElementById('${fieldId}')?.focus();"
          class="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all"
        >
          Entendi
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function showLoadingMessage(message) {
  const modal = document.createElement('div');
  modal.id = 'loading-modal';
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
      <div class="animate-spin w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"></div>
      <p class="text-lg text-gray-700 font-semibold">${message}</p>
    </div>
  `;
  document.body.appendChild(modal);
}

function hideLoadingMessage() {
  document.getElementById('loading-modal')?.remove();
}

function showSuccessMessage(message) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
  modal.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center animate-fadeIn">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <i class="fas fa-check-circle text-green-600 text-4xl"></i>
      </div>
      <p class="text-xl text-gray-800 font-bold leading-relaxed mb-6">${message}</p>
      <button 
        onclick="this.closest('.fixed').remove();"
        class="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all"
      >
        Fechar
      </button>
    </div>
  `;
  document.body.appendChild(modal);
}

function showErrorMessage(message) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
  modal.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
      <div class="text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-times-circle text-green-600 text-3xl"></i>
        </div>
        <p class="text-base text-gray-700 mb-6 leading-relaxed">${message}</p>
        <button 
          onclick="this.closest('.fixed').remove();"
          class="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all"
        >
          Fechar
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function showAddCoordenadorForm() {
  const nome = prompt('Nome do Coordenador:');
  const tipo = prompt('Tipo (regional, territorial, municipal):');
  const celular = prompt('Celular:');
  
  if (nome && tipo) {
    addCoordenador({ nome, tipo, celular });
  }
}

function showAddProfissionalForm() {
  const nome = prompt('Nome do Profissional:');
  const profissao = prompt('Profissão:');
  const celular = prompt('Celular:');
  
  if (nome && profissao) {
    addProfissional({ nome, profissao, celular });
  }
}

async function addDadosEleitorais(data) {
  try {
    data.candidato_id = state.candidato.id;
    await axios.post('/api/dados-eleitorais', data);
    showSuccessMessage('✅ Dados eleitorais salvos com sucesso!');
    await loadAllData();
    render();
  } catch (error) {
    console.error('Erro ao adicionar dados eleitorais:', error);
    showErrorMessage('Erro ao salvar dados eleitorais: ' + (error.response?.data?.error || error.message));
  }
}

async function addLideranca(data) {
  try {
    data.candidato_id = state.candidato.id;
    
    let response;
    if (state.liderancaEditando && state.liderancaEditando.id) {
      // Modo edição
      response = await axios.put(`/api/liderancas/${state.liderancaEditando.id}`, data);
      showSuccessMessage('✅ Liderança atualizada com sucesso!');
    } else {
      // Modo criação
      response = await axios.post('/api/liderancas', data);
      showSuccessMessage('✅ Liderança cadastrada com sucesso!');
    }
    
    // Recarregar dados e voltar para lista
    await loadAllData();
    state.currentModule = 'liderancas';
    state.liderancaFormMode = false;
    state.liderancaEditando = null;
    render();
  } catch (error) {
    console.error('Erro ao salvar liderança:', error);
    showErrorMessage('Erro ao salvar liderança: ' + (error.response?.data?.error || error.message));
  }
}

async function addCoordenador(data) {
  try {
    data.candidato_id = state.candidato.id;
    await axios.post('/api/coordenadores', data);
    showSuccessMessage('✅ Coordenador cadastrado com sucesso!');
    await loadAllData();
    render();
  } catch (error) {
    console.error('Erro ao adicionar coordenador:', error);
    showErrorMessage('Erro ao salvar coordenador: ' + (error.response?.data?.error || error.message));
  }
}

async function addProfissional(data) {
  try {
    data.candidato_id = state.candidato.id;
    await axios.post('/api/profissionais', data);
    showSuccessMessage('✅ Profissional cadastrado com sucesso!');
    await loadAllData();
    render();
  } catch (error) {
    console.error('Erro ao adicionar profissional:', error);
    showErrorMessage('Erro ao salvar profissional: ' + (error.response?.data?.error || error.message));
  }
}

async function deleteDadosEleitorais(id) {
  if (!confirm('Deseja realmente deletar este dado eleitoral?')) return;
  
  try {
    await axios.delete(`/api/dados-eleitorais/${id}`);
    await loadAllData();
    render();
  } catch (error) {
    alert('Erro ao deletar');
  }
}

async function editarLideranca(id) {
  try {
    const response = await axios.get(`/api/liderancas/${id}`);
    const lideranca = response.data;
    
    console.log('📝 Editando liderança:', lideranca);
    
    // Preencher o formulário com os dados da liderança
    state.liderancaEditando = lideranca;
    state.liderancaFormMode = true;
    render();
    
    // Preencher os campos do formulário após renderizar
    setTimeout(() => {
      if (document.getElementById('form-nome')) {
        document.getElementById('form-nome').value = lideranca.nome || '';
        document.getElementById('form-celular').value = lideranca.telefone || '';
        document.getElementById('form-email').value = lideranca.email || '';
        document.getElementById('form-cidade').value = lideranca.municipio || '';
        document.getElementById('form-bairro').value = lideranca.bairro || '';
        document.getElementById('form-zona').value = lideranca.zona_eleitoral || '';
        document.getElementById('form-influencia').value = lideranca.qtd_influenciados || 50;
        if (document.getElementById('form-qtd-eleitores')) {
          document.getElementById('form-qtd-eleitores').value = lideranca.qtd_eleitores || 0;
        }
        if (document.getElementById('form-territorio')) {
          document.getElementById('form-territorio').value = lideranca.territorio_id || '';
        }
        document.getElementById('form-observacoes').value = lideranca.observacoes || '';
        
        // Atualizar valor visual do slider
        if (window.updateInfluenciaValue) {
          updateInfluenciaValue(lideranca.qtd_influenciados || 50);
        }
      }
    }, 200);
  } catch (error) {
    console.error('❌ Erro ao carregar liderança para edição:', error);
    showErrorMessage('Erro ao carregar liderança: ' + (error.response?.data?.error || error.message));
  }
}

async function deleteLideranca(id) {
  if (!confirm('Deseja realmente deletar esta liderança?')) return;
  
  try {
    await axios.delete(`/api/liderancas/${id}`);
    await loadAllData();
    render();
  } catch (error) {
    alert('Erro ao deletar');
  }
}

async function deleteCoordenador(id) {
  if (!confirm('Deseja realmente deletar este coordenador?')) return;
  
  try {
    await axios.delete(`/api/coordenadores/${id}`);
    await loadAllData();
    render();
  } catch (error) {
    alert('Erro ao deletar');
  }
}

// ============= FUNÇÕES: ELEITORES =============

function abrirModalEleitor(eleitorId = null) {
  state.modalAtivo = 'eleitor';
  state.modalEditId = eleitorId;
  
  if (eleitorId) {
    // Buscar dados do eleitor para edição
    const eleitor = state.data.eleitores.find(e => e.id == eleitorId);
    if (eleitor) {
      state.modalData = {...eleitor};
    }
  } else {
    state.modalData = {};
  }
  
  renderModalEleitor();
}

function renderModalEleitor() {
  const isEdit = !!state.modalEditId;
  const data = state.modalData || {};
  const liderancas = state.data.liderancas || [];
  
  const modalHtml = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="if(event.target === this) fecharModal()">
      <div class="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-white">
              <i class="fas fa-user mr-3"></i>
              ${isEdit ? 'Editar Eleitor' : 'Cadastrar Novo Eleitor'}
            </h2>
            <button onclick="fecharModal()" class="text-white hover:text-gray-200 text-2xl">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <!-- Form -->
        <form onsubmit="salvarEleitor(event)" class="p-6 space-y-6">
          <!-- Seção 1: Identificação -->
          <div class="bg-blue-50 rounded-xl p-6">
            <h3 class="font-semibold text-gray-800 mb-4 flex items-center">
              <i class="fas fa-id-card mr-2 text-blue-600"></i>
              Identificação
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo <span class="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="modal-eleitor-nome"
                  value="${data.nome || ''}"
                  placeholder="Nome completo do eleitor"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">CPF</label>
                <input 
                  type="text" 
                  id="modal-eleitor-cpf"
                  value="${data.cpf || ''}"
                  placeholder="000.000.000-00"
                  maxlength="14"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input 
                  type="tel" 
                  id="modal-eleitor-telefone"
                  value="${data.telefone || ''}"
                  placeholder="(00) 00000-0000"
                  maxlength="15"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                <input 
                  type="email" 
                  id="modal-eleitor-email"
                  value="${data.email || ''}"
                  placeholder="exemplo@email.com"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          <!-- Seção 2: Hierarquia -->
          <div class="bg-purple-50 rounded-xl p-6">
            <h3 class="font-semibold text-gray-800 mb-4 flex items-center">
              <i class="fas fa-sitemap mr-2 text-purple-600"></i>
              Hierarquia
            </h3>
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Liderança <span class="text-red-500">*</span>
                </label>
                <select 
                  id="modal-eleitor-lideranca"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecione uma liderança</option>
                  ${liderancas.map(l => `
                    <option value="${l.id}" ${data.lideranca_id == l.id ? 'selected' : ''}>
                      ${l.nome} - ${l.municipio}
                    </option>
                  `).join('')}
                </select>
                <p class="text-xs text-gray-500 mt-1">
                  <i class="fas fa-info-circle mr-1"></i>
                  O coordenador será vinculado automaticamente
                </p>
              </div>
            </div>
          </div>
          
          <!-- Seção 3: Localização -->
          <div class="bg-green-50 rounded-xl p-6">
            <h3 class="font-semibold text-gray-800 mb-4 flex items-center">
              <i class="fas fa-map-marker-alt mr-2 text-green-600"></i>
              Localização
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Município <span class="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="modal-eleitor-municipio"
                  value="${data.municipio || ''}"
                  placeholder="Nome do município"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Bairro</label>
                <input 
                  type="text" 
                  id="modal-eleitor-bairro"
                  value="${data.bairro || ''}"
                  placeholder="Bairro"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Zona Eleitoral</label>
                <input 
                  type="text" 
                  id="modal-eleitor-zona"
                  value="${data.zona || ''}"
                  placeholder="Ex: 001"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Seção Eleitoral</label>
                <input 
                  type="text" 
                  id="modal-eleitor-secao"
                  value="${data.secao || ''}"
                  placeholder="Ex: 0123"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Título de Eleitor</label>
                <input 
                  type="text" 
                  id="modal-eleitor-titulo"
                  value="${data.titulo_eleitor || ''}"
                  placeholder="Número do título"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Local de Votação</label>
                <input 
                  type="text" 
                  id="modal-eleitor-local-votacao"
                  value="${data.local_votacao || ''}"
                  placeholder="Escola, clube, etc"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          <!-- Seção 4: Engajamento -->
          <div class="bg-orange-50 rounded-xl p-6">
            <h3 class="font-semibold text-gray-800 mb-4 flex items-center">
              <i class="fas fa-chart-line mr-2 text-orange-600"></i>
              Engajamento
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Status de Apoio</label>
                <select 
                  id="modal-eleitor-status-apoio"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="simpatizante" ${(data.status_apoio || 'simpatizante') === 'simpatizante' ? 'selected' : ''}>👋 Simpatizante</option>
                  <option value="apoiador" ${data.status_apoio === 'apoiador' ? 'selected' : ''}>🤝 Apoiador</option>
                  <option value="militante" ${data.status_apoio === 'militante' ? 'selected' : ''}>⭐ Militante</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nível de Engajamento</label>
                <select 
                  id="modal-eleitor-nivel-engajamento"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="baixo" ${(data.nivel_engajamento || 'baixo') === 'baixo' ? 'selected' : ''}>Baixo</option>
                  <option value="medio" ${data.nivel_engajamento === 'medio' ? 'selected' : ''}>Médio</option>
                  <option value="alto" ${data.nivel_engajamento === 'alto' ? 'selected' : ''}>Alto</option>
                </select>
              </div>
              
              <div>
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="modal-eleitor-confirmado"
                    ${data.confirmado === 1 ? 'checked' : ''}
                    class="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
                  />
                  <span class="text-sm font-medium text-gray-700">Eleitor confirmado</span>
                </label>
              </div>
              
              <div>
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="modal-eleitor-compareceu"
                    ${data.compareceu_evento === 1 ? 'checked' : ''}
                    class="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
                  />
                  <span class="text-sm font-medium text-gray-700">Compareceu a evento</span>
                </label>
              </div>
            </div>
          </div>
          
          <!-- Seção 5: Observações -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Observações</label>
            <textarea 
              id="modal-eleitor-observacoes"
              rows="3"
              placeholder="Informações adicionais sobre o eleitor..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >${data.observacoes || ''}</textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tags (separadas por vírgula)</label>
            <input 
              type="text" 
              id="modal-eleitor-tags"
              value="${data.tags || ''}"
              placeholder="whatsapp, facebook, lider-comunitario"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <!-- Botões -->
          <div class="flex gap-4 pt-4">
            <button 
              type="button"
              onclick="fecharModal()"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <i class="fas fa-times mr-2"></i>Cancelar
            </button>
            <button 
              type="submit"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              <i class="fas fa-save mr-2"></i>${isEdit ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
  
  // Inserir modal no DOM
  let modalContainer = document.getElementById('modal-container');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    document.body.appendChild(modalContainer);
  }
  modalContainer.innerHTML = modalHtml;
  
  // Aplicar máscaras após renderizar
  setTimeout(() => {
    const cpfInput = document.getElementById('modal-eleitor-cpf');
    const telefoneInput = document.getElementById('modal-eleitor-telefone');
    
    if (cpfInput) {
      cpfInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
      });
    }
    
    if (telefoneInput) {
      telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = value;
      });
    }
  }, 100);
}

async function salvarEleitor(event) {
  event.preventDefault();
  
  const eleitorData = {
    candidato_id: state.candidato.id,
    lideranca_id: document.getElementById('modal-eleitor-lideranca').value,
    nome: document.getElementById('modal-eleitor-nome').value,
    cpf: document.getElementById('modal-eleitor-cpf')?.value?.replace(/\D/g, '') || null,
    telefone: document.getElementById('modal-eleitor-telefone')?.value?.replace(/\D/g, '') || null,
    email: document.getElementById('modal-eleitor-email').value || null,
    municipio: document.getElementById('modal-eleitor-municipio').value,
    bairro: document.getElementById('modal-eleitor-bairro').value || null,
    zona: document.getElementById('modal-eleitor-zona').value || null,
    secao: document.getElementById('modal-eleitor-secao').value || null,
    titulo_eleitor: document.getElementById('modal-eleitor-titulo').value || null,
    local_votacao: document.getElementById('modal-eleitor-local-votacao').value || null,
    status_apoio: document.getElementById('modal-eleitor-status-apoio').value,
    nivel_engajamento: document.getElementById('modal-eleitor-nivel-engajamento').value,
    confirmado: document.getElementById('modal-eleitor-confirmado').checked ? 1 : 0,
    compareceu_evento: document.getElementById('modal-eleitor-compareceu').checked ? 1 : 0,
    observacoes: document.getElementById('modal-eleitor-observacoes').value || null,
    tags: document.getElementById('modal-eleitor-tags').value || null
  };
  
  try {
    if (state.modalEditId) {
      // Atualizar eleitor existente
      await axios.put(`/api/eleitores/${state.modalEditId}`, eleitorData);
      showSuccessMessage('✅ Eleitor atualizado com sucesso!');
    } else {
      // Criar novo eleitor
      await axios.post('/api/eleitores', eleitorData);
      showSuccessMessage('✅ Eleitor cadastrado com sucesso!');
    }
    
    fecharModal();
    await loadAllData();
    render();
  } catch (error) {
    console.error('Erro ao salvar eleitor:', error);
    showErrorMessage('❌ ' + (error.response?.data?.error || 'Erro ao salvar eleitor'));
  }
}

async function visualizarEleitor(id) {
  const eleitor = state.data.eleitores.find(e => e.id == id);
  if (!eleitor) return;
  
  const statusBadge = eleitor.status_apoio === 'militante' ? '⭐ Militante' : 
                      eleitor.status_apoio === 'apoiador' ? '🤝 Apoiador' : 
                      '👋 Simpatizante';
  
  const modalHtml = `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onclick="if(event.target === this) fecharModal()">
      <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-white">
              <i class="fas fa-user mr-3"></i>Detalhes do Eleitor
            </h2>
            <button onclick="fecharModal()" class="text-white hover:text-gray-200 text-2xl">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">Nome</p>
              <p class="font-semibold">${eleitor.nome}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">CPF</p>
              <p class="font-semibold">${eleitor.cpf || 'N/A'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Telefone</p>
              <p class="font-semibold">${eleitor.telefone || 'N/A'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">E-mail</p>
              <p class="font-semibold">${eleitor.email || 'N/A'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Liderança</p>
              <p class="font-semibold">${eleitor.lideranca_nome || 'N/A'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Coordenador</p>
              <p class="font-semibold">${eleitor.coordenador_nome || 'N/A'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Município</p>
              <p class="font-semibold">${eleitor.municipio}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Bairro</p>
              <p class="font-semibold">${eleitor.bairro || 'N/A'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Zona / Seção</p>
              <p class="font-semibold">${eleitor.zona || 'N/A'} / ${eleitor.secao || 'N/A'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Título</p>
              <p class="font-semibold">${eleitor.titulo_eleitor || 'N/A'}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Status</p>
              <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full
                ${eleitor.status_apoio === 'militante' ? 'bg-orange-100 text-orange-800' : 
                  eleitor.status_apoio === 'apoiador' ? 'bg-purple-100 text-purple-800' : 
                  'bg-blue-100 text-blue-800'}">
                ${statusBadge}
              </span>
            </div>
            <div>
              <p class="text-sm text-gray-500">Confirmado</p>
              <p class="font-semibold">${eleitor.confirmado === 1 ? '✅ Sim' : '❌ Não'}</p>
            </div>
          </div>
          
          ${eleitor.observacoes ? `
            <div>
              <p class="text-sm text-gray-500">Observações</p>
              <p class="font-semibold">${eleitor.observacoes}</p>
            </div>
          ` : ''}
          
          ${eleitor.tags ? `
            <div>
              <p class="text-sm text-gray-500">Tags</p>
              <div class="flex flex-wrap gap-2 mt-2">
                ${eleitor.tags.split(',').map(tag => `
                  <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    ${tag.trim()}
                  </span>
                `).join('')}
              </div>
            </div>
          ` : ''}
          
          <div class="flex gap-4 pt-4">
            <button 
              onclick="fecharModal()"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <i class="fas fa-times mr-2"></i>Fechar
            </button>
            <button 
              onclick="fecharModal(); editarEleitor(${eleitor.id})"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <i class="fas fa-edit mr-2"></i>Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  let modalContainer = document.getElementById('modal-container');
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    document.body.appendChild(modalContainer);
  }
  modalContainer.innerHTML = modalHtml;
}

function editarEleitor(id) {
  abrirModalEleitor(id);
}

async function deletarEleitor(id, nome) {
  if (!confirm(`Deseja realmente deletar o eleitor "${nome}"?`)) return;
  
  try {
    await axios.delete(`/api/eleitores/${id}`);
    showSuccessMessage('✅ Eleitor deletado com sucesso!');
    await loadAllData();
    render();
  } catch (error) {
    console.error('Erro ao deletar eleitor:', error);
    showErrorMessage('❌ Erro ao deletar eleitor');
  }
}

function aplicarFiltrosEleitores() {
  state.filtroEleitorLideranca = document.getElementById('filtro-eleitor-lideranca').value;
  state.filtroEleitorStatus = document.getElementById('filtro-eleitor-status').value;
  state.filtroEleitorMunicipio = document.getElementById('filtro-eleitor-municipio').value;
  render();
}

function limparFiltrosEleitores() {
  state.filtroEleitorLideranca = 'todos';
  state.filtroEleitorStatus = 'todos';
  state.filtroEleitorMunicipio = 'todos';
  render();
}

async function deleteProfissional(id) {
  if (!confirm('Deseja realmente deletar este profissional?')) return;
  
  try {
    await axios.delete(`/api/profissionais/${id}`);
    await loadAllData();
    render();
  } catch (error) {
    alert('Erro ao deletar');
  }
}

function filterCoord(tipo) {
  const cards = document.querySelectorAll('#coordenadores-list .card');
  cards.forEach(card => {
    if (tipo === 'todos' || card.dataset.tipo === tipo) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// ============= FUNÇÕES DE USUÁRIOS =============

async function abrirModalUsuario(id = null) {
  state.modalEditId = id;
  const modal = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  
  if (id) {
    // Carregar dados do usuário para edição
    const usuario = state.data.usuarios.find(u => u.id === id);
    if (usuario) {
      modalContent.innerHTML = renderModalUsuario();
      modal.classList.remove('hidden');
      carregarDadosModal(usuario);
    }
  } else {
    modalContent.innerHTML = renderModalUsuario();
    modal.classList.remove('hidden');
  }
}

function renderModalUsuario() {
  const titulo = state.modalEditId ? 'Editar Usuário' : 'Novo Usuário';
  const botaoTexto = state.modalEditId ? 'Salvar Alterações' : 'Criar Usuário';
  
  return `
    <form id="form-modal" onsubmit="salvarUsuario(event)" class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <i class="fas fa-user-plus text-green-600"></i>
          ${titulo}
        </h2>
        <button type="button" onclick="fecharModal()" class="text-gray-400 hover:text-gray-600 text-2xl">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <!-- Dados Pessoais -->
      <div class="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-indigo-800 mb-4 flex items-center gap-2">
          <i class="fas fa-user"></i>
          Dados Pessoais
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo <span class="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              id="modal-nome"
              placeholder="Digite o nome completo"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Email <span class="text-red-500">*</span>
            </label>
            <input 
              type="email" 
              id="modal-email"
              placeholder="email@exemplo.com"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              CPF
            </label>
            <input 
              type="text" 
              id="modal-cpf"
              placeholder="000.000.000-00"
              maxlength="14"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
            >
          </div>
          
          ${!state.modalEditId ? `
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Senha <span class="text-red-500">*</span>
              </label>
              <input 
                type="password" 
                id="modal-senha"
                placeholder="Digite a senha"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
                required
              >
            </div>
          ` : ''}
        </div>
      </div>
      
      <!-- Informações Políticas -->
      <div class="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 mb-6">
        <h3 class="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
          <i class="fas fa-landmark"></i>
          Informações Políticas (Opcional)
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Partido</label>
            <input 
              type="text" 
              id="modal-partido"
              placeholder="Ex: PT, PSDB, MDB"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
            <input 
              type="text" 
              id="modal-cargo"
              placeholder="Ex: Vereador, Deputado"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Município</label>
            <input 
              type="text" 
              id="modal-municipio"
              placeholder="Digite o município"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select 
              id="modal-estado"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
            >
              <option value="">Selecione</option>
              <option value="BA">Bahia</option>
              <option value="SP">São Paulo</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="MG">Minas Gerais</option>
              <!-- Adicionar mais estados conforme necessário -->
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
            <input 
              type="tel" 
              id="modal-telefone"
              placeholder="(00) 00000-0000"
              maxlength="15"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select 
              id="modal-status"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
            >
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="flex gap-4 justify-end">
        <button 
          type="button" 
          onclick="fecharModal()"
          class="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg"
        >
          <i class="fas fa-save mr-2"></i>${botaoTexto}
        </button>
      </div>
    </form>
  `;
}

async function salvarUsuario(e) {
  e.preventDefault();
  
  showLoadingMessage('Salvando usuário...');
  
  try {
    const dados = {
      nome: document.getElementById('modal-nome').value,
      email: document.getElementById('modal-email').value,
      cpf: document.getElementById('modal-cpf')?.value.replace(/\D/g, '') || '',
      partido: document.getElementById('modal-partido')?.value || '',
      cargo: document.getElementById('modal-cargo')?.value || '',
      municipio: document.getElementById('modal-municipio')?.value || '',
      estado: document.getElementById('modal-estado')?.value || '',
      telefone: document.getElementById('modal-telefone')?.value.replace(/\D/g, '') || '',
      status: document.getElementById('modal-status')?.value || 'ativo'
    };
    
    if (!state.modalEditId) {
      // Criando novo usuário
      dados.senha = document.getElementById('modal-senha').value;
      await axios.post('/api/usuarios', dados);
    } else {
      // Editando usuário existente
      await axios.put(`/api/usuarios/${state.modalEditId}`, dados);
    }
    
    showSuccessMessage('✅ Usuário salvo com sucesso!');
    await loadAllData();
    fecharModal();
    state.currentModule = 'usuarios';
    render();
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    showErrorMessage('Erro ao salvar usuário: ' + (error.response?.data?.error || error.message));
  }
}

async function editarUsuario(id) {
  await abrirModalUsuario(id);
}

async function toggleStatusUsuario(id, statusAtual) {
  const novoStatus = statusAtual === 'ativo' ? 'inativo' : 'ativo';
  const acao = novoStatus === 'ativo' ? 'ativar' : 'desativar';
  
  if (!confirm(`Deseja realmente ${acao} este usuário?`)) return;
  
  try {
    await axios.put(`/api/usuarios/${id}`, { status: novoStatus });
    showSuccessMessage(`✅ Usuário ${acao === 'ativar' ? 'ativado' : 'desativado'} com sucesso!`);
    await loadAllData();
    render();
  } catch (error) {
    showErrorMessage('Erro ao atualizar status: ' + (error.response?.data?.error || error.message));
  }
}

async function resetarSenhaUsuario(id) {
  const novaSenha = prompt('Digite a nova senha para o usuário:');
  if (!novaSenha) return;
  
  try {
    await axios.post(`/api/usuarios/${id}/resetar-senha`, { senha: novaSenha });
    showSuccessMessage('✅ Senha resetada com sucesso!');
  } catch (error) {
    showErrorMessage('Erro ao resetar senha: ' + (error.response?.data?.error || error.message));
  }
}

async function deleteUsuario(id) {
  if (!confirm('Deseja realmente deletar este usuário? Esta ação não pode ser desfeita!')) return;
  
  try {
    await axios.delete(`/api/usuarios/${id}`);
    showSuccessMessage('✅ Usuário deletado com sucesso!');
    await loadAllData();
    render();
  } catch (error) {
    showErrorMessage('Erro ao deletar usuário: ' + (error.response?.data?.error || error.message));
  }
}

// ============= FUNÇÕES DE AGENDA =============

function showAddAgendaForm() {
  const titulo = prompt('Título do Evento:');
  const descricao = prompt('Descrição:');
  const tipo = prompt('Tipo (reuniao, visita, evento, tarefa, ligacao):');
  const dataInicio = prompt('Data/Hora (YYYY-MM-DD HH:MM):');
  const local = prompt('Local:');
  const prioridade = prompt('Prioridade (alta, media, baixa):');
  
  if (titulo && tipo && dataInicio) {
    addAgenda({ 
      titulo, 
      descricao, 
      tipo, 
      data_inicio: new Date(dataInicio).toISOString(), 
      local,
      prioridade: prioridade || 'media'
    });
  }
}

async function addAgenda(data) {
  try {
    data.candidato_id = state.candidato.id;
    await axios.post('/api/agenda', data);
    showSuccessMessage('✅ Evento criado com sucesso!');
    await loadAllData();
    render();
  } catch (error) {
    console.error('Erro ao adicionar evento:', error);
    showErrorMessage('Erro ao criar evento: ' + (error.response?.data?.error || error.message));
  }
}

async function deleteAgenda(id) {
  if (!confirm('Deseja realmente deletar este evento?')) return;
  
  try {
    await axios.delete(`/api/agenda/${id}`);
    await loadAllData();
    render();
  } catch (error) {
    alert('Erro ao deletar evento');
  }
}

async function updateAgendaStatus(id, novoStatus) {
  try {
    const evento = state.data.agenda.find(e => e.id === id);
    if (!evento) return;
    
    await axios.put(`/api/agenda/${id}`, { ...evento, status: novoStatus });
    await loadAllData();
    render();
  } catch (error) {
    alert('Erro ao atualizar status do evento');
  }
}

function filterAgenda(status) {
  const cards = document.querySelectorAll('#agenda-list .card');
  cards.forEach(card => {
    if (status === 'todos' || card.dataset.status === status) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// ============= FUNÇÕES DE RELATÓRIOS =============

// ===== FUNÇÕES DE RELATÓRIOS TSE =====

async function abrirRelatorio(tipo) {
  state.relatorioAtivo = tipo;
  state.currentModule = 'relatorios';
  render();
  
  // Carregar dados do relatório
  await carregarDadosRelatorio(tipo);
}

function fecharRelatorio() {
  state.relatorioAtivo = null;
  render();
}

async function carregarDadosRelatorio(tipo) {
  const candidatoId = state.candidato.id;
  
  try {
    switch(tipo) {
      case 'cobertura':
        const cobertura = await axios.get(`/api/relatorios/cobertura-municipio?candidato_id=${candidatoId}`);
        state.relatorioData = cobertura.data;
        break;
        
      case 'top-municipios':
        const top = await axios.get(`/api/relatorios/top-municipios?candidato_id=${candidatoId}&limit=20`);
        state.relatorioData = top.data;
        break;
        
      case 'criticos':
        const criticos = await axios.get(`/api/relatorios/municipios-criticos?candidato_id=${candidatoId}`);
        state.relatorioData = criticos.data;
        break;
        

      case 'zonas':
        const zonas = await axios.get(`/api/relatorios/analise-zonas?candidato_id=${candidatoId}`);
        state.relatorioData = zonas.data;
        break;
        
      case 'alertas':
        const alertas = await axios.get(`/api/relatorios/alertas?candidato_id=${candidatoId}`);
        state.relatorioData = alertas.data;
        break;
        

        
      case 'perfil-eleitorado':
        const perfil = await axios.get(`/api/analise/perfil-eleitorado?uf=BA`);
        state.relatorioData = perfil.data;
        break;
        
      case 'municipios-prioritarios':
        const prioritarios = await axios.get(`/api/analise/municipios-prioritarios?candidato_id=${candidatoId}&uf=BA`);
        state.relatorioData = prioritarios.data;
        break;
        
      case 'perfil-vs-cobertura':
        const gaps = await axios.get(`/api/analise/perfil-vs-cobertura?candidato_id=${candidatoId}&uf=BA`);
        state.relatorioData = gaps.data;
        break;
    }
    
    render();
  } catch (error) {
    console.error('Erro ao carregar relatório:', error);
    showErrorMessage('Erro ao carregar dados do relatório');
  }
}

async function calcularMetricas() {
  showLoadingMessage('Calculando métricas...');
  
  try {
    const response = await axios.post('/api/relatorios/calcular-metricas', {
      candidato_id: state.candidato.id
    });
    
    hideLoadingMessage();
    
    if (response.data.success) {
      showSuccessMessage(`✅ Métricas atualizadas! ${response.data.alertas_criados} novos alertas criados.`);
      await carregarResumoGeral();
      render();
    }
  } catch (error) {
    hideLoadingMessage();
    showErrorMessage('Erro ao calcular métricas');
  }
}

async function carregarResumoGeral() {
  try {
    const response = await axios.get(`/api/relatorios/resumo-candidato?candidato_id=${state.candidato.id}`);
    
    if (response.data.success) {
      const resumo = response.data.resumo;
      
      const html = `
        <div class="text-center p-4 bg-blue-50 rounded-lg">
          <div class="text-3xl font-bold text-blue-600 mb-1">${resumo.total_liderancas || 0}</div>
          <p class="text-sm text-gray-600">Lideranças Ativas</p>
        </div>
        
        <div class="text-center p-4 bg-green-50 rounded-lg">
          <div class="text-3xl font-bold text-green-600 mb-1">${resumo.municipios_cobertos || 0}</div>
          <p class="text-sm text-gray-600">Municípios com Cobertura</p>
        </div>
        
        <div class="text-center p-4 bg-purple-50 rounded-lg">
          <div class="text-3xl font-bold text-green-600 mb-1">${(resumo.influencia_total || 0).toLocaleString()}</div>
          <p class="text-sm text-gray-600">Votos Potenciais</p>
        </div>
        
        <div class="text-center p-4 bg-orange-50 rounded-lg">
          <div class="text-3xl font-bold text-orange-600 mb-1">${resumo.cobertura_percentual || 0}%</div>
          <p class="text-sm text-gray-600">Cobertura Total</p>
        </div>
      `;
      
      const elemento = document.getElementById('resumo-geral');
      if (elemento) {
        elemento.innerHTML = html;
      }
    }
  } catch (error) {
    console.error('Erro ao carregar resumo:', error);
  }
}

async function visualizarRelatorio(id) {
  try {
    const relatorio = state.data.relatorios.find(r => r.id === id);
    if (!relatorio) return;
    
    const dados = JSON.parse(relatorio.dados_json);
    
    // Criar modal simples para visualização
    let html = `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 9999; display: flex; align-items: center; justify-center;" onclick="this.remove()">
        <div style="background: white; padding: 2rem; border-radius: 1rem; max-width: 800px; max-height: 80vh; overflow-y: auto;" onclick="event.stopPropagation()">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h2 style="font-size: 1.5rem; font-weight: bold;">${relatorio.titulo}</h2>
            <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="background: #ef4444; color: white; padding: 0.5rem 1rem; border-radius: 0.5rem;">
              Fechar
            </button>
          </div>
          <p style="color: #666; margin-bottom: 1rem;">${relatorio.descricao}</p>
          <div style="background: #f3f4f6; padding: 1rem; border-radius: 0.5rem; font-family: monospace; white-space: pre-wrap;">
${JSON.stringify(dados, null, 2)}
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', html);
  } catch (error) {
    alert('Erro ao visualizar relatório');
  }
}

async function deleteRelatorio(id) {
  if (!confirm('Deseja realmente deletar este relatório?')) return;
  
  try {
    await axios.delete(`/api/relatorios/${id}`);
    await loadAllData();
    render();
  } catch (error) {
    alert('Erro ao deletar relatório');
  }
}

function attachLoginEvents() {
  document.getElementById('login-form').addEventListener('submit', login);
}

function attachDashboardEvents() {
  // Carregar resumo geral se estiver no módulo de relatórios
  if (state.currentModule === 'relatorios' && !state.relatorioAtivo) {
    setTimeout(() => {
      carregarResumoGeral();
    }, 500);
  }
}

// ============= FUNÇÕES DE DADOS TSE =============

function changeTSETab(tab) {
  state.tseTab = tab;
  render();
}

// ============= FUNÇÕES DE CONFIGURAÇÕES =============

// Função de upload de arquivos TSE
async function uploadArquivoTSE(tipo) {
  const inputId = `upload-${tipo}`;
  const fileInput = document.getElementById(inputId);
  const file = fileInput.files[0];
  
  if (!file) {
    showErrorMessage('Por favor, selecione um arquivo CSV');
    return;
  }
  
  // Validar extensão
  if (!file.name.endsWith('.csv')) {
    showErrorMessage('Por favor, selecione um arquivo CSV válido');
    return;
  }
  
  // Mostrar progresso
  const statusDiv = document.getElementById('upload-status');
  const progressBar = document.getElementById('upload-progress-bar');
  const progressText = document.getElementById('upload-progress');
  
  statusDiv.classList.remove('hidden');
  progressBar.style.width = '10%';
  progressText.textContent = '10%';
  
  showLoadingMessage(`Processando ${file.name}...`);
  
  // Ler arquivo
  const reader = new FileReader();
  
  reader.onload = async (e) => {
    try {
      progressBar.style.width = '30%';
      progressText.textContent = '30%';
      
      const csvContent = e.target.result;
      
      // Enviar para API
      progressBar.style.width = '50%';
      progressText.textContent = '50%';
      
      const response = await axios.post(`/api/tse/upload/${tipo}`, {
        candidato_id: state.candidato.id,
        csv_data: csvContent,
        filename: file.name
      });
      
      progressBar.style.width = '100%';
      progressText.textContent = '100%';
      
      if (response.data.success) {
        showSuccessMessage(`✅ Arquivo ${file.name} processado! ${response.data.registros_inseridos || 0} registros inseridos.`);
        
        // Limpar input
        fileInput.value = '';
        
        // Atualizar estatísticas
        await loadTSEStats();
        render();
        
        // Ocultar progresso após 2 segundos
        setTimeout(() => {
          statusDiv.classList.add('hidden');
          progressBar.style.width = '0%';
          progressText.textContent = '0%';
        }, 2000);
      }
    } catch (error) {
      console.error('Erro ao processar arquivo:', error);
      showErrorMessage(`Erro ao processar arquivo: ${error.response?.data?.error || error.message}`);
      
      // Resetar progresso
      progressBar.style.width = '0%';
      progressText.textContent = '0%';
      setTimeout(() => {
        statusDiv.classList.add('hidden');
      }, 3000);
    }
  };
  
  reader.onerror = () => {
    showErrorMessage('Erro ao ler arquivo');
    statusDiv.classList.add('hidden');
  };
  
  reader.readAsText(file);
}

async function atualizarEstatisticasTSE() {
  try {
    showLoadingMessage('Atualizando estatísticas TSE...');
    await loadTSEStats();
    showSuccessMessage('✅ Estatísticas atualizadas com sucesso!');
    render();
  } catch (error) {
    showErrorMessage('Erro ao atualizar estatísticas: ' + error.message);
  }
}

function visualizarDadosTSE() {
  // Redirecionar para o módulo de Relatórios
  state.currentModule = 'relatorios';
  render();
}

// ============= FUNÇÕES DE ANÁLISE ELEITORAL =============

function changeAnaliseTab(tab) {
  state.analiseTab = tab;
  render();
  
  // Renderizar gráficos após o DOM estar pronto
  if (tab === 'demografico' && state.data.analiseEleitoral?.demografico) {
    setTimeout(() => renderGraficoDemografico(state.data.analiseEleitoral.demografico), 100);
  }
}

function aplicarFiltrosAnalise() {
  // Apenas atualiza o state, o usuário precisa clicar em "Atualizar Dados"
  const uf = document.getElementById('filtro-uf')?.value || 'BA';
  const ano = document.getElementById('filtro-ano')?.value || '2022';
  
  console.log('Filtros selecionados:', { uf, ano });
}

async function carregarAnaliseEleitoral() {
  const candidatoId = state.candidato.id;
  const uf = document.getElementById('filtro-uf')?.value || 'BA';
  const ano = document.getElementById('filtro-ano')?.value || '2022';
  
  try {
    showLoadingMessage('Carregando análise eleitoral...');
    
    const response = await axios.get(`/api/analise-eleitoral/completa`, {
      params: { candidato_id: candidatoId, uf, ano }
    });
    
    if (response.data.success) {
      state.data.analiseEleitoral = response.data;
      state.analiseTab = 'municipios'; // Reset para primeira aba
      render();
      
      showSuccessMessage(`✅ Análise carregada com sucesso!\n\n${response.data.resumo.total_eleitores.toLocaleString('pt-BR')} eleitores em ${response.data.resumo.total_municipios} municípios`);
    }
  } catch (error) {
    console.error('Erro ao carregar análise:', error);
    showErrorMessage('Erro ao carregar análise eleitoral: ' + (error.response?.data?.error || error.message));
  }
}

function renderGraficoDemografico(demografico) {
  // Gráfico de Gênero
  const ctxGenero = document.getElementById('grafico-genero');
  if (ctxGenero && demografico.genero && demografico.genero.length > 0) {
    new Chart(ctxGenero, {
      type: 'pie',
      data: {
        labels: demografico.genero.map(g => g.genero),
        datasets: [{
          data: demografico.genero.map(g => g.total),
          backgroundColor: ['#3b82f6', '#ec4899', '#8b5cf6']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          title: { display: true, text: 'Distribuição por Gênero' }
        }
      }
    });
  }
  
  // Gráfico de Faixa Etária
  const ctxIdade = document.getElementById('grafico-idade');
  if (ctxIdade && demografico.faixa_etaria && demografico.faixa_etaria.length > 0) {
    new Chart(ctxIdade, {
      type: 'bar',
      data: {
        labels: demografico.faixa_etaria.map(f => f.faixa_etaria),
        datasets: [{
          label: 'Eleitores',
          data: demografico.faixa_etaria.map(f => f.total),
          backgroundColor: '#8b5cf6'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Distribuição por Faixa Etária' }
        }
      }
    });
  }
  
  // Gráfico de Escolaridade
  const ctxEscolaridade = document.getElementById('grafico-escolaridade');
  if (ctxEscolaridade && demografico.escolaridade && demografico.escolaridade.length > 0) {
    new Chart(ctxEscolaridade, {
      type: 'bar',
      data: {
        labels: demografico.escolaridade.map(e => e.grau_instrucao),
        datasets: [{
          label: 'Eleitores',
          data: demografico.escolaridade.map(e => e.total),
          backgroundColor: '#10b981'
        }]
      },
      options: {
        responsive: true,
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Distribuição por Escolaridade' }
        }
      }
    });
  }
}

async function limparDadosTSE() {
  if (!confirm('⚠️ ATENÇÃO!\n\nIsso vai deletar TODOS os dados TSE do estado atual.\n\nDeseja continuar?')) {
    return;
  }
  
  const estadoAtual = document.getElementById('estado-atual')?.textContent || 'BA';
  const uf = estadoAtual.split(' - ')[0].trim();
  
  if (!confirm(`Confirmar exclusão dos dados de ${uf}?`)) {
    return;
  }
  
  try {
    showLoadingMessage('Limpando dados...');
    
    const response = await axios.post('/api/tse/limpar', {
      uf: uf,
      ano: 2022
    });
    
    if (response.data.success) {
      showSuccessMessage(`✅ Dados de ${uf} removidos com sucesso!\n\nTotal de registros deletados: ${response.data.deleted || 0}`);
      
      // Atualizar contadores
      document.getElementById('total-registros').textContent = '0';
      
      // Recarregar estatísticas
      await loadTSEStats();
      render();
    }
  } catch (error) {
    showErrorMessage('Erro ao limpar dados: ' + (error.response?.data?.error || error.message));
  }
}

const tseFiles = {};

function handleFileSelect(tipo) {
  const fileInput = document.getElementById(`file-${tipo}`);
  const file = fileInput.files[0];
  
  if (file) {
    tseFiles[tipo] = file;
    document.getElementById(`status-${tipo}`).textContent = 'Pronto';
    document.getElementById(`status-${tipo}`).className = 'text-xs bg-green-100 text-green-700 px-2 py-1 rounded';
    document.getElementById(`btn-upload-${tipo}`).disabled = false;
  }
}

async function uploadTSEFile(tipo) {
  const file = tseFiles[tipo];
  if (!file) {
    alert('Selecione um arquivo primeiro');
    return;
  }
  
  const progressDiv = document.getElementById('upload-progress');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const statusSpan = document.getElementById(`status-${tipo}`);
  
  try {
    // Mostrar progresso
    progressDiv.classList.remove('hidden');
    progressBar.style.width = '0%';
    progressText.textContent = 'Lendo arquivo...';
    statusSpan.textContent = 'Enviando...';
    statusSpan.className = 'text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded';
    
    // Ler arquivo
    const text = await file.text();
    progressBar.style.width = '30%';
    progressText.textContent = 'Enviando para o servidor...';
    
    // Enviar para API
    const response = await axios.post('/api/tse/import', {
      tipo: tipo,
      filename: file.name,
      data: text,
      candidato_id: state.candidato.id
    });
    
    progressBar.style.width = '100%';
    progressText.textContent = `✅ ${response.data.inserted || 0} registros importados!`;
    statusSpan.textContent = 'Importado';
    statusSpan.className = 'text-xs bg-green-100 text-green-700 px-2 py-1 rounded';
    
    // Recarregar stats
    await loadTSEStats();
    
    setTimeout(() => {
      progressDiv.classList.add('hidden');
      render();
    }, 2000);
    
  } catch (error) {
    console.error('Erro no upload:', error);
    progressBar.style.width = '0%';
    progressText.textContent = '❌ Erro: ' + (error.response?.data?.error || error.message);
    statusSpan.textContent = 'Erro';
    statusSpan.className = 'text-xs bg-red-100 text-green-700 px-2 py-1 rounded';
    
    setTimeout(() => {
      progressDiv.classList.add('hidden');
    }, 5000);
  }
}

async function loadTSEStats() {
  try {
    const response = await axios.get('/api/tse/stats');
    state.data.tseStats = response.data;
  } catch (error) {
    console.error('Erro ao carregar stats TSE:', error);
  }
}

async function loadTSECandidatos() {
  try {
    const response = await axios.get('/api/tse/candidatos');
    state.data.tseCandidatos = response.data.candidatos || [];
  } catch (error) {
    console.error('Erro ao carregar candidatos TSE:', error);
  }
}

function filterTSECandidatos(query) {
  // TODO: Implementar filtro
  console.log('Filtrar:', query);
}

// ============= FUNÇÕES DE LOGIN AUXILIARES =============

function togglePasswordVisibility() {
  const senhaInput = document.getElementById('senha');
  const icon = document.getElementById('toggle-password-icon');
  
  if (senhaInput.type === 'password') {
    senhaInput.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    senhaInput.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

function showForgotPassword() {
  alert('📧 Funcionalidade de recuperação de senha será implementada em breve.\n\nPor enquanto, entre em contato com o administrador do sistema.');
}

function showRegisterForm() {
  // Renderizar formulário de registro
  const app = document.getElementById('app');
  app.innerHTML = renderRegisterForm();
  attachRegisterEvents();
}

function renderRegisterForm() {
  return `
    <div class="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <!-- Background animado -->
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-700">
        <div class="absolute inset-0 opacity-30">
          <div class="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div class="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>
      
      <!-- Container -->
      <div class="relative z-10 w-full max-w-2xl">
        <div class="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          <!-- Header -->
          <div class="text-center mb-8">
            <button onclick="backToLogin()" class="absolute top-8 left-8 text-gray-600 hover:text-gray-800 transition-colors">
              <i class="fas fa-arrow-left text-xl"></i>
            </button>
            
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <i class="fas fa-user-plus text-4xl text-white"></i>
            </div>
            <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Comece Agora
            </h1>
            <p class="text-gray-600 font-medium">Junte-se à plataforma profissional de gestão de campanhas</p>
            <div class="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500">
              <i class="fas fa-shield-check text-blue-600"></i>
              <span>Sua solicitação será analisada em até 24h</span>
            </div>
          </div>
          
          <!-- Mensagens -->
          <div id="register-error" class="hidden mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-green-700 rounded-xl shadow-sm">
            <div class="flex items-center gap-2">
              <i class="fas fa-exclamation-circle"></i>
              <span id="register-error-message" class="font-medium"></span>
            </div>
          </div>
          
          <div id="register-success" class="hidden mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-xl shadow-sm">
            <div class="flex items-center gap-2">
              <i class="fas fa-check-circle"></i>
              <span id="register-success-message" class="font-medium"></span>
            </div>
          </div>
          
          <!-- Formulário -->
          <form id="register-form" class="space-y-6">
            <!-- Tipo de Conta -->
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-3">
                <i class="fas fa-user-tag text-green-600 mr-2"></i>Tipo de Conta
              </label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <label class="relative">
                  <input type="radio" name="tipo" value="lideranca" required class="peer sr-only" />
                  <div class="p-4 border-2 border-gray-200 rounded-xl cursor-pointer peer-checked:border-indigo-500 peer-checked:bg-indigo-50 transition-all hover:border-indigo-300">
                    <i class="fas fa-users text-2xl text-green-600 mb-2"></i>
                    <p class="font-bold text-gray-800">Liderança</p>
                    <p class="text-xs text-gray-500">Líder comunitário</p>
                  </div>
                </label>
                
                <label class="relative">
                  <input type="radio" name="tipo" value="coordenador" class="peer sr-only" />
                  <div class="p-4 border-2 border-gray-200 rounded-xl cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 transition-all hover:border-purple-300">
                    <i class="fas fa-user-tie text-2xl text-green-600 mb-2"></i>
                    <p class="font-bold text-gray-800">Coordenador</p>
                    <p class="text-xs text-gray-500">Coordenador regional</p>
                  </div>
                </label>
              </div>
            </div>
            
            <!-- Dados Pessoais -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-user text-green-600 mr-2"></i>Nome Completo
                </label>
                <input 
                  type="text" 
                  id="register-nome" 
                  required
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-id-card text-green-600 mr-2"></i>CPF
                </label>
                <input 
                  type="text" 
                  id="register-cpf" 
                  required
                  maxlength="14"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                  placeholder="000.000.000-00"
                />
              </div>
            </div>
            
            <!-- Contato -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-envelope text-green-600 mr-2"></i>E-mail
                </label>
                <input 
                  type="email" 
                  id="register-email" 
                  required
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-phone text-green-600 mr-2"></i>Telefone
                </label>
                <input 
                  type="tel" 
                  id="register-telefone" 
                  required
                  maxlength="15"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>
            
            <!-- Localização -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-map-marker-alt text-green-600 mr-2"></i>Município
                </label>
                <input 
                  type="text" 
                  id="register-municipio" 
                  required
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                  placeholder="Sua cidade"
                />
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-map text-green-600 mr-2"></i>Estado
                </label>
                <select 
                  id="register-estado" 
                  required
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                >
                  <option value="">Selecione...</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>
            </div>
            
            <!-- Senha -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-lock text-green-600 mr-2"></i>Senha
                </label>
                <input 
                  type="password" 
                  id="register-senha" 
                  required
                  minlength="6"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">
                  <i class="fas fa-lock text-green-600 mr-2"></i>Confirmar Senha
                </label>
                <input 
                  type="password" 
                  id="register-senha-confirm" 
                  required
                  minlength="6"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                  placeholder="Repita a senha"
                />
              </div>
            </div>
            
            <!-- Botões -->
            <div class="flex gap-4">
              <button 
                type="button"
                onclick="backToLogin()"
                class="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                <i class="fas fa-arrow-left mr-2"></i>Voltar
              </button>
              
              <button 
                type="submit"
                class="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <i class="fas fa-paper-plane mr-2"></i>Enviar Solicitação
              </button>
            </div>
          </form>
          
          <!-- Info -->
          <div class="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-xl">
            <p class="text-sm text-blue-800">
              <i class="fas fa-info-circle mr-2"></i>
              <strong>Importante:</strong> Seu cadastro será enviado para aprovação. Você receberá um e-mail assim que for aprovado pelo administrador.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function backToLogin() {
  delete state.candidato;
  render();
}

function attachRegisterEvents() {
  const form = document.getElementById('register-form');
  
  // Máscaras
  const cpfInput = document.getElementById('register-cpf');
  const telefoneInput = document.getElementById('register-telefone');
  
  cpfInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
  });
  
  telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    e.target.value = value;
  });
  
  // Submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleRegister();
  });
}

async function handleRegister() {
  const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
  const nome = document.getElementById('register-nome').value;
  const cpf = document.getElementById('register-cpf').value;
  const email = document.getElementById('register-email').value;
  const telefone = document.getElementById('register-telefone').value;
  const municipio = document.getElementById('register-municipio').value;
  const estado = document.getElementById('register-estado').value;
  const senha = document.getElementById('register-senha').value;
  const senhaConfirm = document.getElementById('register-senha-confirm').value;
  
  // Validações
  if (!tipo) {
    showRegisterError('Por favor, selecione o tipo de conta');
    return;
  }
  
  if (senha !== senhaConfirm) {
    showRegisterError('As senhas não coincidem');
    return;
  }
  
  if (senha.length < 6) {
    showRegisterError('A senha deve ter no mínimo 6 caracteres');
    return;
  }
  
  try {
    const response = await axios.post('/api/solicitacoes', {
      tipo,
      nome,
      cpf: cpf.replace(/\D/g, ''),
      email,
      telefone: telefone.replace(/\D/g, ''),
      municipio,
      estado,
      senha,
      dados: {
        cpf: cpf.replace(/\D/g, ''),
        estado
      }
    });
    
    // Backend retorna { id, ...data }, então se tem id, foi sucesso
    if (response.data && response.data.id) {
      showRegisterSuccess('Solicitação enviada com sucesso! Aguarde a aprovação do administrador.');
      setTimeout(() => {
        backToLogin();
      }, 3000);
    } else {
      showRegisterError('Erro inesperado ao enviar solicitação. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro ao registrar:', error);
    showRegisterError(error.response?.data?.error || 'Erro ao enviar solicitação. Tente novamente.');
  }
}

function showRegisterError(message) {
  const errorDiv = document.getElementById('register-error');
  const errorMessage = document.getElementById('register-error-message');
  errorMessage.textContent = message;
  errorDiv.classList.remove('hidden');
  setTimeout(() => errorDiv.classList.add('hidden'), 5000);
}

function showRegisterSuccess(message) {
  const successDiv = document.getElementById('register-success');
  const successMessage = document.getElementById('register-success-message');
  successMessage.textContent = message;
  successDiv.classList.remove('hidden');
}

// ============= INICIALIZAÇÃO =============

// Renderizar ao carregar
render();
