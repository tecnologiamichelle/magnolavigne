-- Migration: Adicionar campo observacoes na tabela profissionais
-- Data: 2026-01-27
-- Descrição: Adiciona coluna observacoes para permitir notas sobre profissionais

ALTER TABLE profissionais ADD COLUMN observacoes TEXT;
