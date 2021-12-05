const { Client } = require('pg')
const { migrate } = require('postgres-migrations')
const dotenv = require('dotenv')

dotenv.config()

async function run() {
  console.log('Running migration...')
  const client = new Client({
    password: process.env.POSTGRES_PASSWORD,
    user: 'postgres',
    host: 'localhost',
    port: 6428,
    database: 'quick_note_dev'
  })

  client.connect()

  try {
    await migrate({ client }, 'migrations')
  } finally {
    await client.end()
    console.log('Done')
  }
}

run()
