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
    password: process.env.POSTGRES_PASSWORD,
    user: 'postgres',
    host: 'localhost',
    port: 6428,
    database: 'quick_note_dev'
  })

  client.connect()
} else {
  if (!global.__db) {
    client = new Client({
      password: process.env.POSTGRES_PASSWORD,
      user: 'postgres',
      host: 'localhost',
      port: 6428,
      database: 'quick_note_dev'
    })
    client.connect()

    global.__db = client
  }

  client = global.__db as ClientBase
}

export { client }
