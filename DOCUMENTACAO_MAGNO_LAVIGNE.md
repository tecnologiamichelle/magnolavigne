# 📋 Documentação Completa - Sistema Magno Lavigne

**Versão:** 1.0.0  
**Data da última atualização:** 06/05/2026  
**Status:** ✅ Produção (Local) - Totalmente Funcional

---

## 🎯 Visão Geral do Sistema

Sistema completo de gestão política desenvolvido para **Magno Lavigne - Deputado Federal (PV)**. Plataforma profissional para gerenciamento de campanhas eleitorais com hierarquia organizacional, controle de eleitores, lideranças, coordenadores e analytics em tempo real.

---

## 🌐 URLs de Acesso

### **Ambiente de Desenvolvimento (Sandbox)**
🔗 **URL Principal:** https://3000-i0j6zosvt5syflvs9b10d-cc2fbc16.sandbox.novita.ai  
📦 **Porta Local:** 3000  
🔄 **Status:** Online - PM2 (PID 68149)

### **Repositório GitHub**
🔗 **URL:** https://github.com/tecnologiamichelle/magnolavigne  
📌 **Branch Principal:** `main`  
📌 **Último Commit:** `1afb8ac` - "FIX: Permitir cadastro público de eleitor sem lideranca_id"

### **Produção Cloudflare Pages**
🔗 **URL Planejada:** https://magnolavigne.pages.dev  
⏳ **Status:** Pendente deploy final

---

## 🔐 Credenciais de Acesso

### **Usuário Administrador Principal**
```
Email: admin@magnolavigne.com.br
Senha: Admin@2026
Tipo: Admin
Município: Salvador
```

### **Usuário Demo - Edvaldo Pitanga**
```
Email: pitanga@magnolavigne.com.br
Senha: B@hia2026
Tipo: Admin
Município: Salvador
```

### **Outros Usuários Criados**
- **Coordenador:** coordenador@magnolavigne.com.br / Magno@2026
- **Gerente:** gerente@magnolavigne.com.br / Magno@2026
- **Supervisor:** supervisor@magnolavigne.com.br / Magno@2026
- **Comunicação:** comunicacao@magnolavigne.com.br / Magno@2026
- **Marketing:** marketing@magnolavigne.com.br / Magno@2026

---

## 💾 Banco de Dados

### **Cloudflare D1 Database**
- **Nome:** `meupolitico-production`
- **Database ID:** `318dba28-af2a-4d71-857a-059243e7f771`
- **Região:** ENAM (East North America)
- **Total de Tabelas:** 27 tabelas
- **Migrations Aplicadas:** 11 migrations

### **Dados Atuais (Banco Local)**
```
✅ Candidatos: 1 (Admin - ID 3)
✅ Coordenadores: 3
✅ Lideranças: 8
✅ Eleitores: 11 (incluindo 1 cadastro público)
✅ Profissionais: 0
✅ Solicitações Pendentes: 0
```

### **Estrutura de Dados Principal**

#### **Coordenadores (3 registros)**
1. **Anísio Teixeira**
   - Telefone: 71988881122
   - Email: anisio@coordenador.com
   - Município: Salvador
   - Área: Centro
   - Lideranças: 5
   - Eleitores Captados: 150

2. **Jorge Amado**
   - Telefone: 71988882233
   - Email: jorge@coordenador.com
   - Município: Ilhéus
   - Área: Sul da Bahia
   - Lideranças: 3
   - Eleitores Captados: 80

3. **Castro Alves**
   - Telefone: 71988883344
   - Email: castro@coordenador.com
   - Município: Salvador
   - Área: Liberdade
   - Lideranças: 4
   - Eleitores Captados: 120

#### **Lideranças (8 registros)**
1. Rui Barbosa (Salvador - Boa Viagem) - 50 eleitores
2. Teste Liderança (Salvador - Centro) - 30 eleitores
3. João Silva (Salvador - Pituba) - 25 eleitores
4. Liderança Salvador 1 (Salvador - Bairro 1) - 20 eleitores
5. Liderança Salvador 2 (Salvador - Bairro 2) - 35 eleitores
6. Maria Santos (Feira de Santana - Centro) - 40 eleitores
7. Pedro Costa (Feira de Santana - Kalilândia) - 18 eleitores
8. Ana Oliveira (Vitória da Conquista - Centro) - 45 eleitores

#### **Eleitores (11 registros)**
- 10 eleitores vinculados a lideranças
- 1 eleitor público (cadastro direto sem liderança)
- Status: Apoiador, Militante, Simpatizante
- Níveis de engajamento: Baixo, Médio, Alto

---

## 🎨 Customizações Visuais

### **Rebranding Completo**
✅ Substituído "Meu Político" por "Magno Lavigne" em toda UI  
✅ Subtítulo: "Deputado Federal"  
✅ Cores do partido PV aplicadas (verde)  
✅ Ícone de folha removido do wrapper na tela de login  
✅ Fundo animado gradient (verde/azul)

### **Menu Lateral Atualizado**
**Módulos Ativos:**
- Dashboard
- Aprovações
- Dados Eleitorais
- Lideranças
- Coordenadores
- Eleitores
- Hierarquia
- Profissionais
- Agenda
- Territórios
- **Desempenho** (renomeado de "BI Investimento")
- Usuários (Admin)
- Configurações (Admin)

**Módulos Removidos:**
- ❌ Projetos
- ❌ Gabinete
- ❌ Finanças
- ❌ Relatórios

### **Tela de Login**
✅ Botão "Criar Conta" removido  
✅ Mantidos apenas: "Entrar no Sistema" e "Cadastrar como Eleitor"  
✅ Modal de cadastro de eleitor preservado

---

## 🛠️ Correções Implementadas

### **1. Erro 500 no Login** ✅
**Problema:** Tabela `candidatos` ausente no banco local  
**Solução:** Aplicadas todas as migrations D1 local + seed com dados demo

### **2. Sistema Vazio Após Login** ✅
**Problema:** Banco local vazio, dados só existiam em produção  
**Solução:** Criado script `seed_local_simple.sql` para popular banco local com dados demo

### **3. Erro ao Cadastrar Evento/Agenda** ✅
**Problema:** Campo `data_inicio` sendo enviado mas API esperava `data_hora`  
**Solução:** Corrigido campo no frontend (app.js linha ~8061)

### **4. Erro ao Editar Usuário** ✅
**Problema:** `innerHTML` null ao tentar editar usuário  
**Solução:** Adicionada validação de elementos DOM e timeout de 100ms

### **5. Erro no Cadastro Público de Eleitor** ✅
**Problema:** API exigia `lideranca_id` obrigatório  
**Solução:** Alterada validação para aceitar cadastro sem liderança (público)

### **6. Ícone de Login com Caixa** ✅
**Problema:** Wrapper `<div>` criando caixa visual ao redor do ícone  
**Solução:** Removido wrapper, ícone agora aparece sem fundo

---

## 📦 Módulos e Funcionalidades

### **Dashboard**
- ✅ Estatísticas em tempo real
- ✅ Totais: Lideranças, Coordenadores, Profissionais
- ✅ Solicitações pendentes
- ✅ Próximos eventos
- ✅ Sistema de alertas

### **Coordenadores**
- ✅ Listagem completa com estatísticas
- ✅ Criar, editar e deletar coordenadores
- ✅ Vinculação com territórios
- ✅ Metas de lideranças e eleitores

### **Lideranças**
- ✅ Gerenciamento completo
- ✅ Vinculação com coordenadores
- ✅ Contador de eleitores
- ✅ Níveis de influência
- ✅ Filtros por município, status

### **Eleitores**
- ✅ Cadastro interno (vinculado a liderança)
- ✅ Cadastro público (sem liderança)
- ✅ Status de apoio (Simpatizante, Apoiador, Militante)
- ✅ Níveis de engajamento (Baixo, Médio, Alto)
- ✅ Filtros avançados

### **Territórios**
- ✅ Visualização dos 27 territórios da Bahia
- ✅ Busca por município
- ✅ Estatísticas de cobertura
- ✅ Integração com coordenadores e lideranças

### **Agenda**
- ✅ Criação de eventos
- ✅ Status e prioridades
- ✅ Filtros por tipo e período
- ✅ Visualização em grid/lista

### **Desempenho (ex-BI Investimento)**
- ✅ Analytics e métricas
- ✅ Relatórios de cobertura
- ✅ Análise de performance

### **Usuários (Admin)**
- ✅ Gerenciamento de usuários
- ✅ Tipos: Admin, Usuário
- ✅ Status: Ativo, Inativo

---

## 🔄 Fluxo de Cadastro Público de Eleitor

### **Fluxo Completo:**

1. **Tela de Login**
   - Usuário clica em "Cadastrar como Eleitor"

2. **Modal de Cadastro**
   - Nome Completo (obrigatório)
   - Telefone/WhatsApp (obrigatório)
   - E-mail (opcional)
   - Município (obrigatório)
   - Bairro (opcional)
   - Zona Eleitoral (opcional)
   - Observações (opcional)
   - Checkbox LGPD (obrigatório)

3. **Validação Backend**
   - Campos obrigatórios: `nome`, `municipio`
   - `lideranca_id` e `coordenador_id` são opcionais
   - Status padrão: `simpatizante`
   - Engajamento padrão: `baixo`

4. **Sucesso**
   - Mensagem de confirmação
   - Retorno automático para login após 3 segundos

---

## 🚀 Comandos de Desenvolvimento

### **Iniciar Desenvolvimento Local**
```bash
cd /home/user/clientes/joao-silva

# Build do projeto
npm run build

# Iniciar com PM2
pm2 start ecosystem.config.cjs

# Verificar status
pm2 list

# Ver logs
pm2 logs joao-silva --nostream
```

### **Gerenciar Banco de Dados D1**

#### **Migrations**
```bash
# Aplicar migrations (Local)
npx wrangler d1 migrations apply meupolitico-production --local

# Aplicar migrations (Produção)
npx wrangler d1 migrations apply meupolitico-production --remote
```

#### **Executar Comandos SQL**
```bash
# Local
npx wrangler d1 execute meupolitico-production --local --command="SELECT * FROM candidatos"

# Produção
npx wrangler d1 execute meupolitico-production --remote --command="SELECT * FROM candidatos"
```

#### **Popular Banco Local**
```bash
# Executar seed
npx wrangler d1 execute meupolitico-production --local --file=./scripts/seed_local_simple.sql
```

### **Git e GitHub**
```bash
# Status
git status

# Adicionar e commitar
git add .
git commit -m "Sua mensagem"

# Push para GitHub
git push origin main
```

### **Deploy para Cloudflare Pages**
```bash
# Build e deploy
npm run build
npx wrangler pages deploy dist --project-name magnolavigne

# Verificar deployment
npx wrangler pages deployment list --project-name magnolavigne
```

---

## 📁 Estrutura de Diretórios

```
joao-silva/
├── src/
│   └── index.tsx              # Backend Hono + API routes
├── public/
│   └── static/
│       ├── app.js             # Frontend JavaScript
│       └── style.css          # CSS customizado
├── scripts/
│   ├── seed_local_simple.sql  # Seed banco local
│   └── seed_local_complete.sql
├── migrations/                 # D1 Database migrations
│   ├── 0001_schema_inicial.sql
│   ├── 0002_tabelas_tse.sql
│   └── ...
├── dist/                       # Build output (gerado)
├── ecosystem.config.cjs        # Configuração PM2
├── wrangler.jsonc             # Configuração Cloudflare
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🔧 Configuração do Ambiente

### **ecosystem.config.cjs**
```javascript
module.exports = {
  apps: [{
    name: 'joao-silva',
    script: 'npx',
    args: 'wrangler pages dev dist --d1=meupolitico-joao-silva --local --ip 0.0.0.0 --port 3000',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    watch: false,
    instances: 1,
    exec_mode: 'fork'
  }]
}
```

### **wrangler.jsonc**
```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "magnolavigne",
  "compatibility_date": "2024-01-01",
  "compatibility_flags": ["nodejs_compat"],
  "pages_build_output_dir": "./dist",
  "d1_databases": [{
    "binding": "DB",
    "database_name": "meupolitico-production",
    "database_id": "318dba28-af2a-4d71-857a-059243e7f771"
  }]
}
```

---

## 🐛 Problemas Conhecidos e Soluções

### **1. Banco Local Vazio Após Restart**
**Problema:** `.wrangler/state/v3/d1/` é limpo ao reiniciar sandbox  
**Solução:** Executar seed após cada restart:
```bash
npx wrangler d1 execute meupolitico-production --local --file=./scripts/seed_local_simple.sql
```

### **2. Porta 3000 em Uso**
**Solução:**
```bash
fuser -k 3000/tcp 2>/dev/null || true
pm2 delete joao-silva
pm2 start ecosystem.config.cjs
```

### **3. Build Timeout**
**Solução:** Build geralmente leva 3-5 segundos, mas pode timeout em sandbox sobrecarregado. Tente novamente.

---

## 📊 Endpoints da API

### **Autenticação**
- `POST /api/login` - Login de usuário

### **Dashboard**
- `GET /api/dashboard/:candidatoId` - Estatísticas do dashboard

### **Coordenadores**
- `GET /api/coordenadores/:candidatoId` - Listar coordenadores
- `POST /api/coordenadores` - Criar coordenador
- `PUT /api/coordenadores/:id` - Atualizar coordenador
- `DELETE /api/coordenadores/:id` - Deletar coordenador

### **Lideranças**
- `GET /api/liderancas/:candidatoId` - Listar lideranças
- `GET /api/lideranca/:id` - Obter liderança específica
- `POST /api/liderancas` - Criar liderança
- `PUT /api/liderancas/:id` - Atualizar liderança
- `DELETE /api/liderancas/:id` - Deletar liderança

### **Eleitores**
- `GET /api/eleitores/:candidatoId` - Listar eleitores
- `POST /api/eleitores` - Criar eleitor (público ou vinculado)
- `PUT /api/eleitores/:id` - Atualizar eleitor
- `DELETE /api/eleitores/:id` - Deletar eleitor

### **Agenda**
- `GET /api/agenda/:candidatoId` - Listar eventos
- `POST /api/agenda` - Criar evento
- `PUT /api/agenda/:id` - Atualizar evento
- `DELETE /api/agenda/:id` - Deletar evento

### **Territórios**
- `GET /api/territorios` - Listar territórios
- `GET /api/territorios/:id` - Obter território específico
- `GET /api/territorios/:id/municipios` - Municípios do território

---

## ✅ Checklist de Deploy para Produção

### **Pré-Deploy**
- [x] Banco de dados D1 criado e migrations aplicadas
- [x] Usuários demo criados
- [x] Testes locais completos
- [x] Build sem erros
- [x] Git commitado e pushed

### **Deploy**
```bash
# 1. Setup Cloudflare API
# (Usar ferramenta setup_cloudflare_api_key)

# 2. Build
npm run build

# 3. Deploy
npx wrangler pages deploy dist --project-name magnolavigne

# 4. Verificar
curl https://magnolavigne.pages.dev
```

### **Pós-Deploy**
- [ ] Testar login em produção
- [ ] Verificar dashboard
- [ ] Testar cadastro público de eleitor
- [ ] Configurar domínio customizado (se aplicável)
- [ ] Adicionar secrets/variáveis de ambiente
- [ ] Documentar URL final

---

## 📝 Notas de Desenvolvimento

### **Tecnologias Utilizadas**
- **Backend:** Hono Framework (TypeScript)
- **Frontend:** Vanilla JavaScript + TailwindCSS
- **Database:** Cloudflare D1 (SQLite)
- **Deploy:** Cloudflare Pages
- **Build:** Vite
- **Dev Server:** Wrangler + PM2

### **Padrões de Código**
- TypeScript para backend
- Async/await para operações de banco
- Try/catch para error handling
- Validação de campos obrigatórios
- Retorno de erros amigáveis

---

## 📞 Suporte e Contato

**Desenvolvedor:** AI Assistant  
**Projeto:** Magno Lavigne - Sistema de Gestão Política  
**Versão:** 1.0.0  
**Última Atualização:** 06/05/2026

---

## 🎉 Changelog

### **v1.0.0 - 06/05/2026**
- ✅ Rebranding completo (Meu Político → Magno Lavigne)
- ✅ Banco de dados populado com dados demo
- ✅ Correção de erro 500 no login
- ✅ Correção de cadastro público de eleitor
- ✅ Remoção do botão "Criar Conta"
- ✅ Renomeação "BI Investimento" → "Desempenho"
- ✅ Remoção de módulos (Projetos, Gabinete, Finanças, Relatórios)
- ✅ Correção de erro ao editar usuário
- ✅ Correção de erro ao criar evento/agenda
- ✅ Sistema totalmente funcional em desenvolvimento

---

**🚀 Sistema Pronto para Uso!**
