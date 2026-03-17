-- Seed de Usuários Padrão
-- Data: 17/03/2026
-- Descrição: Criar usuários padrão do sistema

-- Limpar usuários existentes (opcional)
DELETE FROM candidatos;

-- ============================================
-- Inserir Usuários Padrão
-- ============================================

-- 1. Edvaldo Pitanga (Super Admin)
INSERT INTO candidatos (
  tipo, 
  nome, 
  email, 
  senha,
  cargo,
  municipio, 
  status,
  created_at,
  updated_at
) VALUES (
  'admin',
  'Edvaldo Pitanga',
  'pitanga@magnolavigne.com.br',
  'B@hia2026',
  'Super Admin',
  'Salvador',
  'ativo',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- 2. Magno Lavigne (Deputado Federal)
INSERT INTO candidatos (
  tipo, 
  nome, 
  email, 
  senha,
  cargo,
  municipio, 
  status,
  created_at,
  updated_at
) VALUES (
  'admin',
  'Magno Lavigne',
  'magno@magnolavigne.com.br',
  'senha123',
  'Deputado Federal',
  'Salvador',
  'ativo',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- 3. Admin (Administrador)
INSERT INTO candidatos (
  tipo, 
  nome, 
  email, 
  senha,
  cargo,
  municipio, 
  status,
  created_at,
  updated_at
) VALUES (
  'admin',
  'Admin',
  'admin@magnolavigne.com.br',
  'senha@123',
  'Administrador',
  'Salvador',
  'ativo',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- Verificar usuários criados
SELECT id, tipo, nome, email, cargo, status FROM candidatos;
