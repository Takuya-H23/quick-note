import { redirect } from 'remix'

import {
  requiredUserId,
  redirectWithSessionFlash
} from '~/utils/session.server'
import { getFields } from '~/utils/functions'
import { deleteNote } from '~/db/notes/operations.server'

import type { ActionFunction } from 'remix'

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requiredUserId(request)
  const formData = await request.formData()
  const { redirectTo: to } = getFields(['redirectTo'], formData)

  const { noteId } = params

  if (!noteId || !to) return redirect('/notes')
  console.log(userId, noteId)

  const isSuccess = await deleteNote({ userId, noteId })
  const redirectTo = to.concat(`?status=${isSuccess ? 'success' : 'fail'}`)

  return redirectWithSessionFlash(
    redirectTo,
    isSuccess
      ? 'Successfully deleted the note'
      : 'There was a problem deleting the note'
  )
}
