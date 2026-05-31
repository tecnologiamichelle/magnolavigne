-- Seed: 27 Territórios de Identidade da Bahia
-- Fonte: Decreto Estadual 12.354/2010
-- Data: 06/05/2026

-- Limpar dados existentes
DELETE FROM territorios;

-- Inserir os 27 Territórios de Identidade da Bahia
INSERT INTO territorios (id, codigo, nome, regiao, total_municipios, populacao_estimada, area_km2, caracteristicas) VALUES
-- 1. Metropolitano de Salvador
(1, 'TI-01', 'Metropolitano de Salvador', 'Litoral', 13, 3900000, 4375, '{"principal_atividade":"Serviços, Indústria, Turismo","destaque":"Região mais populosa do estado"}'),

-- 2. Litoral Norte
(2, 'TI-02', 'Litoral Norte', 'Litoral', 12, 350000, 4920, '{"principal_atividade":"Turismo, Pesca, Agricultura","destaque":"Linha Verde, Praias paradisíacas"}'),

-- 3. Recôncavo
(3, 'TI-03', 'Recôncavo', 'Centro', 20, 820000, 10500, '{"principal_atividade":"Petróleo, Gás, Agricultura","destaque":"Berço da cultura baiana"}'),

-- 4. Agreste Baiano
(4, 'TI-04', 'Agreste Baiano', 'Centro', 14, 480000, 8200, '{"principal_atividade":"Agricultura, Pecuária","destaque":"Produção agrícola diversificada"}'),

-- 5. Litoral Sul
(5, 'TI-05', 'Litoral Sul', 'Litoral', 26, 1100000, 19800, '{"principal_atividade":"Turismo, Cacau, Indústria","destaque":"Costa do Cacau, Praias"}'),

-- 6. Baixo Sul
(6, 'TI-06', 'Baixo Sul', 'Sul', 14, 350000, 9500, '{"principal_atividade":"Pesca, Turismo, Agricultura","destaque":"Baía de Camamu, Maraú"}'),

-- 7. Extremo Sul
(7, 'TI-07', 'Extremo Sul', 'Sul', 21, 730000, 30200, '{"principal_atividade":"Celulose, Turismo, Agricultura","destaque":"Parque Nacional do Descobrimento"}'),

-- 8. Médio Sudoeste da Bahia
(8, 'TI-08', 'Médio Sudoeste da Bahia', 'Sudoeste', 19, 420000, 25600, '{"principal_atividade":"Agricultura, Pecuária","destaque":"Produção de café"}'),

-- 9. Vale do Jiquiriçá
(9, 'TI-09', 'Vale do Jiquiriçá', 'Centro', 20, 380000, 11800, '{"principal_atividade":"Agricultura, Pecuária","destaque":"Rio Jiquiriçá"}'),

-- 10. Sertão do São Francisco
(10, 'TI-10', 'Sertão do São Francisco', 'Oeste', 10, 280000, 35400, '{"principal_atividade":"Agricultura irrigada, Pesca","destaque":"Lago de Sobradinho"}'),

-- 11. Bacia do Rio Grande
(11, 'TI-11', 'Bacia do Rio Grande', 'Oeste', 14, 320000, 28500, '{"principal_atividade":"Agricultura, Mineração","destaque":"Rio Grande"}'),

-- 12. Bacia do Paramirim
(12, 'TI-12', 'Bacia do Paramirim', 'Centro-Oeste', 11, 210000, 32100, '{"principal_atividade":"Pecuária, Agricultura","destaque":"Chapada Diamantina"}'),

-- 13. Sertão Produtivo
(13, 'TI-13', 'Sertão Produtivo', 'Centro-Sul', 20, 580000, 27300, '{"principal_atividade":"Agricultura, Pecuária","destaque":"Vitória da Conquista"}'),

-- 14. Médio Rio de Contas
(14, 'TI-14', 'Médio Rio de Contas', 'Centro-Sul', 16, 290000, 19400, '{"principal_atividade":"Agricultura, Pecuária","destaque":"Rio de Contas"}'),

-- 15. Bacia do Rio Corrente
(15, 'TI-15', 'Bacia do Rio Corrente', 'Oeste', 10, 190000, 36800, '{"principal_atividade":"Agricultura, Pecuária","destaque":"Produção de soja"}'),

-- 16. Chapada Diamantina
(16, 'TI-16', 'Chapada Diamantina', 'Centro', 24, 390000, 36600, '{"principal_atividade":"Turismo, Agricultura","destaque":"Parque Nacional da Chapada Diamantina"}'),

-- 17. Sisal
(17, 'TI-17', 'Sisal', 'Norte', 20, 580000, 26800, '{"principal_atividade":"Sisal, Pecuária","destaque":"Maior produtor de sisal do Brasil"}'),

-- 18. Piemonte da Diamantina
(18, 'TI-18', 'Piemonte da Diamantina', 'Norte', 10, 260000, 21500, '{"principal_atividade":"Pecuária, Agricultura","destaque":"Transição para Chapada"}'),

-- 19. Piemonte Norte do Itapicuru
(19, 'TI-19', 'Piemonte Norte do Itapicuru', 'Norte', 16, 410000, 18700, '{"principal_atividade":"Agricultura, Pecuária","destaque":"Rio Itapicuru"}'),

-- 20. Médio Vale do Itapicuru
(20, 'TI-20', 'Médio Vale do Itapicuru', 'Norte', 12, 280000, 19200, '{"principal_atividade":"Agricultura, Pecuária","destaque":"Agricultura familiar"}'),

-- 21. Portal do Sertão
(21, 'TI-21', 'Portal do Sertão', 'Centro', 15, 730000, 14100, '{"principal_atividade":"Comércio, Indústria, Agricultura","destaque":"Feira de Santana - Princesa do Sertão"}'),

-- 22. Semiárido Nordeste II
(22, 'TI-22', 'Semiárido Nordeste II', 'Norte', 19, 480000, 31800, '{"principal_atividade":"Agricultura, Pecuária","destaque":"Região semiárida"}'),

-- 23. Velho Chico
(23, 'TI-23', 'Velho Chico', 'Norte', 16, 350000, 46200, '{"principal_atividade":"Agricultura irrigada, Pesca","destaque":"Rio São Francisco"}'),

-- 24. Bacia do Jacuípe
(24, 'TI-24', 'Bacia do Jacuípe', 'Centro', 14, 320000, 12400, '{"principal_atividade":"Agricultura, Pecuária","destaque":"Rio Jacuípe"}'),

-- 25. Piemonte da Chapada Norte
(25, 'TI-25', 'Piemonte da Chapada Norte', 'Norte', 9, 180000, 15600, '{"principal_atividade":"Pecuária, Agricultura","destaque":"Transição Chapada/Sertão"}'),

-- 26. Oeste Baiano
(26, 'TI-26', 'Oeste Baiano', 'Oeste', 23, 480000, 110500, '{"principal_atividade":"Agronegócio, Soja","destaque":"Maior produtor de grãos da BA"}'),

-- 27. Itaparica
(27, 'TI-27', 'Itaparica', 'Oeste', 8, 150000, 22400, '{"principal_atividade":"Agricultura irrigada, Pesca","destaque":"Lago de Itaparica"}');

-- Verificar inserção
SELECT COUNT(*) as total_territorios FROM territorios;
