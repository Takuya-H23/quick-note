import { Predicate } from 'fts-utils'

import {
  validate,
  hasRequiredLength,
  isValidPassword,
  isValidEmail
} from '../validations'

describe('hasRequiredLength', () => {
  test.each([[''], ['hi'], ['cat']])(
    'should return false when length is less than required',
    value => {
      expect(hasRequiredLength(4)(value)).toBe(false)
    }
  )

  test.each([['music'], ['h@gmail'], ['desk']])(
    'should return true when length is equal to or more than required',
    value => {
      expect(hasRequiredLength(4)(value)).toBe(true)
    }
  )
})

describe('isValidPassword', () => {
  test.each([['password'], ['pass!2T'], ['2235!@@']])(
    'should return false when password is not valid',
    password => {
      expect(isValidPassword(password)).toBe(false)
    }
  )

  test.each([['password1@'], ['111$$$$s'], ['%%x%%!#7']])(
    'should return true when password is valid',
    password => {
      expect(isValidPassword(password)).toBe(true)
    }
  )
})

describe('isValidEmail', () => {
  test.each([['ssss'], ['email@.com']])(
    'should return false when email is not valid',
    password => {
      expect(isValidEmail(password)).toBe(false)
    }
  )

  test.each([['valid@test.com'], ['email23333@example.com']])(
    'should return true when email is valid',
    password => {
      expect(isValidEmail(password)).toBe(true)
    }
  )
})

describe('validate', () => {
  const errors = {
    folder: 'Must have at least 1 character',
    password:
      'Must have at least 1 alphabet, 1 special characters, and 1 number. Min length is 8'
  }

  const predicates = {
    folder: Predicate(hasRequiredLength(4)),
    password: Predicate(isValidPassword)
  }

  test('should return error object when fields are not valid', () => {
    expect(
      validate({ predicates, errors })({ folder: '', password: '135oi%i' })
    ).toEqual(errors)
    expect(
      validate({ predicates, errors })({ folder: '', password: '135oi%pass' })
    ).toEqual({ folder: errors.folder })
  })

  test('should return empty object when all fields are valid', () => {
    expect(
      validate({ predicates, errors })({
        folder: 'hello',
        password: '135oi%john'
      })
    ).toEqual({})
  })
})
