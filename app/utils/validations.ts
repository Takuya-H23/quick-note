import { curry, equals, reduce, prop, identity } from 'ramda'
import { Predicate } from 'fts-utils'

import type { Predicate as PredicateType } from 'fts-utils'
import type { Fields } from '~/types'

type Validator = {
  predicates: Record<string, PredicateType>
  errors: Record<string, string>
}

export const hasRequiredLength = curry(
  (minLength: number, x: string) => x.trim().length >= minLength
)

// Required at least one alphabet, special character, and number
export const isValidPassword = (password: string) =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&_-])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    password
  )

export const isValidEmail = (email: string) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

export const doPasswordsMatch = (_value: string) => true

export const validate =
  ({ predicates, errors }: Validator) =>
  (fields: Fields) =>
    reduce(
      (acc: Record<string, string>, key) =>
        !predicates[key]
          ? acc
          : predicates[key].run(fields)
          ? acc
          : { ...acc, [key]: errors[key] },
      {},
      Object.keys(fields)
    )

export const validateRegisterForm = validate({
  predicates: {
    name: Predicate(hasRequiredLength(2)).contramap(prop('name')),
    email: Predicate(isValidEmail).contramap(prop('email')),
    password: Predicate(isValidPassword).contramap(prop('password')),
    passwordConfirmation: Predicate(identity).contramap(
      ({ password, passwordConfirmation }) =>
        equals(password, passwordConfirmation)
    )
  },
  errors: {
    name: 'Name must have at least 2 characters',
    email: 'Email is not valid',
    password:
      'Password must have at least 1 alphabet, 1 special character, and 1 number. Min length is 8',
    passwordConfirmation: 'Passwords must match'
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
