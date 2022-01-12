import { redirect } from 'remix'
import type { ActionFunction, LoaderFunction } from 'remix'

import {
  requiredUserId,
  getUserSession,
  userSessionStorage,
  redirectWithSessionFlash
} from '~/utils/session.server'
import { deleteUser } from '~/db/users/operations.server'

export const action: ActionFunction = async ({ request }) => {
  const id = await requiredUserId(request)

  const isSuccess = await deleteUser(id)

  if (!isSuccess) {
    return redirectWithSessionFlash(
      '/account',
      'There was a problem deleting your account. Please try it later.'
    )
  } else {
    const session = await getUserSession(request)
    return redirect('/register', {
      headers: {
        'Set-Cookie': await userSessionStorage.destroySession(session)
      }
    })
  }
}

export const loader: LoaderFunction = () => redirect('/')
