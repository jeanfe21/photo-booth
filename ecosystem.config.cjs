// PM2 Ecosystem File
// Usage: pm2 start ecosystem.config.cjs

module.exports = {
  apps: [
    {
      name: 'photo-booth',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/photo-booth',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/pm2/photo-booth-error.log',
      out_file: '/var/log/pm2/photo-booth-out.log',
      log_file: '/var/log/pm2/photo-booth.log',
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      listen_timeout: 3000,
      kill_timeout: 5000,
      restart_delay: 4000,
      max_memory_restart: '1G',
      watch: false,
    },
  ],
};

