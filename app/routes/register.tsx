import { useActionData } from 'remix'

import { countUserByEmail, createUser } from '~/db/users/operations.server'
import { hashPassword } from '~/utils/bcrypt.server'
import { startUserSession } from '~/utils/session.server'
import { getFields, areAllString } from '~/utils/functions'

import type { ActionFunction } from 'remix'

type ActionData = {
  formError?: string
  fieldErrors?: {
    name: string
    email: string
    password: string
  }
  fields?: {
    name: string
    email: string
  }
}

export const action: ActionFunction = async ({
  request
}): Promise<Response | ActionData> => {
  const formData = await request.formData()

  const fields = getFields(['name', 'email', 'password'], formData)

  if (!areAllString(fields))
    return {
      formError: 'Form was not submitted correctly'
    }

  const { name, email, password } = fields

  const { count } = await countUserByEmail(email as string)
  if (Number(count)) return { formError: 'User already exists' }

  const passwordHash = hashPassword(password as string)

  const user = await createUser({ name, email, passwordHash } as Record<
    'name' | 'email' | 'passwordHash',
    string
  >)

  return startUserSession(user.id)
}

export default function Register() {
  const { fields, fieldErrors } = useActionData() || {}

  return (
    <form method="post" className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="p-1.5 rounded-sm text-gray-900"
          defaultValue={fields?.name}
        />
        <p>{fieldErrors?.name || ''}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="email">Email</label>
        <input
          defaultValue={fields?.email}
          type="email"
          name="email"
          id="email"
          className="p-1.5 rounded-sm text-gray-900"
        />
        <p>{fieldErrors?.email || ''}</p>
      </div>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="p-1.5 rounded-sm text-gray-900"
        />
        <p>{fieldErrors?.password || ''}</p>
      </div>
      <button type="submit" className="px-4 py-2 bg-yellow-400 text-gray-900">
        Register
      </button>
    </form>
  )
}
