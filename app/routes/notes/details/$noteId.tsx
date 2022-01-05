import { useState } from 'react'
import { Link, useLoaderData, json } from 'remix'
import { Dialog, Menu } from '@headlessui/react'
import { PencilAltIcon, DotsVerticalIcon } from '@heroicons/react/outline'
import { AiOutlineDelete } from 'react-icons/ai'

import { requiredUserId, getSessionFlashMessage } from '~/utils/session.server'
import { CopyText, SnackBar } from '~/components'
import { getNoteDetail } from '~/db/notes/operations.server'
import type { LoaderFunction } from 'remix'

export const loader: LoaderFunction = async ({ request, params }) => {
  await requiredUserId(request)
  const { noteId } = params

  if (typeof noteId !== 'string') return null

  const note = await getNoteDetail(noteId)

  const url = new URL(request.url)
  const status = url.searchParams.get('status')

  const { message, removeSessionFlashMessage } = await getSessionFlashMessage(
    request
  )
  return json(
    { message, ...note, variant: status === 'success' ? 'info' : 'error' },
    {
      headers: {
        'Set-Cookie': await removeSessionFlashMessage()
      }
    }
  )
}

export default function NoteDetail() {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const { id, title, description, copy, message, variant } = useLoaderData()

  return (
    <>
      <SnackBar message={message} variant={variant} />
      <div>
        <Dialog
          onClose={handleClose}
          open={isOpen}
          className="fixed inset-0 z-10 overflow-y-auto"
        >
          <Dialog.Overlay className="fixed inset-0" />
          <div className="fixed w-8/12  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-gray-50 p-5 rounded-md">
              <Dialog.Title className="font-medium">
                Are you sure you want to delete this note?
              </Dialog.Title>
              <div className="flex gap-x-4 p-6 overflow-hidden justify-center">
                <button onClick={handleClose}>Cancel</button>
                <form method="post" action={`/notes/${id}/delete`}>
                  <button type="submit" className="flex gap-x-2">
                    Yes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Dialog>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center">
              <DotsVerticalIcon className="w-6 h-6" />
            </Menu.Button>
            <Menu.Items className="z-10 absolute right-0 w-56 mt-2 origin-top-right bg-gray-600 rounded-sm shadow-lg">
              <div className="p-2 flex flex-col gap-y-4">
                <Menu.Item>
                  {() => (
                    <Link to="edit" className="flex gap-x-2 items-center">
                      <PencilAltIcon className="h-5 w-5" /> <span>Edit</span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {() => (
                    <button
                      type="button"
                      className="flex gap-x-2 items-center"
                      onClick={handleOpen}
                    >
                      <AiOutlineDelete className="w-5 h-5" />
                      <span>Delete</span>
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
        {copy && <CopyText copy={copy} className="mt-4" />}
        <p className="mt-4">{description}</p>
      </div>
    </>
  )
}
