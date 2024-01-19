module.exports = {
    apps: [
      {
        name: "evoluscan-api",
        script: "node_modules/ts-node-dev/lib/bin.js",
        args: ["--respawn", "--transpile-only", "index.ts"],
        watch: ["index.ts", "src"], // Add any additional directories you want to watch for changes
        ignore_watch: ["node_modules"],
        instances: 2,
        exec_mode: "fork",
        autorestart: true,
        max_memory_restart: "1G",
        log_date_format: "YYYY-MM-DD HH:mm:ss",
        env: {
          NODE_ENV: "production",
          PORT: 5000,
        },
        env_development: {
          NODE_ENV: "development",
          PORT: 5000,
        },
      },
    ],
  };
  