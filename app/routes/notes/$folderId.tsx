import { Link, useLoaderData } from 'remix'
import { MdOutlineNoteAdd } from 'react-icons/md'

import { requiredUserId } from '~/utils/session.server'
import { getFolder } from '~/db/notes/operations.server'
import { Layout } from '~/components'

import type { LoaderFunction } from 'remix'

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requiredUserId(request)
  const { folderId } = params

  const folder = await getFolder(userId, folderId as string)
  return { folder }
}

export default function NoteCategoryDetail() {
  const { folder } = useLoaderData()

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
    </Layout>
  )
}
