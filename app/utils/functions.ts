import { compose, head, prop, reduce } from 'ramda'

type ExtractHead = (_x: { rows: any }) => any

type Fields = Record<string, string | undefined>

export const areAllString = (fields: Fields): boolean =>
  Object.values(fields).every(isString)

export const isString = (x: any) => typeof x === 'string'

export const extractHead: ExtractHead = compose(head, prop('rows'))

export const extractRows: ExtractHead = compose(prop('rows'))

export const getFields = (
  keys: string[],
  formData: FormData
): Record<string, string> =>
  reduce(
    (acc, x) => {
      const value = formData.get(x)
      return value ? Object.assign(acc, { [x]: value }) : acc
    },
    {},
    keys
  )
