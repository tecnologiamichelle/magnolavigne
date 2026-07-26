# Diagnóstico - Botão "Novo Cadastro" em Dados Eleitorais

**Data:** 2026-07-26  
**Problema Reportado:** Botão "Adicionar Dados" no módulo Dados Eleitorais não está funcionando (parece sem link)

## 🔍 Análise do Código

### 1. Botão "Adicionar Dados" (linha 1465)

```javascript
<button 
  onclick="abrirModal('eleitor')"
  class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all"
>
  <i class="fas fa-plus mr-2"></i>Adicionar Dados
</button>
```

✅ **Botão está correto** - chama `abrirModal('eleitor')`

### 2. Função abrirModal (linha 5111)

```javascript
function abrirModal(tipo, data = null) {
  state.modalAtivo = tipo;
  state.modalData = data ? {...data} : {};
  state.modalEditId = data?.id || null;
  
  // Renderizar modal
  renderModal();
  
  // Aplicar máscaras após renderização
  setTimeout(() => {
    aplicarMascarasModal();
    anexarEventosModal();
    if (data) carregarDadosModal(data);
  }, 100);
}
```

✅ **Função existe e está correta**

### 3. Switch Case em renderModal (linha 5155)

```javascript
switch(state.modalAtivo) {
  case 'coordenador':
    conteudo = renderModalCoordenador();
    break;
  case 'profissional':
    conteudo = renderModalProfissional();
    break;
  case 'agenda':
    conteudo = renderModalAgenda();
    break;
  case 'dados-eleitorais':
    conteudo = renderModalDadosEleitorais();
    break;
  case 'eleitor':                          // ← linha 5168
    conteudo = renderModalEleitor();       // ← linha 5169
    break;
}
```

✅ **Case 'eleitor' está presente**

### 4. Função renderModalEleitor (linha 5896)

```javascript
// Alias para compatibilidade - 'eleitor' e 'dados-eleitorais' usam o mesmo modal
const renderModalEleitor = renderModalDadosEleitorais;
```

⚠️ **PROBLEMA POTENCIAL IDENTIFICADO:**

A função `renderModalEleitor` é definida como uma **const** (alias) na linha 5896, mas é chamada no switch na linha 5169.

Em JavaScript:
- **`const` declarations são hoisted mas não inicializadas** até a linha de execução
- Quando `renderModal()` executa (linha 5117), o switch tenta acessar `renderModalEleitor()`
- Se a linha 5896 ainda não foi executada, `renderModalEleitor` pode estar **undefined**

### 5. Função renderModalDadosEleitorais (linha 5743)

```javascript
function renderModalDadosEleitorais() {
  const titulo = state.modalEditId ? 'Editar Dados Eleitorais' : 'Novos Dados Eleitorais';
  const botaoTexto = state.modalEditId ? 'Salvar Alterações' : 'Cadastrar Dados';
  
  return `
    <form id="form-modal" onsubmit="salvarModal(event)" class="p-6">
      ...
    </form>
  `;
}
```

✅ **Função existe e está correta**

## 🐛 Possíveis Causas do Problema

### Causa 1: Hoisting Issue com const
O alias `const renderModalEleitor = renderModalDadosEleitorais` pode não estar disponível quando o switch é executado.

### Causa 2: Erro de JavaScript no Console
Pode haver um erro de JavaScript que impede o modal de abrir.

### Causa 3: Conflito de Estado
O `state.modalAtivo` pode não estar sendo setado corretamente.

## ✅ Soluções Propostas

### Solução 1: Mudar o Alias de `const` para `function`

**ANTES (linha 5896):**
```javascript
const renderModalEleitor = renderModalDadosEleitorais;
```

**DEPOIS:**
```javascript
function renderModalEleitor() {
  return renderModalDadosEleitorais();
}
```

**Vantagem:** Function declarations são completamente hoisted (disponíveis em todo o escopo)

### Solução 2: Chamar Diretamente renderModalDadosEleitorais

**ANTES (linha 5168-5170):**
```javascript
case 'eleitor':
  conteudo = renderModalEleitor();
  break;
```

**DEPOIS:**
```javascript
case 'eleitor':
  conteudo = renderModalDadosEleitorais();
  break;
```

**Vantagem:** Elimina a necessidade do alias

### Solução 3: Mudar o Botão para Chamar 'dados-eleitorais'

**ANTES (linha 1466):**
```javascript
onclick="abrirModal('eleitor')"
```

**DEPOIS:**
```javascript
onclick="abrirModal('dados-eleitorais')"
```

**Vantagem:** Usa o case que chama diretamente a função original

## 🎯 Recomendação

**Aplicar Solução 1** (mudar alias de const para function)

**Motivo:**
- Mantém compatibilidade com código existente
- Resolve problema de hoisting
- Não quebra outros lugares que podem estar chamando 'eleitor'

## 📋 Próximos Passos

1. Aplicar Solução 1 (mudar const para function)
2. Rebuild do projeto
3. Restart do servidor
4. Testar o botão "Adicionar Dados" no módulo Dados Eleitorais
5. Verificar console do navegador para confirmar ausência de erros

---

**Status:** 🔍 Diagnóstico Concluído - Aguardando Aplicação da Correção
