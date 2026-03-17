# 🌐 MeuPolitico.Digital - Plataforma de Gestão Política

**Plataforma:** Multi-Tenant para Gestão de Campanhas Políticas  
**Versão:** 1.0.0 (Baseado em Magno Lavigne V8.3.6)  
**Status:** 🟡 EM DESENVOLVIMENTO (Redundância Ativa)

---

## 📋 SOBRE ESTE PROJETO

### **🎯 Objetivo**

**MeuPolitico.Digital** é uma plataforma **SaaS multi-tenant** para gestão de campanhas políticas, nascida como evolução do sistema piloto **Magno Lavigne V8**.

**Estratégia:**
- ✅ Projeto piloto: **Magno Lavigne** (primeiro cliente real)
- ✅ Duplicação como redundância e base para desenvolvimento
- ✅ Arquitetura preparada para multi-tenant
- ✅ Tecnologias validadas em produção
- ✅ Código base testado e funcional

---

## 🎯 CARACTERÍSTICAS DA PLATAFORMA

### **Funcionalidades Core (Herdadas do Piloto)**

1. **Dashboard Executivo** - Visão geral em tempo real
2. **Gestão de Lideranças** - Cadastro ilimitado com territórios
3. **Coordenadores e Equipe** - Gestão de coordenação
4. **Profissionais de Apoio** - Cadastro de especialistas
5. **Dados Eleitorais** - Análise por zona, seção, município
6. **Agenda e Eventos** - Calendário de compromissos
7. **Territórios de Identidade** - 27 territórios da Bahia
8. **BI Investimento** - Onde investir recursos
9. **Relatórios Avançados** - 8 tipos de análises
10. **Multi-Usuário** - Roles: Admin, Coordenador, Deputado

### **Novidades Multi-Tenant (Futuro)**

- [ ] Isolamento de dados por tenant
- [ ] Painel administrativo multi-campanha
- [ ] Billing e assinaturas
- [ ] Personalização de marca por cliente
- [ ] API pública para integrações
- [ ] White-label completo

---

## 🗄️ BANCO DE DADOS

### **Produção:** `meupolitico-production` (a ser criado)

**Estrutura:**
- 14 tabelas principais
- 4 tabelas de territórios
- Estrutura multi-tenant preparada

**Tabelas principais:**
- `candidatos` - Usuários/Clientes
- `liderancas` - Lideranças por cliente
- `coordenadores` - Coordenadores
- `profissionais` - Profissionais de apoio
- `agenda` - Eventos e compromissos
- `solicitacoes` - Solicitações/Aprovações
- `dados_eleitorais` - Dados eleitorais
- `territorios` - Territórios de identidade (27 da BA)
- `territorios_municipios` - 417 municípios
- `bi_views` - Views para Business Intelligence

---

## 👥 USUÁRIOS PADRÃO (Desenvolvimento)

```
1. Super Admin
   Email: admin@meupolitico.digital
   Senha: Admin@2026

2. Demo Client 1
   Email: demo1@meupolitico.digital
   Senha: demo123

3. Demo Client 2
   Email: demo2@meupolitico.digital
   Senha: demo123
```

---

## 🚀 QUICK START

### **1. Criar Banco D1**
```bash
cd /home/user/meupolitico-digital
npm run db:create
# Copiar database_id retornado para wrangler.jsonc
```

### **2. Atualizar wrangler.jsonc**
```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "meupolitico-production",
      "database_id": "SEU_DATABASE_ID_AQUI"
    }
  ]
}
```

### **3. Aplicar Migrations**
```bash
npm run db:migrate:local
```

### **4. Build**
```bash
npm run build
```

### **5. Desenvolvimento Local**
```bash
# Com PM2 (recomendado)
pm2 start ecosystem.config.cjs

# Ou direto
npm run dev:d1
```

### **6. Deploy para Produção**
```bash
npm run deploy:prod
```

---

## 📦 SCRIPTS NPM

```bash
# Desenvolvimento
npm run dev              # Vite dev server
npm run dev:d1           # Wrangler + D1 local
npm run build            # Build para produção

# Banco de Dados
npm run db:create        # Criar banco D1
npm run db:migrate:local # Migrations (local)
npm run db:migrate:prod  # Migrations (produção)

# Deploy
npm run deploy:prod      # Deploy Cloudflare Pages

# Utilitários
npm run clean-port       # Limpar porta 3000
npm run test             # Testar localhost
```

---

## 🏗️ ARQUITETURA

```
meupolitico-digital/
├── src/
│   ├── index.tsx              # Backend Hono (50+ rotas)
│   └── renderer.tsx           # Renderer
├── public/static/
│   ├── app.js                 # Frontend principal
│   ├── territorios.js         # Módulo territórios
│   ├── bi-investimento.js     # Módulo BI
│   ├── magno-theme.css        # Tema customizado
│   └── style.css              # CSS adicional
├── migrations/
│   ├── 0001_schema_inicial.sql
│   ├── 0002_territorios.sql
│   └── 0003_bi_views.sql
├── package.json
├── wrangler.jsonc            # Config Cloudflare
└── README.md
```

---

## 🔌 API ENDPOINTS (50+)

### **Autenticação**
- `POST /api/login`

### **Dashboard**
- `GET /api/dashboard/:candidatoId`

### **Lideranças**
- `GET /api/liderancas/:candidatoId`
- `POST /api/liderancas`
- `PUT /api/liderancas/:id`
- `DELETE /api/liderancas/:id`

### **Dados Eleitorais**
- `GET /api/dados-eleitorais/:candidatoId`
- `POST /api/dados-eleitorais`

### **Territórios**
- `GET /api/territorios`
- `GET /api/territorios/:id`
- `GET /api/territorios/:id/municipios`

### **Business Intelligence**
- `GET /api/bi/dashboard-executivo`
- `GET /api/bi/investimento-territorios`
- `GET /api/bi/territorios-prioritarios`

---

## 🛠️ TECNOLOGIAS

**Backend:**
- Hono 4.12.8 (Edge Framework)
- Cloudflare Workers/Pages
- Cloudflare D1 (SQLite)

**Frontend:**
- Vanilla JavaScript (7.000+ linhas)
- Tailwind CSS (CDN)
- Font Awesome 6.4.0
- Chart.js 4.4.0
- Axios 1.6.0

**Infraestrutura:**
- Cloudflare Pages (Edge Deploy)
- Wrangler 4.x (CLI)
- PM2 (Process Manager)

---

## 📈 ROADMAP

### **Fase 1: Redundância (Atual)**
- [x] Duplicar projeto Magno Lavigne
- [x] Renomear para MeuPolitico.Digital
- [ ] Criar banco D1 próprio
- [ ] Deploy inicial
- [ ] Testes de redundância

### **Fase 2: Melhorias (Q2 2026)**
- [ ] Refatorar para multi-tenant
- [ ] Sistema de billing
- [ ] Painel administrativo
- [ ] Autenticação JWT
- [ ] API pública

### **Fase 3: Expansão (Q3 2026)**
- [ ] White-label
- [ ] Integrações (TSE, APIs externas)
- [ ] Mobile-first redesign
- [ ] Analytics avançado
- [ ] Export/Import de dados

### **Fase 4: Escala (Q4 2026)**
- [ ] Multi-região
- [ ] CDN otimizado
- [ ] Cache inteligente
- [ ] Performance 99.9% uptime
- [ ] Suporte 24/7

---

## 🔗 LINKS

### **Referência (Piloto):**
- **Magno V8.3.6:** https://magnolavigne-v8.pages.dev
- **GitHub:** (a configurar)

### **MeuPolitico.Digital:**
- **Produção:** (a fazer primeiro deploy)
- **Staging:** (a configurar)
- **GitHub:** (a configurar)

---

## 📊 DADOS IMPORTADOS

### **Territórios de Identidade - Bahia**
- ✅ 27 territórios oficiais
- ✅ 417 municípios (100% da Bahia)
- ✅ 10,6 milhões de eleitores
- ✅ Dados DIEESE 2016-2019
- ✅ Classificação oficial Gov. Bahia

### **Base Eleitoral**
- ✅ 391 municípios com dados de eleitores
- ✅ Views BI para análise de investimento
- ✅ Priorização automática de territórios

---

## 🤝 CONTRIBUINDO

Este é um projeto proprietário. Para contribuir:

1. Solicitar acesso ao repositório
2. Seguir padrões de código estabelecidos
3. Testes obrigatórios antes de commit
4. Review obrigatório para merge

---

## 📝 LICENÇA

**Proprietário:** MeuPolitico.Digital  
**Código Base:** Magno Lavigne V8.3.6  
**Todos os direitos reservados.**

---

## 🆘 SUPORTE

**Email:** suporte@meupolitico.digital  
**Status:** https://status.meupolitico.digital  
**Docs:** https://docs.meupolitico.digital

---

**Desenvolvido com ❤️ para a democracia brasileira**  
**Versão:** 1.0.0  
**Data:** 17/03/2026  
**Status:** 🟡 Redundância Ativa | Preparando Multi-Tenant
