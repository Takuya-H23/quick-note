import { BiClipboard } from 'react-icons/bi'

export default function NoteCard({
  title,
  copy
}: {
  id: string
  title: string
  copy: string
}) {
  const onClick = () => {
    const type = 'text/plain'
    const blob = new Blob([copy], { type })
    navigator.clipboard.write([new ClipboardItem({ [type]: blob })]).then(
      x => {
        console.log('good', x)
      },
      e => {
        console.error(e)
      }
    )
  }

  return (
    <div className="flex flex-col gap-y-2 border border-gray-50 p-4 rounded-sm">
      <h3 className="font-medium text-lg">{title}</h3>
      <div className="flex justify-between items-center">
        <span>{copy}</span>{' '}
        <button type="button" onClick={onClick}>
          <BiClipboard className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
