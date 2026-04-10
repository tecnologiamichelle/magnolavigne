-- Migration 0006: Hierarquia Organizacional
-- Data: 17/03/2026
-- Descrição: Adicionar hierarquia Coordenador → Liderança → Eleitor

-- ==================================================
-- 1. ATUALIZAR TABELA COORDENADORES
-- ==================================================

-- Adicionar novos campos
ALTER TABLE coordenadores ADD COLUMN territorio_id INTEGER REFERENCES territorios(id) ON DELETE SET NULL;
ALTER TABLE coordenadores ADD COLUMN qtd_liderancas INTEGER DEFAULT 0;
ALTER TABLE coordenadores ADD COLUMN qtd_eleitores_captados INTEGER DEFAULT 0;
ALTER TABLE coordenadores ADD COLUMN meta_liderancas INTEGER DEFAULT 10;
ALTER TABLE coordenadores ADD COLUMN meta_eleitores INTEGER DEFAULT 1000;

-- ==================================================
-- 2. ATUALIZAR TABELA LIDERANÇAS
-- ==================================================

-- Adicionar novos campos
ALTER TABLE liderancas ADD COLUMN coordenador_id INTEGER REFERENCES coordenadores(id) ON DELETE SET NULL;
ALTER TABLE liderancas ADD COLUMN qtd_eleitores_confirmados INTEGER DEFAULT 0;
ALTER TABLE liderancas ADD COLUMN meta_eleitores INTEGER DEFAULT 100;

-- ==================================================
-- 3. CRIAR NOVA TABELA ELEITORES
-- ==================================================

CREATE TABLE IF NOT EXISTS eleitores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  lideranca_id INTEGER,
  coordenador_id INTEGER,
  
  -- Dados Pessoais
  nome TEXT NOT NULL,
  cpf TEXT,
  telefone TEXT,
  email TEXT,
  
  -- Localização
  municipio TEXT NOT NULL,
  bairro TEXT,
  zona TEXT,
  secao TEXT,
  
  -- Dados Eleitorais
  titulo_eleitor TEXT,
  local_votacao TEXT,
  
  -- Status e Classificação
  status_apoio TEXT DEFAULT 'simpatizante',
  nivel_engajamento TEXT DEFAULT 'baixo',
  confirmado INTEGER DEFAULT 0,
  compareceu_evento INTEGER DEFAULT 0,
  
  -- Metadados
  observacoes TEXT,
  tags TEXT,
  data_captacao DATE DEFAULT (date('now')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE,
  FOREIGN KEY (lideranca_id) REFERENCES liderancas(id) ON DELETE SET NULL,
  FOREIGN KEY (coordenador_id) REFERENCES coordenadores(id) ON DELETE SET NULL
);

-- ==================================================
-- 4. MIGRAR DADOS EXISTENTES (dados_eleitorais → eleitores)
-- ==================================================

INSERT INTO eleitores (candidato_id, municipio, zona, secao, observacoes, created_at, updated_at)
SELECT candidato_id, municipio, zona, secao, observacoes, created_at, updated_at
FROM dados_eleitorais;

-- ==================================================
-- 5. CRIAR ÍNDICES PARA PERFORMANCE
-- ==================================================

CREATE INDEX IF NOT EXISTS idx_eleitores_lideranca ON eleitores(lideranca_id);
CREATE INDEX IF NOT EXISTS idx_eleitores_coordenador ON eleitores(coordenador_id);
CREATE INDEX IF NOT EXISTS idx_eleitores_municipio ON eleitores(municipio);
CREATE INDEX IF NOT EXISTS idx_eleitores_status ON eleitores(status_apoio);
CREATE INDEX IF NOT EXISTS idx_eleitores_confirmado ON eleitores(confirmado);
CREATE INDEX IF NOT EXISTS idx_liderancas_coordenador ON liderancas(coordenador_id);
CREATE INDEX IF NOT EXISTS idx_coordenadores_territorio ON coordenadores(territorio_id);

-- ==================================================
-- 6. CRIAR TRIGGERS PARA ATUALIZAÇÃO AUTOMÁTICA
-- ==================================================

-- Trigger: Atualizar qtd_liderancas ao INSERIR liderança
CREATE TRIGGER IF NOT EXISTS atualizar_qtd_liderancas_insert
AFTER INSERT ON liderancas
WHEN NEW.coordenador_id IS NOT NULL
BEGIN
  UPDATE coordenadores 
  SET qtd_liderancas = (SELECT COUNT(*) FROM liderancas WHERE coordenador_id = NEW.coordenador_id AND status = 'ativo')
  WHERE id = NEW.coordenador_id;
END;

-- Trigger: Atualizar qtd_liderancas ao DELETAR liderança
CREATE TRIGGER IF NOT EXISTS atualizar_qtd_liderancas_delete
AFTER DELETE ON liderancas
WHEN OLD.coordenador_id IS NOT NULL
BEGIN
  UPDATE coordenadores 
  SET qtd_liderancas = (SELECT COUNT(*) FROM liderancas WHERE coordenador_id = OLD.coordenador_id AND status = 'ativo')
  WHERE id = OLD.coordenador_id;
END;

-- Trigger: Atualizar qtd_liderancas ao ATUALIZAR coordenador_id
CREATE TRIGGER IF NOT EXISTS atualizar_qtd_liderancas_update
AFTER UPDATE OF coordenador_id ON liderancas
BEGIN
  -- Atualizar coordenador anterior
  UPDATE coordenadores 
  SET qtd_liderancas = (SELECT COUNT(*) FROM liderancas WHERE coordenador_id = OLD.coordenador_id AND status = 'ativo')
  WHERE id = OLD.coordenador_id;
  
  -- Atualizar coordenador novo
  UPDATE coordenadores 
  SET qtd_liderancas = (SELECT COUNT(*) FROM liderancas WHERE coordenador_id = NEW.coordenador_id AND status = 'ativo')
  WHERE id = NEW.coordenador_id;
END;

-- Trigger: Atualizar qtd_eleitores ao INSERIR eleitor
CREATE TRIGGER IF NOT EXISTS atualizar_qtd_eleitores_insert
AFTER INSERT ON eleitores
BEGIN
  -- Atualizar liderança
  UPDATE liderancas 
  SET qtd_eleitores = (SELECT COUNT(*) FROM eleitores WHERE lideranca_id = NEW.lideranca_id),
      qtd_eleitores_confirmados = (SELECT COUNT(*) FROM eleitores WHERE lideranca_id = NEW.lideranca_id AND confirmado = 1)
  WHERE id = NEW.lideranca_id;
  
  -- Atualizar coordenador
  UPDATE coordenadores 
  SET qtd_eleitores_captados = (SELECT COUNT(*) FROM eleitores WHERE coordenador_id = NEW.coordenador_id)
  WHERE id = NEW.coordenador_id;
END;

-- Trigger: Atualizar qtd_eleitores ao DELETAR eleitor
CREATE TRIGGER IF NOT EXISTS atualizar_qtd_eleitores_delete
AFTER DELETE ON eleitores
BEGIN
  -- Atualizar liderança
  UPDATE liderancas 
  SET qtd_eleitores = (SELECT COUNT(*) FROM eleitores WHERE lideranca_id = OLD.lideranca_id),
      qtd_eleitores_confirmados = (SELECT COUNT(*) FROM eleitores WHERE lideranca_id = OLD.lideranca_id AND confirmado = 1)
  WHERE id = OLD.lideranca_id;
  
  -- Atualizar coordenador
  UPDATE coordenadores 
  SET qtd_eleitores_captados = (SELECT COUNT(*) FROM eleitores WHERE coordenador_id = OLD.coordenador_id)
  WHERE id = OLD.coordenador_id;
END;

-- Trigger: Atualizar qtd_eleitores ao ATUALIZAR confirmado
CREATE TRIGGER IF NOT EXISTS atualizar_qtd_eleitores_confirmado
AFTER UPDATE OF confirmado ON eleitores
BEGIN
  UPDATE liderancas 
  SET qtd_eleitores_confirmados = (SELECT COUNT(*) FROM eleitores WHERE lideranca_id = NEW.lideranca_id AND confirmado = 1)
  WHERE id = NEW.lideranca_id;
END;

-- ==================================================
-- 7. CRIAR VIEWS PARA RELATÓRIOS
-- ==================================================

-- View: Performance por Coordenador
CREATE VIEW IF NOT EXISTS view_performance_coordenadores AS
SELECT 
  c.id,
  c.nome AS coordenador,
  c.municipio,
  c.territorio_id,
  t.nome AS territorio,
  c.qtd_liderancas,
  c.meta_liderancas,
  ROUND(c.qtd_liderancas * 100.0 / NULLIF(c.meta_liderancas, 0), 2) AS percentual_meta_liderancas,
  c.qtd_eleitores_captados,
  c.meta_eleitores,
  ROUND(c.qtd_eleitores_captados * 100.0 / NULLIF(c.meta_eleitores, 0), 2) AS percentual_meta_eleitores,
  c.status,
  c.created_at
FROM coordenadores c
LEFT JOIN territorios t ON c.territorio_id = t.id
WHERE c.status = 'ativo';

-- View: Performance por Liderança
CREATE VIEW IF NOT EXISTS view_performance_liderancas AS
SELECT 
  l.id,
  l.nome AS lideranca,
  l.municipio,
  l.territorio_id,
  t.nome AS territorio,
  l.coordenador_id,
  c.nome AS coordenador,
  l.qtd_eleitores,
  l.qtd_eleitores_confirmados,
  l.meta_eleitores,
  ROUND(l.qtd_eleitores * 100.0 / NULLIF(l.meta_eleitores, 0), 2) AS percentual_meta,
  ROUND(l.qtd_eleitores_confirmados * 100.0 / NULLIF(l.qtd_eleitores, 0), 2) AS taxa_confirmacao,
  l.nivel_influencia,
  l.status,
  l.created_at
FROM liderancas l
LEFT JOIN coordenadores c ON l.coordenador_id = c.id
LEFT JOIN territorios t ON l.territorio_id = t.id
WHERE l.status = 'ativo';

-- View: Hierarquia Completa
CREATE VIEW IF NOT EXISTS view_hierarquia_completa AS
SELECT 
  e.id AS eleitor_id,
  e.nome AS eleitor,
  e.cpf,
  e.telefone,
  e.municipio AS eleitor_municipio,
  e.status_apoio,
  e.nivel_engajamento,
  e.confirmado,
  e.compareceu_evento,
  l.id AS lideranca_id,
  l.nome AS lideranca,
  l.municipio AS lideranca_municipio,
  c.id AS coordenador_id,
  c.nome AS coordenador,
  c.municipio AS coordenador_municipio,
  t.id AS territorio_id,
  t.nome AS territorio,
  e.created_at AS data_captacao
FROM eleitores e
LEFT JOIN liderancas l ON e.lideranca_id = l.id
LEFT JOIN coordenadores c ON e.coordenador_id = c.id
LEFT JOIN territorios t ON l.territorio_id = t.id;

-- View: Estatísticas por Território
CREATE VIEW IF NOT EXISTS view_stats_territorios AS
SELECT 
  t.id AS territorio_id,
  t.nome AS territorio,
  COUNT(DISTINCT c.id) AS total_coordenadores,
  COUNT(DISTINCT l.id) AS total_liderancas,
  COUNT(DISTINCT e.id) AS total_eleitores,
  COUNT(DISTINCT CASE WHEN e.confirmado = 1 THEN e.id END) AS total_confirmados,
  ROUND(COUNT(DISTINCT CASE WHEN e.confirmado = 1 THEN e.id END) * 100.0 / NULLIF(COUNT(DISTINCT e.id), 0), 2) AS taxa_confirmacao
FROM territorios t
LEFT JOIN coordenadores c ON t.id = c.territorio_id AND c.status = 'ativo'
LEFT JOIN liderancas l ON c.id = l.coordenador_id AND l.status = 'ativo'
LEFT JOIN eleitores e ON l.id = e.lideranca_id
GROUP BY t.id;
