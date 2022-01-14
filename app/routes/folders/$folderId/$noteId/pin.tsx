import { redirect } from 'remix'

import { getFields } from '~/utils/functions'
import {
  requiredUserId,
  redirectWithSessionFlash
} from '~/utils/session.server'
import { pinOrUnPinNote } from '~/db/notes/operations.server'
import { ErrorLayout } from '~/components'

import type { ActionFunction, LoaderFunction } from 'remix'

const toBool = (bool: 'true' | 'false') => bool === 'true'

export const action: ActionFunction = async ({ request, params }) => {
  await requiredUserId(request)
  const formData = await request.formData()
  const fields = getFields(['isPinned'], formData)
  const { folderId, noteId } = params

  if (!noteId) return null

  const isPinned = !toBool(fields.isPinned as 'true' | 'false')

  const isSuccess = await pinOrUnPinNote({
    isPinned,
    noteId
  })

  return isSuccess
    ? redirectWithSessionFlash(
        `/folders/${folderId}/${noteId}?status=success`,
        `${isPinned ? 'Pinned' : 'Unpinned'} note!`
      )
    : redirectWithSessionFlash(
        `/folders/${folderId}/${noteId}?status=fail`,
        'There was a problem update pin'
      )
}

export const loader: LoaderFunction = () => redirect('/')

export function ErrorBoundary() {
  return <ErrorLayout />
}
