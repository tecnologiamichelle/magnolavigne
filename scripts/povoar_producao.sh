#!/bin/bash

# Script para povoar banco de PRODUÇÃO via API
# Sistema: MeuPolitico.Digital V2.1.3

BASE_URL="https://9a4897f5.meupolitico-digital.pages.dev"
CANDIDATO_ID=3

echo "🚀 Iniciando povoamento do banco de PRODUÇÃO..."
echo "🌐 URL: $BASE_URL"
echo ""

# =====================================================
# 1. COORDENADORES (5 registros)
# =====================================================
echo "📊 Criando Coordenadores..."

curl -s -X POST $BASE_URL/api/coordenadores \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "nome": "Carlos Eduardo Silva",
    "telefone": "71987654321",
    "email": "carlos.silva@exemplo.com",
    "municipio": "Salvador",
    "area_atuacao": "Articulação Política"
  }' > /dev/null && echo "  ✓ Carlos Eduardo Silva (Salvador)"

curl -s -X POST $BASE_URL/api/coordenadores \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "nome": "Maria Fernanda Santos",
    "telefone": "71987654322",
    "email": "maria.santos@exemplo.com",
    "municipio": "Camaçari",
    "area_atuacao": "Mobilização Social"
  }' > /dev/null && echo "  ✓ Maria Fernanda Santos (Camaçari)"

curl -s -X POST $BASE_URL/api/coordenadores \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "nome": "João Pedro Oliveira",
    "telefone": "71987654323",
    "email": "joao.oliveira@exemplo.com",
    "municipio": "Lauro de Freitas",
    "area_atuacao": "Comunicação"
  }' > /dev/null && echo "  ✓ João Pedro Oliveira (Lauro de Freitas)"

echo ""
echo "✅ 3 Coordenadores criados"
echo ""

# =====================================================
# 2. LIDERANÇAS (9 registros - 3 por coordenador)
# =====================================================
echo "👥 Criando Lideranças..."

# Assumindo que os coordenadores terão IDs 3, 4, 5 em produção
# Coordenador 3 (Carlos Eduardo - Salvador)
for i in 1 2 3; do
  curl -s -X POST $BASE_URL/api/liderancas \
    -H "Content-Type: application/json" \
    -d '{
      "candidato_id": '$CANDIDATO_ID',
      "coordenador_id": 3,
      "nome": "Liderança Salvador '$i'",
      "telefone": "7199888770'$i'",
      "email": "lideranca.ssa'$i'@exemplo.com",
      "municipio": "Salvador",
      "bairro": "Bairro '$i'",
      "nivel_influencia": "media"
    }' > /dev/null && echo "  ✓ Liderança Salvador $i"
done

# Coordenador 4 (Maria Fernanda - Camaçari)
for i in 1 2 3; do
  curl -s -X POST $BASE_URL/api/liderancas \
    -H "Content-Type: application/json" \
    -d '{
      "candidato_id": '$CANDIDATO_ID',
      "coordenador_id": 4,
      "nome": "Liderança Camaçari '$i'",
      "telefone": "7199888771'$i'",
      "email": "lideranca.cmc'$i'@exemplo.com",
      "municipio": "Camaçari",
      "bairro": "Bairro '$i'",
      "nivel_influencia": "media"
    }' > /dev/null && echo "  ✓ Liderança Camaçari $i"
done

# Coordenador 5 (João Pedro - Lauro de Freitas)
for i in 1 2 3; do
  curl -s -X POST $BASE_URL/api/liderancas \
    -H "Content-Type: application/json" \
    -d '{
      "candidato_id": '$CANDIDATO_ID',
      "coordenador_id": 5,
      "nome": "Liderança Lauro '$i'",
      "telefone": "7199888772'$i'",
      "email": "lideranca.ldf'$i'@exemplo.com",
      "municipio": "Lauro de Freitas",
      "bairro": "Bairro '$i'",
      "nivel_influencia": "media"
    }' > /dev/null && echo "  ✓ Liderança Lauro $i"
done

echo ""
echo "✅ 9 Lideranças criadas"
echo ""

# =====================================================
# 3. ELEITORES (18 registros - 2 por liderança)
# =====================================================
echo "🗳️  Criando Eleitores..."

# Assumindo lideranças IDs 3-11 em produção
for lid in 3 4 5 6 7 8 9 10 11; do
  curl -s -X POST $BASE_URL/api/eleitores \
    -H "Content-Type: application/json" \
    -d '{
      "candidato_id": '$CANDIDATO_ID',
      "lideranca_id": '$lid',
      "nome": "Eleitor Produção '$lid'A",
      "telefone": "7199900'$lid'1",
      "municipio": "Salvador",
      "status_apoio": "simpatizante",
      "nivel_engajamento": "baixo"
    }' > /dev/null
  
  curl -s -X POST $BASE_URL/api/eleitores \
    -H "Content-Type: application/json" \
    -d '{
      "candidato_id": '$CANDIDATO_ID',
      "lideranca_id": '$lid',
      "nome": "Eleitor Produção '$lid'B",
      "telefone": "7199900'$lid'2",
      "municipio": "Salvador",
      "status_apoio": "apoiador",
      "nivel_engajamento": "medio"
    }' > /dev/null
  
  echo "  ✓ 2 eleitores para Liderança $lid"
done

echo ""
echo "✅ 18 Eleitores criados"
echo ""

# =====================================================
# RESUMO FINAL
# =====================================================
echo ""
echo "════════════════════════════════════════════════"
echo "✅ POVOAMENTO DE PRODUÇÃO CONCLUÍDO!"
echo "════════════════════════════════════════════════"
echo ""
echo "📊 Dados criados em PRODUÇÃO:"
echo "  • 3 Coordenadores"
echo "  • 9 Lideranças (3 por coordenador)"
echo "  • 18 Eleitores (2 por liderança)"
echo ""
echo "📈 Total de registros: ~30"
echo ""
echo "🌐 Acesse: $BASE_URL"
echo "🔑 Login: admin@meupolitico.digital / Admin@2026"
echo ""
echo "⚠️  SEGURANÇA: Após popular, considere implementar"
echo "    autenticação JWT para os endpoints da API"
echo ""
echo "════════════════════════════════════════════════"
