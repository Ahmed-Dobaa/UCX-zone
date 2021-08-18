module.exports = {
  apps: [
    {
      name: 'ucxzone_back-end',
      script: './index.js',
      instance_var: 'INSTANCE_ID',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        'PORT': 3000,
        'NODE_ENV': 'development'
      },
      env_production: {
        'PORT': 8443,
        'NODE_ENV': 'production',
      }
    }
  ]
};
