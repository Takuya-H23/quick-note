import { useActionData } from 'remix'

import { getUserByEmail } from '~/db/users/operations.server'
import { doPasswordsMatch } from '~/utils/bcrypt.server'
import { startUserSession } from '~/utils/session.server'
import { getFields, areAllString } from '~/utils/functions'

import type { ActionFunction } from 'remix'

type ActionData = {
  formError?: string
  fieldErrors?: {
    email: string
    password: string
  }
  fields?: {
    email: string
  }
}

export const action: ActionFunction = async ({
  request
}): Promise<Response | ActionData> => {
  const formData = await request.formData()

  const fields = getFields(['email', 'password'], formData)

  if (!areAllString(fields))
    return {
      formError: 'Form was not submitted correctly'
    }

  const user = await getUserByEmail(fields.email as string)

  if (!user)
    return {
      formError: 'User not found',
      fields: { email: fields.email as string }
    }

  if (!doPasswordsMatch(fields.password as string, user.password_hash)) {
    return {
      formError: 'User not found',
      fields: { email: fields.email as string }
    }
  }

  return startUserSession(user.id)
}

export default function Login() {
  const { fields, fieldErrors } = useActionData() || {}
  return (
    <form method="post" className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        <label htmlFor="name">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          className="p-1.5 rounded-sm text-gray-900"
          defaultValue={fields?.email}
        />
        <p>{fieldErrors?.email || ''}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="email">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="p-1.5 rounded-sm text-gray-900"
        />
        <p>{fieldErrors?.password || ''}</p>
      </div>
      <button type="submit" className="px-4 py-2 bg-yellow-400 text-gray-900">
        Login
      </button>
    </form>
  )
}
