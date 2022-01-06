import { Link, useLoaderData, json } from 'remix'
import { map } from 'ramda'
import { BiMessageSquareAdd, BiFolder } from 'react-icons/bi'

import { getSessionFlashMessage, requiredUserId } from '~/utils/session.server'
import { getFolders } from '~/db/notes/operations.server'

import type { LoaderFunction } from 'remix'
import { SnackBar } from '~/components'

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

  const url = new URL(request.url)
  const status = url.searchParams.get('status')

  const { message, removeSessionFlashMessage } = await getSessionFlashMessage(
    request
  )

  return json(
    { folders, message, variant: status === 'success' ? 'info' : 'error' },
    {
      headers: {
        'Set-Cookie': await removeSessionFlashMessage()
      }
    }
  )
}

export default function NotesIndex() {
  const { folders, message, variant } = useLoaderData()

  return (
    <section>
      <SnackBar message={message} variant={variant} />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">Folders</h2>
        <button>
          <Link to="folder-new">
            <BiMessageSquareAdd className="h-8 w-8" />
          </Link>
        </button>
      </div>
      <p className="mt-4">Create folders to organize your quick notes.</p>
      <ul className="mt-6">
        <li key="all">
          <Link to="all">
            <div className="flex items-center gap-x-2">
              <BiFolder />
              <span>All Notes</span>
            </div>
          </Link>
        </li>
        {folderRenderer(folders)}
      </ul>
    </section>
  )
}
