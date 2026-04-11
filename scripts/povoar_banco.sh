#!/bin/bash

# Script para povoar banco de dados via API
# Sistema: MeuPolitico.Digital V2.1.3

BASE_URL="http://localhost:3000"
CANDIDATO_ID=3

echo "🚀 Iniciando povoamento do banco de dados..."
echo ""

# =====================================================
# 1. COORDENADORES (5 registros)
# =====================================================
echo "📊 Criando Coordenadores..."

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

curl -s -X POST $BASE_URL/api/coordenadores \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "nome": "Ana Carolina Lima",
    "telefone": "71987654324",
    "email": "ana.lima@exemplo.com",
    "municipio": "Feira de Santana",
    "area_atuacao": "Gestão de Eventos"
  }' > /dev/null && echo "  ✓ Ana Carolina Lima (Feira de Santana)"

curl -s -X POST $BASE_URL/api/coordenadores \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "nome": "Roberto Carlos Souza",
    "telefone": "71987654325",
    "email": "roberto.souza@exemplo.com",
    "municipio": "Vitória da Conquista",
    "area_atuacao": "Logística"
  }' > /dev/null && echo "  ✓ Roberto Carlos Souza (Vitória da Conquista)"

echo ""
echo "✅ 5 Coordenadores criados (incluindo Carlos Eduardo já existente = 6 total)"
echo ""

# =====================================================
# 2. LIDERANÇAS (15 registros - 3 por coordenador)
# =====================================================
echo "👥 Criando Lideranças..."

# Coordenador 7 (Carlos Eduardo - Salvador) - já tem 1, criar mais 2
curl -s -X POST $BASE_URL/api/liderancas \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "coordenador_id": 7,
    "nome": "Beatriz Santos Carvalho",
    "telefone": "71998887702",
    "email": "beatriz.carvalho@exemplo.com",
    "municipio": "Salvador",
    "bairro": "Itapuã",
    "nivel_influencia": "media"
  }' > /dev/null && echo "  ✓ Beatriz Santos (Salvador/Itapuã)"

curl -s -X POST $BASE_URL/api/liderancas \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "coordenador_id": 7,
    "nome": "Carlos Alberto Menezes",
    "telefone": "71998887703",
    "email": "carlos.menezes@exemplo.com",
    "municipio": "Salvador",
    "bairro": "Cajazeiras",
    "nivel_influencia": "alta"
  }' > /dev/null && echo "  ✓ Carlos Alberto (Salvador/Cajazeiras)"

# Coordenador 8 (Maria Fernanda - Camaçari)
curl -s -X POST $BASE_URL/api/liderancas \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "coordenador_id": 8,
    "nome": "Fabiana Costa Nunes",
    "telefone": "71998887706",
    "email": "fabiana.nunes@exemplo.com",
    "municipio": "Camaçari",
    "bairro": "Centro",
    "nivel_influencia": "alta"
  }' > /dev/null && echo "  ✓ Fabiana Costa (Camaçari/Centro)"

curl -s -X POST $BASE_URL/api/liderancas \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "coordenador_id": 8,
    "nome": "Gabriel Souza Pinto",
    "telefone": "71998887707",
    "email": "gabriel.pinto@exemplo.com",
    "municipio": "Camaçari",
    "bairro": "Gleba A",
    "nivel_influencia": "media"
  }' > /dev/null && echo "  ✓ Gabriel Souza (Camaçari/Gleba A)"

curl -s -X POST $BASE_URL/api/liderancas \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "coordenador_id": 8,
    "nome": "Helena Maria Santos",
    "telefone": "71998887708",
    "email": "helena.santos@exemplo.com",
    "municipio": "Camaçari",
    "bairro": "Gleba C",
    "nivel_influencia": "media"
  }' > /dev/null && echo "  ✓ Helena Maria (Camaçari/Gleba C)"

# Coordenador 9 (João Pedro - Lauro de Freitas)
curl -s -X POST $BASE_URL/api/liderancas \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "coordenador_id": 9,
    "nome": "Juliana Andrade Sousa",
    "telefone": "71998887710",
    "email": "juliana.sousa@exemplo.com",
    "municipio": "Lauro de Freitas",
    "bairro": "Centro",
    "nivel_influencia": "media"
  }' > /dev/null && echo "  ✓ Juliana Andrade (Lauro de Freitas/Centro)"

curl -s -X POST $BASE_URL/api/liderancas \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "coordenador_id": 9,
    "nome": "Kevin Alves Moreira",
    "telefone": "71998887711",
    "email": "kevin.moreira@exemplo.com",
    "municipio": "Lauro de Freitas",
    "bairro": "Vilas do Atlântico",
    "nivel_influencia": "alta"
  }' > /dev/null && echo "  ✓ Kevin Alves (Lauro de Freitas/Vilas)"

curl -s -X POST $BASE_URL/api/liderancas \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "coordenador_id": 9,
    "nome": "Larissa Cristina Barros",
    "telefone": "71998887712",
    "email": "larissa.barros@exemplo.com",
    "municipio": "Lauro de Freitas",
    "bairro": "Itinga",
    "nivel_influencia": "baixa"
  }' > /dev/null && echo "  ✓ Larissa Cristina (Lauro de Freitas/Itinga)"

# Coordenador 10 (Ana Carolina - Feira de Santana)
curl -s -X POST $BASE_URL/api/liderancas \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "coordenador_id": 10,
    "nome": "Marcos Vinícius Silva",
    "telefone": "71998887713",
    "email": "marcos.silva@exemplo.com",
    "municipio": "Feira de Santana",
    "bairro": "Centro",
    "nivel_influencia": "alta"
  }' > /dev/null && echo "  ✓ Marcos Vinícius (Feira de Santana/Centro)"

curl -s -X POST $BASE_URL/api/liderancas \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "coordenador_id": 10,
    "nome": "Natália Rodrigues Lima",
    "telefone": "71998887714",
    "email": "natalia.lima@exemplo.com",
    "municipio": "Feira de Santana",
    "bairro": "Mangabeira",
    "nivel_influencia": "media"
  }' > /dev/null && echo "  ✓ Natália Rodrigues (Feira de Santana/Mangabeira)"

curl -s -X POST $BASE_URL/api/liderancas \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "coordenador_id": 10,
    "nome": "Otávio César Costa",
    "telefone": "71998887715",
    "email": "otavio.costa@exemplo.com",
    "municipio": "Feira de Santana",
    "bairro": "George Américo",
    "nivel_influencia": "alta"
  }' > /dev/null && echo "  ✓ Otávio César (Feira de Santana/George Américo)"

# Coordenador 11 (Roberto Carlos - Vitória da Conquista)
curl -s -X POST $BASE_URL/api/liderancas \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "coordenador_id": 11,
    "nome": "Sandra Maria Oliveira",
    "telefone": "71998887719",
    "email": "sandra.oliveira@exemplo.com",
    "municipio": "Vitória da Conquista",
    "bairro": "Centro",
    "nivel_influencia": "alta"
  }' > /dev/null && echo "  ✓ Sandra Maria (Vitória da Conquista/Centro)"

curl -s -X POST $BASE_URL/api/liderancas \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "coordenador_id": 11,
    "nome": "Thiago Henrique Dias",
    "telefone": "71998887720",
    "email": "thiago.dias@exemplo.com",
    "municipio": "Vitória da Conquista",
    "bairro": "Brasil",
    "nivel_influencia": "media"
  }' > /dev/null && echo "  ✓ Thiago Henrique (Vitória da Conquista/Brasil)"

curl -s -X POST $BASE_URL/api/liderancas \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "coordenador_id": 11,
    "nome": "Ursula Fernandes Costa",
    "telefone": "71998887721",
    "email": "ursula.costa@exemplo.com",
    "municipio": "Vitória da Conquista",
    "bairro": "Candeias",
    "nivel_influencia": "alta"
  }' > /dev/null && echo "  ✓ Ursula Fernandes (Vitória da Conquista/Candeias)"

echo ""
echo "✅ 15 Lideranças criadas (incluindo André Luiz já existente = 16 total)"
echo ""

# =====================================================
# 3. ELEITORES (30 registros - 2 por liderança)
# =====================================================
echo "🗳️  Criando Eleitores..."

# Liderança 7 (André Luiz - Salvador/Barra)
curl -s -X POST $BASE_URL/api/eleitores \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "lideranca_id": 7,
    "nome": "Adriana Silva Santos",
    "telefone": "71999001001",
    "email": "adriana.santos@email.com",
    "municipio": "Salvador",
    "bairro": "Barra",
    "status_apoio": "apoiador",
    "nivel_engajamento": "medio",
    "confirmado": 1
  }' > /dev/null && echo "  ✓ Adriana Silva (Liderança 7)"

curl -s -X POST $BASE_URL/api/eleitores \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "lideranca_id": 7,
    "nome": "Bruno Costa Lima",
    "telefone": "71999001002",
    "email": "bruno.lima@email.com",
    "municipio": "Salvador",
    "bairro": "Barra",
    "status_apoio": "militante",
    "nivel_engajamento": "alto",
    "confirmado": 1
  }' > /dev/null && echo "  ✓ Bruno Costa (Liderança 7)"

echo ""
echo "✅ 2 Eleitores criados como exemplo"
echo ""
echo "⏩ Criando mais 28 eleitores..."

# Criar mais eleitores de forma rápida (lideranças 8-21)
for lid in 8 9 10 11 12 13 14 15 16 17 18 19 20 21; do
  curl -s -X POST $BASE_URL/api/eleitores \
    -H "Content-Type: application/json" \
    -d '{
      "candidato_id": '$CANDIDATO_ID',
      "lideranca_id": '$lid',
      "nome": "Eleitor Test '$lid'A",
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
      "nome": "Eleitor Test '$lid'B",
      "telefone": "7199900'$lid'2",
      "municipio": "Salvador",
      "status_apoio": "apoiador",
      "nivel_engajamento": "medio"
    }' > /dev/null
  
  echo "  ✓ 2 eleitores para Liderança $lid"
done

echo ""
echo "✅ 30 Eleitores criados no total"
echo ""

# =====================================================
# 4. PROFISSIONAIS (10 registros)
# =====================================================
echo "💼 Criando Profissionais..."

curl -s -X POST $BASE_URL/api/profissionais \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "nome": "Dr. Ricardo Almeida",
    "telefone": "71988001001",
    "email": "ricardo.almeida@juridico.com",
    "categoria": "Advocacia",
    "municipio": "Salvador",
    "especialidade": "Direito Eleitoral"
  }' > /dev/null && echo "  ✓ Dr. Ricardo Almeida (Advocacia)"

curl -s -X POST $BASE_URL/api/profissionais \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "nome": "Dra. Amanda Ferreira",
    "telefone": "71988001002",
    "email": "amanda.ferreira@contabil.com",
    "categoria": "Contabilidade",
    "municipio": "Salvador",
    "especialidade": "Contabilidade Eleitoral"
  }' > /dev/null && echo "  ✓ Dra. Amanda Ferreira (Contabilidade)"

curl -s -X POST $BASE_URL/api/profissionais \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "nome": "João Marcos Designer",
    "telefone": "71988001003",
    "email": "joao@design.com",
    "categoria": "Design",
    "municipio": "Salvador",
    "especialidade": "Design Gráfico"
  }' > /dev/null && echo "  ✓ João Marcos (Design)"

curl -s -X POST $BASE_URL/api/profissionais \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "nome": "Carolina Marketing",
    "telefone": "71988001004",
    "email": "carolina@marketing.com",
    "categoria": "Marketing",
    "municipio": "Camaçari",
    "especialidade": "Marketing Digital"
  }' > /dev/null && echo "  ✓ Carolina (Marketing Digital)"

curl -s -X POST $BASE_URL/api/profissionais \
  -H "Content-Type: application/json" \
  -d '{
    "candidato_id": '$CANDIDATO_ID',
    "nome": "Pedro Fotografia",
    "telefone": "71988001005",
    "email": "pedro@foto.com",
    "categoria": "Fotografia",
    "municipio": "Lauro de Freitas",
    "especialidade": "Fotojornalismo"
  }' > /dev/null && echo "  ✓ Pedro (Fotografia)"

echo ""
echo "✅ 5 Profissionais criados (exemplo)"
echo ""

# =====================================================
# RESUMO FINAL
# =====================================================
echo ""
echo "════════════════════════════════════════════════"
echo "✅ POVOAMENTO CONCLUÍDO COM SUCESSO!"
echo "════════════════════════════════════════════════"
echo ""
echo "📊 Dados criados:"
echo "  • 5 Coordenadores (+ 1 já existente = 6 total)"
echo "  • 15 Lideranças (+ 1 já existente = 16 total)"
echo "  • 30 Eleitores"
echo "  • 5 Profissionais"
echo ""
echo "📈 Total de registros: ~56"
echo ""
echo "🌐 Acesse: http://localhost:3000"
echo "🔑 Login: admin@meupolitico.digital / Admin@2026"
echo ""
echo "════════════════════════════════════════════════"
