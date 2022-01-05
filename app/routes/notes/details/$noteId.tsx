import { useLoaderData } from 'remix'
import { AiOutlineDelete } from 'react-icons/ai'

import { CopyText } from '~/components'
import { getNoteDetail } from '~/db/notes/operations.server'
import type { LoaderFunction } from 'remix'

export const loader: LoaderFunction = async ({ params }) => {
  const { noteId } = params

  if (typeof noteId !== 'string') return null

  return await getNoteDetail(noteId)
}

export default function NoteDetail() {
  const { id, title, description, copy, folder_id: folderId } = useLoaderData()

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        <form method="post" action={`/notes/details/${id}/delete`}>
          <input
            type="hidden"
            name="redirectTo"
            value={`/notes/${folderId}`}
            id="redirectTo"
          />
          <button type="submit">
            <AiOutlineDelete className="w-6 h-6" />
          </button>
        </form>
      </div>
      {copy && <CopyText copy={copy} className="mt-4" />}
      <p className="mt-4">{description}</p>
    </div>
  )
}
