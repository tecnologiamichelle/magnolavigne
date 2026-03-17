-- Migration 0004: Business Intelligence - Dados Eleitorais por Município
-- Data: 17/03/2026
-- Descrição: Estrutura para análise de BI e cruzamento de dados

-- ============================================
-- TABELA: bi_eleitorado_municipio
-- Dados eleitorais agregados por município
-- ============================================
CREATE TABLE IF NOT EXISTS bi_eleitorado_municipio (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  territorio_id INTEGER,
  municipio_id INTEGER,
  municipio_nome TEXT NOT NULL,
  codigo_tse TEXT, -- Código TSE do município
  
  -- Totais
  total_eleitores INTEGER DEFAULT 0,
  aptos_votar INTEGER DEFAULT 0,
  
  -- Por Gênero
  masculino INTEGER DEFAULT 0,
  feminino INTEGER DEFAULT 0,
  nao_informado INTEGER DEFAULT 0,
  
  -- Por Faixa Etária
  idade_16_17 INTEGER DEFAULT 0,
  idade_18_20 INTEGER DEFAULT 0,
  idade_21_24 INTEGER DEFAULT 0,
  idade_25_34 INTEGER DEFAULT 0,
  idade_35_44 INTEGER DEFAULT 0,
  idade_45_59 INTEGER DEFAULT 0,
  idade_60_69 INTEGER DEFAULT 0,
  idade_70_79 INTEGER DEFAULT 0,
  idade_acima_80 INTEGER DEFAULT 0,
  
  -- Por Escolaridade
  analfabeto INTEGER DEFAULT 0,
  fundamental_incompleto INTEGER DEFAULT 0,
  fundamental_completo INTEGER DEFAULT 0,
  medio_incompleto INTEGER DEFAULT 0,
  medio_completo INTEGER DEFAULT 0,
  superior_incompleto INTEGER DEFAULT 0,
  superior_completo INTEGER DEFAULT 0,
  nao_informado_escolaridade INTEGER DEFAULT 0,
  
  -- Metadados
  data_referencia DATE,
  fonte TEXT DEFAULT 'TSE',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (territorio_id) REFERENCES territorios(id) ON DELETE SET NULL,
  FOREIGN KEY (municipio_id) REFERENCES territorios_municipios(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_bi_eleitorado_territorio ON bi_eleitorado_municipio(territorio_id);
CREATE INDEX IF NOT EXISTS idx_bi_eleitorado_municipio ON bi_eleitorado_municipio(municipio_id);
CREATE INDEX IF NOT EXISTS idx_bi_eleitorado_nome ON bi_eleitorado_municipio(municipio_nome);

-- ============================================
-- TABELA: bi_cobertura_liderancas
-- View materializada de cobertura por município
-- ============================================
CREATE TABLE IF NOT EXISTS bi_cobertura_liderancas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  territorio_id INTEGER,
  municipio_nome TEXT NOT NULL,
  candidato_id INTEGER NOT NULL,
  
  -- Lideranças
  total_liderancas INTEGER DEFAULT 0,
  influencia_estimada INTEGER DEFAULT 0, -- Soma de qtd_influenciados
  
  -- Coordenadores
  total_coordenadores INTEGER DEFAULT 0,
  
  -- Profissionais
  total_profissionais INTEGER DEFAULT 0,
  
  -- Eventos/Agenda
  total_eventos INTEGER DEFAULT 0,
  eventos_realizados INTEGER DEFAULT 0,
  eventos_pendentes INTEGER DEFAULT 0,
  
  -- Metadados
  ultima_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (territorio_id) REFERENCES territorios(id) ON DELETE SET NULL,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE,
  UNIQUE(municipio_nome, candidato_id)
);

CREATE INDEX IF NOT EXISTS idx_bi_cobertura_territorio ON bi_cobertura_liderancas(territorio_id);
CREATE INDEX IF NOT EXISTS idx_bi_cobertura_candidato ON bi_cobertura_liderancas(candidato_id);

-- ============================================
-- TABELA: bi_indicadores_estrategicos
-- KPIs e métricas de decisão por município
-- ============================================
CREATE TABLE IF NOT EXISTS bi_indicadores_estrategicos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  territorio_id INTEGER,
  municipio_nome TEXT NOT NULL,
  candidato_id INTEGER NOT NULL,
  
  -- Eleitorado vs Cobertura
  total_eleitores INTEGER DEFAULT 0,
  liderancas_cadastradas INTEGER DEFAULT 0,
  percentual_cobertura REAL DEFAULT 0, -- (liderancas / eleitores) * 100
  influencia_estimada INTEGER DEFAULT 0,
  percentual_influencia REAL DEFAULT 0, -- (influencia / eleitores) * 100
  
  -- Potencial de Crescimento
  gap_cobertura INTEGER DEFAULT 0, -- eleitores - influencia
  potencial_votos INTEGER DEFAULT 0, -- estimativa baseada em influência
  
  -- Priorização
  score_prioridade REAL DEFAULT 0, -- Score calculado (0-100)
  classificacao TEXT, -- 'ALTA', 'MÉDIA', 'BAIXA'
  recomendacao TEXT, -- 'INVESTIR', 'MANTER', 'REVISAR'
  
  -- Custos e ROI
  custo_estimado_campanha REAL DEFAULT 0,
  roi_estimado REAL DEFAULT 0, -- votos potenciais / custo
  
  -- Análise Competitiva (para implementação futura)
  votos_adversarios_2020 INTEGER DEFAULT 0,
  diferenca_competitiva INTEGER DEFAULT 0,
  
  -- Metadados
  data_calculo DATETIME DEFAULT CURRENT_TIMESTAMP,
  observacoes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (territorio_id) REFERENCES territorios(id) ON DELETE SET NULL,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE,
  UNIQUE(municipio_nome, candidato_id)
);

CREATE INDEX IF NOT EXISTS idx_bi_indicadores_territorio ON bi_indicadores_estrategicos(territorio_id);
CREATE INDEX IF NOT EXISTS idx_bi_indicadores_candidato ON bi_indicadores_estrategicos(candidato_id);
CREATE INDEX IF NOT EXISTS idx_bi_indicadores_score ON bi_indicadores_estrategicos(score_prioridade DESC);
CREATE INDEX IF NOT EXISTS idx_bi_indicadores_classificacao ON bi_indicadores_estrategicos(classificacao);

-- ============================================
-- TABELA: bi_historico_metricas
-- Histórico de evolução das métricas ao longo do tempo
-- ============================================
CREATE TABLE IF NOT EXISTS bi_historico_metricas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  municipio_nome TEXT NOT NULL,
  candidato_id INTEGER NOT NULL,
  
  -- Snapshot de Métricas
  total_liderancas INTEGER DEFAULT 0,
  influencia_estimada INTEGER DEFAULT 0,
  percentual_cobertura REAL DEFAULT 0,
  score_prioridade REAL DEFAULT 0,
  
  -- Data do Snapshot
  data_snapshot DATE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_bi_historico_municipio ON bi_historico_metricas(municipio_nome);
CREATE INDEX IF NOT EXISTS idx_bi_historico_candidato ON bi_historico_metricas(candidato_id);
CREATE INDEX IF NOT EXISTS idx_bi_historico_data ON bi_historico_metricas(data_snapshot);
