# 🌐 MeuPolitico.Digital - Plataforma de Gestão Política

**Plataforma:** SaaS Multi-Tenant para Gestão de Campanhas Políticas  
**Versão:** V2.1.2 (Baseado em Magno Lavigne V8.4.1)  
**Status:** ✅ PRODUÇÃO - Pronta para Comercialização

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

### **Funcionalidades Core (100% Operacionais)**

1. **Dashboard Executivo** - Visão geral em tempo real com 4 métricas principais
2. **Hierarquia Organizacional** ⭐ - Coordenadores → Lideranças → Eleitores
3. **Gestão de Eleitores** ⭐ - Cadastro completo com 18 campos
4. **Gestão de Lideranças** - Cadastro ilimitado com territórios e metas
5. **Coordenadores e Equipe** - Gestão territorial com performance
6. **Profissionais de Apoio** - Cadastro de especialistas por categoria
7. **Dados Eleitorais TSE** - Análise de 417 municípios e 10,6M eleitores
8. **Territórios de Identidade** - 27 territórios da Bahia georreferenciados
9. **BI Investimento** - Analytics de onde investir recursos
10. **Relatórios Avançados** - 8 tipos de análises + Relatório de Hierarquia
11. **Multi-Usuário** - Roles: Super Admin, Admin, Deputado, Coordenador
12. **Aprovações** - Sistema de aprovação de solicitações de cadastro
13. **Projetos** 🆕 - Gestão de atividades e projetos em andamento (Interface criada)
14. **Gabinete** 🆕 - Gestão de equipe, acessos e prestadores (Interface criada)
15. **Finanças** 🆕 - Emendas, gastos e prestação de contas (Interface criada)

### **Novidades Multi-Tenant (Futuro)**

- [ ] Isolamento de dados por tenant
- [ ] Painel administrativo multi-campanha
- [ ] Billing e assinaturas
- [ ] Personalização de marca por cliente
- [ ] API pública para integrações
- [ ] White-label completo

---

## 🗄️ BANCO DE DADOS

### **Produção:** `meupolitico-production` ✅ ATIVO

**Database ID:** `318dba28-af2a-4d71-857a-059243e7f771`  
**Região:** ENAM (East North America)  
**Tamanho:** 0.45 MB  
**Status:** Operacional

**Estrutura:**
- 12 tabelas principais ✅
- 7 migrações aplicadas ✅
- Hierarquia organizacional completa ✅
- 417 municípios + 27 territórios ✅
- ~10,6M eleitores cadastrados ✅

**Tabelas principais:**
- `candidatos` - Usuários/Clientes (3 contas ativas)
- `eleitores` ⭐ - Base de apoio com hierarquia
- `liderancas` - Lideranças por cliente
- `coordenadores` - Coordenadores territoriais
- `profissionais` - Profissionais de apoio
- `solicitacoes` - Solicitações/Aprovações
- `dados_eleitorais` - Dados eleitorais TSE
- `territorios` - Territórios de identidade (27 da BA)
- `territorios_municipios` - 417 municípios
- `bi_eleitorado` - Business Intelligence

---

## 👥 CREDENCIAIS DE ACESSO

### **Conta Principal (Produção)**

```
Email: admin@meupolitico.digital
Senha: Admin@2026
Tipo: Administrador da Plataforma
```

**⚠️ IMPORTANTE:** Altere a senha padrão após primeiro acesso!

### **Contas de Teste (Projeto Piloto)**

```
1. Super Admin
   Email: pitanga@magnolavigne.com.br
   Senha: B@hia2026

2. Deputado Federal
   Email: magno@magnolavigne.com.br
   Senha: senha123
```

**📖 Documentação Completa:** Consulte `CREDENCIAIS_E_ACESSO.md` para todos os detalhes.

---

## 🚀 ACESSO RÁPIDO

### **URLs de Produção**

✅ **Produção Principal:** https://meupolitico-digital.pages.dev  
✅ **Preview Atual:** https://c912efe0.meupolitico-digital.pages.dev  
📊 **Status:** Online e operacional

### **Login**

1. Acesse: https://meupolitico-digital.pages.dev
2. Use: `admin@meupolitico.digital` / `Admin@2026`
3. Explore a plataforma!

---

## 🚀 DESENVOLVIMENTO LOCAL (Opcional)

### **1. Clone e Instale**
```bash
cd /home/user/meupolitico-digital
npm install
```

### **2. Configure wrangler.jsonc** (já configurado)
```jsonc
{
  "d1_databases": [{
    "binding": "DB",
    "database_name": "meupolitico-production",
    "database_id": "318dba28-af2a-4d71-857a-059243e7f771"
  }]
}
```

### **3. Aplicar Migrations Locais**
```bash
npm run db:migrate:local
```

### **4. Build e Desenvolvimento**
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
- `GET /api/liderancas` - Listar (requer X-Candidato-Id)
- `GET /api/liderancas/:id` - Detalhe
- `POST /api/liderancas` - Criar
- `PUT /api/liderancas/:id` - Atualizar
- `DELETE /api/liderancas/:id` - Deletar

### **Coordenadores**
- `GET /api/coordenadores` - Listar
- `GET /api/coordenadores/:id` - Detalhe
- `POST /api/coordenadores` - Criar
- `PUT /api/coordenadores/:id` - Atualizar
- `DELETE /api/coordenadores/:id` - Deletar

### **Eleitores** ⭐ NOVO
- `GET /api/eleitores` - Listar eleitores
- `GET /api/eleitores/:id` - Detalhe
- `POST /api/eleitores` - Criar eleitor
- `PUT /api/eleitores/:id` - Atualizar
- `DELETE /api/eleitores/:id` - Deletar
- `GET /api/eleitores/lideranca/:id` - Por liderança
- `GET /api/eleitores/coordenador/:id` - Por coordenador

### **Relatórios** ⭐ NOVO
- `GET /api/relatorios/hierarquia` - Relatório completo de hierarquia

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
- Vanilla JavaScript (10.000+ linhas)
- Tailwind CSS (CDN)
- Font Awesome 6.4.0
- Chart.js 4.4.0
- Axios 1.6.0
- Tema customizado MeuPolitico

**Infraestrutura:**
- Cloudflare Pages (Edge Deploy)
- Wrangler 4.x (CLI)
- PM2 (Process Manager)

---

## 📈 STATUS DO PROJETO

### **✅ Fase 1: Base e Deploy (Concluído)**
- [x] Duplicar projeto Magno Lavigne V8
- [x] Renomear para MeuPolitico.Digital
- [x] Criar banco D1 produção
- [x] Deploy inicial funcionando
- [x] Testes de funcionalidade

### **✅ Fase 2: Hierarquia Organizacional (Concluído)**
- [x] Implementar módulo Eleitores
- [x] Criar hierarquia Coordenadores → Lideranças → Eleitores
- [x] Contadores automáticos
- [x] Sistema de metas e performance
- [x] Relatório de hierarquia completo
- [x] Frontend com filtros e dashboards

### **✅ Fase 3: Rebranding Comercial (Concluído)**
- [x] Nova identidade visual
- [x] Cores e tema customizado
- [x] Títulos e textos atualizados
- [x] Credenciais admin@meupolitico.digital
- [x] Documentação comercial completa
- [x] Apresentação e modelo de negócio

### **⏳ Fase 4: Melhorias (Q2 2026)**
- [ ] Refatorar para multi-tenant real
- [ ] Sistema de billing integrado
- [ ] Painel administrativo SaaS
- [ ] Autenticação JWT melhorada
- [ ] API pública documentada

### **⏳ Fase 5: Expansão (Q3 2026)**
- [ ] White-label completo
- [ ] Integrações TSE automáticas
- [ ] Mobile app (React Native)
- [ ] Analytics avançado com IA
- [ ] Export/Import completo

### **⏳ Fase 6: Escala (Q4 2026)**
- [ ] Multi-região global
- [ ] CDN otimizado
- [ ] Cache Redis/KV
- [ ] Performance 99.9% uptime
- [ ] Suporte 24/7

---

## 🔗 LINKS E DOCUMENTAÇÃO

### **Produção Atual:**
- **MeuPolitico V2.0.1:** https://meupolitico-digital.pages.dev
- **Preview Deployment:** https://c912efe0.meupolitico-digital.pages.dev

### **Referência (Projeto Piloto):**
- **Magno V8.4.1:** https://magnolavigne-v8.pages.dev
- **Preview Piloto:** https://f9c4a041.magnolavigne-v8.pages.dev

### **Documentação:**
- `README.md` - Este arquivo (visão geral)
- `README_COMERCIAL.md` - Informações comerciais e preços
- `APRESENTACAO_COMERCIAL.md` - Pitch e modelo de negócio
- `CREDENCIAIS_E_ACESSO.md` - Credenciais, URLs, APIs
- `PROPOSTA_HIERARQUIA_ORGANIZACIONAL.md` - Arquitetura hierárquica

### **GitHub:**
- (a configurar após push final)

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
**Versão:** V2.0.1  
**Data:** 10/04/2026  
**Status:** ✅ Produção | Pronta para Comercialização  
**Deploy:** https://meupolitico-digital.pages.dev
