-- ============================================
-- SEED SIMPLIFICADO - Apenas dados básicos
-- ============================================

-- LIDERANÇAS
INSERT OR IGNORE INTO liderancas (candidato_id, nome, telefone, email, municipio, bairro, status, nivel_influencia, qtd_influenciados)
VALUES
  (1, 'Rui Barbosa', '71988775569', 'rui.barbosa@exemplo.com', 'Salvador', 'Boa Viagem', 'ativo', 'alta', 500),
  (1, 'Frederico Borges', '71988775570', 'frederico@exemplo.com', 'Salvador', 'Pituba', 'ativo', 'media', 250),
  (1, 'Maria Silva', '71988775588', 'maria.silva@exemplo.com', 'Feira de Santana', 'Centro', 'ativo', 'alta', 800),
  (1, 'João Santos', '71988776655', 'joao.santos@exemplo.com', 'Vitória da Conquista', 'Candeias', 'ativo', 'media', 350);

-- COORDENADORES
INSERT OR IGNORE INTO coordenadores (candidato_id, nome, telefone, email, municipio, area_atuacao, status, territorio_id)
VALUES
  (1, 'Carlos Mendes', '71999887766', 'carlos.mendes@exemplo.com', 'Salvador', 'Regional Centro', 'ativo', 1),
  (1, 'Patrícia Lima', '71999887777', 'patricia.lima@exemplo.com', 'Feira de Santana', 'Regional Norte', 'ativo', 5);

-- PROFISSIONAIS
INSERT OR IGNORE INTO profissionais (candidato_id, nome, profissao, telefone, email, municipio, area_especialidade, status)
VALUES
  (1, 'Dr. Ricardo Santos', 'Médico', '71988990011', 'dr.ricardo@exemplo.com', 'Salvador', 'Cardiologia', 'ativo'),
  (1, 'Dra. Juliana Oliveira', 'Advogada', '71988990022', 'dra.juliana@exemplo.com', 'Salvador', 'Direito Civil', 'ativo');

-- SOLICITAÇÕES PENDENTES
INSERT OR IGNORE INTO solicitacoes (candidato_id, tipo, nome, telefone, email, municipio, dados_json, status)
VALUES
  (NULL, 'lideranca', 'José Pereira', '71988881122', 'jose.pereira@exemplo.com', 'Camaçari', '{"bairro":"Centro"}', 'pendente'),
  (NULL, 'coordenador', 'Sandra Martins', '71988881133', 'sandra.martins@exemplo.com', 'Lauro de Freitas', '{"area_atuacao":"Regional"}', 'pendente');

-- DADOS ELEITORAIS
INSERT OR IGNORE INTO dados_eleitorais (candidato_id, municipio, zona, total_eleitores, eleitores_apoio, percentual_apoio, observacoes)
VALUES
  (1, 'Salvador', '10', 1500, 450, 30.0, 'Bairro Boa Viagem'),
  (1, 'Feira de Santana', '05', 2200, 880, 40.0, 'Centro - Forte apoio');
