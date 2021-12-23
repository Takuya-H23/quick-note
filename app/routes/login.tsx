import { useActionData } from 'remix'
import { Either } from 'fts-utils'

import { getUserByEmail } from '~/db/users/operations.server'
import { doPasswordsMatch } from '~/utils/bcrypt.server'
import { startUserSession } from '~/utils/session.server'
import { getFields, areAllString } from '~/utils/functions'
import { Fieldset, Input, Button } from '~/components'

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
    <form method="post">
      <Fieldset legend="Login">
        <div className="flex flex-col gap-y-6">
          <Input
            label="Name"
            id="email"
            name="email"
            type="email"
            defaultValue={fields?.email}
            errorMessage={fieldErrors?.email}
          />
          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
            defaultValue={fields?.password}
            errorMessage={fieldErrors?.password}
          />
          <div className="w-2/3 self-center mt-6">
            <Button type="submit">Login</Button>
          </div>
          {formError && <p className="text-center">{formError}</p>}
        </div>
      </Fieldset>
    </form>
  )
}
