-- =====================================
-- MIGRAÇÃO V3: NOVOS MÓDULOS
-- Data: 11/04/2026
-- Descrição: Tabelas para Projetos, Gabinete e Finanças
-- =====================================

-- ===== MÓDULO: PROJETOS =====
CREATE TABLE IF NOT EXISTS projetos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  descricao TEXT,
  status TEXT DEFAULT 'planejamento' CHECK (status IN ('planejamento', 'em-andamento', 'concluido', 'cancelado')),
  prioridade TEXT DEFAULT 'media' CHECK (prioridade IN ('baixa', 'media', 'alta', 'urgente')),
  data_inicio DATE,
  data_fim DATE,
  progresso INTEGER DEFAULT 0,
  responsavel TEXT,
  orcamento REAL DEFAULT 0,
  gasto REAL DEFAULT 0,
  observacoes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id)
);

CREATE TABLE IF NOT EXISTS projetos_tarefas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  projeto_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  descricao TEXT,
  status TEXT DEFAULT 'pendente' CHECK (status IN ('pendente', 'em-andamento', 'concluida', 'cancelada')),
  responsavel TEXT,
  data_prazo DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE
);

-- ===== MÓDULO: GABINETE =====
CREATE TABLE IF NOT EXISTS gabinete_membros (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  cpf TEXT UNIQUE,
  cargo TEXT NOT NULL CHECK (cargo IN ('chefe', 'assessor', 'assistente', 'auxiliar', 'prestador')),
  area TEXT,
  telefone TEXT,
  email TEXT,
  data_admissao DATE,
  data_saida DATE,
  status TEXT DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo', 'afastado')),
  salario REAL DEFAULT 0,
  observacoes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id)
);

-- ===== MÓDULO: FINANÇAS =====
CREATE TABLE IF NOT EXISTS financas_emendas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  numero TEXT UNIQUE NOT NULL,
  descricao TEXT,
  valor REAL NOT NULL DEFAULT 0,
  tipo TEXT CHECK (tipo IN ('individual', 'bancada', 'comissao')),
  status TEXT DEFAULT 'proposta' CHECK (status IN ('proposta', 'aprovada', 'empenhada', 'paga', 'rejeitada')),
  municipio TEXT,
  area TEXT,
  data_apresentacao DATE,
  data_aprovacao DATE,
  observacoes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id)
);

CREATE TABLE IF NOT EXISTS financas_movimentacoes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('receita', 'despesa')),
  categoria TEXT NOT NULL,
  descricao TEXT NOT NULL,
  valor REAL NOT NULL DEFAULT 0,
  data DATE NOT NULL,
  forma_pagamento TEXT,
  comprovante TEXT,
  projeto_id INTEGER,
  emenda_id INTEGER,
  observacoes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id),
  FOREIGN KEY (projeto_id) REFERENCES projetos(id),
  FOREIGN KEY (emenda_id) REFERENCES financas_emendas(id)
);

CREATE TABLE IF NOT EXISTS financas_orcamento (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  ano INTEGER NOT NULL,
  mes INTEGER NOT NULL,
  categoria TEXT NOT NULL,
  valor_planejado REAL DEFAULT 0,
  valor_executado REAL DEFAULT 0,
  observacoes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id),
  UNIQUE(candidato_id, ano, mes, categoria)
);

-- ===== ÍNDICES PARA PERFORMANCE =====
CREATE INDEX IF NOT EXISTS idx_projetos_candidato ON projetos(candidato_id);
CREATE INDEX IF NOT EXISTS idx_projetos_status ON projetos(status);
CREATE INDEX IF NOT EXISTS idx_projetos_tarefas_projeto ON projetos_tarefas(projeto_id);

CREATE INDEX IF NOT EXISTS idx_gabinete_candidato ON gabinete_membros(candidato_id);
CREATE INDEX IF NOT EXISTS idx_gabinete_cargo ON gabinete_membros(cargo);
CREATE INDEX IF NOT EXISTS idx_gabinete_status ON gabinete_membros(status);

CREATE INDEX IF NOT EXISTS idx_emendas_candidato ON financas_emendas(candidato_id);
CREATE INDEX IF NOT EXISTS idx_emendas_status ON financas_emendas(status);

CREATE INDEX IF NOT EXISTS idx_movimentacoes_candidato ON financas_movimentacoes(candidato_id);
CREATE INDEX IF NOT EXISTS idx_movimentacoes_tipo ON financas_movimentacoes(tipo);
CREATE INDEX IF NOT EXISTS idx_movimentacoes_data ON financas_movimentacoes(data);

CREATE INDEX IF NOT EXISTS idx_orcamento_candidato ON financas_orcamento(candidato_id);
CREATE INDEX IF NOT EXISTS idx_orcamento_periodo ON financas_orcamento(ano, mes);
