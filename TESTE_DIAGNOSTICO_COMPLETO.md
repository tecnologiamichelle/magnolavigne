# 🔍 TESTE DIAGNÓSTICO COMPLETO - 3 PROBLEMAS

## ✅ CORREÇÕES APLICADAS

### 1. **Race Condition em render()**
- Adicionado flag `isRendering` para prevenir múltiplas chamadas simultâneas
- Logs detalhados com stack trace quando `state.candidato` for null

### 2. **Validação de Campos Obrigatórios**
- **Coordenadores**: `nome` (mín. 3 caracteres) e `municipio` são obrigatórios
- **Profissionais**: `nome` (mín. 3 caracteres) e `profissao` são obrigatórios
- Sistema agora valida ANTES de enviar ao backend

### 3. **Logs Detalhados em salvarModal()**
- Rastreamento de `state.candidato` em cada etapa
- Logs de dados coletados, resposta do backend
- Rastreamento antes/depois de `loadAllData()` e `render()`

---

## 📋 INSTRUÇÕES DE TESTE

### **Acesse o sistema:**
👉 https://3000-i0j6zosvt5syflvs9b10d-cc2fbc16.sandbox.novita.ai

### **Preparação:**
1. Abra o Console do navegador (F12 → Console)
2. Execute: `console.clear()` para limpar logs antigos
3. Faça login no sistema

---

## 🧪 TESTE 1: LIDERANÇAS (Problema: Retorna para login)

### **Passos:**
1. No Console, execute: `console.log('🧪 TESTE 1: LIDERANÇAS - INICIANDO')`
2. Navegue para **Lideranças**
3. Clique em **Editar** em qualquer liderança
4. Preencha o formulário (TODOS os campos obrigatórios)
5. Clique em **Salvar**
6. **IMEDIATAMENTE copie TODOS os logs do console** (Ctrl+A no Console, Ctrl+C)

### **Logs Esperados:**
```javascript
🧪 TESTE 1: LIDERANÇAS - INICIANDO
🔵 submitLiderancaForm iniciada
🔵 state.candidato: {id: 1, nome: "...", email: "..."}
🔵 formData coletado: {nome: "...", telefone: "...", ...}
🔵 Iniciando salvamento...
🟢 addLideranca iniciada
🟢 state.candidato: {id: 1, ...}
🟢 Modo EDIÇÃO - ID: X
🟢 Resposta PUT: {id: X, ...}
🟢 state.candidato ANTES loadAllData: {id: 1, ...}
📊 Carregando dashboard...
📋 Carregando solicitações...
👥 Carregando lideranças...
✅ Lideranças carregadas: X
🟢 state.candidato DEPOIS loadAllData: {id: 1, ...} ✅ OU null ❌
🔴 render() chamada, state.candidato: {id: 1, ...} ✅ OU null ❌
```

### **Resultados Possíveis:**

#### ✅ **CENÁRIO 1: Tudo funcionou**
```javascript
🟢 state.candidato DEPOIS loadAllData: {id: 1, ...}
🔴 render() chamada, state.candidato: {id: 1, ...}
🔴 ✅ state.candidato OK - mostrando dashboard
```
👉 **Liderança foi salva e permaneceu na tela**

#### ❌ **CENÁRIO 2: Perdeu sessão em loadAllData**
```javascript
🟢 state.candidato ANTES loadAllData: {id: 1, ...}
[logs de carregamento]
🟢 state.candidato DEPOIS loadAllData: null ❌
🔴 render() chamada, state.candidato: null
🔴 ❌ state.candidato é NULL - mostrando tela de login
```
👉 **Sessão perdida durante loadAllData()**

#### ❌ **CENÁRIO 3: Perdeu sessão ANTES de salvar**
```javascript
🔵 submitLiderancaForm iniciada
🔵 state.candidato: null ❌
❌ Sessão expirada. Faça login novamente.
```
👉 **Sessão perdida antes de salvar**

---

## 🧪 TESTE 2: COORDENADORES (Problema: Dados não salvam)

### **Passos:**
1. No Console, execute: `console.log('🧪 TESTE 2: COORDENADORES - INICIANDO')`
2. Navegue para **Coordenadores**
3. Clique em **Editar** em qualquer coordenador
4. **VERIFIQUE** se o modal carrega com os dados preenchidos
5. Modifique algum campo (ex: telefone, email)
6. Clique em **Salvar**
7. **IMEDIATAMENTE copie TODOS os logs do console**

### **Logs Esperados:**
```javascript
🧪 TESTE 2: COORDENADORES - INICIANDO
📝 Editando coordenador: {id: X, nome: "...", ...}
📝 Carregando dados no modal: {id: X, nome: "...", ...}
✅ Dados carregados no modal
🟣 salvarModal iniciada
🟣 state.candidato: {id: 1, ...}
🟣 state.modalAtivo: coordenador
🟣 state.modalEditId: X
🟣 Dados COORDENADOR coletados: {candidato_id: 1, nome: "...", municipio: "...", ...}
🟣 Fazendo requisição: PUT /api/coordenadores/X
🟣 Payload: {candidato_id: 1, nome: "...", ...}
🟣 Resposta recebida: {id: X, ...}
🟣 Salvamento bem-sucedido, fechando modal...
✅ Salvo com sucesso!
```

### **Possíveis Problemas:**

#### ❌ **Campos obrigatórios faltando:**
```javascript
❌ Nome é obrigatório (mínimo 3 caracteres)!
```
OU
```javascript
❌ Município é obrigatório!
```
👉 **Preencha os campos obrigatórios**

#### ❌ **Modal não carrega dados:**
```javascript
📝 Editando coordenador: {id: X, nome: "...", ...}
📝 Carregando dados no modal: {id: X, nome: "...", ...}
❌ Dados carregados no modal mas campos vazios no HTML
```
👉 **Problema no carregarDadosModal()**

#### ❌ **Erro no backend:**
```javascript
🟣 Fazendo requisição: PUT /api/coordenadores/X
❌ Erro ao salvar modal: [mensagem de erro]
```
👉 **Problema no backend**

---

## 🧪 TESTE 3: PROFISSIONAIS (Problema: Dados não salvam)

### **Passos:**
1. No Console, execute: `console.log('🧪 TESTE 3: PROFISSIONAIS - INICIANDO')`
2. Navegue para **Profissionais**
3. Clique em **Editar** em qualquer profissional
4. **VERIFIQUE** se o modal carrega com os dados preenchidos
5. Modifique algum campo (ex: telefone, email)
6. Clique em **Salvar**
7. **IMEDIATAMENTE copie TODOS os logs do console**

### **Logs Esperados:**
```javascript
🧪 TESTE 3: PROFISSIONAIS - INICIANDO
📝 Editando profissional: {id: X, nome: "...", ...}
📝 Carregando dados no modal: {id: X, nome: "...", ...}
✅ Dados carregados no modal
🟣 salvarModal iniciada
🟣 state.candidato: {id: 1, ...}
🟣 state.modalAtivo: profissional
🟣 state.modalEditId: X
🟣 Dados PROFISSIONAL coletados: {candidato_id: 1, nome: "...", profissao: "...", ...}
🟣 Fazendo requisição: PUT /api/profissionais/X
🟣 Payload: {candidato_id: 1, nome: "...", profissao: "...", ...}
🟣 Resposta recebida: {id: X, ...}
🟣 Salvamento bem-sucedido, fechando modal...
✅ Salvo com sucesso!
```

### **Possíveis Problemas:**

#### ❌ **Campos obrigatórios faltando:**
```javascript
❌ Nome é obrigatório (mínimo 3 caracteres)!
```
OU
```javascript
❌ Profissão é obrigatória!
```
👉 **Preencha os campos obrigatórios**

---

## 📤 COMO ENVIAR OS LOGS

### **Método 1: Copiar tudo**
1. No Console, pressione **Ctrl+A** (selecionar tudo)
2. Pressione **Ctrl+C** (copiar)
3. Cole em um arquivo .txt ou diretamente na resposta

### **Método 2: Salvar como arquivo**
1. Clique com botão direito no Console
2. Selecione "Save as..."
3. Salve como `logs-diagnostico.log`
4. Envie o arquivo

---

## 🎯 O QUE PROCURAR NOS LOGS

### **Para Lideranças (logout):**
- Quando `state.candidato` vira `null`?
- Onde aparece a primeira ocorrência de `state.candidato: null`?
- Há algum erro de API (401, 500)?

### **Para Coordenadores/Profissionais (não salva):**
- O modal carrega os dados? (`✅ Dados carregados no modal`)
- A requisição é feita? (`🟣 Fazendo requisição: PUT /api/...`)
- O backend responde com sucesso? (`🟣 Resposta recebida: {id: X, ...}`)
- Os dados aparecem no payload? (`🟣 Payload: {...}`)

---

## ⚠️ IMPORTANTE

**NÃO feche o Console durante os testes!**

Copie **TODOS** os logs imediatamente após cada teste. Logs antigos podem ser perdidos.

Se aparecer muitas mensagens repetidas, pode usar:
```javascript
console.clear() // Limpar antes de cada teste
```

---

## 🚀 PRÓXIMOS PASSOS

Após receber os logs, vou:
1. **Identificar o problema exato** com base nos logs
2. **Implementar correção cirúrgica** no código
3. **Testar novamente** para confirmar a solução
4. **Remover logs de debug** após confirmação
