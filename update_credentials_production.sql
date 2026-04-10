-- Atualizar credenciais do administrador para MeuPolitico.Digital
-- Este script deve ser executado em produção

-- Atualizar usuário admin
UPDATE candidatos 
SET email = 'admin@meupolitico.digital',
    nome = 'Administrador MeuPolitico',
    cargo = 'Administrador da Plataforma',
    senha = 'Admin@2026',
    status = 'ativo'
WHERE id = 3 AND tipo = 'admin';

-- Inserir novo admin se não existir (fallback)
INSERT OR IGNORE INTO candidatos (
  id, email, nome, cargo, municipio, status, tipo, senha, created_at
) VALUES (
  100,
  'admin@meupolitico.digital',
  'Administrador MeuPolitico',
  'Administrador da Plataforma',
  'Nacional',
  'ativo',
  'admin',
  'Admin@2026',
  datetime('now')
);

-- Verificar usuários admin ativos
SELECT 
  id, 
  nome, 
  email, 
  cargo,
  tipo, 
  status,
  created_at
FROM candidatos 
WHERE tipo = 'admin' AND status = 'ativo'
ORDER BY id;
