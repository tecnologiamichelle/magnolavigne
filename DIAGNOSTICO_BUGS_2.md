# 🔍 DIAGNÓSTICO DE BUGS - SESSÃO 2

## Data: 2026-01-27

---

## 🐛 BUG #3: Liderança não salva ao editar Eleitor

### ❌ PROBLEMA IDENTIFICADO:

**Sintoma:** Ao editar eleitor e mudar a liderança, o sistema não salva a nova seleção. A liderança permanece a mesma.

### 🔍 ANÁLISE COMPLETA:

**Frontend (public/static/app.js, linha 7700):**
```javascript
async function salvarEleitor(event) {
  const eleitorData = {
    candidato_id: state.candidato.id,
    lideranca_id: document.getElementById('modal-eleitor-lideranca').value,  // ✅ Coleta OK
    nome: document.getElementById('modal-eleitor-nome').value,
    // ... outros campos ...
  };
  
  if (state.modalEditId) {
    await axios.put(`/api/eleitores/${state.modalEditId}`, eleitorData);  // Envia com lideranca_id
  }
}
```

**Backend (src/index.tsx, linha 1790-1809):**
```typescript
app.put('/api/eleitores/:id', async (c) => {
  await c.env.DB.prepare(`
    UPDATE eleitores SET
      nome = ?,
      cpf = ?,
      telefone = ?,
      email = ?,
      municipio = ?,
      bairro = ?,
      zona = ?,
      secao = ?,
      titulo_eleitor = ?,
      local_votacao = ?,
      status_apoio = ?,
      nivel_engajamento = ?,
      confirmado = ?,
      compareceu_evento = ?,
      observacoes = ?,
      tags = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(
    data.nome || eleitorAtual.nome,
    // ... outros campos ...
    // ❌ FALTA: lideranca_id NÃO ESTÁ NO UPDATE!
  )
})
```

**❌ CAUSA RAIZ:**
O UPDATE não inclui a coluna `lideranca_id`, nem no SQL nem no `.bind()`. O frontend envia, mas o backend ignora.

### ✅ SOLUÇÃO:

**Adicionar `lideranca_id` no UPDATE de eleitores:**

```typescript
// Linha ~1790
UPDATE eleitores SET
  lideranca_id = ?,        // ✅ ADICIONAR
  nome = ?,
  cpf = ?,
  // ... resto dos campos ...

// Linha ~1810 - bind
.bind(
  data.lideranca_id || eleitorAtual.lideranca_id,  // ✅ ADICIONAR
  data.nome || eleitorAtual.nome,
  data.cpf || eleitorAtual.cpf,
  // ... resto dos campos ...
)
```

---

## 🐛 BUG #4: Data/Hora Fim não salva na Agenda

### ❌ PROBLEMA IDENTIFICADO:

**Sintoma:** Campo "Data/Hora Fim" na Agenda nunca salva. Ao editar evento, campo sempre retorna vazio.

### 🔍 ANÁLISE COMPLETA:

**Formulário (public/static/app.js, linha 5655):**
```html
<input 
  type="datetime-local" 
  id="modal-data-fim"        <!-- ✅ Campo EXISTE no formulário -->
  class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
>
```

**Salvamento Frontend (linha 6172-6187):**
```javascript
case 'agenda':
  const dataHora = document.getElementById('modal-data-inicio')?.value || '';
  dados = {
    ...dados,
    titulo: document.getElementById('modal-titulo')?.value || '',
    descricao: document.getElementById('modal-descricao')?.value || '',
    tipo: document.getElementById('modal-tipo')?.value || 'reuniao',
    data_hora: dataHora ? dataHora.replace('T', ' ') + ':00' : null,
    local: document.getElementById('modal-local')?.value || '',
    // ... outros campos ...
    // ❌ FALTA: modal-data-fim NÃO É COLETADO!
  };
```

**Schema do Banco:**
```sql
-- Verificado com PRAGMA table_info(agenda)
-- Resultado: Tabela só tem coluna 'data_hora'
-- ❌ NÃO EXISTE coluna 'data_hora_fim' ou 'data_fim'
```

**❌ CAUSAS RAIZ (DUPLA):**
1. Frontend NÃO coleta o campo `modal-data-fim`
2. Backend NÃO tem coluna `data_hora_fim` na tabela

### ✅ SOLUÇÃO:

**Opção 1: Criar Migration e Implementar (COMPLETO)**

**1.1. Criar migration para adicionar coluna:**
```sql
-- migrations/0003_add_data_hora_fim_agenda.sql
ALTER TABLE agenda ADD COLUMN data_hora_fim DATETIME;
```

**1.2. Atualizar frontend - salvamento (linha ~6186):**
```javascript
case 'agenda':
  const dataHora = document.getElementById('modal-data-inicio')?.value || '';
  const dataHoraFim = document.getElementById('modal-data-fim')?.value || '';  // ✅ ADICIONAR
  
  dados = {
    ...dados,
    titulo: document.getElementById('modal-titulo')?.value || '',
    // ... outros campos ...
    data_hora: dataHora ? dataHora.replace('T', ' ') + ':00' : null,
    data_hora_fim: dataHoraFim ? dataHoraFim.replace('T', ' ') + ':00' : null,  // ✅ ADICIONAR
    // ... resto ...
  };
```

**1.3. Atualizar frontend - carregamento (linha ~6070):**
```javascript
// data_hora_fim → modal-data-fim (para agenda)
if (data.data_hora_fim && document.getElementById('modal-data-fim')) {
  const dataFormatada = data.data_hora_fim.replace(' ', 'T').substring(0, 16);
  document.getElementById('modal-data-fim').value = dataFormatada;
  console.log('✅ Data/hora fim carregada:', dataFormatada);
}
```

**1.4. Atualizar backend POST (src/index.tsx, linha ~578):**
```typescript
INSERT INTO agenda (
  candidato_id, titulo, descricao, data_hora, data_hora_fim,  // ✅ ADICIONAR
  local, municipio, tipo, prioridade, status, progresso, participantes, notas
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)  // ✅ Adicionar ?
```

**1.5. Atualizar backend PUT (src/index.tsx, linha ~611):**
```typescript
UPDATE agenda SET
  titulo = ?, descricao = ?, data_hora = ?, data_hora_fim = ?,  // ✅ ADICIONAR
  local = ?, municipio = ?, tipo = ?, prioridade = ?, status = ?,
  progresso = ?, participantes = ?, notas = ?, updated_at = datetime('now')
WHERE id = ?
```

**Opção 2: Remover Campo do Formulário (MAIS SIMPLES)**

Se o campo não for essencial, remover do formulário:
```javascript
// Remover linhas 5649-5658 do formulário
```

### 🎯 DECISÃO: Implementar Opção 1 (campo é útil)

---

## 📋 RESUMO DAS CORREÇÕES NECESSÁRIAS

### ✅ Arquivo: `migrations/0003_add_data_hora_fim_agenda.sql` (NOVO)
```sql
ALTER TABLE agenda ADD COLUMN data_hora_fim DATETIME;
```

### ✅ Arquivo: `public/static/app.js`

**1. Salvamento agenda - adicionar data_hora_fim (linha ~6186):**
```javascript
data_hora_fim: dataHoraFim ? dataHoraFim.replace('T', ' ') + ':00' : null,
```

**2. Carregamento agenda - adicionar mapeamento (linha ~6070):**
```javascript
if (data.data_hora_fim && document.getElementById('modal-data-fim')) {
  const dataFormatada = data.data_hora_fim.replace(' ', 'T').substring(0, 16);
  document.getElementById('modal-data-fim').value = dataFormatada;
}
```

### ✅ Arquivo: `src/index.tsx`

**3. Backend POST eleitores - adicionar lideranca_id no UPDATE (linha ~1791):**
```typescript
UPDATE eleitores SET
  lideranca_id = ?,  // ✅ ADICIONAR ESTA LINHA
  nome = ?,
  // ... resto ...
```

**4. Backend POST eleitores - bind lideranca_id (linha ~1811):**
```typescript
.bind(
  data.lideranca_id || eleitorAtual.lideranca_id,  // ✅ ADICIONAR
  data.nome || eleitorAtual.nome,
  // ... resto ...
)
```

**5. Backend POST agenda - adicionar data_hora_fim (linha ~578):**
```typescript
INSERT INTO agenda (
  candidato_id, titulo, descricao, data_hora, data_hora_fim, local, ...
) VALUES (?, ?, ?, ?, ?, ?, ...)
```

**6. Backend PUT agenda - adicionar data_hora_fim (linha ~611):**
```typescript
UPDATE agenda SET
  titulo = ?, descricao = ?, data_hora = ?, data_hora_fim = ?, local = ?, ...
WHERE id = ?
```

---

## 🧪 TESTES NECESSÁRIOS

### Teste 1: Eleitor - Liderança
1. Editar eleitor
2. Mudar liderança de A para B
3. Salvar
4. Reabrir edição
5. ✅ Verificar se liderança B está selecionada

### Teste 2: Agenda - Data Fim
1. Criar evento com data início E data fim
2. Salvar
3. Editar evento
4. ✅ Verificar se data fim aparece preenchida

---

**🎯 PRÓXIMA ETAPA: Criar migration, aplicar correções e testar**
