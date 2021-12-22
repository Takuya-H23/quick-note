import { requiredUserId } from '~/utils/session.server'

import { Layout } from '~/components'

import type { LoaderFunction } from 'remix'

export const loader: LoaderFunction = async ({ request }) => {
  await requiredUserId(request)
  return null
}

export default function DashboardIndex() {
  return (
    <Layout isLoggedIn>
      <section>dashboard</section>
    </Layout>
  )
}
