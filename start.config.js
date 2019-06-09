// PM2启动文件入口
// pm2 start start.config.js --env production
module.exports = {
    apps : [
        {
          name: "fansmall",
          script: "./server/index.js",
          watch: false,
          env: {
              "PORT": 2806,
              "NODE_ENV": "development"
          },
          env_production: {
              "PORT": 2806,
              "NODE_ENV": "production",
          }
        }
    ]
  }
