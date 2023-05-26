module.exports = {
  apps: [
    {
      name: "mmpro",
      script: "npm",
      interpreter: "none",
      args: "run start",
      max_memory_restart: "1024M",
      env: {
        NODE_ENV: "production",
        APP_ENV: "production",
      },
    },
  ],
};
