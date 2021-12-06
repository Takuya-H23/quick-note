import { redirect } from 'remix'

import { endUserSession } from '~/utils/session.server'

import type { ActionFunction, LoaderFunction } from 'remix'

export const action: ActionFunction = async ({ request }) =>
  endUserSession(request)

export const loader: LoaderFunction = () => redirect('/')
