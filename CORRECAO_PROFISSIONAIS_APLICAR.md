# 🔧 Correções para Aplicar - Módulo Profissionais

**Projeto:** MagnoLavigne (joao-silva)  
**Data:** 10/06/2026  
**Arquivo:** `public/static/app.js`

---

## 📋 SUMÁRIO DAS CORREÇÕES

### Problema Principal
**Formulário de edição tem campos incompatíveis com o banco de dados**, causando campos vazios ao editar.

### Solução
Ajustar nomes dos campos HTML para bater com as colunas do banco.

---

## ✅ CORREÇÃO 1: renderProfissionalCard (Linha ~3193-3196)

### ❌ ANTES (código problemático):
```javascript
${prof.registro_profissional ? `<p><i class="fas fa-id-card w-5 text-gray-500"></i> ${prof.registro_profissional}</p>` : ''}
${prof.celular ? `<p><i class="fas fa-mobile-alt w-5 text-gray-500"></i> ${prof.celular}</p>` : ''}
${prof.email ? `<p><i class="fas fa-envelope w-5 text-gray-500"></i> ${prof.email}</p>` : ''}
${prof.cidade && prof.estado ? `<p><i class="fas fa-map-marker-alt w-5 text-gray-500"></i> ${prof.cidade} - ${prof.estado}</p>` : ''}
```

### ✅ DEPOIS (código corrigido):
```javascript
${prof.area_especialidade ? `<p><i class="fas fa-briefcase w-5 text-gray-500"></i> ${prof.area_especialidade}</p>` : ''}
${prof.telefone ? `<p><i class="fas fa-phone w-5 text-gray-500"></i> ${prof.telefone}</p>` : ''}
${prof.email ? `<p><i class="fas fa-envelope w-5 text-gray-500"></i> ${prof.email}</p>` : ''}
${prof.municipio ? `<p><i class="fas fa-map-marker-alt w-5 text-gray-500"></i> ${prof.municipio}</p>` : ''}
```

**Mudanças:**
- `registro_profissional` → `area_especialidade` (ícone: fa-briefcase)
- `celular` → `telefone` (ícone: fa-phone)
- `email` → mantém
- `cidade` e `estado` → `municipio` apenas

---

## ✅ CORREÇÃO 2: renderModalProfissional - Remover/Renomear Campos

### Seção 1: Dados Pessoais

**❌ REMOVER campo CPF** (linhas ~3217-3227):
```javascript
// DELETAR ESTE BLOCO COMPLETO
<div>
  <label class="block text-sm font-medium text-gray-700 mb-2">
    CPF <span class="text-red-500">*</span>
  </label>
  <input 
    type="text" 
    id="modal-cpf"
    placeholder="000.000.000-00"
    maxlength="14"
    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none text-lg"
    required
  >
</div>
```

**❌ REMOVER campo Registro Profissional** (linhas ~3229-3240):
```javascript
// DELETAR ESTE BLOCO COMPLETO
<div>
  <label class="block text-sm font-medium text-gray-700 mb-2">
    Registro Profissional <span class="text-red-500">*</span>
  </label>
  <input 
    type="text" 
    id="modal-registro"
    placeholder="Ex: CRM 12345"
    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-700 focus:outline-none text-lg"
    required
  >
</div>
```

### Seção 2: Dados Profissionais

**✅ RENOMEAR campo Especialidade** (linha ~3272):
```javascript
// ANTES
id="modal-especialidade"

// DEPOIS
id="modal-area-especialidade"
```

**❌ REMOVER campo Disponibilidade** (linhas ~3284-3295):
```javascript
// DELETAR ESTE BLOCO COMPLETO
<div class="md:col-span-2">
  <label class="block text-sm font-medium text-gray-700 mb-2">
    Disponibilidade
  </label>
  <input 
    type="text" 
    id="modal-disponibilidade"
    placeholder="Ex: Segunda a Sexta, 8h-17h"
    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
  >
</div>
```

**❌ REMOVER campo Endereço** (linhas ~3297-3307):
```javascript
// DELETAR ESTE BLOCO COMPLETO
<div class="md:col-span-2">
  <label class="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
  <input 
    type="text" 
    id="modal-endereco"
    placeholder="Rua, Número, Bairro"
    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
  >
</div>
```

**✅ RENOMEAR campo Cidade para Município** (linhas ~3309-3320):
```javascript
// ANTES
<div>
  <label class="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
  <input 
    type="text" 
    id="modal-cidade"
    placeholder="Digite a cidade"
    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
  >
</div>

// DEPOIS
<div class="md:col-span-2">
  <label class="block text-sm font-medium text-gray-700 mb-2">
    Município <span class="text-red-500">*</span>
  </label>
  <input 
    type="text" 
    id="modal-municipio"
    placeholder="Digite o município"
    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
    required
  >
</div>
```

**❌ REMOVER campo Estado** (linhas ~3322-3357):
```javascript
// DELETAR ESTE BLOCO COMPLETO (todo o select de estados)
<div>
  <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
  <select 
    id="modal-estado"
    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg"
  >
    <option value="">Selecione o estado</option>
    <option value="AC">Acre</option>
    ...
  </select>
</div>
```

**❌ REMOVER campo Observações** (linhas ~3359-3370):
```javascript
// DELETAR ESTE BLOCO COMPLETO
<div class="md:col-span-2">
  <label class="block text-sm font-medium text-gray-700 mb-2">Observações</label>
  <textarea 
    id="modal-observacoes"
    rows="3"
    placeholder="Informações adicionais sobre o profissional"
    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none text-lg resize-none"
  ></textarea>
</div>
```

### Seção 3: Contato

**✅ RENOMEAR campo Celular para Telefone** (linhas ~3383-3395):
```javascript
// ANTES
<div>
  <label class="block text-sm font-medium text-gray-700 mb-2">
    Celular <span class="text-red-500">*</span>
  </label>
  <input 
    type="tel" 
    id="modal-celular"
    placeholder="(00) 00000-0000"
    maxlength="15"
    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
    required
  >
</div>

// DEPOIS
<div class="md:col-span-3">
  <label class="block text-sm font-medium text-gray-700 mb-2">
    Telefone <span class="text-red-500">*</span>
  </label>
  <input 
    type="tel" 
    id="modal-telefone"
    placeholder="(00) 00000-0000"
    maxlength="15"
    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
    required
  >
</div>
```

---

## ✅ CORREÇÃO 3: carregarDadosModal - Adicionar Mapeamento

**Localização:** Após a linha que mapeia `area_especialidade`

**Adicionar:**
```javascript
// PROFISSIONAIS - telefone
if (data.telefone && document.getElementById('modal-telefone')) {
  document.getElementById('modal-telefone').value = data.telefone;
}

// PROFISSIONAIS - municipio
if (data.municipio && document.getElementById('modal-municipio')) {
  document.getElementById('modal-municipio').value = data.municipio;
}
```

**✅ ATUALIZAR mapeamento existente:**
```javascript
// ANTES
if (data.area_especialidade && document.getElementById('modal-especialidade')) {
  document.getElementById('modal-especialidade').value = data.area_especialidade;
}

// DEPOIS
if (data.area_especialidade && document.getElementById('modal-area-especialidade')) {
  document.getElementById('modal-area-especialidade').value = data.area_especialidade;
}
```

**❌ REMOVER mapeamentos obsoletos:**
```javascript
// DELETAR (se existir)
if (data.especialidade && document.getElementById('modal-area-especialidade')) {
  document.getElementById('modal-area-especialidade').value = data.especialidade;
}

if (data.cidade && document.getElementById('modal-municipio')) {
  document.getElementById('modal-municipio').value = data.cidade;
}

if (data.municipio && document.getElementById('modal-cidade')) {
  document.getElementById('modal-cidade').value = data.municipio;
}
```

---

## ✅ CORREÇÃO 4: salvarModal - Verificar Coleta de Dados

**Localização:** Caso 'profissional' na função `salvarModal`

**Garantir que está coletando:**
```javascript
dados = {
  ...dados,
  nome: nomeProf,
  profissao: profissao,
  telefone: document.getElementById('modal-telefone')?.value?.replace(/\D/g, '') || '',
  email: document.getElementById('modal-email')?.value || '',
  municipio: document.getElementById('modal-municipio')?.value || '',
  area_especialidade: document.getElementById('modal-area-especialidade')?.value || ''
};
```

**❌ NÃO deve tentar coletar:**
- `cpf`
- `registro_profissional`
- `celular`
- `cidade`
- `estado`
- `endereco`
- `disponibilidade`
- `observacoes`

---

## 🧪 TESTE APÓS APLICAR CORREÇÕES

1. Build do projeto:
   ```bash
   cd /home/user/clientes/joao-silva
   npm run build
   ```

2. Reiniciar servidor:
   ```bash
   pm2 restart joao-silva
   # ou
   pm2 restart magnolavigne-v8
   ```

3. Testar edição:
   - Login no sistema
   - Ir em "Profissionais"
   - Cadastrar um profissional
   - Clicar em "Editar"
   - **Verificar se todos os campos aparecem preenchidos**

---

## ⚠️ BACKUP ANTES DE APLICAR

```bash
cp /home/user/clientes/joao-silva/public/static/app.js /home/user/clientes/joao-silva/public/static/app.js.backup-profissionais-$(date +%Y%m%d)
```

---

**Status:** 📝 Documento criado - Aguardando aplicação das correções
