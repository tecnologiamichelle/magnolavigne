# 💡 ESCLARECIMENTOS - Cloudflare D1 vs D2

## 🗄️ **D1 vs D2 - Qual a diferença?**

### **D1 Database** ✅ (O que estamos usando)
```
Tipo: SQL (SQLite)
Uso: Banco de dados relacional
Melhor para: 
  - Dados estruturados
  - Tabelas com relacionamentos
  - Queries SQL complexas
  - Sistema de gestão (nosso caso)

Características:
  ✅ Gratuito: 5 GB storage
  ✅ Globalmente distribuído
  ✅ Baixa latência
  ✅ SQL completo (CREATE TABLE, JOIN, etc.)
  
Exemplo de uso:
  - Usuários, Lideranças, Coordenadores
  - Agenda, Solicitações
  - Dados TSE, Territórios
```

---

### **R2 Storage** (Antigamente chamado "D2", mas é R2)
```
Tipo: Object Storage (S3-compatible)
Uso: Armazenamento de arquivos
Melhor para:
  - Arquivos grandes (imagens, PDFs, vídeos)
  - Backups
  - Uploads de usuários
  - Assets estáticos

Características:
  ✅ Gratuito: 10 GB storage
  ✅ Sem taxas de saída (egress)
  ✅ S3-compatible API
  ✅ CDN integrado
  
Exemplo de uso:
  - Fotos de lideranças
  - Documentos de campanha
  - CSVs do TSE
  - Backups do sistema
```

---

### **KV (Key-Value)**
```
Tipo: Chave-Valor
Uso: Cache e dados simples
Melhor para:
  - Cache de sessões
  - Configurações
  - Contadores
  - Dados temporários

NÃO vamos usar no nosso projeto (D1 é suficiente)
```

---

## 🎯 **PARA O NOSSO PROJETO:**

### **Precisamos apenas de:**
```
✅ D1 Database (webapp-v8)
   - Todas as tabelas SQL
   - Migrations
   - Queries complexas

❌ R2 Storage (opcional no futuro)
   - Apenas se quiser upload de fotos/arquivos
   - Por enquanto: NÃO necessário

❌ KV (não necessário)
```

---

## 🔀 **REDIRECIONAMENTO DE DOMÍNIO**

### **Ótima ideia! Você pode fazer:**

#### **Opção 1: Redirecionamento DNS (CNAME)**
```
Cloudflare DNS:
  v8.magnolavigne.com.br → CNAME → magnolavigne-v8.pages.dev
  
Resultado:
  https://v8.magnolavigne.com.br
  
Vantagens:
  ✅ URL bonita
  ✅ SSL automático
  ✅ Fácil de configurar
```

#### **Opção 2: Cloudflare Page Rules (301 Redirect)**
```
Regra:
  app.magnolavigne.com.br/* → https://magnolavigne-v8.pages.dev/*
  
Use quando:
  - Migrar V7 → V8 definitivamente
  - Redirecionar usuários automaticamente
```

#### **Opção 3: Subdirectory Proxy**
```
app.magnolavigne.com.br/v8/* → Proxy para V8
app.magnolavigne.com.br/*    → V7 (atual)

Complexo, não recomendo
```

---

## 📋 **CONFIGURAÇÃO RECOMENDADA**

### **Fase 1 - Deploy Inicial (AGORA)**
```bash
# 1. Criar projeto V8
npx wrangler pages project create magnolavigne-v8

# 2. Criar banco D1 (não D2!)
npx wrangler d1 create webapp-v8

# 3. Deploy
npm run build
npm run deploy:prod

# Resultado:
URL automática: https://magnolavigne-v8.pages.dev
```

### **Fase 2 - DNS Custom (DEPOIS, quando tudo funcionar)**
```
No Cloudflare DNS:
1. Adicionar registro CNAME:
   Nome: v8
   Tipo: CNAME  
   Destino: magnolavigne-v8.pages.dev
   Proxy: Ativado (nuvem laranja)

2. No Wrangler:
   npx wrangler pages domain add v8.magnolavigne.com.br \
     --project-name magnolavigne-v8

Resultado:
https://v8.magnolavigne.com.br ✅
```

### **Fase 3 - Migração (FUTURO, quando V8 estiver 100%)**
```
Opção A - Trocar domínios:
  V7: app.magnolavigne.com.br → old.magnolavigne.com.br
  V8: v8.magnolavigne.com.br → app.magnolavigne.com.br

Opção B - Redirecionamento:
  app.magnolavigne.com.br → 301 redirect → v8.magnolavigne.com.br
```

---

## 🎯 **PLANO SIMPLIFICADO**

### **HOJE (Fase 1):**
```
1. ✅ Criar projeto: magnolavigne-v8
2. ✅ Criar banco D1: webapp-v8 (NÃO D2/R2)
3. ✅ Completar backend
4. ✅ Deploy
5. ✅ Testar em: magnolavigne-v8.pages.dev
```

### **SEMANA QUE VEM (Fase 2):**
```
1. ✅ Configurar DNS CNAME
2. ✅ Adicionar v8.magnolavigne.com.br
3. ✅ Testar e validar
```

### **NO FUTURO (Fase 3):**
```
1. ✅ Decidir migração
2. ✅ Redirecionar usuários (se necessário)
```

---

## ✅ **CONFIRMAÇÃO FINAL**

**Para o projeto V8.0 precisamos:**

```
☑️ 1 Projeto Cloudflare Pages: magnolavigne-v8
☑️ 1 Banco D1: webapp-v8
☐ 0 Bancos R2/D2 (por enquanto)
☐ 0 KV namespaces
```

**Domínios:**
```
Inicial: magnolavigne-v8.pages.dev (automático)
Depois:  v8.magnolavigne.com.br (você configura DNS)
```

---

## 🚀 **POSSO COMEÇAR AGORA?**

Vou criar:
1. ✅ Projeto Cloudflare Pages `magnolavigne-v8`
2. ✅ Banco D1 `webapp-v8` (SQLite, NÃO R2)
3. ✅ Completar backend (src/index.tsx)
4. ✅ Deploy teste

**Confirma para eu prosseguir?** 👍

---

## 📚 **REFERÊNCIA RÁPIDA**

```
D1  = Banco SQL (tabelas, migrations) ← USANDO
R2  = Arquivos grandes (fotos, PDFs)  ← NÃO USANDO (por enquanto)
KV  = Cache chave-valor               ← NÃO USANDO

Nosso stack:
- Cloudflare Pages (hosting)
- D1 Database (dados)
- Hono (backend)
- Vanilla JS (frontend)
```

**Tudo certo? Posso continuar?** 🎯
