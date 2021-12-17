import { Link, useLoaderData } from 'remix'
import { map } from 'ramda'
import { BiMessageSquareAdd } from 'react-icons/bi'
import { requiredUserId } from '~/utils/session.server'
import { getNoteCategories } from '~/db/noteCategories/operations.server'

import { Layout } from '~/components'

import type { LoaderFunction } from 'remix'

const categoryRenderer = map(({ id, name }) => <li key={id}>{name}</li>)

export const loader: LoaderFunction = async ({ request }) => {
  await requiredUserId(request)
  const noteCategories = await getNoteCategories()

  return { noteCategories }
}

export default function Dashboard() {
  const d = useLoaderData()

  return (
    <Layout isLoggedIn>
      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-medium">Categories</h2>
          <button>
            <Link to="note-categories-new">
              <BiMessageSquareAdd className="h-8 w-8" />
            </Link>
          </button>
        </div>
        <ul className="mt-6">{categoryRenderer(d.noteCategories)}</ul>
      </section>
    </Layout>
  )
}
