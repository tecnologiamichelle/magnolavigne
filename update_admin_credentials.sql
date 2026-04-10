-- Atualizar credenciais do administrador
UPDATE candidatos 
SET email = 'admin@meupolitico.digital',
    nome = 'Administrador',
    senha = 'Admin@2026'
WHERE id = 3 AND tipo = 'admin';

-- Verificar a atualização
SELECT id, nome, email, tipo, status FROM candidatos WHERE tipo = 'admin';
