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
                logging: false,
            },
            client: null,
        },
        mariadb: {
            options: {
                host: 'localhost',
                port: 3306,
                database: 'dishly',
                dialect: 'mariadb',
                username: 'root',
                password: '',
                logging: true,
            },
            client: null,
        }
    }
}

export default config;