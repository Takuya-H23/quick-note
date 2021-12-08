import { client } from '../client.server'
import {
  countEmailQuery,
  createUserQuery,
  getUserByEmailQuery,
  getUserByIdQuery
} from './queries'
import { extractHead } from '~/utils/functions'

type CreateUserPayload = {
  name: string
  email: string
  passwordHash: string
}

export const countUserByEmail = (email: string) =>
  client.query(countEmailQuery, [email]).then(extractHead)

export const getUserByEmail = (email: string) =>
  client.query(getUserByEmailQuery, [email]).then(extractHead)

export const getUserById = (id: string) =>
  client.query(getUserByIdQuery, [id]).then(extractHead)

export const createUser = ({
  name,
  email,
  passwordHash
}: CreateUserPayload): Promise<{ id: string }> =>
  client.query(createUserQuery, [name, email, passwordHash]).then(extractHead)
