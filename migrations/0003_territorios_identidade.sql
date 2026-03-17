-- Migration 0003: Territórios de Identidade da Bahia
-- Data: 17/03/2026
-- Descrição: Novo módulo para gestão de territórios de identidade

-- ============================================
-- TABELA: territorios (Territórios de Identidade)
-- ============================================
CREATE TABLE IF NOT EXISTS territorios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  regiao TEXT, -- Norte, Sul, Leste, Oeste, Centro, Litoral, etc.
  total_municipios INTEGER DEFAULT 0,
  populacao_estimada INTEGER DEFAULT 0,
  area_km2 REAL DEFAULT 0,
  pib_milhoes REAL DEFAULT 0,
  caracteristicas TEXT, -- JSON com características do território
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_territorios_codigo ON territorios(codigo);
CREATE INDEX IF NOT EXISTS idx_territorios_regiao ON territorios(regiao);

-- ============================================
-- TABELA: territorios_municipios (Municípios por Território)
-- ============================================
CREATE TABLE IF NOT EXISTS territorios_municipios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  territorio_id INTEGER NOT NULL,
  codigo_ibge TEXT NOT NULL,
  nome_municipio TEXT NOT NULL,
  populacao INTEGER DEFAULT 0,
  area_km2 REAL DEFAULT 0,
  distancia_capital INTEGER DEFAULT 0, -- km
  principais_atividades TEXT, -- Agricultura, Turismo, Indústria, etc.
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (territorio_id) REFERENCES territorios(id) ON DELETE CASCADE,
  UNIQUE(territorio_id, codigo_ibge)
);

CREATE INDEX IF NOT EXISTS idx_terr_mun_territorio ON territorios_municipios(territorio_id);
CREATE INDEX IF NOT EXISTS idx_terr_mun_codigo ON territorios_municipios(codigo_ibge);
CREATE INDEX IF NOT EXISTS idx_terr_mun_nome ON territorios_municipios(nome_municipio);

-- ============================================
-- TABELA: territorios_cobertura (Cobertura de Lideranças por Território)
-- ============================================
CREATE TABLE IF NOT EXISTS territorios_cobertura (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  territorio_id INTEGER NOT NULL,
  candidato_id INTEGER NOT NULL,
  total_liderancas INTEGER DEFAULT 0,
  total_coordenadores INTEGER DEFAULT 0,
  municipios_cobertos INTEGER DEFAULT 0,
  percentual_cobertura REAL DEFAULT 0,
  influencia_estimada INTEGER DEFAULT 0,
  ultima_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (territorio_id) REFERENCES territorios(id) ON DELETE CASCADE,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE,
  UNIQUE(territorio_id, candidato_id)
);

CREATE INDEX IF NOT EXISTS idx_terr_cob_territorio ON territorios_cobertura(territorio_id);
CREATE INDEX IF NOT EXISTS idx_terr_cob_candidato ON territorios_cobertura(candidato_id);

-- ============================================
-- TABELA: territorios_metas (Metas por Território)
-- ============================================
CREATE TABLE IF NOT EXISTS territorios_metas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  territorio_id INTEGER NOT NULL,
  candidato_id INTEGER NOT NULL,
  meta_liderancas INTEGER DEFAULT 0,
  meta_coordenadores INTEGER DEFAULT 0,
  meta_eventos INTEGER DEFAULT 0,
  prazo DATE,
  status TEXT DEFAULT 'ativa', -- 'ativa', 'atingida', 'cancelada'
  observacoes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (territorio_id) REFERENCES territorios(id) ON DELETE CASCADE,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_terr_metas_territorio ON territorios_metas(territorio_id);
CREATE INDEX IF NOT EXISTS idx_terr_metas_candidato ON territorios_metas(candidato_id);
CREATE INDEX IF NOT EXISTS idx_terr_metas_status ON territorios_metas(status);
