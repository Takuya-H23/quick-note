import { useActionData, useLoaderData } from 'remix'
import { isEmpty } from 'ramda'

import { getFields, areAllString } from '~/utils/functions'
import {
  requiredUserId,
  getUserId,
  redirectWithSessionFlash
} from '~/utils/session.server'

import { getFolder, editFolder } from '~/db/notes/operations.server'
import { validateFolderForm } from '~/utils/validations'
import { Fieldset, Input, Button } from '~/components'

import type { ActionFunction, LoaderFunction } from 'remix'
import type { ActionData } from '~/types'

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requiredUserId(request)
  const { folderId } = params

  if (!folderId) return null

  return await getFolder(userId, folderId)
}

export const action: ActionFunction = async ({
  request,
  params
}): Promise<Response | ActionData> => {
  const userId = await getUserId(request)
  const formData = await request.formData()
  const fields = getFields(['name'], formData)
  const { folderId = '' } = params

  if (!areAllString(fields))
    return {
      formError: 'Form was not submitted correctly'
    }

  const fieldErrors = validateFolderForm(fields)

  if (!isEmpty(fieldErrors)) {
    return {
      fieldErrors,
      fields
    }
  }

  const isSuccess = await editFolder({ fields, userId, folderId })

  const status = isSuccess ? 'success' : 'fail'

  return redirectWithSessionFlash(
    `/folders/${folderId}?status=${status}`,
    isSuccess
      ? 'Successfully edited the folder'
      : 'There was a problem editing the folder'
  )
}

export default function NoteNew() {
  const { fieldErrors, fields } = useActionData() || {}
  const { name } = useLoaderData()

  return (
    <form method="post">
      <Fieldset legend="Edit Folder">
        <div className="flex flex-col gap-y-6">
          <Input
            id="name"
            label="Name"
            name="name"
            autoComplete="off"
            placeholder="e.g My folder"
            defaultValue={fields?.name || name}
            errorMessage={fieldErrors?.name}
            required
          />
          <div className="w-2/3 self-center mt-6">
            <Button type="submit">Create</Button>
          </div>
        </div>
      </Fieldset>
    </form>
  )
}
