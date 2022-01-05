import { head, prop } from 'ramda'

import { client } from '../client.server'
import {
  createFolderQuery,
  createNoteQuery,
  readFolderQuery,
  readFoldersQuery,
  readNoteDetailQuery,
  readNotesUnderFolderQuery,
  updateFolderQuery,
  updateNoteQuery,
  deleteFolderQuery,
  deleteNoteQuery
} from './queries'
import { extractRows, extractHead, mapExtractRows } from '~/utils/functions'

import type { Fields } from '~/types'

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

export const editFolder = ({
  fields,
  userId,
  folderId
}: {
  fields: Fields
  userId: string
  folderId: string
}) =>
  client
    .query(updateFolderQuery, [fields.name, userId, folderId])
    .then(x => prop('rowCount', x) === 1)

export const editNote = ({
  fields,
  userId,
  noteId
}: {
  fields: Fields
  userId: string
  noteId: string
}) =>
  client
    .query(updateNoteQuery, [
      fields.title,
      fields.description,
      fields.copy,
      userId,
      noteId
    ])
    .then(x => prop('rowCount', x) === 1)

export const deleteFolder = ({
  userId,
  folderId
}: {
  userId: string
  folderId: string
}) =>
  client
    .query(deleteFolderQuery, [userId, folderId])
    .then(x => prop('rowCount', x) === 1)

export const deleteNote = ({
  userId,
  noteId
}: {
  userId: string
  noteId: string
}) =>
  client
    .query(deleteNoteQuery, [userId, noteId])
    .then(x => prop('rowCount', x) === 1)
