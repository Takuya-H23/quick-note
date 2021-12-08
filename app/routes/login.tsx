import { useActionData } from 'remix'
import { identity } from 'ramda'
import { Either } from 'fts-utils'

import { getUserByEmail } from '~/db/users/operations.server'
import { doPasswordsMatch } from '~/utils/bcrypt.server'
import { startUserSession } from '~/utils/session.server'
import { getFields, areAllString } from '~/utils/functions'
import { Layout } from '~/components'

import type { ActionFunction } from 'remix'

type User = {
  id: string
  name: string
  password_hash: string
}

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

  const leftError = {
    formError: 'User not found',
    fields: { email: fields.email as string }
  }

  return Either.fromNullable(user)
    .chain((x: User) =>
      !doPasswordsMatch(fields.password as string, x.password_hash)
        ? Either.Left(leftError)
        : Either.Right(x)
    )
    .fold(
      () => leftError,
      (x: User) => startUserSession(x.id)
    )
}

export default function Login() {
  const { fields, fieldErrors, formError } = useActionData() || {}

  return (
    <Layout>
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
        {formError && <p className="text-center">{formError}</p>}
      </form>
    </Layout>
  )
}
