module.exports = {
  apps: [
    {
      name: "forge-api",
      cwd: "/opt/component-forge",
      script: "pnpm",
      args: "run start:api",
      interpreter: "none",
      env: {
        NODE_ENV: "production",
        PORT: "3001",
      },
    },
  ],
};
