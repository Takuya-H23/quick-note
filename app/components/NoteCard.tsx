import { CopyText } from '~/components'

export default function NoteCard({
  title,
  copy
}: {
  id: string
  title: string
  copy: string
}) {
  return (
    <div className="flex flex-col gap-y-2  p-4 rounded-md bg-gray-800 ring ring-gray-500 h-full">
      <h3 className="font-medium text-lg">{title}</h3>
      {copy && <CopyText copy={copy} />}
    </div>
  )
}
