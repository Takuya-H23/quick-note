import { client } from '../client.server'
import { createNoteCategoryQuery, readNoteCategoriesQuery } from './queries'
import { extractRows } from '~/utils/functions'

export const getNoteCategories = () =>
  client.query(readNoteCategoriesQuery).then(extractRows)

export const createNoteCategory = (name: string) =>
  client.query(createNoteCategoryQuery, [name]).then(extractRows)
