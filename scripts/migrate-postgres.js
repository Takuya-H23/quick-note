const { Client } = require('pg')
const { migrate } = require('postgres-migrations')
const dotenv = require('dotenv')

dotenv.config()

const env = process.env.NODE_ENV || 'development'

const getProps = isProd => (acc, x) => {
  const [key, value] = Object.entries(x)[0]
  return isProd
    ? { ...acc, [key]: process.env[value.concat('_PROD')] }
    : { ...acc, [key]: process.env[value] }
}

const config = [
  { password: 'POSTGRES_PASSWORD' },
  { user: 'POSTGRES_USER' },
  { host: 'POSTGRES_HOST' },
  { port: 'POSTGRES_PORT' },
  { database: 'POSTGRES_DATABASE' }
].reduce(getProps(process.env.NODE_ENV === 'production'), {})

console.log(`Running migration on ${env}...`)

async function run() {
  const client = new Client(config)

  client.connect()

  try {
    await migrate({ client }, 'migrations')
  } finally {
    await client.end()
    console.log('Done')
  }
}

run()
