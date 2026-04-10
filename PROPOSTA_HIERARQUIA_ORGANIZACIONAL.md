# 🏗️ PROPOSTA: HIERARQUIA ORGANIZACIONAL

**Data:** 17/03/2026  
**Versão:** 1.0  
**Status:** 📋 PROPOSTA PARA APROVAÇÃO

---

## 🎯 OBJETIVO

Criar uma **hierarquia organizacional clara** para rastrear e organizar a estrutura da campanha:

```
CANDIDATO
    ↓
COORDENADORES (gerenciam territórios/regiões)
    ↓
LIDERANÇAS (captam eleitores)
    ↓
ELEITORES/DADOS ELEITORAIS (base de apoio)
```

---

## 📊 ESTRUTURA ATUAL vs PROPOSTA

### **ATUAL (Sem Hierarquia)**

**Tabela: liderancas**
```sql
- candidato_id → Candidatos
- nome, telefone, email, municipio
- (SEM referência a coordenador)
```

**Tabela: coordenadores**
```sql
- candidato_id → Candidatos
- nome, telefone, email, municipio
- (SEM referência a lideranças)
```

**Tabela: dados_eleitorais**
```sql
- candidato_id → Candidatos
- municipio, zona, secao
- (SEM referência a liderança que captou)
```

**❌ Problemas:**
- Não sabemos qual coordenador gerencia qual liderança
- Não sabemos qual liderança captou qual eleitor
- Difícil rastrear performance individual
- Impossível gerar relatórios por coordenador/liderança

---

### **PROPOSTA (Com Hierarquia)**

**1. Tabela: coordenadores** (mantém estrutura, adiciona campos)
```sql
CREATE TABLE coordenadores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  telefone TEXT,
  email TEXT,
  municipio TEXT NOT NULL,
  territorio_id INTEGER,                    -- 🆕 Território de atuação
  area_atuacao TEXT,
  qtd_liderancas INTEGER DEFAULT 0,        -- 🆕 Total de lideranças sob gestão
  qtd_eleitores_captados INTEGER DEFAULT 0, -- 🆕 Total de eleitores (soma das lideranças)
  meta_liderancas INTEGER DEFAULT 10,      -- 🆕 Meta de lideranças a gerenciar
  meta_eleitores INTEGER DEFAULT 1000,     -- 🆕 Meta de eleitores
  status TEXT DEFAULT 'ativo',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE,
  FOREIGN KEY (territorio_id) REFERENCES territorios(id) ON DELETE SET NULL
)
```

**2. Tabela: liderancas** (adiciona referência ao coordenador)
```sql
CREATE TABLE liderancas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  coordenador_id INTEGER,                   -- 🆕 FK para coordenadores
  nome TEXT NOT NULL,
  telefone TEXT,
  email TEXT,
  municipio TEXT NOT NULL,
  bairro TEXT,
  zona_eleitoral TEXT,
  territorio_id INTEGER,
  nivel_influencia TEXT DEFAULT 'media',
  qtd_influenciados INTEGER DEFAULT 0,
  qtd_eleitores INTEGER DEFAULT 0,          -- 🆕 Total de eleitores cadastrados
  qtd_eleitores_confirmados INTEGER DEFAULT 0, -- 🆕 Eleitores confirmados/validados
  meta_eleitores INTEGER DEFAULT 100,       -- 🆕 Meta de eleitores a captar
  status TEXT DEFAULT 'ativo',
  observacoes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE,
  FOREIGN KEY (coordenador_id) REFERENCES coordenadores(id) ON DELETE SET NULL, -- 🆕
  FOREIGN KEY (territorio_id) REFERENCES territorios(id) ON DELETE SET NULL
)
```

**3. Tabela: dados_eleitorais** (RENOMEAR para `eleitores` e adicionar hierarquia)
```sql
-- NOVA TABELA: eleitores (substitui dados_eleitorais)
CREATE TABLE eleitores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  lideranca_id INTEGER,                     -- 🆕 FK para lideranças (quem captou)
  coordenador_id INTEGER,                   -- 🆕 FK para coordenadores (hierarquia)
  
  -- Dados Pessoais
  nome TEXT NOT NULL,                       -- 🆕 Nome do eleitor
  cpf TEXT,                                 -- 🆕 CPF (opcional)
  telefone TEXT,                            -- 🆕 Telefone
  email TEXT,                               -- 🆕 Email
  
  -- Localização
  municipio TEXT NOT NULL,
  bairro TEXT,                              -- 🆕
  zona TEXT,
  secao TEXT,
  
  -- Dados Eleitorais
  titulo_eleitor TEXT,                      -- 🆕 Número do título
  local_votacao TEXT,                       -- 🆕
  
  -- Status e Classificação
  status_apoio TEXT DEFAULT 'simpatizante', -- 🆕 simpatizante, apoiador, militante
  nivel_engajamento TEXT DEFAULT 'baixo',   -- 🆕 baixo, medio, alto
  confirmado BOOLEAN DEFAULT 0,             -- 🆕 Eleitor confirmado/validado
  compareceu_evento BOOLEAN DEFAULT 0,      -- 🆕 Já participou de evento
  
  -- Metadados
  observacoes TEXT,
  tags TEXT,                                -- 🆕 Tags separadas por vírgula
  data_captacao DATE DEFAULT (date('now')), -- 🆕 Quando foi cadastrado
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE,
  FOREIGN KEY (lideranca_id) REFERENCES liderancas(id) ON DELETE SET NULL,   -- 🆕
  FOREIGN KEY (coordenador_id) REFERENCES coordenadores(id) ON DELETE SET NULL -- 🆕
)

-- Índices para performance
CREATE INDEX idx_eleitores_lideranca ON eleitores(lideranca_id);
CREATE INDEX idx_eleitores_coordenador ON eleitores(coordenador_id);
CREATE INDEX idx_eleitores_municipio ON eleitores(municipio);
CREATE INDEX idx_eleitores_status ON eleitores(status_apoio);
```

---

## 🔄 FLUXO DE TRABALHO

### **1. Coordenador Cadastra Lideranças**

```
Coordenador (ID: 1, Nome: João Silva)
    ↓
Cadastra Liderança (Maria Santos)
    coordenador_id = 1 ✓
```

### **2. Liderança Cadastra Eleitores**

```
Liderança (ID: 5, Nome: Maria Santos)
    coordenador_id = 1 (João Silva)
    ↓
Cadastra Eleitor (José Oliveira)
    lideranca_id = 5 ✓
    coordenador_id = 1 ✓ (herdado)
```

### **3. Relatórios e Métricas**

**Por Coordenador:**
```sql
SELECT 
  c.nome AS coordenador,
  COUNT(DISTINCT l.id) AS total_liderancas,
  COUNT(DISTINCT e.id) AS total_eleitores,
  c.meta_liderancas,
  c.meta_eleitores,
  ROUND(COUNT(DISTINCT l.id) * 100.0 / c.meta_liderancas, 2) AS percentual_meta_liderancas,
  ROUND(COUNT(DISTINCT e.id) * 100.0 / c.meta_eleitores, 2) AS percentual_meta_eleitores
FROM coordenadores c
LEFT JOIN liderancas l ON c.id = l.coordenador_id
LEFT JOIN eleitores e ON c.id = e.coordenador_id
GROUP BY c.id
```

**Por Liderança:**
```sql
SELECT 
  l.nome AS lideranca,
  c.nome AS coordenador,
  COUNT(e.id) AS total_eleitores,
  l.meta_eleitores,
  ROUND(COUNT(e.id) * 100.0 / l.meta_eleitores, 2) AS percentual_meta
FROM liderancas l
LEFT JOIN coordenadores c ON l.coordenador_id = c.id
LEFT JOIN eleitores e ON l.id = e.lideranca_id
GROUP BY l.id
```

**Ranking de Performance:**
```sql
-- Top Lideranças (mais eleitores captados)
SELECT 
  l.nome,
  COUNT(e.id) AS total_eleitores,
  c.nome AS coordenador
FROM liderancas l
LEFT JOIN eleitores e ON l.id = e.lideranca_id
LEFT JOIN coordenadores c ON l.coordenador_id = c.id
GROUP BY l.id
ORDER BY total_eleitores DESC
LIMIT 10
```

---

## 📈 BENEFÍCIOS DA HIERARQUIA

### **1. Rastreabilidade Total**
- ✅ Saber exatamente quem captou cada eleitor
- ✅ Identificar lideranças mais produtivas
- ✅ Avaliar performance de coordenadores

### **2. Métricas Precisas**
- ✅ Total de eleitores por liderança
- ✅ Total de eleitores por coordenador
- ✅ Taxa de conversão (captação vs confirmação)
- ✅ Comparação com metas

### **3. Gestão Eficiente**
- ✅ Coordenador vê todas as suas lideranças
- ✅ Liderança vê todos os seus eleitores
- ✅ Identificar gargalos e oportunidades

### **4. Relatórios Avançados**
- ✅ Ranking de lideranças
- ✅ Performance por território
- ✅ Crescimento temporal (eleitores/mês)
- ✅ Análise de engajamento

---

## 🎨 MUDANÇAS NA UI

### **1. Formulário de Liderança (Adicionar)**
```html
<select id="coordenador-select" required>
  <option value="">Selecione o Coordenador</option>
  <option value="1">João Silva - Território X</option>
  <option value="2">Maria Santos - Território Y</option>
</select>

<input type="number" id="meta-eleitores" placeholder="Meta de eleitores (ex: 100)" />
```

### **2. Formulário de Eleitor (NOVO - substitui Dados Eleitorais)**
```html
<!-- Hierarquia -->
<select id="lideranca-select" required>
  <option value="">Qual liderança captou este eleitor?</option>
  <option value="5">Maria Santos - Salvador</option>
</select>

<!-- Dados Pessoais -->
<input type="text" id="nome-eleitor" placeholder="Nome completo" required />
<input type="text" id="cpf-eleitor" placeholder="CPF (opcional)" />
<input type="tel" id="telefone-eleitor" placeholder="Telefone" />

<!-- Dados Eleitorais -->
<input type="text" id="titulo-eleitor" placeholder="Título de eleitor" />
<input type="text" id="zona" placeholder="Zona" />
<input type="text" id="secao" placeholder="Seção" />

<!-- Status -->
<select id="status-apoio">
  <option value="simpatizante">Simpatizante</option>
  <option value="apoiador">Apoiador</option>
  <option value="militante">Militante</option>
</select>
```

### **3. Dashboard do Coordenador (NOVO)**
```
┌─────────────────────────────────────────┐
│ Dashboard - João Silva (Coordenador)    │
├─────────────────────────────────────────┤
│ Minhas Lideranças: 8 / 10 (Meta)       │
│ Total de Eleitores: 450 / 1000 (Meta)  │
│ Taxa de Conversão: 85%                  │
│                                         │
│ Top Lideranças:                         │
│ 1. Maria Santos - 120 eleitores        │
│ 2. José Oliveira - 95 eleitores        │
│ 3. Ana Costa - 78 eleitores            │
└─────────────────────────────────────────┘
```

### **4. Dashboard da Liderança (NOVO)**
```
┌─────────────────────────────────────────┐
│ Dashboard - Maria Santos (Liderança)    │
├─────────────────────────────────────────┤
│ Coordenador: João Silva                 │
│ Meus Eleitores: 120 / 100 (Meta)       │
│ Confirmados: 95 (79%)                   │
│ Participaram Eventos: 45 (38%)         │
│                                         │
│ Últimos Cadastros:                      │
│ • José Silva - 15/03/2026              │
│ • Maria Oliveira - 14/03/2026          │
└─────────────────────────────────────────┘
```

---

## 🔄 MIGRAÇÃO DOS DADOS EXISTENTES

### **Migration 0006_hierarquia_organizacional.sql**

```sql
-- 1. Adicionar colunas aos coordenadores
ALTER TABLE coordenadores ADD COLUMN territorio_id INTEGER REFERENCES territorios(id) ON DELETE SET NULL;
ALTER TABLE coordenadores ADD COLUMN qtd_liderancas INTEGER DEFAULT 0;
ALTER TABLE coordenadores ADD COLUMN qtd_eleitores_captados INTEGER DEFAULT 0;
ALTER TABLE coordenadores ADD COLUMN meta_liderancas INTEGER DEFAULT 10;
ALTER TABLE coordenadores ADD COLUMN meta_eleitores INTEGER DEFAULT 1000;

-- 2. Adicionar colunas às lideranças
ALTER TABLE liderancas ADD COLUMN coordenador_id INTEGER REFERENCES coordenadores(id) ON DELETE SET NULL;
ALTER TABLE liderancas ADD COLUMN qtd_eleitores_confirmados INTEGER DEFAULT 0;
ALTER TABLE liderancas ADD COLUMN meta_eleitores INTEGER DEFAULT 100;

-- 3. Criar nova tabela eleitores
CREATE TABLE eleitores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  lideranca_id INTEGER,
  coordenador_id INTEGER,
  nome TEXT NOT NULL,
  cpf TEXT,
  telefone TEXT,
  email TEXT,
  municipio TEXT NOT NULL,
  bairro TEXT,
  zona TEXT,
  secao TEXT,
  titulo_eleitor TEXT,
  local_votacao TEXT,
  status_apoio TEXT DEFAULT 'simpatizante',
  nivel_engajamento TEXT DEFAULT 'baixo',
  confirmado INTEGER DEFAULT 0,
  compareceu_evento INTEGER DEFAULT 0,
  observacoes TEXT,
  tags TEXT,
  data_captacao DATE DEFAULT (date('now')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE,
  FOREIGN KEY (lideranca_id) REFERENCES liderancas(id) ON DELETE SET NULL,
  FOREIGN KEY (coordenador_id) REFERENCES coordenadores(id) ON DELETE SET NULL
);

-- 4. Migrar dados_eleitorais para eleitores (preservar dados existentes)
INSERT INTO eleitores (candidato_id, municipio, zona, secao, observacoes, created_at, updated_at)
SELECT candidato_id, municipio, zona, secao, observacoes, created_at, updated_at
FROM dados_eleitorais;

-- 5. Criar índices
CREATE INDEX idx_eleitores_lideranca ON eleitores(lideranca_id);
CREATE INDEX idx_eleitores_coordenador ON eleitores(coordenador_id);
CREATE INDEX idx_eleitores_municipio ON eleitores(municipio);
CREATE INDEX idx_eleitores_status ON eleitores(status_apoio);
CREATE INDEX idx_liderancas_coordenador ON liderancas(coordenador_id);

-- 6. Criar triggers para atualizar contadores automaticamente
CREATE TRIGGER atualizar_qtd_liderancas_insert
AFTER INSERT ON liderancas
BEGIN
  UPDATE coordenadores 
  SET qtd_liderancas = (SELECT COUNT(*) FROM liderancas WHERE coordenador_id = NEW.coordenador_id)
  WHERE id = NEW.coordenador_id;
END;

CREATE TRIGGER atualizar_qtd_liderancas_delete
AFTER DELETE ON liderancas
BEGIN
  UPDATE coordenadores 
  SET qtd_liderancas = (SELECT COUNT(*) FROM liderancas WHERE coordenador_id = OLD.coordenador_id)
  WHERE id = OLD.coordenador_id;
END;

CREATE TRIGGER atualizar_qtd_eleitores_insert
AFTER INSERT ON eleitores
BEGIN
  UPDATE liderancas 
  SET qtd_eleitores = (SELECT COUNT(*) FROM eleitores WHERE lideranca_id = NEW.lideranca_id)
  WHERE id = NEW.lideranca_id;
  
  UPDATE coordenadores 
  SET qtd_eleitores_captados = (SELECT COUNT(*) FROM eleitores WHERE coordenador_id = NEW.coordenador_id)
  WHERE id = NEW.coordenador_id;
END;

CREATE TRIGGER atualizar_qtd_eleitores_delete
AFTER DELETE ON eleitores
BEGIN
  UPDATE liderancas 
  SET qtd_eleitores = (SELECT COUNT(*) FROM eleitores WHERE lideranca_id = OLD.lideranca_id)
  WHERE id = OLD.lideranca_id;
  
  UPDATE coordenadores 
  SET qtd_eleitores_captados = (SELECT COUNT(*) FROM eleitores WHERE coordenador_id = OLD.coordenador_id)
  WHERE id = OLD.coordenador_id;
END;
```

---

## 📊 VIEWS PARA RELATÓRIOS

```sql
-- View: Performance por Coordenador
CREATE VIEW view_performance_coordenadores AS
SELECT 
  c.id,
  c.nome AS coordenador,
  c.municipio,
  c.territorio_id,
  t.nome AS territorio,
  c.qtd_liderancas,
  c.meta_liderancas,
  ROUND(c.qtd_liderancas * 100.0 / NULLIF(c.meta_liderancas, 0), 2) AS percentual_meta_liderancas,
  c.qtd_eleitores_captados,
  c.meta_eleitores,
  ROUND(c.qtd_eleitores_captados * 100.0 / NULLIF(c.meta_eleitores, 0), 2) AS percentual_meta_eleitores,
  c.status,
  c.created_at
FROM coordenadores c
LEFT JOIN territorios t ON c.territorio_id = t.id;

-- View: Performance por Liderança
CREATE VIEW view_performance_liderancas AS
SELECT 
  l.id,
  l.nome AS lideranca,
  l.municipio,
  l.territorio_id,
  t.nome AS territorio,
  l.coordenador_id,
  c.nome AS coordenador,
  l.qtd_eleitores,
  l.qtd_eleitores_confirmados,
  l.meta_eleitores,
  ROUND(l.qtd_eleitores * 100.0 / NULLIF(l.meta_eleitores, 0), 2) AS percentual_meta,
  ROUND(l.qtd_eleitores_confirmados * 100.0 / NULLIF(l.qtd_eleitores, 0), 2) AS taxa_confirmacao,
  l.nivel_influencia,
  l.status,
  l.created_at
FROM liderancas l
LEFT JOIN coordenadores c ON l.coordenador_id = c.id
LEFT JOIN territorios t ON l.territorio_id = t.id;

-- View: Hierarquia Completa
CREATE VIEW view_hierarquia_completa AS
SELECT 
  e.id AS eleitor_id,
  e.nome AS eleitor,
  e.municipio AS eleitor_municipio,
  e.status_apoio,
  e.nivel_engajamento,
  e.confirmado,
  l.id AS lideranca_id,
  l.nome AS lideranca,
  l.municipio AS lideranca_municipio,
  c.id AS coordenador_id,
  c.nome AS coordenador,
  c.municipio AS coordenador_municipio,
  t.id AS territorio_id,
  t.nome AS territorio
FROM eleitores e
LEFT JOIN liderancas l ON e.lideranca_id = l.id
LEFT JOIN coordenadores c ON e.coordenador_id = c.id
LEFT JOIN territorios t ON l.territorio_id = t.id;
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### **Fase 1: Estrutura (Database)**
- [ ] Criar migration 0006_hierarquia_organizacional.sql
- [ ] Adicionar colunas em coordenadores
- [ ] Adicionar colunas em liderancas
- [ ] Criar tabela eleitores
- [ ] Migrar dados de dados_eleitorais para eleitores
- [ ] Criar índices
- [ ] Criar triggers
- [ ] Criar views de relatórios

### **Fase 2: Backend (API)**
- [ ] Atualizar POST /api/coordenadores (adicionar campos novos)
- [ ] Atualizar POST /api/liderancas (adicionar coordenador_id, meta_eleitores)
- [ ] Criar POST /api/eleitores (substituir dados-eleitorais)
- [ ] Criar GET /api/coordenadores/:id/liderancas
- [ ] Criar GET /api/liderancas/:id/eleitores
- [ ] Criar GET /api/coordenadores/:id/dashboard
- [ ] Criar GET /api/liderancas/:id/dashboard
- [ ] Criar GET /api/relatorios/hierarquia

### **Fase 3: Frontend (UI)**
- [ ] Atualizar formulário de coordenadores (território, metas)
- [ ] Atualizar formulário de lideranças (select coordenador, meta)
- [ ] Criar formulário de eleitores (substituir dados eleitorais)
- [ ] Criar dashboard de coordenador
- [ ] Criar dashboard de liderança
- [ ] Adicionar filtros por coordenador/liderança
- [ ] Criar página de relatórios hierárquicos

### **Fase 4: Testes**
- [ ] Testar cadastro de coordenador
- [ ] Testar cadastro de liderança vinculada
- [ ] Testar cadastro de eleitor vinculado
- [ ] Testar contadores automáticos (triggers)
- [ ] Testar relatórios e dashboards
- [ ] Validar performance com dados reais

---

## 🎯 RESULTADO FINAL

**Com esta hierarquia, você terá:**

1. **Organização Clara:**
   - Candidato → Coordenadores → Lideranças → Eleitores

2. **Rastreabilidade Total:**
   - Saber quem captou cada eleitor
   - Avaliar performance individual e coletiva

3. **Métricas Precisas:**
   - Contadores automáticos (triggers)
   - Dashboards específicos por papel
   - Relatórios detalhados

4. **Gestão Eficiente:**
   - Coordenador gerencia suas lideranças
   - Liderança gerencia seus eleitores
   - Metas e acompanhamento

5. **Dados Ricos:**
   - Status de apoio (simpatizante → militante)
   - Nível de engajamento (baixo → alto)
   - Confirmação e validação
   - Participação em eventos

---

## 📞 PRÓXIMOS PASSOS

**Aguardando aprovação para:**
1. ✅ Criar migration completa
2. ✅ Implementar no backend
3. ✅ Atualizar frontend
4. ✅ Testar em ambiente local
5. ✅ Deploy para produção

**Tempo estimado:** 2-3 horas para implementação completa

---

**Documento criado:** 17/03/2026  
**Autor:** Sistema IA - Claude  
**Status:** 📋 AGUARDANDO APROVAÇÃO
