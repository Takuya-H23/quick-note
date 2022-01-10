import { redirect, useActionData } from 'remix'
import { isEmpty } from 'ramda'

import { validateFolderForm } from '~/utils/validations'
import { requiredUserId, getUserId } from '~/utils/session.server'
import { createFolder } from '~/db/notes/operations.server'
import { getFields, areAllString } from '~/utils/functions'
import { BackLink, ErrorLayout, Fieldset, Input, Button } from '~/components'

import type { ActionFunction, LoaderFunction } from 'remix'
import type { ActionData } from '~/types'

export const loader: LoaderFunction = async ({ request }) => {
  return await requiredUserId(request)
}

export const action: ActionFunction = async ({
  request
}): Promise<Response | ActionData> => {
  const formData = await request.formData()

  const fields = getFields(['name', 'slug'], formData)

  if (!areAllString(fields))
    return {
      formError: 'Form was not submitted correctly'
    }

  const fieldErrors = validateFolderForm(fields)

  if (!isEmpty(fieldErrors))
    return {
      fieldErrors,
      fields
    }

  const userId = await getUserId(request)

  await createFolder({ ...fields, userId })

  return redirect('/folders')
}

export default function FolderNew() {
  const { fieldErrors, fields } = useActionData() || {}

  return (
    <>
      <BackLink to="/folders" label="Folder" />
      <form method="post">
        <Fieldset legend="Create New Folder">
          <div className="flex flex-col gap-y-6">
            <Input
              id="name"
              label="New Folder"
              name="name"
              autoComplete="off"
              defaultValue={fields?.name}
              errorMessage={fieldErrors?.name}
              placeholder="e.g My Custom Shortcuts"
              required
            />
            <div className="w-2/3 self-center mt-6">
              <Button type="submit">Create</Button>
            </div>
          </div>
        </Fieldset>
      </form>
    </>
  )
}

export function ErrorBoundary() {
  return <ErrorLayout />
}
