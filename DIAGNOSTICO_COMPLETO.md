# 🔍 DIAGNÓSTICO COMPLETO - Problemas Identificados

## Data: 2026-01-27

---

## 📋 PROBLEMA 1: Campo "Observações" em Profissionais

### ✅ STATUS: Solicitação do Usuário

**Solicitação:** Adicionar campo "Observações" no formulário de cadastro de Profissionais.

### 🔍 Análise do Schema do Banco de Dados

**Tabela `profissionais` (migrations/0001_schema_inicial.sql, linha 72-85):**
```sql
CREATE TABLE IF NOT EXISTS profissionais (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  profissao TEXT NOT NULL,
  telefone TEXT,
  email TEXT,
  municipio TEXT,
  area_especialidade TEXT,
  status TEXT DEFAULT 'ativo',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
);
```

### ❌ PROBLEMA ENCONTRADO:
A tabela `profissionais` **NÃO possui o campo `observacoes`** no schema do banco de dados!

### ✅ SOLUÇÃO NECESSÁRIA:

**Opção 1: Criar Migration para Adicionar o Campo (RECOMENDADO)**
- Criar arquivo `migrations/0002_add_observacoes_profissionais.sql`
- Adicionar coluna `observacoes TEXT` na tabela
- Aplicar migration no banco local e produção

**Opção 2: Usar Campo Existente**
- Não adicionar o campo (manter como está)
- Explicar ao usuário que precisamos criar migration primeiro

### 🎯 DECISÃO: Vou criar a migration e adicionar o campo corretamente

---

## 📋 PROBLEMA 2: Agenda Não Cadastra Novos Eventos

### ✅ STATUS: Bug Identificado

**Sintoma Relatado:** Não consegue cadastrar novos eventos na agenda.

### 🔍 Análise do Código

#### 1️⃣ **Frontend - Formulário (app.js, linha 5527-5740)**

**Campos do Formulário:**
- ✅ `modal-titulo` (existe)
- ✅ `modal-descricao` (existe)
- ✅ `modal-tipo` (existe)
- ✅ `modal-prioridade` (existe)
- ✅ `modal-data-inicio` (existe) ⚠️ **PROBLEMA AQUI!**
- ✅ `modal-data-fim` (existe, mas não é salvo)
- ✅ `modal-local` (existe)
- ❌ `modal-municipio` (NÃO EXISTE NO FORMULÁRIO!) 🚨 **BUG #1**
- ✅ `modal-participantes` (existe, mas não é salvo no banco)
- ✅ `modal-status` (existe)
- ✅ `modal-progresso` (existe)
- ❌ `modal-observacoes` (existe no formulário, mas NÃO É SALVO!) 🚨 **BUG #2**

#### 2️⃣ **Frontend - Salvamento (app.js, linha 6121-6137)**

```javascript
case 'agenda':
  endpoint = state.modalEditId ? `/api/agenda/${state.modalEditId}` : '/api/agenda';
  const dataHora = document.getElementById('modal-data-hora')?.value || 
                  document.getElementById('modal-data-inicio')?.value || '';
  dados = {
    ...dados,
    titulo: document.getElementById('modal-titulo')?.value || '',
    descricao: document.getElementById('modal-descricao')?.value || '',
    tipo: document.getElementById('modal-tipo')?.value || 'reuniao',
    data_hora: dataHora ? dataHora.replace('T', ' ') + ':00' : null,
    local: document.getElementById('modal-local')?.value || '',
    municipio: document.getElementById('modal-municipio')?.value || '',  // ❌ Campo não existe!
    prioridade: document.getElementById('modal-prioridade')?.value || 'media',
    status: document.getElementById('modal-status')?.value || 'pendente',
    progresso: parseInt(document.getElementById('modal-progresso')?.value || '0')
  };
  break;
```

**🚨 PROBLEMAS IDENTIFICADOS:**

1. **Campo `modal-municipio` não existe no formulário**
   - O código tenta ler `modal-municipio`, mas o campo não foi criado
   - Isso pode causar valor `undefined` ou `''`

2. **Campo `modal-observacoes` não é salvo**
   - O formulário tem o campo, mas não está no objeto `dados`
   - Observações são perdidas ao salvar

3. **Campo `modal-participantes` não é salvo**
   - O formulário tem o campo, mas não existe no schema do banco
   - Dado é ignorado

#### 3️⃣ **Backend - Schema do Banco (migrations/0001_schema_inicial.sql, linha 93-107)**

```sql
CREATE TABLE IF NOT EXISTS agenda (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  data_hora DATETIME NOT NULL,
  local TEXT,
  municipio TEXT,                    -- ✅ Existe no schema
  tipo TEXT DEFAULT 'reuniao',
  prioridade TEXT DEFAULT 'media',
  status TEXT DEFAULT 'pendente',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
);
```

**🔍 CAMPOS NO SCHEMA:**
- ✅ `municipio` - existe no banco
- ❌ `observacoes` - **NÃO existe no banco!**
- ❌ `participantes` - **NÃO existe no banco!**
- ❌ `progresso` - **PARECE NÃO EXISTIR NO BANCO!** 🚨

**⚠️ ATENÇÃO:** O código tenta salvar `progresso`, mas não vejo no CREATE TABLE!

#### 4️⃣ **Backend - API POST (src/index.tsx, linha 572-596)**

```typescript
app.post('/api/agenda', async (c) => {
  try {
    const data = await c.req.json()
    
    const result = await c.env.DB.prepare(`
      INSERT INTO agenda (
        candidato_id, titulo, descricao, data_hora, local, municipio, tipo, prioridade, status, progresso
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.candidato_id,
      data.titulo,
      data.descricao || null,
      data.data_hora,
      data.local || null,
      data.municipio || null,
      data.tipo || 'reuniao',
      data.prioridade || 'media',
      data.status || 'pendente',
      data.progresso || 0
    ).run()
```

**🚨 PROBLEMA CRÍTICO IDENTIFICADO:**

O backend está tentando inserir na coluna `progresso`, mas **essa coluna NÃO existe no schema do banco de dados!**

Isso causaria um erro SQL do tipo:
```
Error: no such column: progresso
```

---

## 🎯 SOLUÇÕES NECESSÁRIAS

### PARA PROFISSIONAIS:

1. ✅ Criar migration para adicionar `observacoes TEXT`
2. ✅ Adicionar campo no formulário (linha ~5505)
3. ✅ Adicionar salvamento no `salvarModal` para profissionais
4. ✅ Adicionar carregamento no `carregarDadosModal`
5. ✅ Atualizar backend para aceitar `observacoes`

### PARA AGENDA:

1. ✅ Adicionar campo `modal-municipio` no formulário
2. ✅ Criar migration para adicionar colunas: `observacoes TEXT`, `participantes TEXT`, `progresso INTEGER DEFAULT 0`
3. ✅ Garantir que o salvamento inclui `observacoes`
4. ✅ Atualizar backend se necessário
5. ✅ Aplicar migrations no banco local e produção

---

## 📝 ARQUIVOS QUE SERÃO MODIFICADOS

1. **migrations/0002_add_missing_columns.sql** (NOVO)
2. **public/static/app.js** (modificar)
   - Adicionar campo municipio na agenda
   - Adicionar campo observacoes nos profissionais
   - Ajustar salvamento
3. **src/index.tsx** (verificar se precisa ajuste)

---

## ⚠️ ORDEM DE EXECUÇÃO

1. ✅ Criar migrations
2. ✅ Aplicar migrations no banco local (`npm run db:migrate:local`)
3. ✅ Modificar frontend (app.js)
4. ✅ Modificar backend se necessário (index.tsx)
5. ✅ Testar localmente
6. ✅ Fazer commit
7. ✅ Rebuild e reiniciar PM2
8. ✅ Testar novamente
9. ✅ Deploy para produção
10. ✅ Aplicar migrations na produção (`npm run db:migrate:prod`)
11. ✅ Fazer backup do projeto

---

**🔍 DIAGNÓSTICO CONCLUÍDO**

**Próximos passos:** Aplicar as correções identificadas.
