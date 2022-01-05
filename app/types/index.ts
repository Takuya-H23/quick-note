export type Fields = Record<string, string>

export type FieldErrors = Record<string, string>

export type ActionData = {
  formError?: string
  fieldErrors?: FieldErrors
  fields?: Record<string, string>
}

export type User = {
  id: string
  name: string
  email: string
  password_hash: string
}
