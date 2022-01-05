import { redirect, useActionData, useLoaderData } from 'remix'
import { isEmpty } from 'ramda'

import { getFields, areAllString } from '~/utils/functions'
import {
  requiredUserId,
  redirectWithSessionFlash
} from '~/utils/session.server'

import { editNote, getNoteDetail } from '~/db/notes/operations.server'
import { validateNoteForm } from '~/utils/validations'
import { Fieldset, Input, Button, Textarea } from '~/components'

import type { ActionFunction, LoaderFunction } from 'remix'
import type { FieldErrors, ActionData } from '~/types'

export const loader: LoaderFunction = async ({ request, params }) => {
  await requiredUserId(request)
  const { noteId = '' } = params

  const note = await getNoteDetail(noteId)

  return note
}

export const action: ActionFunction = async ({
  request,
  params
}): Promise<Response | ActionData> => {
  const userId = await requiredUserId(request)
  const formData = await request.formData()
  const fields = getFields(['title', 'description', 'copy'], formData)
  const { noteId = '' } = params

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

  const isSuccess = await editNote({ fields, userId, noteId })
  const status = isSuccess ? 'success' : 'fail'

  return redirectWithSessionFlash(
    `/notes/details/${noteId}?status=${status}`,
    isSuccess
      ? 'Successfully edited the note'
      : 'There was a problem editing the note'
  )
}

export default function NoteNew() {
  const { fieldErrors, fields } = useActionData() || {}
  const { title, copy, description } = useLoaderData()

  return (
    <form method="post">
      <Fieldset legend="Edit Note">
        <div className="flex flex-col gap-y-6">
          <Input
            id="title"
            label="Title"
            name="title"
            autoComplete="off"
            placeholder="e.g Create new branch"
            defaultValue={fields?.title || title}
            errorMessage={fieldErrors?.title}
            required
          />
          <Input
            id="copy"
            label="Copy"
            name="copy"
            autoComplete="off"
            placeholder="e.g git checkout -b 'branchName'"
            defaultValue={fields?.copy || copy}
          />
          <Textarea
            id="description"
            label="Description"
            name="description"
            placeholder="e.g Create new branch in Git"
            defaultValue={fields?.description || description}
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
