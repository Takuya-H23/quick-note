import { areAllString, isString, getFields } from '../functions'

describe('isString', () => {
  test('should return true when value given is string', () => {
    expect(isString('')).toBe(true)
  })

  test.each([[null], [{}], [1]])(
    'should return false when value given is not string',
    x => {
      expect(isString(x)).toBeFalsy()
    }
  )
})

describe('areAllString', () => {
  test('should return true when all fields have a value of string', () => {
    expect(areAllString({ name: 'John', city: 'Vancouver' })).toBe(true)
  })
})

describe('getFields', () => {
  test('should create field object', () => {
    const keys = ['firstName', 'lastName', 'role']

    const formData: Record<string, any> = {
      firstName: 'John',
      lastName: 'Doe',
      role: 'Admin',
      get: function (key: string) {
        return this[key]
      }
    }

    expect(getFields(keys, formData as any)).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      role: 'Admin'
    })
  })
})
