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

export const isValidEmail = (email: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

export const validate =
  ({ predicates, errors }: Validator) =>
  (fields: Record<string, string>) =>
    reduce(
      (acc: Record<string, string>, [key, value]) =>
        !predicates[key]
          ? acc
          : predicates[key].run(value)
          ? acc
          : { ...acc, [key]: errors[key] },
      {},
      Object.entries(fields)
    )

export const validatePassword: Predicate = Predicate(isValidPassword)

export const validateFolderForm = validate({
  predicates: { name: Predicate(hasRequiredLength(2)) },
  errors: { name: 'Folder name must have at least 2 characters' }
})

export const validateNoteForm = validate({
  predicates: {
    title: Predicate(hasRequiredLength(2)),
    description: Predicate(hasRequiredLength(2))
  },
  errors: {
    title: 'Title must have at least 2 characters',
    description: 'Description must have at least 2 characters'
  }
})

export const validateLoginForm = validate({
  predicates: {
    email: Predicate(isValidEmail),
    password: Predicate(isValidPassword)
  },
  errors: {
    email: 'Email is not valid',
    password:
      'Password must have at least 1 alphabet, 1 special character, and 1 number. Min length is 8'
  }
})
