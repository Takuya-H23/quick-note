import { HeartIcon } from '@heroicons/react/solid'

import { CopyText } from '~/components'

type Props = {
  title: string
  copy: string
  is_pinned: boolean
}

export default function NoteCard({ title, copy, is_pinned: isPinned }: Props) {
  return (
    <div className="flex flex-col gap-y-3  p-4 rounded-md bg-gray-800 ring ring-gray-500 h-full">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">{title}</h3>
        {isPinned && <HeartIcon className="w-6 h-6" />}
      </div>
      {copy && <CopyText copy={copy} />}
    </div>
  )
}
