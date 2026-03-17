-- Migration 0005: Campo Quantidade de Eleitores para Lideranças
-- Data: 17/03/2026
-- Descrição: Adicionar campo para registro manual da quantidade de eleitores que a liderança representa

-- ============================================
-- Adicionar campo qtd_eleitores na tabela liderancas
-- Este campo representa quantos eleitores a liderança consegue mobilizar
-- Diferente de qtd_influenciados (que é mais genérico)
-- ============================================
ALTER TABLE liderancas ADD COLUMN qtd_eleitores INTEGER DEFAULT 0;

-- ============================================
-- Adicionar comentário explicativo (SQLite não suporta nativamente, mas documentamos aqui)
-- qtd_eleitores: Número estimado de eleitores que a liderança representa/mobiliza
-- Pode variar de pequenas comunidades (15 pessoas) até lideranças maiores (milhares)
-- ============================================

-- ============================================
-- Atualizar VIEW: view_cobertura_municipio
-- Incluir dados de eleitores
-- ============================================
DROP VIEW IF EXISTS view_cobertura_municipio;
CREATE VIEW view_cobertura_municipio AS
SELECT 
  l.municipio,
  l.territorio_id,
  t.nome AS territorio_nome,
  l.candidato_id,
  COUNT(l.id) AS total_liderancas,
  SUM(l.qtd_influenciados) AS total_influenciados,
  SUM(l.qtd_eleitores) AS total_eleitores_mobilizados,
  AVG(l.qtd_influenciados) AS media_influenciados,
  AVG(l.qtd_eleitores) AS media_eleitores,
  MAX(l.qtd_influenciados) AS maior_influencia,
  MIN(l.qtd_influenciados) AS menor_influencia
FROM liderancas l
LEFT JOIN territorios t ON t.id = l.territorio_id
WHERE l.status = 'ativo'
GROUP BY l.municipio, l.territorio_id, l.candidato_id;

-- ============================================
-- Atualizar VIEW: view_cobertura_territorio
-- Incluir dados de eleitores
-- ============================================
DROP VIEW IF EXISTS view_cobertura_territorio;
CREATE VIEW view_cobertura_territorio AS
SELECT 
  t.id AS territorio_id,
  t.codigo,
  t.nome AS territorio_nome,
  t.total_municipios,
  t.populacao_estimada AS total_eleitores_territorio,
  l.candidato_id,
  COUNT(DISTINCT l.municipio) AS municipios_com_lideranca,
  COUNT(l.id) AS total_liderancas,
  SUM(l.qtd_influenciados) AS total_influenciados,
  SUM(l.qtd_eleitores) AS total_eleitores_mobilizados,
  ROUND(CAST(COUNT(DISTINCT l.municipio) AS REAL) / CAST(t.total_municipios AS REAL) * 100, 2) AS percentual_municipios_cobertos,
  CASE 
    WHEN t.populacao_estimada > 0 THEN ROUND(CAST(SUM(l.qtd_eleitores) AS REAL) / CAST(t.populacao_estimada AS REAL) * 100, 2)
    ELSE 0
  END AS percentual_eleitores_territorio
FROM territorios t
LEFT JOIN liderancas l ON l.territorio_id = t.id AND l.status = 'ativo'
GROUP BY t.id, t.codigo, t.nome, t.total_municipios, l.candidato_id;

-- ============================================
-- Atualizar VIEW: view_performance_municipio
-- Incluir análise de desempenho baseada em eleitores
-- ============================================
DROP VIEW IF EXISTS view_performance_municipio;
CREATE VIEW view_performance_municipio AS
SELECT 
  l.municipio,
  l.territorio_id,
  t.nome AS territorio_nome,
  l.candidato_id,
  COUNT(l.id) AS total_liderancas,
  SUM(l.qtd_influenciados) AS total_influenciados,
  SUM(l.qtd_eleitores) AS total_eleitores_mobilizados,
  tm.populacao AS eleitores_municipio,
  CASE 
    WHEN tm.populacao > 0 THEN ROUND(CAST(SUM(l.qtd_eleitores) AS REAL) / CAST(tm.populacao AS REAL) * 100, 2)
    ELSE 0
  END AS percentual_cobertura_eleitores,
  CASE 
    WHEN tm.populacao > 0 AND CAST(SUM(l.qtd_eleitores) AS REAL) / CAST(tm.populacao AS REAL) >= 0.10 THEN 'ALTA'
    WHEN tm.populacao > 0 AND CAST(SUM(l.qtd_eleitores) AS REAL) / CAST(tm.populacao AS REAL) >= 0.05 THEN 'MÉDIA'
    WHEN tm.populacao > 0 AND CAST(SUM(l.qtd_eleitores) AS REAL) / CAST(tm.populacao AS REAL) > 0 THEN 'BAIXA'
    ELSE 'SEM DADOS'
  END AS classificacao_performance
FROM liderancas l
LEFT JOIN territorios t ON t.id = l.territorio_id
LEFT JOIN territorios_municipios tm ON tm.nome_municipio = l.municipio AND tm.territorio_id = l.territorio_id
WHERE l.status = 'ativo'
GROUP BY l.municipio, l.territorio_id, l.candidato_id;

-- ============================================
-- Criar VIEW: Relatório BI - Análise de Investimento por Território
-- Responde: "É melhor investir em qual região?"
-- ============================================
CREATE VIEW IF NOT EXISTS view_bi_investimento_territorio AS
SELECT 
  t.id AS territorio_id,
  t.codigo,
  t.nome AS territorio_nome,
  t.total_municipios,
  t.populacao_estimada AS total_eleitores,
  COUNT(DISTINCT l.id) AS liderancas_atuais,
  COUNT(DISTINCT l.municipio) AS municipios_cobertos,
  SUM(l.qtd_eleitores) AS eleitores_mobilizados_atuais,
  
  -- Percentual de cobertura atual
  CASE 
    WHEN t.populacao_estimada > 0 THEN ROUND(CAST(SUM(l.qtd_eleitores) AS REAL) / CAST(t.populacao_estimada AS REAL) * 100, 2)
    ELSE 0
  END AS percentual_cobertura_atual,
  
  -- Potencial de crescimento (eleitores ainda não mobilizados)
  CASE 
    WHEN t.populacao_estimada > 0 THEN t.populacao_estimada - COALESCE(SUM(l.qtd_eleitores), 0)
    ELSE t.populacao_estimada
  END AS potencial_crescimento_eleitores,
  
  -- Percentual de crescimento possível
  CASE 
    WHEN t.populacao_estimada > 0 THEN ROUND((1 - CAST(COALESCE(SUM(l.qtd_eleitores), 0) AS REAL) / CAST(t.populacao_estimada AS REAL)) * 100, 2)
    ELSE 100
  END AS percentual_potencial_crescimento,
  
  -- Classificação de prioridade de investimento
  CASE 
    WHEN t.populacao_estimada > 100000 AND COALESCE(SUM(l.qtd_eleitores), 0) < (t.populacao_estimada * 0.05) THEN 'ALTÍSSIMA PRIORIDADE'
    WHEN t.populacao_estimada > 50000 AND COALESCE(SUM(l.qtd_eleitores), 0) < (t.populacao_estimada * 0.10) THEN 'ALTA PRIORIDADE'
    WHEN COALESCE(SUM(l.qtd_eleitores), 0) < (t.populacao_estimada * 0.15) THEN 'MÉDIA PRIORIDADE'
    ELSE 'BAIXA PRIORIDADE'
  END AS prioridade_investimento
  
FROM territorios t
LEFT JOIN liderancas l ON l.territorio_id = t.id AND l.status = 'ativo'
GROUP BY t.id, t.codigo, t.nome, t.total_municipios, t.populacao_estimada
ORDER BY percentual_potencial_crescimento DESC, t.populacao_estimada DESC;
