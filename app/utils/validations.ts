import { curry } from 'ramda'

export const isLengthValid = curry(
  (num: number, x: string) => x.trim().length > num
)
