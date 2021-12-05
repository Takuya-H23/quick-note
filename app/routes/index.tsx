import type { MetaFunction, LoaderFunction } from 'remix'

export const meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!'
  }
}

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return <div>Index</div>
}
