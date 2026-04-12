-- SEED COMPLETO - MEUPOLITICO.DIGITAL
-- Dados de exemplo para demonstração

-- ====================
-- 1. CANDIDATOS / USUÁRIOS
-- ====================
-- Já temos admin ID 100

-- Adicionar candidato principal (ID 3)
INSERT OR IGNORE INTO candidatos (id, nome, email, cargo, municipio, partido, status, tipo, senha, created_at)
VALUES (3, 'Carlos Eduardo Silva', 'carlos@exemplo.com', 'Deputado Estadual', 'Salvador', 'PSDB', 'ativo', 'candidato', 'senha123', datetime('now'));

-- ====================
-- 2. COORDENADORES
-- ====================
INSERT OR IGNORE INTO coordenadores (candidato_id, nome, telefone, email, municipio, area_atuacao, status, meta_liderancas, meta_eleitores, created_at)
VALUES 
(3, 'Roberto Carlos Souza', '71987654325', 'roberto@exemplo.com', 'Salvador', 'municipal', 'ativo', 10, 1000, datetime('now')),
(3, 'Ana Paula Costa', '71987654326', 'ana@exemplo.com', 'Feira de Santana', 'municipal', 'ativo', 10, 1000, datetime('now')),
(3, 'José Ricardo Lima', '71987654327', 'jose@exemplo.com', 'Vitória da Conquista', 'regional', 'ativo', 10, 1000, datetime('now')),
(3, 'Mariana Oliveira Santos', '71987654328', 'mariana@exemplo.com', 'Camaçari', 'territorial', 'ativo', 10, 1000, datetime('now')),
(3, 'Pedro Henrique Alves', '71987654329', 'pedro@exemplo.com', 'Ilhéus', 'regional', 'ativo', 10, 1000, datetime('now'));

-- ====================
-- 3. LIDERANÇAS
-- ====================
INSERT OR IGNORE INTO liderancas (candidato_id, coordenador_id, nome, telefone, email, municipio, bairro, zona_eleitoral, status, meta_eleitores, created_at)
VALUES 
(3, 11, 'João Silva Santos', '71998887710', 'joao@exemplo.com', 'Salvador', 'Barra', '001', 'ativo', 100, datetime('now')),
(3, 11, 'Maria Fernanda Costa', '71998887711', 'maria@exemplo.com', 'Salvador', 'Pituba', '002', 'ativo', 100, datetime('now')),
(3, 11, 'Pedro Augusto Lima', '71998887712', 'pedro@exemplo.com', 'Salvador', 'Itapuã', '003', 'ativo', 100, datetime('now')),
(3, 11, 'Ana Beatriz Souza', '71998887713', 'ana@exemplo.com', 'Salvador', 'Brotas', '004', 'ativo', 100, datetime('now')),
(3, 11, 'Carlos Alberto Dias', '71998887714', 'carlos@exemplo.com', 'Salvador', 'Cajazeiras', '005', 'ativo', 100, datetime('now')),
(3, 11, 'Juliana Cristina Rocha', '71998887715', 'juliana@exemplo.com', 'Salvador', 'Piat ã', '006', 'ativo', 100, datetime('now')),
(3, 11, 'Fernando José Almeida', '71998887716', 'fernando@exemplo.com', 'Salvador', 'Rio Vermelho', '007', 'ativo', 100, datetime('now')),
(3, 11, 'Patrícia Helena Cruz', '71998887717', 'patricia@exemplo.com', 'Salvador', 'Ondina', '008', 'ativo', 100, datetime('now')),
(3, 11, 'Rafael Gustavo Melo', '71998887718', 'rafael@exemplo.com', 'Salvador', 'Federação', '009', 'ativo', 100, datetime('now')),
(3, 11, 'Camila Vitória Barros', '71998887719', 'camila@exemplo.com', 'Salvador', 'Acupe', '010', 'ativo', 100, datetime('now')),
(3, 11, 'Ricardo Henrique Pinto', '71998887720', 'ricardo@exemplo.com', 'Salvador', 'Periperi', '011', 'ativo', 100, datetime('now')),
(3, 11, 'Ursula Fernandes Costa', '71998887721', 'ursula@exemplo.com', 'Salvador', 'Stella Maris', '012', 'ativo', 100, datetime('now')),
(3, 12, 'Lucas Gabriel Silva', '71998887722', 'lucas@exemplo.com', 'Feira de Santana', 'Centro', '001', 'ativo', 100, datetime('now')),
(3, 12, 'Isabela Cristine Moreira', '71998887723', 'isabela@exemplo.com', 'Feira de Santana', 'Kalilândia', '002', 'ativo', 100, datetime('now')),
(3, 13, 'Thiago Oliveira Reis', '71998887724', 'thiago@exemplo.com', 'Vitória da Conquista', 'Candeias', '001', 'ativo', 100, datetime('now'));

-- ====================
-- 4. ELEITORES
-- ====================
INSERT OR IGNORE INTO eleitores (candidato_id, lideranca_id, coordenador_id, nome, telefone, email, municipio, bairro, zona, secao, status_apoio, nivel_engajamento, data_captacao, created_at)
VALUES 
-- Eleitores liderados por João Silva Santos (ID 7)
(3, 7, 11, 'Eleitor Test 7A', '7199900701', null, 'Salvador', 'Barra', '001', '001', 'apoiador', 'alto', '2026-04-11', datetime('now')),
(3, 7, 11, 'Eleitor Test 7B', '7199900702', null, 'Salvador', 'Barra', '001', '002', 'simpatizante', 'medio', '2026-04-11', datetime('now')),
(3, 7, 11, 'Eleitor Test 7C', '7199900703', null, 'Salvador', 'Barra', '001', '003', 'militante', 'alto', '2026-04-11', datetime('now')),

-- Eleitores liderados por Maria Fernanda Costa (ID 8)
(3, 8, 11, 'Eleitor Test 8A', '7199900801', null, 'Salvador', 'Pituba', '002', '001', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 8, 11, 'Eleitor Test 8B', '7199900802', null, 'Salvador', 'Pituba', '002', '002', 'militante', 'alto', '2026-04-11', datetime('now')),
(3, 8, 11, 'Eleitor Test 8C', '7199900803', null, 'Salvador', 'Pituba', '002', '003', 'apoiador', 'medio', '2026-04-11', datetime('now')),

-- Mais eleitores para outras lideranças (IDs 9-21)
(3, 9, 11, 'Eleitor Test 9A', '7199900901', null, 'Salvador', 'Itapuã', '003', '001', 'simpatizante', 'baixo', '2026-04-11', datetime('now')),
(3, 9, 11, 'Eleitor Test 9B', '7199900902', null, 'Salvador', 'Itapuã', '003', '002', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 9, 11, 'Eleitor Test 9C', '7199900903', null, 'Salvador', 'Itapuã', '003', '003', 'apoiador', 'alto', '2026-04-11', datetime('now')),

(3, 10, 11, 'Eleitor Test 10A', '7199901001', null, 'Salvador', 'Brotas', '004', '001', 'militante', 'alto', '2026-04-11', datetime('now')),
(3, 10, 11, 'Eleitor Test 10B', '7199901002', null, 'Salvador', 'Brotas', '004', '002', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 10, 11, 'Eleitor Test 10C', '7199901003', null, 'Salvador', 'Brotas', '004', '003', 'simpatizante', 'baixo', '2026-04-11', datetime('now')),

(3, 11, 11, 'Eleitor Test 11A', '7199901101', null, 'Salvador', 'Cajazeiras', '005', '001', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 11, 11, 'Eleitor Test 11B', '7199901102', null, 'Salvador', 'Cajazeiras', '005', '002', 'apoiador', 'alto', '2026-04-11', datetime('now')),
(3, 11, 11, 'Eleitor Test 11C', '7199901103', null, 'Salvador', 'Cajazeiras', '005', '003', 'militante', 'alto', '2026-04-11', datetime('now')),

(3, 12, 11, 'Eleitor Test 12A', '7199901201', null, 'Salvador', 'Piatã', '006', '001', 'simpatizante', 'baixo', '2026-04-11', datetime('now')),
(3, 12, 11, 'Eleitor Test 12B', '7199901202', null, 'Salvador', 'Piatã', '006', '002', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 12, 11, 'Eleitor Test 12C', '7199901203', null, 'Salvador', 'Piatã', '006', '003', 'apoiador', 'medio', '2026-04-11', datetime('now')),

(3, 13, 11, 'Eleitor Test 13A', '7199901301', null, 'Salvador', 'Rio Vermelho', '007', '001', 'militante', 'alto', '2026-04-11', datetime('now')),
(3, 13, 11, 'Eleitor Test 13B', '7199901302', null, 'Salvador', 'Rio Vermelho', '007', '002', 'apoiador', 'alto', '2026-04-11', datetime('now')),
(3, 13, 11, 'Eleitor Test 13C', '7199901303', null, 'Salvador', 'Rio Vermelho', '007', '003', 'apoiador', 'medio', '2026-04-11', datetime('now')),

(3, 14, 11, 'Eleitor Test 14A', '7199901401', null, 'Salvador', 'Ondina', '008', '001', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 14, 11, 'Eleitor Test 14B', '7199901402', null, 'Salvador', 'Ondina', '008', '002', 'simpatizante', 'baixo', '2026-04-11', datetime('now')),
(3, 14, 11, 'Eleitor Test 14C', '7199901403', null, 'Salvador', 'Ondina', '008', '003', 'apoiador', 'medio', '2026-04-11', datetime('now')),

(3, 15, 11, 'Eleitor Test 15A', '7199901501', null, 'Salvador', 'Federação', '009', '001', 'militante', 'alto', '2026-04-11', datetime('now')),
(3, 15, 11, 'Eleitor Test 15B', '7199901502', null, 'Salvador', 'Federação', '009', '002', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 15, 11, 'Eleitor Test 15C', '7199901503', null, 'Salvador', 'Federação', '009', '003', 'apoiador', 'alto', '2026-04-11', datetime('now')),

(3, 16, 11, 'Eleitor Test 16A', '7199901601', null, 'Salvador', 'Acupe', '010', '001', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 16, 11, 'Eleitor Test 16B', '7199901602', null, 'Salvador', 'Acupe', '010', '002', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 16, 11, 'Eleitor Test 16C', '7199901603', null, 'Salvador', 'Acupe', '010', '003', 'simpatizante', 'baixo', '2026-04-11', datetime('now')),

(3, 21, 11, 'Eleitor Test 21A', '7199902101', null, 'Salvador', 'Stella Maris', '012', '001', 'militante', 'alto', '2026-04-11', datetime('now')),
(3, 21, 11, 'Eleitor Test 21B', '7199900212', null, 'Salvador', 'Stella Maris', '012', '002', 'apoiador', 'medio', '2026-04-11', datetime('now'));

-- Eleitores de Feira de Santana (nova entrada para testar filtro de busca)
INSERT OR IGNORE INTO eleitores (candidato_id, lideranca_id, coordenador_id, nome, telefone, municipio, status_apoio, nivel_engajamento, data_captacao, created_at)
VALUES 
(3, 22, 12, 'Teste Feira de Santana 1', '71999001', 'Feira de Santana', 'apoiador', 'medio', '2026-04-12', datetime('now'));

-- ====================
-- 5. AGENDA (com campo progresso)
-- ====================
INSERT OR IGNORE INTO agenda (candidato_id, titulo, descricao, data_hora, local, municipio, tipo, prioridade, status, progresso, created_at)
VALUES 
(3, 'Visita ao Governador da Bahia', 'Reunião estratégica sobre alianças', '2026-04-13 09:50:00', 'Palácio de Ondina', 'Salvador', 'reuniao', 'alta', 'pendente', 0, '2026-04-11 10:06:56'),
(3, 'Reunião - Michelle', 'Encontro será tratado assuntos políticos', '2026-04-11 14:45:00', 'Feira de Santana', 'Feira de Santana', 'visita', 'media', 'concluido', 100, '2026-04-11 16:44:44'),
(3, 'Encontro na casa de praia', 'Evento com apoiadores', '2026-04-15 07:00:00', 'Praia de Stella Maris', 'Salvador', 'evento', 'alta', 'pendente', 0, '2026-04-12 19:45:22'),
(3, 'Ligação com Coordenadores', 'Alinhamento semanal', '2026-04-14 15:00:00', null, null, 'ligacao', 'media', 'pendente', 50, datetime('now')),
(3, 'Gravação de Propaganda', 'Gravação do horário eleitoral', '2026-04-16 10:00:00', 'Estúdio TV Bahia', 'Salvador', 'tarefa', 'alta', 'pendente', 25, datetime('now'));

-- ====================
-- 6. PROFISSIONAIS
-- ====================
INSERT OR IGNORE INTO profissionais (candidato_id, nome, profissao, telefone, email, municipio, area_especialidade, status, created_at)
VALUES 
(3, 'Dr. João Medicina', 'Médico', '71987650001', 'dr.joao@exemplo.com', 'Salvador', 'Cardiologia', 'ativo', datetime('now')),
(3, 'Dra. Ana Advocacia', 'Advogada', '71987650002', 'dra.ana@exemplo.com', 'Salvador', 'Direito Eleitoral', 'ativo', datetime('now')),
(3, 'Eng. Carlos Construção', 'Engenheiro Civil', '71987650003', 'eng.carlos@exemplo.com', 'Feira de Santana', 'Obras Públicas', 'ativo', datetime('now')),
(3, 'Prof. Maria Educação', 'Professora', '71987650004', 'prof.maria@exemplo.com', 'Salvador', 'Pedagogia', 'ativo', datetime('now'));

-- ====================
-- VERIFICAR DADOS INSERIDOS
-- ====================
SELECT '=== RESUMO DOS DADOS ===' as info;
SELECT 'Coordenadores: ' || COUNT(*) as total FROM coordenadores WHERE candidato_id = 3;
SELECT 'Lideranças: ' || COUNT(*) as total FROM liderancas WHERE candidato_id = 3;
SELECT 'Eleitores: ' || COUNT(*) as total FROM eleitores WHERE candidato_id = 3;
SELECT 'Eventos Agenda: ' || COUNT(*) as total FROM agenda WHERE candidato_id = 3;
SELECT 'Profissionais: ' || COUNT(*) as total FROM profissionais WHERE candidato_id = 3;
