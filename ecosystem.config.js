module.exports = {
    apps: [
        {
            name: "demo-project",
            script: "./bin/www",
            watch: true,
            ignore_watch: ["node_modules", "public", "logs"],
            env_local: {
                PORT: 8081,
                NODE_ENV: "local",
                DOMAIN_URL: "http://127.0.0.1:8081",
                DB_MONGO_URL: "mongodb+srv://root:root@cluster0.u6ctlke.mongodb.net/aws-project?retryWrites=true&w=majority",
                JWT_SECRET: "jsonwebtoken",
                SMTP_PORT: 587,
                SMTP_SERVICE: "gmail",
                SMTP_SECURE_CONNECTION: "",
                SMTP_AUTH_USER: "akashp.devstree@gmail.com",
                SMTP_AUTH_PASSWORD: "maarllbwusdpnvlr",
                SMTP_SOURCE_EMAIL: "akashp.devstree@gmail.com",
            },
        },
    ],
};
