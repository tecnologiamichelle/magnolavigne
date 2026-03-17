-- Migration 0002: Tabelas TSE (Tribunal Superior Eleitoral)
-- Data: 17/03/2026
-- Descrição: Tabelas para dados do TSE da Bahia

-- ============================================
-- TABELA: tse_perfil_eleitorado (Perfil Demográfico)
-- ============================================
CREATE TABLE IF NOT EXISTS tse_perfil_eleitorado (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ano_eleicao INTEGER NOT NULL,
  sigla_uf TEXT NOT NULL,
  codigo_municipio TEXT NOT NULL,
  nome_municipio TEXT NOT NULL,
  
  -- Totais gerais
  total_eleitores INTEGER DEFAULT 0,
  eleitores_masculino INTEGER DEFAULT 0,
  eleitores_feminino INTEGER DEFAULT 0,
  eleitores_nao_informado INTEGER DEFAULT 0,
  
  -- Faixas etárias
  eleitores_16_17 INTEGER DEFAULT 0,
  eleitores_18_20 INTEGER DEFAULT 0,
  eleitores_21_24 INTEGER DEFAULT 0,
  eleitores_25_34 INTEGER DEFAULT 0,
  eleitores_35_44 INTEGER DEFAULT 0,
  eleitores_45_59 INTEGER DEFAULT 0,
  eleitores_60_69 INTEGER DEFAULT 0,
  eleitores_70_79 INTEGER DEFAULT 0,
  eleitores_80_mais INTEGER DEFAULT 0,
  
  -- Escolaridade
  eleitores_analfabeto INTEGER DEFAULT 0,
  eleitores_fundamental_incompleto INTEGER DEFAULT 0,
  eleitores_fundamental_completo INTEGER DEFAULT 0,
  eleitores_medio_incompleto INTEGER DEFAULT 0,
  eleitores_medio_completo INTEGER DEFAULT 0,
  eleitores_superior_incompleto INTEGER DEFAULT 0,
  eleitores_superior_completo INTEGER DEFAULT 0,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(ano_eleicao, codigo_municipio)
);

CREATE INDEX IF NOT EXISTS idx_tse_perfil_uf ON tse_perfil_eleitorado(sigla_uf);
CREATE INDEX IF NOT EXISTS idx_tse_perfil_municipio ON tse_perfil_eleitorado(nome_municipio);

-- ============================================
-- TABELA: tse_candidatos (Candidatos TSE)
-- ============================================
CREATE TABLE IF NOT EXISTS tse_candidatos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ano_eleicao INTEGER NOT NULL,
  sigla_uf TEXT NOT NULL,
  numero_candidato TEXT NOT NULL,
  nome_candidato TEXT NOT NULL,
  nome_urna TEXT,
  cpf TEXT,
  numero_partido TEXT,
  sigla_partido TEXT,
  nome_partido TEXT,
  codigo_cargo INTEGER NOT NULL,
  descricao_cargo TEXT,
  situacao_candidatura TEXT,
  total_bens REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(ano_eleicao, numero_candidato, codigo_cargo)
);

CREATE INDEX IF NOT EXISTS idx_tse_cand_numero ON tse_candidatos(numero_candidato);
CREATE INDEX IF NOT EXISTS idx_tse_cand_partido ON tse_candidatos(sigla_partido);
CREATE INDEX IF NOT EXISTS idx_tse_cand_cargo ON tse_candidatos(codigo_cargo);

-- ============================================
-- TABELA: tse_votacao_municipio (Votação por Município)
-- ============================================
CREATE TABLE IF NOT EXISTS tse_votacao_municipio (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ano_eleicao INTEGER NOT NULL,
  codigo_cargo INTEGER NOT NULL,
  sigla_uf TEXT NOT NULL,
  codigo_municipio TEXT NOT NULL,
  nome_municipio TEXT NOT NULL,
  numero_candidato TEXT NOT NULL,
  total_votos INTEGER DEFAULT 0,
  votos_percentual REAL DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(ano_eleicao, codigo_municipio, numero_candidato, codigo_cargo)
);

CREATE INDEX IF NOT EXISTS idx_tse_vot_municipio ON tse_votacao_municipio(nome_municipio);
CREATE INDEX IF NOT EXISTS idx_tse_vot_candidato ON tse_votacao_municipio(numero_candidato);

-- ============================================
-- TABELA: tse_zonas_eleitorais (Zonas Eleitorais)
-- ============================================
CREATE TABLE IF NOT EXISTS tse_zonas_eleitorais (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ano_eleicao INTEGER NOT NULL,
  sigla_uf TEXT NOT NULL,
  codigo_municipio TEXT NOT NULL,
  nome_municipio TEXT NOT NULL,
  numero_zona INTEGER NOT NULL,
  total_eleitores INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(ano_eleicao, codigo_municipio, numero_zona)
);

CREATE INDEX IF NOT EXISTS idx_tse_zonas_municipio ON tse_zonas_eleitorais(nome_municipio);
CREATE INDEX IF NOT EXISTS idx_tse_zonas_numero ON tse_zonas_eleitorais(numero_zona);

-- ============================================
-- TABELA: tse_relatorios (Histórico de Relatórios)
-- ============================================
CREATE TABLE IF NOT EXISTS tse_relatorios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  tipo TEXT NOT NULL,
  titulo TEXT NOT NULL,
  dados_json TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_tse_rel_candidato ON tse_relatorios(candidato_id);
CREATE INDEX IF NOT EXISTS idx_tse_rel_tipo ON tse_relatorios(tipo);

-- ============================================
-- TABELA: tse_historico_metricas (Histórico de Métricas)
-- ============================================
CREATE TABLE IF NOT EXISTS tse_historico_metricas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  data_calculo DATETIME DEFAULT CURRENT_TIMESTAMP,
  municipios_cobertos INTEGER DEFAULT 0,
  total_liderancas INTEGER DEFAULT 0,
  influencia_total INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_tse_met_candidato ON tse_historico_metricas(candidato_id);
CREATE INDEX IF NOT EXISTS idx_tse_met_data ON tse_historico_metricas(data_calculo);
