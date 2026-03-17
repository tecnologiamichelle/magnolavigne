-- Migration 0001: Schema Inicial do Sistema V8.0
-- Data: 17/03/2026
-- Descrição: Tabelas principais do sistema de gestão de lideranças

-- ============================================
-- TABELA: candidatos (Usuários/Candidatos)
-- ============================================
CREATE TABLE IF NOT EXISTS candidatos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  nome TEXT NOT NULL,
  cargo TEXT,
  municipio TEXT,
  status TEXT DEFAULT 'ativo',
  tipo TEXT DEFAULT 'operacional', -- 'admin' ou 'operacional'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_candidatos_email ON candidatos(email);
CREATE INDEX IF NOT EXISTS idx_candidatos_tipo ON candidatos(tipo);

-- ============================================
-- TABELA: liderancas (Lideranças Cadastradas)
-- ============================================
CREATE TABLE IF NOT EXISTS liderancas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  telefone TEXT,
  email TEXT,
  municipio TEXT NOT NULL,
  bairro TEXT,
  zona_eleitoral TEXT,
  nivel_influencia TEXT DEFAULT 'media', -- 'alta', 'media', 'baixa'
  qtd_influenciados INTEGER DEFAULT 0,
  status TEXT DEFAULT 'ativo',
  observacoes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_liderancas_candidato ON liderancas(candidato_id);
CREATE INDEX IF NOT EXISTS idx_liderancas_municipio ON liderancas(municipio);
CREATE INDEX IF NOT EXISTS idx_liderancas_status ON liderancas(status);

-- ============================================
-- TABELA: coordenadores (Coordenadores de Campanha)
-- ============================================
CREATE TABLE IF NOT EXISTS coordenadores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  telefone TEXT,
  email TEXT,
  municipio TEXT NOT NULL,
  area_atuacao TEXT,
  status TEXT DEFAULT 'ativo',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_coordenadores_candidato ON coordenadores(candidato_id);
CREATE INDEX IF NOT EXISTS idx_coordenadores_municipio ON coordenadores(municipio);

-- ============================================
-- TABELA: profissionais (Profissionais de Apoio)
-- ============================================
CREATE TABLE IF NOT EXISTS profissionais (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  profissao TEXT NOT NULL,
  telefone TEXT,
  email TEXT,
  municipio TEXT,
  area_especialidade TEXT,
  status TEXT DEFAULT 'ativo',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_profissionais_candidato ON profissionais(candidato_id);
CREATE INDEX IF NOT EXISTS idx_profissionais_profissao ON profissionais(profissao);

-- ============================================
-- TABELA: agenda (Eventos e Compromissos)
-- ============================================
CREATE TABLE IF NOT EXISTS agenda (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  data_hora DATETIME NOT NULL,
  local TEXT,
  municipio TEXT,
  tipo TEXT DEFAULT 'reuniao', -- 'reuniao', 'evento', 'visita', 'entrevista'
  prioridade TEXT DEFAULT 'media', -- 'alta', 'media', 'baixa'
  status TEXT DEFAULT 'pendente', -- 'pendente', 'confirmado', 'cancelado', 'concluido'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_agenda_candidato ON agenda(candidato_id);
CREATE INDEX IF NOT EXISTS idx_agenda_data ON agenda(data_hora);
CREATE INDEX IF NOT EXISTS idx_agenda_status ON agenda(status);

-- ============================================
-- TABELA: solicitacoes (Solicitações de Aprovação)
-- ============================================
CREATE TABLE IF NOT EXISTS solicitacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER,
  tipo TEXT NOT NULL, -- 'lideranca', 'coordenador', 'profissional', 'ajuda_eleitoral'
  nome TEXT NOT NULL,
  telefone TEXT,
  email TEXT,
  municipio TEXT,
  dados_json TEXT, -- JSON com dados específicos do tipo
  status TEXT DEFAULT 'pendente', -- 'pendente', 'aprovado', 'rejeitado'
  avaliado_por INTEGER,
  motivo_rejeicao TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE SET NULL,
  FOREIGN KEY (avaliado_por) REFERENCES candidatos(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_solicitacoes_status ON solicitacoes(status);
CREATE INDEX IF NOT EXISTS idx_solicitacoes_tipo ON solicitacoes(tipo);

-- ============================================
-- TABELA: dados_eleitorais (Dados Eleitorais)
-- ============================================
CREATE TABLE IF NOT EXISTS dados_eleitorais (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  municipio TEXT NOT NULL,
  zona TEXT,
  secao TEXT,
  total_eleitores INTEGER DEFAULT 0,
  eleitores_apoio INTEGER DEFAULT 0,
  percentual_apoio REAL DEFAULT 0,
  observacoes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_dados_eleitorais_candidato ON dados_eleitorais(candidato_id);
CREATE INDEX IF NOT EXISTS idx_dados_eleitorais_municipio ON dados_eleitorais(municipio);

-- ============================================
-- TABELA: ajuda_eleitoral (Solicitações de Ajuda)
-- ============================================
CREATE TABLE IF NOT EXISTS ajuda_eleitoral (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  telefone TEXT,
  email TEXT,
  municipio TEXT,
  tipo_ajuda TEXT, -- 'titulo', 'transferencia', 'informacoes', 'outro'
  descricao TEXT,
  status TEXT DEFAULT 'pendente',
  atendido_por INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (atendido_por) REFERENCES candidatos(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_ajuda_status ON ajuda_eleitoral(status);
CREATE INDEX IF NOT EXISTS idx_ajuda_municipio ON ajuda_eleitoral(municipio);
