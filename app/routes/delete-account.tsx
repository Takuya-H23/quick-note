import { json } from 'remix'
import type { ActionFunction } from 'remix'

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
    return json(
      {},
      {
        headers: {
          'Set-Cookie': await userSessionStorage.destroySession(session)
        }
      }
    )
  }
}

export default function DeleteUser() {
  return (
    <div>
      <p>Thanks for using Quick Note. All of your data has been deleted.</p>
      <h2>I'm sorry to see you go...</h2>
    </div>
  )
}
