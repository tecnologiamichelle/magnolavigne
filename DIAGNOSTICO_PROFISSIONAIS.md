# 🐛 Diagnóstico: Problema na Edição de Profissionais

**Projeto:** MagnoLavigne (joao-silva)  
**Data:** 10/06/2026  
**Status:** ❌ PROBLEMA IDENTIFICADO

---

## 🎯 Problema Relatado

**Sintoma:**  
Ao editar um cadastro de Profissional existente, os dados salvos não retornam - os campos aparecem vazios no formulário.

---

## 🔍 Diagnóstico Completo

### 1️⃣ Estrutura do Banco de Dados

**Tabela `profissionais` (migration 0001_schema_inicial.sql):**

```sql
CREATE TABLE IF NOT EXISTS profissionais (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidato_id INTEGER NOT NULL,
  nome TEXT NOT NULL,
  profissao TEXT NOT NULL,
  telefone TEXT,                    -- ⚠️ Atenção: telefone
  email TEXT,
  municipio TEXT,                    -- ⚠️ Atenção: municipio
  area_especialidade TEXT,           -- ⚠️ Atenção: area_especialidade
  status TEXT DEFAULT 'ativo',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidato_id) REFERENCES candidatos(id) ON DELETE CASCADE
);
```

**Campos disponíveis no banco:**
- ✅ `id`
- ✅ `candidato_id`
- ✅ `nome`
- ✅ `profissao`
- ✅ `telefone` (não `celular`)
- ✅ `email`
- ✅ `municipio` (não `cidade`)
- ✅ `area_especialidade` (não `especialidade`)
- ✅ `status`
- ✅ `created_at`
- ✅ `updated_at`

**Campos que NÃO existem:**
- ❌ `cpf`
- ❌ `registro_profissional` (ou `registro`)
- ❌ `celular` (existe `telefone`)
- ❌ `cidade` (existe `municipio`)
- ❌ `estado`
- ❌ `endereco`
- ❌ `disponibilidade`
- ❌ `especialidade` (existe `area_especialidade`)
- ❌ `observacoes`

---

### 2️⃣ Formulário HTML (renderModalProfissional)

**Campos criados no formulário:**

```javascript
// Campos CORRETOS (existem no banco)
<input id="modal-nome" ...>              ✅ existe: nome
<input id="modal-profissao" ...>         ✅ existe: profissao
<input id="modal-email" ...>             ✅ existe: email

// Campos INCORRETOS (não existem no banco)
<input id="modal-cpf" ...>               ❌ NÃO existe
<input id="modal-registro" ...>          ❌ NÃO existe (deveria ser registro_profissional)
<input id="modal-especialidade" ...>     ❌ ERRADO (existe area_especialidade)
<input id="modal-celular" ...>           ❌ ERRADO (existe telefone)
<input id="modal-cidade" ...>            ❌ ERRADO (existe municipio)
<input id="modal-estado" ...>            ❌ NÃO existe
<input id="modal-endereco" ...>          ❌ NÃO existe
<input id="modal-disponibilidade" ...>   ❌ NÃO existe
<input id="modal-observacoes" ...>       ❌ NÃO existe
```

---

### 3️⃣ Função carregarDadosModal()

**O que ela faz:**

```javascript
function carregarDadosModal(data) {
  // 1. Preenche automaticamente campos com nome correspondente
  Object.keys(data).forEach(key => {
    const input = document.getElementById(`modal-${key.replace(/_/g, '-')}`);
    if (input) {
      input.value = data[key] || '';
    }
  });
  
  // 2. Mapeamentos especiais
  // PROFISSIONAIS
  if (data.area_especialidade && document.getElementById('modal-especialidade')) {
    document.getElementById('modal-especialidade').value = data.area_especialidade;
  }
  
  // cidade → modal-municipio
  if (data.cidade && document.getElementById('modal-municipio')) {
    document.getElementById('modal-municipio').value = data.cidade;
  }
  
  // municipio → modal-cidade (compatibilidade reversa)
  if (data.municipio && document.getElementById('modal-cidade')) {
    document.getElementById('modal-cidade').value = data.municipio;
  }
}
```

**Problema identificado:**

1. **Mapeamento incompleto:**  
   - `area_especialidade` → `modal-especialidade` ✅ (existe)
   - `municipio` → `modal-cidade` ✅ (existe)
   - `telefone` → `modal-celular` ❌ (NÃO existe no código!)

2. **Campos sem mapeamento:**  
   Dados do banco que não têm equivalente no formulário porque o formulário tem campos errados.

---

### 4️⃣ Fluxo de Edição (O que acontece)

**Quando clica em "Editar":**

1. Chama `editarProfissional(id)`
2. Busca profissional do `state.data.profissionais`
3. Retorna objeto com dados do banco:
   ```javascript
   {
     id: 1,
     nome: "João Silva",
     profissao: "Médico",
     telefone: "71999998888",      // ⚠️ Campo: telefone
     email: "joao@email.com",
     municipio: "Salvador",         // ⚠️ Campo: municipio
     area_especialidade: "Cardiologia", // ⚠️ Campo: area_especialidade
     status: "ativo"
   }
   ```

4. Chama `abrirModal('profissional', profissional)`
5. Modal renderiza com campos:
   - `modal-nome` ✅
   - `modal-cpf` ❌ (não existe no objeto)
   - `modal-registro` ❌ (não existe no objeto)
   - `modal-profissao` ✅
   - `modal-especialidade` ❌ (objeto tem `area_especialidade`)
   - `modal-celular` ❌ (objeto tem `telefone`)
   - `modal-email` ✅
   - `modal-cidade` ❌ (objeto tem `municipio`)
   - `modal-estado` ❌ (não existe no objeto)
   - `modal-endereco` ❌ (não existe no objeto)

6. Chama `carregarDadosModal(profissional)`
7. Tenta preencher campos:
   - `modal-nome` = "João Silva" ✅
   - `modal-profissao` = "Médico" ✅
   - `modal-email` = "joao@email.com" ✅
   - `modal-telefone` = "71999998888" ❌ (campo não existe!)
   - `modal-municipio` = "Salvador" ❌ (campo não existe!)
   - `modal-area-especialidade` = "Cardiologia" ❌ (campo não existe!)
   - `modal-especialidade` = "Cardiologia" ✅ (via mapeamento especial)
   - `modal-cidade` = "Salvador" ✅ (via mapeamento especial)
   - `modal-celular` = "" ❌ (sem mapeamento de telefone!)

**Resultado:**  
Apenas 3 campos preenchem corretamente: `nome`, `profissao`, `email`.  
Todos os outros ficam vazios porque:
- Ou o campo HTML não existe
- Ou não há mapeamento de `telefone` para `celular`

---

## ✅ Soluções Necessárias

### Opção 1: Ajustar Formulário para Usar Campos do Banco (RECOMENDADO)

**Vantagens:**
- Não precisa alterar banco de dados
- Não precisa migration
- Correção mais rápida

**Mudanças necessárias:**

1. **Remover campos que não existem no banco:**
   - ❌ Remover: `cpf`, `registro`, `estado`, `endereco`, `disponibilidade`, `observacoes`

2. **Renomear campos para bater com o banco:**
   - `modal-celular` → `modal-telefone`
   - `modal-cidade` → `modal-municipio`
   - `modal-especialidade` → `modal-area-especialidade`

3. **Adicionar mapeamento de `telefone` para `modal-telefone`:**
   ```javascript
   // Na função carregarDadosModal
   if (data.telefone && document.getElementById('modal-telefone')) {
     document.getElementById('modal-telefone').value = data.telefone;
   }
   ```

---

### Opção 2: Adicionar Colunas no Banco de Dados

**Vantagens:**
- Formulário fica como está (mais completo)
- Permite guardar mais informações

**Desvantagens:**
- Precisa criar migration
- Precisa aplicar no banco de produção
- Precisa atualizar rotas PUT e POST

**Migration necessária:**

```sql
-- 0011_profissionais_campos_completos.sql
ALTER TABLE profissionais ADD COLUMN cpf TEXT;
ALTER TABLE profissionais ADD COLUMN registro_profissional TEXT;
ALTER TABLE profissionais ADD COLUMN celular TEXT;
ALTER TABLE profissionais ADD COLUMN cidade TEXT;
ALTER TABLE profissionais ADD COLUMN estado TEXT;
ALTER TABLE profissionais ADD COLUMN endereco TEXT;
ALTER TABLE profissionais ADD COLUMN disponibilidade TEXT;
ALTER TABLE profissionais ADD COLUMN observacoes TEXT;

-- Migrar dados existentes
UPDATE profissionais SET celular = telefone WHERE celular IS NULL;
UPDATE profissionais SET cidade = municipio WHERE cidade IS NULL;
```

---

## 🎯 Recomendação

**Implementar OPÇÃO 1** (ajustar formulário):
- Mais rápido
- Sem risco de quebrar produção
- Mantém compatibilidade

Depois, se necessário, implementar OPÇÃO 2 em uma versão futura.

---

## 📋 Checklist de Correção (Opção 1)

### Arquivo: `public/static/app.js`

**1. Função `renderModalProfissional()` (linhas ~3160-3400):**

- [ ] Linha ~3185: Remover campo `modal-cpf`
- [ ] Linha ~3192: Remover campo `modal-registro`
- [ ] Linha ~3210: Renomear `modal-especialidade` para `modal-area-especialidade`
- [ ] Linha ~3218: Remover campo `modal-disponibilidade`
- [ ] Linha ~3226: Remover campo `modal-endereco`
- [ ] Linha ~3234: Renomear `modal-cidade` para `modal-municipio`
- [ ] Linha ~3262: Remover campo `modal-estado`
- [ ] Linha ~3290: Remover campo `modal-observacoes`
- [ ] Linha ~3306: Renomear `modal-celular` para `modal-telefone`

**2. Função `carregarDadosModal()` (linhas ~5460-5550):**

- [ ] Adicionar mapeamento:
  ```javascript
  // PROFISSIONAIS - telefone
  if (data.telefone && document.getElementById('modal-telefone')) {
    document.getElementById('modal-telefone').value = data.telefone;
  }
  ```

- [ ] Verificar se mapeamentos existentes estão corretos:
  ```javascript
  // area_especialidade → modal-area-especialidade (não modal-especialidade)
  if (data.area_especialidade && document.getElementById('modal-area-especialidade')) {
    document.getElementById('modal-area-especialidade').value = data.area_especialidade;
  }
  
  // municipio → modal-municipio (não modal-cidade)
  if (data.municipio && document.getElementById('modal-municipio')) {
    document.getElementById('modal-municipio').value = data.municipio;
  }
  ```

**3. Função `salvarModal()` - caso 'profissional' (linhas ~5680-5730):**

- [ ] Verificar se está coletando:
  ```javascript
  telefone: document.getElementById('modal-telefone')?.value?.replace(/\D/g, '') || ''
  municipio: document.getElementById('modal-municipio')?.value || ''
  area_especialidade: document.getElementById('modal-area-especialidade')?.value || ''
  ```

---

## 🧪 Teste Após Correção

1. Cadastrar um profissional com dados:
   - Nome: "Dr. João Silva"
   - Profissão: "Médico"
   - Telefone: "(71) 99999-8888"
   - Email: "joao@email.com"
   - Município: "Salvador"
   - Área de Especialidade: "Cardiologia"

2. Salvar e verificar se foi criado

3. Clicar em "Editar"

4. **Verificar se todos os campos preenchem corretamente:**
   - ✅ Nome: "Dr. João Silva"
   - ✅ Profissão: "Médico"
   - ✅ Telefone: "(71) 99999-8888"
   - ✅ Email: "joao@email.com"
   - ✅ Município: "Salvador"
   - ✅ Área de Especialidade: "Cardiologia"

5. Alterar algum campo e salvar

6. Verificar se a edição funcionou

---

## ⚠️ Problema Similar nos Outros Módulos?

**Verificar também:**
- ✅ Lideranças - **JÁ CORRIGIDO** (segundo CORRECOES_EDICAO_CADASTROS.md)
- ✅ Coordenadores - **JÁ CORRIGIDO** (segundo CORRECOES_EDICAO_CADASTROS.md)
- ❌ Profissionais - **PRECISA CORREÇÃO** (este documento)

---

**Próximo passo:** Aplicar correções conforme checklist acima.
