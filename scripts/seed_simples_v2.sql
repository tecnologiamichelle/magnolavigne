-- SEED SIMPLIFICADO - SEM FOREIGN KEYS PROBLEMÁTICAS

-- 1. COORDENADORES (sem territorio_id)
INSERT INTO coordenadores (candidato_id, nome, telefone, email, municipio, area_atuacao, status) VALUES
(3, 'Carlos Eduardo Silva', '71987654321', 'carlos.silva@exemplo.com', 'Salvador', 'Articulação Política', 'ativo'),
(3, 'Maria Fernanda Santos', '71987654322', 'maria.santos@exemplo.com', 'Camaçari', 'Mobilização Social', 'ativo'),
(3, 'João Pedro Oliveira', '71987654323', 'joao.oliveira@exemplo.com', 'Lauro de Freitas', 'Comunicação', 'ativo'),
(3, 'Ana Carolina Lima', '71987654324', 'ana.lima@exemplo.com', 'Feira de Santana', 'Gestão de Eventos', 'ativo'),
(3, 'Roberto Carlos Souza', '71987654325', 'roberto.souza@exemplo.com', 'Vitória da Conquista', 'Logística', 'ativo');

-- 2. LIDERANÇAS (sem territorio_id, 3 por coordenador)
INSERT INTO liderancas (candidato_id, coordenador_id, nome, telefone, email, municipio, bairro, zona_eleitoral, nivel_influencia, qtd_influenciados, status) VALUES
-- Coordenador 1
(3, 1, 'André Luiz Barbosa', '71998887701', 'andre.barbosa@exemplo.com', 'Salvador', 'Barra', '001', 'alta', 150, 'ativo'),
(3, 1, 'Beatriz Santos Carvalho', '71998887702', 'beatriz.carvalho@exemplo.com', 'Salvador', 'Itapuã', '002', 'media', 80, 'ativo'),
(3, 1, 'Carlos Alberto Menezes', '71998887703', 'carlos.menezes@exemplo.com', 'Salvador', 'Cajazeiras', '003', 'alta', 120, 'ativo'),
-- Coordenador 2
(3, 2, 'Fabiana Costa Nunes', '71998887706', 'fabiana.nunes@exemplo.com', 'Camaçari', 'Centro', '001', 'alta', 110, 'ativo'),
(3, 2, 'Gabriel Souza Pinto', '71998887707', 'gabriel.pinto@exemplo.com', 'Camaçari', 'Gleba A', '002', 'media', 75, 'ativo'),
(3, 2, 'Helena Maria Santos', '71998887708', 'helena.santos@exemplo.com', 'Camaçari', 'Gleba C', '003', 'media', 85, 'ativo'),
-- Coordenador 3
(3, 3, 'Juliana Andrade Sousa', '71998887710', 'juliana.sousa@exemplo.com', 'Lauro de Freitas', 'Centro', '001', 'media', 90, 'ativo'),
(3, 3, 'Kevin Alves Moreira', '71998887711', 'kevin.moreira@exemplo.com', 'Lauro de Freitas', 'Vilas do Atlântico', '002', 'alta', 140, 'ativo'),
(3, 3, 'Larissa Cristina Barros', '71998887712', 'larissa.barros@exemplo.com', 'Lauro de Freitas', 'Itinga', '003', 'baixa', 60, 'ativo'),
-- Coordenador 4
(3, 4, 'Marcos Vinícius Silva', '71998887713', 'marcos.silva@exemplo.com', 'Feira de Santana', 'Centro', '001', 'alta', 160, 'ativo'),
(3, 4, 'Natália Rodrigues Lima', '71998887714', 'natalia.lima@exemplo.com', 'Feira de Santana', 'Mangabeira', '002', 'media', 100, 'ativo'),
(3, 4, 'Otávio César Costa', '71998887715', 'otavio.costa@exemplo.com', 'Feira de Santana', 'George Américo', '003', 'alta', 125, 'ativo'),
-- Coordenador 5
(3, 5, 'Sandra Maria Oliveira', '71998887719', 'sandra.oliveira@exemplo.com', 'Vitória da Conquista', 'Centro', '001', 'alta', 135, 'ativo'),
(3, 5, 'Thiago Henrique Dias', '71998887720', 'thiago.dias@exemplo.com', 'Vitória da Conquista', 'Brasil', '002', 'media', 90, 'ativo'),
(3, 5, 'Ursula Fernandes Costa', '71998887721', 'ursula.costa@exemplo.com', 'Vitória da Conquista', 'Candeias', '003', 'alta', 110, 'ativo');

-- 3. ELEITORES (2 por liderança)
INSERT INTO eleitores (candidato_id, lideranca_id, coordenador_id, nome, cpf, telefone, email, municipio, bairro, zona, secao, status_apoio, nivel_engajamento, confirmado, compareceu_evento, data_captacao) VALUES
-- Liderança 1
(3, 1, 1, 'Adriana Silva Santos', '12345678901', '71999001001', 'adriana.santos@email.com', 'Salvador', 'Barra', '001', '0012', 'apoiador', 'medio', 1, 1, '2026-01-15'),
(3, 1, 1, 'Bruno Costa Lima', '12345678902', '71999001002', 'bruno.lima@email.com', 'Salvador', 'Barra', '001', '0012', 'militante', 'alto', 1, 1, '2026-01-18'),
-- Liderança 2
(3, 2, 1, 'Carla Mendes Rocha', '12345678903', '71999001003', 'carla.rocha@email.com', 'Salvador', 'Itapuã', '002', '0025', 'simpatizante', 'baixo', 1, 0, '2026-02-01'),
(3, 2, 1, 'Diego Ferreira Souza', '12345678904', '71999001004', NULL, 'Salvador', 'Itapuã', '002', '0025', 'apoiador', 'medio', 1, 1, '2026-02-05'),
-- Liderança 3
(3, 3, 1, 'Elaine Santos Costa', '12345678905', '71999001005', 'elaine.costa@email.com', 'Salvador', 'Cajazeiras', '003', '0037', 'militante', 'alto', 1, 1, '2026-01-20'),
(3, 3, 1, 'Fábio Alves Pereira', '12345678906', '71999001006', NULL, 'Salvador', 'Cajazeiras', '003', '0037', 'apoiador', 'medio', 1, 0, '2026-01-25'),
-- Liderança 4
(3, 4, 2, 'Gisele Rodrigues Lima', '12345678907', '71999001007', 'gisele.lima@email.com', 'Camaçari', 'Centro', '001', '0010', 'simpatizante', 'baixo', 0, 0, '2026-02-10'),
(3, 4, 2, 'Henrique Sousa Dias', '12345678908', '71999001008', 'henrique.dias@email.com', 'Camaçari', 'Centro', '001', '0010', 'militante', 'alto', 1, 1, '2026-01-10'),
-- Liderança 5
(3, 5, 2, 'Ingrid Maria Santos', '12345678909', '71999001009', NULL, 'Camaçari', 'Gleba A', '002', '0022', 'apoiador', 'medio', 1, 1, '2026-01-22'),
(3, 5, 2, 'Jorge Alberto Costa', '12345678910', '71999001010', 'jorge.costa@email.com', 'Camaçari', 'Gleba A', '002', '0022', 'apoiador', 'alto', 1, 0, '2026-02-03'),
-- Mais 20 eleitores variados
(3, 6, 2, 'Karen Oliveira Silva', NULL, '71999002001', 'karen.silva@email.com', 'Camaçari', 'Gleba C', '003', '0033', 'militante', 'alto', 1, 1, '2026-01-12'),
(3, 7, 3, 'Lucas Fernandes Lima', NULL, '71999002002', NULL, 'Lauro de Freitas', 'Centro', '001', '0015', 'apoiador', 'medio', 1, 0, '2026-01-15'),
(3, 8, 3, 'Mônica Alves Santos', NULL, '71999002003', 'monica.santos@email.com', 'Lauro de Freitas', 'Vilas do Atlântico', '002', '0031', 'simpatizante', 'baixo', 0, 0, '2026-02-20'),
(3, 9, 3, 'Nelson José Costa', NULL, '71999003001', NULL, 'Lauro de Freitas', 'Itinga', '003', '0042', 'apoiador', 'medio', 1, 1, '2026-01-08'),
(3, 10, 4, 'Olívia Maria Rocha', NULL, '71999003002', 'olivia.rocha@email.com', 'Feira de Santana', 'Centro', '001', '0045', 'militante', 'alto', 1, 1, '2026-01-18'),
(3, 11, 4, 'Paulo Ricardo Santos', NULL, '71999004001', 'paulo.santos@email.com', 'Feira de Santana', 'Mangabeira', '002', '0058', 'militante', 'alto', 1, 1, '2026-01-05'),
(3, 12, 4, 'Queila Cristina Lima', NULL, '71999004002', NULL, 'Feira de Santana', 'George Américo', '003', '0072', 'apoiador', 'medio', 1, 0, '2026-01-20'),
(3, 13, 5, 'Rodrigo Alves Souza', NULL, '71999004003', 'rodrigo.souza@email.com', 'Vitória da Conquista', 'Centro', '001', '0018', 'apoiador', 'alto', 1, 1, '2026-02-01'),
(3, 14, 5, 'Sônia Regina Costa', NULL, '71999005001', NULL, 'Vitória da Conquista', 'Brasil', '002', '0029', 'simpatizante', 'baixo', 0, 0, '2026-02-15'),
(3, 15, 5, 'Tiago Henrique Dias', NULL, '71999005002', 'tiago.dias@email.com', 'Vitória da Conquista', 'Candeias', '003', '0035', 'apoiador', 'medio', 1, 1, '2026-01-28');

-- 4. PROFISSIONAIS
INSERT INTO profissionais (candidato_id, nome, telefone, email, categoria, municipio, especialidade, status) VALUES
(3, 'Dr. Ricardo Almeida', '71988001001', 'ricardo.almeida@juridico.com', 'Advocacia', 'Salvador', 'Direito Eleitoral', 'ativo'),
(3, 'Dra. Amanda Ferreira', '71988001002', 'amanda.ferreira@contabil.com', 'Contabilidade', 'Salvador', 'Contabilidade Eleitoral', 'ativo'),
(3, 'João Marcos Designer', '71988001003', 'joao@design.com', 'Design', 'Salvador', 'Design Gráfico', 'ativo'),
(3, 'Carolina Marketing', '71988001004', 'carolina@marketing.com', 'Marketing', 'Camaçari', 'Marketing Digital', 'ativo'),
(3, 'Pedro Fotografia', '71988001005', 'pedro@foto.com', 'Fotografia', 'Lauro de Freitas', 'Fotojornalismo', 'ativo'),
(3, 'Mariana Vídeo', '71988001006', 'mariana@video.com', 'Vídeo', 'Feira de Santana', 'Produção Audiovisual', 'ativo'),
(3, 'André Comunicação', '71988001007', 'andre@comunicacao.com', 'Comunicação', 'Salvador', 'Assessoria de Imprensa', 'ativo'),
(3, 'Beatriz Eventos', '71988001008', 'beatriz@eventos.com', 'Eventos', 'Salvador', 'Organização de Eventos', 'ativo'),
(3, 'Carlos TI', '71988001009', 'carlos@ti.com', 'TI', 'Salvador', 'Desenvolvimento Web', 'ativo'),
(3, 'Daniela Coaching', '71988001010', 'daniela@coaching.com', 'Consultoria', 'Vitória da Conquista', 'Coaching Político', 'ativo');

-- 5. SOLICITAÇÕES
INSERT INTO solicitacoes (candidato_id, tipo, nome, telefone, email, municipio, bairro, observacoes, status) VALUES
(3, 'lideranca', 'Pedro Augusto Silva', '71998881001', 'pedro.silva@pendente.com', 'Salvador', 'Liberdade', 'Líder comunitário da região', 'pendente'),
(3, 'coordenador', 'Carla Mendes Souza', '71998881002', 'carla.souza@pendente.com', 'Porto Seguro', NULL, 'Experiência em campanhas anteriores', 'pendente'),
(3, 'lideranca', 'Rafael Costa Lima', '71998881003', 'rafael.lima@pendente.com', 'Eunápolis', 'Centro', 'Presidente de associação', 'pendente'),
(3, 'lideranca', 'Juliana Santos Rocha', '71998881004', 'juliana.rocha@pendente.com', 'Teixeira de Freitas', 'Jardim Caraípe', 'Empresária local', 'pendente'),
(3, 'coordenador', 'Marcos Vinícius Dias', '71998881005', 'marcos.dias@pendente.com', 'Paulo Afonso', NULL, 'Ex-vereador', 'pendente');

-- 6. DADOS ELEITORAIS
INSERT INTO dados_eleitorais (candidato_id, municipio, zona, total_eleitores, eleitores_apoio, percentual_apoio, observacoes) VALUES
(3, 'Salvador', '001', 450000, 12500, 2.78, 'Capital - maior colégio eleitoral'),
(3, 'Feira de Santana', '001', 380000, 8900, 2.34, 'Segunda maior cidade'),
(3, 'Vitória da Conquista', '001', 220000, 4800, 2.18, 'Importante polo do sudoeste'),
(3, 'Camaçari', '001', 180000, 5200, 2.89, 'Região metropolitana forte'),
(3, 'Lauro de Freitas', '001', 125000, 3500, 2.80, 'Metropolitana em crescimento');

-- 7. AGENDA
INSERT INTO agenda (candidato_id, titulo, descricao, tipo, data_hora, local, municipio, responsavel, status, prioridade) VALUES
(3, 'Reunião com Lideranças de Salvador', 'Planejamento estratégico para Salvador', 'Reunião', '2026-04-15 14:00:00', 'Hotel Fiesta', 'Salvador', 'Carlos Eduardo Silva', 'agendado', 'alta'),
(3, 'Visita à Feira de Santana', 'Caminhada no Centro e reunião com comerciantes', 'Visita', '2026-04-16 09:00:00', 'Centro Comercial', 'Feira de Santana', 'Ana Carolina Lima', 'agendado', 'alta'),
(3, 'Carreata em Camaçari', 'Carreata com som e distribuição de material', 'Evento', '2026-04-19 16:00:00', 'Gleba A até Centro', 'Camaçari', 'Maria Fernanda Santos', 'agendado', 'media'),
(3, 'Reunião com Sindicatos', 'Apresentação de propostas trabalhistas', 'Reunião', '2026-04-20 10:00:00', 'Sede do Sindicato dos Metalúrgicos', 'Salvador', 'Marcos Vinícius Silva', 'agendado', 'alta'),
(3, 'Caminhada em Vitória da Conquista', 'Caminhada no centro da cidade', 'Evento', '2026-04-23 17:00:00', 'Praça da Prefeitura', 'Vitória da Conquista', 'Roberto Carlos Souza', 'agendado', 'alta');
