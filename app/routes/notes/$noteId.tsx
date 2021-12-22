import { requiredUserId } from '~/utils/session.server'
import { Layout } from '~/components'

import type { LoaderFunction } from 'remix'

export const loader: LoaderFunction = async ({ request, params }) => {
  await requiredUserId(request)
  const { noteId } = params

  console.log(noteId)

  return null
}

export default function NoteDetail() {
  return <Layout isLoggedIn>note detail</Layout>
}
