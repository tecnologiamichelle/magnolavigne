-- Seed simplificado sem foreign keys
PRAGMA foreign_keys = OFF;

-- Limpar dados
DELETE FROM eleitores;
DELETE FROM liderancas;
DELETE FROM coordenadores;
DELETE FROM candidatos;

-- Candidatos
INSERT INTO candidatos (id, email, senha, nome, cargo, municipio, status, tipo, partido) VALUES
(3, 'admin@magnolavigne.com.br', 'Admin@2026', 'Administrador Magno Lavigne', 'Administrador', 'Salvador', 'ativo', 'admin', 'PV');

-- Coordenadores
INSERT INTO coordenadores (id, candidato_id, nome, telefone, email, municipio, area_atuacao, status, qtd_liderancas, qtd_eleitores_captados) VALUES
(1, 3, 'Anísio Teixeira', '71988881122', 'anisio@coordenador.com', 'Salvador', 'Centro', 'ativo', 5, 150),
(2, 3, 'Jorge Amado', '71988882233', 'jorge@coordenador.com', 'Ilhéus', 'Sul da Bahia', 'ativo', 3, 80),
(3, 3, 'Castro Alves', '71988883344', 'castro@coordenador.com', 'Salvador', 'Liberdade', 'ativo', 4, 120);

-- Lideranças
INSERT INTO liderancas (id, candidato_id, nome, telefone, email, municipio, bairro, nivel_influencia, status, qtd_eleitores, coordenador_id) VALUES
(1, 3, 'Rui Barbosa', '71988775566', 'rui@exemplo.com', 'Salvador', 'Boa Viagem', 'alta', 'ativo', 50, 1),
(2, 3, 'Teste Liderança', '71988887766', 'teste@exemplo.com', 'Salvador', 'Centro', 'media', 'ativo', 30, 1),
(3, 3, 'João Silva', '71988775566', 'joao@exemplo.com', 'Salvador', 'Pituba', 'media', 'ativo', 25, 2),
(4, 3, 'Liderança Salvador 1', '71998887701', 'lider1@exemplo.com', 'Salvador', 'Bairro 1', 'media', 'ativo', 20, 3),
(5, 3, 'Liderança Salvador 2', '71998887702', 'lider2@exemplo.com', 'Salvador', 'Bairro 2', 'alta', 'ativo', 35, 3),
(6, 3, 'Maria Santos', '71998887703', 'maria@exemplo.com', 'Feira de Santana', 'Centro', 'alta', 'ativo', 40, 2),
(7, 3, 'Pedro Costa', '75998887701', 'pedro@exemplo.com', 'Feira de Santana', 'Kalilândia', 'media', 'ativo', 18, 1),
(8, 3, 'Ana Oliveira', '75998887702', 'ana@exemplo.com', 'Vitória da Conquista', 'Centro', 'alta', 'ativo', 45, 2);

-- Eleitores
INSERT INTO eleitores (candidato_id, lideranca_id, coordenador_id, nome, telefone, email, municipio, bairro, status_apoio, nivel_engajamento, confirmado) VALUES
(3, 1, 1, 'Maria Santos', '71999887701', 'maria.eleitor@exemplo.com', 'Salvador', 'Centro', 'apoiador', 'medio', 1),
(3, 1, 1, 'José Oliveira', '71999887702', 'jose@exemplo.com', 'Salvador', 'Liberdade', 'militante', 'alto', 1),
(3, 2, 1, 'Ana Costa', '71999887703', 'ana.eleitor@exemplo.com', 'Salvador', 'Pituba', 'apoiador', 'baixo', 0),
(3, 3, 2, 'Pedro Alves', '71999887704', 'pedro@exemplo.com', 'Salvador', 'Bairro 1', 'apoiador', 'medio', 0),
(3, 4, 3, 'Carla Lima', '71999887705', 'carla@exemplo.com', 'Salvador', 'Bairro 1', 'militante', 'alto', 1),
(3, 5, 3, 'Roberto Souza', '71999887706', 'roberto@exemplo.com', 'Salvador', 'Bairro 2', 'apoiador', 'medio', 1),
(3, 6, 2, 'Fernanda Silva', '75999887707', 'fernanda@exemplo.com', 'Feira de Santana', 'Centro', 'militante', 'alto', 1),
(3, 7, 1, 'Carlos Dias', '75999887708', 'carlos@exemplo.com', 'Feira de Santana', 'Kalilândia', 'apoiador', 'medio', 0),
(3, 8, 2, 'Juliana Rocha', '77999887709', 'juliana@exemplo.com', 'Vitória da Conquista', 'Centro', 'apoiador', 'medio', 1),
(3, 1, 1, 'Ricardo Mendes', '71999887710', 'ricardo@exemplo.com', 'Salvador', 'Boa Viagem', 'militante', 'alto', 1);

PRAGMA foreign_keys = ON;
