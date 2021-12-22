import { redirect } from 'remix'

import { getFields, areAllString } from '~/utils/functions'
import { requiredUserId, getUserId } from '~/utils/session.server'
import { createNote } from '~/db/notes/operations.server'
import { Fieldset, Layout, Input, Button, Textarea } from '~/components'

import type { ActionFunction, LoaderFunction } from 'remix'

type ActionData = {
  formError?: string
  fieldErrors?: {
    title: string
    description: string
  }
  fields?: Record<string, string>
}

export const loader: LoaderFunction = async ({ request }) => {
  return requiredUserId(request)
}

export const action: ActionFunction = async ({
  request,
  params
}): Promise<Response | ActionData> => {
  const formData = await request.formData()
  const fields = getFields(['title', 'description'], formData)

  if (!areAllString(fields))
    return {
      formError: 'Form was not submitted correctly'
    }

  const userId = await getUserId(request)
  const { folderId } = params

  if (!folderId) return redirect('/')

  createNote({ ...fields, userId, folderId })
  return redirect(`/notes/${folderId}`)
}

export default function NoteNew() {
  return (
    <Layout isLoggedIn>
      <form method="post">
        <Fieldset legend="Create New Note">
          <div className="flex flex-col gap-y-6">
            <Input
              id="title"
              label="Title"
              name="title"
              autoComplete="off"
              placeholder="e.g Copy"
            />
            <Textarea
              id="description"
              label="Description"
              name="description"
              placeholder="e.g Copy text"
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
