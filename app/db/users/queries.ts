export const countEmailQuery = `SELECT COUNT(id) FROM users WHERE email = $1`

export const getUserByEmailQuery = `SELECT id, email, password_hash FROM users WHERE email = $1`

export const getUserByIdQuery = `SELECT id, name FROM users WHERE id = $1`

export const createUserQuery =
  'INSERT INTO users(name, email, password_hash) VALUES($1, $2, $3) RETURNING id'
