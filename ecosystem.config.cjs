module.exports = {
  apps: [
    {
      name: 'joao-silva',
      script: 'npx',
      args: 'wrangler pages dev dist --d1=meupolitico-joao-silva --local --ip 0.0.0.0 --port 3000',
      cwd: '/home/user/clientes/joao-silva',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
