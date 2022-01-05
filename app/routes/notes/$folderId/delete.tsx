import {
  requiredUserId,
  redirectWithSessionFlash
} from '~/utils/session.server'

import { deleteFolder } from '~/db/notes/operations.server'

import type { ActionFunction } from 'remix'

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requiredUserId(request)
  const { folderId } = params

  if (!folderId) return null

  const isSuccess = await deleteFolder({ userId, folderId })

  const status = isSuccess ? 'success' : 'fail'

  return redirectWithSessionFlash(
    `/notes?status=${status}`,
    isSuccess
      ? 'Successfully deleted the folder'
      : 'There was a problem deleting the folder'
  )
}
