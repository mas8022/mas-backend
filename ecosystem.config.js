module.exports = {
  apps: [
    {
      name: 'nest-app',
      script: 'dist/main.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT
      }
    }
  ]
};
