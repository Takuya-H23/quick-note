import { requiredUserId } from '~/utils/session.server'

import type { LoaderFunction } from 'remix'

export const loader: LoaderFunction = async ({ request }) => {
  const id = await requiredUserId(request)

  return id
}

export default function Dashboard() {
  return <div>Dashboard</div>
}
