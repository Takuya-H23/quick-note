import { compose, head, prop } from 'ramda'

type ExtractHead = (_x: { rows: any }) => any

type Fields = Record<string, string | undefined>

export const areAllString = (fields: Fields) =>
  Object.values(fields).every(isString)

export const isString = (x: any) => typeof x === 'string'

export const extractHead: ExtractHead = compose(head, prop('rows'))

export const getFields = (keys: string[], formData: FormData): Fields =>
  keys.reduce((acc, x) => Object.assign(acc, { [x]: formData.get(x) }), {})
