-- SEED ULTRA SIMPLES - Sem Foreign Keys problemáticas
INSERT OR IGNORE INTO liderancas (candidato_id, nome, telefone, municipio, status)
VALUES (1, 'João Silva', '71988775566', 'Salvador', 'ativo');

INSERT OR IGNORE INTO coordenadores (candidato_id, nome, telefone, municipio, status)
VALUES (1, 'Maria Santos', '71999887722', 'Salvador', 'ativo');

INSERT OR IGNORE INTO profissionais (candidato_id, nome, profissao, telefone, municipio, status)
VALUES (1, 'Dr. Pedro', 'Médico', '71988990033', 'Salvador', 'ativo');

INSERT OR IGNORE INTO solicitacoes (tipo, nome, telefone, municipio, status)
VALUES 
  ('lideranca', 'Ana Costa', '71988881144', 'Salvador', 'pendente'),
  ('coordenador', 'Carlos Lima', '71988881155', 'Salvador', 'pendente');
