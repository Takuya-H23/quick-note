import { redirect } from 'remix'

import {
  requiredUserId,
  redirectWithSessionFlash
} from '~/utils/session.server'
import { deleteNote } from '~/db/notes/operations.server'

import type { ActionFunction } from 'remix'

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requiredUserId(request)

  const { noteId, folderId } = params

  if (!noteId || !folderId) return redirect('/notes')

  const isSuccess = await deleteNote({ userId, noteId })
  const redirectTo = `/folders/${folderId}?status=${
    isSuccess ? 'success' : 'fail'
  }`

  return redirectWithSessionFlash(
    redirectTo,
    isSuccess
      ? 'Successfully deleted the note'
      : 'There was a problem deleting the note'
  )
}
