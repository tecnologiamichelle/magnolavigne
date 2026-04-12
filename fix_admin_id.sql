-- Atualizar ID do admin de 100 para 3
DELETE FROM candidatos WHERE id = 100;
UPDATE candidatos SET 
  email = 'admin@meupolitico.digital',
  senha = 'Admin@2026',
  tipo = 'admin'
WHERE id = 3;

SELECT * FROM candidatos WHERE id = 3;
