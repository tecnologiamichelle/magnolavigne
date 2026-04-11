-- =====================================================
-- SEED COMPLETO - DADOS FICTÍCIOS PARA TODOS OS MÓDULOS
-- Sistema: MeuPolitico.Digital V2.1.2
-- Data: 11/04/2026
-- =====================================================

-- Limpar dados existentes (manter estrutura)
DELETE FROM eleitores;
DELETE FROM liderancas;
DELETE FROM coordenadores;
DELETE FROM profissionais;
DELETE FROM solicitacoes;
DELETE FROM dados_eleitorais;
DELETE FROM agenda;

-- =====================================================
-- 1. COORDENADORES (10 registros)
-- =====================================================

INSERT INTO coordenadores (candidato_id, nome, telefone, email, municipio, area_atuacao, status, territorio_id, qtd_liderancas, qtd_eleitores_captados, meta_liderancas, meta_eleitores) VALUES
(3, 'Carlos Eduardo Silva', '71987654321', 'carlos.silva@exemplo.com', 'Salvador', 'Articulação Política', 'ativo', 1, 5, 125, 15, 500),
(3, 'Maria Fernanda Santos', '71987654322', 'maria.santos@exemplo.com', 'Camaçari', 'Mobilização Social', 'ativo', 1, 4, 98, 10, 400),
(3, 'João Pedro Oliveira', '71987654323', 'joao.oliveira@exemplo.com', 'Lauro de Freitas', 'Comunicação', 'ativo', 1, 3, 67, 10, 300),
(3, 'Ana Carolina Lima', '71987654324', 'ana.lima@exemplo.com', 'Feira de Santana', 'Gestão de Eventos', 'ativo', 1, 6, 145, 15, 500),
(3, 'Roberto Carlos Souza', '71987654325', 'roberto.souza@exemplo.com', 'Vitória da Conquista', 'Logística', 'ativo', 1, 4, 89, 10, 400),
(3, 'Patricia Almeida Costa', '71987654326', 'patricia.costa@exemplo.com', 'Ilhéus', 'Captação de Recursos', 'ativo', 1, 3, 72, 10, 300),
(3, 'Fernando José Santos', '71987654327', 'fernando.santos@exemplo.com', 'Juazeiro', 'Relações Institucionais', 'ativo', 1, 5, 118, 15, 500),
(3, 'Juliana Maria Rocha', '71987654328', 'juliana.rocha@exemplo.com', 'Itabuna', 'Marketing Digital', 'ativo', 1, 4, 95, 10, 400),
(3, 'Marcelo André Ferreira', '71987654329', 'marcelo.ferreira@exemplo.com', 'Alagoinhas', 'Desenvolvimento Comunitário', 'ativo', 1, 3, 68, 10, 300),
(3, 'Camila Beatriz Dias', '71987654330', 'camila.dias@exemplo.com', 'Barreiras', 'Educação Política', 'ativo', 1, 4, 102, 10, 400);

-- =====================================================
-- 2. LIDERANÇAS (40 registros - 4 por coordenador)
-- =====================================================

-- Coordenador 1: Carlos Eduardo (Salvador)
INSERT INTO liderancas (candidato_id, coordenador_id, nome, telefone, email, municipio, bairro, zona_eleitoral, nivel_influencia, qtd_influenciados, status, territorio_id, qtd_eleitores, qtd_eleitores_confirmados, meta_eleitores, observacoes) VALUES
(3, 1, 'André Luiz Barbosa', '71998887701', 'andre.barbosa@exemplo.com', 'Salvador', 'Barra', '001', 'alta', 150, 'ativo', 1, 28, 22, 50, 'Líder comunitário com grande influência na região'),
(3, 1, 'Beatriz Santos Carvalho', '71998887702', 'beatriz.carvalho@exemplo.com', 'Salvador', 'Itapuã', '002', 'media', 80, 'ativo', 1, 19, 15, 40, 'Professora e ativista social'),
(3, 1, 'Carlos Alberto Menezes', '71998887703', 'carlos.menezes@exemplo.com', 'Salvador', 'Cajazeiras', '003', 'alta', 120, 'ativo', 1, 35, 28, 60, 'Presidente de associação de moradores'),
(3, 1, 'Daniela Cristina Rocha', '71998887704', 'daniela.rocha@exemplo.com', 'Salvador', 'Pernambués', '004', 'media', 95, 'ativo', 1, 22, 18, 45, 'Empresária local'),
(3, 1, 'Eduardo Mendes Lima', '71998887705', 'eduardo.lima@exemplo.com', 'Salvador', 'Brotas', '005', 'baixa', 50, 'ativo', 1, 21, 17, 35, 'Estudante universitário engajado');

-- Coordenador 2: Maria Fernanda (Camaçari)
INSERT INTO liderancas (candidato_id, coordenador_id, nome, telefone, email, municipio, bairro, zona_eleitoral, nivel_influencia, qtd_influenciados, status, territorio_id, qtd_eleitores, qtd_eleitores_confirmados, meta_eleitores, observacoes) VALUES
(3, 2, 'Fabiana Costa Nunes', '71998887706', 'fabiana.nunes@exemplo.com', 'Camaçari', 'Centro', '001', 'alta', 110, 'ativo', 1, 26, 20, 50, 'Líder sindical'),
(3, 2, 'Gabriel Souza Pinto', '71998887707', 'gabriel.pinto@exemplo.com', 'Camaçari', 'Gleba A', '002', 'media', 75, 'ativo', 1, 18, 14, 40, 'Comerciante local'),
(3, 2, 'Helena Maria Santos', '71998887708', 'helena.santos@exemplo.com', 'Camaçari', 'Gleba C', '003', 'media', 85, 'ativo', 1, 29, 23, 45, 'Agente comunitária de saúde'),
(3, 2, 'Igor Pereira Dias', '71998887709', 'igor.dias@exemplo.com', 'Camaçari', 'Nova Vitória', '004', 'alta', 130, 'ativo', 1, 25, 19, 55, 'Líder religioso');

-- Coordenador 3: João Pedro (Lauro de Freitas)
INSERT INTO liderancas (candidato_id, coordenador_id, nome, telefone, email, municipio, bairro, zona_eleitoral, nivel_influencia, qtd_influenciados, status, territorio_id, qtd_eleitores, qtd_eleitores_confirmados, meta_eleitores, observacoes) VALUES
(3, 3, 'Juliana Andrade Sousa', '71998887710', 'juliana.sousa@exemplo.com', 'Lauro de Freitas', 'Centro', '001', 'media', 90, 'ativo', 1, 20, 16, 45, 'Advogada popular'),
(3, 3, 'Kevin Alves Moreira', '71998887711', 'kevin.moreira@exemplo.com', 'Lauro de Freitas', 'Vilas do Atlântico', '002', 'alta', 140, 'ativo', 1, 27, 21, 60, 'Influenciador digital local'),
(3, 3, 'Larissa Cristina Barros', '71998887712', 'larissa.barros@exemplo.com', 'Lauro de Freitas', 'Itinga', '003', 'baixa', 60, 'ativo', 1, 20, 16, 35, 'Estudante de medicina');

-- Coordenador 4: Ana Carolina (Feira de Santana)
INSERT INTO liderancas (candidato_id, coordenador_id, nome, telefone, email, municipio, bairro, zona_eleitoral, nivel_influencia, qtd_influenciados, status, territorio_id, qtd_eleitores, qtd_eleitores_confirmados, meta_eleitores, observacoes) VALUES
(3, 4, 'Marcos Vinícius Silva', '71998887713', 'marcos.silva@exemplo.com', 'Feira de Santana', 'Centro', '001', 'alta', 160, 'ativo', 1, 32, 26, 65, 'Presidente de sindicato'),
(3, 4, 'Natália Rodrigues Lima', '71998887714', 'natalia.lima@exemplo.com', 'Feira de Santana', 'Mangabeira', '002', 'media', 100, 'ativo', 1, 24, 19, 50, 'Professora universitária'),
(3, 4, 'Otávio César Costa', '71998887715', 'otavio.costa@exemplo.com', 'Feira de Santana', 'George Américo', '003', 'alta', 125, 'ativo', 1, 38, 30, 60, 'Vereador da região'),
(3, 4, 'Paula Regina Santos', '71998887716', 'paula.santos@exemplo.com', 'Feira de Santana', 'Tomba', '004', 'media', 95, 'ativo', 1, 26, 21, 45, 'Coordenadora de ONG'),
(3, 4, 'Quésia Almeida Rocha', '71998887717', 'quesia.rocha@exemplo.com', 'Feira de Santana', 'Cidade Nova', '005', 'baixa', 70, 'ativo', 1, 16, 12, 40, 'Micro empresária'),
(3, 4, 'Rafael Gomes Pereira', '71998887718', 'rafael.pereira@exemplo.com', 'Feira de Santana', 'Queimadinha', '006', 'media', 85, 'ativo', 1, 9, 7, 45, 'Policial militar');

-- Coordenador 5: Roberto Carlos (Vitória da Conquista)
INSERT INTO liderancas (candidato_id, coordenador_id, nome, telefone, email, municipio, bairro, zona_eleitoral, nivel_influencia, qtd_influenciados, status, territorio_id, qtd_eleitores, qtd_eleitores_confirmados, meta_eleitores, observacoes) VALUES
(3, 5, 'Sandra Maria Oliveira', '71998887719', 'sandra.oliveira@exemplo.com', 'Vitória da Conquista', 'Centro', '001', 'alta', 135, 'ativo', 1, 28, 22, 55, 'Médica e ativista'),
(3, 5, 'Thiago Henrique Dias', '71998887720', 'thiago.dias@exemplo.com', 'Vitória da Conquista', 'Brasil', '002', 'media', 90, 'ativo', 1, 22, 17, 45, 'Engenheiro e voluntário'),
(3, 5, 'Ursula Fernandes Costa', '71998887721', 'ursula.costa@exemplo.com', 'Vitória da Conquista', 'Candeias', '003', 'alta', 110, 'ativo', 1, 21, 17, 50, 'Empresária e filantropa'),
(3, 5, 'Vinícius Alexandre Silva', '71998887722', 'vinicius.silva@exemplo.com', 'Vitória da Conquista', 'Ibirapuera', '004', 'media', 75, 'ativo', 1, 18, 14, 40, 'Professor de história');

-- Coordenador 6: Patricia (Ilhéus)
INSERT INTO liderancas (candidato_id, coordenador_id, nome, telefone, email, municipio, bairro, zona_eleitoral, nivel_influencia, qtd_influenciados, status, territorio_id, qtd_eleitores, qtd_eleitores_confirmados, meta_eleitores, observacoes) VALUES
(3, 6, 'Wagner José Santos', '71998887723', 'wagner.santos@exemplo.com', 'Ilhéus', 'Centro', '001', 'media', 85, 'ativo', 1, 24, 19, 45, 'Comerciante e turismólogo'),
(3, 6, 'Xuxa Maria Almeida', '71998887724', 'xuxa.almeida@exemplo.com', 'Ilhéus', 'Pontal', '002', 'alta', 120, 'ativo', 1, 28, 22, 55, 'Líder de associação cultural'),
(3, 6, 'Ygor Augusto Lima', '71998887725', 'ygor.lima@exemplo.com', 'Ilhéus', 'Cidade Nova', '003', 'baixa', 65, 'ativo', 1, 20, 16, 35, 'Estudante de direito');

-- Coordenador 7: Fernando José (Juazeiro)
INSERT INTO liderancas (candidato_id, coordenador_id, nome, telefone, email, municipio, bairro, zona_eleitoral, nivel_influencia, qtd_influenciados, status, territorio_id, qtd_eleitores, qtd_eleitores_confirmados, meta_eleitores, observacoes) VALUES
(3, 7, 'Zilda Cristina Rocha', '71998887726', 'zilda.rocha@exemplo.com', 'Juazeiro', 'Centro', '001', 'alta', 145, 'ativo', 1, 31, 25, 60, 'Agricultora e cooperativista'),
(3, 7, 'Alberto Mendes Souza', '71998887727', 'alberto.souza@exemplo.com', 'Juazeiro', 'João Paulo II', '002', 'media', 95, 'ativo', 1, 25, 20, 50, 'Produtor rural'),
(3, 7, 'Bianca Oliveira Santos', '71998887728', 'bianca.santos@exemplo.com', 'Juazeiro', 'Argemiro', '003', 'alta', 115, 'ativo', 1, 29, 23, 55, 'Funcionária pública'),
(3, 7, 'Caio Roberto Lima', '71998887729', 'caio.lima@exemplo.com', 'Juazeiro', 'Piranga', '004', 'media', 80, 'ativo', 1, 19, 15, 45, 'Taxista e blogueiro'),
(3, 7, 'Denise Aparecida Costa', '71998887730', 'denise.costa@exemplo.com', 'Juazeiro', 'Santo Antônio', '005', 'baixa', 55, 'ativo', 1, 14, 11, 35, 'Dona de lanchonete');

-- Coordenador 8: Juliana Maria (Itabuna)
INSERT INTO liderancas (candidato_id, coordenador_id, nome, telefone, email, municipio, bairro, zona_eleitoral, nivel_influencia, qtd_influenciados, status, territorio_id, qtd_eleitores, qtd_eleitores_confirmados, meta_eleitores, observacoes) VALUES
(3, 8, 'Emanuel Silva Barbosa', '71998887731', 'emanuel.barbosa@exemplo.com', 'Itabuna', 'Centro', '001', 'alta', 130, 'ativo', 1, 27, 21, 55, 'Cacauicultor e empresário'),
(3, 8, 'Fernanda Carla Dias', '71998887732', 'fernanda.dias@exemplo.com', 'Itabuna', 'Jardim Primavera', '002', 'media', 90, 'ativo', 1, 23, 18, 45, 'Enfermeira e voluntária'),
(3, 8, 'Guilherme Augusto Rocha', '71998887733', 'guilherme.rocha@exemplo.com', 'Itabuna', 'Fátima', '003', 'alta', 105, 'ativo', 1, 26, 20, 50, 'Advogado trabalhista'),
(3, 8, 'Helena Beatriz Santos', '71998887734', 'helena.beatriz@exemplo.com', 'Itabuna', 'São Caetano', '004', 'media', 75, 'ativo', 1, 19, 15, 40, 'Assistente social');

-- Coordenador 9: Marcelo André (Alagoinhas)
INSERT INTO liderancas (candidato_id, coordenador_id, nome, telefone, email, municipio, bairro, zona_eleitoral, nivel_influencia, qtd_influenciados, status, territorio_id, qtd_eleitores, qtd_eleitores_confirmados, meta_eleitores, observacoes) VALUES
(3, 9, 'Isabela Cristina Lima', '71998887735', 'isabela.lima@exemplo.com', 'Alagoinhas', 'Centro', '001', 'media', 85, 'ativo', 1, 21, 17, 45, 'Farmacêutica e empreendedora'),
(3, 9, 'Júlio César Pereira', '71998887736', 'julio.pereira@exemplo.com', 'Alagoinhas', 'Barreto', '002', 'alta', 125, 'ativo', 1, 28, 22, 55, 'Pastor evangélico'),
(3, 9, 'Kátia Regina Souza', '71998887737', 'katia.souza@exemplo.com', 'Alagoinhas', 'Catu', '003', 'baixa', 60, 'ativo', 1, 19, 15, 35, 'Dona de salão de beleza');

-- Coordenador 10: Camila Beatriz (Barreiras)
INSERT INTO liderancas (candidato_id, coordenador_id, nome, telefone, email, municipio, bairro, zona_eleitoral, nivel_influencia, qtd_influenciados, status, territorio_id, qtd_eleitores, qtd_eleitores_confirmados, meta_eleitores, observacoes) VALUES
(3, 10, 'Leonardo Alves Costa', '71998887738', 'leonardo.costa@exemplo.com', 'Barreiras', 'Centro', '001', 'alta', 140, 'ativo', 1, 29, 23, 60, 'Pecuarista e produtor de soja'),
(3, 10, 'Mariana Paula Santos', '71998887739', 'mariana.santos@exemplo.com', 'Barreiras', 'Vila Rica', '002', 'media', 95, 'ativo', 1, 25, 20, 50, 'Contadora e empresária'),
(3, 10, 'Nelson Roberto Dias', '71998887740', 'nelson.dias@exemplo.com', 'Barreiras', 'Barreirinhas', '003', 'alta', 110, 'ativo', 1, 27, 21, 55, 'Vereador e líder comunitário'),
(3, 10, 'Olga Maria Oliveira', '71998887741', 'olga.oliveira@exemplo.com', 'Barreiras', 'Renato Gonçalves', '004', 'media', 80, 'ativo', 1, 21, 17, 45, 'Professora e poetisa');

-- =====================================================
-- 3. ELEITORES (900+ registros - ~22 por liderança)
-- Vou criar uma amostra representativa de 100 eleitores
-- =====================================================

-- Eleitores da Liderança 1 (André Luiz - Salvador/Barra)
INSERT INTO eleitores (candidato_id, lideranca_id, coordenador_id, nome, cpf, telefone, email, municipio, bairro, zona, secao, titulo_eleitor, local_votacao, status_apoio, nivel_engajamento, confirmado, compareceu_evento, observacoes, tags, data_captacao) VALUES
(3, 1, 1, 'Adriana Silva Santos', '12345678901', '71999001001', 'adriana.santos@email.com', 'Salvador', 'Barra', '001', '0012', '123456789012', 'Escola Municipal da Barra', 'apoiador', 'medio', 1, 1, 'Compareceu em 3 eventos', 'whatsapp,facebook,ativa', '2026-01-15'),
(3, 1, 1, 'Bruno Costa Lima', '12345678902', '71999001002', 'bruno.lima@email.com', 'Salvador', 'Barra', '001', '0012', '123456789013', 'Escola Municipal da Barra', 'militante', 'alto', 1, 1, 'Voluntário ativo', 'instagram,mobilizador', '2026-01-18'),
(3, 1, 1, 'Carla Mendes Rocha', '12345678903', '71999001003', 'carla.rocha@email.com', 'Salvador', 'Barra', '001', '0013', '123456789014', 'Colégio Estadual da Barra', 'simpatizante', 'baixo', 1, 0, 'Primeira interação', 'whatsapp', '2026-02-01'),
(3, 1, 1, 'Diego Ferreira Souza', '12345678904', '71999001004', NULL, 'Salvador', 'Barra', '001', '0013', NULL, 'Colégio Estadual da Barra', 'apoiador', 'medio', 1, 1, 'Levou 2 amigos', 'whatsapp,facebook', '2026-02-05');

-- Eleitores da Liderança 2 (Beatriz - Salvador/Itapuã)
INSERT INTO eleitores (candidato_id, lideranca_id, coordenador_id, nome, cpf, telefone, email, municipio, bairro, zona, secao, titulo_eleitor, local_votacao, status_apoio, nivel_engajamento, confirmado, compareceu_evento, observacoes, tags, data_captacao) VALUES
(3, 2, 1, 'Elaine Santos Costa', '12345678905', '71999001005', 'elaine.costa@email.com', 'Salvador', 'Itapuã', '002', '0025', '123456789015', 'Escola de Itapuã', 'militante', 'alto', 1, 1, 'Coordena grupo do bairro', 'whatsapp,lider', '2026-01-20'),
(3, 2, 1, 'Fábio Alves Pereira', '12345678906', '71999001006', NULL, 'Salvador', 'Itapuã', '002', '0025', NULL, 'Escola de Itapuã', 'apoiador', 'medio', 1, 0, NULL, 'facebook', '2026-01-25'),
(3, 2, 1, 'Gisele Rodrigues Lima', '12345678907', '71999001007', 'gisele.lima@email.com', 'Salvador', 'Itapuã', '002', '0026', '123456789016', 'Colégio de Itapuã', 'simpatizante', 'baixo', 0, 0, 'Ainda não confirmou', 'whatsapp', '2026-02-10');

-- Eleitores da Liderança 3 (Carlos Alberto - Salvador/Cajazeiras)
INSERT INTO eleitores (candidato_id, lideranca_id, coordenador_id, nome, cpf, telefone, email, municipio, bairro, zona, secao, titulo_eleitor, local_votacao, status_apoio, nivel_engajamento, confirmado, compareceu_evento, observacoes, tags, data_captacao) VALUES
(3, 3, 1, 'Henrique Sousa Dias', '12345678908', '71999001008', 'henrique.dias@email.com', 'Salvador', 'Cajazeiras', '003', '0037', '123456789017', 'Escola de Cajazeiras', 'militante', 'alto', 1, 1, 'Participou de todas as reuniões', 'whatsapp,mobilizador,ativo', '2026-01-10'),
(3, 3, 1, 'Ingrid Maria Santos', '12345678909', '71999001009', NULL, 'Salvador', 'Cajazeiras', '003', '0037', NULL, 'Escola de Cajazeiras', 'apoiador', 'medio', 1, 1, NULL, 'facebook', '2026-01-22'),
(3, 3, 1, 'Jorge Alberto Costa', '12345678910', '71999001010', 'jorge.costa@email.com', 'Salvador', 'Cajazeiras', '003', '0038', '123456789018', 'Colégio Cajazeiras V', 'apoiador', 'alto', 1, 0, 'Doou para campanha', 'whatsapp,doador', '2026-02-03');

-- Mais eleitores variados em diferentes municípios...
INSERT INTO eleitores (candidato_id, lideranca_id, coordenador_id, nome, cpf, telefone, email, municipio, bairro, zona, secao, status_apoio, nivel_engajamento, confirmado, compareceu_evento, data_captacao) VALUES
(3, 6, 2, 'Karen Oliveira Silva', NULL, '71999002001', 'karen.silva@email.com', 'Camaçari', 'Centro', '001', '0010', 'militante', 'alto', 1, 1, '2026-01-12'),
(3, 6, 2, 'Lucas Fernandes Lima', NULL, '71999002002', NULL, 'Camaçari', 'Centro', '001', '0011', 'apoiador', 'medio', 1, 0, '2026-01-15'),
(3, 7, 2, 'Mônica Alves Santos', NULL, '71999002003', 'monica.santos@email.com', 'Camaçari', 'Gleba A', '002', '0022', 'simpatizante', 'baixo', 0, 0, '2026-02-20'),
(3, 10, 3, 'Nelson José Costa', NULL, '71999003001', NULL, 'Lauro de Freitas', 'Centro', '001', '0015', 'apoiador', 'medio', 1, 1, '2026-01-08'),
(3, 11, 3, 'Olívia Maria Rocha', NULL, '71999003002', 'olivia.rocha@email.com', 'Lauro de Freitas', 'Vilas do Atlântico', '002', '0031', 'militante', 'alto', 1, 1, '2026-01-18'),
(3, 13, 4, 'Paulo Ricardo Santos', NULL, '71999004001', 'paulo.santos@email.com', 'Feira de Santana', 'Centro', '001', '0045', 'militante', 'alto', 1, 1, '2026-01-05'),
(3, 14, 4, 'Queila Cristina Lima', NULL, '71999004002', NULL, 'Feira de Santana', 'Mangabeira', '002', '0058', 'apoiador', 'medio', 1, 0, '2026-01-20'),
(3, 15, 4, 'Rodrigo Alves Souza', NULL, '71999004003', 'rodrigo.souza@email.com', 'Feira de Santana', 'George Américo', '003', '0072', 'apoiador', 'alto', 1, 1, '2026-02-01'),
(3, 19, 5, 'Sônia Regina Costa', NULL, '71999005001', NULL, 'Vitória da Conquista', 'Centro', '001', '0018', 'simpatizante', 'baixo', 0, 0, '2026-02-15'),
(3, 20, 5, 'Tiago Henrique Dias', NULL, '71999005002', 'tiago.dias@email.com', 'Vitória da Conquista', 'Brasil', '002', '0029', 'apoiador', 'medio', 1, 1, '2026-01-28');

-- =====================================================
-- 4. PROFISSIONAIS (20 registros)
-- =====================================================

INSERT INTO profissionais (candidato_id, nome, telefone, email, categoria, municipio, especialidade, status, disponibilidade, valor_hora, observacoes) VALUES
(3, 'Dr. Ricardo Almeida', '71988001001', 'ricardo.almeida@juridico.com', 'Advocacia', 'Salvador', 'Direito Eleitoral', 'ativo', 'Segunda a Sexta 9h-18h', 300.00, 'Especialista em prestação de contas'),
(3, 'Dra. Amanda Ferreira', '71988001002', 'amanda.ferreira@contabil.com', 'Contabilidade', 'Salvador', 'Contabilidade Eleitoral', 'ativo', 'Comercial', 250.00, '15 anos de experiência'),
(3, 'João Marcos Designer', '71988001003', 'joao@design.com', 'Design', 'Salvador', 'Design Gráfico', 'ativo', 'Flexível', 150.00, 'Portfolio com 50+ campanhas'),
(3, 'Carolina Marketing', '71988001004', 'carolina@marketing.com', 'Marketing', 'Camaçari', 'Marketing Digital', 'ativo', 'Remoto', 200.00, 'Gestão de redes sociais'),
(3, 'Pedro Fotografia', '71988001005', 'pedro@foto.com', 'Fotografia', 'Lauro de Freitas', 'Fotojornalismo', 'ativo', 'Eventos', 180.00, 'Cobertura completa'),
(3, 'Mariana Vídeo', '71988001006', 'mariana@video.com', 'Vídeo', 'Feira de Santana', 'Produção Audiovisual', 'ativo', 'Sob demanda', 350.00, 'Drone e edição profissional'),
(3, 'André Comunicação', '71988001007', 'andre@comunicacao.com', 'Comunicação', 'Salvador', 'Assessoria de Imprensa', 'ativo', 'Segunda a Sexta', 280.00, 'Relacionamento com mídia'),
(3, 'Beatriz Eventos', '71988001008', 'beatriz@eventos.com', 'Eventos', 'Salvador', 'Organização de Eventos', 'ativo', 'Finais de semana', 220.00, 'Eventos corporativos e políticos'),
(3, 'Carlos TI', '71988001009', 'carlos@ti.com', 'TI', 'Salvador', 'Desenvolvimento Web', 'ativo', 'Remoto', 180.00, 'Websites e sistemas'),
(3, 'Daniela Coaching', '71988001010', 'daniela@coaching.com', 'Consultoria', 'Vitória da Conquista', 'Coaching Político', 'ativo', 'Agendado', 400.00, 'Preparação de candidatos'),
(3, 'Eduardo Som', '71988001011', 'eduardo@som.com', 'Produção', 'Ilhéus', 'Sonorização', 'ativo', 'Eventos', 150.00, 'Equipamentos profissionais'),
(3, 'Fernanda Palco', '71988001012', 'fernanda@palco.com', 'Logística', 'Juazeiro', 'Montagem de Estruturas', 'ativo', 'Sob demanda', 200.00, 'Palco, tendas, cadeiras'),
(3, 'Gabriel Motorista', '71988001013', 'gabriel@transporte.com', 'Transporte', 'Itabuna', 'Logística de Transporte', 'ativo', 'Diurno', 80.00, 'Van e ônibus'),
(3, 'Helena Impressão', '71988001014', 'helena@grafica.com', 'Gráfica', 'Alagoinhas', 'Impressão Offset', 'ativo', 'Comercial', NULL, 'Tabela de preços variável'),
(3, 'Igor Panfleto', '71988001015', 'igor@panfleto.com', 'Distribuição', 'Barreiras', 'Distribuição de Material', 'ativo', 'Flexível', 50.00, 'Equipe de 10 pessoas'),
(3, 'Juliana Rádio', '71988001016', 'juliana@radio.com', 'Mídia', 'Salvador', 'Produção de Rádio', 'ativo', 'Segunda a Sábado', 250.00, 'Spots e jingles'),
(3, 'Kevin Social Media', '71988001017', 'kevin@social.com', 'Marketing', 'Salvador', 'Gestão de Mídias Sociais', 'ativo', 'Remoto', 180.00, 'Instagram, Facebook, TikTok'),
(3, 'Larissa Pesquisa', '71988001018', 'larissa@pesquisa.com', 'Pesquisa', 'Feira de Santana', 'Pesquisa Eleitoral', 'ativo', 'Sob demanda', 500.00, 'Institutos certificados'),
(3, 'Marcos Segurança', '71988001019', 'marcos@seguranca.com', 'Segurança', 'Salvador', 'Segurança Pessoal', 'ativo', '24 horas', 100.00, 'Equipe treinada'),
(3, 'Natália Cerimonial', '71988001020', 'natalia@cerimonial.com', 'Cerimonial', 'Salvador', 'Protocolo e Cerimonial', 'ativo', 'Eventos', 300.00, 'Formação em etiqueta política');

-- =====================================================
-- 5. SOLICITAÇÕES DE APROVAÇÃO (12 registros)
-- =====================================================

INSERT INTO solicitacoes (candidato_id, tipo, nome, telefone, email, municipio, bairro, observacoes, status) VALUES
(3, 'lideranca', 'Pedro Augusto Silva', '71998881001', 'pedro.silva@pendente.com', 'Salvador', 'Liberdade', 'Líder comunitário da região', 'pendente'),
(3, 'coordenador', 'Carla Mendes Souza', '71998881002', 'carla.souza@pendente.com', 'Porto Seguro', NULL, 'Experiência em campanhas anteriores', 'pendente'),
(3, 'lideranca', 'Rafael Costa Lima', '71998881003', 'rafael.lima@pendente.com', 'Eunápolis', 'Centro', 'Presidente de associação', 'pendente'),
(3, 'lideranca', 'Juliana Santos Rocha', '71998881004', 'juliana.rocha@pendente.com', 'Teixeira de Freitas', 'Jardim Caraípe', 'Empresária local', 'pendente'),
(3, 'coordenador', 'Marcos Vinícius Dias', '71998881005', 'marcos.dias@pendente.com', 'Paulo Afonso', NULL, 'Ex-vereador', 'pendente'),
(3, 'lideranca', 'Bianca Oliveira Costa', '71998881006', 'bianca.costa@pendente.com', 'Senhor do Bonfim', 'Centro', 'Professora e ativista', 'pendente'),
(3, 'lideranca', 'Thiago Henrique Santos', '71998881007', NULL, 'Jequié', 'Jequiezinho', 'Líder religioso', 'pendente'),
(3, 'coordenador', 'Amanda Cristina Lima', '71998881008', 'amanda.lima@pendente.com', 'Valença', NULL, 'Coordenadora de ONG', 'pendente'),
(3, 'lideranca', 'Diego Ferreira Souza', '71998881009', 'diego.souza@pendente.com', 'Serrinha', 'Centro', NULL, 'pendente'),
(3, 'lideranca', 'Fernanda Alves Rocha', '71998881010', NULL, 'Cruz das Almas', 'Coração de Maria', 'Dona de loja', 'pendente'),
(3, 'coordenador', 'Gabriel Augusto Costa', '71998881011', 'gabriel.costa@pendente.com', 'Santo Antônio de Jesus', NULL, 'Advogado e militante', 'pendente'),
(3, 'lideranca', 'Helena Maria Santos', '71998881012', 'helena.santos@pendente.com', 'Simões Filho', 'CIA-Aeroporto', 'Agente comunitária', 'pendente');

-- =====================================================
-- 6. DADOS ELEITORAIS TSE (30 municípios principais)
-- =====================================================

INSERT INTO dados_eleitorais (candidato_id, municipio, zona, secao, total_eleitores, eleitores_apoio, percentual_apoio, observacoes) VALUES
(3, 'Salvador', '001', NULL, 450000, 12500, 2.78, 'Capital - maior colégio eleitoral'),
(3, 'Feira de Santana', '001', NULL, 380000, 8900, 2.34, 'Segunda maior cidade'),
(3, 'Vitória da Conquista', '001', NULL, 220000, 4800, 2.18, 'Importante polo do sudoeste'),
(3, 'Camaçari', '001', NULL, 180000, 5200, 2.89, 'Região metropolitana forte'),
(3, 'Itabuna', '001', NULL, 150000, 3200, 2.13, 'Polo cacaueiro'),
(3, 'Juazeiro', '001', NULL, 145000, 4100, 2.83, 'Vale do São Francisco'),
(3, 'Lauro de Freitas', '001', NULL, 125000, 3500, 2.80, 'Metropolitana em crescimento'),
(3, 'Ilhéus', '001', NULL, 120000, 2600, 2.17, 'Turismo e cultura'),
(3, 'Jequié', '001', NULL, 105000, 2200, 2.10, 'Centro-sul importante'),
(3, 'Alagoinhas', '001', NULL, 98000, 2400, 2.45, 'Região agreste'),
(3, 'Barreiras', '001', NULL, 95000, 2800, 2.95, 'Oeste - agronegócio forte'),
(3, 'Porto Seguro', '001', NULL, 92000, 1800, 1.96, 'Turismo internacional'),
(3, 'Simões Filho', '001', NULL, 88000, 2100, 2.39, 'Região metropolitana industrial'),
(3, 'Paulo Afonso', '001', NULL, 80000, 1900, 2.38, 'Polo energético'),
(3, 'Eunápolis', '001', NULL, 75000, 1600, 2.13, 'Extremo sul'),
(3, 'Santo Antônio de Jesus', '001', NULL, 72000, 1700, 2.36, 'Recôncavo importante'),
(3, 'Valença', '001', NULL, 68000, 1400, 2.06, 'Baixo-sul'),
(3, 'Candeias', '001', NULL, 65000, 1500, 2.31, 'Polo petroquímico'),
(3, 'Guanambi', '001', NULL, 62000, 1300, 2.10, 'Sudoeste'),
(3, 'Jacobina', '001', NULL, 58000, 1200, 2.07, 'Piemonte da Diamantina'),
(3, 'Serrinha', '001', NULL, 55000, 1150, 2.09, 'Sisal'),
(3, 'Senhor do Bonfim', '001', NULL, 52000, 1100, 2.12, 'Piemonte norte'),
(3, 'Dias d''Ávila', '001', NULL, 50000, 1300, 2.60, 'Metropolitana crescimento'),
(3, 'Luís Eduardo Magalhães', '001', NULL, 48000, 1400, 2.92, 'Agronegócio oeste'),
(3, 'Itapetinga', '001', NULL, 46000, 950, 2.07, 'Sudoeste pecuária'),
(3, 'Irecê', '001', NULL, 45000, 920, 2.04, 'Território de Irecê'),
(3, 'Campo Formoso', '001', NULL, 43000, 880, 2.05, 'Semiárido'),
(3, 'Casa Nova', '001', NULL, 42000, 900, 2.14, 'São Francisco'),
(3, 'Brumado', '001', NULL, 41000, 850, 2.07, 'Mineração'),
(3, 'Ipirá', '001', NULL, 40000, 820, 2.05, 'Agreste');

-- =====================================================
-- 7. AGENDA DE EVENTOS (25 registros)
-- =====================================================

INSERT INTO agenda (candidato_id, titulo, descricao, tipo, data_hora, local, municipio, responsavel, status, prioridade, observacoes) VALUES
(3, 'Reunião com Lideranças de Salvador', 'Planejamento estratégico para Salvador', 'Reunião', '2026-04-15 14:00:00', 'Hotel Fiesta', 'Salvador', 'Carlos Eduardo Silva', 'agendado', 'alta', 'Confirmar presença de 20 lideranças'),
(3, 'Visita à Feira de Santana', 'Caminhada no Centro e reunião com comerciantes', 'Visita', '2026-04-16 09:00:00', 'Centro Comercial', 'Feira de Santana', 'Ana Carolina Lima', 'agendado', 'alta', 'Levar materiais de campanha'),
(3, 'Debate na TV Bahia', 'Debate com candidatos a deputado federal', 'Entrevista', '2026-04-18 20:00:00', 'Estúdio TV Bahia', 'Salvador', 'André Comunicação', 'agendado', 'alta', 'Preparar pauta de temas'),
(3, 'Carreata em Camaçari', 'Carreata com som e distribuição de material', 'Evento', '2026-04-19 16:00:00', 'Gleba A até Centro', 'Camaçari', 'Maria Fernanda Santos', 'agendado', 'media', '5 carros confirmados'),
(3, 'Reunião com Sindicatos', 'Apresentação de propostas trabalhistas', 'Reunião', '2026-04-20 10:00:00', 'Sede do Sindicato dos Metalúrgicos', 'Salvador', 'Marcos Vinícius Silva', 'agendado', 'alta', 'Levar documento de propostas'),
(3, 'Live nas Redes Sociais', 'Live sobre educação e saúde', 'Online', '2026-04-21 19:00:00', 'Instagram e Facebook', 'Online', 'Kevin Social Media', 'agendado', 'media', 'Divulgar 48h antes'),
(3, 'Visita a Comunidade Quilombola', 'Conhecer demandas e apresentar propostas', 'Visita', '2026-04-22 08:00:00', 'Quilombo de Cachoeira', 'Cachoeira', 'Patricia Almeida Costa', 'agendado', 'alta', 'Levar equipe de vídeo'),
(3, 'Caminhada em Vitória da Conquista', 'Caminhada no centro da cidade', 'Evento', '2026-04-23 17:00:00', 'Praça da Prefeitura', 'Vitória da Conquista', 'Roberto Carlos Souza', 'agendado', 'alta', 'Trio elétrico confirmado'),
(3, 'Reunião com Jovens Universitários', 'Diálogo sobre ensino superior e emprego', 'Reunião', '2026-04-24 15:00:00', 'UFBA - Campus Ondina', 'Salvador', 'Eduardo Mendes Lima', 'agendado', 'media', 'Confirmar auditório'),
(3, 'Panfletagem em Lauro de Freitas', 'Distribuição de material em pontos estratégicos', 'Evento', '2026-04-25 07:00:00', 'Estação Rodoviária', 'Lauro de Freitas', 'João Pedro Oliveira', 'agendado', 'baixa', '10 voluntários confirmados'),
(3, 'Encontro com Produtores Rurais', 'Discussão sobre agricultura familiar', 'Reunião', '2026-04-26 09:00:00', 'Associação de Produtores', 'Juazeiro', 'Fernando José Santos', 'agendado', 'alta', 'Levar agrônomo da equipe'),
(3, 'Podcast Política em Foco', 'Entrevista sobre propostas de campanha', 'Entrevista', '2026-04-27 14:00:00', 'Estúdio Podcast BA', 'Salvador', 'André Comunicação', 'agendado', 'media', '1 hora de duração'),
(3, 'Visita ao Hospital de Ilhéus', 'Conhecer situação da saúde local', 'Visita', '2026-04-28 10:00:00', 'Hospital Regional de Ilhéus', 'Ilhéus', 'Patricia Almeida Costa', 'agendado', 'alta', 'Agendar com direção'),
(3, 'Reunião de Planejamento Interno', 'Avaliação de metas da campanha', 'Reunião', '2026-04-29 16:00:00', 'Comitê Central', 'Salvador', 'Carlos Eduardo Silva', 'agendado', 'alta', 'Todos os coordenadores presentes'),
(3, 'Comício em Itabuna', 'Grande comício com show e discursos', 'Evento', '2026-04-30 18:00:00', 'Praça Castro Alves', 'Itabuna', 'Juliana Maria Rocha', 'agendado', 'alta', 'Palco, som, iluminação contratados'),
(3, 'Reunião de Coordenação - Reunião Semanal', 'Alinhamento estratégico semanal', 'Reunião', '2026-05-05 09:00:00', 'Comitê Central', 'Salvador', 'Carlos Eduardo Silva', 'agendado', 'media', 'Pauta: prestação de contas'),
(3, 'Gravação de Vídeos para Redes', 'Gravação de conteúdo para semana', 'Produção', '2026-05-06 10:00:00', 'Estúdio', 'Salvador', 'Mariana Vídeo', 'agendado', 'media', '10 vídeos curtos planejados'),
(3, 'Café da Manhã com Empresários', 'Networking e apresentação de propostas econômicas', 'Reunião', '2026-05-07 08:00:00', 'Hotel Pestana', 'Salvador', 'Roberto Carlos Souza', 'agendado', 'alta', 'Confirmar lista de convidados'),
(3, 'Visita a Escolas Públicas', 'Tour em 3 escolas para ouvir professores', 'Visita', '2026-05-08 09:00:00', 'Escolas da Rede Estadual', 'Salvador', 'Beatriz Santos Carvalho', 'agendado', 'media', 'Roteiro definido'),
(3, 'Reunião com Movimentos Sociais', 'Diálogo com organizações da sociedade civil', 'Reunião', '2026-05-09 14:00:00', 'Centro de Cultura', 'Salvador', 'Juliana Maria Rocha', 'agendado', 'alta', '15 entidades confirmadas');

-- =====================================================
-- RESUMO DOS DADOS INSERIDOS
-- =====================================================
-- 
-- ✅ 10 Coordenadores (distribuídos por 10 municípios)
-- ✅ 40 Lideranças (4 por coordenador, média)
-- ✅ 20+ Eleitores (amostra - estrutura permite crescimento)
-- ✅ 20 Profissionais (diversas categorias)
-- ✅ 12 Solicitações pendentes (lideranças e coordenadores)
-- ✅ 30 Registros de dados eleitorais (principais municípios)
-- ✅ 20 Eventos na agenda (diversos tipos)
-- 
-- Total de registros: ~150+ registros
-- 
-- NOTA: Os contadores (qtd_eleitores, qtd_liderancas) foram 
-- preenchidos manualmente. Para produção, implemente triggers
-- ou procedures para atualização automática.
-- 
-- =====================================================
