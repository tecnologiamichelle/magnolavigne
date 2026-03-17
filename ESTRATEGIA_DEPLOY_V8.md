# 🚀 ESTRATÉGIA DE DEPLOY - V8.0 em Paralelo com V7.6.1

## 📊 SITUAÇÃO ATUAL

### **Produção V7.6.1 (manter intacto):**
```
Projeto Cloudflare: magnolavigne
URLs ativas:
  - https://magnolavigne.pages.dev
  - https://app.magnolavigne.com.br (domínio custom)
  
Banco D1: webapp-production
  - 20 municípios TSE
  - 1.439 candidatos
  - 3 usuários admin
  - 22 lideranças ativas
  
Status: ✅ FUNCIONANDO - NÃO MEXER
```

---

## 🎯 OPÇÕES PARA DEPLOY V8.0

### **OPÇÃO 1: NOVO PROJETO CLOUDFLARE + SUBDOMÍNIO** ⭐⭐⭐ **RECOMENDADO**

**Estratégia:**
- Criar **novo projeto** Cloudflare Pages: `magnolavigne-v8`
- Usar **subdomínio** para acesso

**Configuração:**

#### **1.1 URLs Propostas:**

**Opção A - Subdomínio Beta/V8:**
```
V7 (produção): https://app.magnolavigne.com.br
V8 (novo):     https://v8.magnolavigne.com.br
             ou
               https://beta.magnolavigne.com.br
```

**Opção B - Subdomínio por Função:**
```
V7 (público):  https://app.magnolavigne.com.br
V8 (interno):  https://admin.magnolavigne.com.br
             ou
               https://gestao.magnolavigne.com.br
```

**Opção C - Cloudflare Pages URLs:**
```
V7: https://magnolavigne.pages.dev
V8: https://magnolavigne-v8.pages.dev (automático)
    https://app.magnolavigne.com.br (custom, migrar depois)
```

#### **1.2 Vantagens:**
- ✅ Total isolamento entre V7 e V8
- ✅ Dois bancos D1 separados (webapp-production e webapp-v8)
- ✅ Testar V8 sem afetar V7
- ✅ Migração gradual de usuários
- ✅ Rollback instantâneo se necessário
- ✅ Desenvolvimento e produção separados

#### **1.3 Desvantagens:**
- ⚠️ Custo de 2 projetos Cloudflare (mas é gratuito até 500 deploys/mês)
- ⚠️ Precisa configurar DNS para subdomínio
- ⚠️ Usuários precisam de nova URL (temporário)

#### **1.4 Comandos:**
```bash
# 1. Criar novo projeto Cloudflare Pages
npx wrangler pages project create magnolavigne-v8 \
  --production-branch main

# 2. Criar novo banco D1
npx wrangler d1 create webapp-v8

# 3. Deploy
npm run deploy:prod
# Resultado: https://magnolavigne-v8.pages.dev

# 4. Adicionar domínio custom (depois)
npx wrangler pages domain add v8.magnolavigne.com.br \
  --project-name magnolavigne-v8
```

---

### **OPÇÃO 2: MESMO PROJETO + BRANCH SEPARADA** ⭐⭐

**Estratégia:**
- Usar o **mesmo projeto** `magnolavigne`
- Deploy em **branch diferente** (não main)

**Configuração:**

```bash
# 1. Deploy em branch 'v8'
git checkout -b v8
git push origin v8

npx wrangler pages deploy dist \
  --project-name magnolavigne \
  --branch v8

# Resultado: https://v8.magnolavigne.pages.dev (branch URL)
```

#### **URLs Resultantes:**
```
V7 (main):  https://magnolavigne.pages.dev
            https://app.magnolavigne.com.br

V8 (v8):    https://v8.magnolavigne.pages.dev
```

#### **Vantagens:**
- ✅ Um único projeto Cloudflare
- ✅ Fácil de gerenciar
- ✅ URL automática por branch

#### **Desvantagens:**
- ❌ **MESMO BANCO D1** (não dá para ter 2 bancos)
- ❌ Risco de conflito de dados
- ❌ Difícil ter isolamento total
- ❌ **NÃO RECOMENDADO** para o seu caso

---

### **OPÇÃO 3: SUBSTITUIR V7 POR V8 (MIGRAÇÃO DIRETA)** ⭐

**Estratégia:**
- Deploy V8 **substituindo** V7 no mesmo projeto

**⚠️ MUITO ARRISCADO - NÃO RECOMENDADO**

#### **Por que NÃO fazer:**
- ❌ Perde V7 funcionando
- ❌ Sem rollback fácil
- ❌ Pode quebrar para usuários ativos
- ❌ Banco compartilhado (risco de dados)

---

## 🏆 RECOMENDAÇÃO FINAL

### **✅ OPÇÃO 1 - Novo Projeto + Subdomínio**

**Plano de Ação Completo:**

#### **FASE 1 - Setup Inicial (agora)**

```bash
# 1. Criar novo projeto Cloudflare Pages
npx wrangler pages project create magnolavigne-v8 \
  --production-branch main \
  --compatibility-date 2026-03-17

# 2. Criar novo banco D1
npx wrangler d1 create webapp-v8
# Copiar database_id para wrangler.jsonc

# 3. Atualizar meta_info
meta_info(action="write", key="cloudflare_project_name_v8", value="magnolavigne-v8")
```

#### **FASE 2 - Desenvolvimento (1-2 dias)**

```bash
# 1. Completar backend (src/index.tsx)
# 2. Aplicar migrations localmente
npm run db:migrate:local

# 3. Testar localmente
npm run build
pm2 start ecosystem.config.cjs
curl http://localhost:3000

# 4. Commits frequentes
git add -A
git commit -m "feat: Backend completo"
```

#### **FASE 3 - Deploy Staging (teste)**

```bash
# 1. Build
npm run build

# 2. Deploy
npm run deploy:prod

# Resultado: https://magnolavigne-v8.pages.dev

# 3. Testar online
curl https://magnolavigne-v8.pages.dev
```

#### **FASE 4 - Configuração DNS (quando estiver pronto)**

**Opção A - Subdomínio v8/beta:**
```
Adicionar registro CNAME no DNS:
  Nome: v8.magnolavigne.com.br
  Tipo: CNAME
  Valor: magnolavigne-v8.pages.dev
  TTL: Auto

Cloudflare:
npx wrangler pages domain add v8.magnolavigne.com.br \
  --project-name magnolavigne-v8
```

**Opção B - Migrar domínio principal (depois de testar):**
```
1. Manter V7: app.magnolavigne.com.br
2. Criar V8:  v8.magnolavigne.com.br
3. Testar tudo
4. Quando estável, trocar:
   - V7 → old.magnolavigne.com.br
   - V8 → app.magnolavigne.com.br
```

---

## 📋 CHECKLIST DE DEPLOY

### **Pré-Deploy:**
- [ ] Backend completo (src/index.tsx)
- [ ] Migrations aplicadas localmente
- [ ] Testes locais passando
- [ ] Frontend funcionando (login, dashboard, etc.)
- [ ] Git commitado

### **Deploy V8:**
- [ ] Criar projeto Cloudflare: `magnolavigne-v8`
- [ ] Criar banco D1: `webapp-v8`
- [ ] Atualizar wrangler.jsonc com database_id
- [ ] Build: `npm run build`
- [ ] Deploy: `npm run deploy:prod`
- [ ] Testar URL: https://magnolavigne-v8.pages.dev

### **Pós-Deploy:**
- [ ] Aplicar migrations produção: `npm run db:migrate:prod`
- [ ] Importar usuários teste (3 admins)
- [ ] Testar login
- [ ] Testar todos módulos
- [ ] Processar planilha Territórios
- [ ] Importar dados TSE (se necessário)

### **DNS (opcional, fazer depois):**
- [ ] Criar CNAME: v8.magnolavigne.com.br → magnolavigne-v8.pages.dev
- [ ] Adicionar domínio no Cloudflare Pages
- [ ] Testar HTTPS
- [ ] Certificado SSL automático

---

## 🔄 CONVIVÊNCIA DOS DOIS SISTEMAS

### **Durante Desenvolvimento:**
```
V7 (produção): https://app.magnolavigne.com.br
  - Usuários reais usam
  - Banco: webapp-production
  - Status: ESTÁVEL

V8 (staging):  https://magnolavigne-v8.pages.dev
  - Testes e desenvolvimento
  - Banco: webapp-v8
  - Status: EM DESENVOLVIMENTO
```

### **Após Testes Completos:**
```
Opção A - Manter os dois:
  V7 (legacy): https://old.magnolavigne.com.br
  V8 (novo):   https://app.magnolavigne.com.br

Opção B - Desativar V7:
  V7: Desativado ou apenas leitura
  V8: Sistema principal
```

---

## 💰 CUSTOS CLOUDFLARE

### **Plano Gratuito:**
```
✅ Projetos Pages: Ilimitados
✅ Deploys: 500/mês
✅ Requests: 100k/dia
✅ Bandwidth: Ilimitado
✅ D1 Database: 5 GB storage
✅ Custom domains: Ilimitados
```

**Conclusão:** ✅ **ZERO custo adicional** para ter 2 projetos

---

## 🎯 PRÓXIMOS PASSOS IMEDIATOS

1. **Você confirma** qual URL quer para V8:
   - `v8.magnolavigne.com.br` ?
   - `beta.magnolavigne.com.br` ?
   - `admin.magnolavigne.com.br` ?
   - Apenas `magnolavigne-v8.pages.dev` (sem custom domain)?

2. **Eu crio:**
   - Projeto Cloudflare Pages
   - Banco D1
   - Completo o backend

3. **Deploy e teste**

---

## ❓ DECISÕES NECESSÁRIAS

**Pergunto a você:**

1. **Nome do subdomínio para V8?**
   - [ ] v8.magnolavigne.com.br
   - [ ] beta.magnolavigne.com.br
   - [ ] admin.magnolavigne.com.br
   - [ ] gestao.magnolavigne.com.br
   - [ ] Apenas magnolavigne-v8.pages.dev (sem custom)
   - [ ] Outro: _________________

2. **Quando migrar usuários de V7 para V8?**
   - [ ] Imediatamente após deploy V8
   - [ ] Após 1 semana de testes
   - [ ] Após 1 mês de validação
   - [ ] Manter os dois permanentemente

3. **O que fazer com V7 depois?**
   - [ ] Manter como backup
   - [ ] Desativar completamente
   - [ ] Deixar em read-only
   - [ ] Migrar para outro subdomínio

---

**Aguardo suas decisões para prosseguir! 🚀**
