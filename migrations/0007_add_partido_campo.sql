-- Adicionar campo partido na tabela candidatos
ALTER TABLE candidatos ADD COLUMN partido TEXT DEFAULT 'Seu Partido';

-- Atualizar registros existentes
UPDATE candidatos SET partido = 'Seu Partido' WHERE partido IS NULL OR partido = '';
