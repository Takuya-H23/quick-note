import { requiredUserId } from '~/utils/session.server'

import type { LoaderFunction } from 'remix'

export const loader: LoaderFunction = async ({ request }) => {
  await requiredUserId(request)
  return null
}

export default function DashboardIndex() {
  return <section>dashboard</section>
}
