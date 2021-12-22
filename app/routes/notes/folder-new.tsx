import { redirect, useActionData } from 'remix'

import { isLengthValid } from '~/utils/validations'
import { requiredUserId, getUserId } from '~/utils/session.server'
import { createFolder } from '~/db/notes/operations.server'
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
    slug: string
  }
  fields?: Record<string, string>
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

  if (!isLengthValid(1, fields.name))
    return {
      fieldErrors: {
        name: 'Minimum length is 1',
        slug: 'Slug must be words separated by "-"'
      },
      fields
    }

  const userId = await getUserId(request)

  await createFolder({ ...fields, userId })

  return redirect('/notes')
}

export default function FolderNew() {
  const { fieldErrors, fields } = useActionData() || {}

  return (
    <Layout isLoggedIn>
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
            />
            <Input
              id="slug"
              label="Slug"
              name="slug"
              autoComplete="off"
              defaultValue={fields?.slug}
              errorMessage={fieldErrors?.slug}
              placeholder="e.g my-custom-shortcuts"
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
