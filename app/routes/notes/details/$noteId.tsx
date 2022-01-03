import { useLoaderData } from 'remix'

import { CopyText } from '~/components'
import { getNoteDetail } from '~/db/notes/operations.server'
import type { LoaderFunction } from 'remix'

export const loader: LoaderFunction = async ({ params }) => {
  const { noteId } = params

  if (typeof noteId !== 'string') return null

  return await getNoteDetail(noteId)
}

export default function NoteDetail() {
  const { title, description, copy } = useLoaderData()

  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      {copy && <CopyText copy={copy} className="mt-4" />}
      <p className="mt-4">{description}</p>
    </div>
  )
}
