-- ============================================
-- SEED DE DADOS DE EXEMPLO - MeuPolitico.Digital
-- Dados baseados no projeto piloto Magno Lavigne
-- ============================================

-- LIDERANÇAS DE EXEMPLO
INSERT INTO liderancas (candidato_id, nome, telefone, email, municipio, bairro, zona_eleitoral, nivel_influencia, qtd_influenciados, status, observacoes, qtd_eleitores, qtd_eleitores_confirmados, meta_eleitores)
VALUES
  (1, 'Rui Barbosa', '71988775569', 'rui.barbosa@exemplo.com', 'Salvador', 'Boa Viagem', '10', 'alta', 500, 'ativo', 'Liderança comunitária com grande influência no bairro', 15000, 0, 100),
  (1, 'Frederico Borges', '71988775570', 'frederico@exemplo.com', 'Salvador', 'Pituba', '12', 'media', 250, 'ativo', 'Comerciante local, trabalha com associação de moradores', 25000, 0, 100),
  (1, 'Maria Silva', '71988775588', 'maria.silva@exemplo.com', 'Feira de Santana', 'Centro', '05', 'alta', 800, 'ativo', 'Líder religiosa, muito respeitada na comunidade', 35000, 0, 100),
  (1, 'João Santos', '71988776655', 'joao.santos@exemplo.com', 'Vitória da Conquista', 'Candeias', '08', 'media', 350, 'ativo', 'Professor universitário, boa penetração no meio acadêmico', 18000, 0, 100),
  (1, 'Ana Costa', '71988776688', 'ana.costa@exemplo.com', 'Ilhéus', 'Pontal', '03', 'media', 280, 'ativo', 'Empresária do ramo de turismo', 12000, 0, 100);

-- COORDENADORES DE EXEMPLO
INSERT INTO coordenadores (candidato_id, nome, telefone, email, municipio, area_atuacao, status, territorio_id, qtd_liderancas, qtd_eleitores_captados, meta_liderancas, meta_eleitores)
VALUES
  (1, 'Carlos Mendes', '71999887766', 'carlos.mendes@exemplo.com', 'Salvador', 'Regional Centro', 'ativo', 1, 0, 0, 10, 1000),
  (1, 'Patrícia Lima', '71999887777', 'patricia.lima@exemplo.com', 'Feira de Santana', 'Regional Norte', 'ativo', 5, 0, 0, 10, 1000),
  (1, 'Roberto Alves', '71999887788', 'roberto.alves@exemplo.com', 'Vitória da Conquista', 'Regional Sul', 'ativo', 8, 0, 0, 10, 1000);

-- PROFISSIONAIS DE APOIO
INSERT INTO profissionais (candidato_id, nome, profissao, telefone, email, municipio, area_especialidade, status)
VALUES
  (1, 'Dr. Ricardo Santos', 'Médico', '71988990011', 'dr.ricardo@exemplo.com', 'Salvador', 'Cardiologia', 'ativo'),
  (1, 'Dra. Juliana Oliveira', 'Advogada', '71988990022', 'dra.juliana@exemplo.com', 'Salvador', 'Direito Civil', 'ativo'),
  (1, 'Eng. Paulo Costa', 'Engenheiro', '71988990033', 'eng.paulo@exemplo.com', 'Feira de Santana', 'Engenharia Civil', 'ativo'),
  (1, 'Prof. Márcia Souza', 'Professora', '71988990044', 'prof.marcia@exemplo.com', 'Vitória da Conquista', 'Educação Infantil', 'ativo');

-- SOLICITAÇÕES PENDENTES DE EXEMPLO
INSERT INTO solicitacoes (candidato_id, tipo, nome, telefone, email, municipio, dados_json, status)
VALUES
  (NULL, 'lideranca', 'José Pereira', '71988881122', 'jose.pereira@exemplo.com', 'Camaçari', '{"bairro":"Centro","observacoes":"Quero ajudar na campanha"}', 'pendente'),
  (NULL, 'coordenador', 'Sandra Martins', '71988881133', 'sandra.martins@exemplo.com', 'Lauro de Freitas', '{"area_atuacao":"Regional Metropolitana","observacoes":"Experiência em coordenação de campanhas"}', 'pendente'),
  (NULL, 'lideranca', 'Pedro Almeida', '71988881144', 'pedro.almeida@exemplo.com', 'Alagoinhas', '{"bairro":"Centro","observacoes":"Líder comunitário"}', 'pendente');

-- ELEITORES DE EXEMPLO (com hierarquia)
INSERT INTO eleitores (candidato_id, lideranca_id, coordenador_id, nome, cpf, telefone, email, municipio, bairro, zona, secao, titulo_eleitor, local_votacao, status_apoio, nivel_engajamento, confirmado, compareceu_evento, observacoes, tags)
VALUES
  (1, 2, 1, 'Antonio Silva', '12345678901', '71988990055', 'antonio.silva@exemplo.com', 'Salvador', 'Boa Viagem', '10', '0123', '123456789012', 'Escola Municipal da Boa Viagem', 'militante', 'alto', 1, 1, 'Muito ativo na campanha', 'militante,ativo'),
  (1, 2, 1, 'Beatriz Santos', '98765432109', '71988990066', 'beatriz.santos@exemplo.com', 'Salvador', 'Boa Viagem', '10', '0124', '987654321098', 'Escola Municipal da Boa Viagem', 'apoiador', 'medio', 1, 0, NULL, 'apoiador'),
  (1, 3, 1, 'Carlos Eduardo', '11122233344', '71988990077', 'carlos.eduardo@exemplo.com', 'Salvador', 'Pituba', '12', '0234', '111222333444', 'Colégio Estadual da Pituba', 'simpatizante', 'baixo', 0, 0, NULL, 'simpatizante'),
  (1, 4, 2, 'Diana Ferreira', '55566677788', '71988990088', 'diana.ferreira@exemplo.com', 'Feira de Santana', 'Centro', '05', '0345', '555666777888', 'Escola Central de Feira', 'apoiador', 'alto', 1, 1, 'Participa ativamente dos eventos', 'apoiador,ativo'),
  (1, 5, 2, 'Eduardo Lima', '99988877766', '71988990099', 'eduardo.lima@exemplo.com', 'Feira de Santana', 'Mangabeira', '06', '0456', '999888777666', 'Escola da Mangabeira', 'simpatizante', 'medio', 0, 0, NULL, 'simpatizante');

-- DADOS ELEITORAIS DE EXEMPLO
INSERT INTO dados_eleitorais (candidato_id, municipio, zona, secao, total_eleitores, eleitores_apoio, percentual_apoio, observacoes)
VALUES
  (1, 'Salvador', '10', '0123', 1500, 450, 30.0, 'Bairro Boa Viagem - Alta penetração'),
  (1, 'Salvador', '12', '0234', 1800, 360, 20.0, 'Bairro Pituba - Potencial de crescimento'),
  (1, 'Feira de Santana', '05', '0345', 2200, 880, 40.0, 'Centro - Forte apoio popular'),
  (1, 'Vitória da Conquista', '08', '0567', 1600, 320, 20.0, 'Região Sul - Iniciar trabalho de base'),
  (1, 'Ilhéus', '03', '0678', 1200, 240, 20.0, 'Zona turística - Boa receptividade');

-- AGENDA DE EVENTOS (exemplos)
INSERT INTO agenda (candidato_id, titulo, descricao, tipo, data_hora, local, municipio, prioridade, status)
VALUES
  (1, 'Reunião com Lideranças', 'Reunião estratégica com lideranças locais', 'reuniao', '2026-04-15 19:00:00', 'Sede da Campanha', 'Salvador', 'alta', 'agendado'),
  (1, 'Caminhada no Centro', 'Caminhada e corpo a corpo com eleitores', 'evento_publico', '2026-04-18 09:00:00', 'Praça Municipal', 'Feira de Santana', 'alta', 'agendado'),
  (1, 'Encontro com Empresários', 'Apresentação de propostas para o setor empresarial', 'reuniao', '2026-04-20 15:00:00', 'Associação Comercial', 'Vitória da Conquista', 'media', 'agendado'),
  (1, 'Live nas Redes Sociais', 'Live para esclarecer propostas', 'online', '2026-04-22 20:00:00', 'Online', 'Salvador', 'media', 'agendado');

-- Atualizar contadores de lideranças nos coordenadores
UPDATE coordenadores SET qtd_liderancas = (
  SELECT COUNT(*) FROM liderancas WHERE liderancas.coordenador_id = coordenadores.id
);

-- Atualizar contador de eleitores confirmados nas lideranças
UPDATE liderancas SET qtd_eleitores_confirmados = (
  SELECT COUNT(*) FROM eleitores WHERE eleitores.lideranca_id = liderancas.id AND eleitores.confirmado = 1
);
