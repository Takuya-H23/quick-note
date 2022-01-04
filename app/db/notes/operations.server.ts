import { head, prop } from 'ramda'

import { client } from '../client.server'
import {
  createFolderQuery,
  createNoteQuery,
  readFolderQuery,
  readFoldersQuery,
  readNoteDetailQuery,
  readNotesUnderFolderQuery,
  deleteNoteQuery
} from './queries'
import { extractRows, extractHead, mapExtractRows } from '~/utils/functions'

export const createFolder = ({ name, userId }: Record<string, string>) =>
  client.query(createFolderQuery, [name, userId]).then(extractRows)

export const createNote = ({
  title,
  description,
  copy,
  userId,
  folderId
}: Record<string, string>) =>
  client
    .query(createNoteQuery, [title, description, copy, userId, folderId])
    .then(extractRows)

export const getFolder = (userId: string, folderId: string) =>
  client.query(readFolderQuery, [userId, folderId]).then(extractHead)

export const getFolders = (userId: string) =>
  client.query(readFoldersQuery, [userId]).then(extractRows)

export const getNotesUnderFolder = (folderId: string) =>
  client.query(readNotesUnderFolderQuery, [folderId]).then(extractRows)

export const getNoteDetail = (noteId: string) =>
  client.query(readNoteDetailQuery, [noteId]).then(extractHead)

export const getFolderWithNotes = (userId: string, folderId: string) =>
  Promise.all([
    client.query(readFolderQuery, [userId, folderId]),
    client.query(readNotesUnderFolderQuery, [userId, folderId])
  ])
    .then(mapExtractRows)
    .then(([folderRows, notes]) => ({ folder: head(folderRows), notes }))

export const deleteNote = ({
  userId,
  noteId
}: {
  userId: string
  noteId: string
}) =>
  client
    .query(deleteNoteQuery, ['180fd97a-1338-4527-a3c8-1d4f21e74452', noteId])
    .then(x => prop('rowCount', x) === 1)
