import { redirect, useActionData } from 'remix'
import { isEmpty } from 'ramda'

import { getFields, areAllString } from '~/utils/functions'
import { requiredUserId, getUserId } from '~/utils/session.server'
import { createNote } from '~/db/notes/operations.server'
import { validateNoteForm } from '~/utils/validations'
import { Fieldset, Input, Button, Textarea } from '~/components'

import type { ActionFunction, LoaderFunction } from 'remix'
import type { FieldErrors, ActionData } from '~/types'

export const loader: LoaderFunction = async ({ request }) => {
  return requiredUserId(request)
}

export const action: ActionFunction = async ({
  request,
  params
}): Promise<Response | ActionData> => {
  const formData = await request.formData()
  const fields = getFields(['title', 'description', 'copy'], formData)

  if (!areAllString(fields))
    return {
      formError: 'Form was not submitted correctly'
    }

  const fieldErrors = validateNoteForm(fields)

  if (!isEmpty(fieldErrors)) {
    return {
      fieldErrors: fieldErrors as FieldErrors,
      fields
    }
  }

  const userId = await getUserId(request)
  const { folderId } = params

  if (!folderId) return redirect('/')

  createNote({ ...fields, userId, folderId })
  return redirect(`/notes/${folderId}`)
}

export default function NoteNew() {
  const { fieldErrors, fields } = useActionData() || {}

  return (
    <form method="post">
      <Fieldset legend="Create New Note">
        <div className="flex flex-col gap-y-6">
          <Input
            id="title"
            label="Title"
            name="title"
            autoComplete="off"
            placeholder="e.g Create new branch"
            defaultValue={fields?.title}
            errorMessage={fieldErrors?.title}
            required
          />
          <Input
            id="copy"
            label="Copy"
            name="copy"
            autoComplete="off"
            placeholder="e.g git checkout -b 'branchName'"
            defaultValue={fields?.copy}
          />
          <Textarea
            id="description"
            label="Description"
            name="description"
            placeholder="e.g Create new branch in Git"
            defaultValue={fields?.description}
            errorMessage={fieldErrors?.description}
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
