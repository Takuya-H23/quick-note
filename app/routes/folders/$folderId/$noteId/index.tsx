import { useState, Fragment } from 'react'
import { Link, useLoaderData, json } from 'remix'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  PencilAltIcon,
  DotsVerticalIcon,
  HeartIcon
} from '@heroicons/react/outline'
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/solid'
import { AiOutlineDelete } from 'react-icons/ai'

import { requiredUserId, getSessionFlashMessage } from '~/utils/session.server'
import { CopyText, SnackBar, BackLink } from '~/components'
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
  const {
    id,
    title,
    description,
    copy,
    message,
    variant,
    folder_id,
    is_pinned: isPinned
  } = useLoaderData()

  const folderId = folder_id || 'all'
  return (
    <div>
      <BackLink to={`/folders/${folderId}`} label="Notes" />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={handleClose}
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
                <div className="bg-gray-50 p-5 rounded-md">
                  <Dialog.Title className="font-medium">
                    Are you sure you want to delete this note?
                  </Dialog.Title>
                  <div className="flex gap-x-4 p-6 overflow-hidden justify-center">
                    <button onClick={handleClose}>Cancel</button>
                    <form
                      method="post"
                      action={`/folders/${folderId}/${id}/delete`}
                    >
                      <button type="submit" className="flex gap-x-2">
                        Yes
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <SnackBar message={message} variant={variant} />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center">
          <h2 className="text-xl font-bold lg:text-2xl">{title}</h2>
          <form
            method="post"
            action={`/folders/${folderId}/${id}/pin`}
            className="ml-auto mr-2"
          >
            <input
              type="hidden"
              value={isPinned ? 'true' : 'false'}
              name="isPinned"
            />
            <button type="submit">
              {isPinned ? (
                <SolidHeartIcon className="w-6 h-6" />
              ) : (
                <HeartIcon className="w-6 h-6" />
              )}
            </button>
          </form>
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center">
              <DotsVerticalIcon className="w-6 h-6" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="z-10 absolute  right-0 w-56 mt-2 origin-top-right bg-gray-700 rounded-sm shadow-lg divide-y divide-gray-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-2 flex flex-col gap-y-4 text-gray-50">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="edit"
                        className={`${
                          active ? 'bg-violet-500 ' : ''
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm flex gap-x-2 items-center`}
                      >
                        <PencilAltIcon className="h-5 w-5" />{' '}
                        <span>Edit Note</span>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={`${
                          active ? 'bg-violet-500 ' : ''
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm flex gap-x-2 items-center`}
                        onClick={handleOpen}
                      >
                        <AiOutlineDelete className="w-5 h-5" />
                        <span>Delete Note</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        {copy && (
          <CopyText
            copy={copy}
            className="p-4 rounded-md bg-gray-800 ring ring-gray-500 h-full"
          />
        )}
        <p className="mt-4">{description}</p>
      </div>
    </div>
  )
}
