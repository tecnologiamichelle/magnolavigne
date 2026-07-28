# 🔍 DIAGNÓSTICO DE BUGS

## Data: 2026-01-27

---

## 🐛 BUG #1: Horário Vazio ao Editar Agenda

### ❌ PROBLEMA IDENTIFICADO:

**Sintoma:** Ao editar atividade na Agenda, o campo de horário retorna vazio.

### 🔍 ANÁLISE:

**Banco de dados retorna:** `data_hora` (formato: "2024-01-15 14:30:00")
**Campo no formulário:** `modal-data-inicio` (type: datetime-local)

**Mapeamento automático na linha 5985:**
```javascript
Object.keys(data).forEach(key => {
  const input = document.getElementById(`modal-${key.replace(/_/g, '-')}`);
  // Converte data_hora → modal-data-hora
  // MAS o campo é modal-data-inicio!
});
```

**Conversão esperada:**
- `data_hora` → `modal-data-hora` (NÃO EXISTE)
- Campo real: `modal-data-inicio` (NÃO CARREGA)

**Formato do banco:** `"2024-01-15 14:30:00"` (SQL datetime)
**Formato do input datetime-local:** `"2024-01-15T14:30"` (ISO 8601)

### ✅ SOLUÇÃO:

**Adicionar mapeamento especial na função `carregarDadosModal` (após linha 6065):**

```javascript
// AGENDA - data_hora → modal-data-inicio
if (data.data_hora && document.getElementById('modal-data-inicio')) {
  // Converter formato SQL para datetime-local
  // "2024-01-15 14:30:00" → "2024-01-15T14:30"
  const dataFormatada = data.data_hora.replace(' ', 'T').substring(0, 16);
  document.getElementById('modal-data-inicio').value = dataFormatada;
  console.log('✅ Data/hora carregada:', dataFormatada);
}
```

---

## 🐛 BUG #2: Eleitor Duplica ao Editar

### ❌ PROBLEMA IDENTIFICADO:

**Sintoma:** Ao editar um eleitor existente, o sistema cria um novo cadastro (duplicação).

### 🔍 ANÁLISE:

**Função `abrirModalEleitor` (linha 7298):**
```javascript
function abrirModalEleitor(eleitorId = null) {
  // ...busca o eleitor...
  if (eleitorId) {
    eleitor = state.data.eleitores.find(e => e.id == eleitorId);
    // ❌ FALTA: state.modalEditId = eleitorId;
  }
  // ...renderiza modal...
}
```

**Função `salvarEleitor` (linha 7680):**
```javascript
async function salvarEleitor(event) {
  // ...coleta dados...
  
  if (state.modalEditId) {
    // PUT - atualizar
    await axios.put(`/api/eleitores/${state.modalEditId}`, eleitorData);
  } else {
    // POST - criar novo (SEMPRE CAI AQUI!)
    await axios.post('/api/eleitores', eleitorData);
  }
}
```

**Problema:** `state.modalEditId` nunca é definido, então sempre faz POST (criar novo).

### ✅ SOLUÇÃO:

**Adicionar na função `abrirModalEleitor` (após linha 7327):**

```javascript
function abrirModalEleitor(eleitorId = null) {
  // ... código existente ...
  
  // Buscar dados se for edição
  let eleitor = null;
  if (eleitorId) {
    console.log('🔵 Buscando eleitor ID:', eleitorId);
    eleitor = state.data.eleitores.find(e => e.id == eleitorId);
    if (!eleitor) {
      console.error('❌ Eleitor não encontrado no state!');
      alert('Eleitor não encontrado!');
      return;
    }
    console.log('✅ Eleitor encontrado:', eleitor);
    
    // ✅ ADICIONAR ESTA LINHA:
    state.modalEditId = eleitorId;
    
  } else {
    console.log('🆕 Modo criação - sem ID');
    
    // ✅ ADICIONAR ESTA LINHA:
    state.modalEditId = null;
  }
  
  // ... restante do código ...
}
```

**Também limpar ao fechar modal (verificar função `fecharModal`):**
```javascript
function fecharModal() {
  // ... código existente ...
  state.modalEditId = null;  // ✅ Limpar ao fechar
  state.modalAtivo = null;
}
```

---

## 📋 RESUMO DAS CORREÇÕES NECESSÁRIAS

### ✅ Arquivo: `public/static/app.js`

**1. Adicionar mapeamento de data_hora (linha ~6065):**
```javascript
// AGENDA - data_hora → modal-data-inicio
if (data.data_hora && document.getElementById('modal-data-inicio')) {
  const dataFormatada = data.data_hora.replace(' ', 'T').substring(0, 16);
  document.getElementById('modal-data-inicio').value = dataFormatada;
  console.log('✅ Data/hora carregada:', dataFormatada);
}
```

**2. Definir state.modalEditId na função abrirModalEleitor (linha ~7327):**
```javascript
if (eleitorId) {
  // ... código existente ...
  state.modalEditId = eleitorId;  // ✅ ADICIONAR
} else {
  state.modalEditId = null;       // ✅ ADICIONAR
}
```

---

## 🧪 TESTES NECESSÁRIOS

### Teste 1: Agenda - Editar Horário
1. Criar evento com data/hora
2. Editar evento
3. ✅ Verificar se campo data/hora aparece preenchido

### Teste 2: Eleitor - Edição sem Duplicar
1. Criar eleitor
2. Editar eleitor existente
3. Mudar nome
4. Salvar
5. ✅ Verificar se NÃO criou novo eleitor
6. ✅ Verificar se atualizou o existente

---

**🎯 PRÓXIMA ETAPA: Aplicar correções e testar**
