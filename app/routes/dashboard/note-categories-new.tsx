import { redirect, useActionData } from 'remix'

import { isLengthValid } from '~/utils/validations'
import { requiredUserId } from '~/utils/session.server'
import { createNoteCategory } from '~/db/noteCategories/operations.server'
import { getFields, areAllString } from '~/utils/functions'
import { Fieldset, Layout, Input, Button } from '~/components'

import type { ActionFunction, LoaderFunction } from 'remix'

export const loader: LoaderFunction = async ({ request }) => {
  return await requiredUserId(request)
}

type ActionData = {
  formError?: string
  fieldErrors?: {
    name: string
  }
  fields?: Record<string, string>
}

export const action: ActionFunction = async ({
  request
}): Promise<Response | ActionData> => {
  const formData = await request.formData()

  const fields = getFields(['name'], formData)

  if (!areAllString(fields))
    return {
      formError: 'Form was not submitted correctly'
    }

  if (!isLengthValid(1, fields.name))
    return {
      fieldErrors: {
        name: 'Minimum length is 1'
      },
      fields
    }

  await createNoteCategory(fields.name as string)

  return redirect('/dashboard')
}

export default function NoteCategoriesNew() {
  const { fieldErrors, fields } = useActionData() || {}

  return (
    <Layout isLoggedIn>
      <form method="post">
        <Fieldset legend="Create New Note Category">
          <div className="flex flex-col gap-y-6">
            <Input
              id="category"
              label="New Note Category"
              name="name"
              autoComplete="off"
              defaultValue={fields?.name}
              errorMessage={fieldErrors?.name}
            />
            <div className="w-2/3 self-center mt-6">
              <Button type="submit">Create</Button>
            </div>
          </div>
        </Fieldset>
      </form>
    </Layout>
  )
}
