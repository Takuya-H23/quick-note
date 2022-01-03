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
    <div className="flex flex-col gap-y-2 border border-gray-50 p-4 rounded-sm">
      <h3 className="font-medium text-lg">{title}</h3>
      <CopyText copy={copy} />
    </div>
  )
}
