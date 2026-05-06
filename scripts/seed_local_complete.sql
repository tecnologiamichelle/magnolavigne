-- Seed completo do banco LOCAL com dados da PRODUÇÃO
-- Executar: npx wrangler d1 execute meupolitico-production --local --file=./scripts/seed_local_complete.sql

-- Limpar dados existentes
DELETE FROM eleitores;
DELETE FROM liderancas;
DELETE FROM coordenadores;
DELETE FROM candidatos;

-- Inserir Candidatos
INSERT INTO candidatos (id, email, senha, nome, cargo, municipio, status, tipo, created_at, updated_at, partido) VALUES
(1, 'pitanga@magnolavigne.com.br', 'B@hia2026', 'Edvaldo Pitanga', 'Super Admin', 'Salvador', 'ativo', 'admin', '2026-04-10 23:18:07', '2026-04-10 23:18:07', 'PV'),
(3, 'admin@magnolavigne.com.br', 'Admin@2026', 'Administrador Magno Lavigne', 'Administrador da Plataforma', 'Salvador', 'ativo', 'admin', '2026-04-10 23:18:07', '2026-04-10 23:18:07', 'PV'),
(101, 'coordenador@magnolavigne.com.br', 'Magno@2026', 'Coordenador Geral', 'Coordenador', 'Salvador', 'ativo', 'admin', '2026-05-06 13:35:33', '2026-05-06 13:35:33', 'PV'),
(102, 'gerente@magnolavigne.com.br', 'Magno@2026', 'Gerente de Campanha', 'Gerente', 'Salvador', 'ativo', 'admin', '2026-05-06 13:35:33', '2026-05-06 13:35:33', 'PV'),
(103, 'supervisor@magnolavigne.com.br', 'Magno@2026', 'Supervisor', 'Supervisor', 'Salvador', 'ativo', 'admin', '2026-05-06 13:35:33', '2026-05-06 13:35:33', 'PV'),
(104, 'comunicacao@magnolavigne.com.br', 'Magno@2026', 'Comunicação', 'Analista', 'Salvador', 'ativo', 'admin', '2026-05-06 13:35:33', '2026-05-06 13:35:33', 'PV');

-- Inserir Coordenadores
INSERT INTO coordenadores (id, candidato_id, nome, telefone, email, municipio, area_atuacao, status, created_at, updated_at, territorio_id, qtd_liderancas, qtd_eleitores_captados, meta_liderancas, meta_eleitores) VALUES
(1, 3, 'Anísio Teixeira', '71988881122', 'anisio@coordenador.com', 'Salvador', 'Centro', 'ativo', '2026-04-10 23:30:45', '2026-04-10 23:30:45', 1, 5, 150, 10, 1000),
(2, 3, 'Jorge Amado', '71988882233', 'jorge@coordenador.com', 'Ilhéus', 'Sul da Bahia', 'ativo', '2026-04-10 23:31:15', '2026-04-10 23:31:15', 2, 3, 80, 10, 1000),
(3, 3, 'Castro Alves', '71988883344', 'castro@coordenador.com', 'Salvador', 'Liberdade', 'ativo', '2026-04-10 23:31:45', '2026-04-10 23:31:45', 1, 4, 120, 10, 1000);

-- Inserir Lideranças
INSERT INTO liderancas (id, candidato_id, nome, telefone, email, municipio, bairro, zona_eleitoral, nivel_influencia, qtd_influenciados, status, observacoes, created_at, updated_at, territorio_id, qtd_eleitores, coordenador_id, qtd_eleitores_confirmados, meta_eleitores) VALUES
(1, 3, 'Rui Barbosa', '71988775566', 'frederico@exemplo.com', 'Salvador', 'Boa Viagem', '10', 'media', 50, 'ativo', 'Liderança ativa', '2026-04-10 23:34:10', '2026-04-10 23:34:10', NULL, 1200, NULL, 0, 100),
(2, 3, 'Teste Liderança', '71988887766', 'teste@exemplo.com', 'Salvador', 'Centro', NULL, 'media', 0, 'ativo', NULL, '2026-04-11 00:05:10', '2026-04-11 00:05:10', NULL, 0, NULL, 0, 100),
(3, 3, 'João Silva', '71988775566', NULL, 'Salvador', NULL, NULL, 'media', 0, 'ativo', NULL, '2026-04-11 00:06:32', '2026-04-11 00:06:32', NULL, 3, NULL, 0, 100),
(4, 3, 'Liderança Salvador 1', '71998887701', 'lideranca.ssa1@exemplo.com', 'Salvador', 'Bairro 1', NULL, 'media', 0, 'ativo', NULL, '2026-04-11 00:48:08', '2026-04-11 00:48:08', NULL, 3, 3, 0, 100),
(5, 3, 'Liderança Salvador 2', '71998887702', 'lideranca.ssa2@exemplo.com', 'Salvador', 'Bairro 2', NULL, 'media', 0, 'ativo', NULL, '2026-04-11 00:48:08', '2026-04-11 00:48:08', NULL, 3, 3, 0, 100),
(6, 3, 'Liderança Salvador 3', '71998887703', 'lideranca.ssa3@exemplo.com', 'Salvador', 'Bairro 3', NULL, 'media', 0, 'ativo', NULL, '2026-04-11 00:48:08', '2026-04-11 00:48:08', NULL, 3, 3, 0, 100),
(7, 3, 'Liderança Feira 1', '75998887701', 'lideranca.fsa1@exemplo.com', 'Feira de Santana', 'Centro', NULL, 'media', 0, 'ativo', NULL, '2026-04-11 00:48:08', '2026-04-11 00:48:08', NULL, 2, 1, 0, 100),
(8, 3, 'Liderança Feira 2', '75998887702', 'lideranca.fsa2@exemplo.com', 'Feira de Santana', 'Kalilândia', NULL, 'media', 0, 'ativo', NULL, '2026-04-11 00:48:08', '2026-04-11 00:48:08', NULL, 2, 1, 0, 100);

-- Inserir Eleitores
INSERT INTO eleitores (id, candidato_id, lideranca_id, coordenador_id, nome, cpf, telefone, email, municipio, bairro, zona, secao, titulo_eleitor, local_votacao, status_apoio, nivel_engajamento, confirmado, compareceu_evento, observacoes, tags, data_captacao, created_at, updated_at) VALUES
(1, 3, 3, NULL, 'Maria Santos', NULL, '71999887701', 'maria@exemplo.com', 'Salvador', 'Centro', NULL, NULL, NULL, NULL, 'apoiador', 'baixo', 0, 0, NULL, NULL, '2026-04-11', '2026-04-11 00:06:55', '2026-04-11 00:06:55'),
(2, 3, 3, NULL, 'José Oliveira', NULL, '71999887702', 'jose@exemplo.com', 'Salvador', 'Liberdade', NULL, NULL, NULL, NULL, 'apoiador', 'medio', 0, 0, NULL, NULL, '2026-04-11', '2026-04-11 00:07:20', '2026-04-11 00:07:20'),
(3, 3, 3, NULL, 'Ana Costa', NULL, '71999887703', 'ana@exemplo.com', 'Salvador', 'Pituba', NULL, NULL, NULL, NULL, 'militante', 'alto', 1, 0, NULL, NULL, '2026-04-11', '2026-04-11 00:07:45', '2026-04-11 00:07:45'),
(4, 3, 4, 3, 'Pedro Alves', NULL, '71999887704', NULL, 'Salvador', 'Bairro 1', NULL, NULL, NULL, NULL, 'apoiador', 'baixo', 0, 0, NULL, NULL, '2026-04-11', '2026-04-11 00:48:30', '2026-04-11 00:48:30'),
(5, 3, 4, 3, 'Carla Lima', NULL, '71999887705', NULL, 'Salvador', 'Bairro 1', NULL, NULL, NULL, NULL, 'apoiador', 'medio', 0, 0, NULL, NULL, '2026-04-11', '2026-04-11 00:48:45', '2026-04-11 00:48:45'),
(6, 3, 4, 3, 'Roberto Souza', NULL, '71999887706', NULL, 'Salvador', 'Bairro 1', NULL, NULL, NULL, NULL, 'militante', 'alto', 1, 0, NULL, NULL, '2026-04-11', '2026-04-11 00:49:00', '2026-04-11 00:49:00');
