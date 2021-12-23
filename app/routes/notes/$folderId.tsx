import { Link, useLoaderData } from 'remix'
import { MdOutlineNoteAdd } from 'react-icons/md'
import { map } from 'ramda'

import { requiredUserId } from '~/utils/session.server'
import { getFolderWithNotes } from '~/db/notes/operations.server'
import { Layout, NoteCard } from '~/components'

import type { LoaderFunction } from 'remix'

const noteRenderer = map((note: any) => (
  <li key={note.id} className="border border-gray-50 p-4 rounded-sm">
    <NoteCard {...note} />
  </li>
))

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requiredUserId(request)
  const { folderId } = params

  return await getFolderWithNotes(userId, folderId as string)
}

export default function NoteCategoryDetail() {
  const { folder, notes } = useLoaderData()

  return (
    <Layout isLoggedIn>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">
          {folder.name} ({folder.notes_count})
        </h2>
        <Link to="new">
          <MdOutlineNoteAdd className="h-8 w-8" />
        </Link>
      </div>
      <ul className="flex flex-col gap-y-4 mt-6">{noteRenderer(notes)}</ul>
    </Layout>
  )
}
