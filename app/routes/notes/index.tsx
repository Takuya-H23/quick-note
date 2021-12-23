import { Link, useLoaderData } from 'remix'
import { map } from 'ramda'
import { BiMessageSquareAdd, BiFolder } from 'react-icons/bi'

import { requiredUserId } from '~/utils/session.server'
import { getFolders } from '~/db/notes/operations.server'

import type { LoaderFunction } from 'remix'

const folderRenderer = map(({ id: folderId, name }) => (
  <li key={folderId}>
    <Link to={`${folderId}`}>
      <div className="flex items-center gap-x-2">
        <BiFolder />
        <span>{name}</span>
      </div>
    </Link>
  </li>
))

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requiredUserId(request)
  const folders = await getFolders(userId)

  return { folders }
}

export default function NotesIndex() {
  const d = useLoaderData()

  return (
    <section>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Folders</h2>
        <button>
          <Link to="folder-new">
            <BiMessageSquareAdd className="h-8 w-8" />
          </Link>
        </button>
      </div>
      <ul className="mt-6">{folderRenderer(d.folders)}</ul>
    </section>
  )
}
