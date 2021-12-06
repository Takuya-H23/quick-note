import bcrypt from 'bcrypt'

export const hashPassword = (password: string) => bcrypt.hashSync(password, 10)

export const doPasswordsMatch = (password: string, passwordHash: string) =>
  bcrypt.compareSync(password, passwordHash)
