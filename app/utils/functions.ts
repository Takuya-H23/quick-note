import { compose, head, prop } from 'ramda'

type ExtractHead = (_x: { rows: any }) => any

type Fields = Record<string, string | undefined>

export const isString = (x: any) => typeof x === 'string'

export const extractHead: ExtractHead = compose(head, prop('rows'))

export const getFields = (keys: string[], formData: any): Fields =>
  keys.reduce((acc, x) => Object.assign(acc, { [x]: formData.get(x) }), {})

export const areAllString = (fields: Fields) =>
  Object.values(fields).every(isString)
