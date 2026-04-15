-- Migration: Estrutura Multi-Partido
-- Preparar sistema para suportar múltiplos candidatos e partidos
-- Data: 2026-04-15

-- 1. Tabela de Partidos Políticos
CREATE TABLE IF NOT EXISTS partidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sigla TEXT NOT NULL UNIQUE,
  nome TEXT NOT NULL,
  numero INTEGER UNIQUE,
  uf TEXT NOT NULL, -- Estado do diretório
  diretorio_tipo TEXT DEFAULT 'estadual', -- nacional, estadual, municipal
  status TEXT DEFAULT 'ativo',
  data_filiacao DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Adicionar campos de partido e cargo aos candidatos (verificar se já existem)
ALTER TABLE candidatos ADD COLUMN partido_id INTEGER REFERENCES partidos(id);
ALTER TABLE candidatos ADD COLUMN numero_candidato INTEGER;
ALTER TABLE candidatos ADD COLUMN uf_candidatura TEXT; -- Estado da candidatura
ALTER TABLE candidatos ADD COLUMN coligacao TEXT; -- Nome da coligação (se houver)

-- 3. Tabela de Recursos Compartilhados entre candidatos do mesmo partido
CREATE TABLE IF NOT EXISTS recursos_compartilhados (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  partido_id INTEGER NOT NULL REFERENCES partidos(id),
  tipo TEXT NOT NULL, -- 'liderancas', 'coordenadores', 'territorios', 'materiais'
  recurso_id INTEGER NOT NULL, -- ID do recurso compartilhado
  candidatos_ids TEXT, -- IDs dos candidatos que têm acesso (JSON-like: "1,2,3")
  nivel_acesso TEXT DEFAULT 'leitura', -- leitura, escrita, admin
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_candidatos_partido ON candidatos(partido_id);
CREATE INDEX IF NOT EXISTS idx_candidatos_cargo ON candidatos(cargo);
CREATE INDEX IF NOT EXISTS idx_candidatos_uf ON candidatos(uf_candidatura);
CREATE INDEX IF NOT EXISTS idx_recursos_partido ON recursos_compartilhados(partido_id);
CREATE INDEX IF NOT EXISTS idx_recursos_tipo ON recursos_compartilhados(tipo);

-- 5. Inserir partidos principais da Bahia (exemplo)
INSERT OR IGNORE INTO partidos (sigla, nome, numero, uf, diretorio_tipo) VALUES
  ('PT', 'Partido dos Trabalhadores', 13, 'BA', 'estadual'),
  ('PL', 'Partido Liberal', 22, 'BA', 'estadual'),
  ('PP', 'Progressistas', 11, 'BA', 'estadual'),
  ('PSD', 'Partido Social Democrático', 55, 'BA', 'estadual'),
  ('MDB', 'Movimento Democrático Brasileiro', 15, 'BA', 'estadual'),
  ('PSDB', 'Partido da Social Democracia Brasileira', 45, 'BA', 'estadual'),
  ('REPUBLICANOS', 'Republicanos', 10, 'BA', 'estadual'),
  ('UNIÃO', 'União Brasil', 44, 'BA', 'estadual');

-- 6. Atualizar candidato existente (admin) com partido
UPDATE candidatos 
SET partido_id = (SELECT id FROM partidos WHERE sigla = 'PT' LIMIT 1),
    cargo = 'governador',
    numero_candidato = 13999,
    uf_candidatura = 'BA'
WHERE id = 3;

-- 7. View consolidada de candidatos com informações do partido
CREATE VIEW IF NOT EXISTS vw_candidatos_completo AS
SELECT 
  c.id,
  c.nome,
  c.email,
  c.cargo,
  c.numero_candidato,
  c.uf_candidatura,
  c.municipio,
  c.status,
  p.sigla AS partido_sigla,
  p.nome AS partido_nome,
  p.numero AS partido_numero,
  (SELECT COUNT(*) FROM liderancas WHERE candidato_id = c.id) AS total_liderancas,
  (SELECT COUNT(*) FROM coordenadores WHERE candidato_id = c.id) AS total_coordenadores,
  (SELECT COUNT(*) FROM eleitores WHERE candidato_id = c.id) AS total_eleitores,
  c.created_at
FROM candidatos c
LEFT JOIN partidos p ON c.partido_id = p.id;
