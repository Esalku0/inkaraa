module.exports = {
    apps: [{
        name: 'inkaraa-backend',
        script: './Backend/server.js',
        instances: 1,
        autorestart: true,
        watch: true,
        max_memory_restart: '3G',
        env: {
            NODE_ENV: 'production',
            PORT: 8080,
        },
    }, ],
};