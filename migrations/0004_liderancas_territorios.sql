-- Migration 0004: Adicionar relação Lideranças x Territórios
-- Data: 17/03/2026
-- Descrição: Vincular lideranças aos territórios para análise de cobertura

-- ============================================
-- Adicionar campo territorio_id na tabela liderancas
-- ============================================
ALTER TABLE liderancas ADD COLUMN territorio_id INTEGER REFERENCES territorios(id) ON DELETE SET NULL;

-- ============================================
-- Criar índice para performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_liderancas_territorio ON liderancas(territorio_id);
CREATE INDEX IF NOT EXISTS idx_liderancas_municipio ON liderancas(municipio);

-- ============================================
-- VIEW: Cobertura por Município
-- Análise agregada de lideranças por município
-- ============================================
CREATE VIEW IF NOT EXISTS view_cobertura_municipio AS
SELECT 
  l.municipio,
  l.territorio_id,
  t.nome AS territorio_nome,
  l.candidato_id,
  COUNT(l.id) AS total_liderancas,
  SUM(l.qtd_influenciados) AS total_influenciados,
  AVG(l.qtd_influenciados) AS media_influenciados,
  MAX(l.qtd_influenciados) AS maior_influencia,
  MIN(l.qtd_influenciados) AS menor_influencia
FROM liderancas l
LEFT JOIN territorios t ON t.id = l.territorio_id
WHERE l.status = 'ativo'
GROUP BY l.municipio, l.territorio_id, l.candidato_id;

-- ============================================
-- VIEW: Cobertura por Território
-- Análise agregada por território completo
-- ============================================
CREATE VIEW IF NOT EXISTS view_cobertura_territorio AS
SELECT 
  t.id AS territorio_id,
  t.codigo,
  t.nome AS territorio_nome,
  t.total_municipios,
  l.candidato_id,
  COUNT(DISTINCT l.municipio) AS municipios_com_lideranca,
  COUNT(l.id) AS total_liderancas,
  SUM(l.qtd_influenciados) AS total_influenciados,
  ROUND(CAST(COUNT(DISTINCT l.municipio) AS REAL) / CAST(t.total_municipios AS REAL) * 100, 2) AS percentual_municipios_cobertos
FROM territorios t
LEFT JOIN liderancas l ON l.territorio_id = t.id AND l.status = 'ativo'
GROUP BY t.id, t.codigo, t.nome, t.total_municipios, l.candidato_id;

-- ============================================
-- VIEW: Análise de Performance por Município
-- Cruzamento com dados de eleitorado (quando disponível)
-- ============================================
CREATE VIEW IF NOT EXISTS view_performance_municipio AS
SELECT 
  l.municipio,
  l.territorio_id,
  t.nome AS territorio_nome,
  l.candidato_id,
  COUNT(l.id) AS total_liderancas,
  SUM(l.qtd_influenciados) AS total_influenciados,
  tm.populacao AS eleitores_municipio,
  CASE 
    WHEN tm.populacao > 0 THEN ROUND(CAST(SUM(l.qtd_influenciados) AS REAL) / CAST(tm.populacao AS REAL) * 100, 2)
    ELSE 0
  END AS percentual_cobertura,
  CASE 
    WHEN tm.populacao > 0 AND CAST(SUM(l.qtd_influenciados) AS REAL) / CAST(tm.populacao AS REAL) >= 0.10 THEN 'ALTA'
    WHEN tm.populacao > 0 AND CAST(SUM(l.qtd_influenciados) AS REAL) / CAST(tm.populacao AS REAL) >= 0.05 THEN 'MÉDIA'
    WHEN tm.populacao > 0 AND CAST(SUM(l.qtd_influenciados) AS REAL) / CAST(tm.populacao AS REAL) > 0 THEN 'BAIXA'
    ELSE 'SEM DADOS'
  END AS classificacao_performance
FROM liderancas l
LEFT JOIN territorios t ON t.id = l.territorio_id
LEFT JOIN territorios_municipios tm ON tm.nome_municipio = l.municipio AND tm.territorio_id = l.territorio_id
WHERE l.status = 'ativo'
GROUP BY l.municipio, l.territorio_id, l.candidato_id;
