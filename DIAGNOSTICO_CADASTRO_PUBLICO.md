# 🔍 DIAGNÓSTICO - Cadastro Público de Eleitor

## Data: 2026-01-27

---

## 🐛 PROBLEMAS IDENTIFICADOS

### ❌ PROBLEMA #1: Função `mascaraTelefone` não existe

**Erro no Console:**
```
Uncaught ReferenceError: mascaraTelefone is not defined
    at HTMLInputElement.onkeyup ((index):1:1)
```

**Localização:** `public/static/app.js`, linha 9980

**Código Problemático:**
```html
<input 
  type="tel" 
  id="eleitor-telefone"
  required
  onkeyup="mascaraTelefone(this)"  <!-- ❌ Função não existe -->
>
```

**Causa:**
- O formulário chama `mascaraTelefone(this)` no evento `onkeyup`
- A função `mascaraTelefone` **não foi definida** em nenhum lugar do código
- Isso impede o formulário de funcionar corretamente

---

### ❌ PROBLEMA #2: Cadastro vai direto para tabela `eleitores` (não para aprovação)

**Localização:** `public/static/app.js`, linha 10105

**Código Problemático:**
```javascript
async function submitEleitorPublicForm(e) {
  e.preventDefault();
  
  try {
    const dados = {
      candidato_id: 1,
      nome: document.getElementById('eleitor-nome').value,
      telefone: document.getElementById('eleitor-telefone').value.replace(/\D/g, ''),
      email: document.getElementById('eleitor-email').value || null,
      municipio: document.getElementById('eleitor-municipio').value,
      bairro: document.getElementById('eleitor-bairro').value || null,
      zona: document.getElementById('eleitor-zona').value || null,
      observacoes: document.getElementById('eleitor-observacoes').value || null,
      status_apoio: 'simpatizante',
      nivel_engajamento: 'baixo'
    };
    
    // ❌ PROBLEMA: Envia direto para /api/eleitores (cria eleitor imediatamente)
    const response = await axios.post('/api/eleitores', dados);
    
    // Deveria enviar para /api/solicitacoes (espera aprovação)
  }
}
```

**Causa:**
- Formulário público envia para `/api/eleitores` (criação direta)
- **Deveria** enviar para `/api/solicitacoes` (aguardar aprovação)
- Isso faz com que eleitores sejam criados automaticamente, sem passar pelo painel de aprovação

---

## ✅ SOLUÇÕES NECESSÁRIAS

### 🔧 Solução #1: Criar função `mascaraTelefone`

**Adicionar função global (linha ~10000):**

```javascript
// Função para máscara de telefone
function mascaraTelefone(input) {
  let value = input.value.replace(/\D/g, '');
  if (value.length <= 10) {
    // Formato: (00) 0000-0000
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    // Formato: (00) 00000-0000
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
  }
  input.value = value;
}
```

---

### 🔧 Solução #2: Enviar para `/api/solicitacoes` em vez de `/api/eleitores`

**Modificar função `submitEleitorPublicForm` (linha 10088-10115):**

**ANTES:**
```javascript
const dados = {
  candidato_id: 1,
  nome: document.getElementById('eleitor-nome').value,
  telefone: document.getElementById('eleitor-telefone').value.replace(/\D/g, ''),
  // ... outros campos ...
  status_apoio: 'simpatizante',
  nivel_engajamento: 'baixo'
};

const response = await axios.post('/api/eleitores', dados);  // ❌ ERRADO
```

**DEPOIS:**
```javascript
const dados = {
  candidato_id: 1,
  tipo: 'eleitor',  // ✅ Tipo de solicitação
  nome: document.getElementById('eleitor-nome').value,
  telefone: document.getElementById('eleitor-telefone').value.replace(/\D/g, ''),
  email: document.getElementById('eleitor-email').value || null,
  municipio: document.getElementById('eleitor-municipio').value,
  dados: {  // ✅ Dados adicionais em JSON
    bairro: document.getElementById('eleitor-bairro').value || null,
    zona: document.getElementById('eleitor-zona').value || null,
    observacoes: document.getElementById('eleitor-observacoes').value || null,
    status_apoio: 'simpatizante',
    nivel_engajamento: 'baixo'
  }
};

const response = await axios.post('/api/solicitacoes', dados);  // ✅ CORRETO
```

**Mensagem de sucesso atualizada:**
```javascript
if (response.data && response.data.id) {
  document.getElementById('eleitor-public-success-message').textContent = 
    '✅ Solicitação enviada com sucesso! Aguarde a aprovação do candidato.';
  // ... resto ...
}
```

---

## 📋 RESUMO DAS ALTERAÇÕES

### ✅ Arquivo: `public/static/app.js`

**1. Adicionar função `mascaraTelefone` (linha ~10086):**
```javascript
function mascaraTelefone(input) {
  let value = input.value.replace(/\D/g, '');
  if (value.length <= 10) {
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
  }
  input.value = value;
}
```

**2. Modificar `submitEleitorPublicForm` (linha 10088-10120):**
- Mudar estrutura dos dados
- Adicionar `tipo: 'eleitor'`
- Colocar campos extras dentro de `dados: { ... }`
- Mudar endpoint de `/api/eleitores` para `/api/solicitacoes`
- Atualizar mensagem de sucesso

---

## 🧪 TESTES NECESSÁRIOS

### Teste 1: Máscara de Telefone
1. Acessar página inicial (deslogado)
2. Digitar telefone no campo
3. ✅ Verificar se máscara (00) 00000-0000 aplica automaticamente

### Teste 2: Envio para Aprovação
1. Preencher formulário completo
2. Enviar
3. ✅ Verificar mensagem de sucesso com "aguarde aprovação"
4. Logar no painel
5. ✅ Ir em "Solicitações"
6. ✅ Verificar se cadastro aparece como "Pendente"
7. ✅ Aprovar e verificar se cria eleitor

---

**🎯 PRÓXIMA ETAPA: Aplicar correções e testar**
