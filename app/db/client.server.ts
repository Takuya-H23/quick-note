import dotenv from 'dotenv'
import { Client } from 'pg'
import type { ClientBase } from 'pg'

dotenv.config()

declare global {
  var __db: ClientBase | undefined
}

let client: ClientBase

if (process.env.NODE_ENV === 'production') {
  client = new Client({
    password: process.env.POSTGRES_PASSWORD_PROD,
    user: process.env.POSTGRES_USER_PROD,
    host: process.env.POSTGRES_HOST_PROD,
    port: Number(process.env.POSTGRES_PORT_PROD),
    database: process.env.POSTGRES_DATABASE_PROD
  })

  client.connect()
} else {
  if (!global.__db) {
    client = new Client({
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DATABASE
    })
    client.connect()

    global.__db = client
  }

  client = global.__db as ClientBase
}

export { client }
