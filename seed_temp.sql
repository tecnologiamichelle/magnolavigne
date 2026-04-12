-- Desabilitar FKs temporariamente
PRAGMA foreign_keys = OFF;

-- CANDIDATO
INSERT OR IGNORE INTO candidatos (id, nome, email, cargo, municipio, partido, status, tipo, senha, created_at)
VALUES (3, 'Carlos Eduardo Silva', 'carlos@exemplo.com', 'Deputado Estadual', 'Salvador', 'PSDB', 'ativo', 'candidato', 'senha123', datetime('now'));

-- COORDENADORES (IDs 11-15)
INSERT OR IGNORE INTO coordenadores (id, candidato_id, nome, telefone, email, municipio, area_atuacao, status, meta_liderancas, meta_eleitores, created_at)
VALUES 
(11, 3, 'Roberto Carlos Souza', '71987654325', 'roberto@exemplo.com', 'Salvador', 'municipal', 'ativo', 10, 1000, datetime('now')),
(12, 3, 'Ana Paula Costa', '71987654326', 'ana@exemplo.com', 'Feira de Santana', 'municipal', 'ativo', 10, 1000, datetime('now')),
(13, 3, 'José Ricardo Lima', '71987654327', 'jose@exemplo.com', 'Vitória da Conquista', 'regional', 'ativo', 10, 1000, datetime('now')),
(14, 3, 'Mariana Oliveira Santos', '71987654328', 'mariana@exemplo.com', 'Camaçari', 'territorial', 'ativo', 10, 1000, datetime('now')),
(15, 3, 'Pedro Henrique Alves', '71987654329', 'pedro@exemplo.com', 'Ilhéus', 'regional', 'ativo', 10, 1000, datetime('now'));

-- LIDERANÇAS (IDs 7-22)
INSERT OR IGNORE INTO liderancas (id, candidato_id, coordenador_id, nome, telefone, email, municipio, bairro, zona_eleitoral, status, meta_eleitores, created_at)
VALUES 
(7, 3, 11, 'João Silva Santos', '71998887710', 'joao@exemplo.com', 'Salvador', 'Barra', '001', 'ativo', 100, datetime('now')),
(8, 3, 11, 'Maria Fernanda Costa', '71998887711', 'maria@exemplo.com', 'Salvador', 'Pituba', '002', 'ativo', 100, datetime('now')),
(9, 3, 11, 'Pedro Augusto Lima', '71998887712', 'pedro@exemplo.com', 'Salvador', 'Itapuã', '003', 'ativo', 100, datetime('now')),
(10, 3, 11, 'Ana Beatriz Souza', '71998887713', 'ana@exemplo.com', 'Salvador', 'Brotas', '004', 'ativo', 100, datetime('now')),
(11, 3, 11, 'Carlos Alberto Dias', '71998887714', 'carlos@exemplo.com', 'Salvador', 'Cajazeiras', '005', 'ativo', 100, datetime('now')),
(12, 3, 11, 'Juliana Cristina Rocha', '71998887715', 'juliana@exemplo.com', 'Salvador', 'Piatã', '006', 'ativo', 100, datetime('now')),
(13, 3, 11, 'Fernando José Almeida', '71998887716', 'fernando@exemplo.com', 'Salvador', 'Rio Vermelho', '007', 'ativo', 100, datetime('now')),
(14, 3, 11, 'Patrícia Helena Cruz', '71998887717', 'patricia@exemplo.com', 'Salvador', 'Ondina', '008', 'ativo', 100, datetime('now')),
(15, 3, 11, 'Rafael Gustavo Melo', '71998887718', 'rafael@exemplo.com', 'Salvador', 'Federação', '009', 'ativo', 100, datetime('now')),
(16, 3, 11, 'Camila Vitória Barros', '71998887719', 'camila@exemplo.com', 'Salvador', 'Acupe', '010', 'ativo', 100, datetime('now')),
(17, 3, 11, 'Ricardo Henrique Pinto', '71998887720', 'ricardo@exemplo.com', 'Salvador', 'Periperi', '011', 'ativo', 100, datetime('now')),
(21, 3, 11, 'Ursula Fernandes Costa', '71998887721', 'ursula@exemplo.com', 'Salvador', 'Stella Maris', '012', 'ativo', 100, datetime('now')),
(22, 3, 12, 'Lucas Gabriel Silva', '71998887722', 'lucas@exemplo.com', 'Feira de Santana', 'Centro', '001', 'ativo', 100, datetime('now'));

-- ELEITORES (30 no total)
INSERT OR IGNORE INTO eleitores (candidato_id, lideranca_id, coordenador_id, nome, telefone, municipio, bairro, zona, secao, status_apoio, nivel_engajamento, data_captacao, created_at)
VALUES 
-- 3 para cada liderança em Salvador
(3, 7, 11, 'Eleitor Test 7A', '7199900701', 'Salvador', 'Barra', '001', '001', 'apoiador', 'alto', '2026-04-11', datetime('now')),
(3, 7, 11, 'Eleitor Test 7B', '7199900702', 'Salvador', 'Barra', '001', '002', 'simpatizante', 'medio', '2026-04-11', datetime('now')),
(3, 7, 11, 'Eleitor Test 7C', '7199900703', 'Salvador', 'Barra', '001', '003', 'militante', 'alto', '2026-04-11', datetime('now')),
(3, 8, 11, 'Eleitor Test 8A', '7199900801', 'Salvador', 'Pituba', '002', '001', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 8, 11, 'Eleitor Test 8B', '7199900802', 'Salvador', 'Pituba', '002', '002', 'militante', 'alto', '2026-04-11', datetime('now')),
(3, 8, 11, 'Eleitor Test 8C', '7199900803', 'Salvador', 'Pituba', '002', '003', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 9, 11, 'Eleitor Test 9A', '7199900901', 'Salvador', 'Itapuã', '003', '001', 'simpatizante', 'baixo', '2026-04-11', datetime('now')),
(3, 9, 11, 'Eleitor Test 9B', '7199900902', 'Salvador', 'Itapuã', '003', '002', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 9, 11, 'Eleitor Test 9C', '7199900903', 'Salvador', 'Itapuã', '003', '003', 'apoiador', 'alto', '2026-04-11', datetime('now')),
(3, 10, 11, 'Eleitor Test 10A', '7199901001', 'Salvador', 'Brotas', '004', '001', 'militante', 'alto', '2026-04-11', datetime('now')),
(3, 10, 11, 'Eleitor Test 10B', '7199901002', 'Salvador', 'Brotas', '004', '002', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 10, 11, 'Eleitor Test 10C', '7199901003', 'Salvador', 'Brotas', '004', '003', 'simpatizante', 'baixo', '2026-04-11', datetime('now')),
(3, 11, 11, 'Eleitor Test 11A', '7199901101', 'Salvador', 'Cajazeiras', '005', '001', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 11, 11, 'Eleitor Test 11B', '7199901102', 'Salvador', 'Cajazeiras', '005', '002', 'apoiador', 'alto', '2026-04-11', datetime('now')),
(3, 11, 11, 'Eleitor Test 11C', '7199901103', 'Salvador', 'Cajazeiras', '005', '003', 'militante', 'alto', '2026-04-11', datetime('now')),
(3, 12, 11, 'Eleitor Test 12A', '7199901201', 'Salvador', 'Piatã', '006', '001', 'simpatizante', 'baixo', '2026-04-11', datetime('now')),
(3, 12, 11, 'Eleitor Test 12B', '7199901202', 'Salvador', 'Piatã', '006', '002', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 12, 11, 'Eleitor Test 12C', '7199901203', 'Salvador', 'Piatã', '006', '003', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 13, 11, 'Eleitor Test 13A', '7199901301', 'Salvador', 'Rio Vermelho', '007', '001', 'militante', 'alto', '2026-04-11', datetime('now')),
(3, 13, 11, 'Eleitor Test 13B', '7199901302', 'Salvador', 'Rio Vermelho', '007', '002', 'apoiador', 'alto', '2026-04-11', datetime('now')),
(3, 13, 11, 'Eleitor Test 13C', '7199901303', 'Salvador', 'Rio Vermelho', '007', '003', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 14, 11, 'Eleitor Test 14A', '7199901401', 'Salvador', 'Ondina', '008', '001', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 14, 11, 'Eleitor Test 14B', '7199901402', 'Salvador', 'Ondina', '008', '002', 'simpatizante', 'baixo', '2026-04-11', datetime('now')),
(3, 14, 11, 'Eleitor Test 14C', '7199901403', 'Salvador', 'Ondina', '008', '003', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 15, 11, 'Eleitor Test 15A', '7199901501', 'Salvador', 'Federação', '009', '001', 'militante', 'alto', '2026-04-11', datetime('now')),
(3, 15, 11, 'Eleitor Test 15B', '7199901502', 'Salvador', 'Federação', '009', '002', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 15, 11, 'Eleitor Test 15C', '7199901503', 'Salvador', 'Federação', '009', '003', 'apoiador', 'alto', '2026-04-11', datetime('now')),
(3, 16, 11, 'Eleitor Test 16A', '7199901601', 'Salvador', 'Acupe', '010', '001', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 16, 11, 'Eleitor Test 16B', '7199901602', 'Salvador', 'Acupe', '010', '002', 'apoiador', 'medio', '2026-04-11', datetime('now')),
(3, 21, 11, 'Eleitor Test 21B', '7199900212', 'Salvador', 'Stella Maris', '012', '002', 'apoiador', 'medio', '2026-04-11', datetime('now'));

-- 1 para Feira de Santana
INSERT OR IGNORE INTO eleitores (candidato_id, lideranca_id, coordenador_id, nome, telefone, municipio, status_apoio, nivel_engajamento, data_captacao, created_at)
VALUES 
(3, 22, 12, 'Teste Feira de Santana 1', '71999001', 'Feira de Santana', 'apoiador', 'medio', '2026-04-12', datetime('now'));

-- AGENDA
INSERT OR IGNORE INTO agenda (candidato_id, titulo, descricao, data_hora, local, municipio, tipo, prioridade, status, progresso, created_at)
VALUES 
(3, 'Visita ao Governador da Bahia', 'Reunião estratégica sobre alianças', '2026-04-13 09:50:00', 'Palácio de Ondina', 'Salvador', 'reuniao', 'alta', 'pendente', 0, '2026-04-11 10:06:56'),
(3, 'Reunião - Michelle', 'Encontro será tratado assuntos políticos', '2026-04-11 14:45:00', 'Feira de Santana', 'Feira de Santana', 'visita', 'media', 'concluido', 100, '2026-04-11 16:44:44'),
(3, 'Encontro na casa de praia', 'Evento com apoiadores', '2026-04-15 07:00:00', 'Praia de Stella Maris', 'Salvador', 'evento', 'alta', 'pendente', 0, '2026-04-12 19:45:22'),
(3, 'Ligação com Coordenadores', 'Alinhamento semanal', '2026-04-14 15:00:00', null, null, 'ligacao', 'media', 'pendente', 50, datetime('now')),
(3, 'Gravação de Propaganda', 'Gravação do horário eleitoral', '2026-04-16 10:00:00', 'Estúdio TV Bahia', 'Salvador', 'tarefa', 'alta', 'pendente', 25, datetime('now'));

-- PROFISSIONAIS
INSERT OR IGNORE INTO profissionais (candidato_id, nome, profissao, telefone, email, municipio, area_especialidade, status, created_at)
VALUES 
(3, 'Dr. João Medicina', 'Médico', '71987650001', 'dr.joao@exemplo.com', 'Salvador', 'Cardiologia', 'ativo', datetime('now')),
(3, 'Dra. Ana Advocacia', 'Advogada', '71987650002', 'dra.ana@exemplo.com', 'Salvador', 'Direito Eleitoral', 'ativo', datetime('now')),
(3, 'Eng. Carlos Construção', 'Engenheiro Civil', '71987650003', 'eng.carlos@exemplo.com', 'Feira de Santana', 'Obras Públicas', 'ativo', datetime('now')),
(3, 'Prof. Maria Educação', 'Professora', '71987650004', 'prof.maria@exemplo.com', 'Salvador', 'Pedagogia', 'ativo', datetime('now'));

-- Reabilitar FKs
PRAGMA foreign_keys = ON;

-- Verificações
SELECT 'Coordenadores: ' || COUNT(*) FROM coordenadores WHERE candidato_id = 3;
SELECT 'Lideranças: ' || COUNT(*) FROM liderancas WHERE candidato_id = 3;
SELECT 'Eleitores: ' || COUNT(*) FROM eleitores WHERE candidato_id = 3;
SELECT 'Agenda: ' || COUNT(*) FROM agenda WHERE candidato_id = 3;
SELECT 'Profissionais: ' || COUNT(*) FROM profissionais WHERE candidato_id = 3;
