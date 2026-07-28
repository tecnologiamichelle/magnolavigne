-- Migration: Adicionar campo data_hora_fim na tabela agenda
-- Data: 2026-01-27
-- Descrição: Adiciona coluna data_hora_fim para permitir registro de horário de término de eventos

ALTER TABLE agenda ADD COLUMN data_hora_fim DATETIME;
