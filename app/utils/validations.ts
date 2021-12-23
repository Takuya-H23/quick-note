import { curry, reduce } from 'ramda'
import { Predicate } from 'fts-utils'

type Run = (x: any) => boolean
type Contramap = (x: any) => any

type Predicate = {
  run: Run
  concat: (other: Predicate) => Predicate
  contramap: (f: Contramap) => Predicate
}

type Validator = {
  predicates: Record<string, Predicate>
  errors: Record<string, string>
}

export const hasRequiredLength = curry(
  (minLength: number, x: string) => x.trim().length >= minLength
)

// Required at least one alphabet, special character, and number
export const isValidPassword = (password: string) =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    password
  )

export const validate =
  ({ predicates, errors }: Validator) =>
  (fields: Record<string, string>) =>
    reduce(
      (acc: Record<string, string>, [key, value]) =>
        predicates[key].run(value) ? acc : { ...acc, [key]: errors[key] },
      {},
      Object.entries(fields)
    )

export const validatePassword: Predicate = Predicate(isValidPassword)

export const validateFolderForm = validate({
  predicates: { name: Predicate(hasRequiredLength(2)) },
  errors: { name: 'Folder name must have at least 2 characters' }
})
