export type FieldErrors = Record<string, string>

export type ActionData = {
  formError?: string
  fieldErrors?: FieldErrors
  fields?: Record<string, string>
}
