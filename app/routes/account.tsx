import { Fragment, useState } from 'react'
import { json, useLoaderData } from 'remix'
import { Dialog, Transition } from '@headlessui/react'

import { requiredUserId, getSessionFlashMessage } from '~/utils/session.server'
import { getUserById } from '~/db/users/operations.server'
import { Button, SnackBar } from '~/components'

import type { LoaderFunction } from 'remix'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requiredUserId(request)
  const { message, removeSessionFlashMessage } = await getSessionFlashMessage(
    request
  )

  const user = await getUserById(userId)

  return json(
    {
      user,
      message
    },
    {
      headers: {
        'Set-Cookie': await removeSessionFlashMessage()
      }
    }
  )
}

export default function Account() {
  const { message, user } = useLoaderData()
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <div>
      <SnackBar message={message} variant="error" />
      <h2 className="text-lg font-medium">{user.name}</h2>
      <Button onClick={handleOpen}>Delete Account</Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={handleClose}
          className="fixed inset-0 z-10 overflow-y-auto"
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="p-5 rounded-md">
                  <Dialog.Title className="font-medium">
                    Are you sure you want to delete your account?
                  </Dialog.Title>
                  <div className="flex gap-x-4 p-6 overflow-hidden justify-center">
                    <div className="flex-1">
                      <Button onClick={handleClose}>Cancel</Button>
                    </div>
                    <form
                      method="post"
                      action="/delete-account"
                      className="flex-1"
                    >
                      <Button type="submit" variant="danger">
                        Yes
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
