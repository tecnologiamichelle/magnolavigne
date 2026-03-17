/**
 * Script para fazer merge dos dados de eleitores da planilha original
 * com os dados oficiais do DIEESE (417 municípios)
 * 
 * Estratégia:
 * 1. Carregar dados da planilha original (territorios_data.json) - tem eleitores
 * 2. Atualizar população dos municípios no banco D1 quando houver match
 * 3. Para municípios sem dados, manter população 0
 */

const fs = require('fs');
const path = require('path');

// Carregar dados da planilha original
const territoriosOriginal = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'territorios_data.json'), 'utf-8')
);

console.log('✅ Dados da planilha original carregados');
console.log(`   - ${territoriosOriginal.territorios.length} territórios`);

// Criar mapa de municípios -> eleitores
const municipiosEleitores = new Map();
let totalMunicipiosComEleitores = 0;

territoriosOriginal.territorios.forEach(territorio => {
  territorio.municipios.forEach(municipio => {
    // Normalizar nome (trim, uppercase)
    const nomeNormalizado = municipio.nome.trim().toUpperCase();
    municipiosEleitores.set(nomeNormalizado, municipio.eleitores);
    totalMunicipiosComEleitores++;
  });
});

console.log(`✅ Mapa de eleitores criado: ${municipiosEleitores.size} municípios únicos`);
console.log(`   - Total de entradas: ${totalMunicipiosComEleitores}`);

// Gerar SQL para atualizar municípios
const updates = [];
const municipiosComMatch = [];
const municipiosSemMatch = [];

// Para cada município no mapa, criar UPDATE
for (const [nome, eleitores] of municipiosEleitores.entries()) {
  updates.push(`UPDATE territorios_municipios SET populacao = ${eleitores} WHERE UPPER(TRIM(nome_municipio)) = '${nome.replace(/'/g, "''")}';`);
  municipiosComMatch.push({ nome, eleitores });
}

// Estatísticas
console.log(`\n📊 Estatísticas:`);
console.log(`   - Municípios com dados de eleitores: ${municipiosComMatch.length}`);
console.log(`   - Total de eleitores: ${[...municipiosEleitores.values()].reduce((a, b) => a + b, 0).toLocaleString('pt-BR')}`);

// Gerar arquivo SQL
const sqlContent = `-- Script de atualização de eleitores
-- Gerado automaticamente em ${new Date().toLocaleString('pt-BR')}
-- Fonte: TERRITÓRIOS DE IDENTIDADE BAHIA 09-2025.xlsx
--
-- Total de municípios com dados: ${municipiosComMatch.length}
-- Total de eleitores: ${[...municipiosEleitores.values()].reduce((a, b) => a + b, 0).toLocaleString('pt-BR')}

-- ============================================
-- Atualizar população dos municípios
-- ============================================

${updates.join('\n')}

-- ============================================
-- Atualizar populacao_estimada dos territórios
-- (somar municípios)
-- ============================================
UPDATE territorios 
SET populacao_estimada = (
  SELECT COALESCE(SUM(populacao), 0) 
  FROM territorios_municipios 
  WHERE territorios_municipios.territorio_id = territorios.id
);
`;

// Salvar arquivo
const sqlPath = path.join(__dirname, 'update_eleitores.sql');
fs.writeFileSync(sqlPath, sqlContent, 'utf-8');

console.log(`\n✅ Arquivo SQL gerado: ${sqlPath}`);
console.log(`   - ${updates.length} comandos UPDATE`);
console.log(`   - 1 comando de atualização de territórios`);

// Salvar estatísticas em JSON
const stats = {
  data_geracao: new Date().toISOString(),
  municipios_com_dados: municipiosComMatch.length,
  total_eleitores: [...municipiosEleitores.values()].reduce((a, b) => a + b, 0),
  top_10_maiores: municipiosComMatch
    .sort((a, b) => b.eleitores - a.eleitores)
    .slice(0, 10),
  amostra_municipios: municipiosComMatch.slice(0, 20)
};

const statsPath = path.join(__dirname, 'eleitores_stats.json');
fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2), 'utf-8');

console.log(`✅ Estatísticas salvas: ${statsPath}`);
console.log(`\n🎯 Próximos passos:`);
console.log(`   1. Executar: npx wrangler d1 execute webapp-v8 --local --file=./scripts/update_eleitores.sql`);
console.log(`   2. Executar: npx wrangler d1 execute webapp-v8 --remote --file=./scripts/update_eleitores.sql`);
console.log(`   3. Verificar: SELECT COUNT(*), SUM(populacao) FROM territorios_municipios WHERE populacao > 0`);
