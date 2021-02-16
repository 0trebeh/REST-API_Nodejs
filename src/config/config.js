module.exports = {
  PORT: process.env.PORT || 4000,
  DATABASE: {
    host: 'localhost',
    user: 'postgres',
    password: 'machupicchu',
    database: 'forms',
    port: '5432'
  } || {
    host: 'localhost',
    user: 'postgres',
    password: 'machupicchu',
    database: 'forms',
    port: '5432'
  }
}