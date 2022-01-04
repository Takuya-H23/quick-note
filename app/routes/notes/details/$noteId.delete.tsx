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
  const { redirectTo } = getFields(['redirectTo'], formData)

  const { noteId } = params

  if (!noteId || !redirectTo) return redirect('/notes')

  const isSuccess = await deleteNote({ userId, noteId })

  return redirectWithSessionFlash(redirectTo, 'Success!')
}
