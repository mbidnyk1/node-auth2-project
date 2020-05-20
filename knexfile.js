// Update with your config settings.
// const pgConnection = process.env.DATABASE_URL || 'postgresql://postgres:pass@localhost/users'

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './db/auth.db3'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
      }
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds'
    }
  },

  production: {
    client: 'pg',
    // connection: pgConnection,
    connection: {
      host: process.env.POSTGRES_HOST || 'localhost',
      port: process.env.POSTGRES_PORT || 5432,
      database: process.env.POSTGRES_DATABASE || 'token',
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_USER_PW || 'pass'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};