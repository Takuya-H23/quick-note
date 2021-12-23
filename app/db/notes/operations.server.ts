import { client } from '../client.server'
import {
  createFolderQuery,
  createNoteQuery,
  readFolderQuery,
  readFoldersQuery
} from './queries'
import { extractRows, extractHead } from '~/utils/functions'

export const createFolder = ({ name, userId }: Record<string, string>) =>
  client.query(createFolderQuery, [name, userId]).then(extractRows)

export const createNote = ({
  title,
  description,
  userId,
  folderId
}: Record<string, string>) =>
  client
    .query(createNoteQuery, [title, description, userId, folderId])
    .then(x => (console.log('res', x), x))
    .then(extractRows)

export const getFolder = (userId: string, folderId: string) =>
  client.query(readFolderQuery, [userId, folderId]).then(extractHead)

export const getFolders = (userId: string) =>
  client.query(readFoldersQuery, [userId]).then(extractRows)
