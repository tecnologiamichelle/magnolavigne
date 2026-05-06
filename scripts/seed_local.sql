-- Script para popular banco LOCAL com dados da PRODUÇÃO
-- Sistema: Magno Lavigne
-- Data: 06/05/2026

-- Limpar dados existentes
DELETE FROM eleitores;
DELETE FROM liderancas;
DELETE FROM coordenadores;
DELETE FROM profissionais;
DELETE FROM agenda;
DELETE FROM candidatos;

-- Inserir candidatos
INSERT INTO candidatos (id, email, senha, nome, cargo, municipio, status, tipo, partido, created_at) VALUES
(1, 'pitanga@magnolavigne.com.br', 'B@hia2026', 'Edvaldo Pitanga', 'Super Admin', 'Salvador', 'ativo', 'admin', 'PV', '2026-04-10 23:18:07'),
(3, 'admin@magnolavigne.com.br', 'Admin@2026', 'Administrador Magno Lavigne', 'Administrador', 'Salvador', 'ativo', 'admin', 'PV', '2026-04-10 23:18:07'),
(101, 'coordenador@magnolavigne.com.br', 'Magno@2026', 'Coordenador Geral', 'Coordenador', 'Salvador', 'ativo', 'admin', 'PV', '2026-05-06 13:35:33'),
(102, 'gerente@magnolavigne.com.br', 'Magno@2026', 'Gerente de Campanha', 'Gerente', 'Salvador', 'ativo', 'admin', 'PV', '2026-05-06 13:35:33'),
(103, 'supervisor@magnolavigne.com.br', 'Magno@2026', 'Supervisor', 'Supervisor', 'Salvador', 'ativo', 'admin', 'PV', '2026-05-06 13:35:33'),
(104, 'comunicacao@magnolavigne.com.br', 'Magno@2026', 'Comunicação', 'Analista', 'Salvador', 'ativo', 'admin', 'PV', '2026-05-06 13:35:33');

-- Inserir coordenadores de exemplo
INSERT INTO coordenadores (candidato_id, nome, telefone, email, municipio, bairro, zona_eleitoral, status, meta_liderancas, meta_eleitores) VALUES
(3, 'João Silva', '71999887766', 'joao@exemplo.com', 'Salvador', 'Itapuã', '100', 'ativo', 10, 500),
(3, 'Maria Santos', '71988776655', 'maria@exemplo.com', 'Camaçari', 'Centro', '050', 'ativo', 8, 400),
(3, 'Pedro Oliveira', '71977665544', 'pedro@exemplo.com', 'Feira de Santana', 'Centro', '020', 'ativo', 12, 600);

-- Inserir lideranças de exemplo
INSERT INTO liderancas (candidato_id, nome, telefone, email, municipio, bairro, zona_eleitoral, qtd_influenciados, status, meta_eleitores) VALUES
(3, 'Ana Costa', '71966554433', 'ana@exemplo.com', 'Salvador', 'Barra', '100', 50, 'ativo', 100),
(3, 'Carlos Mendes', '71955443322', 'carlos@exemplo.com', 'Salvador', 'Pituba', '101', 75, 'ativo', 150),
(3, 'Fernanda Lima', '71944332211', 'fernanda@exemplo.com', 'Lauro de Freitas', 'Centro', '080', 60, 'ativo', 120),
(3, 'Roberto Alves', '71933221100', 'roberto@exemplo.com', 'Camaçari', 'Abrantes', '050', 45, 'ativo', 90),
(3, 'Juliana Rocha', '71922110099', 'juliana@exemplo.com', 'Feira de Santana', 'Mangabeira', '020', 80, 'ativo', 160);

-- Inserir eleitores de exemplo
INSERT INTO eleitores (candidato_id, lideranca_id, nome, telefone, email, municipio, bairro, status_apoio, confirmado) VALUES
(3, 1, 'Eleitor Teste 1', '71911110000', 'eleitor1@exemplo.com', 'Salvador', 'Barra', 'apoiador', 1),
(3, 1, 'Eleitor Teste 2', '71911110001', 'eleitor2@exemplo.com', 'Salvador', 'Barra', 'simpatizante', 0),
(3, 2, 'Eleitor Teste 3', '71911110002', 'eleitor3@exemplo.com', 'Salvador', 'Pituba', 'militante', 1),
(3, 2, 'Eleitor Teste 4', '71911110003', 'eleitor4@exemplo.com', 'Salvador', 'Pituba', 'apoiador', 1),
(3, 3, 'Eleitor Teste 5', '71911110004', 'eleitor5@exemplo.com', 'Lauro de Freitas', 'Centro', 'simpatizante', 0);

-- Inserir profissionais de exemplo
INSERT INTO profissionais (candidato_id, nome, profissao, telefone, email, municipio, status) VALUES
(3, 'Dr. Roberto Carvalho', 'Médico', '71988887777', 'roberto.medico@exemplo.com', 'Salvador', 'ativo'),
(3, 'Eng. Márcia Lima', 'Engenheira Civil', '71977776666', 'marcia.eng@exemplo.com', 'Camaçari', 'ativo'),
(3, 'Prof. Antônio Souza', 'Professor', '71966665555', 'antonio.prof@exemplo.com', 'Feira de Santana', 'ativo');

-- Inserir eventos de agenda
INSERT INTO agenda (candidato_id, titulo, descricao, data_hora, local, municipio, tipo, prioridade, status) VALUES
(3, 'Reunião com Lideranças', 'Reunião estratégica mensal', '2026-05-15 19:00:00', 'Sede da Campanha', 'Salvador', 'reuniao', 'alta', 'pendente'),
(3, 'Visita a Feira de Santana', 'Visita aos coordenadores locais', '2026-05-20 10:00:00', 'Centro da Cidade', 'Feira de Santana', 'visita', 'media', 'pendente'),
(3, 'Evento Comunitário', 'Participação em evento local', '2026-05-25 16:00:00', 'Praça Central', 'Camaçari', 'evento', 'alta', 'pendente');
