import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

// Tipos do Cloudflare
type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

// ============================================
// MIDDLEWARE
// ============================================

// CORS para API
app.use('/api/*', cors())

// NOTA DE SEGURANÇA:
// Os endpoints da API não têm autenticação de token/JWT implementada ainda.
// A segurança atual depende de:
// 1. Frontend validar login antes de fazer requisições
// 2. Validação de candidato_id nos dados enviados
// 3. CORS configurado para aceitar apenas origens confiáveis (em produção)
// 
// TODO (Futuro - Enterprise):
// - Implementar JWT tokens após login
// - Middleware de autenticação para rotas protegidas
// - Rate limiting para prevenir abuse
// - Validação de permissões por tipo de usuário (admin, coordenador, etc)

// Servir arquivos estáticos
app.use('/static/*', serveStatic({ root: './public' }))

// ============================================
// ROTA PRINCIPAL - HTML
// ============================================
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MeuPolitico.Digital - Plataforma Profissional de Gestão de Campanhas</title>
        <meta name="description" content="Plataforma inteligente de gestão de campanhas políticas com hierarquia organizacional, analytics e muito mais.">
        <meta name="keywords" content="campanha política, gestão eleitoral, lideranças, coordenadores, eleitores, saas">
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
          .gradient-bg { background: linear-gradient(135deg, #3B82F6 0%, #6366F1 100%); }
          .card { transition: transform 0.3s, box-shadow 0.3s; }
          .card:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 12px 32px rgba(59, 130, 246, 0.2); }
          .sidebar { height: 100vh; position: sticky; top: 0; }
          @media (max-width: 768px) {
            .sidebar { position: relative; height: auto; }
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <div id="app"></div>
        
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
        <script src="/static/app.js"></script>
        <script src="/static/territorios.js"></script>
        <script src="/static/bi-investimento.js"></script>
    </body>
    </html>
  `)
})

// ============================================
// ROTAS DE API - AUTENTICAÇÃO
// ============================================

/**
 * POST /api/login
 * Body: { email, senha }
 * Response: { candidato: {...} }
 */
app.post('/api/login', async (c) => {
  try {
    const { email, senha } = await c.req.json()
    
    if (!email || !senha) {
      return c.json({ error: 'Email e senha são obrigatórios' }, 400)
    }

    const candidato = await c.env.DB.prepare(`
      SELECT id, email, nome, cargo, municipio, status, tipo, created_at
      FROM candidatos
      WHERE email = ? AND senha = ? AND status = 'ativo'
    `).bind(email, senha).first()

    if (!candidato) {
      return c.json({ error: 'Credenciais inválidas' }, 401)
    }

    return c.json({ candidato })
  } catch (error) {
    console.error('Erro no login:', error)
    return c.json({ error: 'Erro ao processar login' }, 500)
  }
})

// ============================================
// ROTAS DE API - DASHBOARD
// ============================================

/**
 * GET /api/dashboard/:candidatoId
 * Response: { totalLiderancas, totalCoordenadores, etc... }
 */
app.get('/api/dashboard/:candidatoId', async (c) => {
  try {
    const candidatoId = c.req.param('candidatoId')

    // Total de lideranças ativas
    const liderancas = await c.env.DB.prepare(`
      SELECT COUNT(*) as total FROM liderancas 
      WHERE candidato_id = ? AND status = 'ativo'
    `).bind(candidatoId).first()

    // Total de coordenadores ativos
    const coordenadores = await c.env.DB.prepare(`
      SELECT COUNT(*) as total FROM coordenadores 
      WHERE candidato_id = ? AND status = 'ativo'
    `).bind(candidatoId).first()

    // Total de profissionais ativos
    const profissionais = await c.env.DB.prepare(`
      SELECT COUNT(*) as total FROM profissionais 
      WHERE candidato_id = ? AND status = 'ativo'
    `).bind(candidatoId).first()

    // Solicitações pendentes
    const solicitacoes = await c.env.DB.prepare(`
      SELECT COUNT(*) as total FROM solicitacoes 
      WHERE status = 'pendente'
    `).bind().first()

    // Próximos eventos (5) - incluir eventos sem data
    const eventos = await c.env.DB.prepare(`
      SELECT * FROM agenda 
      WHERE candidato_id = ? AND status != 'cancelado' 
      AND (data_hora >= datetime('now') OR data_hora IS NULL)
      ORDER BY 
        CASE WHEN data_hora IS NULL THEN 1 ELSE 0 END,
        data_hora ASC 
      LIMIT 5
    `).bind(candidatoId).all()

    return c.json({
      totalLiderancas: liderancas?.total || 0,
      totalCoordenadores: coordenadores?.total || 0,
      totalProfissionais: profissionais?.total || 0,
      solicitacoesPendentes: solicitacoes?.total || 0,
      proximosEventos: eventos?.results || [],
      alertas: []
    })
  } catch (error) {
    console.error('Erro no dashboard:', error)
    return c.json({ error: 'Erro ao carregar dashboard' }, 500)
  }
})

// ============================================
// ROTAS DE API - LIDERANÇAS
// ============================================

/**
 * GET /api/liderancas/:candidatoId
 */
app.get('/api/liderancas/:candidatoId', async (c) => {
  try {
    const candidatoId = c.req.param('candidatoId')
    
    const result = await c.env.DB.prepare(`
      SELECT * FROM liderancas 
      WHERE candidato_id = ? 
      ORDER BY created_at DESC
    `).bind(candidatoId).all()

    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao listar lideranças:', error)
    return c.json({ error: 'Erro ao listar lideranças' }, 500)
  }
})

/**
 * GET /api/lideranca/:id
 */
app.get('/api/lideranca/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    const lideranca = await c.env.DB.prepare(`
      SELECT * FROM liderancas WHERE id = ?
    `).bind(id).first()

    if (!lideranca) {
      return c.json({ error: 'Liderança não encontrada' }, 404)
    }

    return c.json(lideranca)
  } catch (error) {
    console.error('Erro ao buscar liderança:', error)
    return c.json({ error: 'Erro ao buscar liderança' }, 500)
  }
})

/**
 * POST /api/liderancas
 */
app.post('/api/liderancas', async (c) => {
  try {
    const data = await c.req.json()
    
    const result = await c.env.DB.prepare(`
      INSERT INTO liderancas (
        candidato_id, coordenador_id, nome, telefone, email, municipio, bairro,
        zona_eleitoral, nivel_influencia, qtd_influenciados, qtd_eleitores,
        territorio_id, meta_eleitores, observacoes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.candidato_id,
      data.coordenador_id || null,
      data.nome,
      data.telefone || null,
      data.email || null,
      data.municipio,
      data.bairro || null,
      data.zona_eleitoral || null,
      data.nivel_influencia || 'media',
      data.qtd_influenciados || 0,
      data.qtd_eleitores || 0,
      data.territorio_id || null,
      data.meta_eleitores || 100,
      data.observacoes || null
    ).run()

    // Atualizar contador no coordenador
    if (data.coordenador_id) {
      await c.env.DB.prepare(`
        UPDATE coordenadores 
        SET qtd_liderancas = qtd_liderancas + 1
        WHERE id = ?
      `).bind(data.coordenador_id).run()
    }

    return c.json({ id: result.meta.last_row_id, ...data })
  } catch (error) {
    console.error('Erro ao criar liderança:', error)
    return c.json({ error: 'Erro ao criar liderança' }, 500)
  }
})

/**
 * PUT /api/liderancas/:id
 */
app.put('/api/liderancas/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const data = await c.req.json()
    
    await c.env.DB.prepare(`
      UPDATE liderancas SET
        coordenador_id = ?, nome = ?, telefone = ?, email = ?, municipio = ?, bairro = ?,
        zona_eleitoral = ?, nivel_influencia = ?, qtd_influenciados = ?,
        qtd_eleitores = ?, territorio_id = ?, meta_eleitores = ?, observacoes = ?,
        updated_at = datetime('now')
      WHERE id = ?
    `).bind(
      data.coordenador_id || null,
      data.nome,
      data.telefone || null,
      data.email || null,
      data.municipio,
      data.bairro || null,
      data.zona_eleitoral || null,
      data.nivel_influencia,
      data.qtd_influenciados || 0,
      data.qtd_eleitores || 0,
      data.territorio_id || null,
      data.meta_eleitores || 100,
      data.observacoes || null,
      id
    ).run()

    return c.json({ id, ...data })
  } catch (error) {
    console.error('Erro ao atualizar liderança:', error)
    return c.json({ error: 'Erro ao atualizar liderança' }, 500)
  }
})

/**
 * DELETE /api/liderancas/:id
 */
app.delete('/api/liderancas/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    // Buscar liderança para atualizar coordenador
    const lideranca = await c.env.DB.prepare(`
      SELECT coordenador_id FROM liderancas WHERE id = ?
    `).bind(id).first()
    
    await c.env.DB.prepare(`
      DELETE FROM liderancas WHERE id = ?
    `).bind(id).run()

    // Atualizar contador no coordenador
    if (lideranca?.coordenador_id) {
      await c.env.DB.prepare(`
        UPDATE coordenadores 
        SET qtd_liderancas = qtd_liderancas - 1
        WHERE id = ?
      `).bind(lideranca.coordenador_id).run()
    }

    return c.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar liderança:', error)
    return c.json({ error: 'Erro ao deletar liderança' }, 500)
  }
})

/**
 * GET /api/liderancas/coordenador/:coordenadorId
 * Lista lideranças de um coordenador específico
 */
app.get('/api/liderancas/coordenador/:coordenadorId', async (c) => {
  try {
    const coordenadorId = c.req.param('coordenadorId')
    
    const result = await c.env.DB.prepare(`
      SELECT * FROM liderancas 
      WHERE coordenador_id = ?
      ORDER BY created_at DESC
    `).bind(coordenadorId).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao listar lideranças do coordenador:', error)
    return c.json({ error: 'Erro ao listar lideranças do coordenador' }, 500)
  }
})

// ============================================
// ROTAS DE API - COORDENADORES
// ============================================

/**
 * GET /api/coordenadores/:candidatoId
 */
app.get('/api/coordenadores/:candidatoId', async (c) => {
  try {
    const candidatoId = c.req.param('candidatoId')
    const result = await c.env.DB.prepare(`
      SELECT * FROM coordenadores 
      WHERE candidato_id = ? 
      ORDER BY created_at DESC
    `).bind(candidatoId).all()
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao listar coordenadores:', error)
    return c.json({ error: 'Erro ao listar coordenadores' }, 500)
  }
})

/**
 * POST /api/coordenadores
 */
app.post('/api/coordenadores', async (c) => {
  try {
    const data = await c.req.json()
    
    const result = await c.env.DB.prepare(`
      INSERT INTO coordenadores (
        candidato_id, nome, telefone, email, municipio, territorio_id, area_atuacao, 
        meta_liderancas, meta_eleitores
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.candidato_id,
      data.nome,
      data.telefone || null,
      data.email || null,
      data.municipio,
      data.territorio_id || null,
      data.area_atuacao || null,
      data.meta_liderancas || 10,
      data.meta_eleitores || 1000
    ).run()

    return c.json({ id: result.meta.last_row_id, ...data })
  } catch (error) {
    console.error('Erro ao criar coordenador:', error)
    return c.json({ error: 'Erro ao criar coordenador' }, 500)
  }
})

/**
 * PUT /api/coordenadores/:id
 */
app.put('/api/coordenadores/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const data = await c.req.json()
    
    await c.env.DB.prepare(`
      UPDATE coordenadores SET
        nome = ?, telefone = ?, email = ?, municipio = ?, territorio_id = ?, 
        area_atuacao = ?, meta_liderancas = ?, meta_eleitores = ?,
        updated_at = datetime('now')
      WHERE id = ?
    `).bind(
      data.nome,
      data.telefone || null,
      data.email || null,
      data.municipio,
      data.territorio_id || null,
      data.area_atuacao || null,
      data.meta_liderancas || 10,
      data.meta_eleitores || 1000,
      id
    ).run()

    return c.json({ id, ...data })
  } catch (error) {
    console.error('Erro ao atualizar coordenador:', error)
    return c.json({ error: 'Erro ao atualizar coordenador' }, 500)
  }
})

/**
 * DELETE /api/coordenadores/:id
 */
app.delete('/api/coordenadores/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await c.env.DB.prepare(`DELETE FROM coordenadores WHERE id = ?`).bind(id).run()
    return c.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar coordenador:', error)
    return c.json({ error: 'Erro ao deletar coordenador' }, 500)
  }
})

// ============================================
// ROTAS DE API - PROFISSIONAIS
// ============================================

/**
 * GET /api/profissionais/:candidatoId
 */
app.get('/api/profissionais/:candidatoId', async (c) => {
  try {
    const candidatoId = c.req.param('candidatoId')
    const result = await c.env.DB.prepare(`
      SELECT * FROM profissionais 
      WHERE candidato_id = ? 
      ORDER BY created_at DESC
    `).bind(candidatoId).all()
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao listar profissionais:', error)
    return c.json({ error: 'Erro ao listar profissionais' }, 500)
  }
})

/**
 * POST /api/profissionais
 */
app.post('/api/profissionais', async (c) => {
  try {
    const data = await c.req.json()
    
    const result = await c.env.DB.prepare(`
      INSERT INTO profissionais (
        candidato_id, nome, profissao, telefone, email, municipio, area_especialidade
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.candidato_id,
      data.nome,
      data.profissao,
      data.telefone || null,
      data.email || null,
      data.municipio || null,
      data.area_especialidade || null
    ).run()

    return c.json({ id: result.meta.last_row_id, ...data })
  } catch (error) {
    console.error('Erro ao criar profissional:', error)
    return c.json({ error: 'Erro ao criar profissional' }, 500)
  }
})

/**
 * PUT /api/profissionais/:id
 */
app.put('/api/profissionais/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const data = await c.req.json()
    
    await c.env.DB.prepare(`
      UPDATE profissionais SET
        nome = ?, profissao = ?, telefone = ?, email = ?, municipio = ?, area_especialidade = ?,
        updated_at = datetime('now')
      WHERE id = ?
    `).bind(
      data.nome,
      data.profissao,
      data.telefone || null,
      data.email || null,
      data.municipio || null,
      data.area_especialidade || null,
      id
    ).run()

    return c.json({ id, ...data })
  } catch (error) {
    console.error('Erro ao atualizar profissional:', error)
    return c.json({ error: 'Erro ao atualizar profissional' }, 500)
  }
})

/**
 * DELETE /api/profissionais/:id
 */
app.delete('/api/profissionais/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await c.env.DB.prepare(`DELETE FROM profissionais WHERE id = ?`).bind(id).run()
    return c.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar profissional:', error)
    return c.json({ error: 'Erro ao deletar profissional' }, 500)
  }
})

// ============================================
// ROTAS DE API - AGENDA
// ============================================

/**
 * GET /api/agenda/:candidatoId
 */
app.get('/api/agenda/:candidatoId', async (c) => {
  try {
    const candidatoId = c.req.param('candidatoId')
    const result = await c.env.DB.prepare(`
      SELECT * FROM agenda 
      WHERE candidato_id = ? 
      ORDER BY data_hora DESC
    `).bind(candidatoId).all()
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao listar agenda:', error)
    return c.json({ error: 'Erro ao listar agenda' }, 500)
  }
})

/**
 * POST /api/agenda
 */
app.post('/api/agenda', async (c) => {
  try {
    const data = await c.req.json()
    
    const result = await c.env.DB.prepare(`
      INSERT INTO agenda (
        candidato_id, titulo, descricao, data_hora, local, municipio, tipo, prioridade, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.candidato_id,
      data.titulo,
      data.descricao || null,
      data.data_hora,
      data.local || null,
      data.municipio || null,
      data.tipo || 'reuniao',
      data.prioridade || 'media',
      data.status || 'pendente'
    ).run()

    return c.json({ id: result.meta.last_row_id, ...data })
  } catch (error) {
    console.error('Erro ao criar evento:', error)
    return c.json({ error: 'Erro ao criar evento' }, 500)
  }
})

/**
 * PUT /api/agenda/:id
 */
app.put('/api/agenda/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const data = await c.req.json()
    
    await c.env.DB.prepare(`
      UPDATE agenda SET
        titulo = ?, descricao = ?, data_hora = ?, local = ?, municipio = ?,
        tipo = ?, prioridade = ?, status = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(
      data.titulo,
      data.descricao || null,
      data.data_hora,
      data.local || null,
      data.municipio || null,
      data.tipo,
      data.prioridade,
      data.status,
      id
    ).run()

    return c.json({ id, ...data })
  } catch (error) {
    console.error('Erro ao atualizar evento:', error)
    return c.json({ error: 'Erro ao atualizar evento' }, 500)
  }
})

/**
 * DELETE /api/agenda/:id
 */
app.delete('/api/agenda/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await c.env.DB.prepare(`DELETE FROM agenda WHERE id = ?`).bind(id).run()
    return c.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar evento:', error)
    return c.json({ error: 'Erro ao deletar evento' }, 500)
  }
})

// ============================================
// ROTAS DE API - SOLICITAÇÕES
// ============================================

/**
 * GET /api/solicitacoes
 */
app.get('/api/solicitacoes', async (c) => {
  try {
    const status = c.req.query('status') || 'pendente'
    const result = await c.env.DB.prepare(`
      SELECT * FROM solicitacoes 
      WHERE status = ? 
      ORDER BY created_at DESC
    `).bind(status).all()
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao listar solicitações:', error)
    return c.json({ error: 'Erro ao listar solicitações' }, 500)
  }
})

/**
 * POST /api/solicitacoes
 */
app.post('/api/solicitacoes', async (c) => {
  try {
    const data = await c.req.json()
    
    const result = await c.env.DB.prepare(`
      INSERT INTO solicitacoes (
        candidato_id, tipo, nome, telefone, email, municipio, dados_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.candidato_id || null,
      data.tipo,
      data.nome,
      data.telefone || null,
      data.email || null,
      data.municipio || null,
      JSON.stringify(data.dados || {})
    ).run()

    return c.json({ id: result.meta.last_row_id, ...data })
  } catch (error) {
    console.error('Erro ao criar solicitação:', error)
    return c.json({ error: 'Erro ao criar solicitação' }, 500)
  }
})

/**
 * POST /api/admin/solicitacoes/:id/aprovar
 */
app.post('/api/admin/solicitacoes/:id/aprovar', async (c) => {
  try {
    const id = c.req.param('id')
    const { avaliado_por } = await c.req.json()
    
    await c.env.DB.prepare(`
      UPDATE solicitacoes SET
        status = 'aprovado',
        avaliado_por = ?,
        updated_at = datetime('now')
      WHERE id = ?
    `).bind(avaliado_por, id).run()

    return c.json({ success: true, id, status: 'aprovado' })
  } catch (error) {
    console.error('Erro ao aprovar solicitação:', error)
    return c.json({ error: 'Erro ao aprovar solicitação' }, 500)
  }
})

/**
 * POST /api/admin/solicitacoes/:id/rejeitar
 */
app.post('/api/admin/solicitacoes/:id/rejeitar', async (c) => {
  try {
    const id = c.req.param('id')
    const { avaliado_por, motivo_rejeicao } = await c.req.json()
    
    await c.env.DB.prepare(`
      UPDATE solicitacoes SET
        status = 'rejeitado',
        avaliado_por = ?,
        motivo_rejeicao = ?,
        updated_at = datetime('now')
      WHERE id = ?
    `).bind(avaliado_por, motivo_rejeicao || null, id).run()

    return c.json({ success: true, id, status: 'rejeitado' })
  } catch (error) {
    console.error('Erro ao rejeitar solicitação:', error)
    return c.json({ error: 'Erro ao rejeitar solicitação' }, 500)
  }
})

// ============================================
// ROTAS DE API - DADOS ELEITORAIS
// ============================================

/**
 * GET /api/dados-eleitorais/:candidatoId
 */
app.get('/api/dados-eleitorais/:candidatoId', async (c) => {
  try {
    const candidatoId = c.req.param('candidatoId')
    const result = await c.env.DB.prepare(`
      SELECT * FROM dados_eleitorais 
      WHERE candidato_id = ?
    `).bind(candidatoId).all()
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao listar dados eleitorais:', error)
    return c.json({ error: 'Erro ao listar dados eleitorais' }, 500)
  }
})

/**
 * POST /api/dados-eleitorais
 */
app.post('/api/dados-eleitorais', async (c) => {
  try {
    const data = await c.req.json()
    
    const result = await c.env.DB.prepare(`
      INSERT INTO dados_eleitorais (
        candidato_id, municipio, zona, secao, total_eleitores, 
        eleitores_apoio, percentual_apoio, observacoes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.candidato_id,
      data.municipio,
      data.zona || null,
      data.secao || null,
      data.total_eleitores || 0,
      data.eleitores_apoio || 0,
      data.percentual_apoio || 0,
      data.observacoes || null
    ).run()

    return c.json({ id: result.meta.last_row_id, ...data })
  } catch (error) {
    console.error('Erro ao criar dados eleitorais:', error)
    return c.json({ error: 'Erro ao criar dados eleitorais' }, 500)
  }
})

/**
 * DELETE /api/dados-eleitorais/:id
 */
app.delete('/api/dados-eleitorais/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await c.env.DB.prepare(`DELETE FROM dados_eleitorais WHERE id = ?`).bind(id).run()
    return c.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar dados eleitorais:', error)
    return c.json({ error: 'Erro ao deletar dados eleitorais' }, 500)
  }
})

// ============================================
// ROTAS DE API - AJUDA ELEITORAL
// ============================================

app.get('/api/ajuda-eleitoral', async (c) => {
  try {
    const result = await c.env.DB.prepare(`
      SELECT * FROM ajuda_eleitoral 
      ORDER BY created_at DESC
    `).all()
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao listar ajuda eleitoral:', error)
    return c.json({ error: 'Erro ao listar ajuda eleitoral' }, 500)
  }
})

// ============================================
// ROTAS DE API - USUÁRIOS (ADMIN)
// ============================================

/**
 * GET /api/usuarios
 */
app.get('/api/usuarios', async (c) => {
  try {
    const result = await c.env.DB.prepare(`
      SELECT id, email, nome, cargo, municipio, tipo, status, created_at
      FROM candidatos
      ORDER BY created_at DESC
    `).all()
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao listar usuários:', error)
    return c.json({ error: 'Erro ao listar usuários' }, 500)
  }
})

/**
 * POST /api/usuarios
 */
app.post('/api/usuarios', async (c) => {
  try {
    const data = await c.req.json()
    
    const result = await c.env.DB.prepare(`
      INSERT INTO candidatos (
        email, senha, nome, cargo, municipio, tipo, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.email,
      data.senha || 'senha123',
      data.nome,
      data.cargo || null,
      data.municipio || null,
      data.tipo || 'operacional',
      data.status || 'ativo'
    ).run()

    return c.json({ id: result.meta.last_row_id, ...data, senha: undefined })
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    return c.json({ error: 'Erro ao criar usuário' }, 500)
  }
})

/**
 * PUT /api/usuarios/:id
 */
app.put('/api/usuarios/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const data = await c.req.json()
    
    await c.env.DB.prepare(`
      UPDATE candidatos SET
        nome = ?, cargo = ?, municipio = ?, tipo = ?, status = ?,
        updated_at = datetime('now')
      WHERE id = ?
    `).bind(
      data.nome,
      data.cargo || null,
      data.municipio || null,
      data.tipo,
      data.status,
      id
    ).run()

    return c.json({ id, ...data })
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    return c.json({ error: 'Erro ao atualizar usuário' }, 500)
  }
})

/**
 * POST /api/usuarios/:id/resetar-senha
 */
app.post('/api/usuarios/:id/resetar-senha', async (c) => {
  try {
    const id = c.req.param('id')
    const { senha } = await c.req.json()
    
    await c.env.DB.prepare(`
      UPDATE candidatos SET senha = ? WHERE id = ?
    `).bind(senha, id).run()

    return c.json({ success: true })
  } catch (error) {
    console.error('Erro ao resetar senha:', error)
    return c.json({ error: 'Erro ao resetar senha' }, 500)
  }
})

/**
 * DELETE /api/usuarios/:id
 */
app.delete('/api/usuarios/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await c.env.DB.prepare(`DELETE FROM candidatos WHERE id = ?`).bind(id).run()
    return c.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar usuário:', error)
    return c.json({ error: 'Erro ao deletar usuário' }, 500)
  }
})

// ============================================
// ROTAS PLACEHOLDER - RELATÓRIOS
// ============================================

// IMPORTANTE: Rotas específicas devem vir ANTES de rotas com parâmetros dinâmicos
// Relatório de Hierarquia (ESPECÍFICO)
app.get('/api/relatorios/hierarquia', async (c) => {
  try {
    const candidatoId = c.req.header('X-Candidato-Id') || '1'
    console.log('📊 Carregando hierarquia para candidato:', candidatoId)
    
    // Resumo geral
    const resumo = await c.env.DB.prepare(`
      SELECT 
        (SELECT COUNT(*) FROM coordenadores WHERE candidato_id = ?) as total_coordenadores,
        (SELECT COUNT(*) FROM liderancas WHERE candidato_id = ?) as total_liderancas,
        (SELECT COUNT(*) FROM eleitores WHERE candidato_id = ?) as total_eleitores,
        (SELECT SUM(qtd_eleitores_captados) FROM coordenadores WHERE candidato_id = ?) as total_captacoes
    `).bind(candidatoId, candidatoId, candidatoId, candidatoId).first()
    
    console.log('✅ Resumo:', resumo)
    
    // Performance por coordenador
    const coordenadores = await c.env.DB.prepare(`
      SELECT 
        coord.id,
        coord.nome,
        coord.municipio,
        coord.telefone,
        coord.email,
        coord.meta_liderancas,
        coord.meta_eleitores,
        coord.qtd_liderancas,
        coord.qtd_eleitores_captados,
        ROUND(CAST(coord.qtd_liderancas AS REAL) / CAST(NULLIF(coord.meta_liderancas, 0) AS REAL) * 100, 2) as percentual_meta_liderancas,
        ROUND(CAST(coord.qtd_eleitores_captados AS REAL) / CAST(NULLIF(coord.meta_eleitores, 0) AS REAL) * 100, 2) as percentual_meta_eleitores,
        (SELECT COUNT(*) FROM eleitores WHERE coordenador_id = coord.id AND confirmado = 1) as eleitores_confirmados
      FROM coordenadores coord
      WHERE coord.candidato_id = ?
      ORDER BY coord.qtd_eleitores_captados DESC
    `).bind(candidatoId).all()
    
    console.log('✅ Coordenadores:', coordenadores.results?.length || 0)
    
    // Top 10 lideranças
    const topLiderancas = await c.env.DB.prepare(`
      SELECT 
        l.id,
        l.nome,
        l.municipio,
        l.telefone,
        l.qtd_eleitores,
        l.qtd_eleitores_confirmados,
        l.meta_eleitores,
        coord.nome as coordenador_nome,
        ROUND(CAST(l.qtd_eleitores AS REAL) / CAST(NULLIF(l.meta_eleitores, 0) AS REAL) * 100, 2) as percentual_meta
      FROM liderancas l
      LEFT JOIN coordenadores coord ON coord.id = l.coordenador_id
      WHERE l.candidato_id = ?
      ORDER BY l.qtd_eleitores DESC
      LIMIT 10
    `).bind(candidatoId).all()
    
    console.log('✅ Lideranças:', topLiderancas.results?.length || 0)
    
    const response = {
      resumo: resumo || {},
      coordenadores: coordenadores.results || [],
      topLiderancas: topLiderancas.results || []
    }
    
    console.log('📤 Enviando resposta hierarquia')
    return c.json(response)
  } catch (error) {
    console.error('❌ Erro ao gerar relatório de hierarquia:', error)
    return c.json({ 
      resumo: {},
      coordenadores: [],
      topLiderancas: [],
      error: 'Erro ao gerar relatório de hierarquia' 
    }, 500)
  }
})

// Relatórios genéricos (DINÂMICO - deve vir DEPOIS das rotas específicas)
app.get('/api/relatorios/:candidatoId', async (c) => {
  return c.json([])
})

app.get('/api/solicitacoes', async (c) => {
  const status = c.req.query('status') || 'pendente'
  const result = await c.env.DB.prepare(`SELECT * FROM solicitacoes WHERE status = ? ORDER BY created_at DESC`).bind(status).all()
  return c.json(result.results || [])
})

// Placeholder TSE
app.get('/api/tse/stats', async (c) => {
  return c.json({ perfil_eleitorado: 0, candidatos: 0, votacao: 0, zonas: 0 })
})

app.get('/api/tse/candidatos', async (c) => {
  const result = await c.env.DB.prepare(`SELECT * FROM tse_candidatos LIMIT 100`).all()
  return c.json(result.results || [])
})

// ============================================
// ROTAS: TERRITÓRIOS DE IDENTIDADE
// ============================================

// Listar todos os territórios
app.get('/api/territorios', async (c) => {
  try {
    const result = await c.env.DB.prepare(`
      SELECT id, codigo, nome, regiao, total_municipios, populacao_estimada, 
             area_km2, pib_milhoes, created_at 
      FROM territorios 
      ORDER BY codigo
    `).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao listar territórios:', error)
    return c.json({ error: 'Erro ao listar territórios' }, 500)
  }
})

// Buscar território por ID
app.get('/api/territorios/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const result = await c.env.DB.prepare(`
      SELECT * FROM territorios WHERE id = ?
    `).bind(id).first()
    
    if (!result) {
      return c.json({ error: 'Território não encontrado' }, 404)
    }
    
    return c.json(result)
  } catch (error) {
    console.error('Erro ao buscar território:', error)
    return c.json({ error: 'Erro ao buscar território' }, 500)
  }
})

// Listar municípios de um território
app.get('/api/territorios/:id/municipios', async (c) => {
  try {
    const id = c.req.param('id')
    
    const result = await c.env.DB.prepare(`
      SELECT tm.*, t.nome as territorio_nome 
      FROM territorios_municipios tm
      LEFT JOIN territorios t ON t.id = tm.territorio_id
      WHERE tm.territorio_id = ?
      ORDER BY tm.nome_municipio
    `).bind(id).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao listar municípios:', error)
    return c.json({ error: 'Erro ao listar municípios' }, 500)
  }
})

// Buscar cobertura de um território para um candidato
app.get('/api/territorios/:id/cobertura/:candidatoId', async (c) => {
  try {
    const territorioId = c.req.param('id')
    const candidatoId = c.req.param('candidatoId')
    
    // Buscar cobertura existente ou criar uma vazia
    let cobertura = await c.env.DB.prepare(`
      SELECT * FROM territorios_cobertura 
      WHERE territorio_id = ? AND candidato_id = ?
    `).bind(territorioId, candidatoId).first()
    
    // Se não existe, calcular dinamicamente
    if (!cobertura) {
      const stats = await c.env.DB.prepare(`
        SELECT 
          COUNT(DISTINCT l.id) as total_liderancas,
          COUNT(DISTINCT c.id) as total_coordenadores,
          COUNT(DISTINCT l.municipio) as municipios_cobertos
        FROM liderancas l
        LEFT JOIN coordenadores c ON c.candidato_id = l.candidato_id
        WHERE l.candidato_id = ?
      `).bind(candidatoId).first()
      
      cobertura = {
        territorio_id: parseInt(territorioId),
        candidato_id: parseInt(candidatoId),
        total_liderancas: stats?.total_liderancas || 0,
        total_coordenadores: stats?.total_coordenadores || 0,
        municipios_cobertos: stats?.municipios_cobertos || 0,
        percentual_cobertura: 0,
        influencia_estimada: 0
      }
    }
    
    return c.json(cobertura)
  } catch (error) {
    console.error('Erro ao buscar cobertura:', error)
    return c.json({ error: 'Erro ao buscar cobertura' }, 500)
  }
})

// Listar metas de um território para um candidato
app.get('/api/territorios/:id/metas/:candidatoId', async (c) => {
  try {
    const territorioId = c.req.param('id')
    const candidatoId = c.req.param('candidatoId')
    
    const result = await c.env.DB.prepare(`
      SELECT * FROM territorios_metas 
      WHERE territorio_id = ? AND candidato_id = ?
      ORDER BY prazo
    `).bind(territorioId, candidatoId).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao listar metas:', error)
    return c.json({ error: 'Erro ao listar metas' }, 500)
  }
})

// Estatísticas de eleitores por município (para Territórios)
app.get('/api/territorios/estatisticas/:candidatoId', async (c) => {
  try {
    const candidatoId = c.req.param('candidatoId')
    console.log('📊 Carregando estatísticas de eleitores por município para candidato:', candidatoId)
    
    // Contar eleitores por município
    const result = await c.env.DB.prepare(`
      SELECT 
        municipio,
        COUNT(*) as total_eleitores,
        SUM(CASE WHEN confirmado = 1 THEN 1 ELSE 0 END) as eleitores_confirmados,
        SUM(CASE WHEN status_apoio = 'militante' THEN 1 ELSE 0 END) as militantes,
        SUM(CASE WHEN status_apoio = 'apoiador' THEN 1 ELSE 0 END) as apoiadores,
        SUM(CASE WHEN compareceu_evento = 1 THEN 1 ELSE 0 END) as compareceram_eventos
      FROM eleitores
      WHERE candidato_id = ?
      GROUP BY municipio
      ORDER BY total_eleitores DESC
    `).bind(candidatoId).all()
    
    console.log('✅ Estatísticas carregadas:', result.results?.length || 0, 'municípios')
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('❌ Erro ao carregar estatísticas:', error)
    return c.json({ error: 'Erro ao carregar estatísticas' }, 500)
  }
})

// Criar meta para um território
app.post('/api/territorios/:id/metas', async (c) => {
  try {
    const territorioId = c.req.param('id')
    const { candidato_id, meta_liderancas, meta_coordenadores, meta_eventos, prazo, observacoes } = await c.req.json()
    
    const result = await c.env.DB.prepare(`
      INSERT INTO territorios_metas 
        (territorio_id, candidato_id, meta_liderancas, meta_coordenadores, meta_eventos, prazo, observacoes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      territorioId,
      candidato_id,
      meta_liderancas || 0,
      meta_coordenadores || 0,
      meta_eventos || 0,
      prazo || null,
      observacoes || null
    ).run()
    
    return c.json({ id: result.meta.last_row_id, territorio_id: territorioId })
  } catch (error) {
    console.error('Erro ao criar meta:', error)
    return c.json({ error: 'Erro ao criar meta' }, 500)
  }
})

// Atualizar meta
app.put('/api/territorios/metas/:metaId', async (c) => {
  try {
    const metaId = c.req.param('metaId')
    const { meta_liderancas, meta_coordenadores, meta_eventos, prazo, status, observacoes } = await c.req.json()
    
    await c.env.DB.prepare(`
      UPDATE territorios_metas SET
        meta_liderancas = ?,
        meta_coordenadores = ?,
        meta_eventos = ?,
        prazo = ?,
        status = ?,
        observacoes = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      meta_liderancas,
      meta_coordenadores,
      meta_eventos,
      prazo,
      status || 'ativa',
      observacoes,
      metaId
    ).run()
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Erro ao atualizar meta:', error)
    return c.json({ error: 'Erro ao atualizar meta' }, 500)
  }
})

// Dashboard de territórios - resumo geral
app.get('/api/territorios/dashboard/:candidatoId', async (c) => {
  try {
    const candidatoId = c.req.param('candidatoId')
    
    // Buscar estatísticas gerais
    const stats = await c.env.DB.prepare(`
      SELECT 
        COUNT(DISTINCT t.id) as total_territorios,
        COUNT(DISTINCT tm.id) as total_municipios,
        SUM(t.populacao_estimada) as populacao_total
      FROM territorios t
      LEFT JOIN territorios_municipios tm ON tm.territorio_id = t.id
    `).first()
    
    // Buscar coberturas
    const coberturas = await c.env.DB.prepare(`
      SELECT tc.*, t.nome as territorio_nome
      FROM territorios_cobertura tc
      LEFT JOIN territorios t ON t.id = tc.territorio_id
      WHERE tc.candidato_id = ?
      ORDER BY tc.percentual_cobertura DESC
    `).bind(candidatoId).all()
    
    // Buscar metas ativas
    const metas = await c.env.DB.prepare(`
      SELECT tm.*, t.nome as territorio_nome
      FROM territorios_metas tm
      LEFT JOIN territorios t ON t.id = tm.territorio_id
      WHERE tm.candidato_id = ? AND tm.status = 'ativa'
      ORDER BY tm.prazo
    `).bind(candidatoId).all()
    
    return c.json({
      stats,
      coberturas: coberturas.results || [],
      metas: metas.results || []
    })
  } catch (error) {
    console.error('Erro ao buscar dashboard:', error)
    return c.json({ error: 'Erro ao buscar dashboard' }, 500)
  }
})

// ============================================
// ROTAS: ANÁLISE DE COBERTURA E PERFORMANCE
// ============================================

// Análise de cobertura por município
app.get('/api/analise/cobertura-municipio/:candidatoId', async (c) => {
  try {
    const candidatoId = c.req.param('candidatoId')
    
    const result = await c.env.DB.prepare(`
      SELECT * FROM view_cobertura_municipio 
      WHERE candidato_id = ?
      ORDER BY total_influenciados DESC
    `).bind(candidatoId).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao buscar cobertura:', error)
    return c.json({ error: 'Erro ao buscar cobertura' }, 500)
  }
})

// Análise de cobertura por território
app.get('/api/analise/cobertura-territorio/:candidatoId', async (c) => {
  try {
    const candidatoId = c.req.param('candidatoId')
    
    const result = await c.env.DB.prepare(`
      SELECT * FROM view_cobertura_territorio 
      WHERE candidato_id = ?
      ORDER BY percentual_municipios_cobertos DESC
    `).bind(candidatoId).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao buscar cobertura por território:', error)
    return c.json({ error: 'Erro ao buscar cobertura por território' }, 500)
  }
})

// Análise de performance por município
app.get('/api/analise/performance/:candidatoId', async (c) => {
  try {
    const candidatoId = c.req.param('candidatoId')
    
    const result = await c.env.DB.prepare(`
      SELECT * FROM view_performance_municipio 
      WHERE candidato_id = ?
      ORDER BY percentual_cobertura DESC
    `).bind(candidatoId).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao buscar performance:', error)
    return c.json({ error: 'Erro ao buscar performance' }, 500)
  }
})

// Municípios prioritários (baixa cobertura + alto eleitorado)
app.get('/api/analise/municipios-prioritarios/:candidatoId', async (c) => {
  try {
    const candidatoId = c.req.param('candidatoId')
    
    const result = await c.env.DB.prepare(`
      SELECT 
        p.*,
        CASE
          WHEN p.eleitores_municipio > 50000 AND p.percentual_cobertura < 5 THEN 'CRÍTICO'
          WHEN p.eleitores_municipio > 20000 AND p.percentual_cobertura < 10 THEN 'ALTO'
          WHEN p.eleitores_municipio > 10000 AND p.percentual_cobertura < 15 THEN 'MÉDIO'
          ELSE 'BAIXO'
        END AS nivel_prioridade,
        (p.eleitores_municipio - p.total_influenciados) AS gap_cobertura
      FROM view_performance_municipio p
      WHERE p.candidato_id = ?
      ORDER BY 
        CASE
          WHEN p.eleitores_municipio > 50000 AND p.percentual_cobertura < 5 THEN 1
          WHEN p.eleitores_municipio > 20000 AND p.percentual_cobertura < 10 THEN 2
          WHEN p.eleitores_municipio > 10000 AND p.percentual_cobertura < 15 THEN 3
          ELSE 4
        END,
        p.eleitores_municipio DESC
    `).bind(candidatoId).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao buscar municípios prioritários:', error)
    return c.json({ error: 'Erro ao buscar municípios prioritários' }, 500)
  }
})

// Top 10 municípios com melhor cobertura
app.get('/api/analise/top-municipios/:candidatoId', async (c) => {
  try {
    const candidatoId = c.req.param('candidatoId')
    
    const result = await c.env.DB.prepare(`
      SELECT * FROM view_performance_municipio 
      WHERE candidato_id = ? AND percentual_cobertura > 0
      ORDER BY percentual_cobertura DESC
      LIMIT 10
    `).bind(candidatoId).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao buscar top municípios:', error)
    return c.json({ error: 'Erro ao buscar top municípios' }, 500)
  }
})

// Comparativo entre territórios
app.get('/api/analise/comparativo-territorios/:candidatoId', async (c) => {
  try {
    const candidatoId = c.req.param('candidatoId')
    
    const result = await c.env.DB.prepare(`
      SELECT 
        vct.*,
        ROUND(CAST(vct.total_influenciados AS REAL) / NULLIF(vct.municipios_com_lideranca, 0), 2) AS media_influencia_municipio
      FROM view_cobertura_territorio vct
      WHERE vct.candidato_id = ?
      ORDER BY vct.total_influenciados DESC
    `).bind(candidatoId).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao buscar comparativo:', error)
    return c.json({ error: 'Erro ao buscar comparativo' }, 500)
  }
})

// ============================================
// ROTAS BI - ANÁLISE DE INVESTIMENTO
// ============================================

// Relatório BI: Onde investir? (Análise de prioridade por território)
app.get('/api/bi/investimento-territorios', async (c) => {
  try {
    const result = await c.env.DB.prepare(`
      SELECT * FROM view_bi_investimento_territorio
      ORDER BY 
        CASE prioridade_investimento
          WHEN 'ALTÍSSIMA PRIORIDADE' THEN 1
          WHEN 'ALTA PRIORIDADE' THEN 2
          WHEN 'MÉDIA PRIORIDADE' THEN 3
          ELSE 4
        END,
        total_eleitores DESC
    `).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao buscar análise de investimento:', error)
    return c.json({ error: 'Erro ao buscar análise de investimento' }, 500)
  }
})

// BI: Análise específica de um território
app.get('/api/bi/investimento-territorio/:territorioId', async (c) => {
  try {
    const territorioId = c.req.param('territorioId')
    
    const result = await c.env.DB.prepare(`
      SELECT * FROM view_bi_investimento_territorio
      WHERE territorio_id = ?
    `).bind(territorioId).all()
    
    if (!result.results || result.results.length === 0) {
      return c.json({ error: 'Território não encontrado' }, 404)
    }
    
    return c.json(result.results[0])
  } catch (error) {
    console.error('Erro ao buscar análise de território:', error)
    return c.json({ error: 'Erro ao buscar análise de território' }, 500)
  }
})

// BI: Top territórios prioritários (maior potencial de crescimento)
app.get('/api/bi/territorios-prioritarios', async (c) => {
  try {
    const limit = c.req.query('limit') || '10'
    
    const result = await c.env.DB.prepare(`
      SELECT * FROM view_bi_investimento_territorio
      WHERE prioridade_investimento IN ('ALTÍSSIMA PRIORIDADE', 'ALTA PRIORIDADE')
      ORDER BY percentual_potencial_crescimento DESC, total_eleitores DESC
      LIMIT ?
    `).bind(parseInt(limit)).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao buscar territórios prioritários:', error)
    return c.json({ error: 'Erro ao buscar territórios prioritários' }, 500)
  }
})

// BI: Dashboard executivo - Visão geral estratégica
app.get('/api/bi/dashboard-executivo', async (c) => {
  try {
    // Estatísticas gerais
    const stats = await c.env.DB.prepare(`
      SELECT 
        COUNT(*) as total_territorios,
        SUM(total_eleitores) as total_eleitores_bahia,
        SUM(eleitores_mobilizados_atuais) as total_mobilizados,
        SUM(potencial_crescimento_eleitores) as total_potencial,
        ROUND(CAST(SUM(eleitores_mobilizados_atuais) AS REAL) / CAST(SUM(total_eleitores) AS REAL) * 100, 2) as percentual_cobertura_geral
      FROM view_bi_investimento_territorio
    `).all()
    
    // Distribuição por prioridade
    const prioridades = await c.env.DB.prepare(`
      SELECT 
        prioridade_investimento,
        COUNT(*) as quantidade_territorios,
        SUM(total_eleitores) as total_eleitores,
        SUM(potencial_crescimento_eleitores) as potencial_crescimento
      FROM view_bi_investimento_territorio
      GROUP BY prioridade_investimento
      ORDER BY 
        CASE prioridade_investimento
          WHEN 'ALTÍSSIMA PRIORIDADE' THEN 1
          WHEN 'ALTA PRIORIDADE' THEN 2
          WHEN 'MÉDIA PRIORIDADE' THEN 3
          ELSE 4
        END
    `).all()
    
    // Top 5 maiores oportunidades
    const oportunidades = await c.env.DB.prepare(`
      SELECT 
        territorio_nome,
        total_eleitores,
        eleitores_mobilizados_atuais,
        potencial_crescimento_eleitores,
        percentual_potencial_crescimento,
        prioridade_investimento
      FROM view_bi_investimento_territorio
      ORDER BY potencial_crescimento_eleitores DESC
      LIMIT 5
    `).all()
    
    return c.json({
      estatisticas_gerais: stats.results?.[0] || {},
      distribuicao_prioridades: prioridades.results || [],
      maiores_oportunidades: oportunidades.results || []
    })
  } catch (error) {
    console.error('Erro ao buscar dashboard executivo:', error)
    return c.json({ error: 'Erro ao buscar dashboard executivo' }, 500)
  }
})

// BI: Comparativo de ROI (Return on Investment) - Qual região traz mais retorno?
app.get('/api/bi/roi-territorios', async (c) => {
  try {
    const result = await c.env.DB.prepare(`
      SELECT 
        territorio_id,
        territorio_nome,
        total_eleitores,
        liderancas_atuais,
        eleitores_mobilizados_atuais,
        CASE 
          WHEN liderancas_atuais > 0 THEN ROUND(CAST(eleitores_mobilizados_atuais AS REAL) / CAST(liderancas_atuais AS REAL), 2)
          ELSE 0
        END AS media_eleitores_por_lideranca,
        percentual_cobertura_atual,
        prioridade_investimento,
        CASE
          WHEN liderancas_atuais > 0 AND CAST(eleitores_mobilizados_atuais AS REAL) / CAST(liderancas_atuais AS REAL) > 500 THEN 'ROI ALTO'
          WHEN liderancas_atuais > 0 AND CAST(eleitores_mobilizados_atuais AS REAL) / CAST(liderancas_atuais AS REAL) > 200 THEN 'ROI MÉDIO'
          WHEN liderancas_atuais > 0 THEN 'ROI BAIXO'
          ELSE 'SEM DADOS'
        END AS classificacao_roi
      FROM view_bi_investimento_territorio
      ORDER BY media_eleitores_por_lideranca DESC
    `).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao buscar ROI de territórios:', error)
    return c.json({ error: 'Erro ao buscar ROI de territórios' }, 500)
  }
})

// ============================================
// ROTAS: ELEITORES (com hierarquia)
// ============================================

/**
 * GET /api/eleitores
 * Lista todos os eleitores do candidato
 */
app.get('/api/eleitores', async (c) => {
  try {
    const candidatoId = c.req.header('X-Candidato-Id') || '1'
    
    const result = await c.env.DB.prepare(`
      SELECT 
        e.*,
        l.nome as lideranca_nome,
        coord.nome as coordenador_nome
      FROM eleitores e
      LEFT JOIN liderancas l ON l.id = e.lideranca_id
      LEFT JOIN coordenadores coord ON coord.id = e.coordenador_id
      WHERE e.candidato_id = ?
      ORDER BY e.created_at DESC
    `).bind(candidatoId).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao listar eleitores:', error)
    return c.json({ error: 'Erro ao listar eleitores' }, 500)
  }
})

/**
 * GET /api/eleitores/:id
 * Busca um eleitor específico
 */
app.get('/api/eleitores/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    const result = await c.env.DB.prepare(`
      SELECT 
        e.*,
        l.nome as lideranca_nome,
        l.telefone as lideranca_telefone,
        coord.nome as coordenador_nome,
        coord.telefone as coordenador_telefone
      FROM eleitores e
      LEFT JOIN liderancas l ON l.id = e.lideranca_id
      LEFT JOIN coordenadores coord ON coord.id = e.coordenador_id
      WHERE e.id = ?
    `).bind(id).first()
    
    return c.json(result || {})
  } catch (error) {
    console.error('Erro ao buscar eleitor:', error)
    return c.json({ error: 'Erro ao buscar eleitor' }, 500)
  }
})

/**
 * POST /api/eleitores
 * Cria um novo eleitor (sempre vinculado a uma liderança)
 */
app.post('/api/eleitores', async (c) => {
  try {
    const data = await c.req.json()
    
    // Validar campos obrigatórios
    if (!data.lideranca_id || !data.nome || !data.municipio) {
      return c.json({ 
        error: 'Campos obrigatórios: lideranca_id, nome, municipio' 
      }, 400)
    }
    
    // Buscar coordenador_id da liderança
    const lideranca = await c.env.DB.prepare(`
      SELECT coordenador_id FROM liderancas WHERE id = ?
    `).bind(data.lideranca_id).first()
    
    const result = await c.env.DB.prepare(`
      INSERT INTO eleitores (
        candidato_id, lideranca_id, coordenador_id,
        nome, cpf, telefone, email,
        municipio, bairro, zona, secao,
        titulo_eleitor, local_votacao,
        status_apoio, nivel_engajamento, confirmado, compareceu_evento,
        observacoes, tags, data_captacao
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.candidato_id || 1,
      data.lideranca_id,
      lideranca?.coordenador_id || null,
      data.nome,
      data.cpf || null,
      data.telefone || null,
      data.email || null,
      data.municipio,
      data.bairro || null,
      data.zona || null,
      data.secao || null,
      data.titulo_eleitor || null,
      data.local_votacao || null,
      data.status_apoio || 'simpatizante',
      data.nivel_engajamento || 'baixo',
      data.confirmado || 0,
      data.compareceu_evento || 0,
      data.observacoes || null,
      data.tags || null,
      data.data_captacao || new Date().toISOString().split('T')[0]
    ).run()
    
    // Atualizar contador na liderança
    await c.env.DB.prepare(`
      UPDATE liderancas 
      SET qtd_eleitores = qtd_eleitores + 1,
          qtd_eleitores_confirmados = qtd_eleitores_confirmados + ?
      WHERE id = ?
    `).bind(data.confirmado || 0, data.lideranca_id).run()
    
    // Atualizar contador no coordenador
    if (lideranca?.coordenador_id) {
      await c.env.DB.prepare(`
        UPDATE coordenadores 
        SET qtd_eleitores_captados = qtd_eleitores_captados + 1
        WHERE id = ?
      `).bind(lideranca.coordenador_id).run()
    }
    
    return c.json({ 
      id: result.meta.last_row_id,
      ...data
    })
  } catch (error) {
    console.error('Erro ao criar eleitor:', error)
    return c.json({ error: 'Erro ao criar eleitor' }, 500)
  }
})

/**
 * PUT /api/eleitores/:id
 * Atualiza um eleitor
 */
app.put('/api/eleitores/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const data = await c.req.json()
    
    // Buscar eleitor atual
    const eleitorAtual = await c.env.DB.prepare(`
      SELECT * FROM eleitores WHERE id = ?
    `).bind(id).first()
    
    if (!eleitorAtual) {
      return c.json({ error: 'Eleitor não encontrado' }, 404)
    }
    
    await c.env.DB.prepare(`
      UPDATE eleitores SET
        nome = ?,
        cpf = ?,
        telefone = ?,
        email = ?,
        municipio = ?,
        bairro = ?,
        zona = ?,
        secao = ?,
        titulo_eleitor = ?,
        local_votacao = ?,
        status_apoio = ?,
        nivel_engajamento = ?,
        confirmado = ?,
        compareceu_evento = ?,
        observacoes = ?,
        tags = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      data.nome || eleitorAtual.nome,
      data.cpf || eleitorAtual.cpf,
      data.telefone || eleitorAtual.telefone,
      data.email || eleitorAtual.email,
      data.municipio || eleitorAtual.municipio,
      data.bairro || eleitorAtual.bairro,
      data.zona || eleitorAtual.zona,
      data.secao || eleitorAtual.secao,
      data.titulo_eleitor || eleitorAtual.titulo_eleitor,
      data.local_votacao || eleitorAtual.local_votacao,
      data.status_apoio || eleitorAtual.status_apoio,
      data.nivel_engajamento || eleitorAtual.nivel_engajamento,
      data.confirmado !== undefined ? data.confirmado : eleitorAtual.confirmado,
      data.compareceu_evento !== undefined ? data.compareceu_evento : eleitorAtual.compareceu_evento,
      data.observacoes || eleitorAtual.observacoes,
      data.tags || eleitorAtual.tags,
      id
    ).run()
    
    // Atualizar contador de confirmados na liderança (se mudou status)
    if (data.confirmado !== undefined && data.confirmado !== eleitorAtual.confirmado) {
      const delta = data.confirmado - eleitorAtual.confirmado
      await c.env.DB.prepare(`
        UPDATE liderancas 
        SET qtd_eleitores_confirmados = qtd_eleitores_confirmados + ?
        WHERE id = ?
      `).bind(delta, eleitorAtual.lideranca_id).run()
    }
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Erro ao atualizar eleitor:', error)
    return c.json({ error: 'Erro ao atualizar eleitor' }, 500)
  }
})

/**
 * DELETE /api/eleitores/:id
 * Remove um eleitor
 */
app.delete('/api/eleitores/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    // Buscar eleitor para atualizar contadores
    const eleitor = await c.env.DB.prepare(`
      SELECT lideranca_id, coordenador_id, confirmado FROM eleitores WHERE id = ?
    `).bind(id).first()
    
    if (eleitor) {
      // Atualizar contador na liderança
      await c.env.DB.prepare(`
        UPDATE liderancas 
        SET qtd_eleitores = qtd_eleitores - 1,
            qtd_eleitores_confirmados = qtd_eleitores_confirmados - ?
        WHERE id = ?
      `).bind(eleitor.confirmado || 0, eleitor.lideranca_id).run()
      
      // Atualizar contador no coordenador
      if (eleitor.coordenador_id) {
        await c.env.DB.prepare(`
          UPDATE coordenadores 
          SET qtd_eleitores_captados = qtd_eleitores_captados - 1
          WHERE id = ?
        `).bind(eleitor.coordenador_id).run()
      }
    }
    
    await c.env.DB.prepare('DELETE FROM eleitores WHERE id = ?').bind(id).run()
    
    return c.json({ success: true })
  } catch (error) {
    console.error('Erro ao deletar eleitor:', error)
    return c.json({ error: 'Erro ao deletar eleitor' }, 500)
  }
})

/**
 * GET /api/eleitores/lideranca/:liderancaId
 * Lista eleitores de uma liderança específica
 */
app.get('/api/eleitores/lideranca/:liderancaId', async (c) => {
  try {
    const liderancaId = c.req.param('liderancaId')
    
    const result = await c.env.DB.prepare(`
      SELECT * FROM eleitores 
      WHERE lideranca_id = ?
      ORDER BY created_at DESC
    `).bind(liderancaId).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao listar eleitores da liderança:', error)
    return c.json({ error: 'Erro ao listar eleitores da liderança' }, 500)
  }
})

/**
 * GET /api/eleitores/coordenador/:coordenadorId
 * Lista eleitores de um coordenador específico
 */
app.get('/api/eleitores/coordenador/:coordenadorId', async (c) => {
  try {
    const coordenadorId = c.req.param('coordenadorId')
    
    const result = await c.env.DB.prepare(`
      SELECT 
        e.*,
        l.nome as lideranca_nome
      FROM eleitores e
      LEFT JOIN liderancas l ON l.id = e.lideranca_id
      WHERE e.coordenador_id = ?
      ORDER BY e.created_at DESC
    `).bind(coordenadorId).all()
    
    return c.json(result.results || [])
  } catch (error) {
    console.error('Erro ao listar eleitores do coordenador:', error)
    return c.json({ error: 'Erro ao listar eleitores do coordenador' }, 500)
  }
})

// MÓDULO: PROJETOS (endpoint duplicado /api/relatorios/hierarquia removido)

// ============================================
// MÓDULO: PROJETOS
// ============================================

// GET - Listar todos os projetos
app.get('/api/projetos/:candidatoId', async (c) => {
  try {
    const { candidatoId } = c.req.param()
    const result = await c.env.DB.prepare(`
      SELECT * FROM projetos WHERE candidato_id = ? ORDER BY created_at DESC
    `).bind(candidatoId).all()
    return c.json(result.results || [])
  } catch (error) {
    return c.json({ error: 'Erro ao carregar projetos' }, 500)
  }
})

// POST - Criar novo projeto
app.post('/api/projetos', async (c) => {
  try {
    const data = await c.req.json()
    const result = await c.env.DB.prepare(`
      INSERT INTO projetos (candidato_id, nome, descricao, status, prioridade, data_inicio, data_fim, responsavel, orcamento, observacoes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(data.candidato_id, data.nome, data.descricao || '', data.status || 'planejamento', 
           data.prioridade || 'media', data.data_inicio || null, data.data_fim || null, 
           data.responsavel || '', data.orcamento || 0, data.observacoes || '').run()
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error) {
    return c.json({ error: 'Erro ao criar projeto' }, 500)
  }
})

// ============================================
// MÓDULO: GABINETE
// ============================================

// GET - Listar membros do gabinete
app.get('/api/gabinete/:candidatoId', async (c) => {
  try {
    const { candidatoId } = c.req.param()
    const result = await c.env.DB.prepare(`
      SELECT * FROM gabinete_membros WHERE candidato_id = ? ORDER BY 
      CASE cargo
        WHEN 'chefe' THEN 1
        WHEN 'assessor' THEN 2
        WHEN 'assistente' THEN 3
        WHEN 'auxiliar' THEN 4
        WHEN 'prestador' THEN 5
      END, nome
    `).bind(candidatoId).all()
    return c.json(result.results || [])
  } catch (error) {
    return c.json({ error: 'Erro ao carregar membros' }, 500)
  }
})

// POST - Adicionar membro ao gabinete
app.post('/api/gabinete', async (c) => {
  try {
    const data = await c.req.json()
    const result = await c.env.DB.prepare(`
      INSERT INTO gabinete_membros (candidato_id, nome, cpf, cargo, area, telefone, email, data_admissao, salario, observacoes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(data.candidato_id, data.nome, data.cpf || null, data.cargo, data.area || '', 
           data.telefone || '', data.email || '', data.data_admissao || null, 
           data.salario || 0, data.observacoes || '').run()
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error) {
    return c.json({ error: 'Erro ao adicionar membro' }, 500)
  }
})

// ============================================
// MÓDULO: FINANÇAS
// ============================================

// GET - Listar emendas
app.get('/api/financas/emendas/:candidatoId', async (c) => {
  try {
    const { candidatoId } = c.req.param()
    const result = await c.env.DB.prepare(`
      SELECT * FROM financas_emendas WHERE candidato_id = ? ORDER BY data_apresentacao DESC
    `).bind(candidatoId).all()
    return c.json(result.results || [])
  } catch (error) {
    return c.json({ error: 'Erro ao carregar emendas' }, 500)
  }
})

// POST - Criar emenda
app.post('/api/financas/emendas', async (c) => {
  try {
    const data = await c.req.json()
    const result = await c.env.DB.prepare(`
      INSERT INTO financas_emendas (candidato_id, numero, descricao, valor, tipo, status, municipio, area, data_apresentacao, observacoes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(data.candidato_id, data.numero, data.descricao || '', data.valor || 0, 
           data.tipo || 'individual', data.status || 'proposta', data.municipio || '', 
           data.area || '', data.data_apresentacao || null, data.observacoes || '').run()
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error) {
    return c.json({ error: 'Erro ao criar emenda' }, 500)
  }
})

// GET - Listar movimentações
app.get('/api/financas/movimentacoes/:candidatoId', async (c) => {
  try {
    const { candidatoId } = c.req.param()
    const result = await c.env.DB.prepare(`
      SELECT * FROM financas_movimentacoes WHERE candidato_id = ? ORDER BY data DESC
    `).bind(candidatoId).all()
    return c.json(result.results || [])
  } catch (error) {
    return c.json({ error: 'Erro ao carregar movimentações' }, 500)
  }
})

// POST - Criar movimentação
app.post('/api/financas/movimentacoes', async (c) => {
  try {
    const data = await c.req.json()
    const result = await c.env.DB.prepare(`
      INSERT INTO financas_movimentacoes (candidato_id, tipo, categoria, descricao, valor, data, forma_pagamento, observacoes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(data.candidato_id, data.tipo, data.categoria, data.descricao, data.valor || 0, 
           data.data, data.forma_pagamento || '', data.observacoes || '').run()
    return c.json({ success: true, id: result.meta.last_row_id })
  } catch (error) {
    return c.json({ error: 'Erro ao criar movimentação' }, 500)
  }
})

// GET - Dashboard financeiro
app.get('/api/financas/dashboard/:candidatoId', async (c) => {
  try {
    const { candidatoId } = c.req.param()
    
    const resumo = await c.env.DB.prepare(`
      SELECT 
        (SELECT COALESCE(SUM(valor), 0) FROM financas_emendas WHERE candidato_id = ?) as total_emendas,
        (SELECT COALESCE(SUM(valor), 0) FROM financas_movimentacoes WHERE candidato_id = ? AND tipo = 'receita') as total_receitas,
        (SELECT COALESCE(SUM(valor), 0) FROM financas_movimentacoes WHERE candidato_id = ? AND tipo = 'despesa') as total_despesas,
        (SELECT COUNT(*) FROM financas_emendas WHERE candidato_id = ?) as qtd_emendas,
        (SELECT COUNT(*) FROM financas_movimentacoes WHERE candidato_id = ?) as qtd_movimentacoes
    `).bind(candidatoId, candidatoId, candidatoId, candidatoId, candidatoId).first()
    
    return c.json(resumo || {})
  } catch (error) {
    return c.json({ error: 'Erro ao carregar dashboard' }, 500)
  }
})

// ============================================
// EXPORTAR APP
// ============================================
export default app
