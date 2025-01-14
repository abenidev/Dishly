const config = {
    development: {
        postgres: {
            options: {
                host: 'localhost',
                port: 5432,
                database: 'dishly',
                dialect: 'postgres',
                username: 'postgres',
                password: 'admin',
            },
            client: null,
        }
    }
}

export default config;