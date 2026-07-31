/** PM2 process config for production VPS */
module.exports = {
  apps: [
    {
      name: "dttrucks",
      cwd: "/var/www/dttrucks",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000 -H 0.0.0.0",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        HOSTNAME: "0.0.0.0",
      },
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "1G",
    },
  ],
};
