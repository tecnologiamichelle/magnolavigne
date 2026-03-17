// PM2 Configuration for MeuPolitico.Digital - Cloudflare Pages Development
// Use: pm2 start ecosystem.config.cjs

module.exports = {
  apps: [
    {
      name: 'meupolitico-digital',
      script: 'npx',
      args: 'wrangler pages dev dist --d1=meupolitico-production --local --ip 0.0.0.0 --port 3000',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s'
    }
  ]
}
