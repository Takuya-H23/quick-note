import { useActionData } from 'remix'

import { countUserByEmail, createUser } from '~/db/users/operations.server'
import { hashPassword } from '~/utils/bcrypt.server'
import { startUserSession } from '~/utils/session.server'
import { getFields, areAllString } from '~/utils/functions'
import { Fieldset, Input, Button } from '~/components'

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
  const { fields, fieldErrors, formError } = useActionData() || {}

  return (
    <form method="post">
      <Fieldset legend="Register">
        <div className="flex flex-col gap-y-6">
          <Input
            label="Name"
            name="name"
            id="name"
            defaultValue={fields?.name}
            errorMessage={fieldErrors?.name}
          />
          <Input
            label="Email"
            defaultValue={fields?.email}
            errorMessage={fieldErrors?.email}
            type="email"
            name="email"
            id="email"
          />
          <Input
            label="Password"
            defaultValue={fields?.password}
            errorMessage={fieldErrors?.password}
            type="password"
            name="password"
            id="password"
          />
          <div className="w-2/3 self-center">
            <Button type="submit">Register</Button>
          </div>
          {formError && <p className="text-center">{formError}</p>}
        </div>
      </Fieldset>
    </form>
  )
}
