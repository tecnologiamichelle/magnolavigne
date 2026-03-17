#!/usr/bin/env python3
"""
Script para processar dados de eleitorado do TSE 2024
Agrega dados por município e conta total de eleitores
"""

import csv
import json
from collections import defaultdict
from datetime import datetime

print("🔄 Processando arquivo perfil_eleitor_secao_2024_BA.csv...")
print("   Arquivo: 1.6 GB, ~milhões de linhas")
print()

# Dicionário para armazenar eleitores por município
municipios_eleitores = defaultdict(int)
municipios_nomes = {}
total_linhas = 0

# Processar CSV linha por linha (memória eficiente)
with open('perfil_eleitor_secao_2024_BA.csv', 'r', encoding='latin-1') as f:
    reader = csv.DictReader(f, delimiter=';')
    
    for row in reader:
        total_linhas += 1
        
        # Extrair dados
        cod_municipio = row['CD_MUNICIPIO'].strip('"')
        nome_municipio = row['NM_MUNICIPIO'].strip('"')
        qt_eleitores = int(row['QT_ELEITORES_PERFIL'].strip('"'))
        
        # Normalizar nome do município
        nome_normalizado = nome_municipio.upper().strip()
        # Corrigir caracteres mal codificados
        nome_normalizado = nome_normalizado.replace('�', 'Ã')
        nome_normalizado = nome_normalizado.replace('�', 'Á')
        nome_normalizado = nome_normalizado.replace('�', 'É')
        nome_normalizado = nome_normalizado.replace('�', 'Í')
        nome_normalizado = nome_normalizado.replace('�', 'Ó')
        nome_normalizado = nome_normalizado.replace('�', 'Ú')
        nome_normalizado = nome_normalizado.replace('�', 'Ç')
        nome_normalizado = nome_normalizado.replace('�', 'Õ')
        nome_normalizado = nome_normalizado.replace('�', 'Â')
        nome_normalizado = nome_normalizado.replace('�', 'Ê')
        nome_normalizado = nome_normalizado.replace('�', 'Ô')
        nome_normalizado = nome_normalizado.replace('�', 'À')
        
        # Acumular eleitores
        municipios_eleitores[cod_municipio] += qt_eleitores
        municipios_nomes[cod_municipio] = nome_normalizado
        
        # Progress feedback a cada 1 milhão de linhas
        if total_linhas % 1000000 == 0:
            print(f"   Processadas: {total_linhas:,} linhas...")

print(f"\n✅ Processamento concluído!")
print(f"   Total de linhas: {total_linhas:,}")
print(f"   Municípios encontrados: {len(municipios_eleitores)}")
print()

# Criar lista ordenada
municipios_lista = []
total_eleitores_ba = 0

for cod_mun, total_eleitores in municipios_eleitores.items():
    nome_mun = municipios_nomes[cod_mun]
    municipios_lista.append({
        'codigo_tse': cod_mun,
        'nome': nome_mun,
        'eleitores': total_eleitores
    })
    total_eleitores_ba += total_eleitores

# Ordenar por número de eleitores (decrescente)
municipios_lista.sort(key=lambda x: x['eleitores'], reverse=True)

# Estatísticas
print("📊 Estatísticas:")
print(f"   Total de eleitores na Bahia: {total_eleitores_ba:,}")
print(f"   Municípios com dados: {len(municipios_lista)}")
print()

# Top 10
print("🏆 Top 10 municípios (eleitores):")
for i, mun in enumerate(municipios_lista[:10], 1):
    print(f"   {i:2d}. {mun['nome']:<30s} {mun['eleitores']:>10,} eleitores")
print()

# Salvar JSON completo
output_json = {
    'data_geracao': datetime.now().isoformat(),
    'fonte': 'TSE - Perfil do Eleitorado 2024',
    'arquivo_origem': 'perfil_eleitor_secao_2024_BA.csv',
    'total_municipios': len(municipios_lista),
    'total_eleitores': total_eleitores_ba,
    'municipios': municipios_lista
}

with open('eleitorado_tse_2024_completo.json', 'w', encoding='utf-8') as f:
    json.dump(output_json, f, ensure_ascii=False, indent=2)

print(f"✅ Arquivo JSON salvo: eleitorado_tse_2024_completo.json")
print(f"   Tamanho: {len(json.dumps(output_json, ensure_ascii=False))} bytes")
print()

# Gerar SQL para atualização
sql_updates = []

for mun in municipios_lista:
    nome_sql = mun['nome'].replace("'", "''")
    sql_updates.append(
        f"UPDATE territorios_municipios SET populacao = {mun['eleitores']} "
        f"WHERE UPPER(TRIM(nome_municipio)) = '{nome_sql}';"
    )

# Adicionar UPDATE para populacao_estimada dos territórios
sql_updates.append("")
sql_updates.append("-- Atualizar populacao_estimada dos territórios")
sql_updates.append("UPDATE territorios SET populacao_estimada = (")
sql_updates.append("  SELECT COALESCE(SUM(populacao), 0)")
sql_updates.append("  FROM territorios_municipios")
sql_updates.append("  WHERE territorios_municipios.territorio_id = territorios.id")
sql_updates.append(");")

sql_content = f"""-- Script de atualização de eleitores TSE 2024
-- Gerado automaticamente em {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}
-- Fonte: TSE - Perfil do Eleitorado por Seção Eleitoral 2024
-- Arquivo: perfil_eleitor_secao_2024_BA.csv (1.6 GB)
--
-- Total de municípios: {len(municipios_lista)}
-- Total de eleitores: {total_eleitores_ba:,}

-- ============================================
-- Atualizar população dos municípios
-- ============================================

{chr(10).join(sql_updates)}
"""

with open('update_eleitores_tse_2024.sql', 'w', encoding='utf-8') as f:
    f.write(sql_content)

print(f"✅ Arquivo SQL salvo: update_eleitores_tse_2024.sql")
print(f"   Comandos SQL: {len(sql_updates)}")
print()

print("🎯 Próximos passos:")
print("   1. npx wrangler d1 execute webapp-v8 --local --file=./scripts/update_eleitores_tse_2024.sql")
print("   2. npx wrangler d1 execute webapp-v8 --remote --file=./scripts/update_eleitores_tse_2024.sql")
print("   3. Verificar: SELECT COUNT(*), SUM(populacao) FROM territorios_municipios WHERE populacao > 0")
