-- Migration: Melhorias na Agenda
-- Adicionar campo de progresso e responsável
-- Data: 2026-04-12

-- Adicionar coluna de progresso (0-100%)
ALTER TABLE agenda ADD COLUMN progresso INTEGER DEFAULT 0 CHECK(progresso >= 0 AND progresso <= 100);

-- Adicionar coluna de responsável
ALTER TABLE agenda ADD COLUMN responsavel TEXT;

-- Adicionar coluna de participantes (JSON-like, separados por vírgula)
ALTER TABLE agenda ADD COLUMN participantes TEXT;

-- Adicionar coluna de lembretes (tempo em minutos antes do evento)
ALTER TABLE agenda ADD COLUMN lembrete_minutos INTEGER DEFAULT 60;

-- Comentários/notas sobre o andamento
ALTER TABLE agenda ADD COLUMN notas TEXT;

-- Atualizar eventos existentes com progresso baseado no status
UPDATE agenda SET progresso = 
  CASE 
    WHEN status = 'concluido' THEN 100
    WHEN status = 'pendente' THEN 0
    WHEN status = 'cancelado' THEN 0
    ELSE 0
  END
WHERE progresso = 0;
