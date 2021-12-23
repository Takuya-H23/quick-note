import { map, compose, head, prop, reduce } from 'ramda'

type Response = (_x: { rows: any }) => any

type Fields = Record<string, string | undefined>

export const areAllString = (fields: Fields): boolean =>
  Object.values(fields).every(isString)

export const isString = (x: any) => typeof x === 'string'

export const extractHead: Response = compose(head, prop('rows'))

export const extractRows: Response = compose(prop('rows'))

export const mapExtractRows = map(extractRows)

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
